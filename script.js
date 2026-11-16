/**
 * ====================================================================
 * ANATOMI KOMPONEN & SIMULASI PERAKITAN PC (14 SLIDE)
 * Engine: Clean Technical White Workspace (High Contrast & Legibility)
 * Palette:
 *   - Base & Surface:   #FFFFFF & #E8F4FC
 *   - Solid Text:       #152641 (Bebas Abu-abu)
 *   - Primary Accent:   #136CFC (Blue)
 *   - Functional Accent:#C3F84A (Lime Green) & #256604 (Accessible Green Text)
 * Tim Penyusun: Dhoni & Devi (TIF 2024 - Universitas PGRI Ronggolawe Tuban)
 * ====================================================================
 */

const TOTAL_SLIDES = 14;
const STORAGE_KEY = 'UTS_DHONI_DEVI_PC_MODULE_STATE_V2';

let currentSlide = 0;

// Progres & Evaluasi
const visitedComponents = new Set();
let dndPassed = false;
let dndAttempted = false;
const quizScores = [false, false, false];
const quizAnswered = [null, null, null]; // 'A', 'B', 'C', 'D' or null

// Titles list for navigation badge & drawer
const slideDirectory = [
  { num: 1, label: "OVERVIEW", title: "Sampul Utama & Modul Pembelajaran" },
  { num: 2, label: "PETA KOMPONEN", title: "Peta Skematik Blok Komponen" },
  { num: 3, label: "MOTHERBOARD", title: "Blok 01: Papan Sirkuit Utama (PCB)" },
  { num: 4, label: "CPU (PROCESSOR)", title: "Blok 02: Central Processing Unit" },
  { num: 5, label: "RAM (MEMORY)", title: "Blok 03: Random Access Memory" },
  { num: 6, label: "SSD (STORAGE)", title: "Blok 04: Solid State Drive (NVMe)" },
  { num: 7, label: "GPU (GRAPHICS)", title: "Blok 05: Graphics Processing Unit" },
  { num: 8, label: "PSU (POWER SUPPLY)", title: "Blok 06: Power Supply Unit" },
  { num: 9, label: "SOP PERAKITAN", title: "Standar Keselamatan & SOP Teknis" },
  { num: 10, label: "SIMULASI DND", title: "Simulasi Urutan Perakitan PC" },
  { num: 11, label: "TANTANGAN 01", title: "Kasus 01: Multitasking & Beban Memori" },
  { num: 12, label: "TANTANGAN 02", title: "Kasus 02: Anomali Suplai Listrik" },
  { num: 13, label: "TANTANGAN 03", title: "Kasus 03: Integritas Penyimpanan Permanen" },
  { num: 14, label: "REKAPITULASI", title: "Laporan Evaluasi Capaian Akhir" }
];

// ================= DATA 6 KOMPONEN UTAMA (SLIDE 3 - 8) =================
const hardwareModules = [
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
        
        <!-- Circuit Signal Traces with Pulse Animation -->
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
        
        <!-- Monospace Identifier -->
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
        
        <!-- DRAM BGA Chips with Flashing Activity LEDs -->
        <rect x="36" y="85" width="26" height="44" rx="2" fill="#192e4e" stroke="#395f98" class="anim-ram-led"/>
        <rect x="70" y="85" width="26" height="44" rx="2" fill="#192e4e" stroke="#395f98" class="anim-ram-led" style="animation-delay: 0.2s;"/>
        <rect x="104" y="85" width="26" height="44" rx="2" fill="#192e4e" stroke="#395f98" class="anim-ram-led" style="animation-delay: 0.4s;"/>
        <rect x="148" y="85" width="26" height="44" rx="2" fill="#192e4e" stroke="#395f98" class="anim-ram-led" style="animation-delay: 0.6s;"/>
        <rect x="182" y="85" width="26" height="44" rx="2" fill="#192e4e" stroke="#395f98" class="anim-ram-led" style="animation-delay: 0.8s;"/>
        <rect x="216" y="85" width="26" height="44" rx="2" fill="#192e4e" stroke="#395f98" class="anim-ram-led" style="animation-delay: 1.0s;"/>
        
        <!-- Gold Fingers with Key Notch -->
        <rect x="24" y="150" width="102" height="10" fill="#c3f84a"/>
        <rect x="126" y="150" width="16" height="14" fill="#0f1c30"/>
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
        
        <!-- Streaming Data Packets -->
        <circle cx="100" cy="92" r="3" fill="#c3f84a" class="anim-ssd-pkt"/>
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
        <circle cx="95" cy="105" r="40" fill="#0f1c30" stroke="#395f98" stroke-width="1.5"/>
        <circle cx="185" cy="105" r="40" fill="#0f1c30" stroke="#395f98" stroke-width="1.5"/>
        
        <!-- Rotating Fan Rotor 1 -->
        <g class="anim-fan-rotor" style="transform-origin: 95px 105px;">
          <circle cx="95" cy="105" r="14" fill="#136cfc"/>
          <path d="M95 105 L95 70 A10 10 0 0 1 106 79 Z" fill="#ffffff"/>
          <path d="M95 105 L130 105 A10 10 0 0 1 121 116 Z" fill="#ffffff"/>
          <path d="M95 105 L95 140 A10 10 0 0 1 84 131 Z" fill="#ffffff"/>
          <path d="M95 105 L60 105 A10 10 0 0 1 69 94 Z" fill="#ffffff"/>
        </g>
        
        <!-- Rotating Fan Rotor 2 -->
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
        <rect x="180" y="60" width="45" height="28" rx="2" fill="#0c1728" stroke="#395f98"/>
        <rect x="180" y="100" width="24" height="14" rx="2" fill="#136cfc"/>
        
        <!-- Electric Spark Indicator Line -->
        <path d="M95 78 L85 105 H104 L92 132" stroke="#c3f84a" stroke-width="3.5" stroke-linecap="square" class="anim-power-spark"/>
        
        <!-- Cable Rail Outlets -->
        <path d="M150 150 Q180 195 240 190" stroke="#c3f84a" stroke-width="3.5" fill="none"/>
        <path d="M160 150 Q190 205 245 200" stroke="#136cfc" stroke-width="3" fill="none"/>
        <path d="M170 150 Q200 215 250 210" stroke="#ffffff" stroke-width="3" fill="none"/>
        
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

// ================= DATA 5 TAHAPAN PERAKITAN DND (SLIDE 10) =================
const dndSteps = [
  { id: "step-1", label: "Siapkan Motherboard di Meja Kerja Non-Konduktif", order: 1, hint: "Slot 1: Fondasi awal sirkuit diletakkan di luar casing" },
  { id: "step-2", label: "Pasang CPU, Oleskan Pasta Termal, & Pasang Cooler", order: 2, hint: "Slot 2: Unit pemroses inti dan sistem pendingin dipasang" },
  { id: "step-3", label: "Tancapkan Keping RAM ke Slot DIMM Hingga Mengunci", order: 3, hint: "Slot 3: Memori kerja dipasang ke slot dual-channel" },
  { id: "step-4", label: "Pasang PSU ke Casing & Baut Motherboard ke Stand-off", order: 4, hint: "Slot 4: Rangkaian inti dipasang ke dalam rangka sasis" },
  { id: "step-5", label: "Pasang SSD NVMe, GPU ke PCIe, & Hubungkan Kabel Daya", order: 5, hint: "Slot 5: Storage, kartu grafis, dan daya akhir dihubungkan" }
];

// ================= DATA 3 LATIHAN BLOK FUNGSI (SLIDE 11 - 13) =================
const quizData = [
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

// ================= DEFENSIVE DOM QUERY HELPER =================
function $(id) {
  return document.getElementById(id);
}

// ================= ARIA LIVE SCREEN READER ANNOUNCER =================
function announce(msg) {
  const el = $('aria-announcer');
  if (!el) return;
  el.textContent = '';
  setTimeout(() => {
    el.textContent = msg;
  }, 40);
}

// ================= LOCAL STORAGE STATE MANAGEMENT =================
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

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);

    if (Array.isArray(data.visited)) {
      visitedComponents.clear();
      data.visited.forEach(v => visitedComponents.add(v));
    }
    if (typeof data.dndPassed === 'boolean') dndPassed = data.dndPassed;
    if (typeof data.dndAttempted === 'boolean') dndAttempted = data.dndAttempted;
    if (Array.isArray(data.quizScores) && data.quizScores.length === 3) {
      data.quizScores.forEach((s, i) => quizScores[i] = Boolean(s));
    }
    if (Array.isArray(data.quizAnswered) && data.quizAnswered.length === 3) {
      data.quizAnswered.forEach((a, i) => quizAnswered[i] = a);
    }
    if (typeof data.currentSlide === 'number' && data.currentSlide >= 0 && data.currentSlide < TOTAL_SLIDES) {
      currentSlide = data.currentSlide;
    }
    return true;
  } catch (err) {
    console.warn("Gagal memuat state dari storage:", err);
    return false;
  }
}

// ================= UNBIASED FISHER-YATES SHUFFLE =================
function fisherYatesShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ================= INTI INISIALISASI =================
document.addEventListener('DOMContentLoaded', () => {
  loadState();

  renderComponentMenu();
  renderMateriSlides();
  initDragAndDrop();
  renderQuizSlides();
  renderSlideNavDrawer();
  bindUnifiedEvents();
  goToSlide(currentSlide, false);
  initKeyboardNavigation();
});

// ================= EVENT BINDINGS (NO INLINE ONCLICK) =================
function bindUnifiedEvents() {
  // Cover Buttons
  const btnStart = $('btn-start-module');
  if (btnStart) btnStart.addEventListener('click', () => goToSlide(1));

  const btnGotoSop = $('btn-goto-sop');
  if (btnGotoSop) btnGotoSop.addEventListener('click', () => goToSlide(8));

  // DnD Buttons
  const btnResetDnd = $('btn-reset-dnd');
  if (btnResetDnd) btnResetDnd.addEventListener('click', () => initDragAndDrop());

  const btnCheckDnd = $('btn-check-dnd');
  if (btnCheckDnd) btnCheckDnd.addEventListener('click', () => checkDndOrder());

  // Depot DnD listeners
  const sourceDepot = $('dnd-source');
  if (sourceDepot) {
    sourceDepot.addEventListener('dragover', allowDrop);
    sourceDepot.addEventListener('drop', dropToSource);
  }

  // Recap & Reset Modal Buttons
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

  const modalBackdrop = $('confirm-modal-backdrop');
  if (modalBackdrop) modalBackdrop.addEventListener('click', hideConfirmResetModal);

  // Footer Navigation Buttons
  const btnPrev = $('btn-prev');
  if (btnPrev) btnPrev.addEventListener('click', () => changeSlide(-1));

  const btnNext = $('btn-next');
  if (btnNext) btnNext.addEventListener('click', () => changeSlide(1));

  const btnMap = $('btn-map');
  if (btnMap) btnMap.addEventListener('click', () => goToSlide(1));

  // Slide Drawer Navigation
  const btnNavOpen = $('btn-nav-open');
  if (btnNavOpen) btnNavOpen.addEventListener('click', openSlideNav);

  const btnCloseNav = $('btn-close-nav');
  if (btnCloseNav) btnCloseNav.addEventListener('click', closeSlideNav);

  const navBackdrop = $('slide-nav-backdrop');
  if (navBackdrop) navBackdrop.addEventListener('click', closeSlideNav);

  // Fullscreen Button & Change Listeners
  const btnFullscreen = $('btn-fullscreen');
  if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);

  document.addEventListener('fullscreenchange', updateFullscreenButton);
  document.addEventListener('webkitfullscreenchange', updateFullscreenButton);

  // Unified Event Delegation for Quiz Actions
  document.addEventListener('click', (e) => {
    // Option selection
    const tile = e.target.closest('.option-tile[data-quiz-idx]');
    if (tile) {
      const grid = tile.closest('.options-grid');
      if (grid && grid.classList.contains('quiz-locked')) return;
      const qIdx = parseInt(tile.dataset.quizIdx, 10);
      const key = tile.dataset.quizKey;
      checkQuizAnswer(qIdx, key, tile);
      return;
    }

    // Reset question
    const resetBtn = e.target.closest('[data-quiz-reset]');
    if (resetBtn) {
      const qIdx = parseInt(resetBtn.dataset.quizReset, 10);
      resetQuizQuestion(qIdx);
      return;
    }

    // Show solution
    const solBtn = e.target.closest('[data-quiz-solution]');
    if (solBtn) {
      const qIdx = parseInt(solBtn.dataset.quizSolution, 10);
      showQuizSolution(qIdx);
      return;
    }
  });
}

// ================= FITUR FULLSCREEN =================
function toggleFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => console.warn("Fullscreen request error:", err));
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(err => console.warn("Exit fullscreen error:", err));
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

function updateFullscreenButton() {
  const isFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
  document.documentElement.classList.toggle('is-fullscreen', isFs);

  const btn = $('btn-fullscreen');
  if (btn) {
    btn.classList.toggle('is-active', isFs);
    btn.innerHTML = isFs ? '&#x25A3; Fullscreen' : '&#x26F6; Fullscreen';
    btn.title = isFs ? 'Keluar Layar Penuh (Tekan Esc atau F)' : 'Mode Layar Penuh (Tekan F)';
    btn.setAttribute('aria-pressed', isFs ? 'true' : 'false');
  }
  announce(isFs ? 'Mode layar penuh aktif.' : 'Keluar dari mode layar penuh.');
}

// ================= MODAL RESET KONFIRMASI =================
function showConfirmResetModal() {
  const modal = $('confirm-modal');
  const backdrop = $('confirm-modal-backdrop');
  if (modal && backdrop) {
    modal.classList.add('open');
    backdrop.classList.add('open');
    const cancelBtn = $('btn-cancel-reset');
    if (cancelBtn) cancelBtn.focus();
  }
}

function hideConfirmResetModal() {
  const modal = $('confirm-modal');
  const backdrop = $('confirm-modal-backdrop');
  if (modal && backdrop) {
    modal.classList.remove('open');
    backdrop.classList.remove('open');
  }
}

// ================= SLIDE NAVIGATION DRAWER =================
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

function openSlideNav() {
  const drawer = $('slide-nav-drawer');
  const backdrop = $('slide-nav-backdrop');
  if (drawer && backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    updateDrawerActiveState();
    const closeBtn = $('btn-close-nav');
    if (closeBtn) closeBtn.focus();
  }
}

function closeSlideNav() {
  const drawer = $('slide-nav-drawer');
  const backdrop = $('slide-nav-backdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
  }
}

function updateDrawerActiveState() {
  const items = document.querySelectorAll('.nav-slide-item');
  items.forEach((item, idx) => {
    item.classList.toggle('active', idx === currentSlide);
  });
}

// ================= KONTROL NAVIGASI SLIDE =================
function changeSlide(direction) {
  goToSlide(currentSlide + direction);
}

function goToSlide(targetIdx, announceSlide = true) {
  if (targetIdx < 0 || targetIdx >= TOTAL_SLIDES) return;
  currentSlide = targetIdx;

  if (currentSlide >= 2 && currentSlide <= 7) {
    visitedComponents.add(currentSlide);
    renderComponentMenu();
  }

  if (currentSlide === 13) {
    updateFinalRecap();
  }

  updateSlideNavigation();
  updateDrawerActiveState();
  saveState();

  // Focus management & accessibility announcement (fokus ke slide container, bukan teks judul agar bebas border biru)
  const activeSlide = $(`slide-${currentSlide}`);
  if (activeSlide) {
    activeSlide.setAttribute('tabindex', '-1');
    activeSlide.focus({ preventScroll: true });
  }

  if (announceSlide && slideDirectory[currentSlide]) {
    announce(`Beralih ke Slide ${slideDirectory[currentSlide].num}: ${slideDirectory[currentSlide].title}`);
  }
}

function updateSlideNavigation() {
  const slides = document.querySelectorAll('.slide-body');
  slides.forEach((s, idx) => {
    s.classList.toggle('active', idx === currentSlide);
  });

  const dirItem = slideDirectory[currentSlide] || { num: currentSlide + 1, label: "OVERVIEW", title: "" };
  const slideNum = `SLIDE ${String(dirItem.num).padStart(2, '0')}`;
  const slideLabel = dirItem.label;

  const badgeEl = $('footer-badge');
  const titleEl = $('footer-title');
  const counterEl = $('slide-counter');
  const progressFill = $('progress-fill');
  const progressBar = document.querySelector('.footer-progress');

  if (badgeEl) badgeEl.innerText = slideNum;
  if (titleEl) titleEl.innerText = slideLabel;
  if (counterEl) counterEl.innerText = `${String(currentSlide + 1).padStart(2, '0')} / ${TOTAL_SLIDES}`;
  
  if (progressFill) {
    const percent = ((currentSlide + 1) / TOTAL_SLIDES) * 100;
    progressFill.style.width = `${percent}%`;
  }
  if (progressBar) {
    progressBar.setAttribute('aria-valuenow', currentSlide + 1);
  }

  const btnPrev = $('btn-prev');
  if (btnPrev) btnPrev.disabled = currentSlide === 0;

  const btnNext = $('btn-next');
  if (btnNext) btnNext.disabled = currentSlide === TOTAL_SLIDES - 1;

  const btnMap = $('btn-map');
  if (btnMap) {
    btnMap.style.display = (currentSlide >= 2 && currentSlide <= 7) ? 'inline-flex' : 'none';
  }
}

// ================= SLIDE 2: MENU GRID =================
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

    box.addEventListener('click', () => goToSlide(item.slideIdx));
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToSlide(item.slideIdx);
      }
    });

    grid.appendChild(box);
  });

  const progressLabel = $('menu-progress-label');
  if (progressLabel) {
    progressLabel.innerText = `${visitedComponents.size} / 6 Komponen Dipelajari`;
  }
}

// ================= SLIDE 3 - 8: MATERI DETAIL =================
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

// ================= SLIDE 10: SIMULASI DRAG & DROP & TOUCH =================
let touchDraggedItem = null;
let touchGhostEl = null;

function handleItemClick(itemEl) {
  const sourceDepot = $('dnd-source');
  const targetSlots = document.querySelectorAll('.assembly-slot');
  if (!sourceDepot) return;

  const parentSlot = itemEl.closest('.assembly-slot');

  if (parentSlot) {
    // Sedang berada di slot urutan -> kembalikan ke depot awal
    const placeholder = parentSlot.querySelector('.slot-placeholder');
    if (placeholder) placeholder.style.display = 'block';
    parentSlot.style.borderColor = '';
    parentSlot.style.background = '';
    sourceDepot.appendChild(itemEl);
    announce(`Kartu ${itemEl.innerText} dikembalikan ke depot awal.`);
  } else {
    // Sedang berada di depot sumber -> pindahkan ke slot pertama yang kosong
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
      targetSlot.style.background = '';
      targetSlot.appendChild(itemEl);
      announce(`Kartu ${itemEl.innerText} ditempatkan pada slot ${targetSlot.dataset.expected}.`);
    }
  }
}

function initDragAndDrop() {
  const sourceDepot = $('dnd-source');
  const targetSlots = $('dnd-targets');
  const feedbackBox = $('dnd-feedback');

  if (!sourceDepot || !targetSlots) return;

  sourceDepot.innerHTML = '';
  targetSlots.innerHTML = '';
  if (feedbackBox) {
    feedbackBox.className = 'dnd-msg-box';
    feedbackBox.innerHTML = '';
  }

  // Pengacakan Fisher-Yates bebas bias
  const randomized = fisherYatesShuffle(dndSteps);
  randomized.forEach(step => {
    const item = document.createElement('div');
    item.className = 'drag-item';
    item.draggable = true;
    item.id = step.id;
    item.dataset.order = step.order;
    item.innerText = step.label;
    item.title = "Drag ke slot, geser dengan jari, atau tap/klik untuk memindahkan";
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');

    // Drag API Desktop
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
    });

    // Click / Enter Fallback
    item.addEventListener('click', (e) => handleItemClick(e.currentTarget));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleItemClick(e.currentTarget);
      }
    });

    // Touch Event Handling (Mobile / Tablet)
    bindTouchDnD(item);

    sourceDepot.appendChild(item);
  });

  dndSteps.forEach(step => {
    const slot = document.createElement('div');
    slot.className = 'assembly-slot';
    slot.dataset.expected = step.order;
    slot.addEventListener('dragover', allowDrop);
    slot.addEventListener('dragleave', (e) => e.currentTarget.classList.remove('hovered'));
    slot.addEventListener('drop', (e) => dropToTargetSlot(e, slot));

    slot.innerHTML = `
      <div class="slot-index">${step.order}</div>
      <div class="slot-placeholder">${step.hint}</div>
    `;
    targetSlots.appendChild(slot);
  });

  dndPassed = false;
  dndAttempted = false;
  saveState();
}

function bindTouchDnD(itemEl) {
  itemEl.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchDraggedItem = itemEl;

    const touch = e.touches[0];
    touchGhostEl = itemEl.cloneNode(true);
    touchGhostEl.classList.add('drag-ghost');
    touchGhostEl.style.left = `${touch.clientX}px`;
    touchGhostEl.style.top = `${touch.clientY}px`;
    document.body.appendChild(touchGhostEl);
    document.body.classList.add('touch-dragging');
  }, { passive: true });

  itemEl.addEventListener('touchmove', (e) => {
    if (!touchGhostEl || !touchDraggedItem) return;
    const touch = e.touches[0];
    touchGhostEl.style.left = `${touch.clientX}px`;
    touchGhostEl.style.top = `${touch.clientY}px`;

    // Visual hover highlight on potential slot
    touchGhostEl.style.display = 'none';
    const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    touchGhostEl.style.display = '';

    document.querySelectorAll('.assembly-slot').forEach(s => s.classList.remove('hovered'));
    if (elemBelow) {
      const slot = elemBelow.closest('.assembly-slot');
      if (slot) slot.classList.add('hovered');
    }
  }, { passive: true });

  itemEl.addEventListener('touchend', (e) => {
    if (!touchDraggedItem) return;
    const touch = e.changedTouches[0];

    let targetElement = null;
    if (touchGhostEl) {
      touchGhostEl.style.display = 'none';
      targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
      touchGhostEl.remove();
      touchGhostEl = null;
    }
    document.body.classList.remove('touch-dragging');
    document.querySelectorAll('.assembly-slot').forEach(s => s.classList.remove('hovered'));

    if (targetElement) {
      const targetSlot = targetElement.closest('.assembly-slot');
      const targetSource = targetElement.closest('#dnd-source');

      if (targetSlot) {
        moveItemToSlot(touchDraggedItem, targetSlot);
      } else if (targetSource) {
        moveItemToSource(touchDraggedItem);
      }
    }
    touchDraggedItem = null;
  });
}

function allowDrop(e) {
  e.preventDefault();
  if (e.currentTarget.classList.contains('assembly-slot')) {
    e.currentTarget.classList.add('hovered');
  }
}

function moveItemToSlot(dragged, slot) {
  slot.classList.remove('hovered');
  slot.style.borderColor = '';
  slot.style.background = '';

  const currentOccupant = slot.querySelector('.drag-item');
  if (currentOccupant && currentOccupant !== dragged) {
    const source = $('dnd-source');
    if (source) source.appendChild(currentOccupant);
  }

  // Pulihkan placeholder pada slot lama jika sebelumnya berada di slot
  const prevParent = dragged.parentElement;
  if (prevParent && prevParent.classList.contains('assembly-slot') && prevParent !== slot) {
    const prevPlaceholder = prevParent.querySelector('.slot-placeholder');
    if (prevPlaceholder) prevPlaceholder.style.display = 'block';
    prevParent.style.borderColor = '';
    prevParent.style.background = '';
  }

  const placeholder = slot.querySelector('.slot-placeholder');
  if (placeholder) placeholder.style.display = 'none';
  slot.appendChild(dragged);
}

function moveItemToSource(dragged) {
  const prevParent = dragged.parentElement;
  if (prevParent && prevParent.classList.contains('assembly-slot')) {
    const prevPlaceholder = prevParent.querySelector('.slot-placeholder');
    if (prevPlaceholder) prevPlaceholder.style.display = 'block';
    prevParent.style.borderColor = '';
    prevParent.style.background = '';
  }
  const source = $('dnd-source');
  if (source) source.appendChild(dragged);
}

function dropToTargetSlot(e, slot) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const dragged = $(id);
  if (!dragged) return;
  moveItemToSlot(dragged, slot);
}

function dropToSource(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const dragged = $(id);
  if (!dragged) return;
  moveItemToSource(dragged);
}

function checkDndOrder() {
  dndAttempted = true;
  const slots = document.querySelectorAll('.assembly-slot');
  const feedback = $('dnd-feedback');
  let placed = 0;
  let correct = 0;

  slots.forEach(slot => {
    const expected = parseInt(slot.dataset.expected, 10);
    const card = slot.querySelector('.drag-item');
    if (card) {
      placed++;
      if (parseInt(card.dataset.order, 10) === expected) {
        correct++;
        slot.style.borderColor = '#136cfc';
        slot.style.background = '#e8f4fc';
      } else {
        slot.style.borderColor = '#ef4444';
        slot.style.background = '#fee2e2';
      }
    } else {
      slot.style.borderColor = '#ef4444';
    }
  });

  if (!feedback) return;

  if (placed < 5) {
    feedback.className = 'dnd-msg-box visible error';
    feedback.innerHTML = `[PERINGATAN]: Masih ada slot kosong (${placed}/5). Masukkan seluruh 5 komponen ke dalam slot sebelum melakukan verifikasi.`;
    announce(`Peringatan: Masih ada slot kosong, baru ${placed} dari 5 slot terisi.`);
    saveState();
    return;
  }

  if (correct === 5) {
    dndPassed = true;
    feedback.className = 'dnd-msg-box visible success';
    feedback.innerHTML = `[VERIFIKASI_LOLOS]: 5/5 tahapan perakitan tersusun secara benar dan memenuhi kaidah keselamatan teknis. Silakan lanjutkan ke Tantangan Blok Fungsi.`;
    announce("Verifikasi lolos! Seluruh 5 tahapan perakitan benar.");
  } else {
    dndPassed = false;
    feedback.className = 'dnd-msg-box visible error';
    feedback.innerHTML = `[KESALAHAN_URUTAN]: Akurasi ${correct}/5 benar. Kunci urutan standar teknis:<br>1. Motherboard di meja non-konduktif &rarr; 2. Pasang CPU & Cooler &rarr; 3. Pasang RAM &rarr; 4. Pasang PSU & Baut ke Casing &rarr; 5. Pasang SSD, GPU, & Kabel Daya.`;
    announce(`Kesalahan urutan: Akurasi ${correct} dari 5 benar.`);
  }

  saveState();
}

// ================= SLIDE 11 - 13: LATIHAN BLOK FUNGSI =================
function renderQuizSlides() {
  quizData.forEach((q, qIdx) => {
    const targetEl = $(`slide-${q.slideIdx}`);
    if (!targetEl) return;

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

    // Pulihkan status quiz jika ada dalam saved state
    if (quizAnswered[qIdx] !== null) {
      applyQuizAnswerVisual(qIdx, quizAnswered[qIdx], false);
    }
  });
}

function checkQuizAnswer(qIdx, selectedKey, btnEl) {
  const q = quizData[qIdx];
  const grid = $(`quiz-options-${qIdx}`);
  const msgBox = $(`quiz-msg-${qIdx}`);

  if (grid) grid.classList.add('quiz-locked');

  const allBtns = document.querySelectorAll(`#quiz-options-${qIdx} .option-tile`);
  allBtns.forEach(b => {
    b.classList.remove('selected-ok', 'selected-err');
    b.setAttribute('aria-checked', 'false');
  });

  quizAnswered[qIdx] = selectedKey;
  btnEl.setAttribute('aria-checked', 'true');

  if (selectedKey === q.correctKey) {
    quizScores[qIdx] = true;
    btnEl.classList.add('selected-ok');
    if (msgBox) {
      msgBox.className = 'dnd-msg-box visible success';
      msgBox.innerHTML = `[JAWABAN_TEPAT]: Komponen <em>${q.correctName}</em> adalah blok fungsi yang tepat.`;
    }
    announce(`Jawaban tepat! Komponen ${q.correctName} adalah blok fungsi yang sesuai.`);
  } else {
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

function applyQuizAnswerVisual(qIdx, selectedKey, shouldAnnounce = false) {
  const q = quizData[qIdx];
  const grid = $(`quiz-options-${qIdx}`);
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

function resetQuizQuestion(qIdx) {
  quizScores[qIdx] = false;
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

function showQuizSolution(qIdx) {
  const q = quizData[qIdx];
  const grid = $(`quiz-options-${qIdx}`);
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

// ================= SLIDE 14: REKAPITULASI SKOR AKHIR & COUNT-UP =================
function animateScoreCount(el, targetScore, suffix = " / 100") {
  if (!el) return;
  let currentVal = 0;
  const duration = 650;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quad
    const ease = 1 - (1 - progress) * (1 - progress);
    currentVal = Math.round(ease * targetScore);
    el.innerText = `${currentVal}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.innerText = `${targetScore}${suffix}`;
      el.classList.add('score-animate');
    }
  }
  requestAnimationFrame(step);
}

function updateFinalRecap() {
  const visitedCount = visitedComponents.size;
  const recapMateriEl = $('recap-materi');
  if (recapMateriEl) recapMateriEl.innerText = `${visitedCount} / 6`;

  const dndEl = $('recap-dnd');
  if (dndEl) {
    if (dndPassed) {
      dndEl.innerText = "LOLOS (5/5)";
      dndEl.style.color = "var(--blue)";
    } else if (dndAttempted) {
      dndEl.innerText = "REVISI";
      dndEl.style.color = "var(--dark-blue)";
    } else {
      dndEl.innerText = "PENDING";
      dndEl.style.color = "var(--dark-blue)";
    }
  }

  const quizCorrectCount = quizScores.filter(Boolean).length;
  const recapQuizEl = $('recap-quiz');
  if (recapQuizEl) recapQuizEl.innerText = `${quizCorrectCount} / 3`;

  // Kalkulasi Skor Akhir (Skala 100)
  const materiScore = (visitedCount / 6) * 30;
  const dndScore = dndPassed ? 30 : (dndAttempted ? 15 : 0);
  const quizScore = (quizCorrectCount / 3) * 40;
  const totalScore = Math.round(materiScore + dndScore + quizScore);

  const totalScoreEl = $('recap-total-score');
  if (totalScoreEl) {
    animateScoreCount(totalScoreEl, totalScore);
  }

  const predicateEl = $('recap-predicate');
  if (predicateEl) {
    if (totalScore >= 85) {
      predicateEl.innerText = "Status: Sangat Memuaskan [A]";
      predicateEl.style.color = "var(--green-text)";
    } else if (totalScore >= 70) {
      predicateEl.innerText = "Status: Kompeten [B]";
      predicateEl.style.color = "var(--blue)";
    } else {
      predicateEl.innerText = "Status: Butuh Pengulangan [C]";
      predicateEl.style.color = "var(--dark-blue)";
    }
  }

  announce(`Rekapitulasi: Modul ${visitedCount}/6, Simulasi ${dndPassed ? 'Lolos' : 'Pending'}, Tantangan ${quizCorrectCount}/3, Total Skor ${totalScore} dari 100.`);
}

function restartAll() {
  visitedComponents.clear();
  dndPassed = false;
  dndAttempted = false;
  for (let i = 0; i < quizScores.length; i++) {
    quizScores[i] = false;
    quizAnswered[i] = null;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {}

  renderComponentMenu();
  initDragAndDrop();
  renderQuizSlides();
  goToSlide(0);
  announce("Seluruh sesi dan data evaluasi berhasil direset ke awal.");
}

// ================= NAVIGASI KEYBOARD (DEFENSIVE) =================
function initKeyboardNavigation() {
  window.addEventListener('keydown', (e) => {
    // Abaikan jika fokus ada di form input, tombol, atau modal sedang terbuka
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toUpperCase() : '';
    const isInteractive = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(tag) || (e.target && e.target.isContentEditable);
    const modal = $('confirm-modal');
    const isModalOpen = modal && modal.classList.contains('open');
    const drawer = $('slide-nav-drawer');
    const isDrawerOpen = drawer && drawer.classList.contains('open');

    // Handle Escape key globally for drawer and modal
    if (e.key === 'Escape') {
      if (isModalOpen) {
        hideConfirmResetModal();
        return;
      }
      if (isDrawerOpen) {
        closeSlideNav();
        return;
      }
    }

    // Jika sedang di dalam modal, biarkan keyboard fokus berjalan di modal
    if (isModalOpen) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      if (isInteractive && tag === 'BUTTON') {
        // jika sedang fokus di tombol selain navigasi, tetap biarkan tombolnya
      }
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
      e.preventDefault();
      toggleFullscreen();
    }
  });
}
