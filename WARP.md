# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a simple, responsive website built with vanilla HTML, CSS, and JavaScript. It features a fixed header with smooth scrolling navigation, clean modern styling, and responsive design patterns.

## Architecture & Structure

### Core Components
- **`index.html`** - Single-page application with semantic sections (home, about, contact)
- **`css/style.css`** - Centralized styling with CSS reset, responsive breakpoints, and modern layout patterns
- **`js/script.js`** - Client-side functionality for smooth scrolling and active navigation state management

### Key Design Patterns
- **Fixed Header Navigation**: Header remains at top with `position: fixed` and appropriate `z-index`
- **Smooth Scrolling**: JavaScript handles navigation clicks with `scrollTo` API and header height compensation
- **Active State Management**: Scroll event listener dynamically updates active navigation links
- **Responsive Design**: Mobile-first approach with breakpoint at 768px

## Development Commands

### Local Development Server
Start a local development server to test the website:

```bash
# Python 3 (recommended)
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if http-server is available)
npx http-server

# PHP alternative
php -S localhost:8000
```

Then access the site at `http://localhost:8000`

### File Watching & Live Reload
For development with automatic browser refresh, you can use:

```bash
# Using Node.js live-server (if installed)
npx live-server

# Using Python with browser-sync (requires Node.js)
npx browser-sync start --server --files "*.html,css/*.css,js/*.js"
```

## Code Organization

### HTML Structure
- Semantic HTML5 elements (`header`, `nav`, `main`, `section`, `footer`)
- Navigation uses anchor links (`#home`, `#about`, `#contact`) for smooth scrolling
- Single-page layout with content sections identified by IDs

### CSS Architecture
- **CSS Reset**: Universal box-sizing and margin/padding reset
- **Component-based**: Styles organized by component (header, nav, main, section, footer)
- **Responsive Utilities**: Mobile breakpoint adjustments in media queries
- **Color Scheme**: Consistent color palette using `#2c3e50` and `#34495e`

### JavaScript Functionality
- **Event-driven**: Uses `DOMContentLoaded` for initialization
- **Smooth Scrolling**: Calculates target positions accounting for fixed header
- **Active Navigation**: Scroll position tracking to highlight current section
- **Progressive Enhancement**: Graceful degradation if JavaScript is disabled

## Common Development Tasks

### Adding New Sections
1. Add new `<section>` with unique `id` in `index.html`
2. Add corresponding navigation link in header `<nav>`
3. Style new section in `css/style.css` if custom styling needed
4. JavaScript will automatically handle smooth scrolling and active states

### Updating Styles
- Global styles: Modify CSS reset and body styles in `style.css`
- Component styles: Update specific component sections
- Responsive: Add/modify breakpoints in `@media` queries
- Colors: Update color variables throughout the stylesheet

### Adding Images
- Place image files in the `images/` directory
- Reference in HTML using relative paths: `<img src="images/filename.jpg">`
- Consider adding CSS for responsive images and optimization

## Browser Compatibility

The codebase uses modern web standards:
- **CSS**: Flexbox, CSS3 transitions, media queries
- **JavaScript**: ES6+ features (const/let, arrow functions, template literals)
- **APIs**: Smooth scrolling behavior, modern DOM methods

Target browsers: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)