import { useState, useEffect } from "react";
import {
  LayoutDashboard, Settings, BookOpen, BarChart3, ClipboardList, Wallet,
  Shield, Bell, Search, ChevronDown, LogOut, User, Users, Building2,
  Menu, X, ChevronRight, Calendar, GraduationCap, Network, HeartPulse, School, Lock
} from "lucide-react";
import adLogo from "../imports/ead-bf.png";

type SubItem = { label: string; subId: string };
export type NavItem = { id: string; label: string; icon: React.ElementType; sub?: SubItem[] };

export function getNavItemsForScope(scope?: SupervisionScope): NavItem[] {
  const niveau = scope?.niveau || "national";

  if (niveau === "local") {
    return [
      { id: "dashboard", label: "Tableau de bord local", icon: LayoutDashboard },
      { id: "finance", label: "Finances & Caisse", icon: Wallet, sub: [
        { label: "Journal de caisse locale", subId: "journal" },
        { label: "Recettes cultes & dîmes", subId: "recettes" },
        { label: "Dépenses locales", subId: "depenses" },
      ]},
      { id: "statistics", label: "Statistiques locales", icon: BarChart3, sub: [
        { label: "Mon église locale", subId: "local" },
      ]},
      { id: "library", label: "Bibliothèque", icon: BookOpen, sub: [
        { label: "Catalogue", subId: "catalog" },
        { label: "Ma bibliothèque", subId: "mylibrary" },
        { label: "Commandes", subId: "cart" },
      ]},
      { id: "surveys", label: "Sondages", icon: ClipboardList, sub: [
        { label: "Sondages en cours", subId: "list" },
      ]},
      { id: "vie-eglise", label: "Vie de l'Église", icon: Users, sub: [
        { label: "Recommandations & Transferts", subId: "transferts" },
        { label: "Nouvelle attestation", subId: "nouveau" },
        { label: "Registres de l'église", subId: "registre" },
      ]},
      { id: "settings", label: "Fiche d'église", icon: Settings, sub: [
        { label: "Fiche d'église", subId: "org" },
        { label: "Mon compte pastoral", subId: "users" },
      ]},
    ];
  }

  if (niveau === "sousregional") {
    return [
      { id: "dashboard", label: "Tableau de bord sous-région", icon: LayoutDashboard },
      { id: "finance", label: "Finances sous-régionales", icon: Wallet, sub: [
        { label: "Dashboard sous-régional", subId: "dashboard" },
        { label: "Journal de caisse", subId: "journal" },
        { label: "Recettes", subId: "recettes" },
        { label: "Dépenses", subId: "depenses" },
        { label: "Déclarations des églises", subId: "rapports" },
      ]},
      { id: "statistics", label: "Statistiques sous-région", icon: BarChart3, sub: [
        { label: "Ma sous-région", subId: "sousregional" },
        { label: "Églises rattachées", subId: "local" },
      ]},
      { id: "library", label: "Bibliothèque", icon: BookOpen, sub: [
        { label: "Catalogue", subId: "catalog" },
        { label: "Ma bibliothèque", subId: "mylibrary" },
        { label: "Commandes", subId: "cart" },
      ]},
      { id: "surveys", label: "Sondages", icon: ClipboardList, sub: [
        { label: "Liste des sondages", subId: "list" },
        { label: "Résultats sous-régionaux", subId: "results" },
      ]},
      { id: "vie-eglise", label: "Vie de l'Église & Transferts", icon: Users, sub: [
        { label: "Recommandations reçues", subId: "transferts" },
        { label: "Cas pastoraux & Réserves", subId: "reserves" },
      ]},
      { id: "settings", label: "Paramètres sous-région", icon: Settings, sub: [
        { label: "Églises de la sous-région", subId: "org" },
        { label: "Mon compte", subId: "users" },
      ]},
    ];
  }

  if (niveau === "regional") {
    return [
      { id: "dashboard", label: "Tableau de bord régional", icon: LayoutDashboard },
      { id: "finance", label: "Finances régionales", icon: Wallet, sub: [
        { label: "Dashboard régional", subId: "dashboard" },
        { label: "Journal régional", subId: "journal" },
        { label: "Recettes régionales", subId: "recettes" },
        { label: "Dépenses régionales", subId: "depenses" },
        { label: "Budget régional", subId: "budget" },
        { label: "Rapports de consolidation", subId: "rapports" },
      ]},
      { id: "statistics", label: "Statistiques régionales", icon: BarChart3, sub: [
        { label: "Ma région ecclésiastique", subId: "regional" },
        { label: "Par sous-région", subId: "sousregional" },
        { label: "Par église locale", subId: "local" },
      ]},
      { id: "vie-eglise", label: "Vie de l'Église & Transferts", icon: Users, sub: [
        { label: "Transferts inter-églises", subId: "transferts" },
        { label: "Suivi pastoral & Discipline", subId: "discipline" },
      ]},
      { id: "library", label: "Bibliothèque", icon: BookOpen, sub: [
        { label: "Catalogue", subId: "catalog" },
        { label: "Commandes", subId: "cart" },
        { label: "Ma bibliothèque", subId: "mylibrary" },
      ]},
      { id: "surveys", label: "Sondages régionaux", icon: ClipboardList, sub: [
        { label: "Liste des sondages", subId: "list" },
        { label: "Résultats régionaux", subId: "results" },
      ]},
      { id: "settings", label: "Paramètres régionaux", icon: Settings, sub: [
        { label: "Sous-régions & Églises", subId: "org" },
        { label: "Pasteurs de la région", subId: "users" },
      ]},
    ];
  }

  if (niveau === "centre") {
    return [
      { id: "dashboard", label: "Tableau de bord Centre BEN", icon: LayoutDashboard },
      { id: "finance", label: "Supervision financière BEN", icon: Wallet, sub: [
        { label: "Dashboard inter-régional", subId: "dashboard" },
        { label: "Journal des remontées", subId: "journal" },
        { label: "Recettes supervisées", subId: "recettes" },
        { label: "Dépenses de mission", subId: "depenses" },
        { label: "Budgets inter-régionaux", subId: "budget" },
        { label: "Rapports BEN", subId: "rapports" },
      ]},
      { id: "statistics", label: "Statistiques du Centre", icon: BarChart3, sub: [
        { label: "Mon centre (BEN)", subId: "centre" },
        { label: "Régions rattachées", subId: "regional" },
        { label: "Sous-régions", subId: "sousregional" },
        { label: "Églises locales", subId: "local" },
      ]},
      { id: "library", label: "Bibliothèque", icon: BookOpen, sub: [
        { label: "Catalogue", subId: "catalog" },
        { label: "Ajouter un ouvrage", subId: "admin" },
        { label: "Commandes & Panier", subId: "cart" },
        { label: "Ma bibliothèque", subId: "mylibrary" },
      ]},
      { id: "surveys", label: "Sondages", icon: ClipboardList, sub: [
        { label: "Liste des sondages", subId: "list" },
        { label: "Créer un sondage", subId: "create" },
        { label: "Résultats", subId: "results" },
      ]},
      { id: "admin", label: "Supervision BEN", icon: Shield, sub: [
        { label: "Centres de supervision", subId: "entites" },
        { label: "Gouvernance 3R", subId: "gouvernance" },
      ]},
      { id: "vie-eglise", label: "Vie de l'Église (BEN)", icon: Users, sub: [
        { label: "Attestations & Recommandations", subId: "transferts" },
        { label: "Contentieux & Arbitrages", subId: "discipline" },
      ]},
      { id: "settings", label: "Paramétrage Centre", icon: Settings, sub: [
        { label: "Organisation des centres", subId: "org" },
        { label: "Utilisateurs", subId: "users" },
      ]},
    ];
  }

  if (niveau === "finance") {
    return [
      { id: "dashboard", label: "Tableau de bord financier", icon: LayoutDashboard },
      { id: "finance", label: "Trésorerie Centrale AD/BF", icon: Wallet, sub: [
        { label: "Dashboard financier", subId: "dashboard" },
        { label: "Journal consolidé", subId: "journal" },
        { label: "Recettes nationales", subId: "recettes" },
        { label: "Dépenses nationales", subId: "depenses" },
        { label: "Budgets 2026", subId: "budget" },
        { label: "Rapports & Audit", subId: "rapports" },
      ]},
      { id: "statistics", label: "Statistiques financières", icon: BarChart3, sub: [
        { label: "Vue nationale", subId: "national" },
        { label: "Par centre (BEN)", subId: "centre" },
        { label: "Par région", subId: "regional" },
        { label: "Par sous-région", subId: "sousregional" },
        { label: "Par église locale", subId: "local" },
      ]},
      { id: "library", label: "Bibliothèque", icon: BookOpen, sub: [
        { label: "Catalogue", subId: "catalog" },
        { label: "Commandes", subId: "cart" },
        { label: "Ma bibliothèque", subId: "mylibrary" },
      ]},
      { id: "surveys", label: "Sondages", icon: ClipboardList, sub: [
        { label: "Liste des sondages", subId: "list" },
        { label: "Résultats", subId: "results" },
      ]},
      { id: "settings", label: "Paramétrage comptable", icon: Settings, sub: [
        { label: "Plan comptable", subId: "plan" },
        { label: "Référentiels", subId: "refs" },
      ]},
    ];
  }

  // National
  return [
    { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "finance", label: "Gestion financière", icon: Wallet, sub: [
      { label: "Dashboard financier", subId: "dashboard" },
      { label: "Journal de caisse", subId: "journal" },
      { label: "Recettes", subId: "recettes" },
      { label: "Dépenses", subId: "depenses" },
      { label: "Budgets", subId: "budget" },
      { label: "Rapports", subId: "rapports" },
    ]},
    { id: "statistics", label: "Statistiques", icon: BarChart3, sub: [
      { label: "Vue nationale", subId: "national" },
      { label: "Par centre (BEN)", subId: "centre" },
      { label: "Par région", subId: "regional" },
      { label: "Par sous-région", subId: "sousregional" },
      { label: "Par église locale", subId: "local" },
    ]},
    { id: "vie-eglise", label: "Vie de l'Église & Recommandations", icon: Users, sub: [
      { label: "Registre national des transferts", subId: "transferts" },
      { label: "Discipline & Arbitrages", subId: "discipline" },
      { label: "Consolidation ecclésiale", subId: "stats" },
    ]},
    { id: "admin", label: "Administration", icon: Shield, sub: [
      { label: "Vue nationale", subId: "national" },
      { label: "Gestion des entités", subId: "entites" },
      { label: "Journal d'audit", subId: "audit" },
      { label: "Gouvernance 3R", subId: "gouvernance" },
      { label: "Configuration", subId: "config" },
    ]},
    { id: "library", label: "Bibliothèque", icon: BookOpen, sub: [
      { label: "Catalogue", subId: "catalog" },
      { label: "Ajouter un ouvrage", subId: "admin" },
      { label: "Commandes & Panier", subId: "cart" },
      { label: "Ma bibliothèque", subId: "mylibrary" },
    ]},
    { id: "surveys", label: "Sondages", icon: ClipboardList, sub: [
      { label: "Liste des sondages", subId: "list" },
      { label: "Créer un sondage", subId: "create" },
      { label: "Résultats", subId: "results" },
    ]},
    { id: "settings", label: "Paramétrage", icon: Settings, sub: [
      { label: "Utilisateurs", subId: "users" },
      { label: "Rôles & Permissions", subId: "roles" },
      { label: "Organisation ecclésiale", subId: "org" },
      { label: "Référentiels", subId: "refs" },
      { label: "Plan comptable", subId: "plan" },
    ]},
  ];
}

export type SupervisionScope = {
  id: string;
  role: string;
  nom: string;
  initials: string;
  niveau: "national" | "centre" | "regional" | "sousregional" | "local" | "finance";
  perimetre: string;
  description: string;
  instance: string;
};

export const SUPERVISION_SCOPES: SupervisionScope[] = [
  {
    id: "president-national",
    role: "Président National",
    nom: "Rév. Dr Etienne P. Zongo",
    initials: "EZ",
    niveau: "national",
    instance: "Bureau Exécutif National (BEN)",
    perimetre: "National (79 Régions, Centres, Sous-régions, 1 842 Églises)",
    description: "Supervision exécutive nationale BEN & consolidation globale"
  },
  {
    id: "ben-centre",
    role: "Membre BEN — Superviseur de Centre",
    nom: "Pasteur Philippe Oubda",
    initials: "PO",
    niveau: "centre",
    instance: "Centre N°5 (Bogodogo / Ziniaré)",
    perimetre: "Centre N°5 (Régions Bogodogo & Ziniaré — 9 Sous-régions)",
    description: "Superviseur BEN situé entre les régions et le Bureau National"
  },
  {
    id: "president-regional",
    role: "Président Régional",
    nom: "Pasteur Jean-Baptiste Kaboré",
    initials: "JK",
    niveau: "regional",
    instance: "Conseil Régional du Centre",
    perimetre: "Région Centre (284 Églises locales, 35 Sous-régions)",
    description: "Supervision ecclésiastique régionale et coordination des sous-régions"
  },
  {
    id: "president-sousregion",
    role: "Président de Sous-région",
    nom: "Pasteur Samuel Zoungrana",
    initials: "SZ",
    niveau: "sousregional",
    instance: "Conseil Sous-Régional Ouaga-Nord",
    perimetre: "Sous-région Ouaga-Nord (12 Églises locales)",
    description: "Coordination et encadrement pastoral direct des églises locales"
  },
  {
    id: "pasteur-local",
    role: "Pasteur d'Église Locale",
    nom: "Pasteur Samuel Kaboré",
    initials: "SK",
    niveau: "local",
    instance: "Église Locale Centrale Ouagadougou",
    perimetre: "Église Centrale Ouaga (1 240 fidèles, 4 annexes)",
    description: "Saisie des déclarations financières primaires, cultes et vie locale"
  },
  {
    id: "tresorier-central",
    role: "Trésorier National / Comptable Central",
    nom: "Dr. Enoch Yaméogo",
    initials: "EY",
    niveau: "finance",
    instance: "Trésorerie Centrale AD/BF",
    perimetre: "Trésorerie Centrale AD/BF (Remontée nationale)",
    description: "Consolidation nationale des déclarations saisies au bas niveau"
  },
];

const notifications = [
  { text: "Budget 2027 en attente de validation", time: "Il y a 2h", type: "warning", read: false },
  { text: "Nouvelle déclaration financière remontée — Église Centrale de Ouaga", time: "Il y a 4h", type: "success", read: false },
  { text: "Rapport statistique consolidé disponible — BEN", time: "Hier", type: "info", read: true },
  { text: "Sondage \"Vision 3R\" — 847 nouvelles réponses locales", time: "Hier", type: "info", read: true },
];

export default function AppLayout({
  children,
  currentPage,
  currentSub,
  currentScope,
  onScopeChange,
  onNavigate,
  onLogout,
}: {
  children: React.ReactNode;
  currentPage: string;
  currentSub?: string | null;
  currentScope?: SupervisionScope;
  onScopeChange?: (scope: SupervisionScope) => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedNav, setExpandedNav] = useState<string | null>(currentPage || "settings");
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showScopeSelector, setShowScopeSelector] = useState(false);
  const [localScope, setLocalScope] = useState<SupervisionScope>(currentScope || SUPERVISION_SCOPES[0]);
  const activeScope = currentScope || localScope;
  const isScopeLocked = activeScope.niveau !== "national";
  const [year, setYear] = useState("2026");

  useEffect(() => {
    if (currentScope) {
      setLocalScope(currentScope);
    }
  }, [currentScope]);

  const handleSelectScope = (scope: SupervisionScope) => {
    if (isScopeLocked) {
      return;
    }
    setLocalScope(scope);
    if (onScopeChange) {
      onScopeChange(scope);
    }
    setShowScopeSelector(false);
  };

  useEffect(() => {
    if (currentPage) {
      setExpandedNav(currentPage);
    }
  }, [currentPage]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const visibleNavItems = getNavItemsForScope(activeScope);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        {collapsed ? (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto p-1.5" style={{ background: "white" }}>
            <img src={adLogo} alt="AD/BF" className="w-full object-contain" />
          </div>
        ) : (
          <div>
            <div className="px-3 py-2 rounded-xl inline-flex" style={{ background: "white" }}>
              <img src={adLogo} alt="Assemblées de Dieu du Burkina Faso" className="h-8 object-contain" />
            </div>
            <div className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.2 }}>Plateforme nationale</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {visibleNavItems.map(item => (
          <div key={item.id}>
            <button
              onClick={() => {
                if (item.sub) {
                  setExpandedNav(expandedNav === item.id ? null : item.id);
                  if (expandedNav !== item.id) {
                    onNavigate(item.sub[0]?.subId ? `${item.id}:${item.sub[0].subId}` : item.id);
                  }
                } else {
                  onNavigate(item.id);
                  setMobileOpen(false);
                }
              }}
              className={`sidebar-nav-item w-full ${currentPage === item.id ? "active" : ""}`}
              style={{ justifyContent: collapsed ? "center" : "flex-start" }}
            >
              <item.icon size={18} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.sub && (
                    <ChevronRight size={14} className="transition-transform" style={{ transform: expandedNav === item.id ? "rotate(90deg)" : "none" }} />
                  )}
                </>
              )}
            </button>
            {!collapsed && item.sub && expandedNav === item.id && (
              <div className="ml-6 mt-1 mb-1 space-y-0.5 border-l pl-2" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                {item.sub.map((s, idx) => {
                  const isSubActive =
                    currentPage === item.id &&
                    (currentSub ? currentSub === s.subId : idx === 0);
                  return (
                    <button
                      key={s.label}
                      onClick={() => {
                        onNavigate(`${item.id}:${s.subId}`);
                        setMobileOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2"
                      style={{
                        color: isSubActive ? "#FDE047" : "rgba(255,255,255,0.72)",
                        background: isSubActive ? "rgba(255,255,255,0.12)" : "transparent",
                        fontWeight: isSubActive ? 600 : 500,
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onMouseEnter={e => {
                        if (!isSubActive) {
                          e.currentTarget.style.color = "#FFFFFF";
                          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isSubActive) {
                          e.currentTarget.style.color = "rgba(255,255,255,0.72)";
                          e.currentTarget.style.background = "transparent";
                        }
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors"
                        style={{
                          background: isSubActive ? "#FDE047" : "rgba(255,255,255,0.3)",
                        }}
                      />
                      <span className="truncate">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3 p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white shadow-sm" style={{ background: "linear-gradient(135deg, #0D67B0, #C8973A)" }}>
            {activeScope.initials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{activeScope.nom}</div>
              <div className="text-[11px] font-medium text-amber-300 truncate">{activeScope.role}</div>
              <div className="text-[10px] text-slate-300 truncate">{activeScope.instance}</div>
            </div>
          )}
          {!collapsed && (
            <button onClick={onLogout} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" style={{ color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer" }} title="Déconnexion">
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full" style={{ background: "#F8F9FC" }}>
      {/* Desktop sidebar */}
      <div
        className="hidden lg:flex flex-col flex-shrink-0 transition-all duration-200"
        style={{
          width: collapsed ? 64 : 240,
          background: "linear-gradient(180deg, #032A4E 0%, #0F78C8 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-4 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all"
          style={{
            left: collapsed ? 50 : 228,
            background: "white",
            border: "1px solid #D9EEFA",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            cursor: "pointer",
            color: "#0F78C8",
          }}
        >
          {collapsed ? <ChevronRight size={12} /> : <X size={12} />}
        </button>
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 flex flex-col" style={{ background: "linear-gradient(180deg, #032A4E 0%, #0F78C8 100%)" }}>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex-shrink-0 flex items-center gap-3 px-4 sm:px-6 h-16 border-b" style={{ background: "white", borderColor: "#D9EEFA" }}>
          <button className="lg:hidden p-2 rounded-lg" onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748B" }}>
            <Menu size={20} />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-xs md:max-w-sm relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
            <input
              type="text"
              placeholder="Recherche globale…"
              className="w-full rounded-lg text-sm pl-9 pr-4 py-2"
              style={{ background: "#F8F9FC", border: "1px solid #D9EEFA", fontFamily: "'Inter', sans-serif", color: "#334155", outline: "none" }}
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Hierarchical Supervision Scope Selector */}
            <div className="relative">
              {isScopeLocked ? (
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-left cursor-default select-none shadow-2xs"
                  style={{
                    background: activeScope.niveau === "centre" ? "#F0F9FF" : activeScope.niveau === "regional" ? "#EFF6FF" : activeScope.niveau === "sousregional" ? "#FFFBEB" : "#F0FDF4",
                    borderColor: activeScope.niveau === "centre" ? "#BAE6FD" : activeScope.niveau === "regional" ? "#BFDBFE" : activeScope.niveau === "sousregional" ? "#FDE68A" : "#BBF7D0",
                  }}
                  title={`Circonscription attribuée et verrouillée : ${activeScope.instance} (${activeScope.perimetre})`}
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: activeScope.niveau === "centre" ? "#0284C7" : activeScope.niveau === "regional" ? "#2563EB" : activeScope.niveau === "sousregional" ? "#D97706" : "#16A34A" }} />
                  <div className="hidden sm:block">
                    <div className="text-[11px] font-bold text-slate-800 leading-tight flex items-center gap-1.5">
                      <span>{activeScope.role}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold" style={{ background: "rgba(15,120,200,0.1)", color: "#0F78C8" }}>
                        {activeScope.niveau.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[170px] md:max-w-[220px]">
                      {activeScope.perimetre}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-white/70 px-1.5 py-0.5 rounded border border-slate-200/80 ml-1">
                    <Lock size={11} className="text-amber-600" />
                    <span className="hidden md:inline text-[9px] uppercase tracking-wide text-slate-600">Verrouillé</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setShowScopeSelector(!showScopeSelector); setShowProfile(false); setShowNotifs(false); }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-left transition-all"
                  style={{
                    background: activeScope.niveau === "national" ? "#EFF6FF" : "#FEF3C7",
                    borderColor: activeScope.niveau === "national" ? "#BFDBFE" : "#FDE68A",
                    cursor: "pointer"
                  }}
                  title="Changer de périmètre de supervision ecclésiastique"
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: activeScope.niveau === "national" ? "#0F78C8" : "#D97706" }} />
                  <div className="hidden sm:block">
                    <div className="text-[11px] font-bold text-slate-800 leading-tight flex items-center gap-1">
                      <span>{activeScope.role}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold" style={{ background: "rgba(15,120,200,0.1)", color: "#0F78C8" }}>
                        {activeScope.niveau.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[170px] md:max-w-[220px]">
                      {activeScope.perimetre}
                    </div>
                  </div>
                  <ChevronDown size={13} className="text-slate-500 ml-1" />
                </button>
              )}

              {!isScopeLocked && showScopeSelector && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 rounded-2xl shadow-2xl z-50 overflow-hidden bg-white border border-slate-200 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3.5 bg-gradient-to-r from-slate-900 to-sky-950 text-white border-b border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-wider text-amber-300">Périmètre de supervision</span>
                      <span className="text-[11px] text-slate-300">Bureau Exécutif (BEN)</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                      Les Centres se situent entre les Régions et le Bureau National. Les déclarations et statistiques remontent des églises locales vers les sous-régions, puis les régions, les centres et le Bureau National.
                    </p>
                  </div>
                  <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                    {SUPERVISION_SCOPES.map(scope => {
                      const isSelected = activeScope.id === scope.id;
                      return (
                        <button
                          key={scope.id}
                          onClick={() => {
                            handleSelectScope(scope);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 ${
                            isSelected ? "bg-sky-50 border border-sky-200" : "hover:bg-slate-50 border border-transparent"
                          }`}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0 mt-0.5 shadow-sm"
                            style={{ background: isSelected ? "linear-gradient(135deg, #0F78C8, #C8973A)" : "#64748B" }}
                          >
                            {scope.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800 truncate">{scope.role}</span>
                              {isSelected && <span className="text-[10px] bg-sky-600 text-white px-1.5 py-0.5 rounded-full font-bold">Actif</span>}
                            </div>
                            <div className="text-[11px] font-semibold text-sky-700">{scope.nom}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{scope.perimetre}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 text-center">
                    💡 La vue s'adapte au périmètre sélectionné pour simuler les accès hiérarchiques.
                  </div>
                </div>
              )}
            </div>

            {/* Year selector */}
            <div className="relative hidden md:flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer" style={{ background: "#F8F9FC", border: "1px solid #D9EEFA" }}>
              <Calendar size={14} style={{ color: "#64748B" }} />
              <select value={year} onChange={e => setYear(e.target.value)} className="text-xs font-semibold appearance-none bg-transparent border-none outline-none cursor-pointer" style={{ color: "#0F78C8", fontFamily: "'Inter', sans-serif" }}>
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>
              </select>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); setShowScopeSelector(false); }}
                className="relative w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "#F8F9FC", border: "1px solid #D9EEFA", cursor: "pointer", color: "#64748B" }}
              >
                <Bell size={17} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs" style={{ background: "#DC2626", fontSize: "10px", fontWeight: 700 }}>
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifs && (
                <div className="absolute right-0 top-12 w-80 rounded-xl shadow-xl z-50 overflow-hidden" style={{ background: "white", border: "1px solid #D9EEFA" }}>
                  <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
                    <span className="font-semibold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Notifications</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#FEE2E2", color: "#B91C1C" }}>{unreadCount} non lues</span>
                  </div>
                  {notifications.map((n, i) => (
                    <div key={i} className="p-4 border-b flex items-start gap-3" style={{ borderColor: "#F1F5F9", background: n.read ? "white" : "#FAFBFF" }}>
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.read ? "#CBD5E1" : "#0F78C8" }} />
                      <div className="flex-1">
                        <p className="text-xs leading-relaxed" style={{ color: n.read ? "#64748B" : "#1A2340" }}>{n.text}</p>
                        <p className="text-xs mt-1" style={{ color: "#94A3B8" }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full p-3 text-xs font-semibold text-center" style={{ color: "#0F78C8", background: "#F8F9FC", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                    Voir toutes les notifications
                  </button>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); setShowScopeSelector(false); }}
                className="flex items-center gap-2 p-1.5 rounded-lg"
                style={{ background: "#F8F9FC", border: "1px solid #D9EEFA", cursor: "pointer" }}
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm" style={{ background: "linear-gradient(135deg, #0D67B0, #C8973A)" }}>
                  {activeScope.initials}
                </div>
                <ChevronDown size={13} style={{ color: "#94A3B8" }} />
              </button>
              {showProfile && (
                <div className="absolute right-0 top-12 w-64 rounded-xl shadow-xl z-50 overflow-hidden" style={{ background: "white", border: "1px solid #D9EEFA" }}>
                  <div className="p-4 border-b bg-sky-50/50" style={{ borderColor: "#F1F5F9" }}>
                    <p className="font-bold text-sm" style={{ color: "#0F78C8", fontFamily: "'Manrope', sans-serif" }}>{activeScope.nom}</p>
                    <p className="text-xs font-semibold text-amber-700">{activeScope.role}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{activeScope.instance}</p>
                  </div>
                  {isScopeLocked ? (
                    <div className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-slate-600 bg-slate-50 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <Shield size={14} className="text-slate-400" />
                        <span className="font-medium">Circonscription</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
                        <Lock size={10} /> Fixe
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setShowProfile(false); setShowScopeSelector(true); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-50"
                      style={{ border: "none", background: "none", cursor: "pointer", color: "#374151", fontFamily: "'Inter', sans-serif" }}
                    >
                      <Shield size={15} style={{ color: "#64748B" }} /> Périmètre de supervision
                    </button>
                  )}
                  {[
                    { icon: User, label: "Mon profil utilisateur" },
                    { icon: Settings, label: "Paramètres" },
                    { icon: Bell, label: "Notifications" },
                  ].map(m => (
                    <button
                      key={m.label}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-50"
                      style={{ border: "none", background: "none", cursor: "pointer", color: "#374151", fontFamily: "'Inter', sans-serif" }}
                    >
                      <m.icon size={15} style={{ color: "#64748B" }} /> {m.label}
                    </button>
                  ))}
                  <div className="border-t" style={{ borderColor: "#F1F5F9" }}>
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left" style={{ border: "none", background: "none", cursor: "pointer", color: "#DC2626", fontFamily: "'Inter', sans-serif" }}>
                      <LogOut size={15} /> Se déconnecter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

     

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
