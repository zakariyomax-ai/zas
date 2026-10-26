import React, { useState } from 'react';
import { Puzzle, GraduationCap, BookMarked, Briefcase, Award, FileText, ExternalLink } from 'lucide-react';
import { BOOK_PDF_URL } from '../data/bookData';
import {
  AUTHOR_PORTRAIT_MAIN,
  AUTHOR_SLIDE_IMAGE,
  AUTHOR_BASIC_INFO,
  AUTHOR_EDUCATION,
  AUTHOR_CAREER,
  AUTHOR_SCIENCE,
  AUTHOR_TEXTBOOKS,
  AUTHOR_COMMERCIAL_FACT,
  AUTHOR_BOOKS,
} from '../data/authorData';

interface AuthorSectionProps {
  onOpenPuzzle: () => void;
  onStartQuiz: () => void;
}

export const AuthorSection: React.FC<AuthorSectionProps> = ({
  onOpenPuzzle,
  onStartQuiz,
}) => {
  const [bookFilter, setBookFilter] = useState<'all' | 'fantastika' | 'tarixiy'>('all');
  const [portraitImgError, setPortraitImgError] = useState(false);
  const [slideImgError, setSlideImgError] = useState(false);

  const filteredBooks = AUTHOR_BOOKS.filter((book) =>
    bookFilter === 'all' ? true : book.genre === bookFilter
  );

  return (
    <div className="space-y-16 pt-6">
      {/* Section Header */}
      <div className="max-w-3xl space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span>Muallif haqida toʻliq maʼlumot</span>
          <span aria-hidden="true">·</span>
          <span>Tarjimai hol, ilmiy va badiiy meros</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50">
          {AUTHOR_BASIC_INFO.fullName}
        </h2>
        <p className="text-sm sm:text-base text-sky-400">
          {AUTHOR_BASIC_INFO.roles}
        </p>
      </div>

      {/* Primary Side-by-Side Portrait + Complete Biography Copy */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Portrait Photo + Quick Facts + Action to Puzzle */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden">
            <div className="aspect-[4/3] w-full bg-[#090D16] relative overflow-hidden">
              {!portraitImgError ? (
                <img
                  src={AUTHOR_PORTRAIT_MAIN}
                  alt="Saʼdullo Quronov Dilmurodovich portreti"
                  referrerPolicy="no-referrer"
                  onError={() => setPortraitImgError(true)}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900">
                  <GraduationCap className="w-10 h-10 text-sky-400 mb-2" />
                  <p className="text-sm font-semibold text-slate-100">
                    {AUTHOR_BASIC_INFO.fullName}
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-baseline justify-between gap-4 py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Tugʻilgan sanasi:</span>
                  <span className="font-mono tabular-nums text-slate-100 font-medium">
                    {AUTHOR_BASIC_INFO.birthDate}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Tugʻilgan joyi:</span>
                  <span className="text-slate-100 text-right font-medium">
                    {AUTHOR_BASIC_INFO.birthPlace}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Ilmiy darajasi:</span>
                  <span className="text-sky-400 font-medium">
                    Filologiya fanlari doktori (DSc)
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-1.5">
                  <span className="text-slate-400">1 oylik kitob savdosi:</span>
                  <span className="font-mono tabular-nums text-emerald-400 font-semibold">
                    238 000 000 soʻm
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenPuzzle}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Puzzle className="w-4 h-4" />
                <span>Saʼdullo Quronov rasm pazzlini oʻynash</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Side-by-Side Transcribed Information & Work Chronology */}
        <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-8">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-50">
              Tarjimai hol va taʼlim yoʻli
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {AUTHOR_BASIC_INFO.slideExactTranscript}
            </p>
          </div>

          {/* Education Steps */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-sky-400">
              <GraduationCap className="w-4 h-4" />
              <span>Taʼlim bosqichlari</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AUTHOR_EDUCATION.map((edu) => (
                <div
                  key={edu.organization}
                  className="p-4 rounded-lg bg-[#090D16] border border-slate-800/90 space-y-1"
                >
                  <p className="text-xs font-mono tabular-nums text-sky-400">
                    {edu.period}
                  </p>
                  <p className="text-sm font-semibold text-slate-100">
                    {edu.organization}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Chronology */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2 text-sm font-semibold text-sky-400">
              <Briefcase className="w-4 h-4" />
              <span>Mehnat faoliyati va xronologiya</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Olim va yozuvchi sifatida turli nufuzli nashriyotlar hamda taʼlim muassasalarida faoliyat yuritgan:
            </p>
            <div className="divide-y divide-slate-800/80">
              {AUTHOR_CAREER.map((item) => (
                <div
                  key={item.period}
                  className="py-3.5 first:pt-1 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4"
                >
                  <div className="sm:col-span-3 font-mono text-xs sm:text-sm font-semibold tabular-nums text-sky-400">
                    {item.period}
                  </div>
                  <div className="sm:col-span-9 space-y-1">
                    <p className="text-sm font-semibold text-slate-100">
                      {item.organization}{' '}
                      <span className="text-xs font-normal text-slate-400">
                        · {item.role}
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Second Uploaded Slide Image + Side-by-Side Transcript Verification */}
      <section className="bg-[#111827] border border-slate-800 rounded-xl p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 overflow-hidden rounded-lg border border-slate-800 bg-[#090D16]">
            {!slideImgError ? (
              <img
                src={AUTHOR_SLIDE_IMAGE}
                alt="Muallif haqida taqdimot lavhasi — Saʼdullo Quronov"
                referrerPolicy="no-referrer"
                onError={() => setSlideImgError(true)}
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                Muallif haqida taqdimot tasviri
              </div>
            )}
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-sky-400">
              <span>Taqdimot lavhasidagi maʼlumotlar koʻchirmasi</span>
              <span aria-hidden="true">·</span>
              <span>Asl matn</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-50">
              Muallif haqida (rasmdagi maʼlumotlar)
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {AUTHOR_BASIC_INFO.slideExactTranscript}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span>1989-yil 31-yanvar (Andijon tumani)</span>
              <span aria-hidden="true">·</span>
              <span>OʻzMU Filologiya fakulteti (2007–2012)</span>
              <span aria-hidden="true">·</span>
              <span>„Sharq yulduzi“ va „Jajji akademik“</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Activity (Filologiya) & School Textbooks */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 bg-[#111827] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-sky-400 font-medium">
              <Award className="w-4 h-4" />
              <span>Filologiya va adabiyotshunoslik</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-50">
              Ilmiy faoliyati (PhD va DSc tadqiqotlari)
            </h3>
            <p className="text-sm text-slate-400">
              Saʼdullo Quronov nafaqat yozuvchi, balki oʻzbek romanchiligi va sheʼriyatini chuqur tadqiq etgan jiddiy adabiyotshunos olimdir.
            </p>
          </div>

          <div className="divide-y divide-slate-800">
            {AUTHOR_SCIENCE.map((work) => (
              <div key={work.title} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-sky-400">
                  <span className="font-semibold">{work.degreeOrType}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums text-slate-400">{work.year}</span>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-100">
                  {work.title}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {work.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* School Textbooks Co-authorship */}
        <div className="lg:col-span-4 bg-[#111827] border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-sky-400 font-medium">
              <BookMarked className="w-4 h-4" />
              <span>Milliy taʼlim tizimidagi hissasi</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-50">
              {AUTHOR_TEXTBOOKS.heading}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {AUTHOR_TEXTBOOKS.summary}
            </p>

            <div className="p-4 rounded-lg bg-[#090D16] border border-slate-800 space-y-2">
              <p className="font-mono text-sm font-semibold tabular-nums text-sky-400">
                1, 2 va 3-sinflar uchun
              </p>
              <p className="text-sm font-medium text-slate-100">
                {AUTHOR_TEXTBOOKS.subject}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <p className="text-xs text-slate-400 leading-relaxed">
              Muallif hayoti va ijodi boʻyicha bilimingizni interaktiv testda sinab koʻring.
            </p>
            <button
              type="button"
              onClick={onStartQuiz}
              className="w-full px-4 py-2.5 text-sm font-medium text-slate-100 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Test boʻlimiga oʻtish
            </button>
          </div>
        </div>
      </section>

      {/* Literary Works & Genre Comparison */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs text-sky-400 font-medium">Badiiy ijodi va eng mashhur asarlari</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-50">
              Ilmiy-fantastika hamda tarixiy-maʼrifiy kitoblar
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {AUTHOR_COMMERCIAL_FACT}
            </p>
          </div>

          {/* Interactive Genre Filter matching user prompt's comparison */}
          <div className="flex items-center gap-1 p-1 bg-[#111827] border border-slate-800 rounded-lg self-start shrink-0">
            <button
              type="button"
              onClick={() => setBookFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                bookFilter === 'all'
                  ? 'bg-sky-400 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Barcha kitoblar (3)
            </button>
            <button
              type="button"
              onClick={() => setBookFilter('fantastika')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                bookFilter === 'fantastika'
                  ? 'bg-sky-400 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              „Galaktikada bir kun“ (fantastika)
            </button>
            <button
              type="button"
              onClick={() => setBookFilter('tarixiy')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                bookFilter === 'tarixiy'
                  ? 'bg-sky-400 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              „Beruniy“ va „Buxoriy“ (tarixiy-maʼrifiy)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <article
              key={book.id}
              className="bg-[#111827] border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {book.id === 'galaktika' && (
                  <div className="w-full rounded-lg overflow-hidden border border-slate-800 bg-[#090D16] mb-1">
                    <img
                      src="/assets/aistudio/image_b3d49bf5.png"
                      alt="Galaktikada bir kun: 1-qism kinematik sanʼat asari"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono font-semibold tabular-nums text-sky-400">
                    {book.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{book.genreLabel}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-50">{book.title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {book.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-4">
                <ul className="space-y-2 text-xs text-slate-400">
                  {book.highlights.map((pt) => (
                    <li key={pt} className="leading-relaxed">
                      • {pt}
                    </li>
                  ))}
                </ul>

                {book.id === 'galaktika' && (
                  <a
                    href={BOOK_PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Kitob PDF si</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
