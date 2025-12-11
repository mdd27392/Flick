import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk";
import { initFlickUI } from "./Flick-ui.js";

window.addEventListener("load", () => {
  (async () => {
    initFlickUI();
    const env = document.getElementById("environment-indicator");

    let isMini = false;
    try { isMini = await sdk.isInMiniApp(); } catch { if(env) env.textContent="Preview mode in browser."; }

    if(env) env.textContent = isMini ? "Running inside Base Mini App." : "Open in Base for full mini app.";

    await sdk.actions.ready();
  })();
});
