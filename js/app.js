// Header
const carousels = document.querySelectorAll("header h1, header h2");

const fadeInTimeline = gsap.timeline();

fadeInTimeline
  .set(carousels, {opacity: 0})
  .to(carousels, {opacity: 1, delay: 1, stagger: 1});

carousels.forEach(carousel => {
  const spanTag = carousel.querySelector("span");
  const spanWidth = spanTag.clientWidth;

  for (let i = 0; i < 20; i++) {
    carousel.appendChild(spanTag.cloneNode(true));
  }

  const movementTimeline = gsap.timeline({repeat: -1});

  movementTimeline
    .set(carousel, {x: 0})
    .to(carousel, {x: spanWidth * -1, duration: 6, ease: "linear"});
});

// Slides
const slides = document.querySelectorAll("section div.slides");

slides.forEach((slide, i) => {
  let currentSlide = 0;
  let zIndex = 999999;
  const images = slide.querySelectorAll("img");

  images.forEach(image => {
    zIndex -= 1;
    image.style.zIndex = zIndex;
  });

  gsap.set(images, {opacity: 0});

  imagesLoaded(images, function() {
    // Add timeline for images
    const timeline = gsap.timeline();

    timeline
      .set(images, {
        x: () => {
          return 300 * Math.random() - 150;
        },
        y: "500%",
        rotation: () => {
          return 90 * Math.random() - 45;
        },
        opacity: 1
      })
      .to(images, {x: 0, y: 0, stagger: -0.25})
      .to(images, {
        rotation: () => {
          return 16 * Math.random() - 8;
        }
      });
  });

  slide.addEventListener("click", function() {
    zIndex -= 1;

    let direction = "150%";
    let midAngle = 15;

    if (Math.random() > 0.5) {
      direction = "-150%";
      midAngle = -15;
    }

    const currentImage = images[currentSlide];

    const flipTimeline = gsap.timeline();

    flipTimeline
      .set(currentImage, {x: 0})
      .to(currentImage, {
        x: direction,
        rotation: midAngle
      })
      .set(currentImage, {zIndex: zIndex})
      .to(currentImage, {
        x: 0,
        rotation: () => {
          return 16 * Math.random() - 8;
        }
      });

    currentSlide += 1;

    if (currentSlide === images.length) {
      currentSlide = 0;
    }
  });
});
