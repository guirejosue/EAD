import { useState, useEffect } from "react";
import { 
  Network, Users, Globe, Building2, Handshake, Shield, 
  CheckCircle, Layers, Heart, Sparkles, BookOpen, GraduationCap, 
  Radio, Baby, Flame, Compass, Church, ArrowDown, MapPin
} from "lucide-react";
import logo3R from "../../imports/logo_3R.jpeg";
import logoASC from "../../imports/Logo-ASC5.png";
import logoJAD from "../../imports/cropped-Logo-Circulaire-JAD.png";
import logoDENAD from "../../imports/cropped-Logo-DENAD-Bon.png";
import logoAD from "../../imports/ead-bf.png";

export type StructureTab = "hierarchie" | "bureau" | "structures" | "oeuvres" | "partenariats";

// Bureau Exécutif National (BEN) - Présentation sobre & synthétique
const bureauNational = [
  {
    nom: "Rév. Dr Etienne ZONGO",
    role: "Président National",
    titre: "Présidence de l'Église",
    desc: "Direction générale, orientation doctrinale et représentation institutionnelle nationale et internationale.",
    tag: "Présidence"
  },
  {
    nom: "Rév. Dr Jephté SAWADOGO",
    role: "Vice-Président",
    titre: "Vice-Présidence",
    desc: "Appui stratégique à la présidence, conduite des projets d'envergure et coordination ecclésiastique.",
    tag: "Gouvernance"
  },
  {
    nom: "Rév. Dr Philémon S. SABA",
    role: "Secrétaire Général",
    titre: "Secrétariat Général",
    desc: "Administration centrale, actes officiels, affaires juridiques et communication générale.",
    tag: "Administration"
  },
  {
    nom: "Rév. Dr Philippe OUÉDRAOGO",
    role: "Secrétaire Général Adjoint",
    titre: "Secrétariat Général Adjoint",
    desc: "Assistance administrative, tenue des registres, archivage et suivi des conseils généraux.",
    tag: "Administration"
  },
  {
    nom: "Rév. Dr Énoch YAMÉOGO",
    role: "Trésorier Général",
    titre: "Trésorerie Générale",
    desc: "Gestion financière, patrimoine immobilier et foncier, budgets nationaux et contrôle de gestion.",
    tag: "Finances"
  },
  {
    nom: "Rév. Past. Jean Marie BADIEL",
    role: "Trésorier Général Adjoint",
    titre: "Trésorerie Générale Adjointe",
    desc: "Suivi des cotisations statutaires, fonds de solidarité et contrôle financier d'appui.",
    tag: "Finances"
  },
  {
    nom: "Rév. Dr Moïse SAWADOGO",
    role: "Membre du Bureau",
    titre: "Conseil & Orientation",
    desc: "Conseil pastoral, veille éthique, doctrine et accompagnement des programmes spirituels.",
    tag: "Conseil"
  }
];

// Les 4 grandes structures de masse (Synthétique)
const quatreStructures = [
  {
    code: "ASC",
    nom: "Association des Servantes de Christ",
    logo: logoASC,
    cible: "Femmes & Jeunes Filles",
    annee: "Depuis 1979",
    devise: "Épanouissement chrétien, piété et témoignage de la femme.",
    missions: [
      "Mobilisation spirituelle et prière des femmes",
      "Action sociale : soutien aux veuves et orphelins",
      "Édification des foyers et autonomisation"
    ],
    couleur: "#E11D48",
    bgLight: "#FFE4E6",
    icon: Heart
  },
  {
    code: "JAD",
    nom: "Jeunesse des Assemblées de Dieu",
    logo: logoJAD,
    cible: "Jeunes, Étudiants & Scolaires",
    annee: "Mouvement National",
    devise: "Réformés pour briller, réveillés pour impacter.",
    missions: [
      "Évangélisation de masse et camps nationaux",
      "Leadership chrétien, civisme et formation",
      "Actions citoyennes et solidaires de terrain"
    ],
    couleur: "#0284C7",
    bgLight: "#E0F2FE",
    icon: Flame
  },
  {
    code: "MHEB",
    nom: "Mouvement des Hommes Évangéliques",
    logo: logoAD,
    cible: "Hommes, Pères & Professionnels",
    annee: "Pôle Hommes",
    devise: "Sacerdoce au foyer, intégrité au travail, foi dans l'Église.",
    missions: [
      "Responsabilité spirituelle du chef de famille",
      "Soutien financier aux chantiers de temples",
      "Mentorat et éthique dans le milieu socioprofessionnel"
    ],
    couleur: "#15803D",
    bgLight: "#DCFCE7",
    icon: Users
  },
  {
    code: "DENAD",
    nom: "Département Enfants & Adolescents",
    logo: logoDENAD,
    cible: "Enfants (3-14 ans) & Moniteurs ECODIM",
    annee: "Ministère Enfance",
    devise: "Bâtissons l'Église de Jésus-Christ dans nos maisons.",
    missions: [
      "Écoles du Dimanche (ECODIM) et éveil de la foi",
      "Formation et outillage des moniteurs d'enfants",
      "Parrainage et soutien aux enfants vulnérables"
    ],
    couleur: "#D97706",
    bgLight: "#FEF3C7",
    icon: Baby
  }
];

// Les Œuvres & Ministères Spécialisés (Format condensé)
const oeuvresNationales = [
  { sigle: "DEP", nom: "Évangélisation & Prière", role: "Campagnes de plein air, réveil et intercession.", icon: Compass, color: "#0F78C8" },
  { sigle: "DGFE", nom: "Formation & Éducation", role: "Catéchèse, coordination pédagogique et formation continue.", icon: BookOpen, color: "#7C3AED" },
  { sigle: "DEFAMA", nom: "Famille & Mariage", role: "Pastorale du foyer, conseil conjugal et prénuptial.", icon: Heart, color: "#E11D48" },
  { sigle: "VIMAB", nom: "Vision Missionnaire", role: "Envoi et soutien des missionnaires en zones pionnières.", icon: Globe, color: "#059669" },
  { sigle: "UNEP", nom: "Enseignement Scolaire", role: "Réseau d'écoles, collèges et lycées confessionnels.", icon: GraduationCap, color: "#C8973A" },
  { sigle: "MÉDIAS", nom: "CVK & Radio/TV LVD", role: "Diffusion nationale et satellitaire de l'Évangile.", icon: Radio, color: "#4F46E5" },
  { sigle: "FORMATION", nom: "Instituts Bibliques (IBO...)", role: "Formation pastorale et théologique diplômante.", icon: Building2, color: "#0284C7" },
  { sigle: "SANTÉ", nom: "Centres de Santé & CSPS", role: "Soins médicaux, maternités et action humanitaire.", icon: Sparkles, color: "#16A34A" },
];

// Niveaux d'organisation territoriale (Synthétique)
const paliersHierarchiques = [
  {
    niveau: "1. Bureau Exécutif National (BEN)",
    sousTitre: "Instance de Direction Suprême",
    circonscription: "Niveau National & International (Siège : Ouagadougou)",
    role: "Fixe les orientations spirituelles et doctrinales, gère le patrimoine et supervise l'ensemble des centres et régions.",
    color: "#032A4E",
    bgBadge: "#D9EEFA",
    colorBadge: "#0F78C8"
  },
  {
    niveau: "2. Les Centres Ecclésiastiques",
    sousTitre: "Coordination Stratégique Intermédiaire",
    circonscription: "Situés entre le Bureau National et les Régions",
    role: "Pôles de coordination mutualisant les grands rassemblements, projets régionaux et directives du Bureau National.",
    color: "#C8973A",
    bgBadge: "#FDF4E0",
    colorBadge: "#C8973A"
  },
  {
    niveau: "3. Les Régions Ecclésiastiques",
    sousTitre: "Bureaux Régionaux",
    circonscription: "Circonscriptions régionales (Centre, Hauts-Bassins, Mouhoun...)",
    role: "Direction pastorale régionale, tenue des conseils régionaux et encadrement direct des sous-régions.",
    color: "#0F78C8",
    bgBadge: "#EBF6FD",
    colorBadge: "#0F78C8"
  },
  {
    niveau: "4. Les Sous-Régions",
    sousTitre: "Circonscriptions de Proximité",
    circonscription: "Districts et zones sous-régionales",
    role: "Animation fraternelle, études bibliques conjointes et liaison de proximité entre les sections locales.",
    color: "#7C3AED",
    bgBadge: "#EDE9FE",
    colorBadge: "#7C3AED"
  },
  {
    niveau: "5. Sections & Églises Locales",
    sousTitre: "Communautés de Culte de Base",
    circonscription: "Temples, annexes et cellules de prière",
    role: "Cultes, enseignement biblique, vie communautaire et déploiement local des structures ASC, JAD, MHEB, DENAD.",
    color: "#16A34A",
    bgBadge: "#DCFCE7",
    colorBadge: "#16A34A"
  }
];

// Alliances & Partenariats
const partenariats = [
  { nom: "Alliance Missionnaire Internationale (AMI)", desc: "Coopération et envoi de missionnaires à l'échelle transfrontalière.", icon: Globe },
  { nom: "World Assemblies of God Fellowship (WAGF)", desc: "Communion fraternelle mondiale unissant plus de 70 millions de fidèles.", icon: Handshake },
  { nom: "Africa Assemblies of God Alliance (AAGA)", desc: "Harmonisation pastorale et dynamique d'évangélisation continentale.", icon: Network },
  { nom: "Fédération des Églises et Missions Évangéliques (FEME)", desc: "Dialogue institutionnel, cohésion nationale et liberté religieuse.", icon: Shield },
];

export default function Structures({ initialTab }: { initialTab?: string | null }) {
  const getInitialTab = (): StructureTab => {
    if (initialTab) {
      if (initialTab === "overview") return "hierarchie";
      if (initialTab === "departements") return "structures";
      if (initialTab === "comites") return "oeuvres";
      if (["hierarchie", "bureau", "structures", "oeuvres", "partenariats"].includes(initialTab)) {
        return initialTab as StructureTab;
      }
    }
    return "hierarchie";
  };

  const [tab, setTab] = useState<StructureTab>(getInitialTab());

  useEffect(() => {
    if (initialTab) {
      if (initialTab === "overview") setTab("hierarchie");
      else if (initialTab === "departements") setTab("structures");
      else if (initialTab === "comites") setTab("oeuvres");
      else if (["hierarchie", "bureau", "structures", "oeuvres", "partenariats"].includes(initialTab)) {
        setTab(initialTab as StructureTab);
      }
    }
  }, [initialTab]);

  const tabs: { id: StructureTab; label: string; icon: React.ElementType }[] = [
    { id: "hierarchie", label: "Hiérarchie Territoriale", icon: Layers },
    { id: "bureau", label: "Bureau National (BEN)", icon: Building2 },
    { id: "structures", label: "4 Structures Majeures", icon: Users },
    { id: "oeuvres", label: "Œuvres & Ministères", icon: Church },
    { id: "partenariats", label: "Alliances & Partenariats", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* En-tête sobre et clair */}
      <div 
        className="relative overflow-hidden" 
        style={{ 
          background: "linear-gradient(135deg, #032A4E 0%, #0D67B0 100%)", 
          padding: "44px 0 36px" 
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px" }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 bg-white/10 border border-white/20 text-xs font-semibold text-amber-300">
                <Network size={13} />
                <span>Organisation & Gouvernance</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Les Structures de l'Église
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
                Vue synthétique de l'organisation territoriale, du Bureau National, des 4 grands mouvements et des œuvres spécialisées.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px 60px" }}>
        {/* Navigation Tabs - Moderne & compacte */}
        <div className="flex gap-2 p-1.5 rounded-2xl -mt-5 mb-8 overflow-x-auto shadow-md bg-white border border-slate-200 z-10 relative">
          {tabs.map(t => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? "bg-[#032A4E] text-white shadow-sm" 
                    : "text-slate-600 hover:text-[#0F78C8] hover:bg-slate-50"
                }`}
                style={{ border: "none" }}
              >
                <t.icon size={15} className={isActive ? "text-amber-400" : "text-slate-400"} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* ONGLET 1 : HIÉRARCHIE TERRITORIALE (SYNTHÉTIQUE)               */}
        {/* ------------------------------------------------------------- */}
        {tab === "hierarchie" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0F78C8] flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#032A4E]">Structuration par Circonscription</h3>
                  <p className="text-xs text-slate-500">
                    Les <strong>Centres</strong> se situent entre le <strong>Bureau National</strong> et les <strong>Régions</strong>.
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Principe de subsidiarité
              </span>
            </div>

            {/* Liste synthétique des 5 échelons */}
            <div className="space-y-3">
              {paliersHierarchiques.map((p, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <span 
                      className="w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center text-white flex-shrink-0"
                      style={{ background: p.color }}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-extrabold text-slate-900">{p.niveau}</h4>
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                          style={{ background: p.bgBadge, color: p.colorBadge }}
                        >
                          {p.sousTitre}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                        {p.role}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right flex-shrink-0 text-xs text-slate-500 border-t sm:border-t-0 pt-2 sm:pt-0">
                    <span className="font-semibold text-slate-700">{p.circonscription}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ONGLET 2 : BUREAU EXÉCUTIF NATIONAL (BEN)                     */}
        {/* ------------------------------------------------------------- */}
        {tab === "bureau" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bureauNational.map((m, idx) => {
                const isPres = idx === 0;
                return (
                  <div 
                    key={idx}
                    className={`rounded-2xl p-4 border transition-all ${
                      isPres 
                        ? "md:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#032A4E] to-[#0A5490] text-white border-blue-900 shadow-md" 
                        : "bg-white border-slate-200 shadow-sm hover:border-blue-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs ${
                            isPres ? "bg-amber-400 text-[#032A4E]" : "bg-blue-100 text-[#0F78C8]"
                          }`}
                        >
                          {m.nom.split(" ").slice(-1)[0].charAt(0)}
                        </div>
                        <div>
                          <h4 className={`text-sm font-extrabold ${isPres ? "text-white" : "text-slate-900"}`}>
                            {m.nom}
                          </h4>
                          <span className={`text-[11px] font-semibold ${isPres ? "text-amber-300" : "text-[#0F78C8]"}`}>
                            {m.role}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isPres ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {m.tag}
                      </span>
                    </div>

                    <p className={`text-xs mt-2 leading-relaxed ${isPres ? "text-blue-100" : "text-slate-600"}`}>
                      {m.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ONGLET 3 : LES 4 GRANDES STRUCTURES (SYNTHÉTIQUE)             */}
        {/* ------------------------------------------------------------- */}
        {tab === "structures" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {quatreStructures.map((s, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3.5">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white p-1.5 shadow-sm border"
                          style={{ borderColor: `${s.couleur}30` }}
                        >
                          <img 
                            src={s.logo} 
                            alt={`Logo ${s.code}`} 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black px-2 py-0.5 rounded" style={{ background: s.bgLight, color: s.couleur }}>
                              {s.code}
                            </span>
                            <span className="text-[11px] text-slate-400">{s.annee}</span>
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">
                            {s.nom}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-medium italic text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-lg border-l-3" style={{ borderColor: s.couleur }}>
                      {s.devise}
                    </div>

                    <div className="space-y-1.5 mb-3">
                      {s.missions.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle size={13} className="flex-shrink-0" style={{ color: s.couleur }} />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Public : {s.cible}</span>
                    <span className="font-semibold" style={{ color: s.couleur }}>Actif au niveau national</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ONGLET 4 : ŒUVRES & MINISTÈRES (GRILLE COMPACTE)              */}
        {/* ------------------------------------------------------------- */}
        {tab === "oeuvres" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {oeuvresNationales.map((o, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                        style={{ background: o.color }}
                      >
                        <o.icon size={18} />
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md" style={{ background: `${o.color}15`, color: o.color }}>
                        {o.sigle}
                      </span>
                    </div>

                    <h4 className="text-xs font-extrabold text-slate-900 mb-1">
                      {o.nom}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {o.role}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle size={11} />
                    <span>Département national</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ONGLET 5 : ALLIANCES & PARTENARIATS                           */}
        {/* ------------------------------------------------------------- */}
        {tab === "partenariats" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partenariats.map((p, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F78C8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <p.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#032A4E] mb-1">
                      {p.nom}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
