import React, { useState, useEffect, useMemo } from 'react';
import {
  Minus,
  Plus,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Award,
  Check,
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizQuestions';

const MIN_QUESTIONS = 20;
const MAX_QUESTIONS = 50;
const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const QuizSection: React.FC = () => {
  const [questionPool, setQuestionPool] = useState<QuizQuestion[]>(() => QUIZ_QUESTIONS);
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'wrong'>('all');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const activeQuestions = useMemo(
    () => questionPool.slice(0, questionCount),
    [questionPool, questionCount]
  );

  useEffect(() => {
    if (isSubmitted) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isSubmitted]);

  const adjustCount = (delta: number) => {
    setQuestionCount((prev) => {
      const next = Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, prev + delta));
      if (currentIndex >= next) {
        setCurrentIndex(next - 1);
      }
      return next;
    });
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const setExactCount = (target: number) => {
    const clamped = Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, target));
    setQuestionCount(clamped);
    if (currentIndex >= clamped) {
      setCurrentIndex(clamped - 1);
    }
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleShuffleAndRestart = () => {
    setQuestionPool(shuffleArray(QUIZ_QUESTIONS));
    setAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setReviewFilter('all');
    setElapsedSeconds(0);
  };

  const handleResetSameOrder = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setReviewFilter('all');
    setElapsedSeconds(0);
  };

  const answeredCount = activeQuestions.filter(
    (q) => answers[q.id] !== undefined
  ).length;

  const currentQuestion = activeQuestions[currentIndex] ?? activeQuestions[0];

  // Results calculation
  const results = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    activeQuestions.forEach((q) => {
      const chosen = answers[q.id];
      if (chosen === undefined) {
        unanswered += 1;
      } else if (chosen === q.correctIndex) {
        correct += 1;
      } else {
        wrong += 1;
      }
    });

    const percentage =
      activeQuestions.length > 0
        ? Math.round((correct / activeQuestions.length) * 1000) / 10
        : 0;

    let gradeLabel = 'Qayta mutolaa tavsiya etiladi';
    if (percentage >= 86) {
      gradeLabel = 'Aʼlo natija — Asar va muallif bilimdoni';
    } else if (percentage >= 71) {
      gradeLabel = 'Yaxshi natija — Mustahkam bilim';
    } else if (percentage >= 55) {
      gradeLabel = 'Qoniqarli natija — Asosiy maʼlumotlar oʻzlashtirilgan';
    }

    return { correct, wrong, unanswered, percentage, gradeLabel };
  }, [activeQuestions, answers]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const filteredReviewQuestions = activeQuestions.filter((q) => {
    const isRight = answers[q.id] === q.correctIndex;
    if (reviewFilter === 'correct') return isRight;
    if (reviewFilter === 'wrong') return !isRight;
    return true;
  });

  return (
    <div className="space-y-10 pt-6">
      {/* Header & Question Count Controller (20 to 50 with - and +) */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span>Bilimni baholash tizimi</span>
              <span aria-hidden="true">·</span>
              <span>„Galaktikada bir kun“ (1-qism) va Saʼdullo Quronov ijodi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
              Interaktiv test sinovi (20 tadan 50 tagacha)
            </h2>
            <p className="text-sm text-slate-400">
              Savollar sonini <strong className="text-slate-200">−</strong> va{' '}
              <strong className="text-slate-200">+</strong> tugmalari yordamida 20 tadan 50 tagacha oʻzgartirishingiz mumkin. Test yakunida foiz koʻrsatkichi va barcha savollarning toʻgʻri javoblari izohi bilan chiqadi.
            </p>
          </div>

          {/* Interactive - / + Stepper Control */}
          <div className="bg-[#090D16] border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shrink-0">
            <span className="text-xs text-slate-400 font-medium">
              Test savollari soni (min: 20 · maks: 50):
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => adjustCount(-1)}
                disabled={questionCount <= MIN_QUESTIONS}
                aria-label="Savollar sonini bittaga kamaytirish"
                className="w-11 h-11 inline-flex items-center justify-center rounded-lg border border-slate-700 bg-[#111827] text-slate-100 hover:border-sky-400 hover:text-sky-300 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <Minus className="w-5 h-5" />
              </button>

              <div className="min-w-[110px] text-center px-3 py-2 rounded-lg bg-[#111827] border border-slate-800">
                <span className="text-2xl font-mono font-bold tabular-nums text-sky-400">
                  {questionCount}
                </span>
                <span className="ml-1.5 text-xs text-slate-400">ta savol</span>
              </div>

              <button
                type="button"
                onClick={() => adjustCount(1)}
                disabled={questionCount >= MAX_QUESTIONS}
                aria-label="Savollar sonini bittaga oshirish"
                className="w-11 h-11 inline-flex items-center justify-center rounded-lg border border-slate-700 bg-[#111827] text-slate-100 hover:border-sky-400 hover:text-sky-300 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[20, 30, 40, 50].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setExactCount(preset)}
                  className={`py-1.5 text-xs font-mono font-semibold tabular-nums rounded-md transition-colors cursor-pointer ${
                    questionCount === preset
                      ? 'bg-sky-400 text-slate-950'
                      : 'bg-[#111827] text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {preset} ta
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status Bar & Shuffle Actions */}
        <div className="pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
            <span>
              Belgilangan javoblar:{' '}
              <strong className="font-mono tabular-nums text-sky-400">
                {answeredCount} / {questionCount}
              </strong>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>
              Vaqt:{' '}
              <strong className="font-mono tabular-nums text-slate-100">
                {formatTime(elapsedSeconds)}
              </strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleShuffleAndRestart}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Shuffle className="w-3.5 h-3.5 text-sky-400" />
              <span>Savollarni aralashtirish</span>
            </button>
            <button
              type="button"
              onClick={handleResetSameOrder}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Tozalash</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Quiz Solving Workspace OR Submitted Results View */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Card (8 cols) */}
          <div className="lg:col-span-8 bg-[#111827] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between gap-4 text-xs text-slate-400">
              <span className="font-mono font-semibold tabular-nums text-sky-400">
                SAVOL {currentIndex + 1} / {questionCount}
              </span>
              <span>
                Mavzu:{' '}
                {currentQuestion.category === 'asar'
                  ? '„Galaktikada bir kun“ (1-qism)'
                  : 'Saʼdullo Quronov hayoti va ijodi'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-50 leading-snug">
              {currentIndex + 1}. {currentQuestion.question}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((optText, idx) => {
                const isSelected = answers[currentQuestion.id] === idx;
                return (
                  <button
                    key={optText}
                    type="button"
                    onClick={() => handleSelectOption(currentQuestion.id, idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-sky-400/15 border-sky-400 text-slate-50'
                        : 'bg-[#090D16] border-slate-800 text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-md font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-sky-400 text-slate-950'
                          : 'bg-[#111827] text-slate-400 border border-slate-700'
                      }`}
                    >
                      {OPTION_LETTERS[idx]}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed flex-1">
                      {optText}
                    </span>
                    {isSelected && (
                      <Check className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation & Submit Bar */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-200 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-lg disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer whitespace-nowrap"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Oldingi</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((i) => Math.min(questionCount - 1, i + 1))
                  }
                  disabled={currentIndex === questionCount - 1}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-200 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-lg disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Keyingi</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsSubmitted(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Award className="w-4 h-4" />
                <span>Testni yakunlash va natijani koʻrish</span>
              </button>
            </div>
          </div>

          {/* Question Navigator Grid (4 cols) */}
          <div className="lg:col-span-4 bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Savollar xaritasi</span>
              <span className="font-mono tabular-nums">
                {answeredCount}/{questionCount} belgilandi
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-2">
              {activeQuestions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-lg font-mono text-xs font-semibold tabular-nums transition-colors cursor-pointer border ${
                      isCurrent
                        ? 'bg-sky-400 text-slate-950 border-sky-300'
                        : isAnswered
                        ? 'bg-sky-400/15 text-sky-300 border-sky-500/40 hover:border-sky-400'
                        : 'bg-[#090D16] text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
              Istalgan raqamni bosib oʻsha savolga oʻtishingiz mumkin. Testni yakunlaganingizdan soʻng foiz koʻrsatkichi va barcha toʻgʻri javoblar ochiladi.
            </p>
          </div>
        </div>
      ) : (
        /* Results & Full Answer Key Review */
        <div className="space-y-8">
          {/* Score Summary Panel */}
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <p className="text-xs text-sky-400 font-medium">
                  Test yakunlandi · Umumiy natija
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-50">
                  {results.gradeLabel}
                </h3>
                <p className="text-sm text-slate-400">
                  Jami {questionCount} ta savoldan {results.correct} tasiga toʻgʻri javob berdingiz. Sarflangan vaqt:{' '}
                  <span className="font-mono tabular-nums text-slate-200">
                    {formatTime(elapsedSeconds)}
                  </span>
                </p>
              </div>

              <div className="bg-[#090D16] border border-slate-800 rounded-xl px-6 py-4 text-center shrink-0">
                <p className="text-xs text-slate-400">Oʻzlashtirish koʻrsatkichi</p>
                <p className="text-4xl sm:text-5xl font-mono font-bold tabular-nums text-sky-400 mt-1">
                  {results.percentage}%
                </p>
              </div>
            </div>

            {/* Visual Percentage Bar */}
            <div className="w-full h-3 bg-[#090D16] border border-slate-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${Math.min(100, Math.max(0, results.percentage))}%` }}
                className="h-full bg-sky-400 transition-transform duration-200 origin-left"
              />
            </div>

            {/* Breakdown Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-[#090D16] border border-slate-800 flex items-center justify-between">
                <span className="text-sm text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>✓ Toʻgʻri javoblar</span>
                </span>
                <span className="text-xl font-mono font-bold tabular-nums text-emerald-400">
                  {results.correct} ta
                </span>
              </div>

              <div className="p-4 rounded-lg bg-[#090D16] border border-slate-800 flex items-center justify-between">
                <span className="text-sm text-rose-400 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  <span>✕ Xato javoblar</span>
                </span>
                <span className="text-xl font-mono font-bold tabular-nums text-rose-400">
                  {results.wrong} ta
                </span>
              </div>

              <div className="p-4 rounded-lg bg-[#090D16] border border-slate-800 flex items-center justify-between">
                <span className="text-sm text-slate-400">Belgilanmagan</span>
                <span className="text-xl font-mono font-bold tabular-nums text-slate-300">
                  {results.unanswered} ta
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleShuffleAndRestart}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Shuffle className="w-4 h-4" />
                <span>Yangi aralashtirilgan test boshlash</span>
              </button>
              <button
                type="button"
                onClick={handleResetSameOrder}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-200 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Shu testni qayta ishlash</span>
              </button>
            </div>
          </div>

          {/* Full Answer Key & Explanations */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-50">
                Test savollarining toʻgʻri javoblari va tahlili
              </h3>

              <div className="flex items-center gap-1 p-1 bg-[#111827] border border-slate-800 rounded-lg self-start">
                <button
                  type="button"
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    reviewFilter === 'all'
                      ? 'bg-sky-400 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Barchasi ({activeQuestions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewFilter('wrong')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    reviewFilter === 'wrong'
                      ? 'bg-sky-400 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Xato / Belgilanmagan ({results.wrong + results.unanswered})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewFilter('correct')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    reviewFilter === 'correct'
                      ? 'bg-sky-400 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Toʻgʻri ({results.correct})
                </button>
              </div>
            </div>

            {filteredReviewQuestions.length === 0 ? (
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-8 text-center text-sm text-slate-400">
                Ushbu filtr boʻyicha savollar mavjud emas.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReviewQuestions.map((q) => {
                  const originalIdx = activeQuestions.findIndex(
                    (item) => item.id === q.id
                  );
                  const userChoice = answers[q.id];
                  const isCorrect = userChoice === q.correctIndex;
                  const isUnanswered = userChoice === undefined;

                  return (
                    <div
                      key={q.id}
                      className="bg-[#111827] border border-slate-800 rounded-xl p-6 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-mono font-semibold tabular-nums text-slate-400">
                          {originalIdx + 1}-SAVOL
                        </span>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>✓ Toʻgʻri javob berildi</span>
                          </span>
                        ) : isUnanswered ? (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-400">
                            <XCircle className="w-4 h-4" />
                            <span>— Javob belgilanmagan</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-rose-400">
                            <XCircle className="w-4 h-4" />
                            <span>✕ Notoʻgʻri javob berildi</span>
                          </span>
                        )}
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-slate-50">
                        {originalIdx + 1}. {q.question}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="p-3.5 rounded-lg bg-[#090D16] border border-slate-800">
                          <p className="text-xs text-slate-400 mb-1">
                            Sizning javobingiz:
                          </p>
                          <p
                            className={`font-medium ${
                              isCorrect
                                ? 'text-emerald-400'
                                : isUnanswered
                                ? 'text-amber-300'
                                : 'text-rose-400'
                            }`}
                          >
                            {isUnanswered
                              ? 'Belgilanmagan'
                              : `${OPTION_LETTERS[userChoice]}) ${q.options[userChoice]}`}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-lg bg-[#090D16] border border-emerald-500/30">
                          <p className="text-xs text-slate-400 mb-1">
                            Toʻgʻri javob:
                          </p>
                          <p className="font-semibold text-emerald-400">
                            {OPTION_LETTERS[q.correctIndex]}) {q.options[q.correctIndex]}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                        <strong className="text-sky-400 font-medium">Izoh:</strong>{' '}
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
