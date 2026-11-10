# Royal Bloom — Animated Luxury Wedding E-Invitation

Ang Chheangleng & Leang Kimheng | Sunday, 20 December 2026 | Wedding reception from 5:00 PM, The Modern Centre 2, Building A, Phnom Penh.

## Open the invitation

Open `index.html` in Chrome, Safari, or another modern browser. Internet access is needed only to display the Google-hosted typefaces; the photos, falling flowers, butterflies, countdown, QR codes, and photo gallery work without external libraries.

## Publish free on GitHub Pages

1. Create a new GitHub repository (for example `wedding-invitation`).
2. Upload **all** of these files and the whole `assets` folder to the repository root (or drag in the unzipped folder contents).
3. In the GitHub repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Deploy from a branch** → **main** → **/(root)**, and Save.
5. Visit the GitHub Pages address displayed on that page, usually `https://YOUR-USERNAME.github.io/wedding-invitation/`.

## Editing the invitation

- Text, date, names, Khmer wording, reception time, venue and Google Maps URL: edit `index.html`.
- Countdown date and time: edit `weddingDate` in `script.js`. It currently uses Cambodia time (`+07:00`).
- Style/colors, photo collage, transitions, typography: edit `styles.css`.
- Photos are compressed WebP versions of the provided original photos. To replace one, retain the exact asset filename.
- The venue QR and two bank QR images are retained from the supplied PNG images and are deliberately **not recompressed**.
- To change the number or speed of falling flowers, edit the `count` or `speed` values in `script.js`. Butterflies are animated in `styles.css`.

## Notes

The invitation displays a single event date: **20 December 2026**. It does not add unverified agenda times, phone numbers or RSVP contacts. All photos and QR codes in this ZIP came from the files supplied for this invitation. Bank QR codes should be tested using your banking app before sharing. Provide their owners' consent before publishing the bank codes on a public GitHub Pages website. The invitation respects the device's reduced-motion accessibility setting.
