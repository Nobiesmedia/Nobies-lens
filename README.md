# Lubis Lens Photography — Editorial Studio Website

A luxury, high-end photography studio website for **Lubis Lens Photography**, inspired by the editorial aesthetic of [Jema Studios](https://www.jemastudios.com/).

Built with clean HTML5, modern CSS3 (responsive grid, glassmorphism, gold accents, luxury typography), and vanilla JavaScript. Features optimized imagery crafted from the studio's portfolio assets.

---

## 🌟 Key Features

1. **Editorial Luxury Landing Page**
   - Refined typography pairing (*Playfair Display*, *Cormorant Garamond*, and *Plus Jakarta Sans*).
   - High-impact hero section showcasing Lubis Lens' signature editorial portraiture.
   - Studio vision, creative philosophy, and 4 core pillars (Master Retouching, Posing Direction, Fast Delivery, Heirloom Keepsakes).

2. **The 4 Specialized Shoot Disciplines**
   - 🎂 **Birthday Photoshoots**: High-fashion celebratory glamour, thematic studio lighting, and milestone portraits.
   - 🎓 **Graduation Photoshoots**: Academic triumph, cap & gown executive portraiture, and family legacy (featuring the *Graduate Jibril* spotlight).
   - 💍 **Wedding Photoshoots**: Timeless vows, romantic bridal portraits, traditional engagement coverage, and cinematic storytelling.
   - ✨ **Lifestyle & Brand Photoshoots**: Authentic natural portraits, executive branding, and creator lookbooks.

3. **Curated Portfolio Gallery with Lightbox**
   - Filterable categories: *All Works*, *Birthday Shoots*, *Graduation Shoots*, *Wedding Shoots*, and *Lifestyle & Portraits*.
   - Interactive Fullscreen Lightbox modal with zoom, previous/next controls, image captions, and a 1-click **"Book This Look on WhatsApp"** button.

4. **Transparent Price List Section**
   - Interactive category tabs to switch between:
     - **Birthday Packages**: *Silver Radiance* (GHS 1,200), *Golden Glamour* (GHS 2,200 - *Most Popular*), and *Imperial VIP Milestone* (GHS 3,800).
     - **Graduation Packages**: *Scholar Essence* (GHS 1,000), *Dean's Honors* (GHS 1,800 - *Graduate's Choice*), and *Summa Cum Laude Master* (GHS 3,200).
     - **Wedding Packages**: *Intimate Romance* (GHS 6,500), *Timeless Royal* (GHS 12,500 - *Signature Collection*), and *Grand Imperial Celebration* (GHS 22,000).
     - **Lifestyle Packages**: *Executive Headshot* (GHS 950), *Editorial Creator* (GHS 1,750 - *Influencer Choice*), and *Brand Campaign Pro* (GHS 3,500).
   - Direct **"Book on WhatsApp"** link on every package card that automatically opens WhatsApp with the package name, category, and price pre-filled!
   - Studio guarantees bar (Editorial Retouching, Cloud Delivery, 5–7 Day Turnaround, Posing Coaching).

5. **Direct Social Media & Contact Section**
   - 🟢 **WhatsApp Direct Card**: Direct phone handle with 1-click **"Chat on WhatsApp Now"** button.
   - 📸 **Instagram Direct Card**: Official handle `@lubislens` with a simulated recent feed grid and **"Follow on Instagram"** link.
   - 🔵 **Facebook Direct Card**: Community page handle with a **"Connect on Facebook"** link.
   - **Interactive Booking Form**: Allows clients to select their shoot type, package, date, and vision, then click:
     - **"Send via WhatsApp"** (compiles all fields into a formatted WhatsApp message instantly)
     - **"Submit Inquiry"** (shows an on-screen confirmation banner with instant WhatsApp continuation)
   - **Floating WhatsApp Widget**: Fixed bottom-right pulsing button for instant chat from anywhere on the site.

6. **Client Testimonials & Workflow**
   - 5-Star reviews from graduation, wedding, and birthday clients.
   - 4-Step Experience: *1. Consultation &rarr; 2. Shoot Day &rarr; 3. Artful Retouching &rarr; 4. Heirloom Delivery*.
   - Interactive FAQ accordion covering retainer deposits, turnaround times, wardrobe guidance, and travel.

---

## 📁 File Structure

```text
folder for website/
├── index.html                   # Main landing page & application
├── README.md                    # Project documentation & customization guide
├── css/
│   └── style.css                # Luxury editorial styles, responsiveness & themes
├── js/
│   └── main.js                  # Gallery filter, pricing tabs, lightbox, WhatsApp API
├── assets/
│   └── images/
│       ├── donew-1-hero.jpg     # Optimized hero & wedding portrait
│       ├── donew-1-thumb.jpg    # Fast thumbnail
│       ├── donew-3-hero.jpg     # Optimized birthday & milestone portrait
│       ├── donew-3-thumb.jpg    # Fast thumbnail
│       ├── grad-jibril-3.jpg    # Academic portrait (Jibril cap & gown)
│       ├── grad-jibril-3-thumb.jpg
│       ├── grad-jibril-4.jpg    # Graduation portrait (Jibril distinction)
│       └── grad-jibril-4-thumb.jpg
├── DONEW 3.jpg                  # Original full-resolution image (preserved)
├── DONEW1 - Copy.jpg            # Original full-resolution image (preserved)
├── Edited graduation pics of jibril-3.JPG
└── Edited graduation pics of jibril-4.JPG
```

---

## 🚀 How to View and Run the Website

### Option 1: Direct File Opening
Double-click [index.html](file:///c:/Users/Dell/Desktop/folder%20for%20website/index.html) in your file explorer. It will open in Google Chrome, Microsoft Edge, or any modern web browser.

### Option 2: Using VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

### Option 3: Using Node.js or Python Local Server
Run in PowerShell:
```powershell
npx serve .
# or
python -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## ⚙️ How to Customize Contact Handles

To change the WhatsApp phone number, Instagram handle, or Facebook page:

1. Open [js/main.js](file:///c:/Users/Dell/Desktop/folder%20for%20website/js/main.js#L11-L18):
```javascript
const STUDIO_CONFIG = {
    name: "Lubis Lens Photography",
    whatsappNumber: "233548123456", // Put your real international WhatsApp number here without '+' or spaces
    instagramHandle: "@lubislens",
    facebookPage: "Lubis Lens Photography",
    email: "inquiries@lubislens.com"
};
```
2. In [index.html](file:///c:/Users/Dell/Desktop/folder%20for%20website/index.html), search for `233548123456` or `@lubislens` to update any displayed text or external URLs as desired.
