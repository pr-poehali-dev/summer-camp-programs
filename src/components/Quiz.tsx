import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// --- Типы ---
type Scores = Record<string, number>;

interface Answer {
  label: string;
  scores?: Scores;
  correction?: Scores;
  allowedShifts?: number[];
}

interface Question {
  id: number;
  text: string;
  subtitle?: string;
  multi?: boolean;
  answers: Answer[];
}

// --- Данные смен ---
const SHIFTS: Record<string, { title: string; emoji: string; tagline: string; bullets: string[]; bonus: string; cta: string; color: string }> = {
  "1": {
    title: "Сундук со сказками",
    emoji: "✨",
    tagline: "Вашему ребёнку подойдёт смена «Сундук со сказками»",
    bullets: [
      "Погрузится в волшебные миры и сыграет главную роль в спектакле",
      "Создаст свои сказочные артефакты на мастер-классах",
      "Научится говорить уверенно и работать в команде",
    ],
    bonus: "При записи до конца апреля — скидка 10% + личный «сказочный дневник» в подарок",
    cta: "Забронировать место со скидкой",
    color: "from-purple-400 to-pink-400",
  },
  "2": {
    title: "Вкусные открытия",
    emoji: "🍳",
    tagline: "Вашему ребёнку подойдёт смена «Вкусные открытия»",
    bullets: [
      "Приготовит блюда из 5+ стран: от итальянской пасты до японских роллов",
      "Узнает традиции застолья и этикет разных культур",
      "Создаст свою первую кулинарную книгу",
    ],
    bonus: "При записи до конца апреля — бесплатный мастер-класс «Домашнее мороженое» для всей семьи",
    cta: "Забронировать место с бонусом",
    color: "from-orange-400 to-yellow-400",
  },
  "3": {
    title: "Мульти-драйв",
    emoji: "🏴‍☠️",
    tagline: "Вашему ребёнку подойдёт смена «Мульти-драйв»",
    bullets: [
      "Станет пиратом в большом квесте с картой и сокровищами",
      "Побывает в мирах любимых мультфильмов",
      "Укрепит здоровье на море и в походах",
    ],
    bonus: "При записи до конца апреля — профессиональная фотосессия в пиратском стиле в подарок",
    cta: "Забронировать место с фотосессией",
    color: "from-red-400 to-orange-400",
  },
  "4": {
    title: "Поколение Альфа",
    emoji: "📱",
    tagline: "Вашему ребёнку подойдёт смена «Поколение Альфа»",
    bullets: [
      "Освоит основы ИИ и создаст своего первого чат-бота",
      "Научится фуд-фотографии и дизайну: заберёт домой футболку с авторским принтом",
      "Попробует себя в роли техно-творца: от неоновой вывески до парфюма",
    ],
    bonus: "При записи до конца апреля — доступ к закрытому уроку «Как монтировать видео как блогер»",
    cta: "Забронировать место с уроком в подарок",
    color: "from-blue-400 to-indigo-400",
  },
  "5": {
    title: "Есть ли жизнь на Марсе?",
    emoji: "🚀",
    tagline: "Вашему ребёнку подойдёт смена «Есть ли жизнь на Марсе?»",
    bullets: [
      "Соберёт работающую солнечную панель и умную сигнализацию",
      "Вырастит растение на гидропонике и создаст реалистичный шлем космонавта",
      "Снимет свой первый научно-фантастический ролик с использованием ИИ",
    ],
    bonus: "При записи до конца апреля — набор «Юный инженер» (гидропоника дома) в подарок",
    cta: "Забронировать место с набором",
    color: "from-slate-500 to-blue-500",
  },
  "6": {
    title: "Кругосветка",
    emoji: "🌍",
    tagline: "Вашему ребёнку подойдёт смена «Кругосветка»",
    bullets: [
      "«Посетит» 7 стран: от Японии до Бразилии — через кухню, игры и традиции",
      "Научится готовить интернациональные блюда и заполнит личный «паспорт путешественника»",
      "Укрепит командный дух в квестах и вылазках на природу",
    ],
    bonus: "При записи до конца апреля — этно-набор для домашних экспериментов в подарок",
    cta: "Забронировать место с набором",
    color: "from-green-400 to-teal-400",
  },
  "7": {
    title: "Невероятные открытия",
    emoji: "🔬",
    tagline: "Вашему ребёнку подойдёт смена «Невероятные открытия»",
    bullets: [
      "Проведёт 10+ зрелищных и безопасных опытов по физике и химии",
      "Поймёт, как работают законы природы, через игру и эксперимент",
      "Заберёт домой свой первый «лабораторный набор» для домашних открытий",
    ],
    bonus: "При записи до конца апреля — расширенный набор опытов + видео-инструкции",
    cta: "Забронировать место с набором",
    color: "from-teal-400 to-cyan-400",
  },
};

// --- Вопросы ---
const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Сколько лет вашему ребёнку?",
    answers: [
      { label: "🟢 7–9 лет", allowedShifts: [1, 2, 3, 6, 7] },
      { label: "🟡 10–12 лет", allowedShifts: [2, 3, 4, 5, 6, 7] },
      { label: "🔴 13–14 лет", allowedShifts: [4, 5] },
    ],
  },
  {
    id: 2,
    text: "Чем ваш ребёнок любит заниматься в свободное время?",
    subtitle: "Можно выбрать 1–2 варианта",
    multi: true,
    answers: [
      { label: "🎭 Придумывать истории, играть в театр, рисовать", scores: { "1": 2 } },
      { label: "🍳 Готовить, пробовать новое, устраивать мини-праздники", scores: { "2": 2, "6": 2 } },
      { label: "🏴‍☠️ Бегать, играть в приключения, искать «сокровища»", scores: { "3": 2 } },
      { label: "📱 Разбираться в гаджетах, снимать видео, пробовать новое в цифре", scores: { "4": 2 } },
      { label: "🔬 Проводить опыты, задавать вопросы «как это работает?»", scores: { "5": 2, "7": 2 } },
      { label: "🌍 Читать о других странах, мечтать о путешествиях", scores: { "6": 2 } },
    ],
  },
  {
    id: 3,
    text: "Что для вас важнее всего в летнем отдыхе ребёнка?",
    answers: [
      { label: "🧠 Развил мышление, логику, научные навыки", scores: { "4": 1, "5": 1, "7": 1 } },
      { label: "🗣️ Стал увереннее, научился выступать, работать в команде", scores: { "1": 1, "3": 1, "4": 1 } },
      { label: "👐 Освоил практический навык: готовить, снимать, создавать", scores: { "2": 1, "4": 1, "5": 1 } },
      { label: "🌿 Отдохнул от экрана, набрался сил на природе", scores: { "3": 1, "6": 1 } },
      { label: "🎨 Раскрыл творческий потенциал, создал что-то своё", scores: { "1": 1, "2": 1, "4": 1 } },
    ],
  },
  {
    id: 4,
    text: "Какой формат занятий ближе вашему ребёнку?",
    answers: [
      { label: "⚡ Активный: бег, квесты, походы, игры на свежем воздухе", correction: { "3": 1, "5": 1, "6": 1 } },
      { label: "🧩 Спокойный: мастер-классы, творчество, эксперименты", correction: { "1": 1, "2": 1, "4": 1, "7": 1 } },
      { label: "🔄 Микс: хочу и побегать, и посидеть с интересным делом", correction: {} },
    ],
  },
];

// --- Подсчёт результата ---
function calcResult(
  ageAllowed: number[],
  multiScores: Scores[],
  goalScores: Scores,
  formatScores: Scores
): string {
  const total: Scores = {};
  for (let i = 1; i <= 7; i++) total[String(i)] = 0;

  // Очки из вопроса 2 (интересы)
  multiScores.forEach((s) => {
    Object.entries(s).forEach(([k, v]) => {
      total[k] = (total[k] || 0) + v;
    });
  });

  // Очки из вопроса 3 (цели)
  Object.entries(goalScores).forEach(([k, v]) => {
    total[k] = (total[k] || 0) + v;
  });

  // Очки из вопроса 4 (формат)
  Object.entries(formatScores).forEach(([k, v]) => {
    total[k] = (total[k] || 0) + v;
  });

  // Фильтр по возрасту
  const candidates = ageAllowed.map(String);
  let best = candidates[0];
  let bestScore = -Infinity;
  candidates.forEach((id) => {
    if ((total[id] || 0) > bestScore) {
      bestScore = total[id] || 0;
      best = id;
    }
  });
  return best;
}

// --- Компонент квиза ---
const Quiz = () => {
  const [step, setStep] = useState<"welcome" | "q1" | "q2" | "q3" | "q4" | "contacts" | "analyzing" | "result">("welcome");

  // Ответы
  const [ageAllowed, setAgeAllowed] = useState<number[]>([]);
  const [multiSelected, setMultiSelected] = useState<number[]>([]);
  const [multiScores, setMultiScores] = useState<Scores[]>([]);
  const [goalScores, setGoalScores] = useState<Scores>({});
  const [formatScores, setFormatScores] = useState<Scores>({});

  // Контакты
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [resultId, setResultId] = useState<string>("1");

  const totalSteps = 5;
  const stepMap: Record<string, number> = { q1: 1, q2: 2, q3: 3, q4: 4, contacts: 5 };
  const currentStepNum = stepMap[step] ?? 0;

  const handleStart = () => setStep("q1");

  const handleQ1 = (idx: number) => {
    const allowed = QUESTIONS[0].answers[idx].allowedShifts!;
    setAgeAllowed(allowed);
    setStep("q2");
  };

  const toggleMulti = (idx: number) => {
    setMultiSelected((prev) => {
      if (prev.includes(idx)) return prev.filter((i) => i !== idx);
      if (prev.length >= 2) return prev;
      return [...prev, idx];
    });
  };

  const handleQ2Next = () => {
    const scores = multiSelected.map((idx) => QUESTIONS[1].answers[idx].scores || {});
    setMultiScores(scores);
    setMultiSelected([]);
    setStep("q3");
  };

  const handleQ3 = (idx: number) => {
    setGoalScores(QUESTIONS[2].answers[idx].scores || {});
    setStep("q4");
  };

  const handleQ4 = (idx: number) => {
    const corr = QUESTIONS[3].answers[idx].correction || {};
    setFormatScores(corr);
    setStep("contacts");
  };

  const handleContacts = () => {
    const id = calcResult(ageAllowed, multiScores, goalScores, formatScores);
    setResultId(id);
    setSubmitted(true);
    setStep("analyzing");
    setTimeout(() => setStep("result"), 2500);
  };

  const reset = () => {
    setStep("welcome");
    setAgeAllowed([]);
    setMultiSelected([]);
    setMultiScores([]);
    setGoalScores({});
    setFormatScores({});
    setName("");
    setPhone("");
    setSubmitted(false);
  };

  const shift = resultId ? SHIFTS[resultId] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 py-8">
      {/* Декор */}
      <div className="fixed top-8 left-8 text-5xl opacity-20 animate-bounce pointer-events-none">⭐</div>
      <div className="fixed top-16 right-12 text-4xl opacity-20 animate-pulse pointer-events-none">🌈</div>
      <div className="fixed bottom-12 left-16 text-4xl opacity-20 animate-bounce pointer-events-none" style={{ animationDelay: "0.5s" }}>🎪</div>
      <div className="fixed bottom-8 right-8 text-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: "1s" }}>🎨</div>

      <div className="w-full max-w-xl">
        {/* Прогресс-бар */}
        {currentStepNum > 0 && step !== "analyzing" && step !== "result" && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-amber-700 font-bold mb-2">
              <span>Вопрос {currentStepNum} из {totalSteps}</span>
              <span>Это займёт 90 секунд</span>
            </div>
            <div className="w-full bg-amber-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-camp-orange to-camp-yellow h-3 rounded-full transition-all duration-500"
                style={{ width: `${(currentStepNum / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">

          {/* === ЭКРАН 1: ПРИВЕТСТВИЕ === */}
          {step === "welcome" && (
            <div className="text-center">
              <div className="text-6xl mb-4">🏕️</div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
                ✨ Все программы авторские
              </div>
              <h1 className="font-fun text-3xl md:text-4xl text-foreground mb-4 leading-tight">
                Подберём идеальную летнюю смену за 90 секунд
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Ответьте на 5 простых вопросов — и мы порекомендуем программу, которая раскроет таланты вашего ребёнка и подарит лето без гаджетов.
              </p>
              <Button
                onClick={handleStart}
                className="w-full text-lg py-6 rounded-2xl camp-gradient text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Начать подбор →
              </Button>
              <p className="text-sm text-muted-foreground mt-3">Без спама, только польза</p>
            </div>
          )}

          {/* === ВОПРОС 1: ВОЗРАСТ === */}
          {step === "q1" && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-8 text-center">
                Сколько лет вашему ребёнку?
              </h2>
              <div className="flex flex-col gap-4">
                {QUESTIONS[0].answers.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => handleQ1(i)}
                    className="w-full text-left px-6 py-4 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-camp-orange hover:bg-orange-50 font-bold text-lg transition-all hover:scale-[1.02] hover:shadow-md"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* === ВОПРОС 2: ИНТЕРЕСЫ === */}
          {step === "q2" && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-2 text-center">
                Чем ваш ребёнок любит заниматься?
              </h2>
              <p className="text-center text-muted-foreground mb-6">Можно выбрать 1–2 варианта</p>
              <div className="flex flex-col gap-3">
                {QUESTIONS[1].answers.map((a, i) => {
                  const selected = multiSelected.includes(i);
                  return (
                    <button
                      key={i}
                      onClick={() => toggleMulti(i)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-semibold text-base transition-all hover:scale-[1.01] ${
                        selected
                          ? "border-camp-orange bg-orange-50 shadow-md"
                          : "border-amber-200 bg-amber-50 hover:border-amber-400"
                      }`}
                    >
                      <span className={`inline-block w-5 h-5 rounded-full border-2 mr-3 align-middle transition-all ${selected ? "bg-camp-orange border-camp-orange" : "border-amber-300"}`} />
                      {a.label}
                    </button>
                  );
                })}
              </div>
              <Button
                onClick={handleQ2Next}
                disabled={multiSelected.length === 0}
                className="w-full mt-6 text-lg py-6 rounded-2xl camp-gradient text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-40 disabled:scale-100"
              >
                Далее →
              </Button>
            </div>
          )}

          {/* === ВОПРОС 3: ЦЕЛИ === */}
          {step === "q3" && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-8 text-center">
                Что важнее всего в летнем отдыхе?
              </h2>
              <div className="flex flex-col gap-3">
                {QUESTIONS[2].answers.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => handleQ3(i)}
                    className="w-full text-left px-5 py-4 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-camp-orange hover:bg-orange-50 font-semibold text-base transition-all hover:scale-[1.02] hover:shadow-md"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* === ВОПРОС 4: ФОРМАТ === */}
          {step === "q4" && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-8 text-center">
                Какой формат занятий ближе ребёнку?
              </h2>
              <div className="flex flex-col gap-4">
                {QUESTIONS[3].answers.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => handleQ4(i)}
                    className="w-full text-left px-6 py-5 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-camp-orange hover:bg-orange-50 font-bold text-base transition-all hover:scale-[1.02] hover:shadow-md"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* === ЭКРАН 5: КОНТАКТЫ === */}
          {step === "contacts" && (
            <div>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🎉</div>
                <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-3">
                  Готово! Мы подобрали идеальную смену
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Куда отправить рекомендацию + бонус-чеклист<br />
                  <strong>«Как подготовить ребёнка к лагерю без стресса»?</strong>
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Имя родителя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-base py-5 rounded-2xl border-2 border-amber-200 focus:border-camp-orange"
                />
                <Input
                  placeholder="Телефон или WhatsApp"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-base py-5 rounded-2xl border-2 border-amber-200 focus:border-camp-orange"
                />
                <p className="text-xs text-muted-foreground text-center">Хочу получить подборку в течение 15 минут</p>
                <Button
                  onClick={handleContacts}
                  disabled={!name.trim() || !phone.trim()}
                  className="w-full text-lg py-6 rounded-2xl camp-gradient text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-40 disabled:scale-100"
                >
                  Получить рекомендацию →
                </Button>
                <p className="text-xs text-muted-foreground text-center">Без спама, только польза</p>
              </div>
            </div>
          )}

          {/* === АНАЛИЗ === */}
          {step === "analyzing" && (
            <div className="text-center py-8">
              <div className="text-6xl mb-6 animate-spin" style={{ animationDuration: "2s" }}>⚙️</div>
              <h2 className="font-fun text-2xl text-foreground mb-3">Анализируем ответы...</h2>
              <p className="text-muted-foreground">Подбираем идеальную программу для вашего ребёнка</p>
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-camp-orange animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* === РЕЗУЛЬТАТ === */}
          {step === "result" && shift && (
            <div>
              <div className={`bg-gradient-to-br ${shift.color} rounded-2xl p-6 text-white text-center mb-6`}>
                <div className="text-5xl mb-3">{shift.emoji}</div>
                <h2 className="font-fun text-2xl leading-tight">{shift.tagline}</h2>
              </div>

              <ul className="flex flex-col gap-3 mb-6">
                {shift.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 bg-amber-50 rounded-2xl px-4 py-3">
                    <span className="text-camp-orange font-bold mt-0.5">🔹</span>
                    <span className="text-sm font-semibold text-foreground">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl px-5 py-4 mb-6">
                <p className="text-sm font-bold text-amber-800">🎁 Бонус:</p>
                <p className="text-sm text-amber-700 mt-1">{shift.bonus}</p>
              </div>

              <Button className="w-full text-base py-6 rounded-2xl camp-gradient text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all mb-3">
                {shift.cta}
              </Button>

              <div className="text-center text-sm text-muted-foreground border-t border-amber-100 pt-4 mt-2">
                <p>Не уверены? Позвоните — поможем выбрать за 5 минут</p>
                <button
                  onClick={reset}
                  className="text-camp-orange font-bold underline mt-2 hover:opacity-70 transition-opacity"
                >
                  Пройти квиз заново
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Лого / подпись */}
        {step === "welcome" && (
          <p className="text-center text-muted-foreground text-sm mt-6">
            Детский лагерь «Карнавал» · Все программы авторские
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
