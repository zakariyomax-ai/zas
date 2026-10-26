/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { BookSection } from './components/BookSection';
import { AuthorSection } from './components/AuthorSection';
import { QuizSection } from './components/QuizSection';
import { PuzzleSection } from './components/PuzzleSection';
import { BOOK_PDF_URL } from './data/bookData';

type ActiveTab = 'asar' | 'muallif' | 'test' | 'pazzl';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('asar');

  const navigateTo = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#080C14] text-slate-100 flex flex-col">
      {/* Subtle Modern Celestial Horizon Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[440px] bg-[radial-gradient(ellipse_75%_50%_at_50%_-15%,rgba(56,189,248,0.14),transparent)] z-0"
      />

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#080C14]/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => navigateTo('asar')}
            className="text-lg font-bold tracking-tight text-slate-50 hover:text-sky-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer font-display"
          >
            Galaktikada bir kun
          </button>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav
            aria-label="Asosiy boʻlimlar"
            className="hidden md:flex items-center gap-6 text-sm font-medium"
          >
            <button
              type="button"
              onClick={() => navigateTo('asar')}
              className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'asar'
                  ? 'border-sky-400 text-slate-50'
                  : 'border-transparent text-slate-400 hover:text-slate-100'
              }`}
            >
              1-qism tahlili
            </button>
            <button
              type="button"
              onClick={() => navigateTo('muallif')}
              className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'muallif'
                  ? 'border-sky-400 text-slate-50'
                  : 'border-transparent text-slate-400 hover:text-slate-100'
              }`}
            >
              Muallif haqida
            </button>
            <button
              type="button"
              onClick={() => navigateTo('test')}
              className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'test'
                  ? 'border-sky-400 text-slate-50'
                  : 'border-transparent text-slate-400 hover:text-slate-100'
              }`}
            >
              Test sinovi
            </button>
            <button
              type="button"
              onClick={() => navigateTo('pazzl')}
              className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'pazzl'
                  ? 'border-sky-400 text-slate-50'
                  : 'border-transparent text-slate-400 hover:text-slate-100'
              }`}
            >
              Rasm pazzli
            </button>
            <a
              href={BOOK_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 py-1 border-b-2 border-transparent text-sky-400 hover:text-sky-300 hover:border-sky-400/60 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Kitob PDF si</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => navigateTo('test')}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Testni boshlash
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Workspace Switcher (below header, non-sticky so mobile sticky cap <= 15%) */}
      <div className="relative z-10 md:hidden max-w-[1200px] w-full mx-auto px-4 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-[#111827] border border-white/[0.08] rounded-lg">
          <button
            type="button"
            onClick={() => navigateTo('asar')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
              activeTab === 'asar'
                ? 'bg-sky-400 text-slate-950 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            1-qism tahlili
          </button>
          <button
            type="button"
            onClick={() => navigateTo('muallif')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
              activeTab === 'muallif'
                ? 'bg-sky-400 text-slate-950 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Muallif haqida
          </button>
          <button
            type="button"
            onClick={() => navigateTo('test')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
              activeTab === 'test'
                ? 'bg-sky-400 text-slate-950 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Test (20–50)
          </button>
          <button
            type="button"
            onClick={() => navigateTo('pazzl')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
              activeTab === 'pazzl'
                ? 'bg-sky-400 text-slate-950 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Rasm pazzli
          </button>
          <a
            href={BOOK_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md bg-sky-400/15 text-sky-300 hover:bg-sky-400/25 transition-colors whitespace-nowrap"
          >
            <span>Kitob PDF si</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 pb-20">
        {activeTab === 'asar' && (
          <BookSection
            onStartQuiz={() => navigateTo('test')}
            onGoToAuthor={() => navigateTo('muallif')}
          />
        )}
        {activeTab === 'muallif' && (
          <AuthorSection
            onOpenPuzzle={() => navigateTo('pazzl')}
            onStartQuiz={() => navigateTo('test')}
          />
        )}
        {activeTab === 'test' && <QuizSection />}
        {activeTab === 'pazzl' && <PuzzleSection />}
      </main>

      {/* Clean Quiet Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#080C14]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            Saʼdullo Quronovning „Galaktikada bir kun“ (1-qism) asari asosidagi interaktiv oʻquv loyihasi.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('asar')}
              className="hover:text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              1-qism tahlili
            </button>
            <button
              type="button"
              onClick={() => navigateTo('muallif')}
              className="hover:text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              Muallif haqida
            </button>
            <button
              type="button"
              onClick={() => navigateTo('test')}
              className="hover:text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              Test sinovi
            </button>
            <button
              type="button"
              onClick={() => navigateTo('pazzl')}
              className="hover:text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              Rasm pazzli
            </button>
            <a
              href={BOOK_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors whitespace-nowrap"
            >
              <span>Kitob PDF si</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

