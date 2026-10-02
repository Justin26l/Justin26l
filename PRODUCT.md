# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Primary: two audiences served with equal weight — (a) recruiters and hiring managers evaluating Justin for mid-senior software engineering roles, and (b) prospective clients and partners evaluating him for freelance, contract, or product-collaboration work (e.g. xxxTerminal, LightweightPOS).
- Situation: a short-attention evaluation. Visitors scan the page to quickly validate credentials, skills, and work quality, then decide whether to reach out.
- Job to be done: form a fast, credible impression of end-to-end full-stack + UI/UX capability and act on it by contacting Justin.

## Product Purpose

A personal engineering portfolio that presents Justin Lai — identity, featured projects, career journey, and skills — so both hiring decision-makers and potential clients reach out. Success means a visitor who lands decides Justin is credible for their need and contacts him.

## Positioning

End-to-end engineer-designer: not just full-stack software engineering, but the whole arc — system design, UI/UX, backend, mobile, and deployment — evidenced by shipped original products (LightweightPOS, VeryExpress, Spents, xxxTerminal) rather than claims. The portfolio itself is a demonstration of design craft, so its polish is proof, not decoration.

## Operating Context

- Sits under the personal domain xxxterminal.com; the site root redirects to `/sites/portfolio/` (GitHub Pages subpath hosting).
- Content is in English; Justin is bilingual (Mandarin/English), based in Malaysia. Career evidence spans Malaysian employers and institutions (i-tea technology, SIM IT Group, UTM Space, Lincoln University College, LHDN e-invoice).
- The portfolio is one node in a small ecosystem of sibling products: xxxTerminal (trading-bot SAAS), LightweightPOS (offline-first POS PWA), VeryExpress (OSS Express API generator), Spents (offline-first ledger POC), plus a GitBook SE docs site and a Notion tech blog.
- Build pipeline: Vue 3 + Vite + Tailwind CSS v4. Source lives in `source/portfolio/`; the built static output is committed to `sites/portfolio/` for hosting.
- Socials and outbound channels: LinkedIn, GitHub (Justin26l), GitBook (justin-se-docs).

## Capabilities and Constraints

- Sections: Profile (photo, title, socials), Portfolio (featured projects with images and links), Journey (year-by-year timeline 2021–2026 with employers and certificates), Skills (table), Contact.
- Portfolio is two-tier: a scroll-driven **highlight reel** (four projects, each with a pinned full-viewport stage that scales up as you scroll and steps through its photo set) followed by an **"Other Builds" grid** grouped by provenance.
- **Provenance is a first-class distinction**: employment work at SIM IT Sdn Bhd (2023–2026) versus independent / open-source work. It is marked by a badge on every card, by the reel's progress rail, and by the grid's group headings. The section's data lives in `source/portfolio/src/data/projects.js`, sourced from the PortfolioLLM knowledge tree (`/home/justin/Documents/PortfolioLLM/knowledge/`) — not invented on the site.
- Highlighted projects: MCPlus Mobile Apps & Admin Ecosystem (SIM IT), Simbiz e-Invoice / MyInvois (SIM IT), Digital Clone Portfolio AI (personal), xxxTerminal.com (personal).
- Grid projects: Simbiz Accounting ERP (SIM IT), LightweightPOS (SIM IT), VeryExpress (personal), Spents mobile app (personal).
- Projects with no real screenshot yet render a typographic cover rather than a faked image: MCPlus, Simbiz e-Invoice, Simbiz Accounting ERP. Supplying real captures for these would strengthen the reel considerably.
- Open provenance question: `experience.md` credits LightweightPOS to SIM IT Sdn Bhd, but its own case study describes a personal freemium product on pos.xxxterminal.com open-sourced under Justin26l. It is currently filed under SIM IT Sdn Bhd and needs the owner's confirmation.
- Contact is outbound only — no contact form; the section links to LinkedIn, GitHub, and GitBook.
- Static site: no backend; everything is client-side.
- Content is real and factual — career dates, employers, certificates, and product claims. Do not fabricate or add claims.
- Confirmed direction (as of 2026-08): keep the incumbent visual world and expand content — add more projects and sections over time.

## Brand Commitments

- Name: Justin Lai (display name "Justin", handle Justin26l).
- Voice: concise, professional English; product names carry a playful, confident tone.
- The incumbent visual identity (dark base with lime/orange accents and custom SVG geometry motifs) is confirmed as the committed direction for future work — expand within it, don't replace it.

## Evidence on Hand

- Real project images in `source/portfolio/public/img/` and the built `sites/portfolio/img/`: `profilePic.png`, `spentsMobile.png`, `spents.jpg`, `xxxTerminal.png`, `vex.png`, `lightweightPos.png`, `digitalClone.png`, `digitalCloneAbout.jpg`, `digitalCloneChat.jpg`.
- Design references for the Portfolio section live in `source/portfolio/wireframe/`: `projects-section-wireframe.html` (v1, kept as a reference copy) and `projects-section-wireframe-v2.html` (the version that was implemented), plus a `media/` folder. These are standalone HTML wireframes, not part of the build.
- Real outbound links: LinkedIn, GitHub, GitBook, Fiverr, Google Drive certificate documents, and employer/product sites (Simbiz, Simtrain, MCPlus, VeryExpress npm/GitHub, LightweightPOS GitHub, pos.xxxterminal.com).
- Journey timeline (2021–2026) with named employers, certificates, and roles.
- Absences that must not be fabricated: no testimonials, no resume/CV download, no pricing, no case-study documents.

## Product Principles

1. **Real work over claims** — every capability claim traces to a shipped project or certificate; the portfolio's own craft is part of the evidence.
2. **Dual audience, single prompt** — serve hiring decision-makers and potential clients in one pass, and steer both toward reaching out.
3. **Expand, don't replace** — keep the committed visual identity and content voice; growth is additive.
4. **Facts stay factual** — career history, employers, certificates, and product links are real and must not be padded or invented.
5. **The site is the proof** — the portfolio itself demonstrates the designer's skill, so craft quality is a product requirement, not an afterthought.
