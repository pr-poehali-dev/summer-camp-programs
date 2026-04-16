import { useEffect, useState } from "react";
import func2url from "../../backend/func2url.json";

const Footer = () => {
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    fetch(func2url["track-visit"])
      .then((r) => r.json())
      .then((data) => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        setVisitors(parsed.total ?? null);
      })
      .catch(() => {});
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐟</span>
              <span className="font-fun text-2xl text-camp-yellow">Рыбка Долли</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Готовые программы для летних лагерей. Помогаем вожатым и организаторам создавать незабываемые смены.
            </p>
          </div>

          <div>
            <h4 className="font-fun text-lg text-camp-yellow mb-4">Программы</h4>
            <div className="space-y-2 text-sm text-white/60">
              <div>Сундук со сказками</div>
              <div>Вкусные открытия</div>
              <div>Мульти-драйв</div>
              <div>Поколение Альфа</div>
              <div>Есть ли жизнь на Марсе?</div>
              <div>Кругосветка</div>
              <div>Невероятные открытия</div>
            </div>
          </div>

          <div>
            <h4 className="font-fun text-lg text-camp-yellow mb-4">Контакты</h4>
            <div className="space-y-2 text-sm text-white/60">
              <div>📧 ribkadolli@mail.ru</div>
              <div>📞 +7 988 152-16-98</div>
              <a href="https://vk.com/rybka_dolli" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">🔵 ВКонтакте</a>
              <div className="pt-2">Пн–Пт: 8:00–18:00</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-white/40 text-sm">
              © 2024 Рыбка Долли. Все права защищены.
            </div>
            {visitors !== null && (
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white/80">
                <span className="text-green-400 text-base">👁</span>
                <span><strong className="text-white">{visitors.toLocaleString("ru-RU")}</strong> посетителей</span>
              </div>
            )}
          </div>
          <div className="flex gap-4 text-sm text-white/40 items-center">
            <span className="hover:text-white/70 cursor-pointer transition-colors">Политика конфиденциальности</span>
            <span className="hover:text-white/70 cursor-pointer transition-colors">Оферта</span>
            <a href="/admin" className="hover:text-white transition-colors text-white font-semibold bg-white/15 border border-white/30 rounded-lg px-3 py-1.5">⚙ Админ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;