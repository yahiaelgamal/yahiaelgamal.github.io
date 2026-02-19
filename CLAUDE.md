# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a coaching/portfolio landing page for Yahia Elgamal (ML Engineering Manager at Spotify), hosted on GitHub Pages. The site promotes interview coaching, technical mentorship, and resume review services via the igotanoffer platform. Pure HTML/CSS/JS with no build step.

## Architecture

### File Structure

```
index.html    - Main landing page (single-page design)
styles.css    - All styling (CSS variables, responsive, animations)
script.js     - Hamburger menu, smooth scroll, IntersectionObserver reveals
images/
  profile.jpeg - Profile photo (used in hero + about sections)
```

### Design System (CSS Variables in styles.css)

- Background: `#FAFBFC` (primary), `#FFFFFF` (surface), `#F5F7FA` (alt)
- Text: `#2C3E50` (primary), `#6B7B8C` (secondary)
- Accent: `#4A90E2` (primary blue), `#27AE60` (success green), `#FFB800` (warning)
- Gradients: Blue-to-purple (`#667eea` to `#764ba2`)
- Typography: Inter font, fluid sizing via `clamp()`
- Effects: Glassmorphism (backdrop-filter blur), animated gradient orbs, CTA shimmer

A dark theme is defined but commented out in styles.css (intentionally disabled).

### Page Sections

1. **Hero** - Headline, social proof stats, dual CTAs, profile image
2. **Services** - 3 service cards (Interview Coaching, Technical Mentorship, Resume Review)
3. **Testimonials** - Client quotes, 5.0 rating display, trust badges
4. **About** - Experience timeline (Spotify, X/Twitter, Meta, Booking.com), expertise tags
5. **Contact** - Primary CTA to igotanoffer, email fallback
6. **Footer** - Copyright, igotanoffer profile link, LinkedIn

### Website Deployment

- Hosted via GitHub Pages
- Branch: `master`
- URL: `https://yahiaelgamal.github.io`
- No build process required - direct HTML/CSS/JS deployment

## Common Commands

### Local Development
```bash
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

### Git Operations
```bash
git status
git add index.html styles.css script.js
git commit -m "Update portfolio content"
git push origin master
```

## Key Files

- `index.html` - Landing page with structured data (JSON-LD), Open Graph tags, semantic HTML
- `styles.css` - ~950 lines: CSS variables, responsive breakpoints (768px, 1024px), animations
- `script.js` - ~65 lines: hamburger menu toggle, smooth scroll, IntersectionObserver
- `images/profile.jpeg` - Profile photo (170 KB, displayed circular in hero, rounded in about)

## Content Guidelines

### Experience Section
Professional history: Spotify, X (Twitter), Meta, Booking.com. Each entry has company emoji, title, and brief description.

### External Links
All `target="_blank"` links must include `rel="noopener noreferrer"`.

### Contact Information
- Primary: igotanoffer coaching platform
- Email: yahiaelgamal@gmail.com

## Notes

- No build tools or dependencies required
- No package.json or configuration files
- Pure HTML/CSS/JavaScript stack
- Images should be optimized before committing
- Mobile navigation uses a hamburger menu with fullscreen overlay
- Accessibility: skip-nav link, focus-visible styles, ARIA labels on interactive elements
