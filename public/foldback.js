(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const url = new URL(window.location.href);
    const regex = /\/(\d+)(?:-(\d+))?(?=(?:\.[^/]*)?\/?$)/;

    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 600;

      const match = url.pathname.match(regex);
      if (!match) throw new Error("Invalid URL format for foldback behavior");

      const first = Number(match[1]);
      const isRange = match[2] !== undefined;
      const spreadFirst = first % 2 === 0 ? first - 1 : first;

      if (isMobile === isRange) {
        const newSegment = isMobile
          ? `${first}`
          : `${spreadFirst}-${spreadFirst + 1}`;

        url.pathname = url.pathname.replace(regex, `/${newSegment}`);
        window.location.replace(url.href);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
  });
})();
