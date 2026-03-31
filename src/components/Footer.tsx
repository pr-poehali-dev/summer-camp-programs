const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">⛺</span>
              <span className="font-fun text-2xl text-camp-yellow">ЛагерьПро</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Готовые программы для летних лагерей. Помогаем вожатым и организаторам создавать незабываемые смены.
            </p>
          </div>

          <div>
            <h4 className="font-fun text-lg text-camp-yellow mb-4">Программы</h4>
            <div className="space-y-2 text-sm text-white/60">
              <div>Приключения в джунглях</div>
              <div>Космическое путешествие</div>
              <div>Олимпийские игры</div>
              <div>Творческая мастерская</div>
              <button onClick={() => scrollTo("catalog")} className="text-camp-orange hover:text-orange-400 transition-colors font-semibold">
                Смотреть все →
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-fun text-lg text-camp-yellow mb-4">Контакты</h4>
            <div className="space-y-2 text-sm text-white/60">
              <div>📧 info@lagerpro.ru</div>
              <div>📞 +7 (800) 123-45-67</div>
              <div>💬 @lagerpro в Telegram</div>
              <div className="pt-2">Пн–Пт: 9:00–18:00</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/40 text-sm">
            © 2024 ЛагерьПро. Все права защищены.
          </div>
          <div className="flex gap-4 text-sm text-white/40">
            <span className="hover:text-white/70 cursor-pointer transition-colors">Политика конфиденциальности</span>
            <span className="hover:text-white/70 cursor-pointer transition-colors">Оферта</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
