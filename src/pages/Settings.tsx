import { useState, useEffect } from "react";
import {
  Users, Shield, Building2, BookOpen, Search, Plus, Edit, Trash2,
  Eye, MoreVertical, CheckSquare, Square, ChevronRight, X, Save,
  Phone, Mail, MapPin, Calendar, Key
} from "lucide-react";
import type { SupervisionScope } from "../components/AppLayout";

type SettingsView = "users" | "roles" | "org" | "refs" | "plan";

const usersData = [
  { id: 1, nom: "Rév. Dr Etienne P. Zongo", email: "president.ben@adbf.bf", tel: "+226 70 12 34 56", org: "Bureau Exécutif National (BEN)", role: "Président National", statut: "Actif", connexion: "Aujourd'hui 08:12" },
  { id: 2, nom: "Sœur Marie Ouédraogo", email: "m.ouedraogo@adbf.bf", tel: "+226 76 23 45 67", org: "Région Centre", role: "Responsable régional", statut: "Actif", connexion: "01/09/2026 16:44" },
  { id: 3, nom: "Frère Jean-Baptiste Sawadogo", email: "jb.sawadogo@adbf.bf", tel: "+226 65 34 56 78", org: "District Bobo Nord", role: "Comptable", statut: "Actif", connexion: "31/08/2026 09:30" },
  { id: 4, nom: "Pasteur Élisée Compaoré", email: "e.compaore@adbf.bf", tel: "+226 71 45 67 89", org: "Église Centrale OUA", role: "Pasteur", statut: "Actif", connexion: "29/08/2026 07:15" },
  { id: 5, nom: "Frère David Traoré", email: "d.traore@adbf.bf", tel: "+226 78 56 78 90", org: "Institut Biblique", role: "Bibliothécaire", statut: "Inactif", connexion: "15/08/2026 11:20" },
  { id: 6, nom: "Sœur Ruth Zongo", email: "r.zongo@adbf.bf", tel: "+226 60 67 89 01", org: "Région Cascades", role: "Statisticien", statut: "Actif", connexion: "02/09/2026 06:55" },
];

const rolesData = [
  { id: 1, nom: "Administrateur national", desc: "Accès complet à tous les modules", users: 3, statut: "Actif" },
  { id: 2, nom: "Responsable régional", desc: "Accès aux données de sa région", users: 79, statut: "Actif" },
  { id: 3, nom: "Responsable de district", desc: "Accès aux données de son district", users: 42, statut: "Actif" },
  { id: 4, nom: "Pasteur", desc: "Accès à son église locale", users: 284, statut: "Actif" },
  { id: 5, nom: "Comptable", desc: "Accès aux fonctions financières", users: 18, statut: "Actif" },
  { id: 6, nom: "Statisticien", desc: "Saisie et consultation des statistiques", users: 9, statut: "Actif" },
  { id: 7, nom: "Bibliothécaire", desc: "Gestion du catalogue de la bibliothèque", users: 4, statut: "Actif" },
  { id: 8, nom: "Éditeur CMS", desc: "Publication d'actualités et événements", users: 6, statut: "Actif" },
];

const modules = [
  {
    name: "Finance", permissions: ["Voir finance", "Créer recette", "Modifier recette", "Supprimer recette", "Créer dépense", "Modifier dépense", "Valider dépense", "Voir rapports", "Exporter rapports"]
  },
  {
    name: "Statistiques", permissions: ["Voir statistiques", "Saisir statistiques", "Modifier statistiques", "Valider statistiques", "Exporter statistiques"]
  },
  {
    name: "Bibliothèque", permissions: ["Voir catalogue", "Ajouter ouvrage", "Modifier ouvrage", "Supprimer ouvrage", "Gérer achats", "Gérer téléchargements"]
  },
  {
    name: "CMS / Vitrine", permissions: ["Voir contenu", "Créer actualité", "Modifier actualité", "Publier actualité", "Gérer événements", "Gérer communiqués"]
  },
  {
    name: "Utilisateurs", permissions: ["Voir utilisateurs", "Créer utilisateur", "Modifier utilisateur", "Désactiver utilisateur", "Gérer rôles"]
  },
];

const orgData = {
  national: {
    name: "Bureau National — AD/BF",
    regions: [
      { name: "Région Bogodogo", districts: 2, eglises: 32, membres: 14000 },
      { name: "Région Ziniaré", districts: 7, eglises: 58, membres: 18700 },
      { name: "Région Centre", districts: 8, eglises: 284, membres: 98400 },
      { name: "Hauts-Bassins", districts: 6, eglises: 210, membres: 72300 },
      { name: "Cascades", districts: 5, eglises: 142, membres: 48200 },
      { name: "Centre-Ouest", districts: 4, eglises: 138, membres: 46800 },
      { name: "Sahel", districts: 3, eglises: 98, membres: 31200 },
      { name: "Est", districts: 4, eglises: 112, membres: 38400 },
    ]
  }
};

export default function Settings({ initialTab, currentScope }: { initialTab?: string | null; currentScope?: SupervisionScope }) {
  const niveau = currentScope?.niveau || "national";

  const getScopedTabs = (): { id: SettingsView; label: string; icon: React.ElementType }[] => {
    if (niveau === "local") {
      return [
        { id: "org", label: "Fiche d'église", icon: Building2 },
        { id: "users", label: "Mon profil pastoral", icon: Users },
      ];
    }
    if (niveau === "sousregional") {
      return [
        { id: "org", label: "Églises de la sous-région", icon: Building2 },
        { id: "users", label: "Mon compte", icon: Users },
      ];
    }
    if (niveau === "regional") {
      return [
        { id: "org", label: "Sous-régions & Églises du Centre", icon: Building2 },
        { id: "users", label: "Pasteurs & Utilisateurs régionaux", icon: Users },
      ];
    }
    if (niveau === "centre") {
      return [
        { id: "org", label: "Organisation des centres BEN", icon: Building2 },
        { id: "users", label: "Utilisateurs du centre", icon: Users },
      ];
    }
    if (niveau === "finance") {
      return [
        { id: "plan", label: "Plan comptable", icon: Key },
        { id: "refs", label: "Référentiels financiers", icon: BookOpen },
        { id: "users", label: "Mon profil", icon: Users },
      ];
    }
    return [
      { id: "users", label: "Utilisateurs", icon: Users },
      { id: "roles", label: "Rôles & Permissions", icon: Shield },
      { id: "org", label: "Organisation", icon: Building2 },
      { id: "refs", label: "Référentiels", icon: BookOpen },
      { id: "plan", label: "Plan comptable", icon: Key },
    ];
  };

  const tabs = getScopedTabs();

  const defaultView: SettingsView =
    initialTab && tabs.some(t => t.id === initialTab)
      ? (initialTab as SettingsView)
      : tabs[0].id;

  const [view, setView] = useState<SettingsView>(defaultView);

  useEffect(() => {
    if (initialTab && tabs.some(t => t.id === initialTab)) {
      setView(initialTab as SettingsView);
    } else {
      setView(tabs[0].id);
    }
  }, [initialTab, niveau]);

  const [showUserForm, setShowUserForm] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [permissions, setPermissions] = useState<Set<string>>(new Set(["Voir finance", "Voir statistiques", "Voir catalogue"]));

  const togglePerm = (p: string) => {
    const s = new Set(permissions);
    s.has(p) ? s.delete(p) : s.add(p);
    setPermissions(s);
  };

  return (
    <div>
      <div className="page-header mb-5">
        <div>
          <h1 className="section-title text-2xl">
            {niveau === "local"
              ? "Paramètres — Église Locale Centrale"
              : niveau === "sousregional"
              ? "Paramètres — Sous-région Ouaga-Nord"
              : niveau === "regional"
              ? "Paramètres — Région Centre"
              : "Paramétrage de la plateforme"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Circonscription active : <strong>{currentScope?.instance || "National"}</strong>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-6 overflow-x-auto" style={{ background: "#F1F5F9", border: "1px solid #D9EEFA" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setView(t.id)} className={`tab-btn whitespace-nowrap flex items-center gap-2 ${view === t.id ? "active" : ""}`}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* USERS */}
      {view === "users" && (
        <div className="card overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
            <h3 className="section-title">Gestion des utilisateurs</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
                <input placeholder="Rechercher…" className="form-input text-xs pl-8" style={{ width: 220 }} />
              </div>
              <button onClick={() => setShowUserForm(true)} className="btn-primary text-xs"><Plus size={14} /> Ajouter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Utilisateur</th>
                  <th>Contact</th>
                  <th>Organisation</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                  <th>Dernière connexion</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #0D67B0, #C8973A)" }}>
                          {u.nom.split(" ").slice(-1)[0]?.[0]}{u.nom.split(" ").slice(-2)[0]?.[0]}
                        </div>
                        <div>
                          <div className="text-sm font-semibold" style={{ color: "#0F78C8" }}>{u.nom}</div>
                          <div className="text-xs text-gray-400">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-xs text-gray-500">{u.tel}</td>
                    <td className="text-xs">{u.org}</td>
                    <td><span className="badge badge-info">{u.role}</span></td>
                    <td>
                      <span className={`badge ${u.statut === "Actif" ? "badge-success" : "badge-warning"}`}>{u.statut}</span>
                    </td>
                    <td className="text-xs text-gray-400">{u.connexion}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#F1F5F9", border: "none", cursor: "pointer", color: "#64748B" }}><Eye size={13} /></button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#F1F5F9", border: "none", cursor: "pointer", color: "#64748B" }}><Edit size={13} /></button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#FEE2E2", border: "none", cursor: "pointer", color: "#DC2626" }}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ROLES */}
      {view === "roles" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Role list */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
              <h3 className="section-title text-base">Rôles</h3>
              <button onClick={() => setShowRoleForm(true)} className="btn-primary text-xs"><Plus size={13} /> Nouveau</button>
            </div>
            <div className="divide-y" style={{ borderColor: "#F1F5F9" }}>
              {rolesData.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className="w-full p-4 text-left flex items-center justify-between group"
                  style={{ background: selectedRole === r.id ? "#EBF6FD" : "white", border: "none", cursor: "pointer" }}
                >
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: "#0F78C8" }}>{r.nom}</div>
                    <div className="text-xs text-gray-400">{r.users} utilisateurs</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-success text-xs">{r.statut}</span>
                    <ChevronRight size={14} style={{ color: "#CBD5E1" }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Permissions matrix */}
          <div className="lg:col-span-2 card overflow-hidden">
            {selectedRole ? (
              <>
                <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
                  <div>
                    <h3 className="section-title text-base">{rolesData.find(r => r.id === selectedRole)?.nom}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{rolesData.find(r => r.id === selectedRole)?.desc}</p>
                  </div>
                  <button className="btn-primary text-xs"><Save size={13} /> Enregistrer</button>
                </div>
                <div className="p-4 overflow-auto" style={{ maxHeight: "500px" }}>
                  {modules.map(mod => (
                    <div key={mod.name} className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#0F78C8" }}>{mod.name}</h4>
                        <button
                          className="text-xs font-semibold"
                          style={{ color: "#C8973A", background: "none", border: "none", cursor: "pointer" }}
                          onClick={() => {
                            const allSet = mod.permissions.every(p => permissions.has(p));
                            const s = new Set(permissions);
                            if (allSet) mod.permissions.forEach(p => s.delete(p));
                            else mod.permissions.forEach(p => s.add(p));
                            setPermissions(s);
                          }}
                        >
                          {mod.permissions.every(p => permissions.has(p)) ? "Tout désélectionner" : "Tout sélectionner"}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {mod.permissions.map(p => (
                          <button
                            key={p}
                            onClick={() => togglePerm(p)}
                            className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-left transition-all"
                            style={{
                              background: permissions.has(p) ? "#D9EEFA" : "#F8F9FC",
                              border: `1px solid ${permissions.has(p) ? "#0F78C8" : "#D9EEFA"}`,
                              color: permissions.has(p) ? "#0F78C8" : "#64748B",
                              cursor: "pointer",
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {permissions.has(p) ? <CheckSquare size={13} style={{ color: "#0F78C8", flexShrink: 0 }} /> : <Square size={13} style={{ color: "#CBD5E1", flexShrink: 0 }} />}
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 text-center p-8">
                <div>
                  <Shield size={36} className="mx-auto mb-3" style={{ color: "#CBD5E1" }} />
                  <p className="text-sm text-gray-400">Sélectionnez un rôle pour configurer ses permissions</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ORG */}
      {view === "org" && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="section-title">Arborescence ecclésiale — AD/BF</h3>
            <div className="flex gap-2">
              <button className="btn-secondary text-xs"><Plus size={14} /> Région</button>
              <button className="btn-secondary text-xs"><Plus size={14} /> District</button>
              <button className="btn-primary text-xs"><Plus size={14} /> Église</button>
            </div>
          </div>

          {/* National level */}
          <div className="card p-4 mb-4" style={{ borderLeft: "4px solid #C8973A" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#FDF4E0" }}>
                <Building2 size={20} style={{ color: "#C8973A" }} />
              </div>
              <div>
                <div className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Bureau National AD/BF</div>
                <div className="text-xs text-gray-400">Niveau national · 79 régions · 1 842 églises</div>
              </div>
            </div>
          </div>

          {/* Regions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {orgData.national.regions.map(r => (
              <div key={r.name} className="card p-4 cursor-pointer group" style={{ transition: "all 0.2s" }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#D9EEFA" }}>
                      <MapPin size={15} style={{ color: "#0D67B0" }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "#0F78C8" }}>{r.name}</div>
                      <div className="text-xs text-gray-400">{r.districts} districts</div>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "#F1F5F9", border: "none", cursor: "pointer", color: "#64748B" }}><Edit size={11} /></button>
                    <button className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "#FEE2E2", border: "none", cursor: "pointer", color: "#DC2626" }}><Trash2 size={11} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg text-center" style={{ background: "#F8F9FC" }}>
                    <div className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{r.eglises}</div>
                    <div className="text-xs text-gray-400">Églises</div>
                  </div>
                  <div className="p-2 rounded-lg text-center" style={{ background: "#F8F9FC" }}>
                    <div className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#16A34A" }}>{(r.membres / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-400">Membres</div>
                  </div>
                </div>
                <button className="mt-3 w-full text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1" style={{ color: "#0F78C8", background: "#EBF6FD", border: "none", cursor: "pointer" }}>
                  Voir les districts <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REFERENTIELS */}
      {view === "refs" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Catégories d'activités", items: ["Culte", "Évangélisation", "Discipulat", "Action sociale", "Jeunesse", "Enfants", "Missions"] },
            { title: "Types de recettes", items: ["Dîmes", "Offrandes", "Dons", "Contributions", "Autres recettes"] },
            { title: "Types de dépenses", items: ["Fonctionnement", "Missions", "Personnel", "Formation", "Évangélisation", "Action sociale", "Infrastructure", "Autres dépenses"] },
          ].map(ref => (
            <div key={ref.title} className="card overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
                <h3 className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{ref.title}</h3>
                <button className="btn-primary text-xs px-3 py-1.5"><Plus size={12} /></button>
              </div>
              <div className="p-3">
                {ref.items.map(item => (
                  <div key={item} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group">
                    <span className="text-sm text-gray-700">{item}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><Edit size={13} /></button>
                      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#FCA5A5" }}><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PLAN COMPTABLE */}
      {view === "plan" && (
        <div className="card overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "#F1F5F9" }}>
            <h3 className="section-title">Plan comptable AD/BF</h3>
            <button className="btn-primary text-xs"><Plus size={14} /> Ajouter un compte</button>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Code</th><th>Libellé</th><th>Catégorie</th><th>Type</th><th>Statut</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {[
                { code: "1000", label: "Fonds propres", cat: "Bilan", type: "Passif", statut: "Actif" },
                { code: "5141", label: "Caisse principale", cat: "Trésorerie", type: "Actif", statut: "Actif" },
                { code: "5161", label: "Compte bancaire BICIAB", cat: "Trésorerie", type: "Actif", statut: "Actif" },
                { code: "6020", label: "Achat fournitures bureau", cat: "Charges", type: "Charge", statut: "Actif" },
                { code: "6061", label: "Électricité et eau", cat: "Charges", type: "Charge", statut: "Actif" },
                { code: "6120", label: "Carburant et transport", cat: "Charges", type: "Charge", statut: "Actif" },
                { code: "6200", label: "Rémunérations du personnel", cat: "Personnel", type: "Charge", statut: "Actif" },
                { code: "7001", label: "Dîmes collectées", cat: "Produits", type: "Produit", statut: "Actif" },
                { code: "7002", label: "Offrandes culte ordinaire", cat: "Produits", type: "Produit", statut: "Actif" },
                { code: "7003", label: "Offrandes spéciales", cat: "Produits", type: "Produit", statut: "Actif" },
                { code: "7400", label: "Dons et subventions reçus", cat: "Produits", type: "Produit", statut: "Actif" },
              ].map(c => (
                <tr key={c.code}>
                  <td className="font-mono text-sm font-semibold" style={{ color: "#0F78C8" }}>{c.code}</td>
                  <td className="font-medium text-sm">{c.label}</td>
                  <td><span className="badge badge-info">{c.cat}</span></td>
                  <td className="text-xs" style={{ color: c.type === "Actif" || c.type === "Produit" ? "#16A34A" : c.type === "Passif" ? "#0F78C8" : "#DC2626" }}>{c.type}</td>
                  <td><span className="badge badge-success">{c.statut}</span></td>
                  <td>
                    <div className="flex gap-1">
                      <button style={{ background: "#F1F5F9", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: "6px", color: "#64748B", fontSize: "12px" }}>Modifier</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add User Modal */}
      {showUserForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(6,14,37,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="card w-full max-w-lg p-6" style={{ background: "white", borderRadius: "16px", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">Ajouter un utilisateur</h2>
              <button onClick={() => setShowUserForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748B" }}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="form-label">Prénom *</label><input type="text" className="form-input" placeholder="Marie" /></div>
                <div><label className="form-label">Nom *</label><input type="text" className="form-input" placeholder="Ouédraogo" /></div>
              </div>
              <div><label className="form-label">Email *</label><input type="email" className="form-input" placeholder="m.ouedraogo@adbf.bf" /></div>
              <div><label className="form-label">Téléphone</label><input type="tel" className="form-input" placeholder="+226 XX XX XX XX" /></div>
              <div><label className="form-label">Organisation *</label>
                <select className="form-input"><option>Bureau National</option><option>Région Centre</option><option>Hauts-Bassins</option><option>Institut Biblique</option></select>
              </div>
              <div><label className="form-label">Rôle *</label>
                <select className="form-input">{rolesData.map(r => <option key={r.id}>{r.nom}</option>)}</select>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "#FDF4E0", border: "1px solid #E8C98A" }}>
                <p className="text-xs text-gray-600">Un email avec les identifiants de connexion sera automatiquement envoyé à l'adresse saisie.</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowUserForm(false)} className="btn-secondary flex-1">Annuler</button>
              <button onClick={() => setShowUserForm(false)} className="btn-primary flex-1"><Save size={15} /> Créer l'utilisateur</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
