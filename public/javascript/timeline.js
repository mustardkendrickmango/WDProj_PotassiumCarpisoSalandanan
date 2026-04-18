"use strict";

document.querySelectorAll(".accordion h3").forEach((header) => {
  const button = header.querySelector("button");
  const panel = document.getElementById(
    button.getAttribute("aria-controls")
  );

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";

    if (expanded) {
      button.setAttribute("aria-expanded", "false");
      panel.setAttribute("hidden", "");
    } else {
      button.setAttribute("aria-expanded", "true");
      panel.removeAttribute("hidden");

      // Initialize slider when accordion opens
      const slider = panel.querySelector(".slider");
      if (slider) {
        const slides = slider.querySelectorAll("img");
        slides.forEach((img) => img.classList.remove("active"));
        if (slides.length > 0) slides[0].classList.add("active");
      }
    }
  });
});

/* SLIDER */
document.querySelectorAll(".slider").forEach((slider) => {
  let index = 0;
  const slides = slider.querySelectorAll("img");
  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");

  function showSlide(i) {
    slides.forEach((img) => img.classList.remove("active"));
    slides[i].classList.add("active");
  }

  prev.addEventListener("click", () => {
    index = index === 0 ? slides.length - 1 : index - 1;
    showSlide(index);
  });

  next.addEventListener("click", () => {
    index = index === slides.length - 1 ? 0 : index + 1;
    showSlide(index);
  });
});