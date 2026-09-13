import { useState, useEffect } from "react";
import {
  Shield, Globe, AlertTriangle, Settings2, Users, Church, Wallet,
  TrendingUp, Search, Download, Eye, BarChart3, Plus, Edit2,
  Trash2, ChevronDown, ChevronUp, Check, X, Bell, Lock, Activity,
  Database, Smartphone, RefreshCw, MapPin, Filter,
  AlertCircle, CheckCircle, Clock, Layers,
} from "lucide-react";
import img3RExplication from "../imports/3R_explication.jpeg";
import logo3R from "../imports/logo_3R.jpeg";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";
import type { SupervisionScope } from "../components/AppLayout";

type AdminTab = "national" | "entites" | "audit" | "config" | "gouvernance";
type EntiteType = "centres" | "regions" | "sousregions" | "pasteurs" | "utilisateurs";
type NiveauHierarchique = "local" | "sousregional" | "regional" | "centre" | "national";

/* ── Data ── */
export interface SousRegionItem {
  id: string;
  nom: string;
  region: string;
  centre: string;
  chefLieu: string;
  pasteurResponsable: string;
  eglises: number;
  membres: number;
  statut: "Actif" | "En cours";
}

export const SOUS_REGIONS_DATA: SousRegionItem[] = [
  // Région Bogodogo (Centre N°5)
  { id: "SR-BGD-01", nom: "Bogodogo Sud", region: "Bogodogo", centre: "Centre N°5", chefLieu: "Bogodogo", pasteurResponsable: "Pasteur Oumarou Ilboudo", eglises: 14, membres: 6200, statut: "Actif" },
  { id: "SR-BGD-02", nom: "Bogodogo Nord", region: "Bogodogo", centre: "Centre N°5", chefLieu: "Bogodogo", pasteurResponsable: "Pasteur Jean-Baptiste Kaboré", eglises: 18, membres: 7800, statut: "Actif" },

  // Région Ziniaré (Centre N°5)
  { id: "SR-ZNR-01", nom: "Ziniaré", region: "Ziniaré", centre: "Centre N°5", chefLieu: "Ziniaré", pasteurResponsable: "Pasteur Emmanuel Compaoré", eglises: 12, membres: 4100, statut: "Actif" },
  { id: "SR-ZNR-02", nom: "Loumbila", region: "Ziniaré", centre: "Centre N°5", chefLieu: "Loumbila", pasteurResponsable: "Pasteur Paul Tiendrebéogo", eglises: 8, membres: 2600, statut: "Actif" },
  { id: "SR-ZNR-03", nom: "Zitenga", region: "Ziniaré", centre: "Centre N°5", chefLieu: "Zitenga", pasteurResponsable: "Pasteur Jérémie Nikièma", eglises: 9, membres: 2850, statut: "Actif" },
  { id: "SR-ZNR-04", nom: "Dapélogo", region: "Ziniaré", centre: "Centre N°5", chefLieu: "Dapélogo", pasteurResponsable: "Pasteur David Sawadogo", eglises: 7, membres: 2300, statut: "Actif" },
  { id: "SR-ZNR-05", nom: "Nagréongo", region: "Ziniaré", centre: "Centre N°5", chefLieu: "Nagréongo", pasteurResponsable: "Pasteur Samuel Zoungrana", eglises: 6, membres: 1950, statut: "Actif" },
  { id: "SR-ZNR-06", nom: "Absouya", region: "Ziniaré", centre: "Centre N°5", chefLieu: "Absouya", pasteurResponsable: "Pasteur André Kaboré", eglises: 8, membres: 2400, statut: "Actif" },
  { id: "SR-ZNR-07", nom: "Ourgou", region: "Ziniaré", centre: "Centre N°5", chefLieu: "Ourgou", pasteurResponsable: "Pasteur Daniel Ouédraogo", eglises: 8, membres: 2500, statut: "Actif" },

  // Autres sous-régions représentatives
  { id: "SR-OUA-01", nom: "Ouaga-Nord", region: "Centre", centre: "Centre Kadiogo / Plateau", chefLieu: "Tampouy", pasteurResponsable: "Pasteur Samuel Kaboré", eglises: 12, membres: 5400, statut: "Actif" },
  { id: "SR-OUA-02", nom: "Ouaga-Sud", region: "Centre", centre: "Centre Kadiogo / Plateau", chefLieu: "Patte d'Oie", pasteurResponsable: "Pasteur Daniel Compaoré", eglises: 15, membres: 6800, statut: "Actif" },
  { id: "SR-BBO-01", nom: "Bobo-Centre", region: "Hauts-Bassins", centre: "Centre Grand Ouest", chefLieu: "Bobo Sect. 1", pasteurResponsable: "Pasteur Jean-Marc Ouédraogo", eglises: 16, membres: 7100, statut: "Actif" },
];

const centresData = [
  { id: 1, nom: "Centre N°5", chef: "Bogodogo / Ziniaré", superviseur: "Pasteur Philippe Oubda (BEN)", regions: "Bogodogo, Ziniaré", eglises: 90, statut: "Actif" },
  { id: 2, nom: "Centre Grand Ouest", chef: "Bobo-Dioulasso", superviseur: "Pasteur David Ilboudo (BEN)", regions: "Hauts-Bassins, Cascades", eglises: 352, statut: "Actif" },
  { id: 3, nom: "Centre Ouest & Mouhoun", chef: "Koudougou", superviseur: "Pasteur Samuel Zongo (BEN)", regions: "Centre-Ouest, Boucle du Mouhoun", eglises: 256, statut: "Actif" },
  { id: 4, nom: "Centre Grand Nord", chef: "Ouahigouya", superviseur: "Pasteur Isaac Traoré (BEN)", regions: "Nord, Sahel", eglises: 222, statut: "Actif" },
  { id: 5, nom: "Centre Grand Est", chef: "Fada N'Gourma", superviseur: "Pasteur Élie Tindano (BEN)", regions: "Est, Centre-Est", eglises: 208, statut: "Actif" },
  { id: 6, nom: "Centre Sud & Sud-Ouest", chef: "Manga", superviseur: "Pasteur Barthélémy Somé (BEN)", regions: "Centre-Sud, Sud-Ouest", eglises: 157, statut: "Actif" },
];

const regionData = [
  { id: 14, nom: "Bogodogo", chef: "Bogodogo", eglises: 32, membres: 14000, pasteurs: 48, budget: 6800000, statut: "Actif", centre: "Centre N°5" },
  { id: 13, nom: "Ziniaré", chef: "Ziniaré", eglises: 58, membres: 18700, pasteurs: 68, budget: 5200000, statut: "Actif", centre: "Centre N°5" },
  { id: 1, nom: "Centre", chef: "Ouagadougou", eglises: 284, membres: 98400, pasteurs: 342, budget: 24000000, statut: "Actif", centre: "Centre N°5" },
  { id: 2, nom: "Hauts-Bassins", chef: "Bobo-Dioulasso", eglises: 210, membres: 72300, pasteurs: 251, budget: 18500000, statut: "Actif", centre: "Centre Grand Ouest" },
  { id: 3, nom: "Cascades", chef: "Banfora", eglises: 142, membres: 48200, pasteurs: 168, budget: 12000000, statut: "Actif", centre: "Centre Grand Ouest" },
  { id: 4, nom: "Centre-Ouest", chef: "Koudougou", eglises: 138, membres: 46800, pasteurs: 162, budget: 11500000, statut: "Actif", centre: "Centre Ouest & Mouhoun" },
  { id: 5, nom: "Sahel", chef: "Dori", eglises: 98, membres: 31200, pasteurs: 114, budget: 8200000, statut: "Actif", centre: "Centre Grand Nord" },
  { id: 6, nom: "Est", chef: "Fada N'Gourma", eglises: 112, membres: 38400, pasteurs: 128, budget: 9800000, statut: "Actif", centre: "Centre Grand Est" },
  { id: 7, nom: "Nord", chef: "Ouahigouya", eglises: 124, membres: 42100, pasteurs: 145, budget: 10500000, statut: "Actif", centre: "Centre Grand Nord" },
  { id: 8, nom: "Centre-Nord", chef: "Kaya", eglises: 105, membres: 35600, pasteurs: 122, budget: 9200000, statut: "Actif", centre: "Centre Grand Est" },
  { id: 9, nom: "Boucle du Mouhoun", chef: "Dédougou", eglises: 118, membres: 40100, pasteurs: 136, budget: 10200000, statut: "Actif", centre: "Centre Ouest & Mouhoun" },
  { id: 10, nom: "Centre-Est", chef: "Tenkodogo", eglises: 96, membres: 32800, pasteurs: 111, budget: 8600000, statut: "Actif", centre: "Centre Grand Est" },
  { id: 11, nom: "Centre-Sud", chef: "Manga", eglises: 84, membres: 28500, pasteurs: 98, budget: 7500000, statut: "Actif", centre: "Centre Sud & Sud-Ouest" },
  { id: 12, nom: "Sud-Ouest", chef: "Gaoua", eglises: 73, membres: 24800, pasteurs: 85, budget: 6500000, statut: "Actif", centre: "Centre Sud & Sud-Ouest" },
];

const pasteurs = [
  { id: 1, nom: "Pasteur Samuel Kaboré", region: "Centre", eglise: "Église Centrale Ouagadougou", tel: "+226 70 00 00 01", statut: "Actif", ordination: "2008" },
  { id: 2, nom: "Pasteur Jean-Marc Ouédraogo", region: "Hauts-Bassins", eglise: "Église AG Bobo Sect. 22", tel: "+226 70 00 00 02", statut: "Actif", ordination: "2012" },
  { id: 3, nom: "Sœur Esther Koala", region: "Centre", eglise: "Église AG Pissy", tel: "+226 70 00 00 03", statut: "Actif", ordination: "2015" },
  { id: 4, nom: "Pasteur Pierre Sawadogo", region: "Sahel", eglise: "Église AG Dori Centre", tel: "+226 70 00 00 04", statut: "Actif", ordination: "2010" },
  { id: 5, nom: "Pasteur Isaac Traoré", region: "Nord", eglise: "Église AG Ouahigouya", tel: "+226 70 00 00 05", statut: "Actif", ordination: "2018" },
  { id: 6, nom: "Pasteur David Compaoré", region: "Cascades", eglise: "Église AG Banfora", tel: "+226 70 00 00 06", statut: "Inactif", ordination: "2016" },
];

const utilisateurs = [
  { id: 1, nom: "Rév. Dr Etienne P. Zongo", email: "president.ben@adbf.bf", role: "Président National", region: "Toutes (National)", dernConn: "Aujourd'hui 08:40", statut: "Actif" },
  { id: 2, nom: "Marie Ouédraogo", email: "m.ouedraogo@adbf.bf", role: "Secrétaire National", region: "Toutes", dernConn: "02/09/2026 07:15", statut: "Actif" },
  { id: 3, nom: "Jean-Baptiste Sawadogo", email: "jb.sawadogo@adbf.bf", role: "Comptable Régional", region: "Hauts-Bassins", dernConn: "01/09/2026 16:50", statut: "Actif" },
  { id: 4, nom: "Ruth Zongo", email: "r.zongo@adbf.bf", role: "Statisticien", region: "Cascades", dernConn: "01/09/2026 11:00", statut: "Actif" },
  { id: 5, nom: "David Traoré", email: "d.traore@adbf.bf", role: "Pasteur Régional", region: "Sahel", dernConn: "31/08/2026 — Échec", statut: "Suspendu" },
];

const auditData = [
  { date: "02/09/2026 08:42", user: "Rév. Dr Etienne P. Zongo", action: "Validation budget", module: "Finance", objet: "Budget 2026 — Bureau National", ip: "196.12.34.XXX", result: "Succès" },
  { date: "02/09/2026 07:18", user: "Marie Ouédraogo", action: "Saisie statistiques", module: "Statistiques", objet: "Rapport août 2026 — Région Centre", ip: "196.12.35.XXX", result: "Succès" },
  { date: "01/09/2026 16:55", user: "Jean-Baptiste Sawadogo", action: "Création dépense", module: "Finance", objet: "Dépense 45 000 FCFA — Carburant", ip: "196.12.36.XXX", result: "Succès" },
  { date: "01/09/2026 14:30", user: "Rév. Dr Etienne P. Zongo", action: "Modification permissions", module: "Utilisateurs", objet: "Rôle Comptable — ajout permission Exporter rapports", ip: "196.12.34.XXX", result: "Succès" },
  { date: "01/09/2026 11:20", user: "Ruth Zongo", action: "Export statistiques", module: "Statistiques", objet: "Export région Cascades — format Excel", ip: "196.12.37.XXX", result: "Succès" },
  { date: "31/08/2026 17:40", user: "David Traoré", action: "Tentative connexion", module: "Auth", objet: "Compte d.traore@adbf.bf", ip: "196.15.22.XXX", result: "Échec" },
  { date: "31/08/2026 09:15", user: "Élisée Compaoré", action: "Achat bibliothèque", module: "Bibliothèque", objet: "\"Leadership pastoral en Afrique\" — 4 000 FCFA", ip: "196.12.38.XXX", result: "Succès" },
  { date: "30/08/2026 15:02", user: "Rév. Dr Etienne P. Zongo", action: "Création utilisateur", module: "Utilisateurs", objet: "Nouveau compte : r.zongo@adbf.bf", ip: "196.12.34.XXX", result: "Succès" },
  { date: "30/08/2026 10:44", user: "Marie Ouédraogo", action: "Publication actualité", module: "Contenu", objet: "\"Conférence nationale des pasteurs 2026\"", ip: "196.12.35.XXX", result: "Succès" },
];

const growthData = [
  { mois: "Jan", eglises: 1798, membres: 472000 },
  { mois: "Mar", eglises: 1812, membres: 478000 },
  { mois: "Mai", eglises: 1824, membres: 482000 },
  { mois: "Jul", eglises: 1836, membres: 485000 },
  { mois: "Sep", eglises: 1842, membres: 487320 },
];

const moduleColors: Record<string, { bg: string; color: string }> = {
  Finance: { bg: "#D9EEFA", color: "#0A5490" },
  Statistiques: { bg: "#DCFCE7", color: "#15803D" },
  Utilisateurs: { bg: "#EDE9FE", color: "#6D28D9" },
  Auth: { bg: "#FEE2E2", color: "#B91C1C" },
  Bibliothèque: { bg: "#FDF4E0", color: "#9A6F22" },
  Contenu: { bg: "#FDF4E0", color: "#C8973A" },
};

function fmtFCFA(v: number) { return (v / 1000000).toFixed(1) + " M FCFA"; }

/* ── Modal: Ajouter/Modifier entité ── */
function EntityModal({ type, onClose }: { type: EntiteType; onClose: () => void }) {
  const labels: Record<EntiteType, string> = {
    centres: "Ajouter un centre (Supervision BEN)",
    regions: "Ajouter une région",
    sousregions: "Ajouter une sous-région",
    pasteurs: "Ajouter un pasteur",
    utilisateurs: "Ajouter un utilisateur",
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(3,42,78,0.45)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden" style={{ background: "white" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#F1F5F9" }}>
          <h3 className="font-bold text-base" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{labels[type]}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          {type === "centres" && (<>
            <div><label className="form-label">Nom du centre de supervision</label><input className="form-input" placeholder="Ex : Centre Kadiogo / Plateau" /></div>
            <div><label className="form-label">Chef-lieu</label><input className="form-input" placeholder="Ex : Ouagadougou" /></div>
            <div><label className="form-label">Membre référent du BEN</label><input className="form-input" placeholder="Ex : Pasteur Philippe Oubda (BEN)" /></div>
            <div><label className="form-label">Régions rattachées</label><input className="form-input" placeholder="Ex : Centre, Plateau-Central" /></div>
          </>)}
          {type === "regions" && (<>
            <div><label className="form-label">Nom de la région</label><input className="form-input" placeholder="Ex : Boucle du Mouhoun" /></div>
            <div><label className="form-label">Chef-lieu</label><input className="form-input" placeholder="Ex : Dédougou" /></div>
            <div><label className="form-label">Responsable régional</label><input className="form-input" placeholder="Nom du pasteur régional" /></div>
          </>)}
          {type === "sousregions" && (<>
            <div><label className="form-label">Nom de la sous-région</label><input className="form-input" placeholder="Ex : Sous-région Ouaga-Nord" /></div>
            <div><label className="form-label">Région de rattachement</label>
              <select className="form-input"><option>Sélectionner une région</option>{regionData.map(r => <option key={r.id}>{r.nom}</option>)}</select>
            </div>
            <div><label className="form-label">Pasteur responsable de sous-région</label><input className="form-input" placeholder="Nom du responsable" /></div>
          </>)}
          {type === "pasteurs" && (<>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="form-label">Nom</label><input className="form-input" placeholder="Nom de famille" /></div>
              <div><label className="form-label">Prénom</label><input className="form-input" placeholder="Prénom" /></div>
            </div>
            <div><label className="form-label">Région</label>
              <select className="form-input"><option>Sélectionner une région</option>{regionData.map(r => <option key={r.id}>{r.nom}</option>)}</select>
            </div>
            <div><label className="form-label">Église locale</label><input className="form-input" placeholder="Nom de l'assemblée" /></div>
            <div><label className="form-label">Téléphone</label><input className="form-input" placeholder="+226 XX XX XX XX" /></div>
            <div><label className="form-label">Année d'ordination</label><input type="number" className="form-input" placeholder="Ex : 2020" /></div>
          </>)}
          {type === "utilisateurs" && (<>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="form-label">Nom</label><input className="form-input" /></div>
              <div><label className="form-label">Prénom</label><input className="form-input" /></div>
            </div>
            <div><label className="form-label">Email</label><input type="email" className="form-input" placeholder="nom@adbf.bf" /></div>
            <div><label className="form-label">Rôle</label>
              <select className="form-input">
                <option>Sélectionner un rôle</option>
                <option>Admin National</option><option>Secrétaire National</option>
                <option>Comptable Régional</option><option>Statisticien</option><option>Pasteur Régional</option>
              </select>
            </div>
            <div><label className="form-label">Région</label>
              <select className="form-input"><option>Toutes les régions</option>{regionData.map(r => <option key={r.id}>{r.nom}</option>)}</select>
            </div>
          </>)}
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "#F1F5F9", color: "#64748B", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Annuler</button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#0F78C8", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

/* ── Config section accordion ── */
function ConfigSection({ title, desc, icon: Icon, color, children }: { title: string; desc: string; icon: React.ElementType; color: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden" style={{ borderRadius: "14px" }}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-4 p-5 text-left" style={{ background: "none", border: "none", cursor: "pointer" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + "15" }}>
          <Icon size={18} style={{ color }} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{title}</div>
          <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
        </div>
        {open ? <ChevronUp size={16} style={{ color: "#94A3B8" }} /> : <ChevronDown size={16} style={{ color: "#94A3B8" }} />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t" style={{ borderColor: "#F8F9FC" }}>
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}

/* ── Main ── */
export default function Admin({ initialTab, currentScope }: { initialTab?: string | null; currentScope?: SupervisionScope }) {
  const userNiveau = currentScope?.niveau || "national";

  // Access Control: Only national and centre (superviseur BEN) can access admin
  if (userNiveau !== "national" && userNiveau !== "centre") {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4 text-amber-700 shadow-sm">
          <Lock size={32} />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900">
          Accès Restreint — Bureau Exécutif National (BEN)
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-4 mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
          Module réservé à la Gouvernance Centrale
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Vous êtes actuellement authentifié en tant que : <strong>{currentScope?.role || "Responsable"}</strong> ({currentScope?.instance || "Circonscription locale"}).
          <br /><br />
          Conformément aux statuts des Assemblées de Dieu du Burkina Faso et à la subsidiarité de la <strong>Vision 3R</strong>, le module d'administration générale, la création d'entités nationales et la configuration système sont exclusivement réservés aux membres du <strong>Bureau Exécutif National</strong>.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left mb-6 space-y-1.5">
          <div className="font-semibold text-slate-800">Rappel de votre circonscription autorisée :</div>
          <div>• <strong>Instance :</strong> {currentScope?.instance}</div>
          <div>• <strong>Périmètre :</strong> {currentScope?.perimetre}</div>
          <div>• <strong>Mission :</strong> {currentScope?.description}</div>
        </div>
      </div>
    );
  }

  const defaultTab: AdminTab =
    userNiveau === "centre" ? "entites" : ((initialTab as AdminTab) || "national");
  const [tab, setTab] = useState<AdminTab>(defaultTab);

  useEffect(() => {
    if (initialTab && ["national", "entites", "audit", "config", "gouvernance"].includes(initialTab)) {
      setTab(initialTab as AdminTab);
    }
  }, [initialTab]);

  const [niveau, setNiveau] = useState<NiveauHierarchique>(userNiveau === "centre" ? "centre" : "national");
  const [entiteType, setEntiteType] = useState<EntiteType>(userNiveau === "centre" ? "centres" : "regions");
  const [searchAudit, setSearchAudit] = useState("");
  const [moduleFilter, setModuleFilter] = useState("Tous");
  const [resultFilter, setResultFilter] = useState("Tous");
  const [searchEntite, setSearchEntite] = useState("");
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>("Tous");
  const [showModal, setShowModal] = useState(false);

  const filteredAudit = auditData.filter(a => {
    const matchSearch = !searchAudit || a.user.toLowerCase().includes(searchAudit.toLowerCase()) || a.action.toLowerCase().includes(searchAudit.toLowerCase()) || a.module.toLowerCase().includes(searchAudit.toLowerCase());
    const matchModule = moduleFilter === "Tous" || a.module === moduleFilter;
    const matchResult = resultFilter === "Tous" || a.result === resultFilter;
    return matchSearch && matchModule && matchResult;
  });

  const auditFailures = auditData.filter(a => a.result === "Échec").length;

  const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] =
    userNiveau === "centre"
      ? [
          { id: "entites", label: "Centres de supervision (BEN)", icon: Church },
          { id: "gouvernance", label: "Gouvernance 3R", icon: Layers },
        ]
      : [
          { id: "national", label: "Vue nationale", icon: Globe },
          { id: "entites", label: "Gestion des entités", icon: Church },
          { id: "audit", label: "Journal d'audit", icon: Shield },
          { id: "gouvernance", label: "Gouvernance 3R", icon: Layers },
          { id: "config", label: "Configuration", icon: Settings2 },
        ];

  return (
    <div>
      {/* Header */}
      <div className="page-header mb-5">
        <div>
          <h1 className="section-title text-2xl">
            {userNiveau === "centre" ? "Supervision BEN — Échelon des Centres" : "Administration nationale"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {userNiveau === "centre"
              ? "Supervision inter-régionale BEN · Centre Kadiogo / Plateau"
              : "Bureau Exécutif National (BEN) · Accès restreint aux administrateurs centraux"}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "#FDF4E0", border: "1px solid #E8C98A" }}>
          <AlertTriangle size={14} style={{ color: "#C8973A" }} />
          <span className="text-xs font-semibold" style={{ color: "#9A6F22" }}>
            {currentScope?.role || "Administrateur National"}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-6 overflow-x-auto" style={{ background: "#F1F5F9", border: "1px solid #D9EEFA" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`tab-btn whitespace-nowrap flex items-center gap-2 ${tab === t.id ? "active" : ""}`}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* ══ VUE NATIONALE ══ */}
      {tab === "national" && (
        <div>
          {/* Sélecteur de niveau hiérarchique */}
          <div className="card p-4 mb-5">
            <p className="text-xs font-semibold mb-3" style={{ color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }}>Niveau d'analyse</p>
            <div className="flex flex-col sm:flex-row gap-2">
              {([
                { id: "local", label: "Églises locales", sub: "1 842 assemblées", icon: Church, color: "#16A34A", bg: "#DCFCE7" },
                { id: "sousregional", label: "Sous-Régions", sub: "224 sous-régions", icon: MapPin, color: "#C8973A", bg: "#FDF4E0" },
                { id: "regional", label: "Régions", sub: "79 régions ecclés.", icon: Globe, color: "#0F78C8", bg: "#D9EEFA" },
                { id: "centre", label: "Centres (BEN)", sub: "Supervision inter-régionale", icon: Layers, color: "#0A5490", bg: "#E0F2FE" },
                { id: "national", label: "Bureau National", sub: "Gouvernance centrale", icon: Shield, color: "#7C3AED", bg: "#EDE9FE" },
              ] as { id: NiveauHierarchique; label: string; sub: string; icon: React.ElementType; color: string; bg: string }[]).map((n, i, arr) => {
                const active = niveau === n.id;
                return (
                  <div key={n.id} className="flex items-center flex-1">
                    <button
                      onClick={() => setNiveau(n.id)}
                      className="flex-1 flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                      style={{
                        background: active ? n.bg : "#F8F9FC",
                        border: active ? `2px solid ${n.color}` : "2px solid transparent",
                        cursor: "pointer",
                      }}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: active ? n.color : "#E2E8F0" }}>
                        <n.icon size={16} style={{ color: active ? "white" : "#94A3B8" }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold" style={{ color: active ? n.color : "#374151", fontFamily: "'Manrope', sans-serif" }}>{n.label}</div>
                        <div className="text-xs" style={{ color: active ? n.color : "#94A3B8", opacity: active ? 0.8 : 1 }}>{n.sub}</div>
                      </div>
                    </button>
                    {i < arr.length - 1 && (
                      <div className="hidden sm:flex items-center px-1 flex-shrink-0">
                        <ChevronDown size={14} style={{ color: "#CBD5E1", transform: "rotate(-90deg)" }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── Niveau : Églises locales ─── */}
          {niveau === "local" && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-5 rounded-full" style={{ background: "#16A34A" }} />
                <h3 className="font-bold text-base" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Statistiques — Niveau Église locale</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                {[
                  { label: "Assemblées actives", value: "1 842", sub: "+23 ce trimestre", icon: Church, color: "#16A34A", bg: "#DCFCE7" },
                  { label: "Membres actifs total", value: "487 320", sub: "Moyenne 264 / église", icon: Users, color: "#0F78C8", bg: "#D9EEFA" },
                  { label: "Cultes hebdomadaires", value: "3 684", sub: "Dim. + mid-semaine", icon: Activity, color: "#0891B2", bg: "#E0F2FE" },
                  { label: "Nouvelles assemblées", value: "38", sub: "Depuis janvier 2026", icon: TrendingUp, color: "#C8973A", bg: "#FDF4E0" },
                ].map(k => (
                  <div key={k.label} className="stat-card">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: k.bg }}>
                      <k.icon size={20} style={{ color: k.color }} />
                    </div>
                    <div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{k.value}</div>
                    <div className="text-xs text-gray-400 mb-1">{k.label}</div>
                    <div className="text-xs font-medium" style={{ color: k.color }}>{k.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                {[
                  { label: "Dîmes collectées", value: "38,4M FCFA", sub: "Mois courant", icon: Wallet, color: "#16A34A", bg: "#DCFCE7" },
                  { label: "Offrandes locales", value: "12,7M FCFA", sub: "Mois courant", icon: Wallet, color: "#C8973A", bg: "#FDF4E0" },
                  { label: "Taux de rapport", value: "87%", sub: "Rapports reçus / total", icon: BarChart3, color: "#0D67B0", bg: "#D9EEFA" },
                  { label: "Projets locaux actifs", value: "142", sub: "Construction & ministères", icon: TrendingUp, color: "#7C3AED", bg: "#EDE9FE" },
                ].map(k => (
                  <div key={k.label} className="stat-card">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: k.bg }}>
                      <k.icon size={20} style={{ color: k.color }} />
                    </div>
                    <div className="text-lg font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{k.value}</div>
                    <div className="text-xs text-gray-400 mb-1">{k.label}</div>
                    <div className="text-xs font-medium" style={{ color: k.color }}>{k.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="card p-5">
                  <h3 className="section-title text-base mb-1">Croissance des assemblées — 2026</h3>
                  <p className="text-xs text-gray-400 mb-4">Nouvelles ouvertures et membres baptisés</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { mois: "Jan", nouvelles: 4, baptemes: 312 },
                      { mois: "Fév", nouvelles: 3, baptemes: 287 },
                      { mois: "Mar", nouvelles: 6, baptemes: 354 },
                      { mois: "Avr", nouvelles: 5, baptemes: 298 },
                      { mois: "Mai", nouvelles: 7, baptemes: 421 },
                      { mois: "Jun", nouvelles: 4, baptemes: 376 },
                      { mois: "Jul", nouvelles: 5, baptemes: 401 },
                      { mois: "Aoû", nouvelles: 4, baptemes: 388 },
                    ]} margin={{ left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="nouvelles" name="Nouvelles assemblées" fill="#16A34A" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="baptemes" name="Baptêmes" fill="#0F78C8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="card p-5">
                  <h3 className="section-title text-base mb-1">Taux de rapport par région</h3>
                  <p className="text-xs text-gray-400 mb-4">% d'assemblées ayant soumis leur rapport</p>
                  <div className="space-y-3 mt-2">
                    {regionData.slice(0, 7).map(r => {
                      const taux = Math.floor(75 + Math.random() * 20);
                      return (
                        <div key={r.id} className="flex items-center gap-3">
                          <div className="text-xs font-medium w-28 truncate" style={{ color: "#374151" }}>{r.nom}</div>
                          <div className="flex-1 h-2 rounded-full" style={{ background: "#F1F5F9" }}>
                            <div className="h-2 rounded-full" style={{ width: `${taux}%`, background: taux > 90 ? "#16A34A" : taux > 80 ? "#0F78C8" : "#C8973A" }} />
                          </div>
                          <div className="text-xs font-bold w-9 text-right" style={{ color: taux > 90 ? "#16A34A" : taux > 80 ? "#0F78C8" : "#C8973A" }}>{taux}%</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── Niveau : Sous-Régional ─── */}
          {niveau === "sousregional" && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-5 rounded-full" style={{ background: "#C8973A" }} />
                <h3 className="font-bold text-base" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Statistiques — Niveau Sous-Régional</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                {[
                  { label: "Sous-régions actives", value: "224", sub: "Réparties sur les 79 régions", icon: MapPin, color: "#C8973A", bg: "#FDF4E0" },
                  { label: "Pasteurs de sous-région", value: "224", sub: "1 responsable / sous-région", icon: Users, color: "#0F78C8", bg: "#D9EEFA" },
                  { label: "Assemblées / sous-région", value: "8,2", sub: "Moyenne nationale", icon: Church, color: "#16A34A", bg: "#DCFCE7" },
                  { label: "Conseils sous-rég.", value: "4", sub: "Sessions par an", icon: Activity, color: "#7C3AED", bg: "#EDE9FE" },
                ].map(k => (
                  <div key={k.label} className="stat-card">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: k.bg }}>
                      <k.icon size={20} style={{ color: k.color }} />
                    </div>
                    <div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{k.value}</div>
                    <div className="text-xs text-gray-400 mb-1">{k.label}</div>
                    <div className="text-xs font-medium" style={{ color: k.color }}>{k.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                {[
                  { label: "Ratio pasteur/membres", value: "1 / 59", sub: "Couverture pastorale", icon: Users, color: "#16A34A", bg: "#DCFCE7" },
                  { label: "Activités intercalaires", value: "312", sub: "Ce trimestre", icon: TrendingUp, color: "#C8973A", bg: "#FDF4E0" },
                  { label: "Formations pastorales", value: "48", sub: "Organisées en 2026", icon: BarChart3, color: "#0F78C8", bg: "#D9EEFA" },
                  { label: "Fonds sous-régionaux", value: "6,8M FCFA", sub: "Collectés ce mois", icon: Wallet, color: "#0891B2", bg: "#E0F2FE" },
                ].map(k => (
                  <div key={k.label} className="stat-card">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: k.bg }}>
                      <k.icon size={20} style={{ color: k.color }} />
                    </div>
                    <div className="text-lg font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{k.value}</div>
                    <div className="text-xs text-gray-400 mb-1">{k.label}</div>
                    <div className="text-xs font-medium" style={{ color: k.color }}>{k.sub}</div>
                  </div>
                ))}
              </div>
              <div className="card overflow-hidden">
                <div className="p-5 border-b" style={{ borderColor: "#F1F5F9" }}>
                  <h3 className="section-title text-base">Synthèse par région — activité des sous-régions</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Région</th>
                        <th>Nb Sous-régions</th>
                        <th>Assemblées</th>
                        <th>Pasteurs</th>
                        <th>Ratio past./membres</th>
                        <th>Taux activité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionData.slice(0, 8).map(r => {
                        const nbSousRegions = Math.floor(r.eglises / 8);
                        const ratio = Math.floor(r.membres / r.pasteurs);
                        const activite = Math.floor(78 + Math.random() * 18);
                        return (
                          <tr key={r.id}>
                            <td className="font-semibold" style={{ color: "#C8973A" }}>{r.nom}</td>
                            <td>{nbSousRegions}</td>
                            <td>{r.eglises.toLocaleString("fr-FR")}</td>
                            <td>{r.pasteurs}</td>
                            <td className="text-xs">1 / {ratio}</td>
                            <td>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 rounded-full" style={{ background: "#F1F5F9" }}>
                                  <div className="h-1.5 rounded-full" style={{ width: `${activite}%`, background: activite > 90 ? "#16A34A" : "#C8973A" }} />
                                </div>
                                <span className="text-xs font-bold" style={{ color: activite > 90 ? "#16A34A" : "#C8973A" }}>{activite}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── Niveau : Régional ─── */}
          {niveau === "regional" && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-5 rounded-full" style={{ background: "#0F78C8" }} />
                <h3 className="font-bold text-base" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Statistiques — Niveau Régional</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                {[
                  { label: "Régions ecclésiastiques", value: "79", sub: "Couverture nationale", icon: Globe, color: "#0F78C8", bg: "#D9EEFA" },
                  { label: "Pasteurs régionaux", value: "79", sub: "1 par région", icon: Users, color: "#16A34A", bg: "#DCFCE7" },
                  { label: "Conseils régionaux", value: "2", sub: "Sessions annuelles", icon: Activity, color: "#C8973A", bg: "#FDF4E0" },
                  { label: "Budget régions", value: "142M FCFA", sub: "Total alloué 2026", icon: Wallet, color: "#7C3AED", bg: "#EDE9FE" },
                ].map(k => (
                  <div key={k.label} className="stat-card">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: k.bg }}>
                      <k.icon size={20} style={{ color: k.color }} />
                    </div>
                    <div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{k.value}</div>
                    <div className="text-xs text-gray-400 mb-1">{k.label}</div>
                    <div className="text-xs font-medium" style={{ color: k.color }}>{k.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                <div className="card p-5">
                  <h3 className="section-title text-base mb-1">Membres par région (Top 8)</h3>
                  <p className="text-xs text-gray-400 mb-4">Données consolidées 2026</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={regionData.slice(0, 8)} margin={{ left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="nom" tick={{ fontSize: 9, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={n => n.split(" ")[0]} />
                      <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000).toFixed(0) + "K"} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} formatter={(v: any) => [v.toLocaleString("fr-FR"), "Membres"]} />
                      <Bar dataKey="membres" name="Membres" fill="#0F78C8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="card p-5">
                  <h3 className="section-title text-base mb-1">Budget alloué vs Exécuté</h3>
                  <p className="text-xs text-gray-400 mb-4">Top 5 régions — FCFA (millions)</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={regionData.slice(0, 5).map(r => ({ nom: r.nom.split(" ")[0], alloué: r.budget / 1000000, exécuté: (r.budget * 0.72) / 1000000 }))} margin={{ left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="nom" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} formatter={(v: any) => [v.toFixed(1) + " M FCFA"]} />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="alloué" name="Budget alloué" fill="#0F78C8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="exécuté" name="Exécuté" fill="#C8973A" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="card overflow-hidden">
                <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
                  <h3 className="section-title text-base">Tableau de bord — 79 régions (liste représentative)</h3>
                  <button onClick={() => { setTab("entites"); setEntiteType("regions"); }} className="text-xs font-semibold" style={{ color: "#0F78C8", background: "none", border: "none", cursor: "pointer" }}>Gérer les régions →</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr><th>Région</th><th>Chef-lieu</th><th>Églises</th><th>Membres</th><th>Pasteurs</th><th>Budget alloué</th><th>Statut</th></tr>
                    </thead>
                    <tbody>
                      {regionData.map(r => (
                        <tr key={r.id}>
                          <td className="font-semibold" style={{ color: "#0F78C8" }}>{r.nom}</td>
                          <td className="text-xs" style={{ color: "#64748B" }}>{r.chef}</td>
                          <td>{r.eglises.toLocaleString("fr-FR")}</td>
                          <td>{r.membres.toLocaleString("fr-FR")}</td>
                          <td>{r.pasteurs}</td>
                          <td className="font-semibold" style={{ color: "#C8973A" }}>{fmtFCFA(r.budget)}</td>
                          <td><span className="badge badge-success">{r.statut}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── Niveau : Centres (BEN) — Entre Régions et Bureau National ─── */}
          {niveau === "centre" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-5 rounded-full" style={{ background: "#0A5490" }} />
                  <div>
                    <h3 className="font-bold text-base" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>
                      Supervision des Centres — Échelon Inter-Régional BEN
                    </h3>
                    <p className="text-xs text-slate-500">Instance stratégique intermédiaire située entre les Régions et le Bureau National</p>
                  </div>
                </div>
                <button onClick={() => { setTab("entites"); setEntiteType("centres"); }} className="btn-secondary text-xs flex items-center gap-1">
                  Gérer les Centres BEN →
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                {[
                  { label: "Centres de supervision", value: "6", sub: "Couverture nationale", icon: Layers, color: "#0A5490", bg: "#E0F2FE" },
                  { label: "Membres référents BEN", value: "6", sub: "Superviseurs nationaux", icon: Shield, color: "#7C3AED", bg: "#EDE9FE" },
                  { label: "Régions coordonnées", value: "79", sub: "Réparties sur les 6 centres", icon: Globe, color: "#0F78C8", bg: "#D9EEFA" },
                  { label: "Églises sous mandat", value: "1 842", sub: "Remontée consolidée", icon: Church, color: "#16A34A", bg: "#DCFCE7" },
                ].map(k => (
                  <div key={k.label} className="stat-card">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: k.bg }}>
                      <k.icon size={20} style={{ color: k.color }} />
                    </div>
                    <div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{k.value}</div>
                    <div className="text-xs text-gray-400 mb-1">{k.label}</div>
                    <div className="text-xs font-medium" style={{ color: k.color }}>{k.sub}</div>
                  </div>
                ))}
              </div>
              <div className="card overflow-hidden mb-5">
                <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
                  <div>
                    <h3 className="section-title text-base">Centres de supervision inter-régionale (Superviseurs BEN)</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Coordination de terrain assurée par les membres du Bureau Exécutif National</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Centre de supervision</th>
                        <th>Chef-lieu</th>
                        <th>Membre BEN référent</th>
                        <th>Régions rattachées</th>
                        <th style={{ textAlign: "right" }}>Églises</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {centresData.map(c => (
                        <tr key={c.id}>
                          <td className="font-bold" style={{ color: "#0A5490" }}>{c.nom}</td>
                          <td className="text-xs">{c.chef}</td>
                          <td>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                              <Shield size={12} className="text-amber-500" />
                              {c.superviseur}
                            </div>
                          </td>
                          <td className="text-xs text-slate-600">{c.regions}</td>
                          <td className="text-right font-semibold">{c.eglises}</td>
                          <td><span className="badge badge-success">{c.statut}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── Niveau : Bureau Exécutif National ─── */}
          {niveau === "national" && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-5 rounded-full" style={{ background: "#7C3AED" }} />
                <h3 className="font-bold text-base" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Statistiques — Bureau Exécutif National</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {[
                  { label: "Pasteurs ordonnés", value: "8 324", sub: "6 618 au dernier conseil", icon: Users, color: "#7C3AED", bg: "#EDE9FE" },
                  { label: "Membres actifs", value: "487 320", sub: "+4 218 ce mois", icon: Users, color: "#0F78C8", bg: "#D9EEFA" },
                  { label: "Régions ecclésiastiques", value: "79", sub: "Couverture nationale", icon: Globe, color: "#C8973A", bg: "#FDF4E0" },
                  { label: "Nouvelles assemblées", value: "38", sub: "Depuis janvier", icon: Church, color: "#16A34A", bg: "#DCFCE7" },
                ].map(k => (
                  <div key={k.label} className="stat-card">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: k.bg }}>
                      <k.icon size={20} style={{ color: k.color }} />
                    </div>
                    <div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{k.value}</div>
                    <div className="text-xs text-gray-400 mb-1">{k.label}</div>
                    <div className="text-xs font-medium" style={{ color: k.color }}>{k.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                {[
                  { label: "Recettes nationales", value: "95,2M FCFA", sub: "2026 cumulé", icon: TrendingUp, color: "#16A34A", bg: "#DCFCE7" },
                  { label: "Dépenses nationales", value: "72,8M FCFA", sub: "Taux d'exécution 76%", icon: Wallet, color: "#DC2626", bg: "#FEE2E2" },
                  { label: "Décisions du Bureau", value: "47", sub: "Résolutions 2026", icon: CheckCircle, color: "#0F78C8", bg: "#D9EEFA" },
                  { label: "Sessions tenues", value: "8", sub: "Depuis janvier 2026", icon: Activity, color: "#0891B2", bg: "#E0F2FE" },
                ].map(k => (
                  <div key={k.label} className="stat-card">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: k.bg }}>
                      <k.icon size={20} style={{ color: k.color }} />
                    </div>
                    <div className="text-lg font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{k.value}</div>
                    <div className="text-xs text-gray-400 mb-1">{k.label}</div>
                    <div className="text-xs font-medium" style={{ color: k.color }}>{k.sub}</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                <div className="card p-5">
                  <h3 className="section-title text-base mb-1">Croissance nationale 2026</h3>
                  <p className="text-xs text-gray-400 mb-4">Évolution des membres et des assemblées</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="l" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000).toFixed(0) + "K"} />
                      <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                      <Line yAxisId="l" type="monotone" dataKey="membres" name="Membres" stroke="#0F78C8" strokeWidth={2.5} dot={{ fill: "#0F78C8", r: 4 }} />
                      <Line yAxisId="r" type="monotone" dataKey="eglises" name="Églises" stroke="#C8973A" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="card p-5">
                  <h3 className="section-title text-base mb-1">Finances nationales 2026</h3>
                  <p className="text-xs text-gray-400 mb-4">Recettes vs Dépenses mensuelles (M FCFA)</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { mois: "Jan", recettes: 9.8, depenses: 7.2 },
                      { mois: "Mar", recettes: 11.2, depenses: 8.4 },
                      { mois: "Mai", recettes: 10.5, depenses: 7.9 },
                      { mois: "Jul", recettes: 12.1, depenses: 9.1 },
                      { mois: "Sep", recettes: 11.8, depenses: 8.6 },
                    ]} margin={{ left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} formatter={(v: any) => [v + " M FCFA"]} />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="recettes" name="Recettes" fill="#16A34A" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="depenses" name="Dépenses" fill="#DC2626" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Alertes */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="section-title text-base flex items-center gap-2"><Bell size={16} /> Alertes & Notifications — Bureau National</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#FEE2E2", color: "#B91C1C" }}>3 actives</span>
                </div>
                <div className="space-y-3">
                  {[
                    { text: "Budget 2027 en attente de validation — Bureau National", time: "Il y a 2h", icon: AlertTriangle, color: "#C8973A", bg: "#FDF4E0" },
                    { text: "1 tentative de connexion échouée — compte d.traore@adbf.bf", time: "Il y a 14h", icon: Lock, color: "#DC2626", bg: "#FEE2E2" },
                    { text: "Rapport statistique de septembre prêt pour validation", time: "Hier", icon: BarChart3, color: "#0F78C8", bg: "#D9EEFA" },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: a.bg }}>
                      <a.icon size={15} style={{ color: a.color, flexShrink: 0, marginTop: 1 }} />
                      <div className="flex-1">
                        <p className="text-xs font-medium" style={{ color: "#374151" }}>{a.text}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>{a.time}</p>
                      </div>
                      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><X size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ GESTION DES ENTITÉS ══ */}
      {tab === "entites" && (
        <div>
          {/* Type selector */}
          <div className="flex gap-3 flex-wrap items-center justify-between mb-5">
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#F1F5F9", border: "1px solid #D9EEFA" }}>
              {(["centres", "regions", "sousregions", "pasteurs", "utilisateurs"] as EntiteType[]).map(t => (
                <button key={t} onClick={() => setEntiteType(t)} className={`tab-btn capitalize ${entiteType === t ? "active" : ""}`}>
                  {{ centres: "Centres (BEN)", regions: "Régions", sousregions: "Sous-régions", pasteurs: "Pasteurs", utilisateurs: "Utilisateurs" }[t]}
                </button>
              ))}
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm">
              <Plus size={15} /> Ajouter
            </button>
          </div>

          {/* Barre recherche */}
          <div className="flex gap-3 mb-5">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
              <input value={searchEntite} onChange={e => setSearchEntite(e.target.value)} placeholder="Rechercher…" className="form-input pl-8 text-sm" />
            </div>
            <button className="btn-secondary text-xs flex items-center gap-1"><Filter size={13} /> Filtres</button>
            <button className="btn-secondary text-xs flex items-center gap-1"><Download size={13} /> Exporter</button>
          </div>

          {/* Table Centres de supervision BEN */}
          {entiteType === "centres" && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Centre de supervision (BEN)</th>
                      <th>Chef-lieu</th>
                      <th>Superviseur référent</th>
                      <th>Régions rattachées</th>
                      <th style={{ textAlign: "right" }}>Églises</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {centresData.filter(c => !searchEntite || c.nom.toLowerCase().includes(searchEntite.toLowerCase()) || c.regions.toLowerCase().includes(searchEntite.toLowerCase())).map(c => (
                      <tr key={c.id}>
                        <td className="font-bold" style={{ color: "#0A5490" }}>{c.nom}</td>
                        <td className="text-xs">{c.chef}</td>
                        <td>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                            <Shield size={12} className="text-amber-500" />
                            {c.superviseur}
                          </div>
                        </td>
                        <td className="text-xs text-slate-600 max-w-xs">{c.regions}</td>
                        <td className="text-right font-semibold">{c.eglises}</td>
                        <td><span className="badge badge-success">{c.statut}</span></td>
                        <td>
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg" style={{ background: "#EBF6FD", border: "none", cursor: "pointer", color: "#0F78C8" }}><Eye size={13} /></button>
                            <button className="p-1.5 rounded-lg" style={{ background: "#FDF4E0", border: "none", cursor: "pointer", color: "#C8973A" }}><Edit2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Table régions */}
          {entiteType === "regions" && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead><tr><th>Région</th><th>Chef-lieu</th><th>Églises</th><th>Membres</th><th>Pasteurs</th><th>Budget</th><th>Statut</th><th>Actions</th></tr></thead>
                  <tbody>
                    {regionData.filter(r => !searchEntite || r.nom.toLowerCase().includes(searchEntite.toLowerCase())).map(r => (
                      <tr key={r.id}>
                        <td className="font-semibold" style={{ color: "#0F78C8" }}>{r.nom}</td>
                        <td className="text-xs">{r.chef}</td>
                        <td>{r.eglises.toLocaleString("fr-FR")}</td>
                        <td>{r.membres.toLocaleString("fr-FR")}</td>
                        <td>{r.pasteurs}</td>
                        <td style={{ color: "#C8973A", fontWeight: 600 }}>{fmtFCFA(r.budget)}</td>
                        <td><span className="badge badge-success">{r.statut}</span></td>
                        <td>
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg" style={{ background: "#EBF6FD", border: "none", cursor: "pointer", color: "#0F78C8" }}><Eye size={13} /></button>
                            <button className="p-1.5 rounded-lg" style={{ background: "#FDF4E0", border: "none", cursor: "pointer", color: "#C8973A" }}><Edit2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Table pasteurs */}
          {entiteType === "pasteurs" && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead><tr><th>Pasteur</th><th>Région</th><th>Église</th><th>Téléphone</th><th>Ordination</th><th>Statut</th><th>Actions</th></tr></thead>
                  <tbody>
                    {pasteurs.filter(p => !searchEntite || p.nom.toLowerCase().includes(searchEntite.toLowerCase())).map(p => (
                      <tr key={p.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "#0D67B0" }}>
                              {p.nom.split(" ").slice(-1)[0]?.[0]}
                            </div>
                            <span className="font-semibold text-xs" style={{ color: "#0F78C8" }}>{p.nom}</span>
                          </div>
                        </td>
                        <td className="text-xs">{p.region}</td>
                        <td className="text-xs max-w-40"><div className="truncate">{p.eglise}</div></td>
                        <td className="text-xs font-mono" style={{ color: "#64748B" }}>{p.tel}</td>
                        <td className="text-xs">{p.ordination}</td>
                        <td><span className={`badge ${p.statut === "Actif" ? "badge-success" : "badge-danger"}`}>{p.statut}</span></td>
                        <td>
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg" style={{ background: "#EBF6FD", border: "none", cursor: "pointer", color: "#0F78C8" }}><Eye size={13} /></button>
                            <button className="p-1.5 rounded-lg" style={{ background: "#FDF4E0", border: "none", cursor: "pointer", color: "#C8973A" }}><Edit2 size={13} /></button>
                            <button className="p-1.5 rounded-lg" style={{ background: "#FEE2E2", border: "none", cursor: "pointer", color: "#DC2626" }}><Trash2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Table utilisateurs */}
          {entiteType === "utilisateurs" && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead><tr><th>Utilisateur</th><th>Rôle</th><th>Région</th><th>Dernière connexion</th><th>Statut</th><th>Actions</th></tr></thead>
                  <tbody>
                    {utilisateurs.filter(u => !searchEntite || u.nom.toLowerCase().includes(searchEntite.toLowerCase())).map(u => (
                      <tr key={u.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: u.statut === "Suspendu" ? "#94A3B8" : "#0D67B0" }}>
                              {u.nom.split(" ")[0]?.[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-xs" style={{ color: "#0F78C8" }}>{u.nom}</div>
                              <div className="text-xs" style={{ color: "#94A3B8" }}>{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge badge-info text-xs">{u.role}</span></td>
                        <td className="text-xs">{u.region}</td>
                        <td className="text-xs" style={{ color: u.dernConn.includes("Échec") ? "#DC2626" : "#64748B" }}>{u.dernConn}</td>
                        <td>
                          <span className={`badge ${u.statut === "Actif" ? "badge-success" : "badge-danger"}`}>{u.statut}</span>
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg" style={{ background: "#EBF6FD", border: "none", cursor: "pointer", color: "#0F78C8" }}><Eye size={13} /></button>
                            <button className="p-1.5 rounded-lg" style={{ background: "#FDF4E0", border: "none", cursor: "pointer", color: "#C8973A" }}><Edit2 size={13} /></button>
                            <button className="p-1.5 rounded-lg" style={{ background: u.statut === "Actif" ? "#FEE2E2" : "#DCFCE7", border: "none", cursor: "pointer", color: u.statut === "Actif" ? "#DC2626" : "#16A34A" }}>
                              {u.statut === "Actif" ? <Lock size={13} /> : <Check size={13} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sous-régions — Table détaillée et filtres par région */}
          {entiteType === "sousregions" && (
            <div className="space-y-4">
              {/* Filtre rapide par Région */}
              <div className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-amber-600" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Filtrer par Région ecclésiastique :</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {selectedRegionFilter === "Tous" ? "Toutes les sous-régions" : `Région : ${selectedRegionFilter}`}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Tous", "Bogodogo", "Ziniaré", "Centre", "Hauts-Bassins"].map((rNom) => {
                    const isSelected = selectedRegionFilter === rNom;
                    return (
                      <button
                        key={rNom}
                        onClick={() => setSelectedRegionFilter(rNom)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all border ${
                          isSelected
                            ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        {rNom} {rNom === "Bogodogo" && "(2)"} {rNom === "Ziniaré" && "(7)"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tableau des sous-régions */}
              <div className="card overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
                  <div>
                    <h3 className="section-title text-sm">
                      Sous-régions ecclésiastiques ({SOUS_REGIONS_DATA.filter(sr => (selectedRegionFilter === "Tous" || sr.region === selectedRegionFilter) && (!searchEntite || sr.nom.toLowerCase().includes(searchEntite.toLowerCase()) || sr.chefLieu.toLowerCase().includes(searchEntite.toLowerCase()))).length})
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Rattachement administratif aux régions et centres de supervision
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Centre N°5 (Bogodogo & Ziniaré)
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Sous-région</th>
                        <th>Région ecclésiastique</th>
                        <th>Centre BEN</th>
                        <th>Chef-lieu</th>
                        <th>Pasteur responsable</th>
                        <th style={{ textAlign: "right" }}>Églises</th>
                        <th style={{ textAlign: "right" }}>Membres</th>
                        <th>Statut</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SOUS_REGIONS_DATA.filter(sr => {
                        const matchRegion = selectedRegionFilter === "Tous" || sr.region === selectedRegionFilter;
                        const matchSearch = !searchEntite ||
                          sr.nom.toLowerCase().includes(searchEntite.toLowerCase()) ||
                          sr.chefLieu.toLowerCase().includes(searchEntite.toLowerCase()) ||
                          sr.pasteurResponsable.toLowerCase().includes(searchEntite.toLowerCase());
                        return matchRegion && matchSearch;
                      }).map(sr => (
                        <tr key={sr.id}>
                          <td>
                            <div className="font-bold text-xs" style={{ color: "#0F78C8" }}>{sr.nom}</div>
                            <div className="text-[10px] text-slate-400">{sr.id}</div>
                          </td>
                          <td>
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              {sr.region}
                            </span>
                          </td>
                          <td className="text-xs font-semibold text-slate-700">{sr.centre}</td>
                          <td className="text-xs text-slate-600">{sr.chefLieu}</td>
                          <td>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-800">
                              <Users size={12} className="text-sky-600" />
                              {sr.pasteurResponsable}
                            </div>
                          </td>
                          <td className="text-right font-bold text-xs">{sr.eglises}</td>
                          <td className="text-right font-medium text-xs" style={{ color: "#16A34A" }}>
                            {sr.membres.toLocaleString("fr-FR")}
                          </td>
                          <td>
                            <span className="badge badge-success">{sr.statut}</span>
                          </td>
                          <td>
                            <div className="flex gap-1">
                              <button className="p-1.5 rounded-lg" style={{ background: "#EBF6FD", border: "none", cursor: "pointer", color: "#0F78C8" }} title="Voir les détails">
                                <Eye size={13} />
                              </button>
                              <button className="p-1.5 rounded-lg" style={{ background: "#FDF4E0", border: "none", cursor: "pointer", color: "#C8973A" }} title="Modifier">
                                <Edit2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ JOURNAL D'AUDIT ══ */}
      {tab === "audit" && (
        <div>
          {/* Stats rapides audit */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            {[
              { label: "Actions ce mois", value: "12 847", icon: Activity, color: "#0F78C8", bg: "#D9EEFA" },
              { label: "Échecs / Anomalies", value: auditFailures.toString(), icon: AlertCircle, color: "#DC2626", bg: "#FEE2E2" },
              { label: "Utilisateurs actifs", value: "24", icon: Users, color: "#16A34A", bg: "#DCFCE7" },
              { label: "Modules touchés", value: "6", icon: Database, color: "#7C3AED", bg: "#EDE9FE" },
            ].map(k => (
              <div key={k.label} className="stat-card">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: k.bg }}>
                  <k.icon size={18} style={{ color: k.color }} />
                </div>
                <div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{k.value}</div>
                <div className="text-xs text-gray-400">{k.label}</div>
              </div>
            ))}
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-3 mb-5">
            <div className="relative flex-1 min-w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
              <input value={searchAudit} onChange={e => setSearchAudit(e.target.value)} placeholder="Rechercher utilisateur, action, module…" className="form-input pl-8 text-sm" />
            </div>
            <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)} className="form-input w-auto text-sm">
              <option>Tous</option>
              {["Finance", "Statistiques", "Bibliothèque", "Utilisateurs", "Auth", "Contenu"].map(m => <option key={m}>{m}</option>)}
            </select>
            <select value={resultFilter} onChange={e => setResultFilter(e.target.value)} className="form-input w-auto text-sm">
              <option>Tous</option>
              <option>Succès</option>
              <option>Échec</option>
            </select>
            <select className="form-input w-auto text-sm">
              <option>7 derniers jours</option>
              <option>30 jours</option>
              <option>Ce mois</option>
            </select>
            <button className="btn-secondary text-xs flex items-center gap-1"><Download size={13} /> Exporter</button>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date & heure</th>
                    <th>Utilisateur</th>
                    <th>Action</th>
                    <th>Module</th>
                    <th>Objet</th>
                    <th>Adresse IP</th>
                    <th>Résultat</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAudit.map((a, i) => (
                    <tr key={i} style={{ background: a.result === "Échec" ? "#FFF8F8" : "white" }}>
                      <td>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Clock size={11} style={{ color: "#94A3B8" }} />
                          <span style={{ color: "#64748B" }}>{a.date}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: a.result === "Échec" ? "#DC2626" : "#0D67B0" }}>
                            {a.user.split(" ")[0]?.[0]}
                          </div>
                          <span className="text-xs font-medium" style={{ color: "#0F78C8" }}>{a.user}</span>
                        </div>
                      </td>
                      <td className="text-xs font-medium" style={{ color: "#374151" }}>{a.action}</td>
                      <td>
                        <span className="badge text-xs" style={{ background: moduleColors[a.module]?.bg || "#F1F5F9", color: moduleColors[a.module]?.color || "#64748B" }}>{a.module}</span>
                      </td>
                      <td className="text-xs max-w-xs" style={{ color: "#64748B" }}>
                        <div className="truncate" title={a.objet}>{a.objet}</div>
                      </td>
                      <td className="font-mono text-xs" style={{ color: "#94A3B8" }}>{a.ip}</td>
                      <td>
                        <span className={`badge flex items-center gap-1 w-fit ${a.result === "Succès" ? "badge-success" : "badge-danger"}`}>
                          {a.result === "Succès" ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                          {a.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
              <p className="text-xs text-gray-400">Affichage de {filteredAudit.length} entrées</p>
              <div className="flex gap-1">
                {[1, 2, 3, "…", 1285].map((p, i) => (
                  <button key={i} className="w-8 h-8 rounded-lg text-xs font-semibold" style={{ background: p === 1 ? "#0F78C8" : "#F1F5F9", color: p === 1 ? "white" : "#64748B", border: "none", cursor: "pointer" }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ GOUVERNANCE 3R ══ */}
      {tab === "gouvernance" && (
        <div>
          {/* Header + images 3R */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Texte intro */}
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center gap-3 mb-4">
                <img src={logo3R} alt="Logo 3R" className="h-14 w-14 object-contain rounded-xl" style={{ border: "1px solid #E8C98A" }} />
                <div>
                  <h2 className="text-lg font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Vision Stratégique — Réforme 3R</h2>
                  <p className="text-xs" style={{ color: "#C8973A", fontWeight: 600 }}>Réforme · Réveil · Rayonnement</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#374151" }}>
                Au sein des Assemblées de Dieu du Burkina Faso, notre structure de gouvernance repose sur <strong>5 types de collaboration</strong> distincts, chacun définissant clairement le niveau d'autonomie, de délégation et de confiance accordé à chaque instance ou leader.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                Cette architecture garantit une chaîne de commandement claire, une prise de décision adaptée au niveau de responsabilité, et une culture de confiance progressive au sein de l'organisation ecclésiale nationale.
              </p>
            </div>
            {/* Image explication 3R */}
            <div className="card p-3 flex items-center justify-center">
              <img src={img3RExplication} alt="Explication Réforme 3R" className="w-full rounded-xl object-contain" style={{ maxHeight: 260 }} />
            </div>
          </div>

          {/* Les 5 types de collaboration */}
          <h3 className="section-title text-base mb-4 flex items-center gap-2">
            <Layers size={16} style={{ color: "#0F78C8" }} />
            Les 5 types de collaboration au sein de l'AD/BF
          </h3>

          <div className="space-y-4 mb-8">
            {[
              {
                num: 1,
                titre: "L'Exécutant",
                sous: "Exécution stricte des directives",
                desc: "Reçoit des consignes strictes et des instructions précises sur les actions à mener. Il n'a pas vocation à proposer des alternatives — sa force réside dans la fidélité et la rigueur d'exécution.",
                instance: "Églises locales",
                couleur: "#16A34A", bg: "linear-gradient(135deg, #15803D, #16A34A)",
                avantage: "Discipline et cohérence opérationnelle à la base.",
                icon: Church,
              },
              {
                num: 2,
                titre: "Le Collaborateur qui propose des solutions",
                sous: "Analyse & suggestions — décision supérieure",
                desc: "Analyse le contexte fourni par l'instance supérieure pour suggérer des méthodes de travail. L'instance supérieure conserve l'autorité sur la décision finale.",
                instance: "Conseils Sous-Régionaux",
                couleur: "#C8973A", bg: "linear-gradient(135deg, #B8832A, #C8973A)",
                avantage: "Intelligence de terrain et proximité pastorale.",
                icon: MapPin,
              },
              {
                num: 3,
                titre: "Le Collaborateur qui propose des décisions",
                sous: "Co-décision — validation avant action",
                desc: "Valide ses choix avec l'instance supérieure avant d'agir. Ce niveau implique une connaissance approfondie du travail et une prise de décision commune. Comparable à une équipe qui soumet sa campagne avant exécution.",
                instance: "Conseils Régionaux",
                couleur: "#0F78C8", bg: "linear-gradient(135deg, #0F78C8, #3A9BD5)",
                avantage: "Équilibre entre autonomie régionale et validation institutionnelle.",
                icon: Globe,
              },
              {
                num: 4,
                titre: "Le Collaborateur qui décide et informe",
                sous: "Délégation avancée — autonomie complète",
                desc: "Situé entre les régions et le bureau national : agit avec forte délégation sur son centre de supervision inter-régional. Le Bureau National est tenu informé par des rapports périodiques réguliers.",
                instance: "Centres de Supervision (Membres BEN)",
                couleur: "#0A5490", bg: "linear-gradient(135deg, #032A4E, #0A5490)",
                avantage: "Réactivité et fluidité dans la coordination stratégique de terrain.",
                icon: Layers,
              },
              {
                num: 5,
                titre: "Le Collaborateur à délégation totale",
                sous: "Confiance absolue — gouvernance centrale",
                desc: "Gouvernance centrale suprême pour l'ensemble du corps ecclésial au Burkina Faso : arbitrage souverain, validation budgétaire et vision apostolique de long terme.",
                instance: "Bureau Exécutif National (BEN) & Conseil Général",
                couleur: "#7C3AED", bg: "linear-gradient(135deg, #5B21B6, #7C3AED)",
                avantage: "Vision de long terme et unité nationale du témoignage chrétien.",
                icon: Shield,
              },
            ].map((t) => (
              <div key={t.num} className="card overflow-hidden">
                <div className="flex">
                  {/* Bande colorée gauche */}
                  <div className="w-2 flex-shrink-0 rounded-l-2xl" style={{ background: t.bg }} />
                  <div className="flex-1 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Numéro + icône */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0" style={{ background: t.bg }}>
                          {t.num}
                        </div>
                        <div className="sm:hidden">
                          <div className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>{t.titre}</div>
                          <div className="text-xs" style={{ color: t.couleur, fontWeight: 600 }}>{t.sous}</div>
                        </div>
                      </div>
                      {/* Contenu */}
                      <div className="flex-1">
                        <div className="hidden sm:block mb-2">
                          <div className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>{t.titre}</div>
                          <div className="text-xs font-semibold" style={{ color: t.couleur }}>{t.sous}</div>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "#374151" }}>{t.desc}</p>
                        <div className="flex flex-wrap gap-3">
                          <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: "#F1F5F9", color: "#0F78C8" }}>
                            <t.icon size={12} /> {t.instance}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: "#F0FDF4", color: "#15803D" }}>
                            <CheckCircle size={12} /> {t.avantage}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Avantages synthèse */}
          <div className="card p-6">
            <h3 className="section-title text-base mb-5">Les avantages de cette structure</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { titre: "Unité renforcée", desc: "Chaque niveau comprend son rôle, évitant les chevauchements et favorisant une collaboration harmonieuse.", color: "#0F78C8", bg: "#D9EEFA" },
                { titre: "Agilité accrue", desc: "En déléguant la décision au niveau le plus approprié, nous répondons plus rapidement aux défis du terrain.", color: "#16A34A", bg: "#DCFCE7" },
                { titre: "Culture de confiance", desc: "Cette structure valorise l'autonomie et la responsabilité, permettant à chaque leader de s'épanouir dans son appel.", color: "#C8973A", bg: "#FDF4E0" },
                { titre: "Vision claire", desc: "La hiérarchie de délégation garantit que, malgré la diversité, nous marchons vers un objectif commun.", color: "#7C3AED", bg: "#EDE9FE" },
              ].map((a, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: a.bg + "55", border: `1.5px solid ${a.bg}` }}>
                  <div className="w-2 h-2 rounded-full mb-3" style={{ background: a.color }} />
                  <div className="font-bold text-sm mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>{a.titre}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ CONFIGURATION ══ */}
      {tab === "config" && (
        <div className="space-y-4">
          <ConfigSection title="Informations de l'organisation" desc="Nom, logo, adresse et informations officielles de l'AD/BF" icon={Settings2} color="#0F78C8">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="form-label">Nom officiel</label><input className="form-input" defaultValue="Assemblées de Dieu du Burkina Faso" /></div>
                <div><label className="form-label">Sigle</label><input className="form-input" defaultValue="AD/BF" /></div>
              </div>
              <div><label className="form-label">Adresse du Bureau National</label><input className="form-input" defaultValue="01 BP 458, Ouagadougou 01, Burkina Faso" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="form-label">Téléphone</label><input className="form-input" defaultValue="+226 25 30 XX XX" /></div>
                <div><label className="form-label">Email officiel</label><input type="email" className="form-input" defaultValue="contact@adbf.bf" /></div>
              </div>
              <div><label className="form-label">Site web</label><input className="form-input" defaultValue="https://www.adbf.bf" /></div>
              <div className="flex justify-end">
                <button className="btn-primary text-sm">Enregistrer les modifications</button>
              </div>
            </div>
          </ConfigSection>

          <ConfigSection title="Sécurité & Accès" desc="Politique de mots de passe, durées de session, authentification à deux facteurs" icon={Shield} color="#DC2626">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="form-label">Longueur minimale du mot de passe</label>
                  <select className="form-input"><option>8 caractères</option><option>10 caractères</option><option>12 caractères</option></select>
                </div>
                <div><label className="form-label">Durée de session (minutes)</label>
                  <select className="form-input"><option>30 min</option><option>60 min</option><option>120 min</option><option>240 min</option></select>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "#F8F9FC", border: "1px solid #E2E8F0" }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#374151" }}>Authentification à deux facteurs (2FA)</p>
                  <p className="text-xs text-gray-400 mt-0.5">Activer le 2FA pour tous les comptes administrateurs</p>
                </div>
                <div className="w-11 h-6 rounded-full relative cursor-pointer" style={{ background: "#0F78C8" }}>
                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "#F8F9FC", border: "1px solid #E2E8F0" }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#374151" }}>Blocage après tentatives échouées</p>
                  <p className="text-xs text-gray-400 mt-0.5">Bloquer le compte après 5 tentatives infructueuses</p>
                </div>
                <div className="w-11 h-6 rounded-full relative cursor-pointer" style={{ background: "#0F78C8" }}>
                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="btn-primary text-sm">Enregistrer la politique</button>
              </div>
            </div>
          </ConfigSection>

          <ConfigSection title="Notifications système" desc="Paramètres des emails, SMS et notifications push envoyés par la plateforme" icon={Bell} color="#0D67B0">
            <div className="space-y-4">
              <div><label className="form-label">Email expéditeur</label><input type="email" className="form-input" defaultValue="noreply@adbf.bf" /></div>
              <div><label className="form-label">Nom d'affichage expéditeur</label><input className="form-input" defaultValue="AD/BF — Plateforme nationale" /></div>
              {[
                "Envoyer un email à chaque nouvel utilisateur",
                "Notifier l'admin lors d'un échec de connexion",
                "Envoyer un résumé hebdomadaire des statistiques",
                "Notifier lors d'une transaction financière importante",
              ].map((opt, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#F8F9FC", border: "1px solid #E2E8F0" }}>
                  <p className="text-sm" style={{ color: "#374151" }}>{opt}</p>
                  <div className="w-11 h-6 rounded-full relative cursor-pointer" style={{ background: i % 2 === 0 ? "#0F78C8" : "#CBD5E1" }}>
                    <div className="absolute top-1 w-4 h-4 rounded-full bg-white" style={{ right: i % 2 === 0 ? 4 : undefined, left: i % 2 !== 0 ? 4 : undefined }} />
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button className="btn-primary text-sm">Enregistrer</button>
              </div>
            </div>
          </ConfigSection>

          <ConfigSection title="Intégrations & API" desc="Configuration Mobile Money, email SMTP, webhooks et clés API externes" icon={Smartphone} color="#C8973A">
            <div className="space-y-4">
              <div className="p-4 rounded-xl flex items-center gap-4" style={{ background: "#F8F9FC", border: "1px solid #E2E8F0" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FDF4E0" }}>
                  <Smartphone size={18} style={{ color: "#C8973A" }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "#374151" }}>Orange Money / Moov Money</p>
                  <p className="text-xs text-gray-400">Passerelle de paiement mobile</p>
                </div>
                <span className="badge badge-success text-xs">Connecté</span>
              </div>
              <div><label className="form-label">Clé API Mobile Money</label><input type="password" className="form-input" defaultValue="●●●●●●●●●●●●" /></div>
              <div><label className="form-label">SMTP Host (Email)</label><input className="form-input" defaultValue="smtp.adbf.bf" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="form-label">SMTP Port</label><input className="form-input" defaultValue="587" /></div>
                <div><label className="form-label">SMTP User</label><input className="form-input" defaultValue="noreply@adbf.bf" /></div>
              </div>
              <div className="flex justify-end gap-3">
                <button className="btn-secondary text-sm flex items-center gap-1"><RefreshCw size={13} /> Tester la connexion</button>
                <button className="btn-primary text-sm">Enregistrer</button>
              </div>
            </div>
          </ConfigSection>

          <ConfigSection title="Sauvegarde & Restauration" desc="Exports de données, snapshots automatiques, restauration de la base" icon={Database} color="#16A34A">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Dernière sauvegarde", value: "02/09/2026 02:00", status: "success" },
                  { label: "Taille de la base", value: "2,4 Go", status: "info" },
                  { label: "Prochaine sauvegarde", value: "03/09/2026 02:00", status: "info" },
                ].map(s => (
                  <div key={s.label} className="p-4 rounded-xl text-center" style={{ background: "#F8F9FC", border: "1px solid #E2E8F0" }}>
                    <div className="text-xs text-gray-400 mb-1">{s.label}</div>
                    <div className="text-sm font-bold" style={{ color: "#0F78C8" }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <button className="btn-secondary text-sm flex items-center gap-1"><Download size={13} /> Exporter toutes les données</button>
                <button className="btn-secondary text-sm flex items-center gap-1"><Download size={13} /> Snapshot base de données</button>
                <button className="btn-primary text-sm flex items-center gap-1"><RefreshCw size={13} /> Lancer une sauvegarde maintenant</button>
              </div>
            </div>
          </ConfigSection>

          <ConfigSection title="Journaux système" desc="Logs applicatifs, erreurs, performances et diagnostics techniques" icon={Eye} color="#7C3AED">
            <div className="space-y-3">
              {[
                { niveau: "ERROR", msg: "Timeout connexion SMTP — tentative de renvoi en cours", heure: "02/09/2026 09:14:22", color: "#DC2626", bg: "#FEE2E2" },
                { niveau: "WARN", msg: "Charge CPU > 80% pendant 3 minutes — module Statistiques", heure: "02/09/2026 08:55:01", color: "#C8973A", bg: "#FDF4E0" },
                { niveau: "INFO", msg: "Sauvegarde automatique réussie — 2,4 Go exporté", heure: "02/09/2026 02:00:05", color: "#16A34A", bg: "#DCFCE7" },
                { niveau: "INFO", msg: "Redémarrage planifié du serveur de cache effectué", heure: "01/09/2026 23:00:00", color: "#0F78C8", bg: "#D9EEFA" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: log.bg }}>
                  <span className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0" style={{ background: log.color, color: "white", marginTop: 1 }}>{log.niveau}</span>
                  <div className="flex-1">
                    <p className="text-xs" style={{ color: "#374151" }}>{log.msg}</p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: "#94A3B8" }}>{log.heure}</p>
                  </div>
                </div>
              ))}
              <button className="btn-secondary text-sm w-full flex items-center justify-center gap-1 mt-2"><Download size={13} /> Télécharger les logs complets</button>
            </div>
          </ConfigSection>
        </div>
      )}

      {/* Modal */}
      {showModal && <EntityModal type={entiteType} onClose={() => setShowModal(false)} />}
    </div>
  );
}

