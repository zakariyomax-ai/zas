import React, { useState, useEffect, useCallback } from 'react';
import { Shuffle, Eye, EyeOff, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { AUTHOR_PORTRAIT_MAIN, AUTHOR_SLIDE_IMAGE } from '../data/authorData';

const GALAXY_KEY_ART_IMAGE = '/assets/aistudio/image_b3d49bf5.png';

type GridSize = 3 | 4 | 5;

interface PuzzleImageOption {
  id: string;
  label: string;
  src: string;
  aspectClass: string;
}

const PUZZLE_IMAGES: PuzzleImageOption[] = [
  {
    id: 'portrait',
    label: 'Saʼdullo Quronov portreti',
    src: AUTHOR_PORTRAIT_MAIN,
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'slide',
    label: 'Muallif haqida taqdimot lavhasi',
    src: AUTHOR_SLIDE_IMAGE,
    aspectClass: 'aspect-[16/9]',
  },
  {
    id: 'keyart',
    label: 'Galaktikada bir kun: 1-qism (Key Art)',
    src: GALAXY_KEY_ART_IMAGE,
    aspectClass: 'aspect-[16/9]',
  },
];

function createShuffledBoard(totalTiles: number): number[] {
  const solved = Array.from({ length: totalTiles }, (_, i) => i);
  const arr = [...solved];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Guarantee the board is not already solved on initial shuffle
  const isIdentical = arr.every((val, idx) => val === idx);
  if (isIdentical && arr.length >= 2) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }
  return arr;
}

export const PuzzleSection: React.FC = () => {
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [selectedImageId, setSelectedImageId] = useState<string>('portrait');
  const [tiles, setTiles] = useState<number[]>(() => createShuffledBoard(9));
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [draggedSlot, setDraggedSlot] = useState<number | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [showReference, setShowReference] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  const activeImage =
    PUZZLE_IMAGES.find((img) => img.id === selectedImageId) ?? PUZZLE_IMAGES[0];
  const totalTiles = gridSize * gridSize;

  const isSolved =
    tiles.length === totalTiles && tiles.every((tileVal, idx) => tileVal === idx);

  const correctPiecesCount = tiles.reduce(
    (acc, tileVal, idx) => (tileVal === idx ? acc + 1 : acc),
    0
  );

  const resetBoard = useCallback((size: GridSize) => {
    setTiles(createShuffledBoard(size * size));
    setSelectedSlot(null);
    setDraggedSlot(null);
    setMoves(0);
    setSeconds(0);
  }, []);

  const handleGridChange = (newSize: GridSize) => {
    setGridSize(newSize);
    resetBoard(newSize);
  };

  const handleImageChange = (imgId: string) => {
    setSelectedImageId(imgId);
    setImageError(false);
    resetBoard(gridSize);
  };

  useEffect(() => {
    if (isSolved) return;
    const interval = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isSolved]);

  const swapSlots = (slotA: number, slotB: number) => {
    if (slotA === slotB || isSolved) return;
    setTiles((prev) => {
      const next = [...prev];
      [next[slotA], next[slotB]] = [next[slotB], next[slotA]];
      return next;
    });
    setMoves((m) => m + 1);
    setSelectedSlot(null);
  };

  const handleTileClick = (slotIdx: number) => {
    if (isSolved) return;
    if (selectedSlot === null) {
      setSelectedSlot(slotIdx);
    } else if (selectedSlot === slotIdx) {
      setSelectedSlot(null);
    } else {
      swapSlots(selectedSlot, slotIdx);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 pt-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>Interaktiv rasm pazzli</span>
            <span aria-hidden="true">·</span>
            <span>Muallif portretini boʻlaklardan yigʻing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
            Saʼdullo Quronov rasm pazzli
          </h2>
          <p className="text-sm text-slate-400">
            Ikki boʻlakni ketma-ket bosib (yoki sichqoncha bilan sudrab) joyini almashtiring va muallifning toʻliq tasvirini hosil qiling.
          </p>
        </div>

        {/* Difficulty & Image Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-[#111827] border border-slate-800 rounded-lg">
            {([3, 4, 5] as GridSize[]).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleGridChange(size)}
                className={`px-3 py-1.5 text-xs font-mono font-semibold tabular-nums rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  gridSize === size
                    ? 'bg-sky-400 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {size}×{size} ({size * size})
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => resetBoard(gridSize)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Aralashtirish</span>
          </button>
        </div>
      </div>

      {/* Workspace Split: Puzzle Board + Reference & Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Puzzle Stage (7 cols) */}
        <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-4">
              <span>
                Toʻgʻri joyda:{' '}
                <strong className="font-mono tabular-nums text-sky-400">
                  {correctPiecesCount} / {totalTiles}
                </strong>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>
                Urinishlar:{' '}
                <strong className="font-mono tabular-nums text-slate-100">
                  {moves}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-mono tabular-nums text-slate-300">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>{formatTime(seconds)}</span>
            </div>
          </div>

          {/* Puzzle Grid Canvas */}
          <div
            className={`w-full ${activeImage.aspectClass} bg-[#090D16] border border-slate-800 rounded-lg p-1.5 grid gap-1 select-none`}
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
          >
            {tiles.map((originalIndex, slotIdx) => {
              const origRow = Math.floor(originalIndex / gridSize);
              const origCol = originalIndex % gridSize;
              const bgPosX =
                gridSize > 1 ? (origCol / (gridSize - 1)) * 100 : 0;
              const bgPosY =
                gridSize > 1 ? (origRow / (gridSize - 1)) * 100 : 0;

              const isSelected = selectedSlot === slotIdx;
              const isInCorrectPlace = originalIndex === slotIdx;

              return (
                <button
                  key={`slot-${slotIdx}`}
                  type="button"
                  draggable={!isSolved}
                  onDragStart={() => setDraggedSlot(slotIdx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggedSlot !== null && draggedSlot !== slotIdx) {
                      swapSlots(draggedSlot, slotIdx);
                    }
                    setDraggedSlot(null);
                  }}
                  onClick={() => handleTileClick(slotIdx)}
                  aria-label={`Pazzl boʻlagi ${slotIdx + 1}`}
                  style={{
                    backgroundImage: `url("${activeImage.src}")`,
                    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                    backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                    backgroundRepeat: 'no-repeat',
                  }}
                  className={`relative w-full h-full rounded overflow-hidden transition-transform duration-150 cursor-pointer focus:outline-none ${
                    isSelected
                      ? 'ring-2 ring-sky-400 scale-[0.97] z-10'
                      : isSolved
                      ? 'ring-0'
                      : isInCorrectPlace
                      ? 'ring-1 ring-emerald-500/50 hover:brightness-110'
                      : 'ring-1 ring-slate-700/70 hover:brightness-110'
                  }`}
                >
                  {!isSolved && (
                    <span
                      className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold tabular-nums ${
                        isInCorrectPlace
                          ? 'bg-emerald-950/85 text-emerald-300'
                          : 'bg-slate-950/80 text-slate-300'
                      }`}
                    >
                      {originalIndex + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {isSolved && (
            <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-emerald-300">
                    ✓ Barakalla! Pazzl muvaffaqiyatli yigʻildi!
                  </p>
                  <p className="text-xs text-slate-300">
                    Siz {gridSize}×{gridSize} oʻlchamdagi Saʼdullo Quronov rasmini{' '}
                    <span className="font-mono tabular-nums">{moves}</span> ta urinishda va{' '}
                    <span className="font-mono tabular-nums">{formatTime(seconds)}</span> vaqt ichida toʻliq tikladingiz.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => resetBoard(gridSize)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Yana oʻynash
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Image Selector & Reference Preview (5 cols) */}
        <div className="lg:col-span-5 bg-[#111827] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-medium text-slate-400">
              Pazzl uchun rasmni tanlang:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PUZZLE_IMAGES.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => handleImageChange(img.id)}
                  className={`px-3 py-2.5 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                    selectedImageId === img.id
                      ? 'bg-sky-400/15 border-sky-400 text-sky-300 font-semibold'
                      : 'bg-[#090D16] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Asl rasm namunasi:
              </span>
              <button
                type="button"
                onClick={() => setShowReference((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 cursor-pointer"
              >
                {showReference ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Yashirish</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Koʻrsatish</span>
                  </>
                )}
              </button>
            </div>

            {showReference ? (
              <div className="rounded-lg overflow-hidden border border-slate-800 bg-[#090D16]">
                {!imageError ? (
                  <img
                    src={activeImage.src}
                    alt={activeImage.label}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400">
                    Namuna tasviri
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 rounded-lg bg-[#090D16] border border-slate-800 text-center text-xs text-slate-400">
                Namuna yashirilgan — xotirangizga tayanib yigʻib koʻring!
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400 leading-relaxed">
            <p className="flex items-center gap-1.5 text-slate-200 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Qanday oʻynaladi?</span>
            </p>
            <p>
              1. Istalgan boʻlak ustiga bosing (u havorang hoshiya bilan belgilanadi), soʻng ikkinchi boʻlakni bossangiz ikkalasi oʻrin almashadi.
            </p>
            <p>
              2. Boʻlak oʻzining haqiqiy oʻrniga tushganda uning tartib raqami yashil tusga kiradi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
