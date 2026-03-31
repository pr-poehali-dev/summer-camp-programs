const features = [
  {
    emoji: "📋",
    title: "Готовые сценарии",
    description: "Полные сценарии мероприятий с репликами, играми и конкурсами",
    color: "bg-orange-100 border-orange-200",
    textColor: "text-camp-orange",
  },
  {
    emoji: "🗓️",
    title: "Планы смен",
    description: "Подробное расписание на каждый день смены с учётом возраста детей",
    color: "bg-green-100 border-green-200",
    textColor: "text-camp-green",
  },
  {
    emoji: "🎮",
    title: "Игры и конкурсы",
    description: "Коллекции подвижных игр, викторин и творческих конкурсов",
    color: "bg-purple-100 border-purple-200",
    textColor: "text-camp-purple",
  },
  {
    emoji: "⚡",
    title: "Мгновенная загрузка",
    description: "PDF и Word-форматы доступны сразу после оплаты",
    color: "bg-blue-100 border-blue-200",
    textColor: "text-camp-blue",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-fun text-4xl text-foreground mb-4">Почему выбирают нас?</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Всё готово к использованию — просто скачайте и проводите незабываемые смены
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`${f.color} border-2 rounded-3xl p-6 card-hover`}
            >
              <div className="text-5xl mb-4">{f.emoji}</div>
              <h3 className={`font-fun text-xl ${f.textColor} mb-2`}>{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
