# Phoundry

Household jellyfin-web skin. JellyFrame Mod. Requires Seerrfin.

## Dev overlay

```bash
npm run dev
```

With that running, in the Jellyfin tab console:

```js
fetch("http://127.0.0.1:3847/overlay.js").then((r) => r.text()).then(eval);
```

Saves to `skin.css` restyle that tab. They do not publish.

## Publish

1. Bump `version` in `mods.json`
2. Push `main`
3. Jellyfin → Dashboard → Mods → Marketplace
4. Load `https://raw.githubusercontent.com/EliWimmer/phoundry-jellyfin/main/mods.json`
5. Enable Phoundry → Save & Apply → hard refresh
