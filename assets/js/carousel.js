//console.log("carousel file executed", Date.now());

document.addEventListener("DOMContentLoaded", () => {
  //console.log("DOMContentLoaded carousel init", Date.now());

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {

    if (carousel.dataset.carouselInitialized === "true") {
      //console.log("Carousel already initialized, skipping");
      return;
    }

    carousel.dataset.carouselInitialized = "true";

    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prev = carousel.querySelector(".carousel-btn.prev");
    const next = carousel.querySelector(".carousel-btn.next");

    /*console.log({
      track,
      slides: slides.length,
      prev,
      next
    });*/

    if (!track || slides.length === 0 || !prev || !next) {
      //console.error("Carousel initialization failed.");
      return;
    }

    let index = 0;

    function update() {
      //console.log(`Moving to slide ${index}`);
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("active", active);
        //console.log(i, active, dot.className);
      });
    }

    let timer = setInterval(() => {
      index = (index + 1) % slides.length;
      update();
    }, 8000); // 8 seconds

    function restartTimer() {
      clearInterval(timer);
      timer = setInterval(() => {
        index = (index + 1) % slides.length;
        update();
      }, 8000);
    }

    prev.addEventListener("click", () => {
      //console.log("Previous clicked");
      index = (index - 1 + slides.length) % slides.length;
      update();
      restartTimer();
    });

    next.addEventListener("click", () => {
      //console.log("Next clicked");
      index = (index + 1) % slides.length;
      update();
      restartTimer();
    });

    const dotsContainer = carousel.querySelector(".carousel-dots");
    dotsContainer.innerHTML = "";
    const dots = [];

    //console.log("Number of slides:", slides.length);

    slides.forEach((_, i) => {
      //console.log(`Slide ${i}`);
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.addEventListener("click", () => {
        index = i;
        update();
        restartTimer();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
    //console.log("Existing dots:", dotsContainer.children.length);

    update();
    //console.log("Carousel ready");
  });
});
