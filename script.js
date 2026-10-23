(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.getElementById("site-nav");

  const setTheme = (theme) => {
    const isLight = theme === "light";
    root.dataset.theme = isLight ? "light" : "dark";
    if (themeIcon) {
      themeIcon.classList.toggle("fa-sun", isLight);
      themeIcon.classList.toggle("fa-moon", !isLight);
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    }
  };

  let storedTheme = null;
  try { storedTheme = localStorage.getItem("portfolio-theme"); } catch (_) {}
  setTheme(storedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try { localStorage.setItem("portfolio-theme", nextTheme); } catch (_) {}
  });

  menuToggle?.addEventListener("click", () => {
    const isOpen = siteNav?.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    const icon = menuToggle.querySelector("i");
    icon?.classList.toggle("fa-bars", !isOpen);
    icon?.classList.toggle("fa-xmark", Boolean(isOpen));
  });

  siteNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
      const icon = menuToggle?.querySelector("i");
      icon?.classList.add("fa-bars");
      icon?.classList.remove("fa-xmark");
    });
  });

  document.querySelectorAll(".current-year").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

})();
