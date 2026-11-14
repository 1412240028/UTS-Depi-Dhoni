# 🖥️ Media Interaktif: Anatomi Komponen & Simulasi Perakitan PC

> **Proyek Ujian Tengah Semester (UTS) — Mata Kuliah Multimedia (IF562528)**  
> **Program Studi Teknik Informatika (TIF 2024) — Universitas PGRI Ronggolawe Tuban**  
> **Dosen Pengampu:** Suprapto, S.Kom., M.Kom.

---

## 👥 Tim Pengembang
* **Dhoni** — Mahasiswa Teknik Informatika (TIF 2024)
* **Devi** — Mahasiswa Teknik Informatika (TIF 2024)

---

## 🖥️ Layout & Responsivitas Layar PC / Laptop
Media presentasi ini dirancang menggunakan **arsitektur viewport dinamis (*Full Monitor / Laptop Workspace*)**, menggantikan batasan kaku rasio kotak 16:9:
* **Edge-to-Edge Workspace (`100vw × 100vh`):** Memanfaatkan seluruh bidang layar monitor tanpa ruang kosong (*letterbox/pillarbox*).
* **Adaptasi Resolusi:** Mendukung tampilan optimal mulai dari laptop standar (1366×768), layar Full HD (1920×1080), rasio 16:10 (1440×900, 1920×1200), hingga monitor *Ultrawide*.
* **Auto-Scaling Layout:** Elemen skematik SVG, kolom *workbench*, dan lembar spesifikasi secara adaptif menyesuaikan ketinggian vertikal monitor sehingga terhindar dari pemotongan visual.

---

## 🎨 Sistem Desain & Palet Warna Resmi

| Nama Warna | Kode HEX | Nilai RGB | Peran dalam Sistem Desain |
| :--- | :---: | :---: | :--- |
| **Clean White** | `#FFFFFF` | `255, 255, 255` | Warna dasar / kanvas utama website (*Technical Blueprint Paper*) |
| **Light Blue** | `#E8F4FC` | `232, 244, 252` | Permukaan kontainer sekunder, slot perakitan, dan highlight lembut |
| **Dark Blue** | `#152641` | `21, 38, 65` | Tipografi utama kontras maksimal (100% bebas teks abu-abu) & border struktural |
| **Blue** | `#136CFC` | `19, 108, 252` | Tombol interaktif utama, indikator jalur sirkuit, dan lajur bus data |
| **Green (Lime)** | `#C3F84A` | `195, 248, 74` | Lencana verifikasi, pendar inti CPU, dan aksen skematik aktif |

> **Filosofi UI/UX:** Menghindari elemen dekoratif generik (*AI slop*), gradien berlebih, maupun efek buram tak bertujuan. Latar putih bersih dipadukan dengan tipografi `#152641` berukuran proporsional dan tebal menjamin keterbacaan tinggi (*high legibility*) tanpa menggunakan warna abu-abu pudar. Seluruh visual mengadopsi standar diagram teknik berpresisi tinggi dengan tipografi proporsional (*Plus Jakarta Sans*) dan kode monospaced (*JetBrains Mono*).

---

## 📑 Rincian 14 Slide Presentasi

| No. Slide | Topik / Modul | Detail Interaktivitas & Visual |
| :---: | :--- | :--- |
| **Slide 01** | **Sampul Utama (Overview)** | Lembar spesifikasi identitas mahasiswa, dosen, kampus, dan tombol navigasi langsung |
| **Slide 02** | **Peta Blok Komponen** | Matriks navigasi non-linear untuk membuka modul hardware secara mandiri |
| **Slide 03** | **Motherboard** | **Skematik Vektor SVG jalur sirkuit bus & VRM berdenyut** (`circuitPulseTrace`) |
| **Slide 04** | **CPU / Processor** | **Skematik Vektor SVG inti silikon prosesor berpendar** (`cpuDiePulse`) |
| **Slide 05** | **RAM (Memory)** | **Skematik Vektor SVG keping DIMM & LED aktivitas memori berkedip** (`ramClockBlink`) |
| **Slide 06** | **SSD (Storage)** | **Skematik Vektor SVG paket data streaming ke kontroler & NAND flash** (`ssdDataPacket`) |
| **Slide 07** | **GPU (VGA Card)** | **Skematik Vektor SVG bilah kipas pendingin ganda berputar mulus** (`fanContinuousRotate`) |
| **Slide 08** | **PSU (Power Supply)** | **Skematik Vektor SVG kilatan spark tegangan tinggi & kabel daya** (`powerSparkLine`) |
| **Slide 09** | **Panduan & SOP Perakitan** | Protokol keselamatan kerja (K3), pencegahan lonjakan ESD, dan aturan sub-assembly |
| **Slide 10** | **Simulasi Drag & Drop Rakit** | Menyeret 5 tahapan ke slot urutan teknis, dilengkapi tombol **Reset Posisi** & **Cek Urutan & Solusi** |
| **Slide 11** | **Tantangan Blok 01** | Kasus bottleneck multitasking & browser macet (RAM), dilengkapi tombol **Ulangi Soal** & **Lihat Solusi** |
| **Slide 12** | **Tantangan Blok 02** | Kasus anomali daya listrik & komputer mati total (PSU), dilengkapi tombol **Ulangi Soal** & **Lihat Solusi** |
| **Slide 13** | **Tantangan Blok 03** | Kasus integritas data non-volatile saat listrik padam (SSD), dilengkapi tombol **Ulangi Soal** & **Lihat Solusi** |
| **Slide 14** | **Rekapitulasi Capaian** | Metrik otomatis: Modul terbaca (/6), status simulasi, akurasi soal (/3), dan **Skor Akhir (0–100)** |

---

## 🎮 Kontrol Navigasi & Fitur Auto-Hide Header
* **Fitur Auto-Hide Header Cerdas:**
  * **Otomatis Sembunyi Saat Membaca:** Header akan melipat ke atas secara halus setelah 2 detik membaca/inaktivitas di area slide, memberikan bidang pandang vertikal layar penuh (*distraction-free*).
  * **Otomatis Sembunyi Saat Menggeser Slide:** Berpindah antar slide menjaga header tetap tersembunyi agar transisi antarslide stabil tanpa hentakan layout (*layout shift*).
  * **Floating Peek Tab Atas:** Saat header tersembunyi, tab ringkas di tepi atas layar (`[▾] [SLIDE XX] JUDUL`) tetap menampilkan posisi slide secara elegan.
  * **Cara Membuka Kembali Header:**
    * Arahkan kursor mouse ke tepi paling atas layar monitor (zona atas `Y <= 25px`).
    * Hover atau klik pada **Floating Peek Tab**.
    * Tekan tombol pintas keyboard `[H]`.
  * **Tombol Kunci (Pin):** Terdapat tombol `Auto-Hide: ON / Terkunci` di pojok kanan header jika ingin mengunci header agar tetap tampil permanen sewaktu presentasi.
* **Keyboard Shortcuts:**
  * `Panah Kanan` / `Spasi` / `Page Down`: Maju ke slide selanjutnya.
  * `Panah Kiri` / `Page Up`: Mundur ke slide sebelumnya.
  * `Home` / `End`: Lompat langsung ke slide pertama / terakhir.
  * `H`: *Toggle* buka / tutup header kapan saja.
* **Tombol Antarmuka:**
  * Tombol **Sebelumnya** dan **Selanjutnya** di footer bawah.
  * Tombol jalan pintas **Peta Komponen** pada slide materi komponen.

---

## 📁 Struktur Berkas
```text
UTS_DHONI & DEVI/
├── index.html    # Struktur semantik 14 slide full monitor
├── style.css     # Sistem desain 4 warna teknis, viewport PC/laptop & animasi SVG
├── script.js     # Engine navigasi, validasi drag & drop, kuis, dan rekap nilai
└── README.md     # Panduan dokumentasi proyek
```

---

## 🚀 Cara Menjalankan
Buka berkas `index.html` langsung menggunakan Google Chrome atau Microsoft Edge.
