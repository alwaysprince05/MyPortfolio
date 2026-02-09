# Get contact form messages in your Gmail (2 minutes)

Right now the form does **not** send emails to you. Do this once and every message will go to **princemaurya1201@gmail.com** (including on your phone).

## 1. Get a Formspree form ID (free)

1. Go to **https://formspree.io/**
2. Click **Get Started** and sign up (free).
3. Click **New Form**.
4. **Email** should be set to the address where you want messages (e.g. `princemaurya1201@gmail.com`). Change it if needed.
5. Copy the **form endpoint**. It looks like:
   ```
   https://formspree.io/f/xyzwabcd
   ```
   You only need the ID part: **xyzwabcd** (your ID will be different).

## 2. Add it in your project

1. Open **`src/constants/index.js`**.
2. Find:
   ```js
   formspreeFormId: "",
   ```
3. Put your form ID between the quotes:
   ```js
   formspreeFormId: "xyzwabcd",
   ```
   (Use your real ID from Formspree, not `xyzwabcd`.)

4. Save the file.

## 3. Test

1. Restart the dev server if it’s running (`npm run dev`).
2. Open the Contact section and send a test message.
3. You should see “Message sent! I'll get it in my Gmail.” and the email in your Gmail inbox (and on your phone).

That’s it. After this, every submitted message will be sent to your Gmail by Formspree.
