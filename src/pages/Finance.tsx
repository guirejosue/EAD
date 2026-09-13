import { useState, useEffect } from "react";
import {
  Plus, Download, Filter, Search, ArrowUpRight, ArrowDownRight,
  TrendingUp, TrendingDown, Wallet, PiggyBank, CheckCircle, Clock,
  AlertCircle, ChevronRight, FileText, Upload, X
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, LineChart, Line
} from "recharts";
import type { SupervisionScope } from "../components/AppLayout";

type FinView = "dashboard" | "journal" | "recettes" | "depenses" | "budget" | "rapports";

export type JournalEntry = {
  date: string;
  ref: string;
  libelle: string;
  type: string;
  compte: string;
  recette: number | null;
  depense: number | null;
  solde: number;
  statut: string;
  niveau: "Église locale" | "Sous-région" | "Région" | "Centre" | "National";
  entite: string;
  region: string;
  sousregion?: string;
};

const allJournalData: JournalEntry[] = [
  { date: "02/09/2026", ref: "R-2026-0842", libelle: "Dîme dominicale — Culte de réveil", type: "Recette", compte: "7001", recette: 320000, depense: null, solde: 5420000, statut: "Validé", niveau: "Église locale", entite: "Église Centrale Ouagadougou", region: "Centre", sousregion: "Ouaga-Nord" },
  { date: "02/09/2026", ref: "R-2026-0843", libelle: "Offrandes ordinaires des 3 cultes", type: "Recette", compte: "7002", recette: 185000, depense: null, solde: 5605000, statut: "Validé", niveau: "Église locale", entite: "Église Centrale Ouagadougou", region: "Centre", sousregion: "Ouaga-Nord" },
  { date: "01/09/2026", ref: "D-2026-0423", libelle: "Facture Sonabel électricité temple central", type: "Dépense", compte: "6061", recette: null, depense: 125000, solde: 5480000, statut: "Validé", niveau: "Église locale", entite: "Église Centrale Ouagadougou", region: "Centre", sousregion: "Ouaga-Nord" },
  { date: "01/09/2026", ref: "D-2026-0421", libelle: "Frais logistiques pastoraux de sous-région", type: "Dépense", compte: "6120", recette: null, depense: 45000, solde: 5100000, statut: "Validé", niveau: "Sous-région", entite: "Sous-région Ouaga-Nord", region: "Centre", sousregion: "Ouaga-Nord" },
  { date: "01/09/2026", ref: "R-2026-0844", libelle: "Dîme pastorale & offrande moisson", type: "Recette", compte: "7001", recette: 210000, depense: null, solde: 5310000, statut: "Validé", niveau: "Église locale", entite: "Temple Béthel Nord", region: "Centre", sousregion: "Ouaga-Nord" },
  { date: "31/08/2026", ref: "R-2026-0845", libelle: "Collecte mensuelle pour le Conseil Régional", type: "Recette", compte: "7004", recette: 480000, depense: null, solde: 5790000, statut: "Validé", niveau: "Région", entite: "Conseil Régional du Centre", region: "Centre" },
  { date: "31/08/2026", ref: "D-2026-0420", libelle: "Achat fournitures de secrétariat & registres", type: "Dépense", compte: "6020", recette: null, depense: 28500, solde: 5061000, statut: "Validé", niveau: "Région", entite: "Coordination Région Cascades", region: "Cascades" },
  { date: "31/08/2026", ref: "D-2026-0422", libelle: "Mission de supervision BEN Kadiogo / Plateau", type: "Dépense", compte: "6230", recette: null, depense: 95000, solde: 4966000, statut: "Validé", niveau: "Centre", entite: "Centre Inter-Régional Kadiogo / Plateau", region: "Centre" },
  { date: "30/08/2026", ref: "D-2026-0419", libelle: "Facture électricité — Siège National", type: "Dépense", compte: "6061", recette: null, depense: 142000, solde: 5089500, statut: "Comptabilisé", niveau: "National", entite: "Bureau Exécutif National (BEN)", region: "National" },
  { date: "30/08/2026", ref: "R-2026-0840", libelle: "Don spécial — Projet d'évangélisation Sahel", type: "Recette", compte: "7400", recette: 500000, depense: null, solde: 5231500, statut: "Validé", niveau: "Église locale", entite: "Église AG Dori Centre (Sahel)", region: "Sahel" },
  { date: "29/08/2026", ref: "D-2026-0418", libelle: "Quote-part missionnaire reversée au centre", type: "Dépense", compte: "6200", recette: null, depense: 85000, solde: 4731500, statut: "Brouillon", niveau: "Centre", entite: "Centre Inter-Régional Ouest (Bobo)", region: "Hauts-Bassins" },
  { date: "28/08/2026", ref: "R-2026-0839", libelle: "Collecte mensuelle pour les écoles bibliques", type: "Recette", compte: "7004", recette: 420000, depense: null, solde: 5151500, statut: "Validé", niveau: "Sous-région", entite: "Sous-région Kadiogo-Sud", region: "Centre", sousregion: "Kadiogo-Sud" },
  { date: "27/08/2026", ref: "D-2026-0424", libelle: "Entretien sonorisation temple central", type: "Dépense", compte: "6150", recette: null, depense: 60000, solde: 5091500, statut: "Validé", niveau: "Église locale", entite: "Église Centrale Ouagadougou", region: "Centre", sousregion: "Ouaga-Nord" },
  { date: "26/08/2026", ref: "R-2026-0846", libelle: "Don diaconat — Soutien aux veuves", type: "Recette", compte: "7420", recette: 50000, depense: null, solde: 5141500, statut: "Validé", niveau: "Église locale", entite: "Église Centrale Ouagadougou", region: "Centre", sousregion: "Ouaga-Nord" },
];

function fmtFCFA(v: number | null) {
  if (v === null) return "—";
  return new Intl.NumberFormat("fr-FR").format(v) + " FCFA";
}

function StatCard({ label, value, sub, color, icon: Icon, bg }: { label: string; value: string; sub?: string; color: string; icon: React.ElementType; bg: string }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>
      <div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
      {sub && <div className="text-xs font-semibold mt-1" style={{ color }}>{sub}</div>}
    </div>
  );
}

function StatusBadge({ s }: { s: string }) {
  const map: Record<string, [string, string]> = {
    "Validé": ["badge-success", "#16A34A"],
    "Comptabilisé": ["badge-info", "#0D67B0"],
    "Brouillon": ["badge-warning", "#92400E"],
    "Soumis": ["badge-gold", "#9A6F22"],
  };
  const [cls] = map[s] || ["badge-info", "#64748B"];
  return <span className={`badge ${cls}`}>{s}</span>;
}

export default function Finance({ initialTab, currentScope }: { initialTab?: string | null; currentScope?: SupervisionScope }) {
  const niveau = currentScope?.niveau || "national";

  const [view, setView] = useState<FinView>(
    (initialTab && ["dashboard", "journal", "recettes", "depenses", "budget", "rapports"].includes(initialTab))
      ? (initialTab as FinView)
      : (niveau === "local" ? "journal" : "dashboard")
  );

  useEffect(() => {
    if (initialTab && ["dashboard", "journal", "recettes", "depenses", "budget", "rapports"].includes(initialTab)) {
      setView(initialTab as FinView);
    }
  }, [initialTab]);

  const [showRecetteForm, setShowRecetteForm] = useState(false);
  const [showDepenseForm, setShowDepenseForm] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState<string>("Tous");
  const [searchJournal, setSearchJournal] = useState("");

  // Scope-specific configuration
  const scopeFinConfigs = {
    local: {
      headerTitle: "Gestion financière — Église Centrale Ouagadougou",
      headerSubtitle: "Caisse de l'église locale · Saisie des cultes · Pasteur Samuel Kaboré",
      bannerBadge: "Échelon Local (Église locale)",
      bannerTitle: "Journal de caisse & Saisie des recettes de culte",
      bannerDesc: "En tant que pasteur d'église locale, vous saisissez directement les recettes primaires (dîmes, offrandes, dons) et les menues dépenses de fonctionnement. Ces écritures sont validées localement et transmises automatiquement à votre sous-région (Ouaga-Nord).",
      statCoverage: "4 annexes rattachées",
      statSub: "Église locale active",
      soldeCaisse: "420 000 FCFA",
      soldeBanque: "1 200 000 FCFA",
      recettesMois: "1 850 000 FCFA",
      depensesMois: "1 120 000 FCFA",
      tabs: [
        { id: "journal" as FinView, label: "Journal de caisse locale" },
        { id: "recettes" as FinView, label: "Recettes de culte" },
        { id: "depenses" as FinView, label: "Dépenses locales" },
        { id: "budget" as FinView, label: "Budget église locale" },
      ],
      filterOptions: ["Tous", "Recettes", "Dépenses"],
      filterData: (items: JournalEntry[]) =>
        items.filter(j => j.entite === "Église Centrale Ouagadougou")
    },

    sousregional: {
      headerTitle: "Gestion financière — Sous-région Ouaga-Nord",
      headerSubtitle: "Coordination & validation des 12 églises · Pasteur Samuel Zoungrana",
      bannerBadge: "Échelon Sous-Régional",
      bannerTitle: "Validation & Remontée financière des 12 églises de Ouaga-Nord",
      bannerDesc: "Les déclarations financières saisies au niveau des églises locales remontent dans votre journal sous-régional pour vérification et validation avant consolidation au Conseil Régional du Centre.",
      statCoverage: "12 / 12 églises déclarantes (100%)",
      statSub: "Remontée validée",
      soldeCaisse: "650 000 FCFA",
      soldeBanque: "1 700 000 FCFA",
      recettesMois: "4 200 000 FCFA",
      depensesMois: "2 650 000 FCFA",
      tabs: [
        { id: "dashboard" as FinView, label: "Dashboard sous-régional" },
        { id: "journal" as FinView, label: "Journal sous-régional" },
        { id: "recettes" as FinView, label: "Recettes consolidées" },
        { id: "depenses" as FinView, label: "Dépenses" },
        { id: "rapports" as FinView, label: "Déclarations des églises" },
      ],
      filterOptions: ["Tous", "Église locale", "Sous-région"],
      filterData: (items: JournalEntry[]) =>
        items.filter(j => j.sousregion === "Ouaga-Nord" || j.entite === "Sous-région Ouaga-Nord")
    },

    regional: {
      headerTitle: "Gestion financière — Région Ecclésiastique du Centre",
      headerSubtitle: "Consolidation des 35 sous-régions et 284 églises · Pasteur Jean-Baptiste Kaboré",
      bannerBadge: "Échelon Régional",
      bannerTitle: "Consolidation financière régionale (Région Centre)",
      bannerDesc: "Coordination et supervision financière de 35 sous-régions et 284 églises locales. Les flux validés par les sous-régions sont consolidés ici avant transmission au Centre BEN Kadiogo / Plateau.",
      statCoverage: "35 / 35 sous-régions consolidées",
      statSub: "Budget 142M FCFA",
      soldeCaisse: "1 200 000 FCFA",
      soldeBanque: "4 200 000 FCFA",
      recettesMois: "12 400 000 FCFA",
      depensesMois: "8 100 000 FCFA",
      tabs: [
        { id: "dashboard" as FinView, label: "Dashboard régional" },
        { id: "journal" as FinView, label: "Journal régional" },
        { id: "recettes" as FinView, label: "Recettes régionales" },
        { id: "depenses" as FinView, label: "Dépenses régionales" },
        { id: "budget" as FinView, label: "Budget régional" },
        { id: "rapports" as FinView, label: "Rapports de consolidation" },
      ],
      filterOptions: ["Tous", "Église locale", "Sous-région", "Région"],
      filterData: (items: JournalEntry[]) =>
        items.filter(j => j.region === "Centre")
    },

    centre: {
      headerTitle: "Supervision financière BEN — Centre N°5",
      headerSubtitle: "Échelon intermédiaire BEN · Régions Bogodogo & Ziniaré (9 Sous-régions) · Pasteur Philippe Oubda",
      bannerBadge: "Échelon des Centres (BEN)",
      bannerTitle: "Supervision BEN des flux financiers inter-régionaux",
      bannerDesc: "Instance stratégique du Bureau Exécutif National garantissant l'intégrité et la conformité des remontées financières ascendantes des Régions Bogodogo et Ziniaré avant validation nationale.",
      statCoverage: "2 / 2 régions supervisées BEN",
      statSub: "98.2% taux de remontée (9 sous-régions)",
      soldeCaisse: "1 850 000 FCFA",
      soldeBanque: "7 200 000 FCFA",
      recettesMois: "12 000 000 FCFA",
      depensesMois: "7 800 000 FCFA",
      tabs: [
        { id: "dashboard" as FinView, label: "Dashboard BEN" },
        { id: "journal" as FinView, label: "Journal des flux" },
        { id: "recettes" as FinView, label: "Recettes supervisées" },
        { id: "depenses" as FinView, label: "Dépenses de supervision" },
        { id: "budget" as FinView, label: "Budgets inter-régionaux" },
        { id: "rapports" as FinView, label: "Rapports BEN" },
      ],
      filterOptions: ["Tous", "Région Bogodogo", "Région Ziniaré", "Centre N°5"],
      filterData: (items: JournalEntry[]) =>
        items.filter(j => j.region === "Centre" || j.region === "Bogodogo" || j.region === "Ziniaré" || j.niveau === "Centre")
    },

    national: {
      headerTitle: "Gestion financière — Présidence Nationale BEN",
      headerSubtitle: "Consolidation globale · 79 Régions · 1 842 Églises · Rév. Dr Etienne P. Zongo",
      bannerBadge: "Bureau Exécutif National (BEN)",
      bannerTitle: "Consolidation nationale des déclarations de base",
      bannerDesc: "Les déclarations financières (dîmes, offrandes, journaux de caisse) sont saisies directement par les églises locales, validées au niveau des sous-régions, coordonnées par les régions, supervisées par les membres du BEN au niveau des centres, puis consolidées par la Trésorerie Centrale et le Président National.",
      statCoverage: "1 702 / 1 842 églises déclarantes (92.4%)",
      statSub: "79 / 79 régions supervisées BEN",
      soldeCaisse: "1 200 000 FCFA",
      soldeBanque: "4 200 000 FCFA",
      recettesMois: "15 600 000 FCFA",
      depensesMois: "10 200 000 FCFA",
      tabs: [
        { id: "dashboard" as FinView, label: "Dashboard financier" },
        { id: "journal" as FinView, label: "Journal consolidé" },
        { id: "recettes" as FinView, label: "Recettes nationales" },
        { id: "depenses" as FinView, label: "Dépenses nationales" },
        { id: "budget" as FinView, label: "Budget national 2026" },
        { id: "rapports" as FinView, label: "Rapports & Audit" },
      ],
      filterOptions: ["Tous", "Église locale", "Sous-région", "Région", "Centre", "National"],
      filterData: (items: JournalEntry[]) => items
    },

    finance: {
      headerTitle: "Trésorerie Centrale & Consolidation Nationale AD/BF",
      headerSubtitle: "Remontée financière intégrale · Dr. Enoch Yaméogo (Trésorier National)",
      bannerBadge: "Trésorerie Centrale AD/BF",
      bannerTitle: "Consolidation nationale des déclarations financières de base",
      bannerDesc: "La Trésorerie Centrale consolide les déclarations issues de tout le territoire national, enregistrées au plus bas niveau dans chaque assemblée locale et vérifiées par la chaîne hiérarchique.",
      statCoverage: "1 702 / 1 842 déclarations enregistrées",
      statSub: "Couverture 92.4%",
      soldeCaisse: "1 200 000 FCFA",
      soldeBanque: "4 200 000 FCFA",
      recettesMois: "15 600 000 FCFA",
      depensesMois: "10 200 000 FCFA",
      tabs: [
        { id: "dashboard" as FinView, label: "Dashboard trésorerie" },
        { id: "journal" as FinView, label: "Journal de caisse consolidé" },
        { id: "recettes" as FinView, label: "Recettes nationales" },
        { id: "depenses" as FinView, label: "Dépenses nationales" },
        { id: "budget" as FinView, label: "Budgets 2026" },
        { id: "rapports" as FinView, label: "Rapports comptables" },
      ],
      filterOptions: ["Tous", "Église locale", "Sous-région", "Région", "Centre", "National"],
      filterData: (items: JournalEntry[]) => items
    }
  };

  const currentCfg = scopeFinConfigs[niveau] || scopeFinConfigs.national;

  // Filter journal data strictly according to jurisdiction
  const scopedJournal = currentCfg.filterData(allJournalData);

  const filteredJournal = scopedJournal.filter(j => {
    const matchOrigin =
      selectedOrigin === "Tous" ||
      (selectedOrigin === "Recettes" && j.type === "Recette") ||
      (selectedOrigin === "Dépenses" && j.type === "Dépense") ||
      j.niveau === selectedOrigin ||
      (selectedOrigin === "Région Centre" && j.region === "Centre") ||
      (selectedOrigin === "Centre BEN" && j.niveau === "Centre");

    const matchSearch =
      !searchJournal ||
      j.libelle.toLowerCase().includes(searchJournal.toLowerCase()) ||
      j.entite.toLowerCase().includes(searchJournal.toLowerCase()) ||
      j.ref.toLowerCase().includes(searchJournal.toLowerCase());

    return matchOrigin && matchSearch;
  });

  const monthlyChartData = [
    { mois: "Jan", recettes: niveau === "local" ? 1200000 : 8200000, depenses: niveau === "local" ? 850000 : 5100000, solde: niveau === "local" ? 350000 : 3100000 },
    { mois: "Fév", recettes: niveau === "local" ? 1350000 : 9400000, depenses: niveau === "local" ? 920000 : 6300000, solde: niveau === "local" ? 430000 : 3100000 },
    { mois: "Mar", recettes: niveau === "local" ? 1520000 : 11200000, depenses: niveau === "local" ? 980000 : 7800000, solde: niveau === "local" ? 540000 : 3400000 },
    { mois: "Avr", recettes: niveau === "local" ? 1480000 : 10800000, depenses: niveau === "local" ? 950000 : 6900000, solde: niveau === "local" ? 530000 : 3900000 },
    { mois: "Mai", recettes: niveau === "local" ? 1650000 : 12500000, depenses: niveau === "local" ? 1050000 : 8200000, solde: niveau === "local" ? 600000 : 4300000 },
    { mois: "Jun", recettes: niveau === "local" ? 1720000 : 14200000, depenses: niveau === "local" ? 1100000 : 9100000, solde: niveau === "local" ? 620000 : 5100000 },
    { mois: "Jul", recettes: niveau === "local" ? 1680000 : 13800000, depenses: niveau === "local" ? 1080000 : 8700000, solde: niveau === "local" ? 600000 : 5100000 },
    { mois: "Aoû", recettes: niveau === "local" ? 1850000 : 15600000, depenses: niveau === "local" ? 1120000 : 10200000, solde: niveau === "local" ? 730000 : 5400000 },
  ];

  return (
    <div>
      {/* Hierarchical Financial Flow Banner */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-900">
                {currentCfg.bannerBadge}
              </span>
              <span className="text-xs text-sky-200">Chaîne financière 3R ascendante</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              {currentCfg.bannerTitle}
            </h3>
            <p className="text-xs text-sky-100/90 leading-relaxed max-w-3xl">
              {currentCfg.bannerDesc}
            </p>
          </div>
          <div className="flex flex-wrap md:flex-col gap-2 text-xs flex-shrink-0">
            <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/15">
              <span className="font-bold text-amber-300">{currentCfg.statCoverage}</span>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/15">
              <span className="font-bold text-emerald-300">{currentCfg.statSub}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="page-header mb-5">
        <div>
          <h1 className="section-title text-2xl">{currentCfg.headerTitle}</h1>
          <p className="text-sm text-gray-500 mt-1">{currentCfg.headerSubtitle}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowRecetteForm(true)} className="btn-primary"><Plus size={15} /> Recette</button>
          <button onClick={() => setShowDepenseForm(true)} className="btn-secondary"><Plus size={15} /> Dépense</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-6 overflow-x-auto" style={{ background: "#F1F5F9", border: "1px solid #D9EEFA" }}>
        {currentCfg.tabs.map(t => (
          <button key={t.id} onClick={() => setView(t.id)} className={`tab-btn whitespace-nowrap ${view === t.id ? "active" : ""}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD VIEW */}
      {view === "dashboard" && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <StatCard label="Solde caisse" value={currentCfg.soldeCaisse} color="#16A34A" icon={PiggyBank} bg="#DCFCE7" />
            <StatCard label="Solde banque" value={currentCfg.soldeBanque} color="#0F78C8" icon={Wallet} bg="#D9EEFA" />
            <StatCard label="Recettes — Août 2026" value={currentCfg.recettesMois} sub="+13% vs juil." color="#C8973A" icon={TrendingUp} bg="#FDF4E0" />
            <StatCard label="Dépenses — Août 2026" value={currentCfg.depensesMois} sub="+5% vs juil." color="#DC2626" icon={TrendingDown} bg="#FEE2E2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            <div className="lg:col-span-2 card p-5">
              <h3 className="section-title text-base mb-1">Recettes vs Dépenses</h3>
              <p className="text-xs text-gray-400 mb-5">Évolution mensuelle 2026 — en FCFA ({currentCfg.bannerBadge})</p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyChartData}>
                  <defs>
                    <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#94A3B8" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v => (niveau === "local" ? (v / 1000).toFixed(0) + "K" : (v / 1000000).toFixed(1) + "M")}
                  />
                  <Tooltip formatter={(v: any) => fmtFCFA(v)} contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="recettes" name="Recettes" stroke="#16A34A" strokeWidth={2} fill="url(#gr)" />
                  <Area type="monotone" dataKey="depenses" name="Dépenses" stroke="#DC2626" strokeWidth={2} fill="url(#gd)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="card p-5">
              <h3 className="section-title text-base mb-1">Évolution du solde</h3>
              <p className="text-xs text-gray-400 mb-5">Solde net mensuel 2026</p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#94A3B8" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v => (niveau === "local" ? (v / 1000).toFixed(0) + "K" : (v / 1000000).toFixed(1) + "M")}
                  />
                  <Tooltip formatter={(v: any) => fmtFCFA(v)} contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} />
                  <Line type="monotone" dataKey="solde" name="Solde" stroke="#0F78C8" strokeWidth={2.5} dot={{ fill: "#0F78C8", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* JOURNAL VIEW */}
      {view === "journal" && (
        <div className="card overflow-hidden">
          <div className="p-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderColor: "#F1F5F9" }}>
            <div>
              <h3 className="section-title">
                {niveau === "local"
                  ? "Journal de caisse — Église Centrale Ouagadougou"
                  : niveau === "sousregional"
                  ? "Journal de caisse — Sous-région Ouaga-Nord"
                  : niveau === "regional"
                  ? "Journal de caisse — Région Centre"
                  : "Journal de caisse consolidé"}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {scopedJournal.length} écritures validées relevant de votre circonscription ({currentScope?.instance || "National"})
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
                <input
                  placeholder="Rechercher…"
                  value={searchJournal}
                  onChange={e => setSearchJournal(e.target.value)}
                  className="form-input text-xs pl-8"
                  style={{ width: 180 }}
                />
              </div>
              <button className="btn-secondary text-xs"><Download size={14} /> Exporter</button>
            </div>
          </div>

          {/* Scoped Filter Bar */}
          <div className="px-5 py-3 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1">Filtrer par :</span>
            {currentCfg.filterOptions.map(level => {
              const active = selectedOrigin === level;
              return (
                <button
                  key={level}
                  onClick={() => setSelectedOrigin(level)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    active ? "bg-sky-600 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  {level}
                  {level === "Tous" && ` (${scopedJournal.length})`}
                </button>
              );
            })}
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Référence</th>
                  <th>Origine ecclésiale</th>
                  <th>Libellé</th>
                  <th>Compte</th>
                  <th style={{ textAlign: "right" }}>Recette</th>
                  <th style={{ textAlign: "right" }}>Dépense</th>
                  <th style={{ textAlign: "right" }}>Solde</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredJournal.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-6 text-xs text-gray-400">
                      Aucune écriture trouvée pour les critères sélectionnés.
                    </td>
                  </tr>
                ) : (
                  filteredJournal.map((row, i) => (
                    <tr key={i}>
                      <td className="text-xs" style={{ color: "#64748B" }}>{row.date}</td>
                      <td className="font-mono text-xs font-semibold" style={{ color: "#0F78C8" }}>{row.ref}</td>
                      <td>
                        <div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                            row.niveau === "National" ? "bg-amber-100 text-amber-800" :
                            row.niveau === "Centre" ? "bg-indigo-100 text-indigo-800" :
                            row.niveau === "Région" ? "bg-purple-100 text-purple-800" :
                            row.niveau === "Sous-région" ? "bg-sky-100 text-sky-800" :
                            "bg-emerald-100 text-emerald-800"
                          }`}>
                            {row.niveau}
                          </span>
                          <div className="text-xs text-slate-700 font-medium mt-0.5 max-w-[200px] truncate" title={row.entite}>
                            {row.entite}
                          </div>
                        </div>
                      </td>
                      <td className="text-xs font-medium text-slate-900">{row.libelle}</td>
                      <td className="font-mono text-xs text-slate-500">{row.compte}</td>
                      <td className="text-right text-xs font-bold" style={{ color: "#16A34A" }}>
                        {fmtFCFA(row.recette)}
                      </td>
                      <td className="text-right text-xs font-bold" style={{ color: "#DC2626" }}>
                        {fmtFCFA(row.depense)}
                      </td>
                      <td className="text-right text-xs font-semibold text-slate-700">
                        {fmtFCFA(row.solde)}
                      </td>
                      <td><StatusBadge s={row.statut} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RECETTES VIEW */}
      {view === "recettes" && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="section-title">
              {niveau === "local" ? "Recettes — Culte & Dîmes de l'église" : "Gestion des recettes consolidées"}
            </h3>
            <button onClick={() => setShowRecetteForm(true)} className="btn-primary"><Plus size={15} /> Ajouter une recette</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            {[
              { label: "Dîmes", value: niveau === "local" ? "1 150 000" : "48 420 000", pct: "62%", color: "#0F78C8" },
              { label: "Offrandes", value: niveau === "local" ? "520 000" : "28 700 000", pct: "28%", color: "#C8973A" },
              { label: "Dons diaconat", value: niveau === "local" ? "120 000" : "12 300 000", pct: "7%", color: "#16A34A" },
              { label: "Autres", value: niveau === "local" ? "60 000" : "5 800 000", pct: "3%", color: "#7C3AED" },
            ].map(r => (
              <div key={r.label} className="stat-card">
                <div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: r.color }}>{r.value} FCFA</div>
                <div className="text-xs text-gray-400">{r.label}</div>
                <div className="text-xs font-semibold mt-1" style={{ color: "#64748B" }}>{r.pct} du total</div>
              </div>
            ))}
          </div>

          <div className="card overflow-hidden">
            <table className="data-table">
              <thead>
                <tr><th>Date</th><th>Type</th><th>Libellé</th><th>Entité</th><th style={{ textAlign: "right" }}>Montant</th><th>Statut</th></tr>
              </thead>
              <tbody>
                {filteredJournal.filter(j => j.type === "Recette").map((r, i) => (
                  <tr key={i}>
                    <td className="text-xs text-gray-500">{r.date}</td>
                    <td><span className="badge badge-info">{r.type}</span></td>
                    <td className="text-xs font-medium">{r.libelle}</td>
                    <td className="text-xs text-gray-600">{r.entite}</td>
                    <td className="text-right font-bold text-sm" style={{ color: "#16A34A" }}>{fmtFCFA(r.recette)}</td>
                    <td><StatusBadge s={r.statut} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DEPENSES VIEW */}
      {view === "depenses" && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="section-title">
              {niveau === "local" ? "Dépenses de l'Église locale" : "Gestion des dépenses de fonctionnement"}
            </h3>
            <button onClick={() => setShowDepenseForm(true)} className="btn-secondary"><Plus size={15} /> Ajouter une dépense</button>
          </div>

          <div className="card overflow-hidden">
            <table className="data-table">
              <thead>
                <tr><th>Date</th><th>Référence</th><th>Libellé</th><th>Compte</th><th>Entité</th><th style={{ textAlign: "right" }}>Montant</th><th>Statut</th></tr>
              </thead>
              <tbody>
                {filteredJournal.filter(j => j.type === "Dépense").map((r, i) => (
                  <tr key={i}>
                    <td className="text-xs text-gray-500">{r.date}</td>
                    <td className="font-mono text-xs font-semibold text-sky-700">{r.ref}</td>
                    <td className="text-xs font-medium">{r.libelle}</td>
                    <td className="font-mono text-xs">{r.compte}</td>
                    <td className="text-xs text-gray-600">{r.entite}</td>
                    <td className="text-right font-bold text-sm" style={{ color: "#DC2626" }}>{fmtFCFA(r.depense)}</td>
                    <td><StatusBadge s={r.statut} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BUDGET VIEW */}
      {view === "budget" && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="section-title">Budget 2026 — {currentCfg.bannerBadge}</h3>
              <p className="text-xs text-gray-400 mt-1">Allocation budgétaire et exécution pour {currentScope?.instance || "le National"}</p>
            </div>
            <button className="btn-secondary text-xs"><Download size={14} /> Export PDF</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="stat-card"><div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{niveau === "local" ? "18 000 000" : "79 000 000"}</div><div className="text-xs text-gray-400">Budget prévisionnel (FCFA)</div></div>
            <div className="stat-card"><div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#16A34A" }}>{niveau === "local" ? "11 200 000" : "56 100 000"}</div><div className="text-xs text-gray-400">Réalisé (FCFA)</div></div>
            <div className="stat-card"><div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#C8973A" }}>{niveau === "local" ? "2 100 000" : "10 700 000"}</div><div className="text-xs text-gray-400">Engagements (FCFA)</div></div>
            <div className="stat-card"><div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#DC2626" }}>{niveau === "local" ? "4 700 000" : "12 200 000"}</div><div className="text-xs text-gray-400">Reste disponible (FCFA)</div></div>
          </div>
        </div>
      )}

      {/* RAPPORTS VIEW */}
      {view === "rapports" && (
        <div>
          <h3 className="section-title mb-5">Rapports financiers — {currentCfg.bannerBadge}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Journal de caisse certifié", desc: `Relevé des écritures de ${currentScope?.instance || "la circonscription"}`, icon: FileText, color: "#0F78C8" },
              { title: "Bilan des recettes et dîmes", desc: "Cumul mensuel et ventilation par culte", icon: TrendingUp, color: "#16A34A" },
              { title: "Bordereau de transmission 3R", desc: "Feuille de remontée vers l'échelon supérieur", icon: Wallet, color: "#C8973A" },
            ].map(r => (
              <div key={r.title} className="card p-5 cursor-pointer group" style={{ transition: "all 0.2s" }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: r.color + "15" }}>
                    <r.icon size={20} style={{ color: r.color }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{r.title}</h4>
                    <p className="text-xs text-gray-400">{r.desc}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="btn-secondary text-xs flex-1"><Download size={12} /> PDF</button>
                  <button className="btn-secondary text-xs flex-1"><Download size={12} /> Excel</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL RECETTE */}
      {showRecetteForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(6,14,37,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="card w-full max-w-lg p-6" style={{ background: "white", borderRadius: "16px" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Enregistrer une recette</h2>
              <button onClick={() => setShowRecetteForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748B" }}>
                <X size={20} />
              </button>
            </div>
            <div className="p-3 mb-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-800 font-medium">
              Entité déclarante : <strong>{currentScope?.instance || "Bureau National"}</strong> ({currentScope?.perimetre})
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Date *</label>
                  <input type="date" className="form-input" defaultValue="2026-09-02" />
                </div>
                <div>
                  <label className="form-label">Montant (FCFA) *</label>
                  <input type="number" placeholder="ex: 150000" className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">Type de recette *</label>
                <select className="form-input">
                  <option>Dîme dominicale</option>
                  <option>Offrande ordinaire</option>
                  <option>Offrande d'action de grâce</option>
                  <option>Don pour la mission</option>
                  <option>Quote-part statutaire</option>
                </select>
              </div>
              <div>
                <label className="form-label">Libellé de l'écriture *</label>
                <input placeholder="ex: Culte d'action de grâce — 1er culte" className="form-input" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setShowRecetteForm(false)} className="btn-secondary text-xs">Annuler</button>
              <button onClick={() => setShowRecetteForm(false)} className="btn-primary text-xs">Enregistrer l'écriture</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DEPENSE */}
      {showDepenseForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(6,14,37,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="card w-full max-w-lg p-6" style={{ background: "white", borderRadius: "16px" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Enregistrer une dépense</h2>
              <button onClick={() => setShowDepenseForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748B" }}>
                <X size={20} />
              </button>
            </div>
            <div className="p-3 mb-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium">
              Entité débitrice : <strong>{currentScope?.instance || "Bureau National"}</strong>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Date *</label>
                  <input type="date" className="form-input" defaultValue="2026-09-02" />
                </div>
                <div>
                  <label className="form-label">Montant (FCFA) *</label>
                  <input type="number" placeholder="ex: 45000" className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">Type de dépense *</label>
                <select className="form-input">
                  <option>Frais de fonctionnement</option>
                  <option>Électricité & Eau</option>
                  <option>Entretien & sonorisation</option>
                  <option>Diaconat & Aide sociale</option>
                  <option>Déplacement pastoral</option>
                </select>
              </div>
              <div>
                <label className="form-label">Libellé / Justificatif *</label>
                <input placeholder="ex: Achat carburant mission pastorale" className="form-input" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setShowDepenseForm(false)} className="btn-secondary text-xs">Annuler</button>
              <button onClick={() => setShowDepenseForm(false)} className="btn-primary text-xs" style={{ background: "#DC2626" }}>Valider la dépense</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
