# Landing page verification — 8 October 2026

Verified locally in the Codex browser, using desktop, tablet portrait/landscape, phone portrait and phone landscape viewport overrides. These are browser checks, not physical-device or cross-browser certification.

## Results

- All eight attractions exercised at six sizes (48 open-feature states): desktop 1440 wide, tablets 768x1024 and 1024x768, phones 390x844 and 320x568, landscape phone 844x390.
- No horizontal or vertical document overflow in these states.
- Every final Zeppelin destination stays inside the viewport and clear of the selected attraction.
- Menu fits small phone, tablet and desktop layouts.
- Keyboard feature selection, switching, Escape dismissal and restored menu focus verified.
- Pointer selection and outside-click dismissal verified. Attempting to scroll left the page at 0,0.
- Images loaded successfully; no browser warnings or errors in captured logs.
- JavaScript syntax checks passed. This static site has no build dependency or compilation step.

## Fixes

- When there is insufficient space above a feature, choose an alternative position beside or below it, favouring space clear of the menu and attraction controls.
- Keep the Zeppelin above the private-testing notice.
- Increase compact landscape attraction targets to 44 pixels high.

## Remaining limits

Reduced-motion handling is implemented but was not toggled through an operating-system preference in this session. Actual iOS/Android touch behaviour and Safari/Firefox should be checked before public launch. Artwork remains source PNGs; web image compression is a useful pre-launch improvement.

No commits, pushes, remote changes or publication performed.
