/*
  Grace's Kitchen — cinematic restaurant landing page
  -------------------------------------------------
  Modify colours, images, and animation speed here.
  Use the variables below for quick theme changes.
*/

:root {
  --bg: #0b0a0d;
  --bg-soft: #151215;
  --bg-strong: #1d1a1d;
  --panel: rgba(255, 255, 255, 0.06);
  --panel-strong: rgba(255, 255, 255, 0.1);
  --card: rgba(255, 255, 255, 0.04);
  --text: #f7f2eb;
  --muted: #d9c6b4;
  --accent: #f0b25b;
  --accent-deep: #d77d2a;
  --olive: #a8b67b;
  --olive-soft: #dfe5c5;
  --line: rgba(255, 255, 255, 0.09);
  --shadow: 0 32px 80px rgba(0, 0, 0, 0.55);
  --shadow-soft: 0 20px 40px rgba(0, 0, 0, 0.32);
  --radius: 28px;
  --strip-count: 18;
  --motion-speed: 1;
  --film-grain: rgba(255, 255, 255, 0.04);
  --hero-glow: rgba(240, 178, 91, 0.22);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: auto;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(circle at top left, rgba(240, 178, 91, 0.12), transparent 20%),
    radial-gradient(circle at right, rgba(168, 182, 123, 0.1), transparent 18%),
    linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 100%);
  color: var(--text);
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)),
    linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px);
  background-size: 100% 100%, 14px 14px, 14px 14px;
  mix-blend-mode: soft-light;
  opacity: 0.55;
}

img {
  display: block;
  width: 100%;
}

button,
input,
select {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

.page-shell {
  min-height: 100vh;
  overflow: hidden;
}

.page-shell::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at center, transparent 55%, rgba(0, 0, 0, 0.38) 100%);
  z-index: 50;
}

.container {
  width: min(1170px, calc(100% - 40px));
  margin: 0 auto;
}

.section-space {
  padding: 110px 0;
}

.eyebrow {
  display: inline-block;
  margin: 0 0 14px;
  padding: 9px 16px;
  border-radius: 999px;
  background: rgba(240, 178, 91, 0.12);
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.eyebrow.dark {
  background: rgba(168, 182, 123, 0.12);
  color: var(--olive-soft);
}

h1,
h2,
h3 {
  margin: 0 0 16px;
  font-family: "Cormorant Garamond", serif;
  line-height: 0.96;
  letter-spacing: -0.04em;
}

h1 {
  font-size: clamp(3.65rem, 7vw, 7rem);
}

h2 {
  font-size: clamp(2.5rem, 4vw, 4.2rem);
}

h3 {
  font-size: clamp(1.8rem, 2.3vw, 2.5rem);
}

p {
  margin: 0 0 12px;
  color: var(--muted);
  line-height: 1.7;
  font-size: 1.04rem;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 24px 0 18px;
  backdrop-filter: blur(18px);
  background: rgba(9, 9, 12, 0.44);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.nav-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-deep) 100%);
  color: #fff;
  font-family: "Cormorant Garamond", serif;
  font-size: 2rem;
  font-weight: 700;
  box-shadow: var(--shadow-soft);
}

.brand-name {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
}

.brand-tag {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.main-nav a {
  position: relative;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
}

.main-nav a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.main-nav a:hover::after,
.main-nav a:focus-visible::after {
  transform: scaleX(1);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.link-btn,
.primary-btn,
.secondary-btn,
.whatsapp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 24px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.link-btn,
.secondary-btn,
.whatsapp-btn {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.08);
}

.primary-btn {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-deep) 100%);
  color: #fff;
  box-shadow: 0 18px 32px rgba(215, 125, 42, 0.28);
}

.whatsapp-btn {
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.18), rgba(7, 94, 84, 0.2));
  border-color: rgba(37, 211, 102, 0.4);
  color: #e9fff2;
}

.primary-btn:hover,
.secondary-btn:hover,
.link-btn:hover,
.whatsapp-btn:hover,
.filter-btn:hover {
  transform: translateY(-2px);
}

.menu-toggle {
  display: none;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  margin: 5px auto;
  background: var(--text);
  border-radius: 10px;
}

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 80px 0 72px;
  overflow: hidden;
}

.hero-bg-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.2);
  filter: saturate(0.95) contrast(1.1) brightness(0.72);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(11, 10, 13, 0.78) 0%, rgba(11, 10, 13, 0.48) 30%, rgba(11, 10, 13, 0.18) 55%, rgba(11, 10, 13, 0.7) 100%),
    linear-gradient(180deg, rgba(11, 10, 13, 0.24) 0%, rgba(11, 10, 13, 0.72) 100%);
}

.hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 54px;
  align-items: center;
}

.hero-copy {
  position: relative;
  z-index: 1;
}

.hero-title {
  max-width: 620px;
  margin-bottom: 12px;
  font-size: clamp(4.2rem, 8vw, 7.5rem);
  line-height: 0.86;
  letter-spacing: -0.06em;
  text-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
}

.hero-subtitle {
  margin: 0 0 12px;
  font-size: clamp(1.2rem, 2vw, 2rem);
  font-family: "Cormorant Garamond", serif;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.hero-text {
  max-width: 560px;
  margin-bottom: 28px;
  font-size: 1.08rem;
  color: rgba(255, 255, 255, 0.78);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 34px;
}

.hero-eyebrow {
  color: var(--accent);
  background: rgba(240, 178, 91, 0.1);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 18px;
  max-width: 540px;
}

.hero-stats div {
  padding: 20px 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: var(--shadow-soft);
}

.hero-stats strong {
  display: block;
  margin-bottom: 4px;
  font-size: 1.6rem;
  color: var(--text);
}

.hero-stats span {
  color: var(--muted);
  font-size: 0.82rem;
}

.hero-visual {
  position: relative;
  min-height: 620px;
  perspective: 1300px;
}

.visual-panel {
  position: absolute;
  overflow: hidden;
  border-radius: 30px;
  background: #f1e9e2;
  box-shadow: var(--shadow);
}

.main-panel {
  right: 32px;
  top: 40px;
  width: min(88%, 520px);
  height: 470px;
  transform: rotateY(-14deg) rotateX(5deg);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.side-panel {
  left: 20px;
  bottom: 0;
  width: min(55%, 300px);
  height: 330px;
  border: 12px solid rgba(255, 255, 255, 0.4);
  transform: rotateY(20deg) rotateX(8deg);
}

.visual-panel img {
  height: 100%;
  object-fit: cover;
}

.floating-tag {
  position: absolute;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(28, 27, 26, 0.06);
  color: var(--text);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: var(--shadow-soft);
}

.tag-top {
  top: 26px;
  right: 24px;
}

.tag-bottom {
  bottom: 24px;
  left: 18px;
}

.floating-card {
  position: absolute;
  padding: 15px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-soft);
}

.floating-card p {
  margin: 0 0 4px;
  color: var(--text);
  font-weight: 700;
}

.floating-card span {
  color: var(--muted);
  font-size: 0.78rem;
}

.card-left {
  left: -12px;
  bottom: 18px;
}

.about,
.menu,
.experience,
.gallery,
.reservation,
.testimonials {
  position: relative;
  background: transparent;
}

.about,
.gallery,
.reservation {
  padding-top: 28px;
}

.story-depth {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.depth-word {
  position: absolute;
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(3rem, 7vw, 8rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  color: rgba(255, 255, 255, 0.04);
  filter: blur(0.6px);
}

.w1 { top: 18%; left: 8%; }
.w2 { top: 30%; right: 12%; }
.w3 { top: 55%; left: 22%; }
.w4 { top: 58%; right: 19%; }
.w5 { top: 74%; left: 48%; }

.about-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 52px;
  align-items: center;
}

.about-image-wrap {
  position: relative;
}

.about-image-wrap::before {
  content: "";
  position: absolute;
  inset: -20px -20px auto auto;
  width: 140px;
  height: 140px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(168, 182, 123, 0.2), rgba(240, 178, 91, 0.14));
  z-index: -1;
}

.about-image-wrap img {
  height: 540px;
  object-fit: cover;
  border-radius: 32px;
  box-shadow: var(--shadow);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 28px 0 0;
  display: grid;
  gap: 16px;
}

.feature-list li {
  position: relative;
  padding-left: 28px;
  color: var(--text);
  font-weight: 600;
}

.feature-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  color: var(--olive);
  font-weight: 800;
}

.section-heading {
  margin-bottom: 42px;
  text-align: center;
}

.section-heading.small {
  margin-bottom: 32px;
}

.menu-filters {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 30px;
}

.filter-btn {
  padding: 12px 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--olive) 0%, rgba(168, 182, 123, 0.8) 100%);
  border-color: transparent;
  color: #fff;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  perspective: 1400px;
}

.menu-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: var(--shadow-soft);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  transform-style: preserve-3d;
}

.menu-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 34px 50px rgba(0, 0, 0, 0.18);
}

.jollof-highlight {
  transform: translateZ(50px);
  box-shadow: 0 40px 70px rgba(215, 125, 42, 0.18);
}

.jollof-highlight .menu-image::after {
  content: "Chef’s star";
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 1;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.38);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.menu-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.menu-image img {
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.menu-card:hover .menu-image img {
  transform: scale(1.06);
}

.menu-body {
  padding: 22px 20px 22px;
}

.menu-topline {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 8px;
}

.menu-topline h3 {
  font-size: 2rem;
  margin: 0;
  line-height: 1;
}

.menu-topline span {
  font-weight: 800;
  color: var(--accent);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.feature-card {
  padding: 32px 26px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: var(--shadow-soft);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  margin-bottom: 18px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(240, 178, 91, 0.18), rgba(168, 182, 123, 0.12));
  color: var(--accent);
  font-size: 1.05rem;
  font-weight: 800;
}

.gallery-stage {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 1fr 1fr;
  gap: 20px;
  perspective: 1600px;
  transform-style: preserve-3d;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: #e6dfd8;
  box-shadow: var(--shadow-soft);
  transform-style: preserve-3d;
}

.gallery-item img {
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.gallery-item.tall {
  grid-row: span 2;
  min-height: 620px;
}

.gallery-item.wide {
  grid-column: span 2;
  min-height: 280px;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

blockquote {
  margin: 0;
  padding: 28px 24px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-soft);
  color: var(--text);
  font-size: 1.06rem;
  line-height: 1.8;
}

blockquote footer {
  margin-top: 16px;
  color: var(--accent);
  font-weight: 700;
}

.reservation-wrap {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 28px;
  align-items: center;
  padding: 42px 38px;
  border: 1px solid var(--line);
  border-radius: 32px;
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(240,178,91,0.06));
  box-shadow: var(--shadow);
}

.reservation-copy h2 {
  max-width: 480px;
}

.reservation-actions {
  margin-top: 18px;
}

.reservation-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  padding: 18px 8px 8px;
}

.input-group {
  display: grid;
  gap: 8px;
}

.input-group label {
  color: var(--text);
  font-weight: 600;
}

.input-group input,
.input-group select {
  width: 100%;
  min-height: 54px;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

.input-group input:focus,
.input-group select:focus {
  outline: 2px solid rgba(240, 178, 91, 0.25);
  border-color: rgba(240, 178, 91, 0.5);
}

.full-width {
  width: 100%;
  grid-column: 1 / -1;
  margin-top: 6px;
}

.site-footer {
  position: relative;
  padding-top: 28px;
  background: rgba(11, 10, 13, 0.96);
  color: rgba(255, 255, 255, 0.85);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 30px;
  padding: 32px 0 36px;
}

.footer-brand {
  margin-bottom: 12px;
}

.footer-copy {
  max-width: 280px;
  color: rgba(255, 255, 255, 0.7);
}

.site-footer h3 {
  margin-bottom: 14px;
  font-size: 1.5rem;
  color: #fff;
}

.site-footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
  color: rgba(255, 255, 255, 0.7);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-bottom .container {
  padding: 18px 0 28px;
}

.footer-bottom p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}

.section-transition {
  position: relative;
  overflow: hidden;
}

.strip-reveal {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(var(--strip-count), minmax(0, 1fr));
  pointer-events: none;
  z-index: 20;
}

.strip {
  background: linear-gradient(180deg, rgba(12, 10, 14, 0.88), rgba(23, 18, 20, 0.9));
  border-left: 1px solid rgba(255, 255, 255, 0.04);
  opacity: 0;
  transform: translateY(110%);
  will-change: transform, opacity;
}

.pixel-footer {
  position: relative;
  overflow: hidden;
}

.pixel-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 12px 12px;
  mix-blend-mode: screen;
}

@media (max-width: 980px) {
  .hero-grid,
  .about-grid,
  .reservation-wrap,
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .menu-grid,
  .feature-grid,
  .testimonial-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .gallery-stage {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .gallery-item.tall,
  .gallery-item.wide {
    grid-column: auto;
    grid-row: auto;
    min-height: 420px;
  }

  .main-nav {
    position: absolute;
    top: calc(100% + 12px);
    left: 20px;
    right: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    padding: 22px 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 22px;
    background: rgba(24, 20, 22, 0.9);
    box-shadow: var(--shadow-soft);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-8px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .main-nav.is-open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .menu-toggle {
    display: block;
  }
}

@media (max-width: 640px) {
  .nav-wrap {
    gap: 12px;
  }

  .nav-actions .link-btn,
  .nav-actions .whatsapp-btn {
    display: none;
  }

  .hero {
    padding-top: 20px;
  }

  .hero-stats,
  .menu-grid,
  .feature-grid,
  .testimonial-grid,
  .reservation-form {
    grid-template-columns: 1fr;
  }

  .gallery-stage {
    grid-template-columns: 1fr;
  }

  .section-space {
    padding: 80px 0;
  }

  .main-panel {
    right: 0;
    width: 100%;
    height: 420px;
  }

  .side-panel {
    left: 0;
    bottom: -16px;
    width: 52%;
    height: 260px;
  }

  .hero-visual {
    min-height: 500px;
  }

  .reservation-wrap {
    padding: 30px 20px;
  }

  .footer-grid {
    gap: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .strip-reveal,
  .pixel-grid {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .main-panel,
  .side-panel,
  .gallery-item,
  .menu-card,
  .hero-bg-image {
    transform: none !important;
  }
}
