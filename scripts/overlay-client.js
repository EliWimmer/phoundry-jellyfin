(function () {
  const ID = "phoundry-dev";
  const SRC = "http://127.0.0.1:3847/skin.css";
  const POLL_MS = 700;
  let last = "";

  async function tick() {
    try {
      const css = await fetch(SRC + "?t=" + Date.now()).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      });
      if (css === last) return;
      last = css;
      let el = document.getElementById(ID);
      if (!el) {
        el = document.createElement("style");
        el.id = ID;
        document.documentElement.appendChild(el);
      }
      el.textContent = css;
    } catch (err) {
      console.warn("[phoundry-dev]", err);
    }
  }

  if (window.__phoundryDev) clearInterval(window.__phoundryDev);
  tick();
  window.__phoundryDev = setInterval(tick, POLL_MS);
})();
