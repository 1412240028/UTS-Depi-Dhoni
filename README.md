# 🖥️ Media Pembelajaran Interaktif: Anatomi Komponen & Simulasi Perakitan PC

> **Proyek Ujian Tengah Semester (UTS) — Mata Kuliah Multimedia (IF562528)**  
> **Program Studi Teknik Informatika (TIF 2024) — Universitas PGRI Ronggolawe Tuban**  
> **Dosen Pengampu:** Suprapto, S.Kom., M.Kom.

---

## 👥 Tim Pengembang
* **Dhoni** — NPM 1412240028 (Teknik Informatika 2024)
* **Devi** — NPM 1412240027 (Teknik Informatika 2024)

---

## 🌟 Fitur Utama & Keunggulan Sistem

1. **State Persistence Otomatis (`localStorage`)**
   - Seluruh aktivitas pengguna (progres membaca 6 komponen hardware, status verifikasi drag & drop perakitan, riwayat jawaban kuis, dan slide aktif terakhir) tersimpan otomatis di penyimpanan lokal browser.
   - Pengguna dapat me-*refresh* halaman atau menutup browser tanpa khawatir kehilangan capaian belajar atau skor evaluasi.

2. **Dukungan Layar Sentuh Penuh (Mobile Touch Drag & Drop)**
   - Mendukung manipulasi interaktif di perangkat *touchscreen* (smartphone dan tablet) menggunakan event `touchstart`, `touchmove`, dan `touchend`.
   - Dilengkapi elemen klon melayang (*floating drag-ghost*) dengan elevasi dinamis dan deteksi koordinat presisi via `elementFromPoint()`.
   - Tetap menyediakan mode *tap-to-move* sebagai alternatif yang fleksibel.

3. **Mode Full Screen Presentasi & Pembesaran Teks Otomatis**
   - Mode layar penuh dapat diaktifkan melalui tombol **`⛶ Fullscreen`** pada navbar atau menekan tombol **`F`** pada keyboard.
   - **Fluid Typography Scaling**: Tipografi otomatis membesar secara proporsional (hingga `21px` base font size) saat presentasi layar penuh, memastikan diagram, teks penjelasan, dan opsi kuis terbaca jelas oleh audiens di baris belakang kelas maupun proyektor.

4. **Panel Laci Navigasi Slide (*Slide Navigation Drawer*)**
   - Tombol **`☰ Slide`** di footer membuka panel laci dari sisi kiri layar.
   - Pengguna dapat langsung meninjau seluruh daftar 14 slide dan melompat ke slide mana pun dalam 1 klik tanpa harus menekan tombol navigasi berkali-kali.

5. **Dialog Konfirmasi Ulangi Sesi (*Safe Reset Modal*)**
   - Tombol "Ulangi Seluruh Sesi" dilengkapi modal konfirmasi dialog modern (`#confirm-modal`) untuk mencegah hilangnya data progres belajar akibat ketidaksengajaan.
   - Mendukung penutupan dialog cepat via tombol `Escape` atau klik pada area *backdrop*.

6. **Navbar Mobile Responsif Dua Tingkat (*Two-Tier Mobile Navbar*)**
   - Pada layar smartphone/tablet (`≤ 768px`), bilah navigasi bawah otomatis ditata menjadi 2 baris terstruktur:
     - **Baris 1**: Utilitas (`☰ Slide`, `⛶ Fullscreen`) dan indikator status (`SLIDE XX`, counter `XX / 14`).
     - **Baris 2**: Tombol aksi navigasi penuh (`← Sebelumnya`, `Peta Komponen`, `Selanjutnya →`) dengan lebar 100% layar tanpa teks terpotong atau terlipat.

7. **Aksesibilitas Standar WCAG AA (*Accessibility-First*)**
   - Dilengkapi elemen pembaca layar **`#aria-announcer`** (`aria-live="polite"`) yang membacakan perpindahan slide dan hasil verifikasi evaluasi.
   - Setiap diagram skematik SVG memiliki elemen semantik `<title>`, atribut `role="img"`, dan `aria-label`.
   - Rasio kontras teks status memenuhi standar WCAG AA (`--green-text: #256604`).
   - Bebas dari gangguan *focus-outline* biru pada judul slide.

8. **Kuis Evaluasi Anti-Manipulasi (*Locked State & Solution*)**
   - Pilihan kuis langsung terkunci setelah dijawab (`.quiz-locked`) untuk menjaga validitas evaluasi.
   - Dilengkapi tombol reset resmi per-soal ("Ulangi Soal") dan tombol pembahasan teknis mendalam ("Lihat Solusi").

9. **Pengacakan Bebas Bias (*Fisher-Yates Shuffle Algorithm*)**
   - Pengacakan tahapan simulasi perakitan PC menggunakan algoritma Fisher-Yates murni untuk menjamin distribusi permutasi yang adil dan seragam setiap kali direset.

---

## 🎨 Sistem Desain & Palet Warna Resmi

| Nama Warna | Kode HEX | Nilai RGB | Peran dalam Sistem Desain |
| :--- | :---: | :---: | :--- |
| **Clean White** | `#FFFFFF` | `255, 255, 255` | Warna dasar / kanvas utama (*Technical Blueprint Workspace*) |
| **Light Blue** | `#E8F4FC` | `232, 244, 252` | Permukaan kontainer sekunder, slot perakitan, dan highlight lembut |
| **Dark Blue** | `#152641` | `21, 38, 65` | Tipografi utama kontras maksimal (100% bebas abu-abu) & border struktural |
| **Blue (Primary)** | `#136CFC` | `19, 108, 252` | Tombol interaktif utama, indikator jalur bus sirkuit, dan fokus aktif |
| **Lime Green** | `#C3F84A` | `195, 248, 74` | Lencana verifikasi, pendar inti CPU, dan aksen skematik CAD aktif |
| **Accessible Green** | `#256604` | `37, 102, 4` | Teks status `[SELESAI]` kontras tinggi memenuhi standar WCAG AA |

---

## 📑 Rincian 14 Slide Presentasi

| No. Slide | Topik / Modul | Detail Interaktivitas & Visual |
| :---: | :--- | :--- |
| **Slide 01** | **Sampul Utama (Overview)** | Lembar spesifikasi identitas mahasiswa, dosen pengampu, institusi, dan tombol langsung ke materi |
| **Slide 02** | **Peta Blok Komponen** | Matriks non-linear untuk mengeksplorasi 6 komponen inti dengan indikator status belajar `[SELESAI]` |
| **Slide 03** | **Motherboard** | Skematik Vektor SVG jalur bus PCB, soket CPU, slot DIMM, chipset, dan VRM berdenyut (`circuitPulseTrace`) |
| **Slide 04** | **CPU / Processor** | Skematik Vektor SVG IHS dan silicon die prosesor berpendar dinamis (`cpuDiePulse`) |
| **Slide 05** | **RAM (Memory)** | Skematik Vektor SVG keping DIMM DDR5 & LED aktivitas memori berkedip bergantian (`ramClockBlink`) |
| **Slide 06** | **SSD (Storage)** | Skematik Vektor SVG kontroler NVMe M.2 & aliran paket data streaming ke NAND flash (`ssdDataPacket`) |
| **Slide 07** | **GPU (VGA Card)** | Skematik Vektor SVG shroud pendingin dan rotor kipas ganda berputar mulus (`fanContinuousRotate`) |
| **Slide 08** | **PSU (Power Supply)** | Skematik Vektor SVG konverter AC-DC, ventilasi heksagonal, dan sambaran spark tegangan tinggi (`powerSparkLine`) |
| **Slide 09** | **Panduan & SOP Perakitan** | 3 Standar Operasional Prosedur: Proteksi ESD, Perakitan Inti di Luar Casing (*Sub-Assembly*), dan Integrasi Daya |
| **Slide 10** | **Simulasi Perakitan PC** | Interaksi *drag & drop* atau *touch swipe* 5 tahapan perakitan ke slot urutan standar K3 teknis |
| **Slide 11** | **Tantangan Kasus 01** | Analisis blok fungsi: Bottleneck beban kerja *multitasking* dan memori *volatile* (RAM) |
| **Slide 12** | **Tantangan Kasus 02** | Analisis blok fungsi: Anomali suplai energi listrik dan kegagalan daya total (PSU) |
| **Slide 13** | **Tantangan Kasus 03** | Analisis blok fungsi: Karakteristik retensi data permanen *non-volatile* (SSD) |
| **Slide 14** | **Rekapitulasi Capaian** | Evaluasi capaian pembelajaran: Modul (/6), status simulasi, akurasi soal (/3), dan **Animasi Skor Akhir (0–100)** |

---

## 🎮 Kontrol Navigasi & Pintasan Keyboard

* **Keyboard Shortcuts:**
  * `Panah Kanan` / `Page Down`: Maju ke slide selanjutnya.
  * `Panah Kiri` / `Page Up`: Mundur ke slide sebelumnya.
  * `Home`: Melompat langsung ke Slide 01 (Cover).
  * `End`: Melompat langsung ke Slide 14 (Rekapitulasi).
  * `F`: Beralih masuk / keluar mode **Full Screen (Layar Penuh)**.
  * `Escape`: Menutup Drawer Navigasi atau Modal Konfirmasi Reset.
* **Tombol Antarmuka (Navbar Bawah):**
  * `☰ Slide`: Membuka laci daftar seluruh slide presentasi.
  * `⛶ Fullscreen`: Beralih tampilan layar penuh untuk presentasi.
  * `← Sebelumnya` & `Selanjutnya →`: Kontrol pergeseran slide bertahap.
  * `Peta Komponen`: Jalan pintas kembali ke matriks eksplorasi (aktif pada slide materi).

---

## 📁 Struktur Berkas Proyek

```text
UTS_DHONI & DEVI/
├── index.html    # Struktur semantik 14 slide, modal reset, drawer, dan live announcer
├── style.css     # Sistem desain technical blueprint, responsivitas dua tingkat, dan transisi cubic-bezier
├── script.js     # Engine navigasi, touch DnD, state localStorage, kuis terkunci, dan Fisher-Yates
└── README.md     # Dokumentasi komprehensif proyek media pembelajaran
```

---

## 🚀 Cara Menjalankan

1. Clone atau unduh repositori ini ke komputer lokal.
2. Buka berkas `index.html` menggunakan peramban web modern (**Google Chrome**, **Microsoft Edge**, **Mozilla Firefox**, atau **Safari**).
3. Tidak memerlukan instalasi server backend khusus (*zero-dependency pure client-side web application*).
