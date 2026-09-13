import { useState, useEffect } from "react";
import {
  GraduationCap, BookOpen, Users, Award, MapPin, Calendar, ChevronRight,
  CheckCircle, FileText, X, Send, Download, Phone, Mail, Church, Check, AlertCircle, Sparkles
} from "lucide-react";

const ecoles = [
  { id: 1, nom: "Institut Biblique de Ouagadougou (IBO)", region: "Centre", fondation: "1958", etudiants: 320, programmes: ["Théologie", "Pastorale", "Évangélisation"], statut: "Actif", diplome: "Licence en Théologie" },
  { id: 2, nom: "École Biblique de Bobo-Dioulasso", region: "Hauts-Bassins", fondation: "1974", etudiants: 185, programmes: ["Théologie", "Leadership"], statut: "Actif", diplome: "Diplôme Pastoral" },
  { id: 3, nom: "Centre de Formation Pastorale de Koudougou", region: "Centre-Ouest", fondation: "1989", etudiants: 98, programmes: ["Pastorale", "Formation continue"], statut: "Actif", diplome: "Certificat de Ministère" },
  { id: 4, nom: "École Biblique du Sahel — Dori", region: "Sahel", fondation: "2003", etudiants: 64, programmes: ["Évangélisation", "Implantation d'église"], statut: "Actif", diplome: "Brevet Missionnaire" },
  { id: 5, nom: "Institut Théologique de l'Est — Fada", region: "Est", fondation: "2011", etudiants: 72, programmes: ["Théologie", "Missions interculturelles"], statut: "Actif", diplome: "Diplôme Théologique" },
  { id: 6, nom: "Centre Biblique du Nord — Ouahigouya", region: "Nord", fondation: "2015", etudiants: 54, programmes: ["Formation de base", "Leadership"], statut: "Actif", diplome: "Certificat de Leadership" },
];

const stats = [
  { label: "Écoles bibliques", value: "18", icon: GraduationCap, color: "#0F78C8", bg: "#D9EEFA" },
  { label: "Étudiants inscrits", value: "1 240", icon: Users, color: "#16A34A", bg: "#DCFCE7" },
  { label: "Diplômés depuis 1958", value: "12 400+", icon: Award, color: "#C8973A", bg: "#FDF4E0" },
  { label: "Programmes dispensés", value: "9", icon: BookOpen, color: "#7C3AED", bg: "#EDE9FE" },
];

type EcoleTab = "liste" | "etudiants" | "programmes" | "diplomes";

export default function EcolesBibliques({ initialTab }: { initialTab?: string | null }) {
  const [tab, setTab] = useState<EcoleTab>(
    (initialTab && ["liste", "etudiants", "programmes", "diplomes"].includes(initialTab))
      ? (initialTab as EcoleTab)
      : "liste"
  );

  // État du formulaire d'admission
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dossierNum, setDossierNum] = useState("");
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    sexe: "M",
    dateNaissance: "",
    telephone: "",
    email: "",
    ville: "",
    ecoleId: "1",
    programme: "Licence en Théologie",
    session: "Rentrée Octobre 2026",
    eglise: "",
    pasteur: "",
    anneeBapteme: "",
    responsabilite: "",
    niveauEtude: "Baccalauréat",
    appelMinistere: "",
  });

  const openAdmission = (ecoleId?: number) => {
    if (ecoleId) {
      setForm(f => ({ ...f, ecoleId: ecoleId.toString() }));
    }
    setSubmitted(false);
    setModalOpen(true);
  };

  const handleSubmitAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.prenom || !form.telephone || !form.eglise) {
      alert("Veuillez renseigner les champs obligatoires (*).");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const ecoleCode = ecoles.find(ec => ec.id.toString() === form.ecoleId)?.nom.includes("IBO") ? "IBO" : "EB";
      setDossierNum(`ADM-${ecoleCode}-2026-${randomCode}`);
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  useEffect(() => {
    if (initialTab && ["liste", "etudiants", "programmes", "diplomes"].includes(initialTab)) {
      setTab(initialTab as EcoleTab);
    }
  }, [initialTab]);

  const tabs: { id: EcoleTab; label: string; icon: React.ElementType }[] = [
    { id: "liste", label: "Liste des écoles", icon: GraduationCap },
    { id: "etudiants", label: "Étudiants & Effectifs", icon: Users },
    { id: "programmes", label: "Programmes académiques", icon: BookOpen },
    { id: "diplomes", label: "Diplômes & Certifications", icon: Award },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden mb-8" style={{ background: "linear-gradient(135deg, #032A4E 0%, #0F78C8 100%)", padding: "50px 0 40px" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #C8973A 0%, transparent 60%)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(200,151,58,0.2)", border: "1px solid rgba(200,151,58,0.4)" }}>
            <GraduationCap size={14} style={{ color: "#C8973A" }} />
            <span className="text-xs font-semibold" style={{ color: "#C8973A" }}>Formation théologique</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>Les Écoles Bibliques</h1>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
            Depuis 1958, les Assemblées de Dieu du Burkina Faso forment des serviteurs de Dieu qualifiés à travers un réseau d'instituts bibliques reconnus sur tout le territoire national.
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
                color: tab === t.id ? "#0F78C8" : "#64748B",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif"
              }}
            >
              <t.icon size={15} style={{ color: tab === t.id ? "#0F78C8" : "#94A3B8" }} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: "white", boxShadow: "0 2px 12px rgba(15,120,200,0.07)", border: "1px solid #EBF6FD" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: s.bg }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tab 1: LISTE DES ECOLES */}
        {tab === "liste" && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Nos instituts et centres de formation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {ecoles.map(e => (
                <div key={e.id} className="rounded-2xl p-5 group transition-all" style={{ background: "white", boxShadow: "0 2px 12px rgba(15,120,200,0.07)", border: "1px solid #EBF6FD" }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#D9EEFA" }}>
                      <GraduationCap size={18} style={{ color: "#0F78C8" }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm leading-tight" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>{e.nom}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs flex items-center gap-1" style={{ color: "#64748B" }}><MapPin size={11} /> {e.region}</span>
                        <span className="text-xs flex items-center gap-1" style={{ color: "#64748B" }}><Calendar size={11} /> Depuis {e.fondation}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "#F1F5F9" }}>
                    <div className="flex flex-wrap gap-1.5">
                      {e.programmes.map(p => (
                        <span key={p} className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "#EBF6FD", color: "#0F78C8" }}>{p}</span>
                      ))}
                    </div>
                    <span className="text-xs font-bold ml-2 flex-shrink-0" style={{ color: "#C8973A" }}>{e.etudiants} étud.</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: ÉTUDIANTS */}
        {tab === "etudiants" && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Effectifs et répartition des étudiants</h2>
            <div className="card overflow-hidden mb-8" style={{ background: "white", borderRadius: "16px", border: "1px solid #EBF6FD" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Établissement</th>
                    <th>Région</th>
                    <th>Statut</th>
                    <th style={{ textAlign: "right" }}>Étudiants actifs</th>
                    <th style={{ textAlign: "right" }}>Diplômés prévus</th>
                  </tr>
                </thead>
                <tbody>
                  {ecoles.map(e => (
                    <tr key={e.id}>
                      <td className="font-semibold" style={{ color: "#0F78C8" }}>{e.nom}</td>
                      <td><span className="badge badge-info">{e.region}</span></td>
                      <td><span className="badge badge-success">Actif</span></td>
                      <td className="text-right font-bold" style={{ color: "#032A4E" }}>{e.etudiants}</td>
                      <td className="text-right font-bold" style={{ color: "#C8973A" }}>{Math.floor(e.etudiants * 0.32)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: PROGRAMMES */}
        {tab === "programmes" && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Programmes d'études théologiques et pastorales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {[
                { titre: "Licence en Théologie", duree: "3 ans", niveau: "Baccalauréat requis", desc: "Formation théologique complète, exégèse biblique, histoire de l'Église et apologétique.", badge: "Cycle Universitaire" },
                { titre: "Diplôme Pastoral", duree: "2 ans", niveau: "Niveau secondaire", desc: "Préparation active au ministère pastoral, prédication, éthique chrétienne et soins d'âmes.", badge: "Cycle Pastoral" },
                { titre: "Certificat en Évangélisation", duree: "1 an", niveau: "Tout niveau", desc: "Outils d'évangélisation pratique, implantation d'églises en milieux ruraux et sahéliens.", badge: "Mission & Évangélisation" },
                { titre: "Formation des Responsables Locaux", duree: "6 mois", niveau: "Membres d'église", desc: "Renforcement des capacités pour diacres, anciens et leaders de départements d'églises.", badge: "Leadership Local" },
                { titre: "Missions Transculturelles", duree: "18 mois", niveau: "Sur recommandation", desc: "Préparation spécifique aux cultures régionales, apprentissage linguistique et missions d'avant-garde.", badge: "Missions" },
                { titre: "Ministère Féminin & Famille", duree: "1 an", niveau: "Membres d'église", desc: "Leadership chrétien pour les femmes, animation de groupes familiaux et éducation chrétienne.", badge: "Ministère Spécialisé" },
              ].map((p, i) => (
                <div key={i} className="card p-5 flex flex-col justify-between" style={{ background: "white", borderRadius: "16px", border: "1px solid #EBF6FD" }}>
                  <div>
                    <span className="badge badge-gold mb-2 text-xs">{p.badge}</span>
                    <h3 className="font-bold text-base mb-1" style={{ color: "#0F78C8" }}>{p.titre}</h3>
                    <div className="text-xs text-gray-500 mb-3">Durée : {p.duree} · {p.niveau}</div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                  </div>
                  <div className="text-xs font-semibold flex items-center gap-1" style={{ color: "#16A34A" }}>
                    <CheckCircle size={13} /> Homologué AD/BF
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: DIPLÔMES */}
        {tab === "diplomes" && (
          <div>
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>Diplômes délivrés et certifications reconnues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {ecoles.map(e => (
                <div key={e.id} className="card p-5 flex items-start gap-4" style={{ background: "white", borderRadius: "16px", border: "1px solid #EBF6FD" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FDF4E0" }}>
                    <Award size={24} style={{ color: "#C8973A" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm" style={{ color: "#0F78C8" }}>{e.diplome}</h4>
                      <span className="badge badge-success text-xs">Accrédité</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Délivré par : {e.nom}</p>
                    <div className="text-xs flex items-center gap-2" style={{ color: "#64748B" }}>
                      <FileText size={12} /> Reconnaissance officielle Bureau National AD/BF
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA admission */}
        <div className="rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-xl" style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 50%, #0F78C8 100%)" }}>
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(200,151,58,0.2)", border: "1px solid rgba(200,151,58,0.4)" }}>
            <GraduationCap size={32} style={{ color: "#E8C98A" }} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>Rejoignez une école biblique</h3>
          <p className="text-sm sm:text-base mb-6 text-blue-100 max-w-xl mx-auto leading-relaxed">
            Les admissions pour l'année académique 2026–2027 sont ouvertes. Postulez en ligne dès aujourd'hui pour intégrer l'un de nos instituts de formation pastorale et théologique.
          </p>
          <button
            onClick={() => openAdmission()}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white shadow-xl hover:scale-102 transition-all cursor-pointer"
            style={{ background: "linear-gradient(135deg, #C8973A, #D9AE5F)" }}
          >
            Demander une admission en ligne <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* MODAL FORMULAIRE D'ADMISSION */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ background: "rgba(3,42,78,0.75)", backdropFilter: "blur(6px)" }}>
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-8">

            {/* Header modal */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Demande d'admission académique
                  </h3>
                  <p className="text-[11px] text-slate-400">Instituts Bibliques des Assemblées de Dieu du Burkina Faso</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer border-none"
              >
                <X size={16} />
              </button>
            </div>

            {/* Corps modal : Succès */}
            {submitted ? (
              <div className="p-8 sm:p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
                  <CheckCircle size={44} />
                </div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-3">
                  Candidature enregistrée
                </span>
                <h4 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Votre dossier a été soumis avec succès !
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                  Merci <strong>{form.prenom} {form.nom}</strong>. Votre demande d'admission pour le programme <strong>« {form.programme} »</strong> a été transmise à la commission pédagogique de l'établissement.
                </p>

                {/* Fiche récapitulatif */}
                <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left mb-6 text-xs sm:text-sm space-y-2.5">
                  <div className="flex justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500">N° de dossier :</span>
                    <span className="font-mono font-bold text-blue-900">{dossierNum}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Établissement :</span>
                    <span className="font-semibold text-slate-800">{ecoles.find(e => e.id.toString() === form.ecoleId)?.nom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Session :</span>
                    <span className="font-medium text-slate-800">{form.session}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contact candidat :</span>
                    <span className="font-medium text-slate-800">{form.telephone}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left mb-6 text-xs text-amber-950 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <AlertCircle size={14} /> Prochaines étapes :
                  </div>
                  <p>1. Une convocation pour l'entretien d'orientation vous parviendra par SMS/WhatsApp au {form.telephone}.</p>
                  <p>2. Pièces à constituer : 2 photos d'identité, lettre de recommandation pastorale, certificat de baptême et photocopies de vos diplômes.</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 font-semibold text-xs text-slate-700 hover:bg-slate-50 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <Download size={14} /> Imprimer le récépissé
                  </button>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            ) : (
              /* Formulaire d'admission */
              <form onSubmit={handleSubmitAdmission} className="p-6 sm:p-8 space-y-6">

                {/* Choix Établissement et Programme */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                    <Sparkles size={14} /> Choix de la formation
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Établissement souhaité *</label>
                      <select
                        value={form.ecoleId}
                        onChange={e => setForm(f => ({ ...f, ecoleId: e.target.value }))}
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm bg-white font-medium focus:border-blue-600 focus:outline-none"
                      >
                        {ecoles.map(ec => (
                          <option key={ec.id} value={ec.id.toString()}>{ec.nom} ({ec.region})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Programme d'études *</label>
                      <select
                        value={form.programme}
                        onChange={e => setForm(f => ({ ...f, programme: e.target.value }))}
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm bg-white font-medium focus:border-blue-600 focus:outline-none"
                      >
                        <option>Licence en Théologie (Cycle Universitaire - 3 ans)</option>
                        <option>Diplôme Pastoral (Cycle Pastoral - 2 ans)</option>
                        <option>Certificat en Évangélisation (Mission - 1 an)</option>
                        <option>Formation des Responsables Locaux (6 mois)</option>
                        <option>Missions Transculturelles (18 mois)</option>
                        <option>Ministère Féminin & Famille (1 an)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Session d'intégration</label>
                    <div className="flex gap-3">
                      {["Rentrée Octobre 2026", "Rentrée Février 2027"].map(sess => (
                        <label key={sess} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name="session"
                            checked={form.session === sess}
                            onChange={() => setForm(f => ({ ...f, session: sess }))}
                            className="text-blue-600"
                          />
                          {sess}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Informations candidat */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    État civil & Contact du candidat
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-600 block mb-1">Prénom(s) *</label>
                      <input
                        type="text"
                        required
                        value={form.prenom}
                        onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
                        placeholder="Ex: Jean-Marc"
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 block mb-1">Nom de famille *</label>
                      <input
                        type="text"
                        required
                        value={form.nom}
                        onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                        placeholder="Ex: Compaoré"
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-slate-600 block mb-1">Sexe</label>
                      <select
                        value={form.sexe}
                        onChange={e => setForm(f => ({ ...f, sexe: e.target.value }))}
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm bg-white focus:border-blue-600 focus:outline-none"
                      >
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 block mb-1">Téléphone WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={form.telephone}
                        onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))}
                        placeholder="+226 70 XX XX XX"
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 block mb-1">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="candidat@email.com"
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Profil ecclésial */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Parcours ecclésial & Recommandation
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-600 block mb-1">Église locale d'appartenance *</label>
                      <input
                        type="text"
                        required
                        value={form.eglise}
                        onChange={e => setForm(f => ({ ...f, eglise: e.target.value }))}
                        placeholder="Ex: Assemblée de Dieu Temple de Paspanga"
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 block mb-1">Nom du Pasteur titulaire *</label>
                      <input
                        type="text"
                        required
                        value={form.pasteur}
                        onChange={e => setForm(f => ({ ...f, pasteur: e.target.value }))}
                        placeholder="Ex: Pasteur Pierre Sawadogo"
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-slate-600 block mb-1">Année de baptême</label>
                      <input
                        type="number"
                        placeholder="Ex: 2018"
                        value={form.anneeBapteme}
                        onChange={e => setForm(f => ({ ...f, anneeBapteme: e.target.value }))}
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 block mb-1">Niveau académique</label>
                      <select
                        value={form.niveauEtude}
                        onChange={e => setForm(f => ({ ...f, niveauEtude: e.target.value }))}
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm bg-white focus:border-blue-600 focus:outline-none"
                      >
                        <option>Baccalauréat</option>
                        <option>Secondaire (BEPC / 1ère)</option>
                        <option>Licence / Bac+3</option>
                        <option>Master / Bac+5</option>
                        <option>Autre diplôme</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 block mb-1">Rôle actuel à l'église</label>
                      <input
                        type="text"
                        value={form.responsabilite}
                        onChange={e => setForm(f => ({ ...f, responsabilite: e.target.value }))}
                        placeholder="Ex: Responsable jeunesse"
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-600 block mb-1">Motivation & Appel au ministère (facultatif)</label>
                    <textarea
                      rows={2}
                      value={form.appelMinistere}
                      onChange={e => setForm(f => ({ ...f, appelMinistere: e.target.value }))}
                      placeholder="Décrivez brièvement ce qui motive votre désir de vous former au service du Seigneur…"
                      className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs sm:text-sm focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Footer modal soumission */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400">
                    * Champs obligatoires pour l'instruction du dossier.
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                          Envoi du dossier…
                        </>
                      ) : (
                        <>
                          <Send size={13} /> Soumettre la candidature
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
