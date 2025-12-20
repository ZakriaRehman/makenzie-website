# Makenzie - AI & Data Engineering Solutions

A modern, professional landing page for Makenzie, an IT services company specializing in AI engineering and data engineering.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Features

- 🎨 Clean, professional black & white design
- 🔝 Fixed navigation header with Makenzie branding
- 🎬 Animated hero section with content slider
- 📱 Fully responsive (mobile-first approach)
- ⚡ Fast page load and optimized performance
- 🔍 SEO-optimized with proper metadata
- ♿ Accessible with semantic HTML
- 🎯 Clear call-to-actions for lead generation
- 💼 Professional international appeal (inspired by top tech companies)

## Project Structure

```
makenzie-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── page.tsx            # Main landing page
│   │   └── globals.css         # Global styles
│   └── components/
│       ├── Navbar.tsx          # Fixed navigation header
│       ├── Hero.tsx            # Hero section with slider
│       ├── Services.tsx        # Services grid
│       ├── WhyChooseUs.tsx     # Benefits section
│       ├── TechStack.tsx       # Technologies we use
│       ├── Process.tsx         # 4-step process
│       ├── Industries.tsx      # Industries we serve
│       ├── CTA.tsx             # Contact section
│       └── Footer.tsx          # Footer with contact info
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

Your site will be live with automatic HTTPS and global CDN.

### Alternative Deployment Options

- **Netlify**: Connect your Git repository and deploy
- **AWS Amplify**: Deploy using AWS services
- **Digital Ocean App Platform**: Deploy with a few clicks
- **Self-hosted**: Build the project and deploy the `.next` folder with Node.js

## Customization

### Update Contact Information

Edit the contact details in:
- [src/components/CTA.tsx](src/components/CTA.tsx)
- [src/components/Footer.tsx](src/components/Footer.tsx)

### Update Calendly Link

Replace the placeholder Calendly link in:
- [src/components/Hero.tsx](src/components/Hero.tsx) (line ~30)
- [src/components/CTA.tsx](src/components/CTA.tsx) (line ~20)

### Modify Colors

The website uses a professional black & white color scheme. Update the color scheme in [tailwind.config.ts](tailwind.config.ts) if needed. The current theme uses grayscale colors for a clean, modern look.

### Update Metadata

Edit SEO metadata in [src/app/layout.tsx](src/app/layout.tsx).

## Performance Optimizations

- ✅ Automatic code splitting
- ✅ Optimized images (when added)
- ✅ Font optimization with Next.js Font
- ✅ Minimal JavaScript bundle
- ✅ CSS optimization with Tailwind

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private and proprietary. All rights reserved by Makenzie.

## Contact

- **Email**: hello@makenzie.co
- **Website**: https://makenzie.co
- **Phone**: +92 349 4785382

---

Built with ❤️ by Makenzie
