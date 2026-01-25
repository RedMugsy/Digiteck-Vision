export default function Hero() {
  return (
    <section className="snap-section">
      <video
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
      <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
        <div style={{ width: "min(980px, 92vw)", margin: "0 auto" }}>
          <h1 style={{ fontSize: 64, margin: 0 }}>Visto</h1>
          <p style={{ opacity: 0.85, maxWidth: 640 }}>
            Hero plays video. Next snap section slides up over it.
          </p>
        </div>
      </div>
    </section>
  );
}
