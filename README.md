# Wedding Invitation — Amalia & Arif

Undangan pernikahan statis untuk Amalia Indah Palupi & Arif Eko Pramono.

- **Tanggal:** Senin, 1 Juni 2026
- **Deploy:** GitHub Pages

---

## Struktur

| File/Folder | Keterangan |
|-------------|------------|
| `index.html` | Halaman utama undangan (single-page) |
| `css/base.css` | Gaya Nusantara warm dengan glass-morphism |
| `js/main.js` | Countdown timer, navigasi mobile, form RSVP |

## Fitur

- **Single-page** dengan smooth-scroll navigation
- **Hitung mundur** live menuju hari pernikahan
- **RSVP form** dengan localStorage (data tersimpan di perangkat tamu)
- **Ringkasan konfirmasi** setelah mengisi RSVP
- **Responsive** — mobile-first dengan hamburger menu
- **Desain Nusantara** — warm cream, sage green, gold accent

## Deploy ke GitHub Pages

1. Push ke branch `main`
2. GitHub Actions otomatis deploy ke Pages
3. URL: `https://apsmono.github.io/wedding-invitation/`

## Custom Domain (Opsional)

1. Buka `Settings -> Pages` di repo GitHub
2. Masukkan custom domain di bagian "Custom domain"
3. Tambahkan DNS records sesuai instruksi GitHub

## Cara Update Konten

Edit langsung file `index.html`:

- Ganti nama, tanggal, dan detail acara di bagian masing-masing
- Ganti warna tema di `css/base.css` bagian `:root`
- Update tanggal hitung mundur di `js/main.js` (`WEDDING_DATE`)

Setelah edit, commit dan push ke `main`. Deploy otomatis dalam 1–2 menit.

---

*Dibuat dengan HTML/CSS/JS vanilla — tanpa build step.*
