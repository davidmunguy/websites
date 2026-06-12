(function () {
  const header = document.querySelector("[data-header]");
  const menu = document.querySelector("[data-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const quoteForm = document.querySelector("[data-quote-form]");
  const formStatus = document.querySelector("[data-form-status]");
  const serviceButtons = document.querySelectorAll("[data-service]");
  const year = document.querySelector("[data-year]");
  const serviceSelect = quoteForm ? quoteForm.querySelector('select[name="service"]') : null;

  const phoneNumber = "254722447283";

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  function syncHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }

  function closeMenu() {
    if (!header || !menuToggle) return;
    document.body.classList.remove("menu-open");
    header.classList.remove("menu-active");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    if (!header || !menuToggle) return;
    document.body.classList.add("menu-open");
    header.classList.add("menu-active");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (menu) {
    menu.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        closeMenu();
      }
    });
  }

  window.addEventListener("scroll", syncHeader, { passive: true });
  syncHeader();

  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const service = button.getAttribute("data-service");
      if (serviceSelect && service) {
        serviceSelect.value = service;
      }

      document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        quoteForm?.querySelector('input[name="name"]')?.focus({ preventScroll: true });
      }, 420);
    });
  });

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!quoteForm.reportValidity()) {
        return;
      }

      const formData = new FormData(quoteForm);
      const messageLines = [
        "Hello Crystal Gardens, I would like a landscaping quote.",
        "",
        `Name: ${formData.get("name") || ""}`,
        `Phone: ${formData.get("phone") || ""}`,
        `Project location: ${formData.get("location") || ""}`,
        `Service needed: ${formData.get("service") || ""}`,
        `Timeline: ${formData.get("timeline") || ""}`,
        `Project notes: ${formData.get("notes") || "No extra notes yet"}`
      ];

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageLines.join("\n"))}`;

      if (formStatus) {
        formStatus.textContent = "Opening WhatsApp with your project brief.";
      }

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }
})();
