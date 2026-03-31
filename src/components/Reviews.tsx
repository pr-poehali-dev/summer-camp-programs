import Icon from "@/components/ui/icon";

const reviews = [
  {
    name: "Анна Петрова",
    role: "Старший вожатый, лагерь «Берёзка»",
    text: "Программа «Приключения в джунглях» стала настоящим спасением! Дети были в восторге каждый день. Всё чётко расписано, ничего не нужно придумывать с нуля.",
    rating: 5,
    avatar: "👩‍🦰",
    camp: "Московская обл.",
  },
  {
    name: "Дмитрий Козлов",
    role: "Директор лагеря «Орлёнок»",
    text: "Использовали пиратскую программу уже третий год подряд. Каждый раз адаптируем под новых детей — материалов хватает с запасом. Покупка полностью окупилась!",
    rating: 5,
    avatar: "👨‍💼",
    camp: "Краснодарский край",
  },
  {
    name: "Марина Соколова",
    role: "Педагог-организатор",
    text: "Купила сразу три программы для разных возрастных групп. Качество материалов очень высокое, всё продумано до мелочей. Рекомендую коллегам!",
    rating: 5,
    avatar: "👩‍🏫",
    camp: "Санкт-Петербург",
  },
  {
    name: "Игорь Смирнов",
    role: "Вожатый-новичок",
    text: "Первая смена была бы очень сложной без этих программ. Подробные планы помогли мне не растеряться и провести смену на отлично. Спасибо огромное!",
    rating: 5,
    avatar: "👨‍🎓",
    camp: "Екатеринбург",
  },
  {
    name: "Светлана Иванова",
    role: "Методист по воспитательной работе",
    text: "Экологическая программа идеально вписалась в концепцию нашего лагеря. Дети стали внимательнее относиться к природе. Педагогически грамотный материал.",
    rating: 5,
    avatar: "👩‍💻",
    camp: "Новосибирск",
  },
  {
    name: "Алексей Новиков",
    role: "Руководитель летней смены",
    text: "Творческая мастерская — находка для нашего арт-лагеря. 50 заданий — это огромный выбор. Дети творили каждый день и не хотели уходить домой!",
    rating: 5,
    avatar: "👨‍🎨",
    camp: "Казань",
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Icon key={i} name="Star" size={16} className="text-camp-yellow fill-camp-yellow" />
    ))}
  </div>
);

const Reviews = () => {
  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-50 border-2 border-camp-yellow/50 px-4 py-2 rounded-full text-sm font-bold mb-4 text-amber-700">
            <span>⭐</span> Отзывы клиентов
          </div>
          <h2 className="font-fun text-4xl text-foreground mb-4">Что говорят вожатые</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Более 500 лагерей уже используют наши программы
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-orange-100">
              <Stars count={r.rating} />
              <p className="text-foreground mt-4 mb-6 leading-relaxed text-sm">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="text-3xl w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {r.avatar}
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                  <div className="text-xs text-camp-orange font-semibold mt-0.5">📍 {r.camp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-camp-orange to-camp-yellow rounded-3xl p-8 text-white text-center">
          <div className="font-fun text-4xl mb-2">4.9 из 5 ⭐</div>
          <div className="text-lg opacity-90 mb-1">средняя оценка программ</div>
          <div className="text-sm opacity-75">на основе 500+ отзывов покупателей</div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
