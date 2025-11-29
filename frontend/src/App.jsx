import React, { useState } from "react";

const initialVolunteers = [
  { id: 1, name: "Anna", participated: true },
  { id: 2, name: "Michał", participated: true },
  { id: 3, name: "Ola", participated: false },
  { id: 4, name: "Kuba", participated: true }
];

export default function App() {
  const [amountInput, setAmountInput] = useState("200");
  const [volunteerPercent, setVolunteerPercent] = useState(40);
  const [volunteers, setVolunteers] = useState(initialVolunteers);

  const totalAmount = Number(amountInput) > 0 ? Number(amountInput) : 0;
  const volunteersAmount = (totalAmount * volunteerPercent) / 100;
  const equipmentAmount = totalAmount - volunteersAmount;

  const participating = volunteers.filter(v => v.participated);
  const perVolunteer =
    participating.length > 0 ? volunteersAmount / participating.length : 0;

  function toggleVolunteer(id) {
    setVolunteers(prev =>
      prev.map(v =>
        v.id === id ? { ...v, participated: !v.participated } : v
      )
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="flex w-72 flex-col border-r border-slate-200 bg-white px-6 py-6 shadow-sm">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
            🤝
          </div>
          <span className="text-xl font-semibold text-slate-800">Helpi</span>
        </div>

        {/* Nav */}
        <nav className="space-y-2 text-sm">
          <SidebarItem label="Strona główna" icon="🏠" active />
          <SidebarItem label="Wpłaty" icon="💸" />
          <SidebarItem label="Wolontariusze" icon="👥" />
          <SidebarItem label="Raporty" icon="📊" />
        </nav>

        {/* CTA */}
        <div className="mt-auto rounded-2xl bg-emerald-50 p-4">
          <h3 className="mb-1 text-sm font-semibold text-emerald-900">
            Dlaczego Helpi
          </h3>
          <p className="text-xs text-emerald-900/80">
            Dla osób, które chcą pomagać, mają środki, ale brakuje im czasu.
            Ty wpłacasz, my organizujemy pomoc, a wolontariusze dostają
            dodatkową motywację.
          </p>
        </div>
      </aside>

      <main className="flex flex-1 flex-col px-8 py-6">
        {/* Topbar */}
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Helpi - wspólna pomoc
            </h1>
            <p className="mt-1 max-w-xl text-sm text-slate-500">
              Określ kwotę wpłaty i zdecyduj, jak podzielić ją między sprzęt
              oraz wsparcie finansowe dla wolontariuszy.
            </p>
          </div>
        </header>

        {/* Content */}
        <section className="grid flex-1 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* Left column */}
          <div className="space-y-6">
            <Card title="Twoja wpłata">
              <div className="space-y-6">
                {/* Kwota */}
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Kwota wpłaty
                  </span>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-emerald-500 focus-within:bg-white">
                    <span className="mr-2 text-xs font-semibold text-slate-500">
                      PLN
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={amountInput}
                      onChange={e => setAmountInput(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    Wpłata trafia do Helpi, aby sfinansować konkretne działania
                    pomocowe.
                  </p>
                </label>

                {/* Procent dla wolontariuszy */}
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Jaki procent dla wolontariuszy
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volunteerPercent}
                    onChange={e => setVolunteerPercent(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>0 proc. tylko sprzęt</span>
                    <span className="font-semibold text-slate-700">
                      {volunteerPercent} proc.
                    </span>
                    <span>100 proc. tylko wolontariusze</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Pozostała część kwoty zostanie przeznaczona na sprzęt
                    i materiały.
                  </p>
                </label>
              </div>
            </Card>

            <Card title="Jak działa podział">
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  Środki na sprzęt i materiały są używane do realizacji
                  konkretnych działań pomocowych.
                </li>
                <li>
                  Część przeznaczona dla wolontariuszy jest dzielona po równo
                  między osoby, które faktycznie brały udział w danej akcji.
                </li>
                <li>
                  Ma to działać jako zachęta, nie jako pełne wynagrodzenie.
                </li>
                <li>
                  Osoby wpłacające pomagają tym, którzy mają czas i chęć
                  działania, ale często brakuje im środków.
                </li>
              </ul>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <Card title="Podsumowanie podziału">
              <div className="grid gap-4 md:grid-cols-2">
                <SummaryTile
                  label="Całkowita wpłata"
                  value={totalAmount}
                  description="Kwota, którą przekazujesz przez Helpi."
                />
                <SummaryTile
                  label="Na sprzęt i materiały"
                  value={equipmentAmount}
                  description="Zakup narzędzi, materiałów, dojazdy, wynajem."
                />
                <SummaryTile
                  label="Na wolontariuszy"
                  value={volunteersAmount}
                  description="Dzielone po równo między aktywnych wolontariuszy."
                />
                <SummaryTile
                  label="Na osobę"
                  value={perVolunteer}
                  description="Kwota dla jednego wolontariusza biorącego udział."
                />
              </div>
            </Card>

            <Card title="Wolontariusze w akcji">
              <p className="mb-3 text-xs text-slate-500">
                Zaznacz, którzy wolontariusze uczestniczyli w danym działaniu.
                Tylko oni biorą udział w podziale kwoty.
              </p>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">
                        Imię
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">
                        Uczestniczył
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">
                        Szacowana wypłata
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {volunteers.map(v => (
                      <tr key={v.id}>
                        <td className="px-4 py-2 text-slate-700">{v.name}</td>
                        <td className="px-4 py-2">
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              checked={v.participated}
                              onChange={() => toggleVolunteer(v.id)}
                              className="peer sr-only"
                            />
                            <div className="h-5 w-9 rounded-full bg-slate-200 transition peer-checked:bg-emerald-500" />
                            <div className="pointer-events-none absolute left-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-4" />
                          </label>
                        </td>
                        <td className="px-4 py-2 text-slate-700">
                          {v.participated
                            ? `PLN ${perVolunteer.toFixed(2)}`
                            : "0"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

/* Helper components */

function SidebarItem({ label, icon, active }) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
        active
          ? "bg-emerald-500 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function Card({ title, children }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <header className="mb-4">
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
      </header>
      {children}
    </section>
  );
}

function SummaryTile({ label, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">
        PLN {value.toFixed(2)}
      </p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}
