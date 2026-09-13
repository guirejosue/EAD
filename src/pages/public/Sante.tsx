import { useState, useEffect } from "react";
import { HeartPulse, MapPin, Users, Activity, Calendar, ChevronRight, Stethoscope, Baby, Cross, FileText, CheckCircle } from "lucide-react";

const centres = [
  { nom: "Clinique Évangélique de Ouagadougou", region: "Centre", type: "Clinique polyvalente", capacite: "80 lits", personnel: 42, services: ["Médecine générale", "Maternité", "Pédiatrie", "Chirurgie"], patientsAn: "48 000" },
  { nom: "Dispensaire AG de Bobo-Dioulasso", region: "Hauts-Bassins", type: "Dispensaire", capacite: "30 lits", personnel: 18, services: ["Médecine générale", "Maternité", "Vaccination"], patientsAn: "26 500" },
  { nom: "Centre de Santé AG — Banfora", region: "Cascades", type: "Centre de santé", capacite: "20 lits", personnel: 12, services: ["Consultation", "Maternité", "Nutrition"], patientsAn: "18 200" },
  { nom: "Dispensaire AG — Dori", region: "Sahel", type: "Dispensaire", capacite: "15 lits", personnel: 9, services: ["Médecine générale", "Pédiatrie", "Vaccination"], patientsAn: "14 800" },
  { nom: "Centre Médical AG — Koudougou", region: "Centre-Ouest", type: "Centre médical", capacite: "25 lits", personnel: 16, services: ["Médecine générale", "Maternité", "Dentisterie"], patientsAn: "22 100" },
  { nom: "Dispensaire AG — Fada N'Gourma", region: "Est", type: "Dispensaire", capacite: "12 lits", personnel: 8, services: ["Consultation", "Vaccination", "Nutrition"], patientsAn: "12 400" },
];

const programmes = [
  { titre: "Lutte contre le paludisme", desc: "Distribution de moustiquaires imprégnées et sensibilisation dans les communautés rurales.", icon: Activity, color: "#DC2626", bg: "#FEE2E2" },
  { titre: "Santé maternelle et infantile", desc: "Suivi prénatal, accouchements assistés, vaccination et nutrition pour les mères et enfants.", icon: Baby, color: "#0F78C8", bg: "#D9EEFA" },
  { titre: "VIH/SIDA — Prévention & accompagnement", desc: "Dépistage, counseling chrétien, prise en charge et soutien aux personnes affectées.", icon: HeartPulse, color: "#7C3AED", bg: "#EDE9FE" },
  { titre: "Campagnes médicales gratuites", desc: "Consultations gratuites, soins dentaires et ophtalmologie lors de campagnes nationales annuelles.", icon: Stethoscope, color: "#16A34A", bg: "#DCFCE7" },
];

const campagnesData = [
  { annee: "2026", lieu: "Région du Centre — Ouagadougou", date: "15-20 Mars 2026", consultations: 3420, chirurgies: 84, lunettes: 610 },
  { annee: "2026", lieu: "Région Hauts-Bassins — Bobo", date: "10-15 Mai 2026", consultations: 2850, chirurgies: 62, lunettes: 480 },
  { annee: "2026", lieu: "Région Cascades — Banfora", date: "05-09 Juillet 2026", consultations: 1940, chirurgies: 45, lunettes: 350 },
  { annee: "2026", lieu: "Région Centre-Ouest — Koudougou", date: "12-16 Août 2026", consultations: 2310, chirurgies: 51, lunettes: 420 },
];

type SanteTab = "centres" | "programmes" | "campagnes" | "rapports";

export default function Sante({ initialTab }: { initialTab?: string | null }) {
  const [tab, setTab] = useState<SanteTab>(
    (initialTab && ["centres", "programmes", "campagnes", "rapports"].includes(initialTab))
      ? (initialTab as SanteTab)
      : "centres"
  );

  useEffect(() => {
    if (initialTab && ["centres", "programmes", "campagnes", "rapports"].includes(initialTab)) {
      setTab(initialTab as SanteTab);
    }
  }, [initialTab]);

  const tabs: { id: SanteTab; label: string; icon: React.ElementType }[] = [
    { id: "centres", label: "Centres de santé", icon: Cross },
    { id: "programmes", label: "Programmes de santé", icon: HeartPulse },
    { id: "campagnes", label: "Campagnes médicales", icon: Stethoscope },
    { id: "rapports", label: "Rapports sanitaires", icon: FileText },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden mb-8" style={{ background: "linear-gradient(135deg, #0A3D2E 0%, #16A34A 100%)", padding: "50px 0 40px" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 40%, #C8973A 0%, transparent 55%)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(200,151,58,0.2)", border: "1px solid rgba(200,151,58,0.4)" }}>
            <HeartPulse size={14} style={{ color: "#C8973A" }} />
            <span className="text-xs font-semibold" style={{ color: "#C8973A" }}>Santé communautaire</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>La Santé</h1>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
            L'AD/BF s'engage pour le bien-être physique des communautés à travers un réseau de centres de santé et des programmes communautaires au service de tous.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 64px" }}>
        {/* Navigation Tabs */}
        <div className="flex gap-2 p-1.5 rounded-2xl mb-8 overflow-x-auto" style={{ background: "#F1F5F9", border: "1px solid #D9EEFA" }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${tab === t.id ? "bg-white shadow-sm" : "hover:bg-white/50"}`}
              style={{
                color: tab === t.id ? "#16A34A" : "#64748B",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif"
              }}
            >
              <t.icon size={15} style={{ color: tab === t.id ? "#16A34A" : "#94A3B8" }} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Centres de santé", value: "24", icon: Cross, color: "#16A34A", bg: "#DCFCE7" },
            { label: "Patients par an", value: "180 000+", icon: Users, color: "#0F78C8", bg: "#D9EEFA" },
            { label: "Personnel soignant", value: "420", icon: Stethoscope, color: "#7C3AED", bg: "#EDE9FE" },
            { label: "Campagnes médicales/an", value: "12", icon: Activity, color: "#C8973A", bg: "#FDF4E0" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: "white", boxShadow: "0 2px 12px rgba(15,120,200,0.07)", border: "1px solid #EBF6FD" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: s.bg }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tab 1: CENTRES */}
        {tab === "centres" && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Nos centres de santé et dispensaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {centres.map((c, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 12px rgba(15,120,200,0.07)", border: "1px solid #EBF6FD" }}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>{c.nom}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs flex items-center gap-1" style={{ color: "#64748B" }}><MapPin size={11} /> {c.region}</span>
                        <span className="text-xs font-semibold" style={{ color: "#0F78C8" }}>{c.capacite}</span>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "#DCFCE7", color: "#16A34A", fontWeight: 600 }}>{c.personnel} agents</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t" style={{ borderColor: "#F1F5F9" }}>
                    {c.services.map(s => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F1F5F9", color: "#64748B" }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: PROGRAMMES */}
        {tab === "programmes" && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Programmes de santé communautaire</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {programmes.map((p, i) => (
                <div key={i} className="rounded-2xl p-5 flex gap-4" style={{ background: "white", boxShadow: "0 2px 12px rgba(15,120,200,0.07)", border: "1px solid #EBF6FD" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: p.bg }}>
                    <p.icon size={20} style={{ color: p.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>{p.titre}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: CAMPAGNES */}
        {tab === "campagnes" && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Campagnes médicales foraines gratuites 2026</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {campagnesData.map((c, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 12px rgba(15,120,200,0.07)", border: "1px solid #EBF6FD" }}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-sm" style={{ color: "#032A4E" }}>{c.lieu}</h3>
                    <span className="badge badge-success text-xs">Réalisée</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                    <Calendar size={12} /> {c.date}
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl" style={{ background: "#F8F9FC" }}>
                    <div className="text-center">
                      <div className="text-sm font-bold" style={{ color: "#0F78C8" }}>{c.consultations.toLocaleString("fr-FR")}</div>
                      <div className="text-xs text-gray-400">Consultations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold" style={{ color: "#16A34A" }}>{c.chirurgies}</div>
                      <div className="text-xs text-gray-400">Opérations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold" style={{ color: "#C8973A" }}>{c.lunettes}</div>
                      <div className="text-xs text-gray-400">Lunettes</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: RAPPORTS */}
        {tab === "rapports" && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Synthèse et rapports d'activité sanitaire</h2>
            <div className="card overflow-hidden mb-8" style={{ background: "white", borderRadius: "16px", border: "1px solid #EBF6FD" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Structure sanitaire</th>
                    <th>Région</th>
                    <th style={{ textAlign: "right" }}>Capacité</th>
                    <th style={{ textAlign: "right" }}>Personnel</th>
                    <th style={{ textAlign: "right" }}>Patients reçus/an</th>
                  </tr>
                </thead>
                <tbody>
                  {centres.map((c, i) => (
                    <tr key={i}>
                      <td className="font-semibold" style={{ color: "#0F78C8" }}>{c.nom}</td>
                      <td><span className="badge badge-info">{c.region}</span></td>
                      <td className="text-right font-medium">{c.capacite}</td>
                      <td className="text-right font-medium">{c.personnel}</td>
                      <td className="text-right font-bold" style={{ color: "#16A34A" }}>{c.patientsAn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
