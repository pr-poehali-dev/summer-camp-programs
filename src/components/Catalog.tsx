import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const programs = [
  {
    id: 1,
    title: "Приключения в джунглях",
    description: "Тематическая программа на 21 день с квестами, ролевыми играми и творческими заданиями. Подходит для детей 8–12 лет.",
    age: "8–12 лет",
    days: "21 день",
    price: 1990,
    oldPrice: 2990,
    tag: "Хит продаж",
    tagColor: "bg-camp-orange",
    emoji: "🌴",
    includes: ["Сценарий открытия/закрытия", "21 план дня", "30 игр и конкурсов"],
    image: "https://cdn.poehali.dev/projects/104424ad-fd87-4432-9d24-01f5cfd1ed69/files/9b504cd8-baab-41a5-b935-bcb7141c7ddd.jpg",
  },
  {
    id: 2,
    title: "Космическое путешествие",
    description: "Увлекательная космическая тема для смены: планеты, звёзды, астронавты. Викторины, поделки, спортивные игры.",
    age: "6–10 лет",
    days: "14 дней",
    price: 1490,
    oldPrice: null,
    tag: "Новинка",
    tagColor: "bg-camp-purple",
    emoji: "🚀",
    includes: ["Тематические декорации", "14 детальных планов", "Сценарий праздника"],
    image: "https://cdn.poehali.dev/projects/104424ad-fd87-4432-9d24-01f5cfd1ed69/files/ebe02112-2efd-4e06-a3c7-395761cc2469.jpg",
  },
  {
    id: 3,
    title: "Олимпийские игры",
    description: "Спортивная тематика с состязаниями, командными играми, церемониями открытия и закрытия. Для активных ребят.",
    age: "10–16 лет",
    days: "7 дней",
    price: 990,
    oldPrice: null,
    tag: null,
    tagColor: "",
    emoji: "🏆",
    includes: ["Правила 15 видов спорта", "Таблицы результатов", "Сценарий награждения"],
    image: "https://cdn.poehali.dev/projects/104424ad-fd87-4432-9d24-01f5cfd1ed69/files/e6b20d69-3c49-413e-ac4c-6bc0c6d9e8d1.jpg",
  },
  {
    id: 4,
    title: "Творческая мастерская",
    description: "Арт-программа: рисование, лепка, театр, музыка. Развивает творческое мышление и командную работу.",
    age: "7–14 лет",
    days: "14 дней",
    price: 1290,
    oldPrice: 1890,
    tag: "Скидка 32%",
    tagColor: "bg-camp-green",
    emoji: "🎨",
    includes: ["50+ творческих заданий", "Планы мастер-классов", "Итоговый концерт"],
    image: "https://cdn.poehali.dev/projects/104424ad-fd87-4432-9d24-01f5cfd1ed69/files/9b504cd8-baab-41a5-b935-bcb7141c7ddd.jpg",
  },
  {
    id: 5,
    title: "Мир природы",
    description: "Экологическая программа: изучение природы, походы, наблюдения. Воспитывает бережное отношение к окружающей среде.",
    age: "8–13 лет",
    days: "21 день",
    price: 1990,
    oldPrice: null,
    tag: null,
    tagColor: "",
    emoji: "🌿",
    includes: ["Экологические квесты", "Полевой дневник", "Сценарий эко-праздника"],
    image: "https://cdn.poehali.dev/projects/104424ad-fd87-4432-9d24-01f5cfd1ed69/files/ebe02112-2efd-4e06-a3c7-395761cc2469.jpg",
  },
  {
    id: 6,
    title: "Пираты Карибского моря",
    description: "Захватывающая пиратская тема с картами сокровищ, морскими сражениями и поиском кладов. Дети в восторге!",
    age: "7–12 лет",
    days: "14 дней",
    price: 1690,
    oldPrice: 2190,
    tag: "Популярное",
    tagColor: "bg-camp-blue",
    emoji: "🏴‍☠️",
    includes: ["Карты-задания", "Костюмированный квест", "Морские игры"],
    image: "https://cdn.poehali.dev/projects/104424ad-fd87-4432-9d24-01f5cfd1ed69/files/e6b20d69-3c49-413e-ac4c-6bc0c6d9e8d1.jpg",
  },
];

const Catalog = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="catalog" className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border-2 border-camp-orange/30 px-4 py-2 rounded-full text-sm font-bold mb-4 text-camp-orange">
            <span>📦</span> Каталог программ
          </div>
          <h2 className="font-fun text-4xl text-foreground mb-4">Выберите программу для лагеря</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Каждая программа — это полный пакет материалов для успешной смены
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md card-hover border border-border"
            >
              <div className="relative">
                <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-3 left-3 text-4xl">{p.emoji}</div>
                {p.tag && (
                  <Badge className={`absolute top-3 right-3 ${p.tagColor} text-white border-0 font-bold`}>
                    {p.tag}
                  </Badge>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-fun text-xl text-foreground mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{p.description}</p>

                <div className="flex gap-3 mb-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-3 py-1">
                    <Icon name="Users" size={12} />
                    {p.age}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-3 py-1">
                    <Icon name="Calendar" size={12} />
                    {p.days}
                  </div>
                </div>

                <div className="space-y-1 mb-5">
                  {p.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-foreground">
                      <Icon name="Check" size={14} className="text-camp-green flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-fun text-2xl text-camp-orange">{p.price}₽</span>
                    {p.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">{p.oldPrice}₽</span>
                    )}
                  </div>
                  <Button
                    className="bg-camp-orange hover:bg-orange-500 text-white font-bold rounded-full"
                    onClick={() => setSelected(p.id)}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-1" />
                    Купить
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-fun text-2xl text-foreground mb-2">Отличный выбор!</h3>
                <p className="text-muted-foreground mb-6">
                  Для оформления заказа свяжитесь с нами — мы поможем с оплатой и доставкой.
                </p>
                <div className="flex flex-col gap-3">
                  <Button
                    className="bg-camp-orange hover:bg-orange-500 text-white font-bold rounded-full"
                    onClick={() => {
                      setSelected(null);
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Написать нам
                  </Button>
                  <Button variant="outline" className="rounded-full" onClick={() => setSelected(null)}>
                    Продолжить просмотр
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
