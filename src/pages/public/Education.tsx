import { useState, useEffect } from "react";
import { School, Users, BookOpen, Award, MapPin, TrendingUp, ChevronRight, GraduationCap, FileText, CheckCircle } from "lucide-react";

const etablissements = [
  { nom: "Groupe Scolaire Évangélique de Ouagadougou", region: "Centre", niveaux: ["Préscolaire", "Primaire", "Secondaire"], eleves: 1840, personnel: 72, reussite: "94%" },
  { nom: "Collège Évangélique de Bobo-Dioulasso", region: "Hauts-Bassins", niveaux: ["Collège", "Lycée"], eleves: 1250, personnel: 58, reussite: "89%" },
  { nom: "École Primaire AG — Banfora", region: "Cascades", niveaux: ["Préscolaire", "Primaire"], eleves: 680, personnel: 24, reussite: "91%" },
  { nom: "Lycée Évangélique de Koudougou", region: "Centre-Ouest", niveaux: ["Secondaire"], eleves: 920, personnel: 38, reussite: "85%" },
  { nom: "École Primaire AG — Ouahigouya", region: "Nord", niveaux: ["Primaire"], eleves: 510, personnel: 18, reussite: "88%" },
  { nom: "École AG — Fada N'Gourma", region: "Est", niveaux: ["Préscolaire", "Primaire"], eleves: 430, personnel: 16, reussite: "82%" },
  { nom: "Groupe Scolaire AG — Dori", region: "Sahel", niveaux: ["Primaire"], eleves: 380, personnel: 14, reussite: "80%" },
  { nom: "École AG — Tenkodogo", region: "Centre-Est", niveaux: ["Primaire"], eleves: 290, personnel: 11, reussite: "86%" },
];

const boursesData = [
  { type: "Bourse d'Excellence Académique", beneficiaire: "Élèves ayant obtenu mention Très Bien", montant: "150 000 FCFA / an", quotas: 120, statut: "Ouvert" },
  { type: "Aide Sociale aux Enfants Déplacés", beneficiaire: "Familles déplacées internes", montant: "Prise en charge intégrale", quotas: 350, statut: "Ouvert" },
  { type: "Soutien aux Orphelins & Vulnérables", beneficiaire: "Orphelins de pasteurs et fidèles", montant: "Frais de scolarité + fournitures", quotas: 210, statut: "En cours" },
  { type: "Bourses d'Études Supérieures Chrétiennes", beneficiaire: "Bacheliers chrétiens méritants", montant: "300 000 FCFA / an", quotas: 45, statut: "Commission en cours" },
];

const niveauColors: Record<string, { bg: string; color: string }> = {
  "Préscolaire": { bg: "#FDF4E0", color: "#C8973A" },
  "Primaire": { bg: "#D9EEFA", color: "#0F78C8" },
  "Collège": { bg: "#DCFCE7", color: "#16A34A" },
  "Secondaire": { bg: "#EDE9FE", color: "#7C3AED" },
  "Lycée": { bg: "#FEE2E2", color: "#DC2626" },
};

type EducationTab = "etablissements" | "effectifs" | "resultats" | "bourses";

export default function Education({ initialTab }: { initialTab?: string | null }) {
  const [tab, setTab] = useState<EducationTab>(
    (initialTab && ["etablissements", "effectifs", "resultats", "bourses"].includes(initialTab))
      ? (initialTab as EducationTab)
      : "etablissements"
  );

  useEffect(() => {
    if (initialTab && ["etablissements", "effectifs", "resultats", "bourses"].includes(initialTab)) {
      setTab(initialTab as EducationTab);
    }
  }, [initialTab]);

  const totalEleves = etablissements.reduce((s, e) => s + e.eleves, 0);
  const totalPersonnel = etablissements.reduce((s, e) => s + e.personnel, 0);

  const tabs: { id: EducationTab; label: string; icon: React.ElementType }[] = [
    { id: "etablissements", label: "Établissements scolaires", icon: School },
    { id: "effectifs", label: "Effectifs & Inscriptions", icon: Users },
    { id: "resultats", label: "Résultats scolaires", icon: Award },
    { id: "bourses", label: "Bourses & Aides", icon: GraduationCap },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden mb-8" style={{ background: "linear-gradient(135deg, #3B1D8A 0%, #7C3AED 100%)", padding: "50px 0 40px" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 60%, #C8973A 0%, transparent 55%)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(200,151,58,0.2)", border: "1px solid rgba(200,151,58,0.4)" }}>
            <School size={14} style={{ color: "#C8973A" }} />
            <span className="text-xs font-semibold" style={{ color: "#C8973A" }}>Éducation chrétienne</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>L'Éducation</h1>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
            L'AD/BF gère un réseau d'établissements scolaires chrétiens qui offrent une éducation de qualité, fondée sur des valeurs bibliques, du préscolaire au lycée.
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
                color: tab === t.id ? "#7C3AED" : "#64748B",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif"
              }}
            >
              <t.icon size={15} style={{ color: tab === t.id ? "#7C3AED" : "#94A3B8" }} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Établissements scolaires", value: etablissements.length.toString(), icon: School, color: "#7C3AED", bg: "#EDE9FE" },
            { label: "Élèves inscrits", value: totalEleves.toLocaleString("fr-FR"), icon: Users, color: "#0F78C8", bg: "#D9EEFA" },
            { label: "Enseignants & personnel", value: totalPersonnel.toString(), icon: BookOpen, color: "#16A34A", bg: "#DCFCE7" },
            { label: "Taux de réussite national", value: "87%", icon: Award, color: "#C8973A", bg: "#FDF4E0" },
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

        {/* Tab 1: ÉTABLISSEMENTS */}
        {tab === "etablissements" && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Nos établissements scolaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {etablissements.map((e, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 2px 12px rgba(15,120,200,0.07)", border: "1px solid #EBF6FD" }}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>{e.nom}</h3>
                      <span className="text-xs flex items-center gap-1 mt-1" style={{ color: "#64748B" }}><MapPin size={11} /> {e.region}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold" style={{ color: "#0F78C8" }}>{e.eleves.toLocaleString("fr-FR")}</div>
                      <div className="text-xs" style={{ color: "#94A3B8" }}>élèves</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {e.niveaux.map(n => (
                      <span key={n} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: niveauColors[n]?.bg || "#F1F5F9", color: niveauColors[n]?.color || "#64748B" }}>{n}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: EFFECTIFS */}
        {tab === "effectifs" && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Tableau des effectifs et du personnel enseignant</h2>
            <div className="card overflow-hidden mb-8" style={{ background: "white", borderRadius: "16px", border: "1px solid #EBF6FD" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Établissement</th>
                    <th>Région</th>
                    <th style={{ textAlign: "right" }}>Élèves</th>
                    <th style={{ textAlign: "right" }}>Enseignants</th>
                    <th style={{ textAlign: "right" }}>Taux d'encadrement</th>
                  </tr>
                </thead>
                <tbody>
                  {etablissements.map((e, i) => (
                    <tr key={i}>
                      <td className="font-semibold" style={{ color: "#7C3AED" }}>{e.nom}</td>
                      <td><span className="badge badge-info">{e.region}</span></td>
                      <td className="text-right font-bold" style={{ color: "#032A4E" }}>{e.eleves.toLocaleString("fr-FR")}</td>
                      <td className="text-right font-medium">{e.personnel}</td>
                      <td className="text-right font-semibold" style={{ color: "#16A34A" }}>1 / {Math.floor(e.eleves / e.personnel)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: RÉSULTATS */}
        {tab === "resultats" && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Examens officiels et résultats scolaires</h2>
            <div className="rounded-2xl p-6 mb-8" style={{ background: "linear-gradient(135deg, #F8F0FF, #EDE9FE)", border: "1px solid #DDD6FE" }}>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp size={20} style={{ color: "#7C3AED" }} />
                <h3 className="text-lg font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#3B1D8A" }}>Taux de réussite par examen national (2025-2026)</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "CEP — Certificat d'Études Primaires", taux: "91%" },
                  { label: "BEPC — Brevet", taux: "84%" },
                  { label: "BAC série D", taux: "78%" },
                  { label: "BAC toutes séries", taux: "82%" },
                ].map(r => (
                  <div key={r.label} className="rounded-xl p-4 text-center" style={{ background: "white" }}>
                    <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#7C3AED" }}>{r.taux}</div>
                    <div className="text-xs" style={{ color: "#64748B" }}>{r.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card overflow-hidden mb-8" style={{ background: "white", borderRadius: "16px", border: "1px solid #EBF6FD" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Établissement</th>
                    <th>Région</th>
                    <th style={{ textAlign: "right" }}>Taux de réussite</th>
                    <th>Appréciation académique</th>
                  </tr>
                </thead>
                <tbody>
                  {etablissements.map((e, i) => (
                    <tr key={i}>
                      <td className="font-semibold" style={{ color: "#0F78C8" }}>{e.nom}</td>
                      <td><span className="badge badge-info">{e.region}</span></td>
                      <td className="text-right font-bold" style={{ color: "#16A34A" }}>{e.reussite}</td>
                      <td><span className="badge badge-success text-xs">Excellence confirmée</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: BOURSES */}
        {tab === "bourses" && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Programmes de bourses et soutiens scolaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {boursesData.map((b, i) => (
                <div key={i} className="card p-5" style={{ background: "white", borderRadius: "16px", border: "1px solid #EBF6FD" }}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-base" style={{ color: "#7C3AED" }}>{b.type}</h4>
                    <span className="badge badge-gold text-xs">{b.statut}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Cible : {b.beneficiaire}</p>
                  <div className="p-3 rounded-xl mb-3" style={{ background: "#F8F0FF" }}>
                    <div className="text-xs text-gray-400">Montant / Couverture</div>
                    <div className="text-sm font-bold" style={{ color: "#3B1D8A" }}>{b.montant}</div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Quotas annuels : <strong style={{ color: "#032A4E" }}>{b.quotas} bénéficiaires</strong></span>
                    <button style={{ background: "#7C3AED", color: "white", border: "none", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>Postuler</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bourses CTA banner */}
        <div className="rounded-2xl p-8" style={{ background: "linear-gradient(135deg, #032A4E 0%, #7C3AED 100%)" }}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,151,58,0.25)" }}>
              <GraduationCap size={32} style={{ color: "#C8973A" }} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>Programme de bourses 2026-2027</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                Des bourses sont disponibles pour les élèves méritants issus de familles défavorisées. Dossiers à déposer avant le 30 octobre 2026.
              </p>
            </div>
            <button className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm" style={{ background: "#C8973A", color: "white", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
              Candidater <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
