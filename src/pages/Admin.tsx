import { useEffect, useState } from "react";
import func2url from "../../backend/func2url.json";

interface Lead {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  shift: string;
  age: string;
  interests: string;
  goal: string;
  adaptation: string;
  experience: string;
  duration: string;
  priorities: string;
}

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(func2url["get-leads"])
      .then((r) => r.json())
      .then((data) => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        setLeads(parsed.leads || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = leads.filter(
    (l) =>
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.includes(search) ||
      l.shift?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Заявки из квиза</h1>
            <p className="text-gray-500 text-sm mt-1">
              {loading ? "Загрузка..." : `Всего заявок: ${leads.length}`}
            </p>
          </div>
          <input
            type="text"
            placeholder="Поиск по имени, телефону или смене..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Загружаем данные...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            {leads.length === 0 ? "Заявок пока нет" : "Ничего не найдено"}
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
              >
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-lg font-semibold text-gray-900">
                      {lead.name || "—"}
                    </span>
                    <span className="ml-3 text-blue-600 font-medium">{lead.phone || "—"}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {lead.shift && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                        {lead.shift}
                      </span>
                    )}
                    <span className="text-gray-400 text-sm">{formatDate(lead.created_at)}</span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                  {lead.age && (
                    <div>
                      <span className="text-gray-400">Возраст: </span>
                      {lead.age}
                    </div>
                  )}
                  {lead.duration && (
                    <div>
                      <span className="text-gray-400">Длительность: </span>
                      {lead.duration}
                    </div>
                  )}
                  {lead.goal && (
                    <div>
                      <span className="text-gray-400">Цель: </span>
                      {lead.goal}
                    </div>
                  )}
                  {lead.interests && (
                    <div className="col-span-2 sm:col-span-3">
                      <span className="text-gray-400">Интересы: </span>
                      {lead.interests}
                    </div>
                  )}
                  {lead.adaptation && (
                    <div>
                      <span className="text-gray-400">Адаптация: </span>
                      {lead.adaptation}
                    </div>
                  )}
                  {lead.experience && (
                    <div>
                      <span className="text-gray-400">Опыт: </span>
                      {lead.experience}
                    </div>
                  )}
                  {lead.priorities && (
                    <div className="col-span-2 sm:col-span-3">
                      <span className="text-gray-400">Приоритеты: </span>
                      {lead.priorities}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
