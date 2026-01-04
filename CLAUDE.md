# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal portfolio website for Yahia Elgamal hosted on GitHub Pages. The repository contains a static HTML/CSS/JavaScript website showcasing professional experience, interests, and services in machine learning and AI.

## Architecture

### Current Structure

The repository has two distinct website versions:

1. **Active Site (Root Level)**
   - `index.html` - Main portfolio page with custom styling (currently active)
   - `images/` - Contains profile photo and header image
   - Inline CSS with custom color scheme (#C8D2D2 background, #56676D navigation)
   - Single-page design with sections: About, Experience, Services, Interests, Contact

2. **Alternative Template (new_template/)**
   - HTML5 UP "Dimension" template - a modal-based single-page design
   - `new_template/index.html` - Alternative portfolio with modal "pages"
   - `new_template/assets/` - CSS, JavaScript (jQuery), and Font Awesome
   - Not currently deployed but available for future use

### Website Deployment

- Hosted via GitHub Pages
- Branch: `master`
- URL pattern: `http://yahiaelgamal.github.io`
- No build process required - direct HTML/CSS/JS deployment

## Common Commands

### Git Operations
```bash
# View current status
git status

# Add and commit changes
git add index.html
# (use the git claude command to split and describe commits)
git commit -m "Update portfolio content"

# Push to GitHub Pages
git push origin master
```

### Local Development
```bash
# Serve locally (Python 3)
python3 -m http.server 8000

# Serve locally (Python 2)
python -m SimpleHTTPServer 8000

# Then visit: http://localhost:8000
```

## Key Files

- `index.html` - Main portfolio page (root level, currently active)
- `images/profile.jpeg` - Profile photo (200px circular display)
- `images/header.jpeg` - Header background image
- `new_template/index.html` - Alternative design template (not active)

## Content Guidelines

### Experience Section
Professional history includes roles at Spotify, Twitter, Meta (Facebook), and Booking.com. When updating experience entries, maintain the structure:
- Company name, job title, location
- Date range
- Bulleted list of achievements/responsibilities
- Technologies used (where applicable)

### Color Scheme
Current active site uses:
- Background: `#C8D2D2`
- Text: `#6F8384`
- Navigation bar: `#56676D`
- Navigation text: `#E8EEEE`
- Hover accent: `#ffd700` (gold)
- Section backgrounds: `#F0F1F3`

### Contact Information
Contact email follows pattern: `[firstname][lastname]@gmail.com`

## Switching Templates

To switch from current design to the HTML5 UP template:
1. Backup current `index.html`: `mv index.html index_backup.html`
2. Copy template: `cp new_template/index.html index.html`
3. Copy assets: `cp -r new_template/assets .`
4. Update content in modal sections
5. Commit and push changes

## Notes

- No build tools or dependencies required
- No package.json or configuration files
- Pure HTML/CSS/JavaScript stack
- Images should be optimized before committing (large files in repo)
- Template in `new_template/` is licensed under CCA 3.0 from HTML5 UP
