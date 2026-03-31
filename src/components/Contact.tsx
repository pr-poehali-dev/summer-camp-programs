import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border-2 border-camp-purple/30 px-4 py-2 rounded-full text-sm font-bold mb-6 text-camp-purple">
              <span>💬</span> Связаться с нами
            </div>
            <h2 className="font-fun text-4xl text-foreground mb-4">Остались вопросы?</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Напишите нам — расскажем подробнее о программах, поможем выбрать подходящую для вашего лагеря и ответим на любые вопросы.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-camp-orange/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={22} className="text-camp-orange" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                  <div className="text-muted-foreground text-sm">info@lagerpro.ru</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-camp-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={22} className="text-camp-green" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Телефон</div>
                  <div className="text-muted-foreground text-sm">+7 (800) 123-45-67</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-camp-purple/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon name="MessageCircle" size={22} className="text-camp-purple" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Telegram</div>
                  <div className="text-muted-foreground text-sm">@lagerpro</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-border">
            {sent ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="font-fun text-2xl text-foreground mb-2">Сообщение отправлено!</h3>
                <p className="text-muted-foreground">
                  Мы свяжемся с вами в течение 24 часов
                </p>
                <Button
                  className="mt-6 bg-camp-orange hover:bg-orange-500 text-white font-bold rounded-full"
                  onClick={() => setSent(false)}
                >
                  Написать ещё раз
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-fun text-2xl text-foreground mb-6">Напишите нам</h3>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">Ваше имя *</label>
                  <Input
                    placeholder="Как вас зовут?"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="rounded-xl border-2 focus:border-camp-orange"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">Телефон или email *</label>
                  <Input
                    placeholder="Как с вами связаться?"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="rounded-xl border-2 focus:border-camp-orange"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-1 block">Сообщение</label>
                  <Textarea
                    placeholder="Расскажите о вашем лагере или задайте вопрос..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="rounded-xl border-2 focus:border-camp-orange resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-camp-orange hover:bg-orange-500 text-white font-bold rounded-full py-6 text-base"
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить сообщение
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
