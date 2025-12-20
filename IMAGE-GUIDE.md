# Image Guide for Makenzie Website

## Full-Screen Hero Slider Images

The hero slider is designed to display professional, high-quality images that represent your brand and services.

### Recommended Image Specifications

- **Dimensions**: 1920x1080 pixels (minimum) or higher
- **Aspect Ratio**: 16:9
- **Format**: JPG or WebP for best performance
- **File Size**: Under 500KB (optimize with tools like TinyPNG or ImageOptim)
- **Quality**: Professional photography or high-quality stock images

### Suggested Image Themes

#### Slide 1: Global Technology / AI Solutions
- Earth from space showing connectivity
- Global network visualization
- Abstract AI/technology patterns
- Modern data center
- **Color mood**: Dark blues, teals, or blacks with bright accents

#### Slide 2: Healthcare Technology
- Modern hospital interior
- Healthcare professional using tablet/technology
- Medical imaging with AI overlay
- Clean, bright medical facility
- **Color mood**: Clean whites, medical blues, professional

#### Slide 3: Data & Analytics
- Modern office with large screens showing analytics
- Data visualization dashboards
- Server room or cloud infrastructure
- Business professionals in meeting room
- **Color mood**: Professional grays, blues, dark tones

### Where to Find Professional Images

**Free Stock Photos:**
- [Unsplash](https://unsplash.com/) - High-quality free images
- [Pexels](https://www.pexels.com/) - Free stock photos and videos
- [Pixabay](https://pixabay.com/) - Free images and videos

**Premium Stock Photos:**
- [Shutterstock](https://www.shutterstock.com/)
- [Adobe Stock](https://stock.adobe.com/)
- [iStock](https://www.istockphoto.com/)

**Search Terms to Use:**
- "earth from space network"
- "global technology connectivity"
- "modern hospital technology"
- "healthcare AI medical"
- "data center servers"
- "analytics dashboard office"
- "business meeting modern office"
- "ai technology abstract"

### How to Add Images

1. **Create images folder:**
   ```bash
   mkdir public/images
   ```

2. **Add your optimized images to the folder:**
   ```
   public/
   └── images/
       ├── hero-slide-1.jpg
       ├── hero-slide-2.jpg
       └── hero-slide-3.jpg
   ```

3. **Update the Hero component** (`src/components/Hero.tsx`):

   Replace the gradient backgrounds with your image paths:

   ```typescript
   const slides = [
     {
       title: 'AI & Data Engineering Solutions for Modern Businesses',
       subtitle: 'We build custom AI systems and data pipelines that scale — from concept to production',
       image: '/images/hero-slide-1.jpg',  // ← Update this
       overlay: 'rgba(0, 0, 0, 0.5)',
     },
     {
       title: 'Healthcare AI That Transforms Patient Care',
       subtitle: 'HIPAA-compliant AI solutions built for the modern healthcare industry',
       image: '/images/hero-slide-2.jpg',  // ← Update this
       overlay: 'rgba(0, 0, 0, 0.5)',
     },
     {
       title: 'Enterprise Data Pipelines That Scale',
       subtitle: 'Production-ready data infrastructure designed for growth and reliability',
       image: '/images/hero-slide-3.jpg',  // ← Update this
       overlay: 'rgba(0, 0, 0, 0.5)',
     },
   ]
   ```

4. **Adjust overlay darkness** if needed:
   - `'rgba(0, 0, 0, 0.5)'` = 50% dark overlay (recommended)
   - `'rgba(0, 0, 0, 0.4)'` = 40% dark overlay (lighter)
   - `'rgba(0, 0, 0, 0.6)'` = 60% dark overlay (darker)

### Image Optimization Tips

1. **Compress images** before uploading:
   - Use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
   - Aim for under 500KB per image

2. **Use WebP format** for better performance:
   - Convert JPG to WebP using online tools
   - Smaller file size with same quality

3. **Ensure images look good** with dark overlay:
   - Test with the 50% black overlay
   - Make sure text is readable
   - Prefer images with darker backgrounds or areas where text can sit

### Example File Structure

```
makenzie-website/
├── public/
│   └── images/
│       ├── hero-slide-1.jpg        # Earth from space / Global tech
│       ├── hero-slide-2.jpg        # Healthcare technology
│       └── hero-slide-3.jpg        # Data center / Analytics
└── src/
    └── components/
        └── Hero.tsx
```

### Testing Your Images

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Check that:
   - Images load correctly
   - Text is readable on all slides
   - Transitions are smooth
   - Mobile view looks good

### Current Placeholder

The slider currently uses dark gradient backgrounds as placeholders. Replace them with actual images following the guide above for a more professional, corporate look.
