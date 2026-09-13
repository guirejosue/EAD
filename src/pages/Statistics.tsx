import { useState, useEffect } from "react";
import {
  Users, TrendingUp, Award, Baby, Heart, Church, Filter, Download,
  MapPin, Globe, Shield, Wallet, Activity, BarChart3, ChevronDown, Layers, CheckCircle
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";
import type { SupervisionScope } from "../components/AppLayout";

type NiveauStat = "local" | "sousregional" | "regional" | "centre" | "national";

const nationalEvolutionData = [
  { annee: "2021", membres: 398000, baptemes: 1820, nouveaux: 28400 },
  { annee: "2022", membres: 418000, baptemes: 2010, nouveaux: 31200 },
  { annee: "2023", membres: 441000, baptemes: 2180, nouveaux: 34800 },
  { annee: "2024", membres: 462000, baptemes: 2240, nouveaux: 37600 },
  { annee: "2025", membres: 479000, baptemes: 2290, nouveaux: 41200 },
  { annee: "2026", membres: 487320, baptemes: 2340, nouveaux: 43800 },
];

const allRegionsData = [
  { region: "Centre", membres: 98400, eglises: 284, baptemes: 482, frequentation: 87 },
  { region: "H.-Bassins", membres: 72300, eglises: 210, baptemes: 351, frequentation: 82 },
  { region: "Cascades", membres: 48200, eglises: 142, baptemes: 228, frequentation: 79 },
  { region: "Centre-Ouest", membres: 46800, eglises: 138, baptemes: 219, frequentation: 84 },
  { region: "Sahel", membres: 31200, eglises: 98, baptemes: 142, frequentation: 76 },
  { region: "Est", membres: 38400, eglises: 112, baptemes: 181, frequentation: 81 },
  { region: "Nord", membres: 42100, eglises: 124, baptemes: 198, frequentation: 83 },
  { region: "Centre-Nord", membres: 35600, eglises: 105, baptemes: 167, frequentation: 78 },
];

const centresBenData = [
  { centre: "Centre N°5", chef: "Bogodogo / Ziniaré", superviseur: "Pasteur Philippe Oubda (BEN)", regions: "Bogodogo, Ziniaré", eglises: 90, membres: 32700, activite: 98, conformite3R: 98 },
  { centre: "Centre Grand Ouest", chef: "Bobo-Dioulasso", superviseur: "Pasteur David Ilboudo (BEN)", regions: "Hauts-Bassins, Cascades", eglises: 352, membres: 120500, activite: 92, conformite3R: 91 },
  { centre: "Centre Ouest & Mouhoun", chef: "Koudougou", superviseur: "Pasteur Samuel Zongo (BEN)", regions: "Centre-Ouest, Boucle du Mouhoun", eglises: 256, membres: 86900, activite: 89, conformite3R: 88 },
  { centre: "Centre Grand Nord", chef: "Ouahigouya", superviseur: "Pasteur Isaac Traoré (BEN)", regions: "Nord, Sahel", eglises: 222, membres: 73300, activite: 85, conformite3R: 87 },
  { centre: "Centre Grand Est", chef: "Fada N'Gourma", superviseur: "Pasteur Élie Tindano (BEN)", regions: "Est, Centre-Est", eglises: 208, membres: 71200, activite: 88, conformite3R: 89 },
  { centre: "Centre Sud & Sud-Ouest", chef: "Manga", superviseur: "Pasteur Barthélémy Somé (BEN)", regions: "Centre-Sud, Sud-Ouest", eglises: 157, membres: 53300, activite: 86, conformite3R: 86 },
];

function StatCard({ label, value, sub, icon: Icon, color, bg }: { label: string; value: string; sub: string; icon: React.ElementType; color: string; bg: string }) {
  return (
    <div className="stat-card">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: bg }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{value}</div>
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-xs font-semibold" style={{ color }}>{sub}</div>
    </div>
  );
}

function getAvailableNiveaux(scopeNiveau: string) {
  if (scopeNiveau === "local") {
    return [
      { id: "local" as NiveauStat, label: "Église locale", sub: "Église Centrale Ouaga (1 240 fidèles)", icon: Church, color: "#16A34A", bg: "#DCFCE7" },
    ];
  }
  if (scopeNiveau === "sousregional") {
    return [
      { id: "sousregional" as NiveauStat, label: "Ma Sous-Région", sub: "Ouaga-Nord (12 églises)", icon: MapPin, color: "#C8973A", bg: "#FDF4E0" },
      { id: "local" as NiveauStat, label: "Églises de la sous-région", sub: "12 assemblées", icon: Church, color: "#16A34A", bg: "#DCFCE7" },
    ];
  }
  if (scopeNiveau === "regional") {
    return [
      { id: "regional" as NiveauStat, label: "Ma Région", sub: "Région Centre (284 églises)", icon: Globe, color: "#0F78C8", bg: "#D9EEFA" },
      { id: "sousregional" as NiveauStat, label: "Sous-Régions du Centre", sub: "35 sous-régions", icon: MapPin, color: "#C8973A", bg: "#FDF4E0" },
      { id: "local" as NiveauStat, label: "Églises de la région", sub: "284 assemblées", icon: Church, color: "#16A34A", bg: "#DCFCE7" },
    ];
  }
  if (scopeNiveau === "centre") {
    return [
      { id: "centre" as NiveauStat, label: "Mon Centre (BEN)", sub: "Kadiogo / Plateau (342 églises)", icon: Layers, color: "#0A5490", bg: "#E0F2FE" },
      { id: "regional" as NiveauStat, label: "Régions supervisées", sub: "Centre & Plateau-Central", icon: Globe, color: "#0F78C8", bg: "#D9EEFA" },
      { id: "sousregional" as NiveauStat, label: "Sous-Régions rattachées", sub: "42 sous-régions", icon: MapPin, color: "#C8973A", bg: "#FDF4E0" },
      { id: "local" as NiveauStat, label: "Églises locales", sub: "342 assemblées", icon: Church, color: "#16A34A", bg: "#DCFCE7" },
    ];
  }
  // National and Finance
  return [
    { id: "national" as NiveauStat, label: "Bureau Exécutif National", sub: "Gouvernance centrale", icon: Shield, color: "#7C3AED", bg: "#EDE9FE" },
    { id: "centre" as NiveauStat, label: "Centres (BEN)", sub: "Supervision inter-régionale", icon: Layers, color: "#0A5490", bg: "#E0F2FE" },
    { id: "regional" as NiveauStat, label: "Régional", sub: "79 régions ecclés.", icon: Globe, color: "#0F78C8", bg: "#D9EEFA" },
    { id: "sousregional" as NiveauStat, label: "Sous-Régional", sub: "224 sous-régions", icon: MapPin, color: "#C8973A", bg: "#FDF4E0" },
    { id: "local" as NiveauStat, label: "Église locale", sub: "1 842 assemblées", icon: Church, color: "#16A34A", bg: "#DCFCE7" },
  ];
}

export default function Statistics({ initialNiveau, currentScope }: { initialNiveau?: string | null; currentScope?: SupervisionScope }) {
  const userNiveau = currentScope?.niveau || "national";
  const availableNiveaux = getAvailableNiveaux(userNiveau);

  const defaultNiveau: NiveauStat =
    initialNiveau && availableNiveaux.some(n => n.id === initialNiveau)
      ? (initialNiveau as NiveauStat)
      : availableNiveaux[0].id;

  const [niveau, setNiveau] = useState<NiveauStat>(defaultNiveau);
  const [compareYear, setCompareYear] = useState(false);

  useEffect(() => {
    if (initialNiveau && availableNiveaux.some(n => n.id === initialNiveau)) {
      setNiveau(initialNiveau as NiveauStat);
    } else {
      setNiveau(availableNiveaux[0].id);
    }
  }, [initialNiveau, userNiveau]);

  return (
    <div>
      <div className="page-header mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
              Statistiques 3R
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Circonscription : <strong>{currentScope?.instance || "Bureau National"}</strong>
            </span>
          </div>
          <h1 className="section-title text-2xl">Statistiques & Indicateurs</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Données cumulées · Année 2026 · {currentScope?.perimetre || "Territoire National"}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setCompareYear(!compareYear)} className="btn-secondary text-xs" style={compareYear ? { borderColor: "#0F78C8", color: "#0F78C8" } : {}}>
            {compareYear ? "✓ " : ""}Comparer 2025
          </button>
          <button className="btn-secondary text-xs flex items-center gap-1"><Download size={13} /> Exporter</button>
        </div>
      </div>

      {/* ══ NIVEAU SELECTOR (RESTRICTED TO JURISDICTION) ══ */}
      <div className="card p-4 mb-5">
        <p className="text-xs font-semibold mb-3 text-slate-400 uppercase tracking-wider">
          Niveaux d'analyse autorisés pour votre périmètre
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          {availableNiveaux.map((n, i) => {
            const isActive = niveau === n.id;
            return (
              <div key={n.id} className="flex items-center flex-1">
                <button
                  onClick={() => setNiveau(n.id)}
                  className="flex-1 flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                  style={{
                    background: isActive ? n.bg : "#F8F9FC",
                    border: isActive ? `2px solid ${n.color}` : "2px solid transparent",
                    cursor: "pointer",
                  }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: isActive ? n.color : "#E2E8F0" }}>
                    <n.icon size={16} style={{ color: isActive ? "white" : "#94A3B8" }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold" style={{ color: isActive ? n.color : "#374151", fontFamily: "'Manrope', sans-serif" }}>{n.label}</div>
                    <div className="text-xs" style={{ color: isActive ? n.color : "#94A3B8", opacity: isActive ? 0.8 : 1 }}>{n.sub}</div>
                  </div>
                </button>
                {i < availableNiveaux.length - 1 && (
                  <div className="hidden sm:flex items-center px-1 flex-shrink-0">
                    <ChevronDown size={14} style={{ color: "#CBD5E1", transform: "rotate(-90deg)" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── ÉGLISE LOCALE ─── */}
      {niveau === "local" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-5 rounded-full" style={{ background: "#16A34A" }} />
            <h3 className="font-bold text-base text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {userNiveau === "local"
                ? "Statistiques — Église Centrale Ouagadougou (Église locale)"
                : userNiveau === "sousregional"
                ? "Statistiques — Églises locales de la Sous-région Ouaga-Nord"
                : "Statistiques — Données des Assemblées locales"}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <StatCard label={userNiveau === "local" ? "Assemblée locale" : "Assemblées actives"} value={userNiveau === "local" ? "1 (+4 annexes)" : userNiveau === "sousregional" ? "12" : "284"} sub="À jour de rapport" icon={Church} color="#16A34A" bg="#DCFCE7" />
            <StatCard label="Membres actifs" value={userNiveau === "local" ? "1 240" : userNiveau === "sousregional" ? "4 820" : "98 400"} sub="+2.8% ce mois" icon={Users} color="#0F78C8" bg="#D9EEFA" />
            <StatCard label="Baptêmes (cumul 2026)" value={userNiveau === "local" ? "28" : userNiveau === "sousregional" ? "86" : "482"} sub="+6 ce trimestre" icon={Award} color="#C8973A" bg="#FDF4E0" />
            <StatCard label="Fréquentation moy." value={userNiveau === "local" ? "1 150 / dim." : userNiveau === "sousregional" ? "4 120 / dim." : "18 600 / dim."} sub="Cultes dominicaux" icon={Heart} color="#0891B2" bg="#E0F2FE" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="card p-5">
              <h3 className="section-title text-base mb-1">Fréquentation des cultes 2026</h3>
              <p className="text-xs text-gray-400 mb-4">Évolution mensuelle des fidèles</p>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={[
                  { mois: "Jan", adultes: userNiveau === "local" ? 820 : 2750, jeunes: userNiveau === "local" ? 210 : 720 },
                  { mois: "Fév", adultes: userNiveau === "local" ? 840 : 2820, jeunes: userNiveau === "local" ? 220 : 740 },
                  { mois: "Mar", adultes: userNiveau === "local" ? 880 : 2950, jeunes: userNiveau === "local" ? 235 : 790 },
                  { mois: "Avr", adultes: userNiveau === "local" ? 870 : 2910, jeunes: userNiveau === "local" ? 230 : 780 },
                  { mois: "Mai", adultes: userNiveau === "local" ? 910 : 3050, jeunes: userNiveau === "local" ? 250 : 840 },
                  { mois: "Jun", adultes: userNiveau === "local" ? 930 : 3120, jeunes: userNiveau === "local" ? 260 : 870 },
                  { mois: "Jul", adultes: userNiveau === "local" ? 920 : 3080, jeunes: userNiveau === "local" ? 255 : 850 },
                  { mois: "Aoû", adultes: userNiveau === "local" ? 960 : 3200, jeunes: userNiveau === "local" ? 275 : 910 },
                ]} margin={{ left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="adultes" name="Adultes" fill="#0F78C8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="jeunes" name="Jeunes & Enfants" fill="#16A34A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-5">
              <h3 className="section-title text-base mb-1">
                {userNiveau === "local" ? "Fidélité & Assiduité aux cultes" : "Taux de déclaration des assemblées"}
              </h3>
              <p className="text-xs text-gray-400 mb-4">Indicateur d'engagement spirituel 3R</p>
              <div className="space-y-3 mt-3">
                {(userNiveau === "local"
                  ? [
                      { nom: "Culte Français (07h00)", taux: 94 },
                      { nom: "Culte Mooré (09h30)", taux: 98 },
                      { nom: "Culte de jeunesse (Vendredi)", taux: 88 },
                      { nom: "Étude biblique (Mercredi)", taux: 82 },
                    ]
                  : [
                      { nom: "Église Centrale Ouagadougou", taux: 100 },
                      { nom: "Temple Béthel Nord", taux: 98 },
                      { nom: "Temple Eben-Ezer Somgandé", taux: 95 },
                      { nom: "Temple Sinaï Tanghin", taux: 92 },
                      { nom: "Temple Emmanuel Tampouy", taux: 90 },
                      { nom: "Temple Philadelphie Kilwin", taux: 88 },
                    ]
                ).map(r => (
                  <div key={r.nom} className="flex items-center gap-3">
                    <div className="text-xs font-medium w-48 truncate text-slate-700">{r.nom}</div>
                    <div className="flex-1 h-2 rounded-full bg-slate-100">
                      <div className="h-2 rounded-full" style={{ width: `${r.taux}%`, background: r.taux >= 95 ? "#16A34A" : "#0F78C8" }} />
                    </div>
                    <div className="text-xs font-bold w-9 text-right" style={{ color: r.taux >= 95 ? "#16A34A" : "#0F78C8" }}>{r.taux}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
              <h3 className="section-title text-base">
                {userNiveau === "local"
                  ? "Détail de l'église locale et de ses 4 annexes"
                  : "Liste des assemblées de la circonscription"}
              </h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Assemblée</th>
                  <th>Responsable</th>
                  <th style={{ textAlign: "right" }}>Fidèles</th>
                  <th style={{ textAlign: "right" }}>Baptêmes 2026</th>
                  <th>Conformité 3R</th>
                </tr>
              </thead>
              <tbody>
                {(userNiveau === "local"
                  ? [
                      { col1: "Église Centrale (Temple)", col2: "Pasteur Samuel Kaboré", col3: 1240, col4: 28, col5: "100%" },
                      { col1: "Annexe Tanghin", col2: "Pasteur stagiaire Compaoré", col3: 280, col4: 6, col5: "94%" },
                      { col1: "Annexe Karpala", col2: "Diacre Ouédraogo", col3: 310, col4: 8, col5: "96%" },
                      { col1: "Annexe Somgandé", col2: "Ancien Zongo", col3: 240, col4: 5, col5: "91%" },
                      { col1: "Annexe Tampouy", col2: "Pasteur adjoint Ilboudo", col3: 410, col4: 9, col5: "95%" },
                    ]
                  : [
                      { col1: "Église Centrale Ouaga", col2: "Pasteur Samuel Kaboré", col3: 1240, col4: 28, col5: "100%" },
                      { col1: "Temple Béthel Nord", col2: "Pasteur Josué Sawadogo", col3: 640, col4: 15, col5: "98%" },
                      { col1: "Temple Eben-Ezer", col2: "Pasteur Marc Oubda", col3: 520, col4: 12, col5: "95%" },
                      { col1: "Temple Sinaï Tanghin", col2: "Pasteur Pierre Ilboudo", col3: 480, col4: 11, col5: "92%" },
                      { col1: "Temple Emmanuel", col2: "Pasteur David Sanogo", col3: 410, col4: 9, col5: "94%" },
                    ]
                ).map((r, i) => (
                  <tr key={i}>
                    <td className="font-semibold text-sky-800">{r.col1}</td>
                    <td className="text-xs text-slate-700">{r.col2}</td>
                    <td className="text-right font-medium">{r.col3.toLocaleString("fr-FR")}</td>
                    <td className="text-right font-semibold text-amber-600">{r.col4}</td>
                    <td>
                      <span className="badge badge-success">{r.col5}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── SOUS-RÉGIONAL ─── */}
      {niveau === "sousregional" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-5 rounded-full" style={{ background: "#C8973A" }} />
            <h3 className="font-bold text-base text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {userNiveau === "sousregional"
                ? "Statistiques — Circonscription Sous-Régionale Ouaga-Nord"
                : "Statistiques — Sous-régions de la Région Centre"}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <StatCard label="Églises rattachées" value="12" sub="Sous-région Ouaga-Nord" icon={Church} color="#C8973A" bg="#FDF4E0" />
            <StatCard label="Membres actifs" value="4 820" sub="+68 ce mois" icon={Users} color="#0F78C8" bg="#D9EEFA" />
            <StatCard label="Pasteurs en activité" value="12" sub="1 par assemblée" icon={Award} color="#16A34A" bg="#DCFCE7" />
            <StatCard label="Fréquentation moy." value="4 120 / dim." sub="85.4% présence" icon={Heart} color="#0891B2" bg="#E0F2FE" />
          </div>

          <div className="card overflow-hidden mt-4">
            <div className="p-4 border-b">
              <h3 className="section-title text-base">Églises locales encadrées par la Sous-région</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Église locale</th>
                  <th>Pasteur titulaire</th>
                  <th style={{ textAlign: "right" }}>Membres</th>
                  <th>Taux de rapport</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { col1: "Église Centrale Ouagadougou", col2: "Pasteur Samuel Kaboré", col3: 1240, col4: "100%", col5: "Actif" },
                  { col1: "Temple Béthel Nord", col2: "Pasteur Josué Sawadogo", col3: 640, col4: "100%", col5: "Actif" },
                  { col1: "Temple Eben-Ezer Somgandé", col2: "Pasteur Marc Oubda", col3: 520, col4: "95%", col5: "Actif" },
                  { col1: "Temple Sinaï Tanghin", col2: "Pasteur Pierre Ilboudo", col3: 480, col4: "92%", col5: "Actif" },
                  { col1: "Temple Emmanuel Tampouy", col2: "Pasteur David Sanogo", col3: 410, col4: "94%", col5: "Actif" },
                  { col1: "Temple Philadelphie Kilwin", col2: "Pasteur Jonas Kaboré", col3: 380, col4: "90%", col5: "Actif" },
                ].map((r, i) => (
                  <tr key={i}>
                    <td className="font-semibold text-amber-800">{r.col1}</td>
                    <td className="text-xs text-slate-700">{r.col2}</td>
                    <td className="text-right font-medium">{r.col3.toLocaleString("fr-FR")}</td>
                    <td><span className="badge badge-info">{r.col4}</span></td>
                    <td><span className="badge badge-success">{r.col5}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── RÉGIONAL ─── */}
      {niveau === "regional" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-5 rounded-full" style={{ background: "#0F78C8" }} />
            <h3 className="font-bold text-base text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {userNiveau === "regional"
                ? "Statistiques — Région Ecclésiastique du Centre (Conseil Régional)"
                : "Statistiques — Échelon Régional"}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <StatCard label="Églises de la Région" value="284" sub="Réparties sur 35 sous-régions" icon={Church} color="#0F78C8" bg="#D9EEFA" />
            <StatCard label="Membres actifs région" value="98 400" sub="+840 ce mois" icon={Users} color="#16A34A" bg="#DCFCE7" />
            <StatCard label="Sous-régions actives" value="35" sub="100% opérationnelles" icon={MapPin} color="#C8973A" bg="#FDF4E0" />
            <StatCard label="Baptêmes 2026" value="482" sub="+38 ce mois" icon={Award} color="#0891B2" bg="#E0F2FE" />
          </div>

          <div className="card overflow-hidden mt-4">
            <div className="p-4 border-b">
              <h3 className="section-title text-base">Sous-régions coordonnées par le Conseil Régional du Centre</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sous-région</th>
                  <th>Président sous-régional</th>
                  <th style={{ textAlign: "right" }}>Églises</th>
                  <th style={{ textAlign: "right" }}>Membres</th>
                  <th>Taux de remontée</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { col1: "Ouaga-Nord", col2: "Pasteur Samuel Zoungrana", col3: 12, col4: 4820, col5: "100%" },
                  { col1: "Ouaga-Sud", col2: "Pasteur Michel Ouédraogo", col3: 14, col4: 5430, col5: "98%" },
                  { col1: "Ouaga-Est", col2: "Pasteur Daniel Kaboré", col3: 11, col4: 4120, col5: "95%" },
                  { col1: "Ouaga-Ouest", col2: "Pasteur Paul Tiendrebéogo", col3: 13, col4: 4950, col5: "97%" },
                  { col1: "Kadiogo-Nord", col2: "Pasteur Lazare Sawadogo", col3: 10, col4: 3680, col5: "92%" },
                  { col1: "Kadiogo-Sud", col2: "Pasteur Simon Compaoré", col3: 16, col4: 5890, col5: "96%" },
                ].map((r, i) => (
                  <tr key={i}>
                    <td className="font-semibold text-sky-800">{r.col1}</td>
                    <td className="text-xs text-slate-700">{r.col2}</td>
                    <td className="text-right font-medium">{r.col3}</td>
                    <td className="text-right font-semibold">{r.col4.toLocaleString("fr-FR")}</td>
                    <td><span className="badge badge-success">{r.col5}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── CENTRE BEN ─── */}
      {niveau === "centre" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-5 rounded-full" style={{ background: "#0A5490" }} />
            <h3 className="font-bold text-base text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {userNiveau === "centre"
                ? "Statistiques — Centre Inter-Régional Kadiogo / Plateau (Supervision BEN)"
                : "Statistiques — Échelon des Centres de supervision BEN"}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <StatCard label="Églises supervisées" value="90" sub="Bogodogo & Ziniaré" icon={Church} color="#0A5490" bg="#E0F2FE" />
            <StatCard label="Membres consolidés" value="32 700" sub="+450 ce mois" icon={Users} color="#16A34A" bg="#DCFCE7" />
            <StatCard label="Régions rattachées" value="2" sub="Bogodogo, Ziniaré" icon={Globe} color="#0F78C8" bg="#D9EEFA" />
            <StatCard label="Sous-régions actives" value="9" sub="2 Bogodogo, 7 Ziniaré" icon={Layers} color="#16A34A" bg="#DCFCE7" />
          </div>

          <div className="card overflow-hidden mt-4">
            <div className="p-4 border-b">
              <h3 className="section-title text-base">Régions rattachées au Centre N°5 (Supervision BEN)</h3>
              <p className="text-xs text-gray-400 mt-0.5">Instance intermédiaire BEN : Régions Bogodogo et Ziniaré (9 Sous-régions)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Région ecclésiastique</th>
                    <th>Chef-lieu</th>
                    <th>Sous-régions</th>
                    <th style={{ textAlign: "right" }}>Églises</th>
                    <th style={{ textAlign: "right" }}>Membres</th>
                    <th>Taux conformité 3R</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { r: "Région Bogodogo", chef: "Bogodogo", sr: "2 (Bogodogo Sud, Bogodogo Nord)", eg: 32, m: 14000, c: "98%" },
                    { r: "Région Ziniaré", chef: "Ziniaré", sr: "7 (Ziniaré, Loumbila, Zitenga, Dapélogo, Nagréongo, Absouya, Ourgou)", eg: 58, m: 18700, c: "97%" },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="font-bold text-sky-800">{row.r}</td>
                      <td className="text-xs text-slate-700">{row.chef}</td>
                      <td className="text-xs font-semibold text-slate-800">{row.sr}</td>
                      <td className="text-right font-medium">{row.eg}</td>
                      <td className="text-right font-semibold">{row.m.toLocaleString("fr-FR")}</td>
                      <td><span className="badge badge-success">{row.c}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── NATIONAL ─── */}
      {niveau === "national" && (userNiveau === "national" || userNiveau === "finance") && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-5 rounded-full" style={{ background: "#7C3AED" }} />
            <h3 className="font-bold text-base text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Statistiques — Vue Nationale Consolidée (Bureau Exécutif National)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <StatCard label="Églises sur le territoire" value="1 842" sub="79 régions ecclés." icon={Church} color="#7C3AED" bg="#EDE9FE" />
            <StatCard label="Membres actifs consolidés" value="487 320" sub="+4 218 ce mois" icon={Users} color="#0F78C8" bg="#D9EEFA" />
            <StatCard label="Centres BEN de supervision" value="6" sub="Inter-régionaux" icon={Layers} color="#0A5490" bg="#E0F2FE" />
            <StatCard label="Baptêmes nationaux" value="2 340" sub="+187 ce trim." icon={Award} color="#16A34A" bg="#DCFCE7" />
          </div>

          <div className="card overflow-hidden mt-4">
            <div className="p-4 border-b">
              <h3 className="section-title text-base">Consolidation par Région ecclésiastique</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Région</th>
                  <th style={{ textAlign: "right" }}>Églises</th>
                  <th style={{ textAlign: "right" }}>Membres</th>
                  <th style={{ textAlign: "right" }}>Baptêmes</th>
                  <th>Fréquentation</th>
                </tr>
              </thead>
              <tbody>
                {allRegionsData.map(r => (
                  <tr key={r.region}>
                    <td className="font-semibold text-purple-800">{r.region}</td>
                    <td className="text-right font-medium">{r.eglises}</td>
                    <td className="text-right font-semibold">{r.membres.toLocaleString("fr-FR")}</td>
                    <td className="text-right text-amber-600 font-semibold">{r.baptemes}</td>
                    <td><span className="badge badge-success">{r.frequentation}%</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
