/**
 * ====================================================================
 * ANATOMI KOMPONEN & SIMULASI PERAKITAN PC (14 SLIDE)
 * ====================================================================
 * Engine: Clean Technical White Workspace (High Contrast & Legibility)
 * Palet Warna:
 *   - Base & Surface:    #FFFFFF & #E8F4FC
 *   - Solid Text:        #152641  (Bebas Abu-abu)
 *   - Primary Accent:    #136CFC  (Blue — tombol, sorotan jalur)
 *   - Functional Accent: #C3F84A  (Lime Green) & #256604 (Accessible Green Text)
 *
 * Tim Penyusun: Dhoni & Devi (TIF 2024 — Universitas PGRI Ronggolawe Tuban)
 * Mata Kuliah : IF562528 Multimedia
 * ====================================================================
 *
 * DAFTAR SECTION:
 *  §1  Konstanta & State Global
 *  §2  Data Direktori Slide (slideDirectory)
 *  §3  Data Modul Hardware — 6 Komponen (hardwareModules)
 *  §4  Data Simulasi Perakitan DnD (dndSteps)
 *  §5  Data Kuis Evaluasi (quizData)
 *  §6  Utilitas & Helper Functions
 *  §7  State Management — localStorage
 *  §8  Inisialisasi & Event Binding
 *  §9  Fitur Fullscreen
 *  §10 Modal Konfirmasi Reset
 *  §11 Navigasi Slide
 *  §12 Drawer Navigasi Slide
 *  §13 Render Slide Konten (Menu & Materi)
 *  §14 Simulasi Drag & Drop Perakitan
 *  §15 Kuis Evaluasi Blok Fungsi
 *  §16 Rekapitulasi & Reset Sesi
 *  §17 Navigasi Keyboard
 * ====================================================================
 */


/* =====================================================================
 * §1 — KONSTANTA & STATE GLOBAL
 * Konfigurasi tetap aplikasi dan variabel state yang digunakan di
 * seluruh modul. Semua state disimpan ke localStorage melalui §7.
 * ===================================================================== */

/** Jumlah total slide dalam presentasi */
const TOTAL_SLIDES = 14;

/** Kunci penyimpanan state di localStorage */
const STORAGE_KEY = 'UTS_DHONI_DEVI_PC_MODULE_STATE_V2';

/** Indeks slide yang sedang aktif (0-based) */
let currentSlide = 0;

// --- Progres & Evaluasi ---

/** Set slide komponen hardware yang sudah dikunjungi (slide idx 2–7) */
const visitedComponents = new Set();

/** Apakah simulasi DnD sudah lolos (5/5 urutan benar) */
let dndPassed = false;

/** Apakah simulasi DnD sudah pernah dicoba (meski belum lolos) */
let dndAttempted = false;

/** Status benar/salah setiap soal kuis [kuis0, kuis1, kuis2] */
const quizScores = [false, false, false];

/** Pilihan jawaban terakhir per soal kuis ('A'/'B'/'C'/'D' atau null) */
const quizAnswered = [null, null, null];


/* =====================================================================
 * §2 — DATA DIREKTORI SLIDE
 * Array metadata untuk setiap slide: nomor tampilan, label badge,
 * dan judul lengkap. Digunakan oleh drawer navigasi dan footer badge.
 * ===================================================================== */

const slideDirectory = [
  { num: 1,  label: "OVERVIEW",          title: "Sampul Utama & Modul Pembelajaran" },
  { num: 2,  label: "PETA KOMPONEN",     title: "Peta Skematik Blok Komponen" },
  { num: 3,  label: "MOTHERBOARD",       title: "Blok 01: Papan Sirkuit Utama (PCB)" },
  { num: 4,  label: "CPU (PROCESSOR)",   title: "Blok 02: Central Processing Unit" },
  { num: 5,  label: "RAM (MEMORY)",      title: "Blok 03: Random Access Memory" },
  { num: 6,  label: "SSD (STORAGE)",     title: "Blok 04: Solid State Drive (NVMe)" },
  { num: 7,  label: "GPU (GRAPHICS)",    title: "Blok 05: Graphics Processing Unit" },
  { num: 8,  label: "PSU (POWER SUPPLY)",title: "Blok 06: Power Supply Unit" },
  { num: 9,  label: "SOP PERAKITAN",     title: "Standar Keselamatan & SOP Teknis" },
  { num: 10, label: "SIMULASI DND",      title: "Simulasi Urutan Perakitan PC" },
  { num: 11, label: "TANTANGAN 01",      title: "Kasus 01: Multitasking & Beban Memori" },
  { num: 12, label: "TANTANGAN 02",      title: "Kasus 02: Anomali Suplai Listrik" },
  { num: 13, label: "TANTANGAN 03",      title: "Kasus 03: Integritas Penyimpanan Permanen" },
  { num: 14, label: "REKAPITULASI",      title: "Laporan Evaluasi Capaian Akhir" }
];


/* =====================================================================
 * §3 — DATA MODUL HARDWARE: 6 KOMPONEN UTAMA (SLIDE 3–8)
 * Setiap objek berisi:
 *   - slideIdx  : indeks slide (0-based) tempat komponen ini ditampilkan
 *   - code      : kode identifikasi teknis (mis. BLOK_01)
 *   - name      : nama komponen
 *   - subtitle  : nama teknis lengkap
 *   - analogy   : analogi fungsional
 *   - desc      : deskripsi paragraf utama
 *   - caption   : label diagram skematik SVG
 *   - svg       : markup SVG animasi vektor teknis (inline)
 *   - points[]  : 4 poin teknis utama yang ditampilkan sebagai checklist
 * ===================================================================== */

const hardwareModules = [
  /* ---- Blok 01: Motherboard ---- */
  {
    slideIdx: 2,
    code: "BLOK_01",
    name: "Motherboard",
    subtitle: "Papan Sirkuit Utama (PCB)",
    analogy: "Infrastruktur Jaringan & Jalur Bus Data",
    desc: "Motherboard adalah papan sirkuit cetak utama multi-layer yang mengintegrasikan seluruh komponen komputer. Di dalamnya tertanam jalur bus transmisi data kecepatan tinggi, sirkuit pengatur daya (VRM), dan antarmuka I/O eksternal.",
    caption: "SKEMATIK: JALUR SIRKUIT BUS & VRM",
    svg: `
      <svg class="schematic-svg" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skematik Diagram Motherboard">
        <title>Skematik Jalur Sirkuit Bus dan VRM Motherboard</title>
        <!-- Main PCB Base -->
        <rect x="15" y="15" width="250" height="190" rx="4" fill="#0f1c30" stroke="#395f98" stroke-width="2"/>
        
        <!-- Ground Mounting Points -->
        <circle cx="28" cy="28" r="4" fill="#152641" stroke="#c3f84a" stroke-width="1.5"/>
        <circle cx="252" cy="28" r="4" fill="#152641" stroke="#c3f84a" stroke-width="1.5"/>
        <circle cx="28" cy="192" r="4" fill="#152641" stroke="#c3f84a" stroke-width="1.5"/>
        <circle cx="252" cy="192" r="4" fill="#152641" stroke="#c3f84a" stroke-width="1.5"/>
        
        <!-- CPU Socket Area -->
        <rect x="75" y="45" width="65" height="65" rx="3" fill="#152641" stroke="#395f98" stroke-width="1.5"/>
        <rect x="85" y="55" width="45" height="45" fill="#192e4e" stroke="#136cfc"/>
        <rect x="81" y="51" width="5" height="5" fill="#c3f84a"/>
        
        <!-- Dual DIMM RAM Slots -->
        <rect x="160" y="38" width="9" height="78" rx="2" fill="#152641" stroke="#395f98"/>
        <rect x="176" y="38" width="9" height="78" rx="2" fill="#152641" stroke="#136cfc" stroke-width="2"/>
        
        <!-- PCIe x16 Slot -->
        <rect x="45" y="145" width="135" height="14" rx="2" fill="#152641" stroke="#395f98" stroke-width="1.5"/>
        <rect x="60" y="148" width="110" height="8" fill="#136cfc"/>
        
        <!-- Chipset Heatsink -->
        <rect x="195" y="132" width="48" height="48" rx="4" fill="#192e4e" stroke="#395f98" stroke-width="1.5"/>
        <text x="198" y="161" fill="#ffffff" font-family="JetBrains Mono" font-size="10" font-weight="800">CHIPSET</text>
        
        <!-- Circuit Signal Traces dengan Animasi Pulse -->
        <path d="M140 78 H160" stroke="#136cfc" stroke-width="3" stroke-linecap="square" class="anim-trace"/>
        <path d="M107 110 V145" stroke="#136cfc" stroke-width="3" stroke-linecap="square" class="anim-trace"/>
        <path d="M140 98 L195 142" stroke="#c3f84a" stroke-width="2.5" stroke-linecap="square" class="anim-trace"/>
        <path d="M184 78 H220 V132" stroke="#c3f84a" stroke-width="2.5" stroke-linecap="square" class="anim-trace"/>
      </svg>
    `,
    points: [
      "Menyediakan soket CPU dengan ratusan pin kontak (LGA/BGA/PGA).",
      "Dilengkapi slot ekspansi PCIe x16 untuk komunikasi langsung ke prosesor.",
      "Memiliki slot memori DIMM untuk transmisi bus data berfrekuensi tinggi.",
      "Menghubungkan slot storage NVMe M.2 langsung ke lajur PCIe controller."
    ]
  },

  /* ---- Blok 02: CPU / Processor ---- */
  {
    slideIdx: 3,
    code: "BLOK_02",
    name: "CPU (Processor)",
    subtitle: "Central Processing Unit",
    analogy: "Unit Logika & Aritmetika Utama",
    desc: "CPU mengeksekusi instruksi komputasi dasar melalui siklus Fetch-Decode-Execute. Mengandung inti performa (P-Cores), inti efisiensi (E-Cores), serta memori cache L1/L2/L3 untuk akses instruksi latensi rendah.",
    caption: "SKEMATIK: SILICON DIE & HEATSPREADER",
    svg: `
      <svg class="schematic-svg" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skematik Diagram CPU">
        <title>Skematik Silicon Die dan Heatspreader CPU</title>
        <!-- Substrate Package -->
        <rect x="45" y="20" width="190" height="180" rx="6" fill="#152641" stroke="#395f98" stroke-width="2"/>
        <polygon points="53,28 65,28 53,40" fill="#c3f84a"/>
        
        <!-- Integrated Heat Spreader (IHS) -->
        <rect x="65" y="40" width="150" height="140" rx="4" fill="#192e4e" stroke="#395f98" stroke-width="2"/>
        
        <!-- Silicon Die Core (Pulsing Glow) -->
        <rect x="95" y="70" width="90" height="80" rx="4" fill="#10243e" stroke="#136cfc" stroke-width="2.5" class="anim-cpu-die"/>
        
        <!-- Laser Etched Internal Grid -->
        <line x1="95" y1="96" x2="185" y2="96" stroke="#395f98" stroke-dasharray="4,2"/>
        <line x1="95" y1="124" x2="185" y2="124" stroke="#395f98" stroke-dasharray="4,2"/>
        <line x1="140" y1="70" x2="140" y2="150" stroke="#395f98" stroke-dasharray="4,2"/>
        
        <!-- Monospace Identifier Label -->
        <text x="104" y="112" fill="#ffffff" font-family="JetBrains Mono" font-size="12" font-weight="800">CPU_CORE</text>
        <text x="100" y="130" fill="#c3f84a" font-family="JetBrains Mono" font-size="10" font-weight="800">5.8 GHz // x64</text>
      </svg>
    `,
    points: [
      "Mengolah perhitungan logika biner dan instruksi aritmetika matematis.",
      "Kepadatan transistor menghasilkan pelepasan termal tinggi (TDP 65W - 250W).",
      "Memerlukan pasta termal konduktif dan pendingin heatsink/waterblock aktif.",
      "Instalasi diposisikan tepat dengan referensi sudut pin penanda (Key Triangle)."
    ]
  },

  /* ---- Blok 03: RAM ---- */
  {
    slideIdx: 4,
    code: "BLOK_03",
    name: "RAM",
    subtitle: "Random Access Memory",
    analogy: "Buffer Memori Kerja Volatile",
    desc: "RAM menyediakan memori penampung berkecepatan ultra-tinggi untuk program yang sedang dieksekusi CPU. Memiliki latensi dalam skala nanodetik, jauh melampaui kemampuan baca-tulis media penyimpanan permanen.",
    caption: "SKEMATIK: DIMM PCB & DRAM MATRIX",
    svg: `
      <svg class="schematic-svg" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skematik Diagram RAM">
        <title>Skematik Modul DIMM DDR5 dan DRAM Matrix</title>
        <!-- Module PCB Board -->
        <rect x="20" y="65" width="240" height="85" rx="4" fill="#152641" stroke="#395f98" stroke-width="2"/>
        <line x1="20" y1="75" x2="260" y2="75" stroke="#136cfc" stroke-width="2.5"/>
        
        <!-- DRAM BGA Chips dengan LED Aktivitas Berkedip -->
        <rect x="36"  y="85" width="26" height="44" rx="2" fill="#192e4e" stroke="#395f98" class="anim-ram-led"/>
        <rect x="70"  y="85" width="26" height="44" rx="2" fill="#192e4e" stroke="#395f98" class="anim-ram-led" style="animation-delay: 0.2s;"/>
        <rect x="104" y="85" width="26" height="44" rx="2" fill="#192e4e" stroke="#395f98" class="anim-ram-led" style="animation-delay: 0.4s;"/>
        <rect x="148" y="85" width="26" height="44" rx="2" fill="#192e4e" stroke="#395f98" class="anim-ram-led" style="animation-delay: 0.6s;"/>
        <rect x="182" y="85" width="26" height="44" rx="2" fill="#192e4e" stroke="#395f98" class="anim-ram-led" style="animation-delay: 0.8s;"/>
        <rect x="216" y="85" width="26" height="44" rx="2" fill="#192e4e" stroke="#395f98" class="anim-ram-led" style="animation-delay: 1.0s;"/>
        
        <!-- Gold Fingers dengan Key Notch -->
        <rect x="24"  y="150" width="102" height="10" fill="#c3f84a"/>
        <rect x="126" y="150" width="16"  height="14" fill="#0f1c30"/>
        <rect x="142" y="150" width="114" height="10" fill="#c3f84a"/>
        
        <text x="50" y="185" fill="#ffffff" font-family="JetBrains Mono" font-size="11" font-weight="800">DDR5 // 32GB // 6000MT/s</text>
      </svg>
    `,
    points: [
      "Karakteristik *volatile*: data terhapus seketika saat suplai daya terputus.",
      "Bandwidth tinggi mencapai puluhan Gigabyte per detik (Dual-Channel mode).",
      "Kapasitas menentukan batas kuota aplikasi aktif yang dapat berjalan bersamaan.",
      "Kancing pengunci slot DIMM memastikan pin kontak terpasang sempurna."
    ]
  },

  /* ---- Blok 04: SSD / Storage ---- */
  {
    slideIdx: 5,
    code: "BLOK_04",
    name: "SSD / Storage",
    subtitle: "Solid State Drive (NVMe)",
    analogy: "Penyimpanan Non-Volatile Permanen",
    desc: "SSD memanfaatkan susunan sel transistor gerbang mengambang (NAND Flash) untuk menyimpan data sistem operasi, perangkat lunak, dan arsip berkas tanpa kehilangan integritas saat daya dimatikan.",
    caption: "SKEMATIK: NVMe M.2 FLASH CONTROLLER",
    svg: `
      <svg class="schematic-svg" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skematik Diagram SSD NVMe">
        <title>Skematik NVMe M.2 Flash Controller dan NAND</title>
        <!-- M.2 2280 PCB -->
        <rect x="25" y="70" width="230" height="75" rx="4" fill="#152641" stroke="#395f98" stroke-width="2"/>
        <circle cx="30" cy="107" r="6" fill="#0f1c30" stroke="#395f98" stroke-width="2"/>
        
        <!-- Controller IC -->
        <rect x="58" y="82" width="36" height="50" rx="2" fill="#192e4e" stroke="#136cfc" stroke-width="2"/>
        <text x="62" y="111" fill="#136cfc" font-family="JetBrains Mono" font-size="10" font-weight="800">CTRL</text>
        
        <!-- NAND Flash Packages -->
        <rect x="108" y="80" width="60" height="55" rx="2" fill="#192e4e" stroke="#395f98" stroke-width="1.5"/>
        <text x="114" y="111" fill="#ffffff" font-family="JetBrains Mono" font-size="10" font-weight="800">NAND_01</text>
        
        <rect x="178" y="80" width="60" height="55" rx="2" fill="#192e4e" stroke="#395f98" stroke-width="1.5"/>
        <text x="184" y="111" fill="#ffffff" font-family="JetBrains Mono" font-size="10" font-weight="800">NAND_02</text>
        
        <!-- Streaming Data Packets (Animasi) -->
        <circle cx="100" cy="92"  r="3" fill="#c3f84a" class="anim-ssd-pkt"/>
        <circle cx="100" cy="112" r="3" fill="#136cfc" class="anim-ssd-pkt" style="animation-delay: 0.3s;"/>
        <circle cx="100" cy="126" r="3" fill="#c3f84a" class="anim-ssd-pkt" style="animation-delay: 0.6s;"/>
        
        <!-- M-Key Gold Pins -->
        <rect x="249" y="75" width="6" height="65" fill="#c3f84a"/>
        
        <text x="50" y="175" fill="#c3f84a" font-family="JetBrains Mono" font-size="11" font-weight="800">PCIe Gen4 x4 // NVMe 1.4</text>
      </svg>
    `,
    points: [
      "Karakteristik *non-volatile*: arsip data tersimpan permanen tanpa daya listrik.",
      "Protokol NVMe melalui lajur PCIe mampu menembus kecepatan baca > 7000 MB/s.",
      "Bentuk M.2 yang ringkas dipasang langsung di permukaan PCB motherboard.",
      "Ketiadaan bagian mekanik bergerak menjadikannya tahan guncangan fisik."
    ]
  },

  /* ---- Blok 05: GPU / VGA Card ---- */
  {
    slideIdx: 6,
    code: "BLOK_05",
    name: "GPU (VGA Card)",
    subtitle: "Graphics Processing Unit",
    analogy: "Akselerator Paralel Visual 3D",
    desc: "GPU mengintegrasikan ribuan inti komputasi paralel untuk memproses kalkulasi matriks grafis, geometri poligon 3D, texturing, dan rendering antarmuka multimedia ke perangkat display monitor.",
    caption: "SKEMATIK: SHROUD & ROTASI FAN DUAL",
    svg: `
      <svg class="schematic-svg" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skematik Diagram GPU VGA">
        <title>Skematik Shroud dan Dual Fan Kartu Grafis GPU</title>
        <!-- Metal Card Shroud -->
        <rect x="25" y="45" width="230" height="120" rx="4" fill="#152641" stroke="#395f98" stroke-width="2"/>
        
        <!-- PCIe Bracket & Connector -->
        <rect x="15" y="35" width="10" height="140" fill="#395f98" rx="1"/>
        <rect x="65" y="165" width="140" height="10" fill="#c3f84a"/>
        
        <!-- Cooling Fan Cavities -->
        <circle cx="95"  cy="105" r="40" fill="#0f1c30" stroke="#395f98" stroke-width="1.5"/>
        <circle cx="185" cy="105" r="40" fill="#0f1c30" stroke="#395f98" stroke-width="1.5"/>
        
        <!-- Rotating Fan Rotor 1 (Animasi) -->
        <g class="anim-fan-rotor" style="transform-origin: 95px 105px;">
          <circle cx="95" cy="105" r="14" fill="#136cfc"/>
          <path d="M95 105 L95 70 A10 10 0 0 1 106 79 Z" fill="#ffffff"/>
          <path d="M95 105 L130 105 A10 10 0 0 1 121 116 Z" fill="#ffffff"/>
          <path d="M95 105 L95 140 A10 10 0 0 1 84 131 Z" fill="#ffffff"/>
          <path d="M95 105 L60 105 A10 10 0 0 1 69 94 Z" fill="#ffffff"/>
        </g>
        
        <!-- Rotating Fan Rotor 2 (Animasi) -->
        <g class="anim-fan-rotor" style="transform-origin: 185px 105px;">
          <circle cx="185" cy="105" r="14" fill="#136cfc"/>
          <path d="M185 105 L185 70 A10 10 0 0 1 196 79 Z" fill="#ffffff"/>
          <path d="M185 105 L220 105 A10 10 0 0 1 211 116 Z" fill="#ffffff"/>
          <path d="M185 105 L185 140 A10 10 0 0 1 174 131 Z" fill="#ffffff"/>
          <path d="M185 105 L150 105 A10 10 0 0 1 159 94 Z" fill="#ffffff"/>
        </g>
        
        <text x="60" y="195" fill="#ffffff" font-family="JetBrains Mono" font-size="11" font-weight="800">PCIe 4.0 x16 // DUAL_FAN</text>
      </svg>
    `,
    points: [
      "Memiliki memori video kecepatan tinggi terdedikasi (*VRAM GDDR6*).",
      "Krusial untuk komputasi multimedia: rendering video 4K, 3D modelling, dan animasi.",
      "Kipas berputar aktif menyesuaikan ambang batas suhu beban pemrosesan.",
      "Mendukung output display modern melalui DisplayPort dan HDMI."
    ]
  },

  /* ---- Blok 06: PSU / Power Supply ---- */
  {
    slideIdx: 7,
    code: "BLOK_06",
    name: "PSU (Power Supply)",
    subtitle: "Unit Pemasok Daya",
    analogy: "Konverter Daya & Distribusi Energi",
    desc: "Power Supply Unit mengonversi sumber listrik tegangan tinggi bolak-balik (AC) menjadi beberapa rail tegangan rendah searah (DC) yang stabil (+12V, +5V, +3.3V) dengan toleransi regulasi ketat.",
    caption: "SKEMATIK: AC-DC RECTIFIER & POWER RAIL",
    svg: `
      <svg class="schematic-svg" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skematik Diagram Power Supply Unit">
        <title>Skematik AC-DC Rectifier dan Jalur Power Rail PSU</title>
        <!-- PSU Steel Chassis -->
        <rect x="35" y="35" width="210" height="145" rx="4" fill="#152641" stroke="#395f98" stroke-width="2"/>
        
        <!-- Hexagon Exhaust Vent Mesh -->
        <circle cx="95" cy="105" r="42" fill="#0f1c30" stroke="#395f98" stroke-dasharray="3,3"/>
        <circle cx="95" cy="105" r="14" fill="#192e4e"/>
        
        <!-- AC Input & Rocker Switch -->
        <rect x="180" y="60"  width="45" height="28" rx="2" fill="#0c1728" stroke="#395f98"/>
        <rect x="180" y="100" width="24" height="14" rx="2" fill="#136cfc"/>
        
        <!-- Electric Spark Indicator Line (Animasi) -->
        <path d="M95 78 L85 105 H104 L92 132" stroke="#c3f84a" stroke-width="3.5" stroke-linecap="square" class="anim-power-spark"/>
        
        <!-- Cable Rail Outlets (+12V, +5V, GND) -->
        <path d="M150 150 Q180 195 240 190" stroke="#c3f84a" stroke-width="3.5" fill="none"/>
        <path d="M160 150 Q190 205 245 200" stroke="#136cfc" stroke-width="3"   fill="none"/>
        <path d="M170 150 Q200 215 250 210" stroke="#ffffff" stroke-width="3"   fill="none"/>
        
        <text x="65" y="170" fill="#c3f84a" font-family="JetBrains Mono" font-size="11" font-weight="800">80+ GOLD // 750W ATX</text>
      </svg>
    `,
    points: [
      "Menyuplai rail +12V untuk kebutuhan daya utama prosesor dan kartu grafis.",
      "Sertifikasi efisiensi 80 PLUS (Gold/Platinum) mengurangi pemborosan panas.",
      "Dilengkapi fitur proteksi OVP, UVP, OCP, dan SCP terhadap lonjakan listrik.",
      "Kabel 24-Pin ATX dan 8-Pin EPS menyuplai daya langsung ke sirkuit motherboard."
    ]
  }
];


/* =====================================================================
 * §4 — DATA SIMULASI PERAKITAN: 5 TAHAPAN DnD (SLIDE 10)
 * Setiap objek merepresentasikan satu tahapan urutan perakitan:
 *   - id     : DOM id unik kartu drag
 *   - label  : teks yang ditampilkan pada kartu
 *   - order  : urutan teknis yang benar (1–5)
 *   - hint   : teks petunjuk pada placeholder slot
 * ===================================================================== */

const dndSteps = [
  {
    id: "step-1",
    label: "Siapkan Motherboard di Meja Kerja Non-Konduktif",
    order: 1,
    hint: "Slot 1: Fondasi awal sirkuit diletakkan di luar casing"
  },
  {
    id: "step-2",
    label: "Pasang CPU, Oleskan Pasta Termal, & Pasang Cooler",
    order: 2,
    hint: "Slot 2: Unit pemroses inti dan sistem pendingin dipasang"
  },
  {
    id: "step-3",
    label: "Tancapkan Keping RAM ke Slot DIMM Hingga Mengunci",
    order: 3,
    hint: "Slot 3: Memori kerja dipasang ke slot dual-channel"
  },
  {
    id: "step-4",
    label: "Pasang PSU ke Casing & Baut Motherboard ke Stand-off",
    order: 4,
    hint: "Slot 4: Rangkaian inti dipasang ke dalam rangka sasis"
  },
  {
    id: "step-5",
    label: "Pasang SSD NVMe, GPU ke PCIe, & Hubungkan Kabel Daya",
    order: 5,
    hint: "Slot 5: Storage, kartu grafis, dan daya akhir dihubungkan"
  }
];


/* =====================================================================
 * §5 — DATA KUIS EVALUASI: 3 SOAL (SLIDE 11–13)
 * Setiap objek berisi:
 *   - slideIdx   : indeks slide (0-based) tempat soal ditampilkan
 *   - number     : nomor soal dalam format '01'/'02'/'03'
 *   - title      : judul kicker kasus skenario
 *   - question   : teks pertanyaan lengkap
 *   - choices[]  : array 4 pilihan jawaban {key, text}
 *   - correctKey : kunci jawaban benar ('A'/'B'/'C'/'D')
 *   - correctName: nama jawaban benar (untuk pesan feedback)
 *   - solution   : penjelasan kunci jawaban untuk pembahasan
 * ===================================================================== */

const quizData = [
  /* ---- Kasus 01: Multitasking & Beban Memori ---- */
  {
    slideIdx: 10,
    number: "01",
    title: "KASUS 01 // MULTITASKING & BEBAN KERJA MEMORI",
    question: "Sebuah komputer operasional laboratorium mengalami pelambatan parah stuttering saat menjalankan browser dengan puluhan tab riset, aplikasi desain grafis, dan IDE pemrograman secara simultan. Blok manakah yang bertindak sebagai ruang buffer sementara dan perlu dievaluasi kapasitasnya?",
    choices: [
      { key: "A", text: "RAM (Random Access Memory)" },
      { key: "B", text: "SSD NVMe Storage" },
      { key: "C", text: "PSU (Power Supply)" },
      { key: "D", text: "Chassis / Casing PC" }
    ],
    correctKey: "A",
    correctName: "RAM (Random Access Memory)",
    solution: "RAM menampung instruksi program aktif untuk CPU. Ketika kuota RAM habis terpakai, sistem beralih menggunakan virtual memory di storage yang jauh lebih lambat, memicu kemacetan sistem."
  },

  /* ---- Kasus 02: Anomali Suplai Listrik ---- */
  {
    slideIdx: 11,
    number: "02",
    title: "KASUS 02 // ANOMALI SUPLAI LISTRIK & MATI TOTAL",
    question: "Saat sakelar daya casing ditekan, komputer sama sekali tidak memberikan respons sinyal—kipas pendingin tidak berputar, LED indikator pada motherboard mati, dan tidak ada aliran daya terdeteksi. Blok manakah yang bertanggung jawab mengalirkan energi listrik utama ke sistem?",
    choices: [
      { key: "A", text: "GPU (Kartu Grafis)" },
      { key: "B", text: "CPU (Processor)" },
      { key: "C", text: "PSU (Power Supply)" },
      { key: "D", text: "RAM (Memory Stick)" }
    ],
    correctKey: "C",
    correctName: "PSU (Power Supply)",
    solution: "PSU adalah unit konversi daya utama dari stopkontak AC ke tegangan rendah DC. Kerusakan atau kegagalan koneksi PSU menyebabkan seluruh sirkuit komputer mati total tanpa daya."
  },

  /* ---- Kasus 03: Integritas Penyimpanan Permanen ---- */
  {
    slideIdx: 12,
    number: "03",
    title: "KASUS 03 // INTEGRITAS PENYIMPANAN DATA PERMANEN",
    question: "Berkas proyek pemrograman, basis data, dan konfigurasi sistem operasi tetap tersimpan utuh dan tidak terhapus meskipun komputer dimatikan dan kabel stopkontak dicabut dalam jangka waktu lama. Blok manakah yang menjalankan fungsi retensi permanen non-volatile ini?",
    choices: [
      { key: "A", text: "RAM (Random Access Memory)" },
      { key: "B", text: "SSD (Solid State Drive)" },
      { key: "C", text: "Motherboard Bus" },
      { key: "D", text: "GPU VRAM Buffer" }
    ],
    correctKey: "B",
    correctName: "SSD (Solid State Drive)",
    solution: "SSD menggunakan sel memori 3D NAND Flash yang bersifat non-volatile, mempertahankan susunan data biner tanpa memerlukan muatan listrik terus-menerus."
  }
];


/* =====================================================================
 * §6 — UTILITAS & HELPER FUNCTIONS
 * Fungsi-fungsi pendek yang dipakai berulang di seluruh modul.
 * ===================================================================== */

/**
 * Shortcut getElementById — mengembalikan null jika elemen tidak ditemukan
 * (defensive DOM query, tidak akan throw error).
 * @param {string} id - ID elemen DOM
 * @returns {HTMLElement|null}
 */
function $(id) {
  return document.getElementById(id);
}

/**
 * Mengumumkan pesan ke screen reader melalui ARIA live region.
 * Mengosongkan konten terlebih dahulu agar screen reader mendeteksi
 * perubahan meski pesannya sama.
 * @param {string} msg - Teks yang akan diumumkan
 */
function announce(msg) {
  const el = $('aria-announcer');
  if (!el) return;
  el.textContent = '';
  setTimeout(() => {
    el.textContent = msg;
  }, 40);
}

/**
 * Mengacak array secara in-place menggunakan algoritma Fisher-Yates
 * (tidak bias — setiap permutasi memiliki probabilitas yang sama).
 * @param {Array} arr - Array yang akan diacak
 * @returns {Array} Salinan array baru yang telah diacak
 */
function fisherYatesShuffle(arr) {
  const a = [...arr]; // Salin dulu agar tidak mengubah array asli
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


/* =====================================================================
 * §7 — STATE MANAGEMENT (localStorage)
 * Menyimpan dan memuat seluruh state sesi ke/dari localStorage agar
 * progres pengguna tidak hilang saat halaman di-refresh.
 * ===================================================================== */

/**
 * Menyimpan seluruh state sesi ke localStorage.
 * Payload: visitedComponents, dndPassed, dndAttempted, quizScores,
 *          quizAnswered, currentSlide.
 * Gagal secara senyap jika storage tidak tersedia (mis. mode privat).
 */
function saveState() {
  try {
    const payload = {
      visited: Array.from(visitedComponents),
      dndPassed,
      dndAttempted,
      quizScores,
      quizAnswered,
      currentSlide
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn("Storage quota / akses storage terhalang:", err);
  }
}

/**
 * Memuat state dari localStorage dan merestorasi semua variabel global.
 * @returns {boolean} true jika state berhasil dimuat, false jika tidak ada data
 */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);

    // Restorasi komponen yang sudah dikunjungi
    if (Array.isArray(data.visited)) {
      visitedComponents.clear();
      data.visited.forEach(v => visitedComponents.add(v));
    }

    // Restorasi status simulasi DnD
    if (typeof data.dndPassed    === 'boolean') dndPassed    = data.dndPassed;
    if (typeof data.dndAttempted === 'boolean') dndAttempted = data.dndAttempted;

    // Restorasi skor kuis (validasi panjang array)
    if (Array.isArray(data.quizScores) && data.quizScores.length === 3) {
      data.quizScores.forEach((s, i) => quizScores[i] = Boolean(s));
    }

    // Restorasi jawaban kuis terakhir
    if (Array.isArray(data.quizAnswered) && data.quizAnswered.length === 3) {
      data.quizAnswered.forEach((a, i) => quizAnswered[i] = a);
    }

    // Restorasi posisi slide terakhir (validasi range)
    if (typeof data.currentSlide === 'number' && data.currentSlide >= 0 && data.currentSlide < TOTAL_SLIDES) {
      currentSlide = data.currentSlide;
    }

    return true;
  } catch (err) {
    console.warn("Gagal memuat state dari storage:", err);
    return false;
  }
}


/* =====================================================================
 * §8 — INISIALISASI & EVENT BINDING
 * Entry point utama aplikasi. Semua render dan binding dilakukan
 * setelah DOM selesai dimuat. Tidak ada inline onclick di HTML —
 * seluruh event listener terpusat di bindUnifiedEvents().
 * ===================================================================== */

/**
 * Entry point: dijalankan setelah seluruh DOM siap.
 * Urutan inisialisasi: load state → render semua konten →
 *   bind events → navigasi ke slide terakhir → aktifkan keyboard.
 */
document.addEventListener('DOMContentLoaded', () => {
  loadState();             // §7: Pulihkan state dari sesi sebelumnya

  renderComponentMenu();   // §13: Render grid menu komponen (slide 2)
  renderMateriSlides();    // §13: Render konten detail hardware (slide 3–8)
  initDragAndDrop();       // §14: Render simulasi DnD (slide 10)
  renderQuizSlides();      // §15: Render soal kuis (slide 11–13)
  renderSlideNavDrawer();  // §12: Render daftar item di drawer navigasi

  bindUnifiedEvents();     // §8:  Bind semua event listener (tidak ada inline onclick)
  goToSlide(currentSlide, false); // §11: Tampilkan slide yang sesuai state
  initKeyboardNavigation();       // §17: Aktifkan navigasi keyboard
});

/**
 * Mendaftarkan seluruh event listener aplikasi.
 * Pola: satu fungsi terpusat — tidak ada onclick pada HTML.
 * Menggunakan event delegation untuk elemen yang di-render secara dinamis (quiz).
 */
function bindUnifiedEvents() {

  // --- Tombol Cover (Slide 1) ---
  const btnStart = $('btn-start-module');
  if (btnStart) btnStart.addEventListener('click', () => goToSlide(1));

  const btnGotoSop = $('btn-goto-sop');
  if (btnGotoSop) btnGotoSop.addEventListener('click', () => goToSlide(8));

  // --- Tombol Simulasi DnD (Slide 10) ---
  const btnResetDnd = $('btn-reset-dnd');
  if (btnResetDnd) btnResetDnd.addEventListener('click', () => initDragAndDrop());

  const btnCheckDnd = $('btn-check-dnd');
  if (btnCheckDnd) btnCheckDnd.addEventListener('click', () => checkDndOrder());

  // Drop target: depot sumber (kembalikan kartu ke depot)
  const sourceDepot = $('dnd-source');
  if (sourceDepot) {
    sourceDepot.addEventListener('dragover', allowDrop);
    sourceDepot.addEventListener('drop',     dropToSource);
  }

  // --- Tombol Rekapitulasi & Modal Reset (Slide 14) ---
  const btnRestartAll = $('btn-restart-all');
  if (btnRestartAll) btnRestartAll.addEventListener('click', showConfirmResetModal);

  const btnCancelReset = $('btn-cancel-reset');
  if (btnCancelReset) btnCancelReset.addEventListener('click', hideConfirmResetModal);

  const btnConfirmReset = $('btn-confirm-reset');
  if (btnConfirmReset) {
    btnConfirmReset.addEventListener('click', () => {
      restartAll();
      hideConfirmResetModal();
    });
  }

  // Klik backdrop modal = tutup modal
  const modalBackdrop = $('confirm-modal-backdrop');
  if (modalBackdrop) modalBackdrop.addEventListener('click', hideConfirmResetModal);

  // --- Tombol Navigasi Footer ---
  const btnPrev = $('btn-prev');
  if (btnPrev) btnPrev.addEventListener('click', () => changeSlide(-1));

  const btnNext = $('btn-next');
  if (btnNext) btnNext.addEventListener('click', () => changeSlide(1));

  const btnMap = $('btn-map');
  if (btnMap) btnMap.addEventListener('click', () => goToSlide(1));

  // --- Drawer Navigasi Slide ---
  const btnNavOpen = $('btn-nav-open');
  if (btnNavOpen) btnNavOpen.addEventListener('click', openSlideNav);

  const btnCloseNav = $('btn-close-nav');
  if (btnCloseNav) btnCloseNav.addEventListener('click', closeSlideNav);

  // Klik backdrop drawer = tutup drawer
  const navBackdrop = $('slide-nav-backdrop');
  if (navBackdrop) navBackdrop.addEventListener('click', closeSlideNav);

  // --- Tombol Fullscreen ---
  const btnFullscreen = $('btn-fullscreen');
  if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);

  // Listener perubahan state fullscreen (browser-native & vendor prefix)
  document.addEventListener('fullscreenchange',       updateFullscreenButton);
  document.addEventListener('webkitfullscreenchange', updateFullscreenButton);

  // --- Event Delegation: Interaksi Kuis (Slide 11–13) ---
  // Menggunakan delegation karena elemen quiz dirender secara dinamis.
  document.addEventListener('click', (e) => {

    // Klik pada pilihan jawaban (option tile)
    const tile = e.target.closest('.option-tile[data-quiz-idx]');
    if (tile) {
      const grid = tile.closest('.options-grid');
      // Abaikan jika grid sudah terkunci (jawaban sudah dipilih)
      if (grid && grid.classList.contains('quiz-locked')) return;
      const qIdx = parseInt(tile.dataset.quizIdx, 10);
      const key  = tile.dataset.quizKey;
      checkQuizAnswer(qIdx, key, tile);
      return;
    }

    // Klik tombol "Ulangi Soal"
    const resetBtn = e.target.closest('[data-quiz-reset]');
    if (resetBtn) {
      const qIdx = parseInt(resetBtn.dataset.quizReset, 10);
      resetQuizQuestion(qIdx);
      return;
    }

    // Klik tombol "Lihat Solusi"
    const solBtn = e.target.closest('[data-quiz-solution]');
    if (solBtn) {
      const qIdx = parseInt(solBtn.dataset.quizSolution, 10);
      showQuizSolution(qIdx);
      return;
    }
  });
}


/* =====================================================================
 * §9 — FITUR FULLSCREEN
 * Menggunakan Fullscreen API standar dengan fallback vendor prefix
 * untuk kompatibilitas lintas browser (Chrome, Firefox, Safari).
 * State fullscreen juga dipantau via CSS class `.is-fullscreen` pada
 * <html> untuk mendukung pembesaran font presentasi.
 * ===================================================================== */

/**
 * Mengaktifkan atau menonaktifkan mode layar penuh.
 * Mencoba requestFullscreen() → webkitRequestFullscreen() → msRequestFullscreen().
 */
function toggleFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    // Masuk ke mode fullscreen
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => console.warn("Fullscreen request error:", err));
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    // Keluar dari mode fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(err => console.warn("Exit fullscreen error:", err));
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

/**
 * Memperbarui tampilan tombol fullscreen dan class CSS sesuai state aktual.
 * Dipanggil oleh event 'fullscreenchange' dan 'webkitfullscreenchange'.
 */
function updateFullscreenButton() {
  const isFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement);

  // Toggle class pada <html> untuk CSS font scaling fullscreen
  document.documentElement.classList.toggle('is-fullscreen', isFs);

  // Perbarui label, icon, title, dan aria-pressed tombol
  const btn = $('btn-fullscreen');
  if (btn) {
    btn.classList.toggle('is-active', isFs);
    btn.innerHTML = isFs ? '&#x25A3; Fullscreen' : '&#x26F6; Fullscreen';
    btn.title      = isFs ? 'Keluar Layar Penuh (Tekan Esc atau F)' : 'Mode Layar Penuh (Tekan F)';
    btn.setAttribute('aria-pressed', isFs ? 'true' : 'false');
  }

  // Umumkan perubahan ke screen reader
  announce(isFs ? 'Mode layar penuh aktif.' : 'Keluar dari mode layar penuh.');
}


/* =====================================================================
 * §10 — MODAL KONFIRMASI RESET
 * Dialog konfirmasi sebelum me-reset seluruh progres sesi.
 * Implementasi: visibility+opacity (tidak display:none) agar transisi
 * CSS berjalan mulus. Fokus otomatis ke tombol "Batal" saat dibuka.
 * ===================================================================== */

/**
 * Membuka modal konfirmasi reset sesi.
 * Memindahkan fokus keyboard ke tombol "Batal" untuk aksesibilitas.
 */
function showConfirmResetModal() {
  const modal    = $('confirm-modal');
  const backdrop = $('confirm-modal-backdrop');
  if (modal && backdrop) {
    modal.classList.add('open');
    backdrop.classList.add('open');
    const cancelBtn = $('btn-cancel-reset');
    if (cancelBtn) cancelBtn.focus();
  }
}

/**
 * Menutup modal konfirmasi reset sesi.
 */
function hideConfirmResetModal() {
  const modal    = $('confirm-modal');
  const backdrop = $('confirm-modal-backdrop');
  if (modal && backdrop) {
    modal.classList.remove('open');
    backdrop.classList.remove('open');
  }
}


/* =====================================================================
 * §11 — NAVIGASI SLIDE
 * Mengontrol perpindahan antar slide: tampil/sembunyi menggunakan
 * class `.active` (bukan display:none) agar CSS transition berjalan.
 * State selalu disimpan ke localStorage setiap perpindahan.
 * ===================================================================== */

/**
 * Berpindah slide relatif dari posisi saat ini.
 * @param {number} direction - +1 (maju) atau -1 (mundur)
 */
function changeSlide(direction) {
  goToSlide(currentSlide + direction);
}

/**
 * Langsung berpindah ke slide dengan indeks tertentu.
 * - Memperbarui visitedComponents jika target adalah slide materi (2–7)
 * - Memperbarui rekapitulasi jika target adalah slide 14
 * - Menyimpan state, memperbarui UI navigasi dan drawer
 * - Memindahkan fokus ke slide container (bukan heading, agar bebas border biru)
 * - Mengumumkan perubahan ke screen reader
 * @param {number}  targetIdx      - Indeks slide tujuan (0-based)
 * @param {boolean} announceSlide  - Apakah mengumumkan ke screen reader (default true)
 */
function goToSlide(targetIdx, announceSlide = true) {
  if (targetIdx < 0 || targetIdx >= TOTAL_SLIDES) return;
  currentSlide = targetIdx;

  // Tandai komponen sebagai sudah dikunjungi (slide materi hardware: indeks 2–7)
  if (currentSlide >= 2 && currentSlide <= 7) {
    visitedComponents.add(currentSlide);
    renderComponentMenu(); // Perbarui badge status di menu grid
  }

  // Perbarui rekapitulasi jika pengguna masuk ke slide akhir
  if (currentSlide === 13) {
    updateFinalRecap();
  }

  updateSlideNavigation();      // Tampilkan slide aktif, perbarui badge & progress
  updateDrawerActiveState();    // Sorot item aktif di drawer
  saveState();                  // Simpan ke localStorage

  // Fokus ke container slide (bukan heading) agar tidak muncul border biru :focus-visible
  const activeSlide = $(`slide-${currentSlide}`);
  if (activeSlide) {
    activeSlide.setAttribute('tabindex', '-1');
    activeSlide.focus({ preventScroll: true });
  }

  // Umumkan perubahan ke screen reader
  if (announceSlide && slideDirectory[currentSlide]) {
    announce(`Beralih ke Slide ${slideDirectory[currentSlide].num}: ${slideDirectory[currentSlide].title}`);
  }
}

/**
 * Memperbarui semua elemen UI yang terkait navigasi slide:
 * - Menampilkan/menyembunyikan slide dengan class `.active`
 * - Memperbarui badge, label judul, counter, dan progress bar di footer
 * - Mengatur disabled/visible tombol Prev, Next, dan Peta Komponen
 */
function updateSlideNavigation() {
  // Toggle class .active pada semua slide
  const slides = document.querySelectorAll('.slide-body');
  slides.forEach((s, idx) => {
    s.classList.toggle('active', idx === currentSlide);
  });

  // Ambil metadata slide aktif dari direktori
  const dirItem  = slideDirectory[currentSlide] || { num: currentSlide + 1, label: "OVERVIEW", title: "" };
  const slideNum = `SLIDE ${String(dirItem.num).padStart(2, '0')}`;
  const slideLabel = dirItem.label;

  // Perbarui elemen footer
  const badgeEl       = $('footer-badge');
  const titleEl       = $('footer-title');
  const counterEl     = $('slide-counter');
  const progressFill  = $('progress-fill');
  const progressBar   = document.querySelector('.footer-progress');

  if (badgeEl)   badgeEl.innerText   = slideNum;
  if (titleEl)   titleEl.innerText   = slideLabel;
  if (counterEl) counterEl.innerText = `${String(currentSlide + 1).padStart(2, '0')} / ${TOTAL_SLIDES}`;

  // Perbarui lebar progress bar
  if (progressFill) {
    const percent = ((currentSlide + 1) / TOTAL_SLIDES) * 100;
    progressFill.style.width = `${percent}%`;
  }
  if (progressBar) {
    progressBar.setAttribute('aria-valuenow', currentSlide + 1);
  }

  // Nonaktifkan tombol di batas slide pertama dan terakhir
  const btnPrev = $('btn-prev');
  if (btnPrev) btnPrev.disabled = currentSlide === 0;

  const btnNext = $('btn-next');
  if (btnNext) btnNext.disabled = currentSlide === TOTAL_SLIDES - 1;

  // Tampilkan tombol "Peta Komponen" hanya di slide materi hardware (slide 3–8)
  const btnMap = $('btn-map');
  if (btnMap) {
    btnMap.style.display = (currentSlide >= 2 && currentSlide <= 7) ? 'inline-flex' : 'none';
  }
}


/* =====================================================================
 * §12 — DRAWER NAVIGASI SLIDE
 * Panel laci dari sisi kiri layar berisi daftar seluruh slide.
 * Dibuka via tombol "≡ Slide" di footer; ditutup via tombol × atau
 * klik backdrop. Mendukung navigasi langsung ke slide manapun.
 * ===================================================================== */

/**
 * Me-render daftar item navigasi di dalam drawer dari data slideDirectory.
 * Dipanggil sekali saat inisialisasi; aktif item diperbarui via updateDrawerActiveState().
 */
function renderSlideNavDrawer() {
  const listEl = $('slide-nav-list');
  if (!listEl) return;
  listEl.innerHTML = '';

  slideDirectory.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = `nav-slide-item ${idx === currentSlide ? 'active' : ''}`;
    btn.setAttribute('role', 'menuitem');
    btn.dataset.targetSlide = idx;
    btn.innerHTML = `
      <span class="nav-num">${String(item.num).padStart(2, '0')}</span>
      <span class="nav-title-text">${item.title}</span>
    `;
    btn.addEventListener('click', () => {
      goToSlide(idx);
      closeSlideNav();
    });
    listEl.appendChild(btn);
  });
}

/**
 * Membuka drawer navigasi dan memindahkan fokus ke tombol tutup.
 */
function openSlideNav() {
  const drawer   = $('slide-nav-drawer');
  const backdrop = $('slide-nav-backdrop');
  if (drawer && backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    updateDrawerActiveState();
    const closeBtn = $('btn-close-nav');
    if (closeBtn) closeBtn.focus();
  }
}

/**
 * Menutup drawer navigasi.
 */
function closeSlideNav() {
  const drawer   = $('slide-nav-drawer');
  const backdrop = $('slide-nav-backdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
  }
}

/**
 * Memperbarui highlight item aktif di drawer sesuai slide saat ini.
 * Dipanggil setiap kali goToSlide() berjalan.
 */
function updateDrawerActiveState() {
  const items = document.querySelectorAll('.nav-slide-item');
  items.forEach((item, idx) => {
    item.classList.toggle('active', idx === currentSlide);
  });
}


/* =====================================================================
 * §13 — RENDER SLIDE KONTEN (Menu Grid & Materi Detail)
 * Konten slide 2 (menu komponen) dan slide 3–8 (materi detail hardware)
 * dibangun secara dinamis dari array hardwareModules (§3).
 * ===================================================================== */

/**
 * Me-render grid menu eksplorasi komponen pada Slide 2.
 * Setiap kotak komponen mencerminkan status kunjungan dan dapat diklik
 * untuk berpindah langsung ke slide detail komponen terkait.
 * Dipanggil ulang setiap kali goToSlide() ke slide materi (2–7) agar
 * status badge [SELESAI] / [BELUM_DIBACA] selalu terkini.
 */
function renderComponentMenu() {
  const grid = $('component-menu-grid');
  if (!grid) return;
  grid.innerHTML = '';

  hardwareModules.forEach(item => {
    const isVisited = visitedComponents.has(item.slideIdx);
    const box = document.createElement('div');
    box.className = `comp-box ${isVisited ? 'visited' : ''}`;
    box.setAttribute('role', 'button');
    box.setAttribute('tabindex', '0');
    box.setAttribute('aria-label', `${item.name}: ${item.subtitle}. Status: ${isVisited ? 'Sudah dipelajari' : 'Belum dibaca'}`);

    box.innerHTML = `
      <div class="comp-box-top">
        <span class="comp-id">${item.code}</span>
        <span class="comp-status">${isVisited ? '[SELESAI]' : '[BELUM_DIBACA]'}</span>
      </div>
      <h3>${item.name}</h3>
      <p>${item.subtitle}</p>
      <div class="comp-link">${isVisited ? 'Telaah Ulang &rarr;' : 'Buka Skematik &rarr;'}</div>
    `;

    // Navigasi via klik atau Enter/Space (aksesibilitas keyboard)
    box.addEventListener('click',   () => goToSlide(item.slideIdx));
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToSlide(item.slideIdx);
      }
    });

    grid.appendChild(box);
  });

  // Perbarui label progress di bawah grid
  const progressLabel = $('menu-progress-label');
  if (progressLabel) {
    progressLabel.innerText = `${visitedComponents.size} / 6 Komponen Dipelajari`;
  }
}

/**
 * Me-render konten detail teknis untuk masing-masing slide hardware (Slide 3–8).
 * Setiap slide berisi: diagram skematik SVG animasi (kiri) dan
 * lembar detail teknis dengan checklist poin (kanan).
 * Dipanggil sekali saat inisialisasi.
 */
function renderMateriSlides() {
  hardwareModules.forEach(item => {
    const targetEl = $(`slide-${item.slideIdx}`);
    if (!targetEl) return;

    const checklistHtml = item.points.map(p => `<li>${p}</li>`).join('');

    targetEl.innerHTML = `
      <div class="schematic-layout">
        <div class="schematic-viewport">
          <span class="schematic-badge">${item.code} // VECTOR_CAD</span>
          ${item.svg}
          <span class="schematic-footer-label">${item.caption}</span>
        </div>

        <div class="detail-sheet">
          <div>
            <div class="sheet-header-tag">[KOMPONEN_UTAMA] // ${item.subtitle}</div>
            <h2 class="sheet-title">${item.name}</h2>
            <div class="sheet-analogy">&rang; Analogi: ${item.analogy}</div>
            <p class="sheet-desc">${item.desc}</p>
          </div>

          <ul class="technical-checklist">
            ${checklistHtml}
          </ul>
        </div>
      </div>
    `;
  });
}


/* =====================================================================
 * §14 — SIMULASI DRAG & DROP PERAKITAN (SLIDE 10)
 * Mendukung interaksi cerdas:
 *   1. Tap-to-Move (Mobile & Desktop): Cukup ketuk kartu pada depot untuk
 *      otomatis memindahkannya ke slot urutan berikutnya (1 s/d 5).
 *      Ketuk kartu pada slot untuk mengembalikannya ke depot.
 *   2. Touch Drag & Drop: Jika jari digeser (>10px), sistem beralih
 *      ke mode geser manual dengan elemen ghost melayang.
 *   3. HTML5 Drag & Drop API (Desktop mouse).
 * ===================================================================== */

/** Kartu yang sedang di-drag melalui touch event */
let touchDraggedItem = null;

/** Elemen ghost clone yang mengikuti jari saat touch drag */
let touchGhostEl = null;

/** Posisi awal sentuhan jari untuk membedakan tap vs drag */
let touchStartX = 0;
let touchStartY = 0;

/** Status apakah interaksi saat ini adalah drag (geser) atau sekadar tap (ketuk) */
let isDraggingTouch = false;

/** Timestamp tap terakhir untuk mencegah double-fire event (touch + synthetic click) */
let lastTouchTapTime = 0;

/**
 * Menangani aksi klik/tap pada kartu tahapan (Tap-to-Move otomatis).
 * - Jika kartu berada di depot -> otomatis pindah ke slot pertama yang masih kosong.
 * - Jika kartu berada di slot -> kembalikan ke depot awal.
 * @param {HTMLElement} itemEl - Elemen kartu yang diketuk
 */
function handleItemClick(itemEl) {
  const sourceDepot  = $('dnd-source');
  const targetSlots  = document.querySelectorAll('.assembly-slot');
  if (!sourceDepot) return;

  const parentSlot = itemEl.closest('.assembly-slot');

  if (parentSlot) {
    // KARTU BERADA DI SLOT -> Kembalikan ke depot sumber
    const placeholder = parentSlot.querySelector('.slot-placeholder');
    if (placeholder) placeholder.style.display = 'block';
    parentSlot.style.borderColor = '';
    parentSlot.style.background  = '';
    sourceDepot.appendChild(itemEl);
    updateDepotState();
    announce(`Kartu ${itemEl.innerText} dikembalikan ke daftar pilihan.`);
  } else {
    // KARTU BERADA DI DEPOT -> Otomatis pindahkan ke slot pertama yang masih kosong
    let targetSlot = null;
    for (const slot of targetSlots) {
      if (!slot.querySelector('.drag-item')) {
        targetSlot = slot;
        break;
      }
    }

    if (targetSlot) {
      const placeholder = targetSlot.querySelector('.slot-placeholder');
      if (placeholder) placeholder.style.display = 'none';
      targetSlot.style.borderColor = '';
      targetSlot.style.background  = '';
      targetSlot.appendChild(itemEl);
      updateDepotState();
      announce(`Kartu ${itemEl.innerText} otomatis masuk ke Slot ${targetSlot.dataset.expected}.`);
    } else {
      // Seluruh 5 slot sudah terisi penuh
      announce("Seluruh 5 slot urutan telah terisi. Ketuk kartu pada slot jika ingin membatalkan/mengubah.");
    }
  }
}

/**
 * Memperbarui status tampilan depot sumber jika semua kartu sudah ditempatkan.
 */
function updateDepotState() {
  const sourceDepot = $('dnd-source');
  if (!sourceDepot) return;
  const remaining = sourceDepot.querySelectorAll('.drag-item').length;
  let emptyHint = sourceDepot.querySelector('.depot-empty-hint');

  if (remaining === 0) {
    if (!emptyHint) {
      emptyHint = document.createElement('div');
      emptyHint.className = 'depot-empty-hint';
      emptyHint.innerHTML = '&#x2713; Semua 5 tahapan telah dipilih.<br><small>Ketuk kartu pada slot jika ingin membatalkan atau mengubah urutan.</small>';
      sourceDepot.appendChild(emptyHint);
    }
  } else {
    if (emptyHint) emptyHint.remove();
  }
}

/**
 * Menginisialisasi (atau me-reset) simulasi DnD.
 * - Mengosongkan depot dan slot
 * - Mengacak urutan kartu tahapan (Fisher-Yates)
 * - Mendaftarkan event listener tap, touch-drag, dan desktop drag
 * - Membuat slot target sesuai urutan teknis yang benar
 */
function initDragAndDrop() {
  const sourceDepot  = $('dnd-source');
  const targetSlots  = $('dnd-targets');
  const feedbackBox  = $('dnd-feedback');

  if (!sourceDepot || !targetSlots) return;

  // Bersihkan konten sebelumnya
  sourceDepot.innerHTML = '';
  targetSlots.innerHTML = '';
  if (feedbackBox) {
    feedbackBox.className = 'dnd-msg-box';
    feedbackBox.innerHTML = '';
  }

  // Render kartu tahapan dalam urutan acak
  const randomized = fisherYatesShuffle(dndSteps);
  randomized.forEach(step => {
    const item = document.createElement('div');
    item.className   = 'drag-item';
    item.draggable   = true;
    item.id          = step.id;
    item.dataset.order = step.order;
    item.innerText   = step.label;
    item.title       = "Ketuk untuk memilih otomatis, atau geser (drag) ke slot urutan";
    item.setAttribute('role',     'button');
    item.setAttribute('tabindex', '0');

    // Event: HTML5 Drag API (desktop)
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
    });

    // Event: Klik Desktop & Fallback Aksesibilitas Keyboard (Enter/Space)
    item.addEventListener('click', (e) => {
      // Cegah double firing dari touchend pada layar sentuh
      if (Date.now() - lastTouchTapTime < 500) return;
      handleItemClick(e.currentTarget);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleItemClick(e.currentTarget);
      }
    });

    // Event: Layar Sentuh Mobile (Tap Otomatis vs Drag Manual)
    bindTouchDnD(item);

    sourceDepot.appendChild(item);
  });

  // Render slot target dalam urutan teknis yang benar (1–5)
  dndSteps.forEach(step => {
    const slot = document.createElement('div');
    slot.className          = 'assembly-slot';
    slot.dataset.expected   = step.order;

    slot.addEventListener('dragover',  allowDrop);
    slot.addEventListener('dragleave', (e) => e.currentTarget.classList.remove('hovered'));
    slot.addEventListener('drop',      (e) => dropToTargetSlot(e, slot));

    // Ketuk slot juga dapat melepas kartu yang ada di dalamnya
    slot.addEventListener('click', (e) => {
      if (Date.now() - lastTouchTapTime < 500) return;
      const card = slot.querySelector('.drag-item');
      if (card && (e.target === slot || e.target.classList.contains('slot-index') || e.target.classList.contains('slot-placeholder'))) {
        handleItemClick(card);
      }
    });

    slot.innerHTML = `
      <div class="slot-index">${step.order}</div>
      <div class="slot-placeholder">${step.hint}</div>
    `;
    targetSlots.appendChild(slot);
  });

  updateDepotState();

  // Reset status simulasi
  dndPassed    = false;
  dndAttempted = false;
  saveState();
}

/**
 * Mendaftarkan event listener sentuhan (touchstart, touchmove, touchend, touchcancel)
 * pada kartu untuk membedakan antara TAP instan (pindah otomatis) vs DRAG (geser manual).
 * @param {HTMLElement} itemEl - Kartu yang akan diberi penanganan sentuhan
 */
function bindTouchDnD(itemEl) {

  // touchstart: catat koordinat awal sentuhan, jangan langsung buat ghost!
  itemEl.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return; // Hanya single touch
    touchDraggedItem = itemEl;

    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    isDraggingTouch = false;
  }, { passive: true });

  // touchmove: jika pergerakan melebihi ambang batas (10px), aktifkan mode drag
  itemEl.addEventListener('touchmove', (e) => {
    if (!touchDraggedItem) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    // Aktifkan mode drag manual jika jari bergeser lebih dari 10px
    if (!isDraggingTouch && Math.hypot(dx, dy) > 10) {
      isDraggingTouch = true;
      touchGhostEl = itemEl.cloneNode(true);
      touchGhostEl.classList.add('drag-ghost');
      document.body.appendChild(touchGhostEl);
      document.body.classList.add('touch-dragging');
    }

    if (isDraggingTouch && touchGhostEl) {
      touchGhostEl.style.left = `${touch.clientX}px`;
      touchGhostEl.style.top  = `${touch.clientY}px`;

      // Sembunyikan ghost sesaat untuk mendeteksi elemen slot di bawah jari
      touchGhostEl.style.display = 'none';
      const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      touchGhostEl.style.display = '';

      document.querySelectorAll('.assembly-slot').forEach(s => s.classList.remove('hovered'));
      if (elemBelow) {
        const slot = elemBelow.closest('.assembly-slot');
        if (slot) slot.classList.add('hovered');
      }
    }
  }, { passive: true });

  // touchend: eksekusi aksi sesuai mode (Tap -> Pindah otomatis, Drag -> Pindah ke slot target)
  itemEl.addEventListener('touchend', (e) => {
    if (!touchDraggedItem) return;

    if (isDraggingTouch && touchGhostEl) {
      // --- MODE DRAG MANUAL ---
      const touch = e.changedTouches[0];
      touchGhostEl.style.display = 'none';
      const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
      touchGhostEl.remove();
      touchGhostEl = null;

      document.body.classList.remove('touch-dragging');
      document.querySelectorAll('.assembly-slot').forEach(s => s.classList.remove('hovered'));

      if (targetElement) {
        const targetSlot   = targetElement.closest('.assembly-slot');
        const targetSource = targetElement.closest('#dnd-source');

        if (targetSlot)        moveItemToSlot(touchDraggedItem, targetSlot);
        else if (targetSource) moveItemToSource(touchDraggedItem);
      }
    } else {
      // --- MODE TAP OTOMATIS (Sesuai Permintaan Mobile) ---
      lastTouchTapTime = Date.now();
      handleItemClick(touchDraggedItem);
    }

    touchDraggedItem = null;
    isDraggingTouch  = false;
  });

  // touchcancel: bersihkan elemen ghost jika gestur terganggu
  itemEl.addEventListener('touchcancel', () => {
    if (touchGhostEl) {
      touchGhostEl.remove();
      touchGhostEl = null;
    }
    document.body.classList.remove('touch-dragging');
    document.querySelectorAll('.assembly-slot').forEach(s => s.classList.remove('hovered'));
    touchDraggedItem = null;
    isDraggingTouch  = false;
  });
}

/**
 * Mencegah perilaku default drag (diperlukan agar drop event terpanggil).
 * Juga menambahkan highlight visual pada slot yang dilintasi.
 * @param {DragEvent} e
 */
function allowDrop(e) {
  e.preventDefault();
  if (e.currentTarget.classList.contains('assembly-slot')) {
    e.currentTarget.classList.add('hovered');
  }
}

/**
 * Memindahkan kartu drag ke dalam slot target.
 * - Jika slot sudah terisi, kartu lama dikembalikan ke depot
 * - Placeholder di slot tujuan disembunyikan
 * - Placeholder di slot asal diperlihatkan kembali
 * @param {HTMLElement} dragged - Kartu yang dipindahkan
 * @param {HTMLElement} slot    - Slot tujuan
 */
function moveItemToSlot(dragged, slot) {
  slot.classList.remove('hovered');
  slot.style.borderColor = '';
  slot.style.background  = '';

  // Jika slot sudah ada isinya (bukan kartu yang sama), kembalikan ke depot
  const currentOccupant = slot.querySelector('.drag-item');
  if (currentOccupant && currentOccupant !== dragged) {
    const source = $('dnd-source');
    if (source) source.appendChild(currentOccupant);
  }

  // Pulihkan placeholder di slot asal (jika kartu dipindah dari slot lain)
  const prevParent = dragged.parentElement;
  if (prevParent && prevParent.classList.contains('assembly-slot') && prevParent !== slot) {
    const prevPlaceholder = prevParent.querySelector('.slot-placeholder');
    if (prevPlaceholder) prevPlaceholder.style.display = 'block';
    prevParent.style.borderColor = '';
    prevParent.style.background  = '';
  }

  // Sembunyikan placeholder di slot tujuan dan tempatkan kartu
  const placeholder = slot.querySelector('.slot-placeholder');
  if (placeholder) placeholder.style.display = 'none';
  slot.appendChild(dragged);
  updateDepotState();
}

/**
 * Memindahkan kartu drag kembali ke depot sumber.
 * Memulihkan placeholder pada slot asal kartu.
 * @param {HTMLElement} dragged - Kartu yang dikembalikan
 */
function moveItemToSource(dragged) {
  const prevParent = dragged.parentElement;
  if (prevParent && prevParent.classList.contains('assembly-slot')) {
    const prevPlaceholder = prevParent.querySelector('.slot-placeholder');
    if (prevPlaceholder) prevPlaceholder.style.display = 'block';
    prevParent.style.borderColor = '';
    prevParent.style.background  = '';
  }
  const source = $('dnd-source');
  if (source) source.appendChild(dragged);
  updateDepotState();
}

/**
 * Handler drop native HTML5 ke slot target perakitan.
 * Mengambil ID kartu dari dataTransfer lalu memanggil moveItemToSlot().
 * @param {DragEvent} e    - Event drop
 * @param {HTMLElement} slot - Slot tujuan drop
 */
function dropToTargetSlot(e, slot) {
  e.preventDefault();
  const id     = e.dataTransfer.getData('text/plain');
  const dragged = $(id);
  if (!dragged) return;
  moveItemToSlot(dragged, slot);
}

/**
 * Handler drop native HTML5 kembali ke depot sumber.
 * @param {DragEvent} e - Event drop
 */
function dropToSource(e) {
  e.preventDefault();
  const id     = e.dataTransfer.getData('text/plain');
  const dragged = $(id);
  if (!dragged) return;
  moveItemToSource(dragged);
}

/**
 * Memverifikasi urutan kartu di semua slot dan menampilkan hasil.
 * - Mewarnai slot biru (benar) atau merah (salah)
 * - Menampilkan pesan feedback di #dnd-feedback
 * - Menyimpan state hasil verifikasi ke localStorage
 */
function checkDndOrder() {
  dndAttempted = true;
  const slots    = document.querySelectorAll('.assembly-slot');
  const feedback = $('dnd-feedback');
  let placed  = 0;
  let correct = 0;

  // Evaluasi setiap slot
  slots.forEach(slot => {
    const expected = parseInt(slot.dataset.expected, 10);
    const card     = slot.querySelector('.drag-item');
    if (card) {
      placed++;
      if (parseInt(card.dataset.order, 10) === expected) {
        correct++;
        slot.style.borderColor = '#136cfc'; // Biru = benar
        slot.style.background  = '#e8f4fc';
      } else {
        slot.style.borderColor = '#ef4444'; // Merah = salah
        slot.style.background  = '#fee2e2';
      }
    } else {
      slot.style.borderColor = '#ef4444'; // Slot kosong = error
    }
  });

  if (!feedback) return;

  // Pesan peringatan: masih ada slot kosong
  if (placed < 5) {
    feedback.className = 'dnd-msg-box visible error';
    feedback.innerHTML = `[PERINGATAN]: Masih ada slot kosong (${placed}/5). Masukkan seluruh 5 komponen ke dalam slot sebelum melakukan verifikasi.`;
    announce(`Peringatan: Masih ada slot kosong, baru ${placed} dari 5 slot terisi.`);
    saveState();
    return;
  }

  // Evaluasi hasil: lolos atau perlu revisi
  if (correct === 5) {
    dndPassed = true;
    feedback.className = 'dnd-msg-box visible success';
    feedback.innerHTML = `[VERIFIKASI_LOLOS]: 5/5 tahapan perakitan tersusun secara benar dan memenuhi kaidah keselamatan teknis. Silakan lanjutkan ke Tantangan Blok Fungsi.`;
    announce("Verifikasi lolos! Seluruh 5 tahapan perakitan benar.");
  } else {
    dndPassed = false;
    feedback.className = 'dnd-msg-box visible error';
    feedback.innerHTML = `[KESALAHAN_URUTAN]: Akurasi ${correct}/5 benar. Kunci urutan standar teknis:<br>1. Motherboard di meja non-konduktif &rarr; 2. Pasang CPU &amp; Cooler &rarr; 3. Pasang RAM &rarr; 4. Pasang PSU &amp; Baut ke Casing &rarr; 5. Pasang SSD, GPU, &amp; Kabel Daya.`;
    announce(`Kesalahan urutan: Akurasi ${correct} dari 5 benar.`);
  }

  saveState();
}


/* =====================================================================
 * §15 — KUIS EVALUASI BLOK FUNGSI (SLIDE 11–13)
 * Tiga soal pilihan ganda berbasis skenario kasus teknis.
 * Konten dirender secara dinamis dari quizData (§5).
 * Jawaban dikunci setelah dipilih (class quiz-locked).
 * State jawaban disimpan agar tetap terpulihkan saat reload halaman.
 * ===================================================================== */

/**
 * Me-render semua slide kuis dari quizData ke elemen DOM target.
 * Jika ada jawaban tersimpan di state, tampilan dipulihkan via applyQuizAnswerVisual().
 */
function renderQuizSlides() {
  quizData.forEach((q, qIdx) => {
    const targetEl = $(`slide-${q.slideIdx}`);
    if (!targetEl) return;

    // Bangun HTML pilihan jawaban
    const optionsHtml = q.choices.map(c => `
      <button class="option-tile" data-quiz-idx="${qIdx}" data-quiz-key="${c.key}" role="radio" aria-checked="false">
        <span class="opt-prefix">[${c.key}]</span>
        <span>${c.text}</span>
      </button>
    `).join('');

    targetEl.innerHTML = `
      <div class="challenge-stage">
        <div class="challenge-box">
          <span class="challenge-kicker">${q.title} // SOAL ${q.number} DARI 03</span>
          <h3>${q.question}</h3>
        </div>

        <div class="options-grid" id="quiz-options-${qIdx}" role="radiogroup" aria-label="${q.title}">
          ${optionsHtml}
        </div>

        <div class="dnd-msg-box" id="quiz-msg-${qIdx}"></div>

        <div class="challenge-ctrls" style="margin-top: 16px;">
          <button class="btn btn-secondary" data-quiz-reset="${qIdx}">Ulangi Soal</button>
          <button class="btn btn-secondary" data-quiz-solution="${qIdx}">Lihat Solusi</button>
        </div>
      </div>
    `;

    // Pulihkan tampilan jika ada jawaban tersimpan dari sesi sebelumnya
    if (quizAnswered[qIdx] !== null) {
      applyQuizAnswerVisual(qIdx, quizAnswered[qIdx], false);
    }
  });
}

/**
 * Memproses jawaban yang dipilih pengguna pada soal tertentu.
 * - Mengunci grid opsi (quiz-locked)
 * - Mewarnai tombol benar (hijau) atau salah (merah)
 * - Menampilkan pesan feedback
 * - Memperbarui state quizScores dan quizAnswered, lalu menyimpannya
 * @param {number}      qIdx      - Indeks soal (0-based)
 * @param {string}      selectedKey - Kunci pilihan ('A'/'B'/'C'/'D')
 * @param {HTMLElement} btnEl     - Elemen tombol yang diklik
 */
function checkQuizAnswer(qIdx, selectedKey, btnEl) {
  const q      = quizData[qIdx];
  const grid   = $(`quiz-options-${qIdx}`);
  const msgBox = $(`quiz-msg-${qIdx}`);

  // Kunci grid agar tidak bisa mengubah jawaban
  if (grid) grid.classList.add('quiz-locked');

  // Reset semua aria-checked sebelum menerapkan yang baru
  const allBtns = document.querySelectorAll(`#quiz-options-${qIdx} .option-tile`);
  allBtns.forEach(b => {
    b.classList.remove('selected-ok', 'selected-err');
    b.setAttribute('aria-checked', 'false');
  });

  // Simpan jawaban ke state
  quizAnswered[qIdx] = selectedKey;
  btnEl.setAttribute('aria-checked', 'true');

  if (selectedKey === q.correctKey) {
    // Jawaban benar
    quizScores[qIdx] = true;
    btnEl.classList.add('selected-ok');
    if (msgBox) {
      msgBox.className = 'dnd-msg-box visible success';
      msgBox.innerHTML = `[JAWABAN_TEPAT]: Komponen <em>${q.correctName}</em> adalah blok fungsi yang tepat.`;
    }
    announce(`Jawaban tepat! Komponen ${q.correctName} adalah blok fungsi yang sesuai.`);
  } else {
    // Jawaban salah
    quizScores[qIdx] = false;
    btnEl.classList.add('selected-err');
    if (msgBox) {
      msgBox.className = 'dnd-msg-box visible error';
      msgBox.innerHTML = `[JAWABAN_KELIRU]: Pilihan tersebut bukan blok fungsi yang dimaksud pada kasus ini. Klik tombol <em>Lihat Solusi</em> untuk pembahasan detail.`;
    }
    announce(`Jawaban keliru untuk kasus ${q.number}.`);
  }

  saveState();
}

/**
 * Mengembalikan tampilan visual jawaban tersimpan ke slide kuis
 * setelah halaman dimuat ulang atau slide dirender ulang.
 * @param {number}  qIdx          - Indeks soal (0-based)
 * @param {string}  selectedKey   - Kunci jawaban yang tersimpan
 * @param {boolean} shouldAnnounce - Apakah mengumumkan ke screen reader
 */
function applyQuizAnswerVisual(qIdx, selectedKey, shouldAnnounce = false) {
  const q      = quizData[qIdx];
  const grid   = $(`quiz-options-${qIdx}`);
  const msgBox = $(`quiz-msg-${qIdx}`);
  if (!grid) return;

  grid.classList.add('quiz-locked');
  const allBtns = grid.querySelectorAll('.option-tile');

  allBtns.forEach(b => {
    if (b.dataset.quizKey === selectedKey) {
      b.setAttribute('aria-checked', 'true');
      if (selectedKey === q.correctKey) {
        b.classList.add('selected-ok');
        if (msgBox) {
          msgBox.className = 'dnd-msg-box visible success';
          msgBox.innerHTML = `[JAWABAN_TEPAT]: Komponen <em>${q.correctName}</em> adalah blok fungsi yang tepat.`;
        }
      } else {
        b.classList.add('selected-err');
        if (msgBox) {
          msgBox.className = 'dnd-msg-box visible error';
          msgBox.innerHTML = `[JAWABAN_KELIRU]: Pilihan tersebut bukan blok fungsi yang dimaksud pada kasus ini.`;
        }
      }
    }
  });
}

/**
 * Me-reset soal kuis tertentu ke kondisi awal (belum dijawab).
 * - Menghapus class quiz-locked dan warna pilihan
 * - Mengosongkan pesan feedback
 * - Memperbarui state dan localStorage
 * @param {number} qIdx - Indeks soal (0-based)
 */
function resetQuizQuestion(qIdx) {
  quizScores[qIdx]  = false;
  quizAnswered[qIdx] = null;

  const grid = $(`quiz-options-${qIdx}`);
  if (grid) grid.classList.remove('quiz-locked');

  const allBtns = document.querySelectorAll(`#quiz-options-${qIdx} .option-tile`);
  allBtns.forEach(b => {
    b.classList.remove('selected-ok', 'selected-err');
    b.setAttribute('aria-checked', 'false');
  });

  const msgBox = $(`quiz-msg-${qIdx}`);
  if (msgBox) {
    msgBox.className = 'dnd-msg-box';
    msgBox.innerHTML = '';
  }

  announce(`Soal kasus ${qIdx + 1} direset. Silakan tentukan jawaban kembali.`);
  saveState();
}

/**
 * Menampilkan kunci jawaban benar pada soal kuis tertentu.
 * - Mengunci grid, hapus warna merah, sorot jawaban benar dengan hijau
 * - Tampilkan penjelasan solusi di msgBox
 * @param {number} qIdx - Indeks soal (0-based)
 */
function showQuizSolution(qIdx) {
  const q      = quizData[qIdx];
  const grid   = $(`quiz-options-${qIdx}`);
  const msgBox = $(`quiz-msg-${qIdx}`);

  if (grid) grid.classList.add('quiz-locked');

  const allBtns = document.querySelectorAll(`#quiz-options-${qIdx} .option-tile`);
  allBtns.forEach(b => {
    b.classList.remove('selected-err');
    if (b.dataset.quizKey === q.correctKey) {
      b.classList.add('selected-ok');
      b.setAttribute('aria-checked', 'true');
    }
  });

  if (msgBox) {
    msgBox.className = 'dnd-msg-box visible success';
    msgBox.innerHTML = `<strong>KUNCI JAWABAN: [${q.correctKey}] ${q.correctName}</strong><br>${q.solution}`;
  }

  announce(`Kunci jawaban: ${q.correctKey}, ${q.correctName}.`);
}


/* =====================================================================
 * §16 — REKAPITULASI & RESET SESI (SLIDE 14)
 * Menghitung dan menampilkan skor akhir berdasarkan:
 *   - Modul dipelajari  : 30 poin maks (visitedComponents / 6)
 *   - Simulasi DnD      : 30 poin (lolos) / 15 poin (dicoba) / 0 (skip)
 *   - Kuis evaluasi     : 40 poin maks (quizCorrect / 3)
 * Skor ditampilkan dengan animasi count-up ease-out quadratic.
 * ===================================================================== */

/**
 * Animasi count-up angka skor dengan easing ease-out quadratic.
 * Menggunakan requestAnimationFrame untuk performa optimal.
 * @param {HTMLElement} el          - Elemen yang menampilkan angka
 * @param {number}      targetScore - Nilai akhir yang dituju
 * @param {string}      suffix      - Teks suffix setelah angka (default " / 100")
 */
function animateScoreCount(el, targetScore, suffix = " / 100") {
  if (!el) return;
  let currentVal = 0;
  const duration  = 650; // Durasi animasi dalam milidetik
  const startTime = performance.now();

  function step(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out quadratic: melambat menjelang nilai akhir
    const ease   = 1 - (1 - progress) * (1 - progress);
    currentVal   = Math.round(ease * targetScore);
    el.innerText = `${currentVal}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // Pastikan nilai akhir tepat dan tambahkan animasi pop-in
      el.innerText = `${targetScore}${suffix}`;
      el.classList.add('score-animate');
    }
  }
  requestAnimationFrame(step);
}

/**
 * Memperbarui semua elemen rekapitulasi di Slide 14.
 * Menghitung skor akhir dan menentukan predikat capaian.
 * Dipanggil otomatis setiap kali pengguna masuk ke slide 14 (goToSlide).
 */
function updateFinalRecap() {
  const visitedCount = visitedComponents.size;

  // Tampilkan jumlah komponen yang sudah dipelajari
  const recapMateriEl = $('recap-materi');
  if (recapMateriEl) recapMateriEl.innerText = `${visitedCount} / 6`;

  // Tampilkan status simulasi DnD
  const dndEl = $('recap-dnd');
  if (dndEl) {
    if (dndPassed) {
      dndEl.innerText    = "LOLOS (5/5)";
      dndEl.style.color  = "var(--blue)";
    } else if (dndAttempted) {
      dndEl.innerText    = "REVISI";
      dndEl.style.color  = "var(--dark-blue)";
    } else {
      dndEl.innerText    = "PENDING";
      dndEl.style.color  = "var(--dark-blue)";
    }
  }

  // Tampilkan skor kuis
  const quizCorrectCount = quizScores.filter(Boolean).length;
  const recapQuizEl = $('recap-quiz');
  if (recapQuizEl) recapQuizEl.innerText = `${quizCorrectCount} / 3`;

  // --- Kalkulasi Skor Akhir (Skala 0–100) ---
  const materiScore = (visitedCount / 6)       * 30; // Maks 30 poin
  const dndScore    = dndPassed ? 30 : (dndAttempted ? 15 : 0); // Maks 30 poin
  const quizScore   = (quizCorrectCount / 3)   * 40; // Maks 40 poin
  const totalScore  = Math.round(materiScore + dndScore + quizScore);

  // Animasi count-up skor total
  const totalScoreEl = $('recap-total-score');
  if (totalScoreEl) {
    animateScoreCount(totalScoreEl, totalScore);
  }

  // Tentukan predikat capaian berdasarkan skor
  const predicateEl = $('recap-predicate');
  if (predicateEl) {
    if (totalScore >= 85) {
      predicateEl.innerText    = "Status: Sangat Memuaskan [A]";
      predicateEl.style.color  = "var(--green-text)";
    } else if (totalScore >= 70) {
      predicateEl.innerText    = "Status: Kompeten [B]";
      predicateEl.style.color  = "var(--blue)";
    } else {
      predicateEl.innerText    = "Status: Butuh Pengulangan [C]";
      predicateEl.style.color  = "var(--dark-blue)";
    }
  }

  // Umumkan ringkasan ke screen reader
  announce(`Rekapitulasi: Modul ${visitedCount}/6, Simulasi ${dndPassed ? 'Lolos' : 'Pending'}, Tantangan ${quizCorrectCount}/3, Total Skor ${totalScore} dari 100.`);
}

/**
 * Mereset seluruh sesi pembelajaran ke kondisi awal.
 * - Menghapus semua state progres di memori dan localStorage
 * - Me-render ulang komponen yang bergantung pada state
 * - Navigasi kembali ke Slide 1 (cover)
 * Hanya dipanggil setelah pengguna mengonfirmasi melalui modal reset.
 */
function restartAll() {
  // Hapus semua state di memori
  visitedComponents.clear();
  dndPassed    = false;
  dndAttempted = false;
  for (let i = 0; i < quizScores.length; i++) {
    quizScores[i]  = false;
    quizAnswered[i] = null;
  }

  // Hapus dari localStorage
  try { localStorage.removeItem(STORAGE_KEY); } catch (err) {}

  // Render ulang konten yang bergantung pada state
  renderComponentMenu();
  initDragAndDrop();
  renderQuizSlides();

  // Kembali ke slide pertama
  goToSlide(0);
  announce("Seluruh sesi dan data evaluasi berhasil direset ke awal.");
}


/* =====================================================================
 * §17 — NAVIGASI KEYBOARD
 * Shortcut keyboard untuk navigasi presentasi tanpa mouse/touch.
 * Keyboard diabaikan jika fokus ada di elemen interaktif (input, tombol)
 * atau jika modal sedang terbuka.
 *
 * Shortcut:
 *   ArrowRight / PageDown → Slide berikutnya
 *   ArrowLeft  / PageUp   → Slide sebelumnya
 *   Home                  → Slide pertama
 *   End                   → Slide terakhir
 *   F / f                 → Toggle fullscreen
 *   Escape                → Tutup modal / drawer (jika terbuka)
 * ===================================================================== */

/**
 * Mendaftarkan event listener keydown pada window untuk navigasi keyboard.
 * Semua logika bersifat defensive — tidak akan mengganggu input form.
 */
function initKeyboardNavigation() {
  window.addEventListener('keydown', (e) => {
    // Periksa apakah fokus ada di elemen form/interaktif
    const tag          = (e.target && e.target.tagName) ? e.target.tagName.toUpperCase() : '';
    const isInteractive = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(tag) || (e.target && e.target.isContentEditable);

    // Periksa apakah modal atau drawer sedang terbuka
    const modal        = $('confirm-modal');
    const isModalOpen  = modal && modal.classList.contains('open');
    const drawer       = $('slide-nav-drawer');
    const isDrawerOpen = drawer && drawer.classList.contains('open');

    // Escape: tutup modal atau drawer yang sedang terbuka
    if (e.key === 'Escape') {
      if (isModalOpen)  { hideConfirmResetModal(); return; }
      if (isDrawerOpen) { closeSlideNav();         return; }
    }

    // Jika modal sedang terbuka, biarkan keyboard fokus berjalan di modal
    if (isModalOpen) return;

    // Navigasi slide (berlaku meski fokus di tombol)
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault();
      changeSlide(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      changeSlide(-1);
    } else if (e.key === 'Home' && !isInteractive) {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End' && !isInteractive) {
      e.preventDefault();
      goToSlide(TOTAL_SLIDES - 1);
    } else if ((e.key === 'f' || e.key === 'F') && !isInteractive) {
      // F: toggle fullscreen (hanya jika tidak di dalam input)
      e.preventDefault();
      toggleFullscreen();
    }
  });
}
