# Mobile Display Issue - Handover Documentation

**Date:** February 10, 2026  
**Git Commit:** ad450c1  
**Branch:** main (pushed to remote)

## Issue Description

On mobile devices (screen width < 768px), the following sections are displaying as completely blank:

1. **Hero section** (HeroVideo component) - Main landing section with video background
2. **Metrics section** (Metrics component) - Statistics display on About page

**Desktop Status:** All sections function correctly on desktop view.

**User Report:** "The Hero section is completely blank and the section above the Footer is completely blank" (referring to Metrics section on About page)

---

## Site Architecture

### Technology Stack
- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Animation Library:** GSAP 3.12+ with ScrollTrigger plugin
- **Routing:** React Router DOM
- **Styling:** CSS with mobile-specific overrides in mobile.css
- **Backend:** Express.js with Nodemailer (for contact form)

### Project Structure
```
src/
├── main.tsx                    # Entry point (imports App.css and mobile.css)
├── App.tsx                     # Router configuration
├── content.ts                  # Centralized content data
├── mobile.css                  # Mobile responsive styles (<768px)
├── pages/
│   ├── Home.tsx               # Home page layout
│   ├── About.tsx              # About page layout
│   └── Contact.tsx            # Contact page layout
├── sections/
│   ├── Hero.tsx               # Static hero content
│   ├── HeroVideo.tsx          # Video background hero (ISSUE: blank on mobile)
│   ├── CoverSolid.tsx         # Stats overlay section
│   ├── TripleCards.tsx        # 3D flip cards
│   ├── Metrics.tsx            # Animated metrics (ISSUE: blank on mobile)
│   ├── AboutHero.tsx          # About page hero with scroll animation
│   └── [other sections]
├── hooks/
│   └── useScene.ts            # GSAP ScrollTrigger wrapper
└── animations/
    └── [animation helpers]
```

### Design Concept

**Core Philosophy:** Scroll-driven storytelling with cinematic animations

**Key Design Patterns:**

1. **Pinned Scroll Animations**
   - Sections pin to viewport while scroll progress drives animations
   - GSAP ScrollTrigger with scrub values (0.5-2) for smooth control
   - Extended pin durations (200%-400%) for multi-phase effects

2. **Video Backgrounds**
   - Full-screen video containers with position: absolute
   - Overlay content with higher z-index
   - Videos set with zIndex: -1, autoPlay, loop, muted, playsInline

3. **3D Transformations**
   - TripleCards use preserve-3d and backfaceVisibility
   - AboutHero breaks image into 8×6 grid (48 pieces)
   - Metrics section uses scale(3)→scale(1) zoom with blur effects

4. **Responsive Strategy**
   - Desktop: Complex scroll animations with pinning
   - Mobile: Simplified layouts in mobile.css, animations disabled where needed
   - Breakpoint: 768px

5. **Content Centralization**
   - All text/images sourced from content.ts
   - Sections import: `import { siteContent } from "../content"`
   - Access pattern: `siteContent.sectionName.property`

---

## Attempted Solutions

### Discovery Phase

**Initial Finding:** Mobile.css file existed but was never imported  
**Action Taken:** Added `import "./mobile.css";` to main.tsx (line 8, after App.css import)  
**Result:** Import successful, but issue persisted

### Mobile.css Modification History

**Attempt 1: Z-index Layering**
- Added explicit z-index values to video containers (0), overlays (1), content (10)
- Changed panel height from `auto` to `100vh`
- Result: No change

**Attempt 2: Simplified Selectors**
- Targeted video containers by background color: `[style*="background: rgb(0, 0, 0)"]`
- Used explicit top/left/right/bottom instead of `inset` shorthand
- Result: No change

**Attempt 3: Remove Overflow Restrictions**
- Removed `overflow: hidden` from panel sections
- Kept videos position: absolute
- Result: No change

**Attempt 4: Explicit Positioning**
- Changed from `inset: 0` to individual properties:
  ```css
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  ```
- Result: No change

**Attempt 5: Minimal Override Approach**
- Stripped all aggressive position/z-index overrides
- Only kept typography and layout adjustments
- Result: No change

**Attempt 6: Complete Rewrite with Organization**
- Reorganized mobile.css by section (Hero, CoverSolid, HoverColumns, etc.)
- Used clear comments for each section
- Disabled Metrics animations on mobile:
  ```css
  section.panel > div > div[style*="willChange"] {
    transform: scale(1) !important;
    opacity: 1 !important;
    filter: blur(0px) !important;
  }
  ```
- Result: No change

### Current Mobile.css State

**File Location:** `src/mobile.css` (233 lines)  
**Import Location:** `src/main.tsx` line 8  
**Media Query:** `@media (max-width: 768px)`

**Key Rules Applied:**
```css
/* Global */
.panel { height: auto !important; min-height: 100vh; }

/* Hero Section */
.hero-grid-layout { grid-template-columns: 1fr !important; }
.hero-logo { height: 10vh !important; }
.hero-title { font-size: 2rem !important; }

/* Metrics Section */
section.panel > div > div[style*="willChange"] {
  transform: scale(1) !important;
  opacity: 1 !important;
  filter: blur(0px) !important;
}

/* TripleCards */
#tripleCards-container {
  flex-direction: column !important;
  gap: 2rem !important;
}
```

**Notable Absences in Final Version:**
- No explicit position overrides for video containers
- No z-index rules
- No aggressive `!important` flags on positioning
- Animations disabled via transform/opacity/filter resets

---

## Component Implementation Details

### HeroVideo.tsx (Lines 94-118)

**Structure:**
```tsx
<section className="panel" style={{ position: "relative", background: "#000" }}>
  {/* Video background container */}
  <div style={{
    position: "absolute",
    inset: 0,
    zIndex: -1,  // Behind content
    width: "100%",
    height: "100%",
    overflow: "hidden"
  }}>
    <video
      autoPlay
      loop
      muted
      playsInline  // Mobile attribute present
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      src={siteContent.hero.videos[0]}
    />
  </div>
  
  {/* Overlay content with higher z-index */}
  <Hero />
</section>
```

**GSAP Usage:** None - static video background

### Metrics.tsx (Lines 26-92)

**Structure:**
```tsx
<section className="panel" style={{
  position: "relative",
  background: "#000",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}}>
  <div style={{ display: "flex", gap: "8rem", flexDirection: "row" }}>
    {metrics.map((metric, index) => (
      <div key={index} style={{ willChange: "transform, opacity, filter" }}>
        <div style={{
          fontSize: "6rem",
          color: "#FFAD01",
          fontWeight: 900,
          transformStyle: "preserve-3d"
        }}>
          {metric.text}
        </div>
      </div>
    ))}
  </div>
</section>
```

**GSAP Animation (Desktop):**
```javascript
gsap.set(metric, { scale: 3, opacity: 0, filter: "blur(30px)" });
gsap.to(metric, {
  scale: 1,
  opacity: 1,
  filter: "blur(0px)",
  ease: "power3.out",
  scrollTrigger: {
    trigger: root.current,
    start: `top+=${index * 25}% top`,
    end: `top+=${index * 25 + 50}% top`,
    scrub: 2,
    pin: true  // Pins section during scroll
  }
});
```

### AboutHero.tsx (Lines 40-165)

**3-Phase Scroll Animation:**
1. **Phase 1 (0-100%):** Image shrinks horizontally (scaleX: 1 → 0.3)
2. **Phase 2 (at 100%):** Image replaced with 48 pieces (8×6 grid)
3. **Phase 3 (120%+):** Pieces slide upward with randomized timing/rotation

**Pin Duration:** 300% of viewport height

---

## Testing Information

**User's Device:** Mobile device (specific model/browser not confirmed)  
**Testing Method:** User manually tested on their mobile device  
**Cache Clearing:** Not confirmed if user performed hard refresh  
**Browser DevTools:** Not confirmed if mobile DevTools inspection was performed

**Iterations Tested:** 6 complete mobile.css rewrites  
**User Response Pattern:** "Still not working" after each iteration

---

## File Modification Summary

**Files Modified in Session:**
- `src/mobile.css` - Rewritten 6 times
- `src/main.tsx` - Added mobile.css import
- `src/sections/TripleCards.tsx` - Added hover hint badge
- `src/sections/AboutHero.tsx` - Complete rewrite for scroll animation
- `src/sections/Metrics.tsx` - New component created
- `src/content.ts` - Added aboutHero and metrics sections
- `src/pages/About.tsx` - Added Metrics component
- `src/App.css` - Added pulseHint and rotateHint keyframes

**New Components Created:**
- `src/sections/Metrics.tsx` (104 lines)
- `src/sections/AboutHero.tsx` (244 lines)
- `src/pages/About.tsx` (38 lines)
- `src/pages/Contact.tsx` (contact form + backend)
- `server/` directory (Express backend for email)

**Git Status:**
- All changes committed: ad450c1
- 60 files changed
- 5,084 insertions (+)
- 580 deletions (-)
- Pushed to origin/main

---

## Video Assets Location

**Hero Video:** Referenced in content.ts  
```typescript
siteContent.hero.videos = ["/Media/Video/hero-video.mp4"]
```

**File Path:** `public/Media/Video/hero-video.mp4`  
**Video Attributes:** autoPlay, loop, muted, playsInline

---

## Additional Context

### Other Mobile-Specific Implementations

**ProductFlip Section:**
```css
#product-flip-container {
  grid-template-columns: repeat(2, 1fr) !important;
}
@media (max-width: 480px) {
  grid-template-columns: 1fr !important;
}
```

**HoverColumns Section:**
```css
.hover-column {
  width: 100% !important;
  min-height: 50vh !important;
}
```

**Footer Section:**
```css
footer > div {
  flex-direction: column !important;
  gap: 2rem !important;
}
```

### Working Mobile Sections

The following sections display correctly on mobile:
- CoverSolid (stats overlay)
- HoverColumns
- HoverTable
- ProductFlip
- TripleCards
- Footer
- AboutHero (with scroll animation)
- AboutOverview

---

## Environment Information

**OS:** Windows  
**Node Version:** (from package.json engines, if specified)  
**Package Manager:** npm  
**Dev Server:** Vite dev server (npm run dev)  
**Build Command:** vite build  
**Preview Command:** vite preview

---

## Next Developer Notes

**Files to Review:**
1. `src/mobile.css` - Current mobile styles
2. `src/sections/HeroVideo.tsx` - Blank hero section
3. `src/sections/Metrics.tsx` - Blank metrics section
4. `src/main.tsx` - CSS import order
5. `src/hooks/useScene.ts` - GSAP ScrollTrigger wrapper

**Testing Recommendations:**
- Verify mobile.css is actually loading (DevTools Network tab)
- Check browser console for JavaScript errors
- Inspect computed styles on mobile device
- Test with hard refresh (Ctrl+Shift+F5 / Cmd+Shift+R)
- Test on different mobile browsers (Chrome, Safari, Firefox)
- Check if videos play on mobile (autoplay restrictions)

**Key Files Not Modified:**
- `src/hooks/useScene.ts` - May need mobile detection logic
- Video source files in `public/Media/Video/`
- Base App.css (only added 2 keyframes)

---

**End of Handover Document**
