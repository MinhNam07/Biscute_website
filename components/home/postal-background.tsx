/** Full Post Office sheet art — perforated border + postal watermarks. */
export function PostalBackground() {
  return (
    <div className="passport-book__sheet" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="passport-book__sheet-img"
        src="/textures/post-office-sheet.webp"
        alt=""
        width={1536}
        height={1024}
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
}
