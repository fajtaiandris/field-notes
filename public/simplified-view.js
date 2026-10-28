(() => {
  const key = "field-notes:simplified-view";
  const svgNamespace = "http://www.w3.org/2000/svg";
  const iconPaths = {
    eye: [
      "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
    ],
    dashed: [
      "M13.054 18.946a11 11 0 0 1-2.11 0",
      "M13.054 5.054a11 11 0 0 0-2.11-.001",
      "M17.072 6.274a11 11 0 0 1 1.753 1.173",
      "M18.825 16.552a11 11 0 0 1-1.753 1.174",
      "M2.514 13.303a11 11 0 0 1-.452-.954 1 1 0 0 1 0-.697 11 11 0 0 1 .45-.955",
      "M21.485 10.697a11 11 0 0 1 .453.955 1 1 0 0 1 0 .697 11 11 0 0 1-.453.954",
      "M5.173 7.448a11 11 0 0 1 1.753-1.174",
      "M6.926 17.726a11 11 0 0 1-1.753-1.174",
    ],
  };
  let simplified = false;

  function createIcon(paths) {
    const svg = document.createElementNS(svgNamespace, "svg");
    const attributes = {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
      focusable: "false",
    };

    for (const [name, value] of Object.entries(attributes)) {
      svg.setAttribute(name, value);
    }

    for (const d of paths) {
      const path = document.createElementNS(svgNamespace, "path");
      path.setAttribute("d", d);
      svg.append(path);
    }

    const pupil = document.createElementNS(svgNamespace, "circle");
    pupil.setAttribute("cx", "12");
    pupil.setAttribute("cy", "12");
    pupil.setAttribute("r", "3");
    svg.append(pupil);

    return svg;
  }

  try {
    simplified = localStorage.getItem(key) === "1";
  } catch {}

  if (simplified) {
    document.documentElement.setAttribute("data-simplified", "");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".a11y");

    function renderButton() {
      button.replaceChildren(createIcon(iconPaths[simplified ? "dashed" : "eye"]));
      button.setAttribute("aria-pressed", String(simplified));
    }

    renderButton();
    button.hidden = false;

    button.addEventListener("click", () => {
      simplified = document.documentElement.toggleAttribute("data-simplified");
      renderButton();

      try {
        if (simplified) localStorage.setItem(key, "1");
        else localStorage.removeItem(key);
      } catch {}
    });
  });
})();
