// US Map tooltip
const tooltip = document.getElementById("tooltip");
const states = document.querySelectorAll(".state");

states.forEach((state) => {
  state.addEventListener("mouseover", (e) => {
    const name = state.getAttribute("data-name");
    tooltip.innerText = name;
    tooltip.style.display = "block";
  });

  state.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.pageX + 10 + "px";
    tooltip.style.top = e.pageY + 10 + "px";
  });

  state.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
  });
});

//back to top
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const backToTopButton = document.getElementById("back-to-top");
    console.log(backToTopButton);
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });
  }, 0);
});

//scroll to section - FOR BUTTONS
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

//Slideshow
jQuery(document).ready(function ($) {
  $(".slider-wrapper").each(function () {
    const this_slider = $(this);

    const slides = this_slider.find("ul li");
    const control_prev = this_slider.find(".control_prev");
    const control_next = this_slider.find(".control_next");
    // Initialize dot indicators
    let currentSlideIndex = 0;
    const dotIndicators = this_slider.find(".dot-indicators");
    const dots = dotIndicators.find(".dot");

    dots.eq(0).addClass("active");

    // Add a class to style the text element
    slides.find(".slide-text").addClass("slide-text-hidden");

    function slider_init() {
      if (slides.length > 1) {
        control_prev.css("display", "block");
        control_next.css("display", "block");
      }
    }
    slider_init();

    // Update dot indicators on slide change
    function updateDotIndicators() {
      dots.removeClass("active");
      dots.eq(currentSlideIndex).addClass("active");
    }

    // Update the text element's content and visibility when the slideshow transitions
    function updateSlideText() {
      const currentSlide = slides.eq(currentSlideIndex);
      const currentSlideText = currentSlide.find(".slide-text");

      slides
        .eq((currentSlideIndex - 1 + slides.length) % slides.length)
        .find(".slide-text")
        .addClass("slide-text-hidden");
      currentSlideText.removeClass("slide-text-hidden");
      currentSlideText.addClass("animate-text"); // add this line
      setTimeout(function () {
        currentSlideText.removeClass("animate-text"); // remove the class after a short delay
      }, 1400); // adjust the delay as needed
    }
    slider_init();
    updateSlideText();

    function moveRight() {
      this_slider.find("ul li:last-child").prependTo(this_slider.find("ul"));
      slides.css("left", "-100%");
      slides.stop().animate({ left: 0 }, 500);
    }

    function moveLeft() {
      const arr = [slides.stop().animate({ left: "-100%" }, 500).promise()];
      $.when.apply($, arr).then(function () {
        this_slider.find("ul li:first-child").appendTo(this_slider.find("ul"));
        slides.css("left", 0);
      });
    }

    control_prev.on("click", function () {
      if (slides.length > 1) {
        moveRight();
        currentSlideIndex =
          (currentSlideIndex + slides.length - 1) % slides.length;
        updateDotIndicators();
        updateSlideText();
        clearInterval(this_slider.autoplay);
        setAutoplay();
      }
    });

    control_next.on("click", function () {
      if (slides.length > 1) {
        moveLeft();
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateDotIndicators();
        updateSlideText();
        clearInterval(this_slider.autoplay);
        setAutoplay();
      }
    });

    // Autoplay
    function setAutoplay() {
      this_slider.autoplay = setInterval(() => {
        if (slides.length > 1) {
          moveLeft();
          currentSlideIndex = (currentSlideIndex + 1) % slides.length;
          updateDotIndicators();
          updateSlideText();
        }
      }, 7000); // 7s timer
    }
    setAutoplay();
  });
});

// Filter cards
// Get the cards and filter select elements
const cards = document.querySelectorAll(".card-careers");
const filterSelect = document.getElementById("filter-select");

// Add event listener to the filter select
filterSelect.addEventListener("change", () => {
  const filterValue = filterSelect.value;
  cards.forEach((card) => {
    const category = card.getAttribute("data-category");
    if (filterValue === "all" || category === filterValue) {
      card.classList.remove("card-hidden");
    } else {
      card.classList.add("card-hidden");
    }
  });
});

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function navMobile() {
  var x = document.getElementById("nav-mobile");
  x.style.display = x.style.display === "block" ? "none" : "block";
}
window.addEventListener("resize", function () {
  if (window.innerWidth >= 1024) {
    document.getElementById("nav-mobile").style.display = "none";
  }
});
