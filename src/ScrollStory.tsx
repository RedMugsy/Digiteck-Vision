import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Row = { n: string; title: string; desc: string; img: string };

const rows: Row[] = [
  { n: "01", title: "Predictive Scoring", desc: "Instant risk + performance scoring powered by proprietary models.", img: "https://picsum.photos/900/700?1" },
  { n: "02", title: "Smart Portfolio Tracking", desc: "Real-time updates, sentiment, benchmarks, and alerts.", img: "https://picsum.photos/900/700?2" },
  { n: "03", title: "Founder Match", desc: "Connect investors to founders based on aligned values and goals.", img: "https://picsum.photos/900/700?3" },
  { n: "04", title: "Deep Due Diligence", desc: "Automated analysis across tech, traction, team, and market.", img: "https://picsum.photos/900/700?4" },
  { n: "05", title: "Secure Collaboration", desc: "Invite LPs and advisors with granular permissions.", img: "https://picsum.photos/900/700?5" },
  { n: "06", title: "Signals Layer", desc: "External signals and internal telemetry combined into one view.", img: "https://picsum.photos/900/700?6" },
  { n: "07", title: "Deal Room", desc: "Centralize docs, notes, decisions, and audit trail per deal.", img: "https://picsum.photos/900/700?7" },
];

const products = [
  { title: "Visto Scout", desc: "Deal discovery engine for fast sourcing.", href: "/products/scout" },
  { title: "Visto DD", desc: "Automated diligence across your pipeline.", href: "/products/dd" },
  { title: "Visto Pulse", desc: "Portfolio monitoring + anomaly alerts.", href: "/products/pulse" },
  { title: "Visto Match", desc: "Founder–investor matching based on fit.", href: "/products/match" },
  { title: "Visto Room", desc: "Collaboration layer for IC/LP review.", href: "/products/room" },
  { title: "Visto API", desc: "Integrate your workflows + data.", href: "/products/api" },
];

export default function ScrollStory() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const s1Ref = useRef<HTMLDivElement | null>(null);  // HERO VIDEO
  const s2Ref = useRef<HTMLDivElement | null>(null);  // SOLID COVER
  const s3Ref = useRef<HTMLDivElement | null>(null);  // IMAGE COVER + RIGHT 60% panel
  const s4Ref = useRef<HTMLDivElement | null>(null);  // V-SPLIT then opposite horizontal
  const s5Ref = useRef<HTMLDivElement | null>(null);  // new pic + left text, then H-split opposite vertical
  const s6Ref = useRef<HTMLDivElement | null>(null);  // center text dissolve + V-split swipe out
  const s7Ref = useRef<HTMLDivElement | null>(null);  // solid
  const s8Ref = useRef<HTMLDivElement | null>(null);  // table hover expand
  const s9Ref = useRef<HTMLDivElement | null>(null);  // left image stack swap + 75% text change
  const s10Ref = useRef<HTMLDivElement | null>(null); // product flip cards
  const s11Ref = useRef<HTMLDivElement | null>(null); // 3 tiles
  const s12Ref = useRef<HTMLDivElement | null>(null); // media link
  const footerRef = useRef<HTMLDivElement | null>(null);

  // Split refs
  const s4Left = useRef<HTMLDivElement | null>(null);
  const s4Right = useRef<HTMLDivElement | null>(null);

  const s5Top = useRef<HTMLDivElement | null>(null);
  const s5Bottom = useRef<HTMLDivElement | null>(null);

  const s6Left = useRef<HTMLDivElement | null>(null);
  const s6Right = useRef<HTMLDivElement | null>(null);
  const s6Text = useRef<HTMLDivElement | null>(null);

  const s9Img1 = useRef<HTMLDivElement | null>(null);
  const s9Img2 = useRef<HTMLDivElement | null>(null);
  const s9Img3 = useRef<HTMLDivElement | null>(null);
  const s9Text1 = useRef<HTMLDivElement | null>(null);
  const s9Text2 = useRef<HTMLDivElement | null>(null);
  const s9Text3 = useRef<HTMLDivElement | null>(null);

  const [hoverIdx, setHoverIdx] = useState(0);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      const scenes = [s2Ref.current, s3Ref.current, s4Ref.current, s5Ref.current, s6Ref.current, s7Ref.current, s8Ref.current, s9Ref.current, s10Ref.current, s11Ref.current, s12Ref.current, footerRef.current];

      gsap.set(s1Ref.current, { yPercent: 0 }); // hero visible
      gsap.set(scenes, { yPercent: 100 });      // others start below

      // Critical: reset split transforms (for refresh)
      gsap.set([s4Left.current, s4Right.current], { xPercent: 0 });
      gsap.set([s5Top.current, s5Bottom.current], { yPercent: 0 });
      gsap.set([s6Left.current, s6Right.current], { xPercent: 0 });
      gsap.set(s6Text.current, { opacity: 1 });

      gsap.set([s9Img1.current, s9Img2.current, s9Img3.current], { xPercent: 0 });
      gsap.set(s9Text1.current, { opacity: 1 });
      gsap.set(s9Text2.current, { opacity: 0 });
      gsap.set(s9Text3.current, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=16000",
          scrub: true,
          pin: true,
        },
      });

      // 1) Hero is visible on load

      // 2) Solid section scrolls up and covers hero + title
      tl.to(s2Ref.current, { yPercent: 0, duration: 1 });

      // 3) Image section scrolls up and covers solid (right panel is 60% transparent bg)
      tl.to(s3Ref.current, { yPercent: 0, duration: 1 });

      // 4) Split vertical then move opposite horizontally (lanes exit L/R with their text)
      tl.to(s4Ref.current, { yPercent: 0, duration: 1 });
      tl.to(s4Left.current, { xPercent: -110, duration: 1 }, ">");
      tl.to(s4Right.current, { xPercent: 110, duration: 1 }, "<");

      // 5) New picture with text LEFT; then split horizontally and move opposite vertically (top up, bottom down)
      tl.to(s5Ref.current, { yPercent: 0, duration: 1 }, ">");
      tl.to(s5Top.current, { yPercent: -110, duration: 1 }, ">");
      tl.to(s5Bottom.current, { yPercent: 110, duration: 1 }, "<");

      // 6) New picture with center text; then split vertically and swipe out; center text dissolves
      tl.to(s6Ref.current, { yPercent: 0, duration: 1 }, ">");
      tl.to(s6Text.current, { opacity: 0, duration: 0.35 }, ">");
      tl.to(s6Left.current, { xPercent: -125, duration: 1 }, ">");
      tl.to(s6Right.current, { xPercent: 125, duration: 1 }, "<");

      // 7) Solid color section appears from under with text
      tl.to(s7Ref.current, { yPercent: 0, duration: 1 }, ">");

      // 8) Text + table right section moves up
      tl.to(s8Ref.current, { yPercent: 0, duration: 1 }, ">");

      // 9) Split half: left image stack. Image slides out left revealing next; text changes at 75% out
      tl.to(s9Ref.current, { yPercent: 0, duration: 1 }, ">");

      tl.to(s9Img1.current, { xPercent: -115, duration: 1 }, ">");
      tl.to(s9Text1.current, { opacity: 0, duration: 0.2 }, "<+=0.75");
      tl.to(s9Text2.current, { opacity: 1, duration: 0.2 }, "<");

      tl.to(s9Img2.current, { xPercent: -115, duration: 1 }, ">");
      tl.to(s9Text2.current, { opacity: 0, duration: 0.2 }, "<+=0.75");
      tl.to(s9Text3.current, { opacity: 1, duration: 0.2 }, "<");

      // 10) Products section flies in
      tl.to(s10Ref.current, { yPercent: 0, duration: 1 }, ">");

      // 11) Three tiles section flies in
      tl.to(s11Ref.current, { yPercent: 0, duration: 1 }, ">");

      // 12) Media section flies in
      tl.to(s12Ref.current, { yPercent: 0, duration: 1 }, ">");

      // 13) Footer rises to ~65% visible
      // start at y=100 (off), end at y=35 => footer occupies lower ~65%
      tl.to(footerRef.current, { yPercent: 35, duration: 1 }, ">");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="page">
      <div ref={rootRef} className="storyPin">
        {/* ===== HERO: Fullscreen Video + Horizontal line + title under it (LEFT) ===== */}
        <section ref={s1Ref} className="scene hero">
          <header className="nav">
            <div className="navLeft">
              <div className="navLogo" />
              <div className="navBrand">Visto</div>
            </div>
            <nav className="navLinks">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#how">How it Works</a>
              <a href="#services">Services</a>
              <a href="#solutions">Solutions</a>
            </nav>
            <a className="navCta" href="/get-started">Get Started</a>
          </header>

          <video className="heroVideo" autoPlay muted loop playsInline>
            <source src="https://cdn.coverr.co/videos/coverr-working-on-a-laptop-1579/1080p.mp4" type="video/mp4" />
          </video>

          {/* Bottom 25% overlay across entire width */}
          <div className="heroBottom">
            <div className="heroLineTitle">
              <div className="heroLine" />
              <div className="heroTitle">Visto</div>
            </div>
          </div>
        </section>

        {/* 2) Solid cover */}
        <section ref={s2Ref} className="scene solidCover">
          <div className="contentCenter">
            <h2>Solid cover</h2>
            <p>This scrolls up and fully covers the hero (including the title).</p>
          </div>
        </section>

        {/* 3) Image cover + right 60% panel */}
        <section ref={s3Ref} className="scene imageCover">
          <div className="bgImage" style={{ backgroundImage: "url(https://picsum.photos/2200/1300?blur=1)" }} />
          <div className="rightGlass">
            <h2>Right-side text panel</h2>
            <p>Background is 60% transparent. Image covers the solid section.</p>
          </div>
        </section>

        {/* 4) Split vertical -> opposite horizontal */}
        <section ref={s4Ref} className="scene splitV">
          <div className="splitWrap">
            <div ref={s4Left} className="half leftHalf">
              <div className="halfInner" style={{ backgroundImage: "url(https://picsum.photos/1600/1200?10)" }} />
              <div className="halfText">
                <h3>Left lane</h3>
                <p>Moves left with its text.</p>
              </div>
            </div>
            <div ref={s4Right} className="half rightHalf">
              <div className="halfInner" style={{ backgroundImage: "url(https://picsum.photos/1600/1200?11)" }} />
              <div className="halfText">
                <h3>Right lane</h3>
                <p>Moves right with its text.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5) New pic + left text -> split horizontal opposite vertical */}
        <section ref={s5Ref} className="scene splitH">
          <div className="splitHWrap">
            <div ref={s5Top} className="hHalf topHalf">
              <div className="hBg" style={{ backgroundImage: "url(https://picsum.photos/2200/1300?12)" }} />
              <div className="leftOverlay">
                <h2>Text on the left</h2>
                <p>Then the image splits horizontally and the halves move opposite vertically.</p>
              </div>
            </div>
            <div ref={s5Bottom} className="hHalf bottomHalf">
              <div className="hBg" style={{ backgroundImage: "url(https://picsum.photos/2200/1300?13)" }} />
            </div>
          </div>
        </section>

        {/* 6) Center text dissolves -> split vertical swipe out */}
        <section ref={s6Ref} className="scene splitOut">
          <div className="splitWrap">
            <div ref={s6Left} className="half leftHalf">
              <div className="halfInner" style={{ backgroundImage: "url(https://picsum.photos/1600/1200?14)" }} />
            </div>
            <div ref={s6Right} className="half rightHalf">
              <div className="halfInner" style={{ backgroundImage: "url(https://picsum.photos/1600/1200?15)" }} />
            </div>
          </div>

          <div ref={s6Text} className="centerDissolve">
            <h2>Center text</h2>
            <p>Dissolves as halves swipe out left/right.</p>
          </div>
        </section>

        {/* 7) Solid color section */}
        <section ref={s7Ref} className="scene solidCover altSolid">
          <div className="contentCenter">
            <h2>Another solid section</h2>
            <p>Appears from under the image.</p>
          </div>
        </section>

        {/* 8) Text + table right, hover expands row + shows desc + image */}
        <section ref={s8Ref} className="scene tableScene">
          <div className="tableLayout">
            <div className="tableLeft">
              <h2>Features</h2>
              <p>Hover a row: it expands, shows description below and image to the right.</p>
            </div>

            <div className="tableRight">
              <div className="hoverTable">
                {rows.map((r, i) => {
                  const active = hoverIdx === i;
                  return (
                    <div
                      key={r.n}
                      className={`row ${active ? "active" : ""}`}
                      onMouseEnter={() => setHoverIdx(i)}
                    >
                      <div className="rowHead">
                        <div className="rowNum">{r.n}</div>
                        <div className="rowTitle">{r.title}</div>
                      </div>

                      <div className="rowBody">
                        <div className="rowDesc">{r.desc}</div>
                        <div className="rowImg" style={{ backgroundImage: `url(${r.img})` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 9) Half split: left image swaps by sliding out; text changes at 75% */}
        <section ref={s9Ref} className="scene swapScene">
          <div className="swapWrap">
            <div className="swapLeft">
              <div className="imgStack">
                <div ref={s9Img3} className="imgLayer" style={{ backgroundImage: "url(https://picsum.photos/1200/1400?21)" }} />
                <div ref={s9Img2} className="imgLayer" style={{ backgroundImage: "url(https://picsum.photos/1200/1400?20)" }} />
                <div ref={s9Img1} className="imgLayer" style={{ backgroundImage: "url(https://picsum.photos/1200/1400?19)" }} />
              </div>
            </div>

            <div className="swapRight">
              <div className="swapText">
                <div ref={s9Text1} style={{ opacity: 1 }}>
                  <h2>Text 1</h2>
                  <p>When image is ~75% out, this text is replaced.</p>
                </div>
                <div ref={s9Text2} style={{ opacity: 0 }}>
                  <h2>Text 2</h2>
                  <p>Same behavior again: slide-out, replace text at ~75%.</p>
                </div>
                <div ref={s9Text3} style={{ opacity: 0 }}>
                  <h2>Text 3</h2>
                  <p>Final state after the second swap.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10) Products flip cards */}
        <section ref={s10Ref} className="scene products">
          <div className="sectionPad">
            <h2>Products</h2>
            <p>Hover flips. Click goes to product page.</p>

            <div className="cardGrid">
              {products.map((p) => (
                <a key={p.title} className="flipCard" href={p.href}>
                  <div className="flipInner">
                    <div className="flipFront">
                      <div className="cardTitle">{p.title}</div>
                      <div className="cardMeta">Hover</div>
                    </div>
                    <div className="flipBack">
                      <div className="cardDesc">{p.desc}</div>
                      <div className="cardMeta">Click</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 11) Three containers side-by-side with bottom 15% faded box */}
        <section ref={s11Ref} className="scene tiles">
          <div className="tilesGrid">
            {[31, 32, 33].map((n) => (
              <div key={n} className="tile" style={{ backgroundImage: `url(https://picsum.photos/1200/1400?${n})` }}>
                <div className="tileCaption">
                  <div className="tileTitle">Title</div>
                  <div className="tileText">Text underneath, aligned left.</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 12) Media section with title top-left + link */}
        <section ref={s12Ref} className="scene mediaLink">
          <div className="mediaBg" style={{ backgroundImage: "url(https://picsum.photos/2200/1300?50)" }} />
          <div className="mediaTopLeft">
            <h2>Go deeper</h2>
            <a href="/about" className="navCta">Open page</a>
          </div>
        </section>

        {/* Footer rises to ~65% */}
        <footer ref={footerRef} className="scene footer">
          <div className="ticker">
            <div className="tickerTrack">
              <span>Visto • Home • About • How it Works • Services • Solutions • </span>
              <span>Visto • Home • About • How it Works • Services • Solutions • </span>
              <span>Visto • Home • About • How it Works • Services • Solutions • </span>
            </div>
          </div>

          <div className="footerBody">
            <div className="footerCol">
              <div className="brandBlock">
                <div className="navLogo" />
                <div>
                  <div className="footerBrand">Visto</div>
                  <div className="footerSub">Subtitle under company logo</div>
                </div>
              </div>

              <div className="subscribe">
                <div className="subscribeTitle">Subscribe</div>
                <div className="subscribeRow">
                  <input placeholder="Your email" />
                  <button>Join</button>
                </div>
              </div>
            </div>

            <div className="footerLinks">
              <div>
                <div className="linkTitle">Company links</div>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#how">How it Works</a>
                <a href="#services">Services</a>
                <a href="#solutions">Solutions</a>
              </div>
              <div>
                <div className="linkTitle">CMS</div>
                <a href="/news">News</a>
                <a href="/news-article">News Article</a>
                <a href="/contact">Contact</a>
              </div>
              <div>
                <div className="linkTitle">Policies</div>
                <a href="/privacy">Privacy Policy</a>
                <a href="/cookie">Cookie Policy</a>
                <a href="/terms">Term of Use</a>
                <a href="/cookie-preferences">Cookie Preferences</a>
                <a href="/risk">Disclaimer Risk</a>
              </div>
            </div>
          </div>

          <div className="footerLine" />

          <div className="footerBottom">
            <div>© Visto</div>
            <div className="social">
              <a href="https://x.com">X</a>
              <a href="https://linkedin.com">LinkedIn</a>
              <a href="https://youtube.com">YouTube</a>
            </div>
          </div>

          <div className="disclaimer">Disclaimer line going from left to the right</div>
        </footer>
      </div>
    </div>
  );
}
