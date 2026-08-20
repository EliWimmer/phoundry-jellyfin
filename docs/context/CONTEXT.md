# Phoundry Jellyfin

Visual and interaction overlay for the household Jellyfin web client.

## Language

**Skin**:
The CSS, and later JS, applied on top of jellyfin-web. This project's product.
_Avoid_: Plugin, theme, mod (unqualified)

**Theme**:
Jellyfin's built-in color scheme (dark, light). Not this Skin.
_Avoid_: Skin, JellyFrame Theme

**JellyFrame Theme**:
JellyFrame's exclusive CSS-only reskin slot. One at a time. Not this Skin.
_Avoid_: Theme, Skin

**JellyFrame Mod**:
The JellyFrame slot this Skin occupies. CSS now, JS later. Many can be active. Stacks on a JellyFrame Theme.
_Avoid_: Plugin, Theme

**Plugin**:
A C# assembly loaded by the Jellyfin server. This repo does not produce one. JellyFrame is a third-party Plugin we depend on.
_Avoid_: Using "plugin" for the Skin

**JellyFrame**:
The third-party Plugin on the Server that injects the Skin into jellyfin-web.
_Avoid_: Skin Manager (uninstalled)

**jellyfin-web**:
The browser client. The only client a Skin can affect.
_Avoid_: App, client (unqualified)

**Server**:
The household Jellyfin instance. Every jellyfin-web user on it gets the Skin.
_Avoid_: Host, box, machine

**Dev tab**:
The local browser viewing the Server's jellyfin-web, used while authoring the Skin.
_Avoid_: Preview, localhost

**Dev overlay**:
The unpublished Skin CSS applied only in the Dev tab while authoring. It sits on top of the published JellyFrame Mod.
_Avoid_: Live reload, preview

**Seerrfin**:
Third-party Plugin that adds request tabs to jellyfin-web. A hard requirement of this Skin.
_Avoid_: Seerfin, Jellyseerr (the upstream request app)

**Catalog**:
The mods.json and asset URLs JellyFrame fetches from this repository over HTTPS.
_Avoid_: Marketplace (the JellyFrame UI that loads a Catalog)

**Surface**:
A region of jellyfin-web this Skin already styles: cards, library chrome, header tabs including Seerrfin, app bar, menus, dialogs, detail title/ribbon.
_Avoid_: Page, view, component (unqualified)

**Token**:
A CSS custom property on :root for a repeated Skin value (radii, glass, overlay, FA codepoints, font families). Accent stays on Jellyfin's --jf-palette-*. Not a JellyFrame {{var}}.
_Avoid_: Variable (unqualified), JellyFrame var

## Relationships

- A **Skin** overlays **jellyfin-web**. It does not replace the client.
- A **Skin** cannot apply to native Jellyfin apps.
- This repo does not produce a **Plugin**.
- **JellyFrame** injects the published **Skin** on the **Server** as one **JellyFrame Mod**.
- The **Skin** is authored in the **Dev tab** and published to the **Server**.
- The **Dev overlay** applies the unpublished **Skin** in the **Dev tab** only.
- Every jellyfin-web user on the **Server** receives the published **Skin**.
- A **JellyFrame Theme** may sit under the **JellyFrame Mod**. They are not the same thing.
- **JellyFrame** loads the **Skin** from the **Catalog**. Publish is a new version in this repository. The **Catalog** is public.
- The **Skin** requires **Seerrfin**. Those tab selectors are first-class, not optional.
- Host Grotesk, Nunito, and Material Symbols Rounded load from Google Fonts. JellyFrame preconnects those origins. The **Catalog** does not host font files.
- This CSS pass may tweak how existing **Surfaces** look. It does not add new **Surfaces**.
- Repeated Skin values live in **Tokens**. Accent uses `--jf-palette-*`. No JellyFrame `{{vars}}` this pass.
- Host Grotesk is on `body`. Nunito is on titles. `:not(.material-icons)` is gone. Jellyfin Material Icons keep their family. Skin glyphs use Material Symbols Rounded, filled.
- Existing `!important` stays. New `!important` only when the **Dev overlay** shows a miss.

## Example dialogue

> **Dev:** "Should accent be a JellyFrame var?"
> **Domain expert:** "Not this pass. Accent stays `--jf-palette-*`. Repeated radii and icon ligatures are **Tokens**."

## Flagged ambiguities

- "plugin" was used to mean the **Skin**. Resolved: this repo is a **Skin**. **JellyFrame** is the injector **Plugin**.
- "theme" / "theming" was used for the **Skin**. Resolved: Jellyfin dark/light is **Theme**. Exclusive CSS reskin is **JellyFrame Theme**. This **Skin** is a **JellyFrame Mod**.
- "deploy over SSH" names a pipe. Resolved: injector is **JellyFrame**, source is the public **Catalog** in this repository.
- **Skin Manager** is installed but no longer the injector. Resolved: uninstall it. **JellyFrame** is the only injector.
- **Seerrfin** tab hooks in `reference.css`. Resolved: **Seerrfin** is a hard requirement.
- Font files. Resolved: Google Fonts only (text + Material Symbols Rounded). Not self-hosted.
- "cleaning up" the CSS. Visual tweaks are in scope on existing **Surfaces** only. Source is one `skin.css`. Repeated values are **Tokens**. Global font is `body` + title exceptions, not `:not(.material-icons)`. Existing `!important` stays.
