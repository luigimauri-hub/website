(() => {
  const carousel = document.querySelector(".hero-carousel");
  const slides = [...document.querySelectorAll(".hero-slides img")];
  const dots = [...document.querySelectorAll(".hero-carousel-dots button")];
  const label = document.querySelector(".hero-carousel-label");
  const toggle = document.querySelector(".hero-carousel-toggle");
  const menu = document.querySelector("#site-menu");

  if (!carousel || !slides.length || slides.length !== dots.length || !label || !toggle) return;

  const labels = [
    "A casa del cliente",
    "Nell’attività del cliente",
    "In ufficio",
    "In cantiere",
    "In videochiamata",
    "Dal professionista",
    "Dall’imprenditrice",
    "In officina",
  ];

  const alts = [
    "Luigi Mauri conversa con una coppia over 55 nella loro casa milanese",
    "Luigi Mauri incontra una cliente nel suo negozio",
    "Luigi Mauri conversa in ufficio con una giovane coppia",
    "Luigi Mauri esamina un progetto con un costruttore in cantiere",
    "Luigi Mauri in videochiamata con una cliente davanti allo skyline di Milano",
    "Luigi Mauri parla di pensione nello studio di un osteopata",
    "Luigi Mauri ascolta una capitana d’industria nel suo ufficio milanese",
    "Luigi Mauri incontra un elettrauto mentre l’officina è al lavoro",
  ];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let active = 0;
  let paused = reducedMotion.matches;
  let timer;
  let startX = null;

  function preloadNext() {
    slides[(active + 1) % slides.length].loading = "eager";
  }

  function show(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isCurrent = slideIndex === active;
      slide.classList.toggle("is-active", isCurrent);
      slide.alt = isCurrent ? alts[slideIndex] : "";
      slide.setAttribute("aria-hidden", String(!isCurrent));
    });
    dots.forEach((dot, dotIndex) => {
      const isCurrent = dotIndex === active;
      dot.classList.toggle("is-active", isCurrent);
      dot.setAttribute("aria-pressed", String(isCurrent));
    });
    label.textContent = labels[active];
    preloadNext();
  }

  function start() {
    window.clearInterval(timer);
    if (!paused && !document.hidden) timer = window.setInterval(() => show(active + 1), 4000);
  }

  function move(index) {
    show(index);
    start();
  }

  dots.forEach((dot, index) => dot.addEventListener("click", () => move(index)));

  toggle.addEventListener("click", () => {
    paused = !paused;
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute("aria-label", paused ? "Avvia il carosello" : "Metti in pausa il carosello");
    toggle.firstElementChild.textContent = paused ? "▶" : "Ⅱ";
    start();
  });

  carousel.tabIndex = 0;
  carousel.setAttribute("role", "region");
  carousel.setAttribute("aria-roledescription", "carosello");

  carousel.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(active + (event.key === "ArrowRight" ? 1 : -1));
  });

  carousel.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
  }, { passive: true });

  carousel.addEventListener("pointerup", (event) => {
    if (startX !== null && Math.abs(event.clientX - startX) > 42) {
      move(active + (event.clientX < startX ? 1 : -1));
    }
    startX = null;
  }, { passive: true });

  carousel.addEventListener("pointercancel", () => {
    startX = null;
  });

  document.addEventListener("visibilitychange", start);
  document.addEventListener("click", (event) => {
    if (menu?.open && !menu.contains(event.target)) menu.open = false;
  });
  menu?.querySelectorAll("a").forEach((anchor) => anchor.addEventListener("click", () => {
    menu.open = false;
  }));

  if (paused) {
    toggle.setAttribute("aria-pressed", "true");
    toggle.setAttribute("aria-label", "Avvia il carosello");
    toggle.firstElementChild.textContent = "▶";
  }

  show(0);
  start();
})();

