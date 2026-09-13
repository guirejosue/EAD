import { useState, useEffect } from "react";
import {
  Plus, Users, BarChart3, Calendar, ChevronRight, X, CheckCircle,
  ArrowLeft, Trash2, GripVertical, Check
} from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

type SurveyView = "list" | "create" | "questions" | "audience" | "results" | "detail";

const surveys = [
  { id: 1, title: "Vision 3R 2026 — Appropriation nationale", statut: "Actif", audience: "Tous les membres", participants: 1842, debut: "01/08/2026", fin: "30/09/2026", questions: 12 },
  { id: 2, title: "Fréquentation dominicale — Août 2026", statut: "Actif", audience: "Pasteurs", participants: 648, debut: "25/08/2026", fin: "10/09/2026", questions: 6 },
  { id: 3, title: "Évaluation formation pastorale", statut: "Clôturé", audience: "Responsables régionaux", participants: 13, debut: "01/07/2026", fin: "31/07/2026", questions: 18 },
  { id: 4, title: "Besoins en matériaux de construction", statut: "Brouillon", audience: "Église locale", participants: 0, debut: "", fin: "", questions: 8 },
  { id: 5, title: "Sondage annuel de satisfaction", statut: "Planifié", audience: "Tous les membres", participants: 0, debut: "01/10/2026", fin: "31/10/2026", questions: 15 },
];

const questionTypes = [
  { id: "single", label: "Choix unique", icon: "◉" },
  { id: "multiple", label: "Choix multiple", icon: "☑" },
  { id: "text", label: "Texte libre", icon: "✏" },
  { id: "scale", label: "Échelle 1–10", icon: "⚖" },
  { id: "yesno", label: "Oui / Non", icon: "✓✗" },
  { id: "rating", label: "Notation", icon: "★" },
];

const resultData = [
  { option: "Chaque semaine", count: 1284, pct: 69.7 },
  { option: "2–3 fois/mois", count: 342, pct: 18.6 },
  { option: "Une fois/mois", count: 142, pct: 7.7 },
  { option: "Rarement", count: 58, pct: 3.1 },
  { option: "Ne participe plus", count: 16, pct: 0.9 },
];

const COLORS = ["#0F78C8", "#0D67B0", "#C8973A", "#DC2626", "#94A3B8"];

const statusColors: Record<string, [string, string]> = {
  "Actif": ["badge-success", "#16A34A"],
  "Clôturé": ["badge-info", "#0D67B0"],
  "Brouillon": ["badge-warning", "#92400E"],
  "Planifié": ["badge-gold", "#9A6F22"],
};

export default function Surveys({ initialView }: { initialView?: string | null }) {
  const [view, setView] = useState<SurveyView>(
    (initialView && ["list", "create", "questions", "audience", "results", "detail"].includes(initialView))
      ? (initialView as SurveyView)
      : "list"
  );
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (initialView && ["list", "create", "questions", "audience", "results", "detail"].includes(initialView)) {
      setView(initialView as SurveyView);
      if (initialView === "create") setStep(1);
    }
  }, [initialView]);
  const [questions, setQuestions] = useState([
    { id: 1, text: "À quelle fréquence participez-vous aux activités de votre église ?", type: "single", required: true },
    { id: 2, text: "Comment évaluez-vous votre compréhension de la Vision 3R ?", type: "scale", required: true },
    { id: 3, text: "Quels aspects de la vision vous semblent les plus importants ?", type: "multiple", required: false },
  ]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>(["Tous les membres"]);

  const audiences = ["Grand Public", "Pasteurs", "Responsables régionaux", "Responsables de district", "Membres", "Responsables d'église locale"];

  const toggleAudience = (a: string) => {
    setSelectedAudiences(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  const steps = [
    { n: 1, label: "Informations" },
    { n: 2, label: "Questions" },
    { n: 3, label: "Audience" },
    { n: 4, label: "Publication" },
  ];

  return (
    <div>
      <div className="page-header mb-5">
        <div>
          <h1 className="section-title text-2xl">Sondages & Questionnaires</h1>
          <p className="text-sm text-gray-500 mt-1">Moteur de consultation des membres AD/BF</p>
        </div>
        {view === "list" && (
          <button onClick={() => { setView("create"); setStep(1); }} className="btn-primary"><Plus size={15} /> Créer un sondage</button>
        )}
        {view !== "list" && (
          <button onClick={() => setView("list")} className="btn-secondary"><ArrowLeft size={15} /> Retour</button>
        )}
      </div>

      {/* LIST */}
      {view === "list" && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Sondages actifs", value: "2", color: "#16A34A", bg: "#DCFCE7" },
              { label: "Total participants", value: "2 503", color: "#0F78C8", bg: "#D9EEFA" },
              { label: "Clôturés", value: "1", color: "#0D67B0", bg: "#D9EEFA" },
              { label: "Planifiés", value: "1", color: "#C8973A", bg: "#FDF4E0" },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div className="text-2xl font-black mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: s.color }}>{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {surveys.map(s => {
              const [statClass] = statusColors[s.statut] || ["badge-info"];
              return (
                <div key={s.id} className="card p-5 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{s.title}</h3>
                      <span className={`badge ${statClass}`}>{s.statut}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Users size={11} /> {s.participants.toLocaleString("fr-FR")} participants</span>
                      <span>{s.questions} questions</span>
                      <span>{s.audience}</span>
                      {s.debut && <span className="flex items-center gap-1"><Calendar size={11} /> {s.debut} – {s.fin}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {s.statut === "Actif" && (
                      <button onClick={() => setView("results")} className="btn-secondary text-xs">
                        <BarChart3 size={13} /> Résultats
                      </button>
                    )}
                    <button className="btn-secondary text-xs">Modifier</button>
                    <button style={{ background: "#FEE2E2", color: "#DC2626", border: "none", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CREATE */}
      {(view === "create") && (
        <div>
          {/* Stepper */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: step === s.n ? "#0F78C8" : step > s.n ? "#16A34A" : "#F1F5F9",
                      color: step >= s.n ? "white" : "#94A3B8",
                    }}
                  >
                    {step > s.n ? <Check size={14} /> : s.n}
                  </div>
                  <span className="text-sm font-semibold whitespace-nowrap" style={{ color: step === s.n ? "#0F78C8" : "#94A3B8" }}>{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className="w-8 h-px flex-shrink-0" style={{ background: step > s.n ? "#16A34A" : "#D9EEFA" }} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="card p-6 max-w-2xl">
              <h3 className="section-title text-base mb-5">Informations générales</h3>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Titre du sondage *</label>
                  <input type="text" className="form-input" placeholder="Ex. : Vision 3R — Consultation 2026" />
                </div>
                <div>
                  <label className="form-label">Description</label>
                  <textarea rows={3} className="form-input" placeholder="Décrivez l'objectif de ce sondage…" style={{ resize: "none" }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Date de début</label>
                    <input type="date" className="form-input" defaultValue="2026-09-15" />
                  </div>
                  <div>
                    <label className="form-label">Date de clôture</label>
                    <input type="date" className="form-input" defaultValue="2026-10-15" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="anon" className="w-4 h-4" style={{ accentColor: "#0F78C8" }} />
                  <label htmlFor="anon" className="text-sm text-gray-700 cursor-pointer">Réponses anonymes</label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setView("list")} className="btn-secondary flex-1">Annuler</button>
                <button onClick={() => setStep(2)} className="btn-primary flex-1">Suivant — Questions <ChevronRight size={15} /></button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="section-title text-base">Questions du sondage</h3>
                <div className="flex gap-2 flex-wrap">
                  {questionTypes.map(qt => (
                    <button
                      key={qt.id}
                      onClick={() => setQuestions([...questions, { id: Date.now(), text: "Nouvelle question", type: qt.id, required: false }])}
                      className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                      style={{ background: "#EBF6FD", color: "#0F78C8", border: "1px solid #D9EEFA", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                    >
                      <span>{qt.icon}</span> {qt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3 mb-5">
                {questions.map((q, i) => (
                  <div key={q.id} className="card p-4 flex items-start gap-3">
                    <div className="text-gray-300 cursor-grab mt-1"><GripVertical size={16} /></div>
                    <div className="flex-1">
                      <input
                        className="form-input text-sm mb-2"
                        value={q.text}
                        onChange={e => setQuestions(questions.map(x => x.id === q.id ? { ...x, text: e.target.value } : x))}
                      />
                      <div className="flex items-center gap-3">
                        <span className="badge badge-info text-xs">{questionTypes.find(t => t.id === q.type)?.label}</span>
                        <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
                          <input type="checkbox" checked={q.required} onChange={e => setQuestions(questions.map(x => x.id === q.id ? { ...x, required: e.target.checked } : x))} style={{ accentColor: "#0F78C8" }} />
                          Obligatoire
                        </label>
                      </div>
                    </div>
                    <button onClick={() => setQuestions(questions.filter(x => x.id !== q.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#FDA4AF" }}>
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary flex-1">Précédent</button>
                <button onClick={() => setStep(3)} className="btn-primary flex-1">Suivant — Audience <ChevronRight size={15} /></button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card p-6 max-w-2xl">
              <h3 className="section-title text-base mb-5">Ciblage de l'audience</h3>
              <p className="text-sm text-gray-500 mb-5">Sélectionnez les groupes qui pourront répondre à ce sondage.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {audiences.map(a => (
                  <button
                    key={a}
                    onClick={() => toggleAudience(a)}
                    className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                    style={{
                      background: selectedAudiences.includes(a) ? "#D9EEFA" : "#F8F9FC",
                      border: `2px solid ${selectedAudiences.includes(a) ? "#0F78C8" : "#D9EEFA"}`,
                      cursor: "pointer",
                    }}
                  >
                    <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: selectedAudiences.includes(a) ? "#0F78C8" : "white", border: `1px solid ${selectedAudiences.includes(a) ? "#0F78C8" : "#CBD5E1"}` }}>
                      {selectedAudiences.includes(a) && <Check size={12} color="white" />}
                    </div>
                    <span className="text-sm font-medium" style={{ color: "#374151" }}>{a}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-secondary flex-1">Précédent</button>
                <button onClick={() => setStep(4)} className="btn-primary flex-1">Suivant — Publication <ChevronRight size={15} /></button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="card p-6 max-w-2xl">
              <h3 className="section-title text-base mb-5">Récapitulatif & Publication</h3>
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl" style={{ background: "#F8F9FC", border: "1px solid #D9EEFA" }}>
                  <div className="text-xs text-gray-400 mb-1">Titre</div>
                  <div className="font-semibold text-sm" style={{ color: "#0F78C8" }}>Vision 3R — Consultation 2026</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl" style={{ background: "#F8F9FC", border: "1px solid #D9EEFA" }}>
                    <div className="text-xs text-gray-400 mb-1">Questions</div>
                    <div className="font-bold text-sm" style={{ color: "#0F78C8" }}>{questions.length}</div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: "#F8F9FC", border: "1px solid #D9EEFA" }}>
                    <div className="text-xs text-gray-400 mb-1">Audience</div>
                    <div className="font-bold text-sm" style={{ color: "#0F78C8" }}>{selectedAudiences.join(", ") || "Aucune"}</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="btn-secondary flex-1">Précédent</button>
                <button onClick={() => setView("list")} className="btn-primary flex-1" style={{ background: "linear-gradient(135deg, #C8973A, #D9AE5F)" }}>
                  <CheckCircle size={15} /> Publier le sondage
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* RESULTS */}
      {view === "results" && (
        <div>
          <div className="card p-6 mb-5">
            <h2 className="section-title text-xl mb-2">Vision 3R 2026 — Appropriation nationale</h2>
            <div className="flex items-center gap-6 flex-wrap">
              <div><div className="text-2xl font-black" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>1 842</div><div className="text-xs text-gray-400">Répondants</div></div>
              <div><div className="text-2xl font-black" style={{ fontFamily: "'Manrope', sans-serif", color: "#16A34A" }}>97,8%</div><div className="text-xs text-gray-400">Taux de complétion</div></div>
              <div><div className="text-2xl font-black" style={{ fontFamily: "'Manrope', sans-serif", color: "#C8973A" }}>4,2 min</div><div className="text-xs text-gray-400">Durée moyenne</div></div>
              <div><div className="text-2xl font-black" style={{ fontFamily: "'Manrope', sans-serif", color: "#0D67B0" }}>30/09/2026</div><div className="text-xs text-gray-400">Clôture</div></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card p-5">
              <h3 className="section-title text-base mb-4">Q1 — Fréquentation de l'église</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={resultData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="option" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={110} />
                  <Tooltip formatter={(v: any) => [v + " répondants"]} contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} />
                  <Bar dataKey="count" name="Réponses" radius={[0, 4, 4, 0]}>
                    {resultData.map((_, i) => <Cell key={i} fill={COLORS[i] || "#D9EEFA"} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-5">
              <h3 className="section-title text-base mb-4">Répartition des réponses</h3>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={resultData} dataKey="count" nameKey="option" cx="50%" cy="50%" outerRadius={90} label={({ payload }: any) => `${payload?.pct ?? ""}%`} labelLine={false}>
                    {resultData.map((_, i) => <Cell key={i} fill={COLORS[i] || "#D9EEFA"} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => [v + " répondants"]} contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button className="btn-secondary"><BarChart3 size={15} /> Exporter les résultats</button>
            <button className="btn-primary">Voir l'analyse complète</button>
          </div>
        </div>
      )}
    </div>
  );
}
