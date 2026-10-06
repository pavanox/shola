/* ================================================================
   SHOLA FORMS — universal contact / enquiry / lead form handler
   ------------------------------------------------------------
   Applies to every <form data-shola-form> on the site.

   Behaviour
   - Client-side validation (required, min/max length, phone,
     email). Errors render in the existing .shola-field-msg
     elements, so the current design is untouched.
   - Submission is blocked while any field is invalid; the first
     invalid field is scrolled into view and focused.
   - The redirect to the Thank You page happens ONLY after the
     submission has been accepted.

   Wiring a real inbox
   --------------------
   Set FORMS.endpoint to any backend that accepts a POST of
   FormData (FormSubmit, Formspree, Web3Forms, your own API...).
   While it is empty the handler runs in local mode: the payload is
   logged to the console and queued in localStorage under
   "shola:form-submissions", so nothing is lost and the full
   success -> Thank You flow can be tested end to end.
   ================================================================ */
(function () {
    'use strict';

    var FORMS = {
        // e.g. 'https://formsubmit.co/ajax/info@sholaenterprises.com'
        endpoint: '',
        thankYouPage: 'thank-you.html',
        storageKey: 'shola:form-submissions'
    };

    /* ---------------- helpers ---------------- */

    // The .shola-field-msg that belongs to a field, if the markup has one.
    function messageFor(field) {
        if (!field.id) return null;
        return field.form.querySelector('#' + field.id + '-msg');
    }

    function showError(field, message) {
        var msg = messageFor(field);
        if (!msg) return;
        // No message supplied -> keep the hint the page already authored.
        if (message) msg.textContent = message;
        field.setAttribute('aria-invalid', 'true');
        field.classList.add('is-invalid');
    }

    // Restore the authored hint text once the field becomes valid again.
    function clearError(field) {
        field.removeAttribute('aria-invalid');
        field.classList.remove('is-invalid');
        var msg = messageFor(field);
        if (msg && field.dataset.defaultMsg) msg.textContent = field.dataset.defaultMsg;
    }

    function rememberDefault(field) {
        var msg = messageFor(field);
        if (msg && !field.dataset.defaultMsg) {
            field.dataset.defaultMsg = msg.textContent.trim();
        }
    }

    function setStatus(form, text, isError) {
        var status = form.querySelector('.shola-form-status');
        if (!status) return;
        if (!text) {
            status.textContent = '';
            status.classList.remove('is-visible');
            return;
        }
        status.textContent = text;
        status.classList.add('is-visible');
        status.classList.toggle('is-error', !!isError);
    }

    function controls(form) {
        return Array.prototype.filter.call(
            form.querySelectorAll('input, textarea, select'),
            function (el) {
                return el.type !== 'hidden' && el.type !== 'submit' && el.type !== 'button';
            }
        );
    }
    /* ---------------- validation ---------------- */

    var PHONE = /^[+]?[\d\s()-]{6,20}$/;
    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function validateField(field) {
        var value = (field.value || '').trim();

        if (field.required && !value) {
            // The page already ships a human hint for each required field
            // ("Please enter your name."), so reuse it verbatim.
            showError(field);
            return false;
        }

        if (!value) {
            clearError(field);
            return true;
        }

        if (field.type === 'tel' || field.dataset.validate === 'phone') {
            var digits = value.replace(/\D/g, '');
            if (!PHONE.test(value) || digits.length < 7 || digits.length > 15) {
                showError(field, 'Please enter a valid phone number.');
                return false;
            }
        }

        if (field.type === 'email' || field.dataset.validate === 'email') {
            if (!EMAIL.test(value)) {
                showError(field, 'Please enter a valid email address.');
                return false;
            }
        }

        var min = parseInt(field.getAttribute('minlength') || '0', 10);
        if (min && value.length < min) {
            showError(field, 'Please write at least ' + min + ' characters.');
            return false;
        }

        var max = parseInt(field.getAttribute('maxlength') || '0', 10);
        if (max && value.length > max) {
            showError(field, 'Please keep this under ' + max + ' characters.');
            return false;
        }

        clearError(field);
        return true;
    }

    function validateForm(form) {
        var ok = true;
        var firstInvalid = null;

        controls(form).forEach(function (field) {
            if (validateField(field)) return;
            ok = false;
            if (!firstInvalid) firstInvalid = field;
        });

        if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(function () {
                try { firstInvalid.focus({ preventScroll: true }); } catch (e) { firstInvalid.focus(); }
            }, 350);
        }

        return ok;
    }
    /* ---------------- submission ---------------- */

    function payload(form) {
        var data = {};
        controls(form).forEach(function (field) {
            data[field.name || field.id] = (field.value || '').trim();
        });
        data.submittedAt = new Date().toISOString();
        data.page = window.location.pathname;
        return data;
    }

    function queueLocally(form) {
        try {
            var stored = JSON.parse(window.localStorage.getItem(FORMS.storageKey) || '[]');
            stored.push(payload(form));
            window.localStorage.setItem(FORMS.storageKey, JSON.stringify(stored));
        } catch (e) {
            /* storage full or blocked - the console log below still runs */
        }
    }

    function post(form, data) {
        return fetch(FORMS.endpoint, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' }
        }).then(function (response) {
            if (!response.ok) {
                throw new Error('Submission failed with status ' + response.status);
            }
        });
    }

    function redirect(form) {
        window.location.href = form.getAttribute('data-thank-you') || FORMS.thankYouPage;
    }

    function handleSubmit(form, event) {
        event.preventDefault();

        if (form.dataset.sending === '1') return;

        setStatus(form, '', false);

        if (!validateForm(form)) {
            setStatus(form, 'Please correct the highlighted fields and try again.', true);
            return;
        }

        var button = form.querySelector('button[type="submit"]');
        var originalHtml = button ? button.innerHTML : '';

        form.dataset.sending = '1';
        if (button) {
            button.disabled = true;
            button.setAttribute('aria-busy', 'true');
            button.textContent = 'Sending...';
        }

        var restore = function () {
            if (button) {
                button.disabled = false;
                button.removeAttribute('aria-busy');
                button.innerHTML = originalHtml;
            }
            delete form.dataset.sending;
        };

        if (!FORMS.endpoint) {
            console.log('[SHOLA] form submission', payload(form));
            queueLocally(form);
            setTimeout(function () {
                restore();
                redirect(form);
            }, 600);
            return;
        }

        post(form, new FormData(form)).then(function () {
            restore();
            redirect(form);
        }).catch(function (error) {
            console.error('[SHOLA] form submission error', error);
            restore();
            setStatus(form, 'Something went wrong while sending. Please try again, or email us at info@sholaenterprises.com.', true);
        });
    }
    /* ---------------- enquiry CTAs ---------------- */

    // Any element carrying data-enquire-link (or the header's
    // .enquire-now-personal) scrolls to the form when it is on the
    // current page, otherwise it navigates to the contact page.
    function wireEnquiryLinks() {
        document.addEventListener('click', function (event) {
            var el = event.target;
            var trigger = el && el.closest
                ? el.closest('[data-enquire-link], .enquire-now-personal')
                : null;
            if (!trigger) return;

            var targetId = trigger.getAttribute('data-enquire-link') ||
                trigger.getAttribute('data-target') ||
                'contact-form-corporate';

            var form = document.getElementById(targetId);

            if (form) {
                event.preventDefault();
                form.scrollIntoView({ behavior: 'smooth', block: 'center' });
                var first = form.querySelector('input, textarea, select');
                if (first) {
                    setTimeout(function () {
                        try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); }
                    }, 400);
                }
                return;
            }

            if (trigger.tagName !== 'A') {
                event.preventDefault();
                window.location.href = 'contact-us.html#' + targetId;
            }
            // Plain anchors without a local form use their own href.
        });
    }

    /* ---------------- mobile floating-nav guard ---------------- */

    // On phones the fixed bottom nav (z-index 1060) sits on top of the form's
    // submit button, which makes the form impossible to submit. Hide the nav
    // while a form is actually on screen. Purely functional - no visual change
    // anywhere else on the site.
    function guardFloatingNav(form) {
        var toggle = function (on) {
            document.body.classList.toggle('shola-form-open', on);
        };

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) { toggle(entry.isIntersecting); });
            }, { threshold: 0.12 }).observe(form);
        }

        // Also react to focus, which covers the keyboard-open case.
        form.addEventListener('focusin', function () { toggle(true); });
        form.addEventListener('focusout', function () {
            setTimeout(function () {
                if (!form.contains(document.activeElement)) toggle(false);
            }, 0);
        });
    }

    /* ---------------- init ---------------- */

    function initForm(form) {
        controls(form).forEach(rememberDefault);
        form.setAttribute('novalidate', 'novalidate');
        guardFloatingNav(form);

        form.addEventListener('submit', function (event) {
            handleSubmit(form, event);
        });

        // Re-validate as the visitor corrects a flagged field.
        controls(form).forEach(function (field) {
            var revalidate = function () {
                if (field.getAttribute('aria-invalid') === 'true') validateField(field);
            };
            field.addEventListener('blur', revalidate);
            field.addEventListener('input', revalidate);
        });
    }

    function init() {
        Array.prototype.forEach.call(
            document.querySelectorAll('form[data-shola-form]'),
            initForm
        );

        wireEnquiryLinks();

        // Header/footer are injected after DOMContentLoaded, so pick up any
        // forms or enquiry links that arrive with them.
        document.addEventListener('includesLoaded', function () {
            Array.prototype.forEach.call(
                document.querySelectorAll('form[data-shola-form]'),
                initForm
            );
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
