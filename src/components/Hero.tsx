import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16 md:py-24">
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">⭐</div>
      <div className="absolute top-20 right-20 text-5xl opacity-20 animate-pulse">🌈</div>
      <div className="absolute bottom-10 left-1/4 text-5xl opacity-20 animate-bounce" style={{ animationDelay: "0.5s" }}>🎪</div>
      <div className="absolute bottom-20 right-10 text-4xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}>🎨</div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-camp-yellow/60 text-amber-900 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              <span>✨</span> Все программы авторские
            </div>
            <h1 className="font-fun text-5xl md:text-6xl text-foreground leading-tight mb-6 text-shadow-fun">
              Готовые программы для{" "}
              <span className="text-camp-orange">летнего лагеря</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Сценарии, планы мероприятий, игры и конкурсы — всё что нужно вожатым и организаторам. 
              Скачай и используй уже сегодня!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollTo("catalog")}
                className="bg-camp-orange hover:bg-orange-500 text-white font-bold rounded-full text-lg px-8 py-6 shadow-lg shadow-orange-200"
              >
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("reviews")}
                className="border-2 border-camp-green text-camp-green hover:bg-camp-green hover:text-white font-bold rounded-full text-lg px-8 py-6"
              >
                <Icon name="Star" size={20} className="mr-2" />
                Отзывы клиентов
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 mt-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-camp-orange/10 rounded-full flex items-center justify-center">
                  <Icon name="Download" size={20} className="text-camp-orange" />
                </div>
                <div>
                  <div className="font-bold text-foreground">500+</div>
                  <div className="text-xs text-muted-foreground">продаж</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-camp-green/10 rounded-full flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-camp-green" />
                </div>
                <div>
                  <div className="font-bold text-foreground">200+</div>
                  <div className="text-xs text-muted-foreground">лагерей</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-camp-purple/10 rounded-full flex items-center justify-center">
                  <Icon name="Star" size={20} className="text-camp-purple" />
                </div>
                <div>
                  <div className="font-bold text-foreground">4.9 / 5</div>
                  <div className="text-xs text-muted-foreground">оценка</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://cdn.poehali.dev/projects/104424ad-fd87-4432-9d24-01f5cfd1ed69/files/9b504cd8-baab-41a5-b935-bcb7141c7ddd.jpg"
                alt="Летний лагерь"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border-2 border-camp-yellow">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <div>
                  <div className="font-bold text-sm text-foreground">Мгновенная доставка</div>
                  <div className="text-xs text-muted-foreground">Скачай сразу после оплаты</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-camp-orange rounded-2xl p-4 shadow-xl text-white">
              <div className="font-fun text-2xl">от 990₽</div>
              <div className="text-xs opacity-90">за программу</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;