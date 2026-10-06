(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Fixed Navbar — simplified to avoid layout shifts
  $(window).on("scroll resize", function () {
    if ($(this).scrollTop() > 45) {
      $(".fixed-top").addClass("bg-white shadow");
    } else {
      $(".fixed-top").removeClass("bg-white shadow");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    loop: true,
    center: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

/*==================================
      SHOLA PRODUCT SHOWCASE
==================================*/

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".shola-tab");

  if (!tabs.length) return;

  /* ==================================
        SHOLA COLLECTION DATA
  ================================== */

  const collections = [
    {
      category: "Signature Collection",

      description:
        "Thoughtfully curated, consciously crafted: signature hampers designed for sustainable luxury and memorable rituals.",

      products: [
        {
          title: "The Canopy Collection",

          image: "img/products/canopy/1.jpeg",

          images: [
            "img/products/canopy/1.jpeg",
            "img/products/canopy/2.jpeg",
            "img/products/canopy/3.jpeg",
            "img/products/canopy/4.jpeg",
            "img/products/canopy/5.jpeg",
            "img/products/canopy/6.jpeg",
            "img/products/canopy/7.jpeg",
            "img/products/canopy/8.jpeg",
          ],

          description:
            "A rustic blend of pure honey, rich coffee, and bold pepper, paired with handcrafted wooden essentials for your daily ritual.",

          features: [
            "Raw Pure Honey",
            "Single-Origin Aromatic Pepper",
            "Freshly Packed Coffee Powder",
            "Matching Bowl",
            "Nuts Tube",
          ],
        },

        {
          title: "The Aesthetic Coffee Experience",

          image: "img/products/signature/3.jpeg",

          images: [
            "img/products/signature/3.jpeg",
            "img/products/signature/1.jpeg",
            "img/products/signature/2.jpeg",
            "img/products/signature/4.jpeg",
            "img/products/signature/5.jpeg",
            "img/products/signature/6.jpeg",
          ],

          description:
            "A cozy, aromatic ritual packed into a stunning keepsake rigid box.",

          features: [
            "Authentic Premium Coffee Powder",
            "Brass coffee Dabara set",
            "Hand-Poured Coffee-Scented Soy Candle",
            "Nuts Tube",
          ],
        },
      ],
    },

    {
      category: "Premium Collection",

      description:
        "Elegant rigid-box hampers ideal for corporate gifting, professional appreciation, and high-profile celebrations.",

      products: [
        {
          title: "The Heritage Crate",

          image: "img/products/premium/1.jpeg",

          images: [
            "img/products/premium/1.jpeg",
            "img/products/premium/2.jpeg",
            "img/products/premium/3.jpeg",
            "img/products/premium/4.jpeg",
            "img/products/premium/5.jpeg",
            "img/products/premium/6.jpeg",
          ],

          description:
            "An elegant rigid-box hamper created for corporate gifting, professional appreciation, and high-profile celebrations.",

          features: [
            "Pure Raw Honey",
            "Premium Roasted Coffee",
            "Whole Black Pepper",
            "Nuts Tube",
          ],
        },
      ],
    },

    {
      category: "Curated Hampers",

      description:
        "Compact blend of bold flavors and comforting rituals, perfectly sized for a meaningful thank-you or a personal treat.",

      products: [
        {
          title: "The Sweet & Spice Blend",

          image: "img/products/curated/2.jpeg",

          images: [
            "img/products/curated/2.jpeg",
            "img/products/curated/1.jpeg",
            "img/products/curated/3.jpeg",
            "img/products/curated/4.jpeg",
            "img/products/curated/5.jpeg",
          ],

          description:
            "A perfect balance of sweet warmth and bold spice in a curated paper bag, ideal for wellness lovers and gourmet collections.",

          features: [
            "Premium Raw Honey",
            "Whole Black Pepper",
            "Traditional Wooden Honey Dripper",
            "Personalized Message Card",
          ],
        },

        {
          title: "Morning Brew Ritual",

          image: "img/products/curated/3.jpeg",

          images: [
            "img/products/curated/3.jpeg",
            "img/products/curated/1.jpeg",
            "img/products/curated/2.jpeg",
            "img/products/curated/4.jpeg",
            "img/products/curated/5.jpeg",
          ],

          description:
            "The ultimate morning upgrade that pairs rich coffee with the natural sweetness of pure honey.",

          features: [
            "Rich Coffee Powder",
            "Premium Honey",
            "Traditional Wooden Honey Dripper",
            "Personalized Message Card",
          ],
        },

        {
          title: "Bold Mix of Brew & Spice",

          image: "img/products/curated/1.jpeg",

          images: [
            "img/products/curated/1.jpeg",
            "img/products/curated/2.jpeg",
            "img/products/curated/3.jpeg",
            "img/products/curated/4.jpeg",
            "img/products/curated/5.jpeg",
          ],

          description:
            "An earthy, robust combination designed for those who appreciate deep, intense, and sophisticated flavors.",

          features: [
            "Rich Coffee Powder",
            "Whole Black Pepper",
            "Nuts Tube",
            "Personalized Message Card",
          ],
        },
      ],
    },

    {
      category: "Mini Hampers",

      description:
        "Simple, thoughtful gifts designed to make a big impression. The perfect token of appreciation for large groups and celebrations.",

      products: [
        {
          title: "Gift-lets",

          image: "img/products/mini/1.jpeg",

          images: ["img/products/mini/1.jpeg", "img/products/mini/2.jpeg"],

          description:
            "A simple and thoughtful gift designed to make a big impression—perfect for celebrations, giveaways, and meaningful thank-you gestures.",

          features: ["Raw Honey", "Nuts Tube", "Personalized Note"],
        },
      ],
    },
  ];

  /* ==================================
        HTML ELEMENTS
  ================================== */

  const image = document.getElementById("productImage");
  const category = document.getElementById("productCategory");
  const title = document.getElementById("productTitle");
  const description = document.getElementById("productDescription");
  const features = document.getElementById("productFeatures");

  /*
    Optional:
    If you have a container for multiple product buttons/cards,
    give it this ID:

    <div id="productSelector"></div>
  */

  const productSelector = document.getElementById("productSelector");

  /* ==================================
        PRODUCT IMAGE CAROUSEL
  ================================== */

  const carousel = document.getElementById("productCarousel");
  const carouselTrack = document.getElementById("productCarouselTrack");
  const carouselDots = document.getElementById("productCarouselDots");
  const carouselPrevBtn = document.querySelector(".shola-carousel-prev");
  const carouselNextBtn = document.querySelector(".shola-carousel-next");

  const CAROUSEL_INTERVAL = 4500;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let carouselImages = [];
  let carouselIndex = 0;
  let carouselTimer = null;
  let touchStartX = 0;
  let touchStartY = 0;

  function stopCarousel() {
    if (carouselTimer) {
      clearInterval(carouselTimer);
      carouselTimer = null;
    }
  }

  function startCarousel() {
    stopCarousel();

    if (reduceMotion || carouselImages.length <= 1) return;

    carouselTimer = setInterval(function () {
      goToSlide(carouselIndex + 1);
    }, CAROUSEL_INTERVAL);
  }

  function goToSlide(index) {
    if (!carouselTrack || !carouselDots || !carouselImages.length) return;

    carouselIndex = (index + carouselImages.length) % carouselImages.length;

    carouselTrack.style.transform =
      "translateX(-" + carouselIndex * 100 + "%)";

    carouselDots
      .querySelectorAll(".shola-carousel-dot")
      .forEach(function (dot, dotIndex) {
        dot.classList.toggle("active", dotIndex === carouselIndex);
      });
  }

  function renderCarousel(product) {
    if (!carousel || !carouselTrack || !carouselDots) return;

    carouselImages =
      product.images && product.images.length
        ? product.images
        : [product.image];

    carouselTrack.innerHTML = "";
    carouselDots.innerHTML = "";

    carouselImages.forEach(function (src, index) {
      const slide = document.createElement("div");
      slide.className = "shola-carousel-slide";

      const img = document.createElement("img");

      img.src = src;
      img.alt = product.title + " - image " + (index + 1);
      img.width = 700;
      img.height = 700;
      img.decoding = "async";

      if (index > 0) {
        img.loading = "lazy";
      }

      slide.appendChild(img);
      carouselTrack.appendChild(slide);

      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "shola-carousel-dot";
      dot.setAttribute(
        "aria-label",
        "Show image " + (index + 1) + " of " + carouselImages.length
      );

      dot.addEventListener("click", function () {
        goToSlide(index);
        startCarousel();
      });

      carouselDots.appendChild(dot);
    });

    carousel.classList.toggle("is-single", carouselImages.length <= 1);

    goToSlide(0);
    startCarousel();
  }

  if (carousel) {
    if (carouselPrevBtn) {
      carouselPrevBtn.addEventListener("click", function () {
        goToSlide(carouselIndex - 1);
        startCarousel();
      });
    }

    if (carouselNextBtn) {
      carouselNextBtn.addEventListener("click", function () {
        goToSlide(carouselIndex + 1);
        startCarousel();
      });
    }

    // Pause auto-scroll while hovering (mouse/pen only)
    carousel.addEventListener("pointerenter", function (event) {
      if (event.pointerType === "touch") return;
      stopCarousel();
    });

    carousel.addEventListener("pointerleave", function (event) {
      if (event.pointerType === "touch") return;
      startCarousel();
    });

    // Pause while a control has keyboard focus
    carousel.addEventListener("focusin", stopCarousel);
    carousel.addEventListener("focusout", startCarousel);

    // Touch swipe support
    carousel.addEventListener(
      "touchstart",
      function (event) {
        stopCarousel();

        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
      },
      { passive: true }
    );

    carousel.addEventListener(
      "touchend",
      function (event) {
        const deltaX = event.changedTouches[0].screenX - touchStartX;
        const deltaY = event.changedTouches[0].screenY - touchStartY;

        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
          goToSlide(carouselIndex + (deltaX < 0 ? 1 : -1));
        }

        startCarousel();
      },
      { passive: true }
    );

    // Stop auto-scroll while the tab is hidden
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopCarousel();
      } else {
        startCarousel();
      }
    });
  }

  /* ==================================
        SHOW PRODUCT
  ================================== */

  function showProduct(product, collection) {
    if (!product) return;

    // Update image carousel immediately
    renderCarousel(product);

    // Update category immediately
    productCategory.textContent = collection.category;

    // Update title immediately
    productTitle.textContent = product.title;

    // Update description immediately
    productDescription.textContent = product.description;

    // Update features immediately
    productFeatures.innerHTML = "";

    product.features.forEach(function (feature) {
      const chip = document.createElement("span");

      chip.textContent = feature;

      productFeatures.appendChild(chip);
    });

    // Make sure nothing is hidden
    if (carousel) {
      carousel.classList.remove("fade-out");
    }
    productCategory.classList.remove("fade-out");
    productTitle.classList.remove("fade-out");
    productDescription.classList.remove("fade-out");
    productFeatures.classList.remove("fade-out");
  }

  /* ==================================
        CREATE PRODUCT SELECTOR
  ================================== */

  function createProductSelector(collection) {
    productSelector.innerHTML = "";

    if (collection.products.length <= 1) {
      productSelector.style.display = "none";
      return;
    }

    productSelector.style.display = "flex";

    collection.products.forEach(function (product, index) {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "shola-product-selector";
      button.textContent = product.title;

      if (index === 0) {
        button.classList.add("active");
      }

      button.addEventListener("click", function (event) {
        event.preventDefault();

        // Remove active from all product buttons
        productSelector
          .querySelectorAll(".shola-product-selector")
          .forEach(function (btn) {
            btn.classList.remove("active");
          });

        // Activate clicked button
        button.classList.add("active");

        // Immediately show selected product
        showProduct(product, collection);
      });

      productSelector.appendChild(button);
    });
  }

  /* ==================================
        COLLECTION TABS
  ================================== */

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((btn) => {
        btn.classList.remove("active");
      });

      this.classList.add("active");

      const collectionIndex = Number(this.dataset.collection);

      const collection = collections[collectionIndex];

      if (!collection) return;

      // Show first product initially
      const firstProduct = collection.products[0];

      createProductSelector(collection);

      showProduct(firstProduct, collection);
    });
  });

  /* ==================================
        INITIAL COLLECTION
  ================================== */

  const activeTab = document.querySelector(".shola-tab.active") || tabs[0];

  if (activeTab) {
    activeTab.click();
  }
});

/*==================================
        SHOLA GALLERY
==================================*/

document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".shola-gallery-item");
  const lightbox = document.querySelector(".shola-lightbox");
  const lightboxImage = document.getElementById("sholaLightboxImage");

  const closeBtn = document.querySelector(".shola-lightbox-close");
  const prevBtn = document.querySelector(".shola-lightbox-prev");
  const nextBtn = document.querySelector(".shola-lightbox-next");

  if (!galleryItems.length) return;

  let currentIndex = 0;

  function openImage(index) {
    currentIndex = index;

    const img = galleryItems[index].querySelector("img");

    lightboxImage.src = img.src;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
  }

  function closeImage() {
    lightbox.classList.remove("active");

    document.body.style.overflow = "";
  }

  function nextImage() {
    currentIndex++;

    if (currentIndex >= galleryItems.length) {
      currentIndex = 0;
    }

    lightboxImage.src = galleryItems[currentIndex].querySelector("img").src;
  }

  function prevImage() {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = galleryItems.length - 1;
    }

    lightboxImage.src = galleryItems[currentIndex].querySelector("img").src;
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      openImage(index);
    });
  });

  closeBtn.addEventListener("click", closeImage);

  nextBtn.addEventListener("click", nextImage);

  prevBtn.addEventListener("click", prevImage);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeImage();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeImage();
    }

    if (e.key === "ArrowRight") {
      nextImage();
    }

    if (e.key === "ArrowLeft") {
      prevImage();
    }
  });
});
