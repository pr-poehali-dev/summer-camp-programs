import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm border-b-2 border-camp-yellow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("hero")}>
          <span className="text-3xl">⛺</span>
          <span className="font-fun text-2xl text-camp-orange">ЛагерьПро</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollTo("catalog")} className="font-semibold text-foreground hover:text-camp-orange transition-colors">
            Программы
          </button>
          <button onClick={() => scrollTo("reviews")} className="font-semibold text-foreground hover:text-camp-orange transition-colors">
            Отзывы
          </button>
          <button onClick={() => scrollTo("contact")} className="font-semibold text-foreground hover:text-camp-orange transition-colors">
            Контакты
          </button>
          <Button
            onClick={() => scrollTo("catalog")}
            className="bg-camp-orange hover:bg-orange-500 text-white font-bold rounded-full px-6"
          >
            Выбрать программу
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Icon name={isOpen ? "X" : "Menu"} size={28} />
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-4">
          <button onClick={() => scrollTo("catalog")} className="font-semibold text-left hover:text-camp-orange transition-colors">
            Программы
          </button>
          <button onClick={() => scrollTo("reviews")} className="font-semibold text-left hover:text-camp-orange transition-colors">
            Отзывы
          </button>
          <button onClick={() => scrollTo("contact")} className="font-semibold text-left hover:text-camp-orange transition-colors">
            Контакты
          </button>
          <Button
            onClick={() => scrollTo("catalog")}
            className="bg-camp-orange hover:bg-orange-500 text-white font-bold rounded-full w-full"
          >
            Выбрать программу
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
