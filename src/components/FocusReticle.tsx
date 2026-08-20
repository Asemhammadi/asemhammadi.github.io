/**
 * Camera-style focus brackets that snap in on card hover, echoing the video-wall
 * grammar from the hero so the page reads as one system rather than a themed
 * hero bolted onto generic cards. Decorative and non-interactive.
 */
export function FocusReticle() {
  return (
    <span className="reticle" aria-hidden="true">
      <span className="reticle-corner reticle-tl" />
      <span className="reticle-corner reticle-tr" />
      <span className="reticle-corner reticle-bl" />
      <span className="reticle-corner reticle-br" />
      <span className="reticle-rec">REC</span>
    </span>
  );
}
