import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Rocket,
  Clock,
  BookOpen,
  ArrowRight,
  Download,
  Maximize2,
  X,
  FileText,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import {
  BOOK_PDF_URL,
  BOOK_OVERVIEW,
  PLOT_STAGES,
  CHARACTERS,
  GALAXY_LOCATIONS,
  SCIENCE_CONCEPTS,
} from '../data/bookData';

const galaxyKeyArtUrl = '/assets/aistudio/image_b3d49bf5.png';

interface BookSectionProps {
  onStartQuiz: () => void;
  onGoToAuthor: () => void;
}

export const BookSection: React.FC<BookSectionProps> = ({
  onStartQuiz,
  onGoToAuthor,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [heroMediaMode, setHeroMediaMode] = useState<'keyart' | 'schematic'>('keyart');
  const [keyArtError, setKeyArtError] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('yer');
  const [selectedConceptId, setSelectedConceptId] = useState<string>('gravity-assist');
  const [shipSpeedPercent, setShipSpeedPercent] = useState<number>(92);
  const [copiedPdfLink, setCopiedPdfLink] = useState<boolean>(false);

  const handleCopyPdfLink = async () => {
    try {
      await navigator.clipboard.writeText(BOOK_PDF_URL);
      setCopiedPdfLink(true);
      window.setTimeout(() => setCopiedPdfLink(false), 2000);
    } catch {
      setCopiedPdfLink(false);
    }
  };

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      rafId = null;
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const docTop = window.scrollY + rect.top;
      const scrollableDistance = docTop + rect.height - window.innerHeight;

      if (scrollableDistance <= 0) {
        setScrollProgress(1);
        return;
      }

      const nextProgress = Math.min(1, Math.max(0, window.scrollY / scrollableDistance));
      setScrollProgress(nextProgress);
    };

    const scheduleUpdate = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(scheduleUpdate);
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (resizeObserver) resizeObserver.disconnect();
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const activeNode =
    GALAXY_LOCATIONS.find((loc) => loc.id === selectedNodeId) ?? GALAXY_LOCATIONS[0];
  const activeConcept =
    SCIENCE_CONCEPTS.find((c) => c.id === selectedConceptId) ?? SCIENCE_CONCEPTS[0];

  // Special relativity Lorentz factor: gamma = 1 / sqrt(1 - (v/c)^2)
  const beta = shipSpeedPercent / 100;
  const lorentzFactor = 1 / Math.sqrt(1 - beta * beta);
  const earthDaysForOneShipDay = lorentzFactor;

  return (
    <div ref={containerRef} className="space-y-20">
      {/* Subtle Scroll Reading Progress Bar at Top of 1-qism tahlili */}
      <div
        role="progressbar"
        aria-label="1-qism tahlilini oʻqish jarayoni"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress * 100)}
        className="fixed top-16 left-0 right-0 z-30 h-[3px] bg-slate-900/70 pointer-events-none"
      >
        <div
          style={{ transform: `scaleX(${scrollProgress})` }}
          className="h-full w-full origin-left bg-gradient-to-r from-sky-500 to-cyan-300 transition-transform duration-100 ease-out motion-reduce:transition-none"
        />
      </div>

      {/* Hero Section */}
      <section className="pt-8 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span>{BOOK_OVERVIEW.genre}</span>
                <span aria-hidden="true">·</span>
                <span>{BOOK_OVERVIEW.partTitle}</span>
                <span aria-hidden="true">·</span>
                <span>Muallif: {BOOK_OVERVIEW.author}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-50 leading-[1.1]">
                Galaktikada bir kun: 1-qism oʻquv ensiklopediyasi
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {BOOK_OVERVIEW.leadSummary}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={BOOK_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                >
                  <FileText className="w-4 h-4" />
                  <span>Kitob PDF si</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={onStartQuiz}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-100 bg-[#131C2E] hover:bg-slate-800 border border-sky-400/30 rounded-lg transition-all duration-150 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Test sinovi (20–50)</span>
                  <ArrowRight className="w-4 h-4 text-sky-400" />
                </button>
                <button
                  type="button"
                  onClick={onGoToAuthor}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-300 bg-[#111827] hover:bg-slate-800 border border-white/[0.08] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <span>Muallif haqida</span>
                </button>
              </div>
              <p className="text-xs text-slate-400">
                {BOOK_OVERVIEW.internationalReach}
              </p>
            </div>
          </div>

          {/* Right Visual Key Art & Schematic Showcase Card */}
          <div className="lg:col-span-6 bg-[#111827] border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-1 p-1 bg-[#090D16] border border-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => setHeroMediaMode('keyart')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    heroMediaMode === 'keyart'
                      ? 'bg-sky-400 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Kinematik sanʼat asari
                </button>
                <button
                  type="button"
                  onClick={() => setHeroMediaMode('schematic')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    heroMediaMode === 'schematic'
                      ? 'bg-sky-400 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Parvoz chizmasi
                </button>
              </div>

              {heroMediaMode === 'keyart' && !keyArtError && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>Kattalashtirish</span>
                  </button>
                  <a
                    href={galaxyKeyArtUrl}
                    download="galaktikada_bir_kun_1_qism_keyart.jpg"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-md transition-colors whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-400" />
                    <span>Yuklab olish</span>
                  </a>
                </div>
              )}
            </div>

            {heroMediaMode === 'keyart' && !keyArtError ? (
              <div className="relative w-full rounded-lg bg-[#090D16] border border-slate-800/90 overflow-hidden group">
                <img
                  src={galaxyKeyArtUrl}
                  alt="Galaktikada bir kun: 1-qism — futuristik ekzokostyumdagi tadqiqotchi oʻzga sayyora qoyasida binafsha tumanlik va ikki sayyoraga qaramoqda"
                  referrerPolicy="no-referrer"
                  onError={() => setKeyArtError(true)}
                  onClick={() => setIsLightboxOpen(true)}
                  className="w-full h-auto object-contain cursor-zoom-in transition-transform duration-200 group-hover:scale-[1.015]"
                />
              </div>
            ) : (
              <div className="relative aspect-video w-full rounded-lg bg-[#090D16] border border-slate-800/90 overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 400 225"
                  className="w-full h-full"
                  role="img"
                  aria-label="Koʻkkezar fazo kemasining gravitatsion manyovr chizmasi"
                >
                  <defs>
                    <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <g stroke="#1E293B" strokeWidth="0.75">
                    <line x1="0" y1="56" x2="400" y2="56" />
                    <line x1="0" y1="112" x2="400" y2="112" />
                    <line x1="0" y1="168" x2="400" y2="168" />
                    <line x1="100" y1="0" x2="100" y2="225" />
                    <line x1="200" y1="0" x2="200" y2="225" />
                    <line x1="300" y1="0" x2="300" y2="225" />
                  </g>

                  <circle cx="215" cy="112" r="72" fill="none" stroke="#1E293B" strokeDasharray="4 4" />
                  <circle cx="215" cy="112" r="42" fill="url(#starGlow)" />
                  <circle cx="215" cy="112" r="15" fill="#0EA5E9" />

                  <path
                    d="M 36 188 Q 155 188 182 135 T 358 38"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2.2"
                  />
                  <circle cx="36" cy="188" r="5" fill="#F8FAFC" />
                  <circle cx="182" cy="135" r="4.5" fill="#F59E0B" />
                  <circle cx="358" cy="38" r="5.5" fill="#10B981" />

                  <text x="26" y="208" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono, monospace">
                    YER
                  </text>
                  <text x="195" y="149" fill="#CBD5E1" fontSize="10" fontFamily="JetBrains Mono, monospace">
                    AL-TOYIR (17 y.y.)
                  </text>
                  <text x="276" y="28" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono, monospace">
                    XARITA (4 BOʻLAK)
                  </text>
                </svg>
              </div>
            )}

            <div className="space-y-1 text-sm">
              <p className="font-semibold text-slate-100">
                {heroMediaMode === 'keyart'
                  ? '„Galaktikada bir kun: 1-qism“ — Kinematik ilmiy-fantastik illyustratsiya'
                  : 'Gravitatsion manyovr va Koinot xaritasi sarguzashti'}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {heroMediaMode === 'keyart'
                  ? 'Futuristik ekzokostyumdagi fazo tadqiqotchisi biolyuminessent oʻsimliklar bilan qoplangan qoya chetida binafsha tumanlik va egizak sayyoralarni kuzatmoqda.'
                  : 'Ahmadning 12 yoshida yaratgan chizmasi Salmir sayyorasini qutqarish va 4 qismga boʻlingan Galaktika xaritasini topish kalitiga aylanadi.'}
              </p>
            </div>
          </div>
        </div>

        {/* Fullscreen Lightbox Modal (only triggered on user click) */}
        {isLightboxOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Galaktikada bir kun: 1-qism kinematik tasviri"
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 p-4 sm:p-8 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full space-y-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-100">
                  Galaktikada bir kun: 1-qism (One Day in the Galaxy: Part 1)
                </p>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Yopish</span>
                </button>
              </div>
              <img
                src={galaxyKeyArtUrl}
                alt="Galaktikada bir kun: 1-qism kinematik sanʼat asari"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl border border-slate-800"
              />
            </div>
          </div>
        )}

        {/* Full-Width 4-Column Metric Row Below Hero Split */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/[0.08]">
          <div className="bg-[#111827] border border-white/[0.08] rounded-xl p-5">
            <p className="text-xs text-slate-400">Bosh qahramon yoshi</p>
            <p className="mt-1.5 text-2xl sm:text-3xl font-mono font-semibold tabular-nums text-slate-50">
              12 <span className="text-xs font-sans font-normal text-slate-400">yosh (Ahmad)</span>
            </p>
          </div>
          <div className="bg-[#111827] border border-white/[0.08] rounded-xl p-5">
            <p className="text-xs text-slate-400">Al-Toyir yulduzigacha masofa</p>
            <p className="mt-1.5 text-2xl sm:text-3xl font-mono font-semibold tabular-nums text-slate-50">
              17 <span className="text-xs font-sans font-normal text-slate-400">yorugʻlik yili</span>
            </p>
          </div>
          <div className="bg-[#111827] border border-white/[0.08] rounded-xl p-5">
            <p className="text-xs text-slate-400">Yashirilgan Galaktika xaritasi</p>
            <p className="mt-1.5 text-2xl sm:text-3xl font-mono font-semibold tabular-nums text-slate-50">
              4 <span className="text-xs font-sans font-normal text-slate-400">boʻlak</span>
            </p>
          </div>
          <div className="bg-[#111827] border border-white/[0.08] rounded-xl p-5">
            <p className="text-xs text-slate-400">Trilogiya koʻlami</p>
            <p className="mt-1.5 text-2xl sm:text-3xl font-mono font-semibold tabular-nums text-slate-50">
              3 <span className="text-xs font-sans font-normal text-slate-400">kitob (Amazon nashri)</span>
            </p>
          </div>
        </div>

        {/* Modern Digital Book PDF Access Banner */}
        <div className="mt-6 bg-gradient-to-r from-[#111827] via-[#131E33] to-[#111827] border border-sky-400/25 rounded-xl p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 max-w-2xl">
            <img
              src={galaxyKeyArtUrl}
              alt="Galaktikada bir kun: 1-qism muqova tasviri"
              referrerPolicy="no-referrer"
              className="w-full sm:w-44 h-auto rounded-lg border border-white/[0.1] object-contain shrink-0 bg-[#080C14]"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-sky-400">
                <span>Raqamli mutolaa</span>
                <span aria-hidden="true">·</span>
                <span>Elektron nashr (Scribd hujjati)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-50">
                „Galaktikada bir kun“ — Kitob PDF sini onlayn oʻqish
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Saʼdullo Quronovning mashhur ilmiy-fantastik qissasi matni bilan toʻliq tanishish uchun quyidagi tugma orqali kitobning elektron PDF sahifasiga oʻting.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={BOOK_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>Kitob PDF si</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleCopyPdfLink}
              className="inline-flex items-center gap-2 px-4 py-3 text-xs font-medium text-slate-200 bg-[#080C14] hover:bg-slate-800 border border-white/[0.1] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              {copiedPdfLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Havola nusxalandi</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-sky-400" />
                  <span>Havolani nusxalash</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Two-Zone Sandbox: Galaxy Map & Time Dilation Simulator */}
      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs text-sky-400 font-medium">Interaktiv koinot laboratoriyasi</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
            1-qism yulduzlar xaritasi va vaqt nisbiyligi simulyatori
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Xaritadagi sayyora va yulduzlarni bosib Ahmad hamda Margolning sayohat yoʻnalishini oʻrganing, pastdagi tezlik rostlagichi orqali esa asar nomiga asos boʻlgan nisbiylik effektini tekshirib koʻring.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Interactive Stage (7 cols) */}
          <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Compass className="w-4 h-4 text-sky-400" />
                <span>Manzilni tanlang (bosish orqali):</span>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-400">
                FAOL MANZIL: {activeNode.name.toUpperCase()}
              </span>
            </div>

            {/* Interactive SVG Star Map */}
            <div className="relative w-full aspect-[16/9] bg-[#090D16] border border-slate-800 rounded-lg overflow-hidden">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Connecting route polyline */}
                <polyline
                  points={GALAXY_LOCATIONS.map(
                    (l) => `${l.coordinates.x},${l.coordinates.y}`
                  ).join(' ')}
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="0.6"
                  strokeDasharray="1.5 1.5"
                />
              </svg>

              {GALAXY_LOCATIONS.map((loc, idx) => {
                const isSelected = loc.id === selectedNodeId;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedNodeId(loc.id)}
                    style={{
                      left: `${loc.coordinates.x}%`,
                      top: `${loc.coordinates.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none`}
                    aria-label={loc.name}
                  >
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-full border text-xs font-mono font-semibold tabular-nums transition-transform duration-150 ${
                        isSelected
                          ? 'bg-sky-400 text-slate-950 border-sky-200 scale-110'
                          : 'bg-[#111827] text-slate-200 border-slate-600 hover:border-sky-400 hover:scale-105'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`mt-1 block px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                        isSelected
                          ? 'bg-sky-400/15 text-sky-300'
                          : 'bg-[#090D16]/85 text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {loc.name.split(' (')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Relativity Time-Dilation Interactive Control */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="speed-slider"
                  className="flex items-center gap-2 text-sm font-medium text-slate-200"
                >
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span>„Koʻkkezar“ tezligi (yorugʻlik tezligiga nisbatan):</span>
                </label>
                <span className="font-mono text-sm font-semibold tabular-nums text-sky-400">
                  {shipSpeedPercent}% c ({Math.round(shipSpeedPercent * 3000).toLocaleString('uz-UZ')} km/s)
                </span>
              </div>

              <input
                id="speed-slider"
                type="range"
                min={10}
                max={99}
                step={1}
                value={shipSpeedPercent}
                onChange={(e) => setShipSpeedPercent(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 bg-[#090D16] border border-slate-800/80 rounded-lg px-4 py-3">
                <span>
                  Kemada oʻtgan vaqt: <strong className="font-mono tabular-nums text-slate-100">1.0 kun</strong>
                </span>
                <span aria-hidden="true" className="text-slate-600">→</span>
                <span>
                  Yerda oʻtadigan vaqt:{' '}
                  <strong className="font-mono tabular-nums text-sky-400">
                    {earthDaysForOneShipDay.toFixed(2)} kun
                  </strong>{' '}
                  ({(earthDaysForOneShipDay * 24).toFixed(1)} soat)
                </span>
              </div>
            </div>
          </div>

          {/* Right Inspection & Concept Deck (5 cols) */}
          <div className="lg:col-span-5 bg-[#111827] border border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Tanlangan manzil maʼlumoti</span>
                <span className="font-mono tabular-nums text-sky-400">{activeNode.distanceLabel}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-50">{activeNode.name}</h3>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Asardagi oʻrni:</p>
                  <p className="text-slate-200 leading-relaxed">{activeNode.roleInBook}</p>
                </div>
                <div className="pt-3 border-t border-slate-800/80">
                  <p className="text-xs text-slate-400 mb-1">Real astrofizik fakt:</p>
                  <p className="text-slate-300 leading-relaxed">{activeNode.scientificNote}</p>
                </div>
              </div>
            </div>

            {/* Scientific Theories Selector */}
            <div className="pt-5 border-t border-slate-800 space-y-3">
              <p className="text-xs font-medium text-slate-400">
                Asarda qoʻllangan real ilmiy nazariyalar:
              </p>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#090D16] border border-slate-800 rounded-lg">
                {SCIENCE_CONCEPTS.map((concept) => (
                  <button
                    key={concept.id}
                    type="button"
                    onClick={() => setSelectedConceptId(concept.id)}
                    className={`px-2.5 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer truncate ${
                      selectedConceptId === concept.id
                        ? 'bg-sky-400 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {concept.title.split(' (')[0]}
                  </button>
                ))}
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-100">
                    {activeConcept.title}
                  </span>
                  <span className="text-xs font-mono text-sky-400 shrink-0">
                    {activeConcept.formulaOrPrinciple}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeConcept.simpleExplanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plot Stages (1-qism voqealar rivoji) */}
      <section className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs text-sky-400 font-medium">Syujet xronologiyasi</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
            „Galaktikada bir kun“ (1-qism) voqealar rivoji
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Yerdagi ixtirochilar tanlovidan tortib 4 boʻlakli Galaktika xaritasini izlashgacha boʻlgan asosiy badiiy halqalar.
          </p>
        </div>

        <div className="divide-y divide-slate-800 border-y border-slate-800">
          {PLOT_STAGES.map((stage) => (
            <article
              key={stage.step}
              className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
            >
              <div className="md:col-span-4 space-y-1">
                <span className="font-mono text-sm font-semibold tabular-nums text-sky-400">
                  {stage.step}-bosqich
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                  {stage.title}
                </h3>
                <p className="text-xs text-slate-400">{stage.subtitle}</p>
              </div>

              <div className="md:col-span-8 space-y-3">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {stage.description}
                </p>
                <p className="text-xs text-sky-300/90 flex items-center gap-2">
                  <Rocket className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                  <span>Muhim nuqta: {stage.keyFact}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Main Characters */}
      <section className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs text-sky-400 font-medium">Obrazlar tizimi</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
            1-kitobning asosiy qahramonlari
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CHARACTERS.map((char) => (
            <div
              key={char.name}
              className="bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span>{char.origin}</span>
                  <span aria-hidden="true">·</span>
                  <span>{char.role}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-50">{char.name}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {char.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-sky-300">
                {char.traits.map((trait, index) => (
                  <React.Fragment key={trait}>
                    {index > 0 && (
                      <span aria-hidden="true" className="text-slate-600">
                        ·
                      </span>
                    )}
                    <span>{trait}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
