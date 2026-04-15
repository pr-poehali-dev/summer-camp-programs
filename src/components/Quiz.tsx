import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import func2url from "../../backend/func2url.json";

type Scores = Record<string, number>;

// --- Общий отзыв о лагере ---
const CAMP_REVIEW = "💬 Мама Марины (9 лет): «Дочь приходила домой счастливая каждый день. Педагоги внимательные, атмосфера тёплая — мы уже записались на вторую смену!»";

// --- Данные смен ---
const SHIFTS: Record<string, {
  title: string; emoji: string; tagline: string;
  bullets: string[]; bonus: string; cta: string; color: string;
}> = {
  "1": {
    title: "Сундук со сказками", emoji: "✨",
    tagline: "Вашему ребёнку подойдёт смена «Сундук со сказками»",
    bullets: [
      "Погрузится в волшебные миры и сыграет главную роль в спектакле",
      "Создаст свои сказочные артефакты на мастер-классах",
      "Научится говорить уверенно и работать в команде",
    ],
    bonus: "При записи до конца апреля — скидка 10% + личный «сказочный дневник» в подарок",
    cta: "Забронировать место", color: "from-purple-400 to-pink-400",
  },
  "2": {
    title: "Вкусные открытия", emoji: "🍳",
    tagline: "Вашему ребёнку подойдёт смена «Вкусные открытия»",
    bullets: [
      "Приготовит блюда из 5+ стран: от итальянской пасты до японских роллов",
      "Узнает традиции застолья и этикет разных культур",
      "Создаст свою первую кулинарную книгу",
    ],
    bonus: "При записи до конца апреля — бесплатный мастер-класс «Домашнее мороженое» для всей семьи",
    cta: "Забронировать место", color: "from-orange-400 to-yellow-400",
  },
  "3": {
    title: "Мульти-драйв", emoji: "🏴‍☠️",
    tagline: "Вашему ребёнку подойдёт смена «Мульти-драйв»",
    bullets: [
      "Станет пиратом в большом квесте с картой и сокровищами",
      "Побывает в мирах любимых мультфильмов",
      "Укрепит здоровье на море и в походах",
    ],
    bonus: "При записи до конца апреля — профессиональная фотосессия в пиратском стиле в подарок",
    cta: "Забронировать место", color: "from-red-400 to-orange-400",
  },
  "4": {
    title: "Поколение Альфа", emoji: "📱",
    tagline: "Вашему ребёнку подойдёт смена «Поколение Альфа»",
    bullets: [
      "Освоит основы ИИ и создаст своего первого чат-бота",
      "Научится фуд-фотографии и дизайну: заберёт домой футболку с авторским принтом",
      "Попробует себя в роли техно-творца: от неоновой вывески до парфюма",
    ],
    bonus: "При записи до конца апреля — доступ к закрытому уроку «Как монтировать видео как блогер»",
    cta: "Забронировать место", color: "from-blue-400 to-indigo-400",
  },
  "5": {
    title: "Есть ли жизнь на Марсе?", emoji: "🚀",
    tagline: "Вашему ребёнку подойдёт смена «Есть ли жизнь на Марсе?»",
    bullets: [
      "Соберёт работающую солнечную панель и умную сигнализацию",
      "Вырастит растение на гидропонике и создаст реалистичный шлем космонавта",
      "Снимет свой первый научно-фантастический ролик с использованием ИИ",
    ],
    bonus: "При записи до конца апреля — набор «Юный инженер» (гидропоника дома) в подарок",
    cta: "Забронировать место", color: "from-slate-500 to-blue-500",
  },
  "6": {
    title: "Кругосветка", emoji: "🌍",
    tagline: "Вашему ребёнку подойдёт смена «Кругосветка»",
    bullets: [
      "«Посетит» 7 стран: от Японии до Бразилии — через кухню, игры и традиции",
      "Научится готовить интернациональные блюда и заполнит «паспорт путешественника»",
      "Укрепит командный дух в квестах и вылазках на природу",
    ],
    bonus: "При записи до конца апреля — этно-набор для домашних экспериментов в подарок",
    cta: "Забронировать место", color: "from-green-400 to-teal-400",
  },
  "7": {
    title: "Невероятные открытия", emoji: "🔬",
    tagline: "Вашему ребёнку подойдёт смена «Невероятные открытия»",
    bullets: [
      "Проведёт 10+ зрелищных и безопасных опытов по физике и химии",
      "Поймёт, как работают законы природы, через игру и эксперимент",
      "Заберёт домой свой первый «лабораторный набор» для домашних открытий",
    ],
    bonus: "При записи до конца апреля — расширенный набор опытов + видео-инструкции",
    cta: "Забронировать место", color: "from-teal-400 to-cyan-400",
  },
};

// --- Подсчёт топ-3 результатов ---
function calcTopResults(
  ageAllowed: number[],
  durationAllowed: number[],
  scores: Scores
): string[] {
  const ageSet = new Set(ageAllowed.map(String));
  const durSet = new Set(durationAllowed.map(String));
  const allIds = ["1","2","3","4","5","6","7"];
  const candidates = allIds.filter(id => ageSet.has(id) && durSet.has(id));
  if (candidates.length === 0) return [ageAllowed[0]?.toString() ?? "1"];

  const sorted = [...candidates].sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0));
  return sorted.slice(0, 3);
}

function addScores(base: Scores, extra: Scores): Scores {
  const result = { ...base };
  Object.entries(extra).forEach(([k, v]) => {
    result[k] = (result[k] ?? 0) + v;
  });
  return result;
}

// --- Компонент ---
const Quiz = () => {
  const totalSteps = 10;
  const [step, setStep] = useState<number>(0); // 0=welcome, 1-9=questions, 10=contacts, 11=analyzing, 12=result

  // Накопленные данные
  const [ageAllowed, setAgeAllowed] = useState<number[]>([1,2,3,4,5,6,7]);
  const [durationAllowed, setDurationAllowed] = useState<number[]>([1,2,3,4,5,6,7]);
  const [scores, setScores] = useState<Scores>({});
  const [adaptationNote, setAdaptationNote] = useState<string>("");
  const [experienceNote, setExperienceNote] = useState<string>("");
  const [priorityNote, setPriorityNote] = useState<string>("");

  // Мультивыбор (вопросы 2 и 9)
  const [multiSelected, setMultiSelected] = useState<number[]>([]);

  // Контакты
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [resultIds, setResultIds] = useState<string[]>(["1"]);

  // Ответы для Telegram
  const [answerAge, setAnswerAge] = useState("");
  const [answerInterests, setAnswerInterests] = useState<string[]>([]);
  const [answerGoal, setAnswerGoal] = useState("");
  const [answerAdaptation, setAnswerAdaptation] = useState("");
  const [answerExperience, setAnswerExperience] = useState("");
  const [answerDuration, setAnswerDuration] = useState("");

  const handleStart = () => setStep(1);

  const applyScores = (extra: Scores) => setScores(prev => addScores(prev, extra));

  const nextStep = () => setStep(prev => prev + 1);

  // Q1: Возраст
  const handleQ1 = (idx: number) => {
    const map = [
      [1,2,3,6,7],
      [1,2,3,4,5,6,7],
      [4,5],
    ];
    const labels = ["7–9 лет", "10–12 лет", "13–14 лет"];
    setAgeAllowed(map[idx]);
    setAnswerAge(labels[idx]);
    nextStep();
  };

  // Q2: Интересы (мультивыбор)
  const q2Options = [
    { label: "🎭 Придумывать истории, играть в театр, рисовать", scores: {"1":2} },
    { label: "🍳 Готовить, пробовать новое, устраивать мини-праздники", scores: {"2":2,"6":2} },
    { label: "🏴‍☠️ Бегать, играть в приключения, искать «сокровища»", scores: {"3":2} },
    { label: "📱 Разбираться в гаджетах, снимать видео", scores: {"4":2} },
    { label: "🔬 Проводить опыты, задавать вопросы «как это работает?»", scores: {"5":2,"7":2} },
    { label: "🌍 Читать о других странах, мечтать о путешествиях", scores: {"6":2} },
  ];
  const toggleMulti = (idx: number) => {
    setMultiSelected(prev => {
      if (prev.includes(idx)) return prev.filter(i => i !== idx);
      if (prev.length >= 2) return prev;
      return [...prev, idx];
    });
  };
  const handleQ2Next = () => {
    multiSelected.forEach(idx => applyScores(q2Options[idx].scores));
    setAnswerInterests(multiSelected.map(i => q2Options[i].label.replace(/^.{2}\s/, "")));
    setMultiSelected([]);
    nextStep();
  };

  // Q3: Цели родителя
  const q3Options = [
    { label: "🧠 Развитие мышления, логики, научных навыков", scores: {"4":1,"5":1,"7":1} },
    { label: "🗣️ Уверенность, умение выступать, работать в команде", scores: {"1":1,"3":1,"4":1} },
    { label: "👐 Практический навык: готовить, снимать, создавать", scores: {"2":1,"4":1,"5":1} },
    { label: "🌿 Отдых от экрана, здоровье, активность на природе", scores: {"3":1,"6":1} },
    { label: "🎨 Творческая реализация, создание чего-то уникального", scores: {"1":1,"2":1,"4":1} },
  ];
  const handleQ3 = (idx: number) => {
    applyScores(q3Options[idx].scores);
    setAnswerGoal(q3Options[idx].label.replace(/^.{2}\s/, ""));
    nextStep();
  };

  // Q4: Формат
  const q4Options = [
    { label: "⚡ Активный: бег, квесты, походы, игры на свежем воздухе", scores: {"3":1,"5":1,"6":1} },
    { label: "🧩 Спокойный: мастер-классы, творчество, эксперименты", scores: {"1":1,"2":1,"4":1,"7":1} },
    { label: "🔄 Микс: хочу и побегать, и посидеть с интересным делом", scores: {} },
  ];
  const handleQ4 = (idx: number) => { applyScores(q4Options[idx].scores); nextStep(); };

  // Q5: Адаптация (тон)
  const q5Options = [
    { label: "😊 Быстро осваивается, легко знакомится", note: "легко знакомится и быстро осваивается" },
    { label: "🤔 Сначала наблюдает, потом включается", note: "сначала наблюдает, потом раскрывается", scores: {"1":1,"2":1,"6":1} },
    { label: "😰 Нуждается в поддержке, привыкает постепенно", note: "нуждается в мягкой поддержке", scores: {"1":1,"2":1,"6":1} },
  ];
  const handleQ5 = (idx: number) => {
    setAdaptationNote(q5Options[idx].note);
    setAnswerAdaptation(q5Options[idx].label.replace(/^.{2}\s/, ""));
    if (q5Options[idx].scores) applyScores(q5Options[idx].scores);
    nextStep();
  };

  // Q6: Социальность
  const q6Options = [
    { label: "👥 Любит работать в команде, играть с друзьями", scores: {"3":1,"4":1,"5":1,"6":1} },
    { label: "🧍 Предпочитает индивидуальные задания, творчество в своём темпе", scores: {"1":1,"2":1,"7":1} },
    { label: "🔄 И то, и другое — зависит от настроения", scores: {} },
  ];
  const handleQ6 = (idx: number) => { applyScores(q6Options[idx].scores); nextStep(); };

  // Q7: Опыт
  const q7Options = [
    { label: "✅ Да, и ему понравилось", note: "уже имеет опыт лагерей", scores: {"4":1,"5":1} },
    { label: "⚪ Да, но было сложно / не очень понравилось", note: "имел опыт, но нужна особая поддержка", scores: {"1":1,"2":1,"3":1} },
    { label: "❌ Нет, это будет первый опыт", note: "едет в лагерь впервые", scores: {"1":1,"2":1,"3":1} },
  ];
  const handleQ7 = (idx: number) => {
    setExperienceNote(q7Options[idx].note);
    setAnswerExperience(q7Options[idx].label.replace(/^.{2}\s/, ""));
    applyScores(q7Options[idx].scores);
    nextStep();
  };

  // Q8: Длительность
  const durationLabels = ["1 неделя", "2 недели", "Не решил(а)"];
  const handleQ8 = (idx: number) => {
    if (idx === 0) setDurationAllowed([7]);
    else if (idx === 1) setDurationAllowed([1,2,3,4,5,6]);
    else setDurationAllowed([1,2,3,4,5,6,7]);
    setAnswerDuration(durationLabels[idx]);
    nextStep();
  };

  // Q9: Приоритеты родителя (мультивыбор)
  const q9Options = [
    { label: "🔒 Безопасность и контроль" },
    { label: "🍎 Качественное питание" },
    { label: "🧑‍🏫 Квалифицированные педагоги/вожатые" },
    { label: "🚌 Трансфер и выезды на море" },
    { label: "📱 Фото/видео-отчёты для родителей" },
  ];
  const handleQ9Next = () => {
    const labels = multiSelected.map(i => q9Options[i].label.replace(/^.{2}\s/, ""));
    setPriorityNote(labels.join(", ") || "");
    setMultiSelected([]);
    setStep(10);
  };

  // Q10: Контакты
  const handleContacts = async () => {
    const ids = calcTopResults(ageAllowed, durationAllowed, scores);
    setResultIds(ids);
    setStep(11);

    try {
      await fetch(func2url["send-lead"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          shift: ids.map(id => SHIFTS[id]?.title ?? id).join(", "),
          age: answerAge,
          interests: answerInterests.join(", "),
          goal: answerGoal,
          adaptation: answerAdaptation,
          experience: answerExperience,
          duration: answerDuration,
          priorities: priorityNote,
        }),
      });
    } catch (_e) { /* ignore */ }

    setTimeout(() => setStep(12), 2500);
  };

  const reset = () => {
    setStep(0);
    setAgeAllowed([1,2,3,4,5,6,7]);
    setDurationAllowed([1,2,3,4,5,6,7]);
    setScores({});
    setAdaptationNote("");
    setExperienceNote("");
    setPriorityNote("");
    setMultiSelected([]);
    setName("");
    setPhone("");
    setResultIds(["1"]);
    setAnswerAge("");
    setAnswerInterests([]);
    setAnswerGoal("");
    setAnswerAdaptation("");
    setAnswerExperience("");
    setAnswerDuration("");
  };

  // Прогресс
  const showProgress = step >= 1 && step <= 10;
  const progressStep = step <= 10 ? step : 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 py-8">
      <div className="fixed top-8 left-8 text-5xl opacity-20 animate-bounce pointer-events-none">⭐</div>
      <div className="fixed top-16 right-12 text-4xl opacity-20 animate-pulse pointer-events-none">🌈</div>
      <div className="fixed bottom-12 left-16 text-4xl opacity-20 animate-bounce pointer-events-none" style={{ animationDelay: "0.5s" }}>🎪</div>
      <div className="fixed bottom-8 right-8 text-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: "1s" }}>🎨</div>

      <div className="w-full max-w-xl">
        {/* Прогресс-бар */}
        {showProgress && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-amber-700 font-bold mb-2">
              <span>Вопрос {progressStep} из {totalSteps}</span>
              <span>Это займёт 2 минуты</span>
            </div>
            <div className="w-full bg-amber-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-camp-orange to-camp-yellow h-3 rounded-full transition-all duration-500"
                style={{ width: `${(progressStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">

          {/* === ПРИВЕТСТВИЕ === */}
          {step === 0 && (
            <div className="text-center">
              <div className="text-6xl mb-4">🏕️</div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
                ✨ Все программы авторские
              </div>
              <h1 className="font-fun text-3xl md:text-4xl text-foreground mb-4 leading-tight">
                Подберём идеальную летнюю смену за 2 минуты
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Ответьте на 10 простых вопросов — и мы порекомендуем программу, которая раскроет таланты вашего ребёнка, подарит лето без гаджетов и оставит только счастливые воспоминания.
              </p>
              <Button onClick={handleStart} className="w-full text-lg py-6 rounded-2xl camp-gradient text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                Начать подбор →
              </Button>
              <p className="text-sm text-muted-foreground mt-3">Без спама, только польза · Тест составлен профильными специалистами</p>
            </div>
          )}

          {/* === Q1: ВОЗРАСТ === */}
          {step === 1 && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-8 text-center">Сколько лет вашему ребёнку?</h2>
              <div className="flex flex-col gap-4">
                {["🟢 7–9 лет", "🟡 10–12 лет", "🔴 13–14 лет"].map((label, i) => (
                  <button key={i} onClick={() => handleQ1(i)}
                    className="w-full text-left px-6 py-4 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-camp-orange hover:bg-orange-50 font-bold text-lg transition-all hover:scale-[1.02] hover:shadow-md">
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* === Q2: ИНТЕРЕСЫ (мульти) === */}
          {step === 2 && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-2 text-center">Чем ваш ребёнок любит заниматься?</h2>
              <p className="text-center text-muted-foreground mb-6">Можно выбрать 1–2 варианта</p>
              <div className="flex flex-col gap-3">
                {q2Options.map((o, i) => {
                  const sel = multiSelected.includes(i);
                  return (
                    <button key={i} onClick={() => toggleMulti(i)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-semibold text-base transition-all hover:scale-[1.01] ${sel ? "border-camp-orange bg-orange-50 shadow-md" : "border-amber-200 bg-amber-50 hover:border-amber-400"}`}>
                      <span className={`inline-block w-5 h-5 rounded-full border-2 mr-3 align-middle transition-all ${sel ? "bg-camp-orange border-camp-orange" : "border-amber-300"}`} />
                      {o.label}
                    </button>
                  );
                })}
              </div>
              <Button onClick={handleQ2Next} disabled={multiSelected.length === 0}
                className="w-full mt-6 text-lg py-6 rounded-2xl camp-gradient text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-40 disabled:scale-100">
                Далее →
              </Button>
            </div>
          )}

          {/* === Q3: ЦЕЛИ === */}
          {step === 3 && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-8 text-center">Что важнее всего в летнем отдыхе?</h2>
              <div className="flex flex-col gap-3">
                {q3Options.map((o, i) => (
                  <button key={i} onClick={() => handleQ3(i)}
                    className="w-full text-left px-5 py-4 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-camp-orange hover:bg-orange-50 font-semibold text-base transition-all hover:scale-[1.02] hover:shadow-md">
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* === Q4: ФОРМАТ === */}
          {step === 4 && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-8 text-center">Какой формат занятий ближе ребёнку?</h2>
              <div className="flex flex-col gap-4">
                {q4Options.map((o, i) => (
                  <button key={i} onClick={() => handleQ4(i)}
                    className="w-full text-left px-6 py-5 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-camp-orange hover:bg-orange-50 font-bold text-base transition-all hover:scale-[1.02] hover:shadow-md">
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* === Q5: АДАПТАЦИЯ === */}
          {step === 5 && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-8 text-center">Как ваш ребёнок ведёт себя в новой обстановке?</h2>
              <div className="flex flex-col gap-4">
                {q5Options.map((o, i) => (
                  <button key={i} onClick={() => handleQ5(i)}
                    className="w-full text-left px-6 py-5 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-camp-orange hover:bg-orange-50 font-bold text-base transition-all hover:scale-[1.02] hover:shadow-md">
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* === Q6: СОЦИАЛЬНОСТЬ === */}
          {step === 6 && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-8 text-center">Ваш ребёнок чаще...</h2>
              <div className="flex flex-col gap-4">
                {q6Options.map((o, i) => (
                  <button key={i} onClick={() => handleQ6(i)}
                    className="w-full text-left px-6 py-5 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-camp-orange hover:bg-orange-50 font-bold text-base transition-all hover:scale-[1.02] hover:shadow-md">
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* === Q7: ОПЫТ === */}
          {step === 7 && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-8 text-center">Был ли ваш ребёнок раньше в летних лагерях?</h2>
              <div className="flex flex-col gap-4">
                {q7Options.map((o, i) => (
                  <button key={i} onClick={() => handleQ7(i)}
                    className="w-full text-left px-6 py-5 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-camp-orange hover:bg-orange-50 font-bold text-base transition-all hover:scale-[1.02] hover:shadow-md">
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* === Q8: ДЛИТЕЛЬНОСТЬ === */}
          {step === 8 && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-8 text-center">На какой срок вы рассматриваете лагерь?</h2>
              <div className="flex flex-col gap-4">
                {["🗓️ 1 неделя (короткий интенсив)", "🗓️🗓️ 2 недели (полноценная смена)", "🤔 Пока не решил(а), хочу посмотреть варианты"].map((label, i) => (
                  <button key={i} onClick={() => handleQ8(i)}
                    className="w-full text-left px-6 py-5 rounded-2xl border-2 border-amber-200 bg-amber-50 hover:border-camp-orange hover:bg-orange-50 font-bold text-base transition-all hover:scale-[1.02] hover:shadow-md">
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* === Q9: ПРИОРИТЕТЫ (мульти) === */}
          {step === 9 && (
            <div>
              <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-2 text-center">Что для вас критично при выборе лагеря?</h2>
              <p className="text-center text-muted-foreground mb-6">Можно выбрать 1–2 варианта</p>
              <div className="flex flex-col gap-3">
                {q9Options.map((o, i) => {
                  const sel = multiSelected.includes(i);
                  return (
                    <button key={i} onClick={() => toggleMulti(i)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-semibold text-base transition-all hover:scale-[1.01] ${sel ? "border-camp-orange bg-orange-50 shadow-md" : "border-amber-200 bg-amber-50 hover:border-amber-400"}`}>
                      <span className={`inline-block w-5 h-5 rounded-full border-2 mr-3 align-middle transition-all ${sel ? "bg-camp-orange border-camp-orange" : "border-amber-300"}`} />
                      {o.label}
                    </button>
                  );
                })}
              </div>
              <Button onClick={handleQ9Next} disabled={multiSelected.length === 0}
                className="w-full mt-6 text-lg py-6 rounded-2xl camp-gradient text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-40 disabled:scale-100">
                Далее →
              </Button>
            </div>
          )}

          {/* === Q10: КОНТАКТЫ === */}
          {step === 10 && (
            <div>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🎉</div>
                <h2 className="font-fun text-2xl md:text-3xl text-foreground mb-3">Готово! Мы проанализировали ответы</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Куда отправить рекомендацию + бонус-чеклист<br />
                  <strong>«Как подготовить ребёнка к лагерю без стресса»?</strong>
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Input placeholder="Имя родителя" value={name} onChange={e => setName(e.target.value)}
                  className="text-base py-5 rounded-2xl border-2 border-amber-200 focus:border-camp-orange" />
                <Input placeholder="Телефон или WhatsApp" value={phone} onChange={e => setPhone(e.target.value)}
                  className="text-base py-5 rounded-2xl border-2 border-amber-200 focus:border-camp-orange" />
                <p className="text-xs text-muted-foreground text-center">Хочу получить подборку в течение 15 минут</p>
                <Button onClick={handleContacts} disabled={!name.trim() || !phone.trim()}
                  className="w-full text-lg py-6 rounded-2xl camp-gradient text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-40 disabled:scale-100">
                  Получить рекомендацию →
                </Button>
                <p className="text-xs text-muted-foreground text-center">Без спама, только польза</p>
              </div>
            </div>
          )}

          {/* === АНАЛИЗ === */}
          {step === 11 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-6 animate-spin" style={{ animationDuration: "2s" }}>⚙️</div>
              <h2 className="font-fun text-2xl text-foreground mb-3">Анализируем ваши ответы...</h2>
              <p className="text-muted-foreground">Подбираем идеальную программу для вашего ребёнка</p>
              <div className="flex justify-center gap-2 mt-6">
                {[0,1,2].map(i => (
                  <div key={i} className="w-3 h-3 rounded-full bg-camp-orange animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}

          {/* === РЕЗУЛЬТАТ === */}
          {step === 12 && resultIds.length > 0 && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🎯</div>
                <h2 className="font-fun text-2xl text-foreground">Вот подходящие смены для вашего ребёнка</h2>
                {(adaptationNote || experienceNote) && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Учли, что ребёнок <strong>{adaptationNote}</strong>{experienceNote ? ` и ${experienceNote}` : ""}
                  </p>
                )}
              </div>

              {/* Карточки смен */}
              <div className="flex flex-col gap-6 mb-5">
                {resultIds.map((id, index) => {
                  const s = SHIFTS[id];
                  if (!s) return null;
                  return (
                    <div key={id} className="border-2 border-amber-100 rounded-2xl overflow-hidden">
                      {/* Шапка */}
                      <div className={`bg-gradient-to-br ${s.color} px-5 py-4 text-white flex items-center gap-3`}>
                        <span className="text-3xl">{s.emoji}</span>
                        <div>
                          {index === 0 && <span className="text-xs font-bold bg-white/30 px-2 py-0.5 rounded-full mr-2">⭐ Лучшее совпадение</span>}
                          <p className="font-fun text-lg leading-tight mt-0.5">«{s.title}»</p>
                        </div>
                      </div>
                      {/* Тело */}
                      <div className="px-5 py-4 bg-white">
                        <ul className="flex flex-col gap-2 mb-3">
                          {s.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                              <span className="text-camp-orange mt-0.5">🔹</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-yellow-50 rounded-xl px-4 py-2 mb-3">
                          <p className="text-xs font-bold text-amber-800">🎁 {s.bonus}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <a href="https://max.ru/u/f9LHodD0cOLgRCCJZdRIIi-mKN9GJ4AzcemdK-B6zr2HQZNi5uqb0TYzEe8"
                            target="_blank" rel="noopener noreferrer"
                            className="w-full text-sm py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-bold transition-all flex items-center justify-center gap-2">
                            💬 {s.cta} в Макс
                          </a>
                          <a href="https://t.me/+79881521698"
                            target="_blank" rel="noopener noreferrer"
                            className="w-full text-sm py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all flex items-center justify-center gap-2">
                            ✈️ {s.cta} в Telegram
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {priorityNote && (
                <div className="bg-green-50 border-2 border-green-100 rounded-2xl px-5 py-3 mb-4 text-sm text-green-800">
                  Для нас <strong>{priorityNote}</strong> — один из главных приоритетов в каждой смене.
                </div>
              )}

              {/* Общий отзыв о лагере */}
              <div className="bg-gray-50 rounded-2xl px-5 py-3 mb-5 text-sm text-gray-600 italic">{CAMP_REVIEW}</div>

              {/* Блок «несколько смен» */}
              {resultIds.length > 1 && (
                <div className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl px-6 py-5 mb-5 text-white text-center shadow-lg">
                  <p className="font-fun text-xl mb-1">Запишитесь на 2+ смены — и получите скидку!</p>
                  <p className="text-sm opacity-90 mb-4">Уточните условия у менеджера при записи</p>
                  <div className="flex flex-col gap-2">
                    <a href="https://max.ru/u/f9LHodD0cOLgRCCJZdRIIi-mKN9GJ4AzcemdK-B6zr2HQZNi5uqb0TYzEe8"
                      target="_blank" rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-white text-orange-500 font-bold text-sm hover:bg-orange-50 transition-all flex items-center justify-center gap-2">
                      💬 Записаться на несколько смен в Макс
                    </a>
                    <a href="https://t.me/+79881521698"
                      target="_blank" rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm transition-all flex items-center justify-center gap-2">
                      ✈️ Записаться на несколько смен в Telegram
                    </a>
                  </div>
                </div>
              )}

              <div className="text-center text-sm text-muted-foreground border-t border-amber-100 pt-4 mt-2">
                <p>Не уверены? Позвоните — поможем выбрать за 5 минут</p>
                <button onClick={reset}
                  className="text-camp-orange font-bold underline mt-2 hover:opacity-70 transition-opacity">
                  Пройти квиз заново
                </button>
              </div>
            </div>
          )}

        </div>

        {step === 0 && (
          <p className="text-center text-muted-foreground text-sm mt-6">
            Детский лагерь «Карнавал» · Все программы авторские
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;