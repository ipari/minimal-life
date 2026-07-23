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
});
