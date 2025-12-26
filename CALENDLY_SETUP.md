# Calendly Integration Setup Guide

## ✅ What's Already Done

I've integrated Calendly into your website with popup modals. The following buttons now trigger Calendly:

1. **Hero Section** - "Get Started" button
2. **Process Section** - "Schedule Free Consultation" button

---

## 📋 Complete Setup Steps

### Step 1: Create Your Calendly Account (5 minutes)

1. Go to [calendly.com](https://calendly.com)
2. Sign up with your work email (zakria.rehman962@gmail.com or company email)
3. Complete the onboarding wizard

---

### Step 2: Create Your Event Type (3 minutes)

1. Once logged in, click **Event Types** in the sidebar
2. Click **+ Create** → **One-on-One**
3. Configure your event:
   - **Event name**: "Healthcare IT Consultation" or "Free Consultation"
   - **Duration**: 30 minutes (recommended for initial consultations)
   - **Location**: Choose one:
     - Google Meet (automatically creates meeting links)
     - Zoom (integrates with your Zoom account)
     - Phone Call
     - In-person meeting
   - **Description**: "Free consultation to discuss your healthcare IT needs. We'll explore how our AI solutions can transform your clinical workflows and improve patient outcomes."

4. **Set Your Availability**:
   - Click **Availability** tab
   - Set your working hours (e.g., Mon-Fri, 9 AM - 5 PM)
   - Set buffer times between meetings if needed

5. **Add Custom Questions** (Optional but recommended):
   - Company Name
   - Current Systems (EHR, Practice Management)
   - Brief description of needs
   - Number of providers/staff

6. Click **Save & Close**

---

### Step 3: Get Your Calendly Link

1. In your Event Types list, find your consultation event
2. Click the **Copy Link** button next to your event
3. Your link will look like: `https://calendly.com/your-username/healthcare-consultation`

---

### Step 4: Update Your Website Configuration

1. Open this file: `src/config/calendly.ts`
2. Replace the placeholder URL with your actual Calendly link:

```typescript
export const CALENDLY_URL = 'https://calendly.com/YOUR_ACTUAL_USERNAME/healthcare-consultation'
```

For example:
```typescript
export const CALENDLY_URL = 'https://calendly.com/makenzie-team/healthcare-consultation'
```

3. Save the file

---

### Step 5: Test Locally

1. Run your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000
3. Click "Get Started" or "Schedule Free Consultation"
4. Verify the Calendly popup opens with your booking page

---

### Step 6: Deploy to Vercel

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add Calendly integration"
   git push
   ```

2. Vercel will automatically deploy
3. Test on your live site: www.makenzie.co

---

## 🎨 Customization Options

### Change Button Text

**Hero Section** (`src/components/Hero.tsx`):
- Line 63: Change "Get Started" to any text you prefer

**Process Section** (`src/components/Process.tsx`):
- Line 122: Change "Schedule Free Consultation" to any text you prefer

### Use Different Calendly Links for Different Buttons

If you want different consultation types (e.g., 15-min quick call vs 30-min detailed consultation):

1. Create multiple event types in Calendly
2. Pass different URLs to CalendlyWidget:

```typescript
<CalendlyWidget
  isOpen={isCalendlyOpen}
  onClose={() => setIsCalendlyOpen(false)}
  url="https://calendly.com/your-username/15-min-quick-call"
/>
```

---

## 🔧 Advanced Calendly Settings (Optional)

### 1. Custom Branding
- Go to Calendly Settings → Branding
- Upload your logo
- Choose brand colors (use your teal accent: #3eb5aa)

### 2. Email Notifications
- Settings → Notifications
- Customize confirmation emails
- Set up reminder emails (recommended: 24 hours + 1 hour before)

### 3. Integrations
- Connect your calendar (Google Calendar, Outlook)
- Connect Zoom for automatic meeting links
- Add to your CRM if you use one

### 4. Team Scheduling (If you have multiple team members)
- Upgrade to Calendly Teams
- Add team members
- Create round-robin or collective events

---

## 📱 Testing Checklist

- [ ] Calendly account created
- [ ] Event type configured with correct duration
- [ ] Availability hours set
- [ ] Location/meeting link configured
- [ ] Custom questions added (if desired)
- [ ] Calendly link copied
- [ ] `src/config/calendly.ts` updated with real link
- [ ] Tested locally - popup opens correctly
- [ ] Tested booking flow - can select time and book
- [ ] Confirmation email received
- [ ] Meeting link works (if using Zoom/Google Meet)
- [ ] Deployed to production
- [ ] Tested on live site

---

## 🚨 Troubleshooting

### Popup doesn't open
- Check browser console for errors (F12 → Console)
- Verify `CALENDLY_URL` in `src/config/calendly.ts` is correct

### "Event not found" error
- Double-check your Calendly link is correct
- Make sure the event type is active in Calendly

### Booking confirmation not received
- Check spam folder
- Verify email settings in Calendly account

---

## 🎯 Next Steps After Setup

1. **Add calendar sync**: Connect Google Calendar or Outlook to avoid double-bookings
2. **Set up SMS reminders**: Enable in Calendly settings (reduces no-shows by 50%+)
3. **Create follow-up workflows**: Use Calendly's integrations with CRM tools
4. **Track metrics**: Use Calendly analytics to see booking rates

---

## 📞 Need Help?

If you run into any issues:
1. Check Calendly's help docs: https://help.calendly.com
2. Verify your configuration in `src/config/calendly.ts`
3. Test in incognito/private browsing mode to rule out cache issues

---

**That's it!** Your Calendly integration is ready to use. Just update the URL and you're all set.
