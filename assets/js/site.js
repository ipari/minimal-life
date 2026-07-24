document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-inventory-toggle]").forEach(function (button) {
    var target = document.getElementById(button.getAttribute("aria-controls"));
    if (!target) return;

    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      target.hidden = expanded;
      button.setAttribute("aria-expanded", String(!expanded));
      button.textContent = button.dataset.label + (expanded ? " ↓" : " ↑");
    });
  });

  document.querySelectorAll("a[href]").forEach(function (link) {
    var url;

    try {
      url = new URL(link.href, window.location.href);
    } catch (_error) {
      return;
    }

    var isWebLink = url.protocol === "http:" || url.protocol === "https:";
    var isLeaflette = url.hostname === "leaflette.com" || url.hostname.endsWith(".leaflette.com");
    var isCurrentHost = url.hostname === window.location.hostname;

    if (!isWebLink || isLeaflette || isCurrentHost) return;

    link.classList.add("external-link");

    var favicon = document.createElement("img");
    favicon.className = "external-link-favicon";
    favicon.src = url.origin + "/favicon.ico";
    favicon.alt = "";
    favicon.loading = "lazy";
    favicon.referrerPolicy = "no-referrer";
    favicon.setAttribute("aria-hidden", "true");

    favicon.addEventListener("error", function () {
      var fallback = document.createElement("span");
      fallback.className = "external-link-fallback";
      fallback.setAttribute("aria-hidden", "true");
      fallback.textContent = "↗";
      favicon.replaceWith(fallback);
    }, { once: true });

    var iconTarget = link.classList.contains("recent-item-card")
      ? link.querySelector(".recent-item-info p")
      : link;

    if (iconTarget) {
      iconTarget.insertBefore(favicon, iconTarget.firstChild);
    }
  });
});
