# Formspree Setup Guide

## What is Formspree?

Formspree is a free service that handles form submissions and sends them to your email. I've integrated it into your contact form.

## Setup Steps

### Option 1: Use the Pre-configured Form (Recommended)

I've already set up a Formspree form ID in the code: `xanyqgzd`

**To activate it:**

1. Go to https://formspree.io/
2. Sign up with your email: **ansuman11c5@gmail.com**
3. Verify your email
4. The form will automatically start working and send submissions to your email!

### Option 2: Create Your Own Form

If you want to create a new form:

1. Go to https://formspree.io/ and sign up
2. Create a new form
3. Copy your form ID (it looks like: `xanyqgzd`)
4. Replace the form ID in `components/Contact.tsx`:
   ```typescript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

## Features

✅ **Email notifications** - Get emails when someone submits the form
✅ **Spam protection** - Built-in spam filtering
✅ **Free tier** - 50 submissions per month (upgrade for more)
✅ **Reply-to** - Automatically includes sender's email for easy replies
✅ **Success/Error messages** - Users see confirmation when form is sent

## Testing

1. Deploy your site to Vercel
2. Fill out the contact form
3. Check your email (ansuman11c5@gmail.com) for the submission!

## Troubleshooting

- **Not receiving emails?** Check your spam folder
- **Form not working?** Make sure you've verified your Formspree account
- **Want more submissions?** Upgrade to Formspree paid plan or use a different service

## Alternative: Direct Email Link

If you prefer a simpler solution without Formspree, you can use a mailto link instead. Let me know if you want this option!
