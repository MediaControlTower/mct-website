# Media Control Tower website

Standalone public website, separate from the private application.

## Local preview

With Node.js installed, run `node server.mjs` from this directory, then open http://127.0.0.1:4173.

No dependencies or build step are required. The preview server only listens on this computer.

## Backgrounds

Landscape screens use assets/castle-desktop.png. Portrait screens use assets/castle-mobile.png. The whole composition stays visible using contain sizing; a dark navy woven surround with antique-gold edging fills remaining space. The page uses dynamic viewport height for mobile browser controls.

These backgrounds were created with the built-in image generation tool from the supplied castle reference. Prompt direction: remove SannaTube, the static Zeppelin and top-left branding; retain the castle and eight attractions; blank signs for accessible webpage labels. Recompose for portrait rather than cropping, retaining every attraction.

The landing page includes the sunflower menu, attraction descriptions, animated Zeppelin and private-testing notice. The origin remote is https://git.ashbyte.com/Domeij/mct-website.git. Mirror and deployment configuration remain to be confirmed by the hosting manager. Do not commit or push without explicit user approval.

## Zeppelin guide (step 4)

Asset: assets/zeppelin.png, created using the built-in image generation tool with real alpha transparency (verified). Prompt: One isolated fantasy steampunk Zeppelin sprite, transparent background, horizontal side view facing left; navy fabric balloon, bronze ribs, wooden gondola, amber windows, twin brass rocket nozzles pointing right. Painterly cinematic fantasy style; no scenery, text, logos, banner, ropes or flames. Live banner and engine flames are added by the webpage.

zeppelin.js positions the guide above the selected attraction and clamps it within the viewport. Flights last 1181ms, with a 180ms turn before reversing direction; text updates synchronously when a feature is selected. Leaving an unpinned feature allows one second to reach its banner, then the ship returns home after a short pause. Click/tap pins the description; Escape or close dismisses it. Reduced-motion preferences keep the guide at home and disable flames and flight. Resize recomputes position without flying.
