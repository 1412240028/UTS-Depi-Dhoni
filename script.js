/**
 * ====================================================================
 * ANATOMI KOMPONEN & SIMULASI PERAKITAN PC (14 SLIDE)
 * Engine: Clean Technical White Workspace (High Contrast & Legibility)
 * Palette:
 *   - Base & Surface:   #FFFFFF & #E8F4FC
 *   - Solid Text:       #152641 (Bebas Abu-abu)
 *   - Primary Accent:   #136CFC (Blue)
 *   - Functional Accent:#C3F84A (Lime Green)
 * Tim Penyusun: Dhoni & Devi (TIF 2024 - Universitas PGRI Ronggolawe Tuban)
 * ====================================================================
 */

const TOTAL_SLIDES = 14;
let currentSlide = 0;

// Progres & Evaluasi
const visitedComponents = new Set();
let dndPassed = false;
let dndAttempted = false;
const quizScores = [false, false, false];

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
      <svg class="schematic-svg" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg class="schematic-svg" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg class="schematic-svg" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg class="schematic-svg" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg class="schematic-svg" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg class="schematic-svg" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  { id: "step-1", label: "01 // Siapkan Motherboard di Meja Kerja Non-Konduktif", order: 1, hint: "Slot 1: Fondasi awal sirkuit diletakkan di luar casing" },
  { id: "step-2", label: "02 // Pasang CPU, Oleskan Pasta Termal, & Pasang Cooler", order: 2, hint: "Slot 2: Unit pemroses inti dan sistem pendingin dipasang" },
  { id: "step-3", label: "03 // Tancapkan Keping RAM ke Slot DIMM Hingga Mengunci", order: 3, hint: "Slot 3: Memori kerja dipasang ke slot dual-channel" },
  { id: "step-4", label: "04 // Pasang PSU ke Casing & Baut Motherboard ke Stand-off", order: 4, hint: "Slot 4: Rangkaian inti dipasang ke dalam rangka sasis" },
  { id: "step-5", label: "05 // Pasang SSD NVMe, GPU ke PCIe, & Hubungkan Kabel Daya", order: 5, hint: "Slot 5: Storage, kartu grafis, dan daya akhir dihubungkan" }
];

// ================= DATA 3 LATIHAN BLOK FUNGSI (SLIDE 11 - 13) =================
const quizData = [
  {
    slideIdx: 10,
    number: "01",
    title: "KASUS 01 // MULTITASKING & BEBAN KERJA MEMORI",
    question: "Sebuah komputer operasional laboratorium mengalami pelambatan parah (*stuttering*) saat menjalankan browser dengan puluhan tab riset, aplikasi desain grafis, dan IDE pemrograman secara simultan. Blok manakah yang bertindak sebagai ruang buffer sementara dan perlu dievaluasi kapasitasnya?",
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

// ================= INTI INISIALISASI =================
document.addEventListener('DOMContentLoaded', () => {
  renderComponentMenu();
  renderMateriSlides();
  initDragAndDrop();
  renderQuizSlides();
  updateSlideNavigation();
  initKeyboardNavigation();
  initHeaderAutoHide();
});

// ================= KONTROL NAVIGASI SLIDE =================
function changeSlide(direction) {
  goToSlide(currentSlide + direction);
}

function goToSlide(targetIdx) {
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

  // Otomatis sembunyikan header saat berpindah/menggeser slide
  if (!isHeaderPinned) {
    if (isHeaderHidden) {
      // Jika sudah tersembunyi, biarkan tetap tersembunyi agar transisi slide stabil & bebas getaran
    } else {
      // Jika sedang terbuka, sembunyikan otomatis dalam 1 detik agar fokus ke materi slide
      resetAutoHideTimer(1000);
    }
  }
}

function updateSlideNavigation() {
  const slides = document.querySelectorAll('.slide-body');
  slides.forEach((s, idx) => {
    s.classList.toggle('active', idx === currentSlide);
  });

  const badgeTitles = [
    "SLIDE 01 // OVERVIEW",
    "SLIDE 02 // PETA KOMPONEN",
    "SLIDE 03 // MOTHERBOARD",
    "SLIDE 04 // CPU (PROCESSOR)",
    "SLIDE 05 // RAM (MEMORY)",
    "SLIDE 06 // SSD (STORAGE)",
    "SLIDE 07 // GPU (GRAPHICS)",
    "SLIDE 08 // PSU (POWER SUPPLY)",
    "SLIDE 09 // SOP PERAKITAN",
    "SLIDE 10 // SIMULASI DND",
    "SLIDE 11 // TANTANGAN 01",
    "SLIDE 12 // TANTANGAN 02",
    "SLIDE 13 // TANTANGAN 03",
    "SLIDE 14 // REKAPITULASI"
  ];

  const currentBadge = badgeTitles[currentSlide];
  document.getElementById('header-badge').innerText = currentBadge;
  document.getElementById('slide-counter').innerText = `${String(currentSlide + 1).padStart(2, '0')} / 14`;

  // Perbarui indikator ringkas pada Peek Tab atas saat header tersembunyi
  const peekBadge = document.getElementById('peek-badge');
  const peekTitle = document.getElementById('peek-title');
  if (peekBadge) peekBadge.innerText = `SLIDE ${String(currentSlide + 1).padStart(2, '0')}`;
  if (peekTitle) {
    const parts = currentBadge.split(' // ');
    peekTitle.innerText = parts[1] || currentBadge;
  }

  const percent = ((currentSlide + 1) / TOTAL_SLIDES) * 100;
  document.getElementById('progress-fill').style.width = `${percent}%`;

  document.getElementById('btn-prev').disabled = currentSlide === 0;
  document.getElementById('btn-next').disabled = currentSlide === TOTAL_SLIDES - 1;

  const btnMap = document.getElementById('btn-map');
  btnMap.style.display = (currentSlide >= 2 && currentSlide <= 7) ? 'inline-flex' : 'none';
}

// ================= AUTO-HIDE & PEEK HEADER ENGINE =================
let isHeaderHidden = false;
let isHeaderPinned = false;
let autoHideTimer = null;
let readInactivityTimer = null;

function hideHeader() {
  if (isHeaderPinned) return;
  const header = document.getElementById('slide-header');
  const peekTab = document.getElementById('header-peek-tab');
  if (!header) return;

  const h = header.offsetHeight || 62;
  header.style.marginTop = `-${h}px`;
  header.classList.add('auto-hidden');
  isHeaderHidden = true;

  if (peekTab) {
    peekTab.classList.add('visible');
  }
}

function showHeader() {
  const header = document.getElementById('slide-header');
  const peekTab = document.getElementById('header-peek-tab');
  if (!header) return;

  header.style.marginTop = '0px';
  header.classList.remove('auto-hidden');
  isHeaderHidden = false;

  if (peekTab) {
    peekTab.classList.remove('visible');
  }
}

function toggleHeaderFromPeek() {
  if (isHeaderHidden) {
    showHeader();
    if (!isHeaderPinned) resetAutoHideTimer(3500);
  } else {
    hideHeader();
  }
}

function toggleHeaderPin(event) {
  if (event) event.stopPropagation();
  isHeaderPinned = !isHeaderPinned;
  const pinBtn = document.getElementById('header-pin-btn');
  const pinLabel = document.getElementById('pin-label');

  if (isHeaderPinned) {
    if (pinBtn) pinBtn.classList.add('pinned');
    if (pinLabel) pinLabel.innerText = "Terkunci";
    showHeader();
    clearTimeout(autoHideTimer);
    clearTimeout(readInactivityTimer);
  } else {
    if (pinBtn) pinBtn.classList.remove('pinned');
    if (pinLabel) pinLabel.innerText = "Auto-Hide: ON";
    resetAutoHideTimer(2000);
  }
}

function resetAutoHideTimer(delay = 2500) {
  if (isHeaderPinned) return;
  clearTimeout(autoHideTimer);
  autoHideTimer = setTimeout(() => {
    hideHeader();
  }, delay);
}

function initHeaderAutoHide() {
  const header = document.getElementById('slide-header');
  const triggerZone = document.getElementById('header-trigger-zone');
  const peekTab = document.getElementById('header-peek-tab');

  if (header) {
    header.addEventListener('mouseenter', () => {
      clearTimeout(autoHideTimer);
      clearTimeout(readInactivityTimer);
      showHeader();
    });

    header.addEventListener('mouseleave', () => {
      if (!isHeaderPinned) {
        resetAutoHideTimer(1800);
      }
    });
  }

  if (triggerZone) {
    triggerZone.addEventListener('mouseenter', () => {
      showHeader();
      if (!isHeaderPinned) resetAutoHideTimer(3000);
    });
  }

  if (peekTab) {
    peekTab.addEventListener('mouseenter', () => {
      showHeader();
      if (!isHeaderPinned) resetAutoHideTimer(3000);
    });
  }

  // Tampilkan header saat kursor digerakkan ke bagian paling atas layar monitor (Y <= 25px)
  window.addEventListener('mousemove', (e) => {
    if (e.clientY <= 25) {
      if (isHeaderHidden) {
        showHeader();
      }
      if (!isHeaderPinned) resetAutoHideTimer(3000);
    }
  });

  // Saat sedang membaca (kursor di area materi slide dan tidak mendekati header),
  // sembunyikan header secara otomatis setelah 2 detik
  window.addEventListener('mousemove', (e) => {
    if (e.clientY > 70 && !isHeaderPinned && !isHeaderHidden) {
      clearTimeout(readInactivityTimer);
      readInactivityTimer = setTimeout(() => {
        hideHeader();
      }, 2000);
    }
  });

  // Pastikan penyesuaian margin tetap akurat saat jendela browser di-resize
  window.addEventListener('resize', () => {
    if (isHeaderHidden && header) {
      header.style.marginTop = `-${header.offsetHeight}px`;
    }
  });

  // Jalankan auto-hide pertama kali setelah 2.5 detik saat web pertama dibuka
  resetAutoHideTimer(2500);
}

// ================= SLIDE 2: MENU GRID =================
function renderComponentMenu() {
  const grid = document.getElementById('component-menu-grid');
  if (!grid) return;
  grid.innerHTML = '';

  hardwareModules.forEach(item => {
    const isVisited = visitedComponents.has(item.slideIdx);
    const box = document.createElement('div');
    box.className = `comp-box ${isVisited ? 'visited' : ''}`;
    box.onclick = () => goToSlide(item.slideIdx);
    box.innerHTML = `
      <div class="comp-box-top">
        <span class="comp-id">${item.code}</span>
        <span class="comp-status">${isVisited ? '[SELESAI]' : '[BELUM_DIBACA]'}</span>
      </div>
      <h3>${item.name}</h3>
      <p>${item.subtitle}</p>
      <div class="comp-link">${isVisited ? 'Telaah Ulang &rarr;' : 'Buka Skematik &rarr;'}</div>
    `;
    grid.appendChild(box);
  });

  const progressLabel = document.getElementById('menu-progress-label');
  if (progressLabel) {
    progressLabel.innerText = `${visitedComponents.size} / 6 Komponen Dipelajari`;
  }
}

// ================= SLIDE 3 - 8: MATERI DETAIL =================
function renderMateriSlides() {
  hardwareModules.forEach(item => {
    const targetEl = document.getElementById(`slide-${item.slideIdx}`);
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

          <div class="sheet-actions">
            <button class="btn btn-secondary" onclick="goToSlide(1)">&larr; Peta Komponen</button>
            <button class="btn btn-green" onclick="goToSlide(${item.slideIdx + 1})">Modul Berikutnya &rarr;</button>
          </div>
        </div>
      </div>
    `;
  });
}

// ================= SLIDE 10: SIMULASI DRAG & DROP =================
function initDragAndDrop() {
  const sourceDepot = document.getElementById('dnd-source');
  const targetSlots = document.getElementById('dnd-targets');
  const feedbackBox = document.getElementById('dnd-feedback');

  if (!sourceDepot || !targetSlots) return;

  sourceDepot.innerHTML = '';
  targetSlots.innerHTML = '';
  feedbackBox.className = 'dnd-msg-box';
  feedbackBox.innerHTML = '';

  const randomized = [...dndSteps].sort(() => Math.random() - 0.5);
  randomized.forEach(step => {
    const item = document.createElement('div');
    item.className = 'drag-item';
    item.draggable = true;
    item.id = step.id;
    item.dataset.order = step.order;
    item.innerText = step.label;
    item.ondragstart = (e) => e.dataTransfer.setData('text/plain', e.target.id);
    sourceDepot.appendChild(item);
  });

  dndSteps.forEach(step => {
    const slot = document.createElement('div');
    slot.className = 'assembly-slot';
    slot.dataset.expected = step.order;
    slot.ondragover = allowDrop;
    slot.ondragleave = (e) => e.currentTarget.classList.remove('hovered');
    slot.ondrop = (e) => dropToTargetSlot(e, slot);
    slot.innerHTML = `
      <div class="slot-index">${step.order}</div>
      <div class="slot-placeholder">${step.hint}</div>
    `;
    targetSlots.appendChild(slot);
  });
}

function allowDrop(e) {
  e.preventDefault();
  if (e.currentTarget.classList.contains('assembly-slot')) {
    e.currentTarget.classList.add('hovered');
  }
}

function dropToTargetSlot(e, slot) {
  e.preventDefault();
  slot.classList.remove('hovered');
  const id = e.dataTransfer.getData('text/plain');
  const dragged = document.getElementById(id);
  if (!dragged) return;

  const currentOccupant = slot.querySelector('.drag-item');
  if (currentOccupant) {
    document.getElementById('dnd-source').appendChild(currentOccupant);
  }

  const prevParent = dragged.parentElement;
  if (prevParent && prevParent.classList.contains('assembly-slot')) {
    const prevPlaceholder = prevParent.querySelector('.slot-placeholder');
    if (prevPlaceholder) prevPlaceholder.style.display = 'block';
  }

  const placeholder = slot.querySelector('.slot-placeholder');
  if (placeholder) placeholder.style.display = 'none';
  slot.appendChild(dragged);
}

function dropToSource(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const dragged = document.getElementById(id);
  if (!dragged) return;

  const prevParent = dragged.parentElement;
  if (prevParent && prevParent.classList.contains('assembly-slot')) {
    const prevPlaceholder = prevParent.querySelector('.slot-placeholder');
    if (prevPlaceholder) prevPlaceholder.style.display = 'block';
  }
  document.getElementById('dnd-source').appendChild(dragged);
}

function checkDndOrder() {
  dndAttempted = true;
  const slots = document.querySelectorAll('.assembly-slot');
  const feedback = document.getElementById('dnd-feedback');
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

  if (placed < 5) {
    feedback.className = 'dnd-msg-box visible error';
    feedback.innerHTML = `[PERINGATAN]: Masih ada slot kosong (${placed}/5). Masukkan seluruh komponen ke slot sebelum melakukan verifikasi.`;
    return;
  }

  if (correct === 5) {
    dndPassed = true;
    feedback.className = 'dnd-msg-box visible success';
    feedback.innerHTML = `[VERIFIKASI_LOLOS]: 5/5 tahapan perakitan tersusun secara benar dan memenuhi kaidah keselamatan teknis. Lanjutkan ke Tantangan Blok Fungsi.`;
  } else {
    dndPassed = false;
    feedback.className = 'dnd-msg-box visible error';
    feedback.innerHTML = `[KESALAHAN_URUTAN]: Akurasi ${correct}/5 benar. Kunci urutan standar:<br>1. Motherboard di meja &rarr; 2. Pasang CPU & Cooler &rarr; 3. Pasang RAM &rarr; 4. Pasang PSU & Masukkan ke Casing &rarr; 5. Pasang SSD, GPU, & Kabel Daya.`;
  }
}

// ================= SLIDE 11 - 13: LATIHAN BLOK FUNGSI =================
function renderQuizSlides() {
  quizData.forEach((q, qIdx) => {
    const targetEl = document.getElementById(`slide-${q.slideIdx}`);
    if (!targetEl) return;

    const optionsHtml = q.choices.map(c => `
      <button class="option-tile" onclick="checkQuizAnswer(${qIdx}, '${c.key}', this)">
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

        <div class="options-grid" id="quiz-options-${qIdx}">
          ${optionsHtml}
        </div>

        <div class="dnd-msg-box" id="quiz-msg-${qIdx}"></div>

        <div class="challenge-ctrls" style="margin-top: 16px;">
          <button class="btn btn-secondary" onclick="resetQuizQuestion(${qIdx})">Ulangi Soal</button>
          <button class="btn btn-secondary" onclick="showQuizSolution(${qIdx})">Lihat Solusi</button>
          <button class="btn btn-primary" onclick="goToSlide(${q.slideIdx + 1})">Slide Berikutnya &rarr;</button>
        </div>
      </div>
    `;
  });
}

function checkQuizAnswer(qIdx, selectedKey, btnEl) {
  const q = quizData[qIdx];
  const msgBox = document.getElementById(`quiz-msg-${qIdx}`);
  const allBtns = document.querySelectorAll(`#quiz-options-${qIdx} .option-tile`);

  allBtns.forEach(b => b.classList.remove('selected-ok', 'selected-err'));

  if (selectedKey === q.correctKey) {
    quizScores[qIdx] = true;
    btnEl.classList.add('selected-ok');
    msgBox.className = 'dnd-msg-box visible success';
    msgBox.innerHTML = `[JAWABAN_TEPAT]: Komponen <em>${q.correctName}</em> adalah blok fungsi yang sesuai.`;
  } else {
    quizScores[qIdx] = false;
    btnEl.classList.add('selected-err');
    msgBox.className = 'dnd-msg-box visible error';
    msgBox.innerHTML = `[JAWABAN_KELIRU]: Pilihan tersebut bukan blok fungsi yang dimaksud pada kasus ini. Klik tombol <em>Lihat Solusi</em> untuk pembahasan detail.`;
  }
}

function resetQuizQuestion(qIdx) {
  quizScores[qIdx] = false;
  const allBtns = document.querySelectorAll(`#quiz-options-${qIdx} .option-tile`);
  allBtns.forEach(b => b.classList.remove('selected-ok', 'selected-err'));
  const msgBox = document.getElementById(`quiz-msg-${qIdx}`);
  msgBox.className = 'dnd-msg-box';
  msgBox.innerHTML = '';
}

function showQuizSolution(qIdx) {
  const q = quizData[qIdx];
  const msgBox = document.getElementById(`quiz-msg-${qIdx}`);
  const allBtns = document.querySelectorAll(`#quiz-options-${qIdx} .option-tile`);

  allBtns.forEach(b => {
    b.classList.remove('selected-err');
    if (b.innerText.includes(`[${q.correctKey}]`)) {
      b.classList.add('selected-ok');
    }
  });

  msgBox.className = 'dnd-msg-box visible success';
  msgBox.innerHTML = `<strong>KUNCI JAWABAN: [${q.correctKey}] ${q.correctName}</strong><br>${q.solution}`;
}

// ================= SLIDE 14: REKAPITULASI SKOR AKHIR =================
function updateFinalRecap() {
  const visitedCount = visitedComponents.size;
  document.getElementById('recap-materi').innerText = `${visitedCount} / 6`;

  const dndEl = document.getElementById('recap-dnd');
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

  const quizCorrectCount = quizScores.filter(Boolean).length;
  document.getElementById('recap-quiz').innerText = `${quizCorrectCount} / 3`;

  // Kalkulasi Skor Akhir (Skala 100)
  const materiScore = (visitedCount / 6) * 30;
  const dndScore = dndPassed ? 30 : (dndAttempted ? 15 : 0);
  const quizScore = (quizCorrectCount / 3) * 40;
  const totalScore = Math.round(materiScore + dndScore + quizScore);

  document.getElementById('recap-total-score').innerText = `${totalScore} / 100`;

  const predicateEl = document.getElementById('recap-predicate');
  if (totalScore >= 85) {
    predicateEl.innerText = "Status: Sangat Memuaskan [A]";
    predicateEl.style.color = "var(--dark-blue)";
  } else if (totalScore >= 70) {
    predicateEl.innerText = "Status: Kompeten [B]";
    predicateEl.style.color = "var(--blue)";
  } else {
    predicateEl.innerText = "Status: Butuh Pengulangan [C]";
    predicateEl.style.color = "var(--dark-blue)";
  }
}

function restartAll() {
  visitedComponents.clear();
  dndPassed = false;
  dndAttempted = false;
  for (let i = 0; i < quizScores.length; i++) quizScores[i] = false;

  renderComponentMenu();
  initDragAndDrop();
  renderQuizSlides();
  goToSlide(0);
}

// ================= NAVIGASI KEYBOARD =================
function initKeyboardNavigation() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      changeSlide(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      changeSlide(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(TOTAL_SLIDES - 1);
    } else if (e.key === 'h' || e.key === 'H') {
      e.preventDefault();
      toggleHeaderFromPeek();
    }
  });
}
