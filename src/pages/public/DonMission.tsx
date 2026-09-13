import { useState } from "react";
import {
  Heart, ArrowLeft, CheckCircle, ShieldCheck, Phone, CreditCard,
  Building, Smartphone, Droplets, BookOpen, Globe, HeartHandshake,
  Download, Copy, Check, Sparkles, AlertCircle
} from "lucide-react";
import heroChurchExterior from "../../imports/hero_church_exterior.jpg";

interface DonMissionProps {
  onNavigate: (page: string) => void;
  preselectedProject?: string;
}

const projets = [
  {
    id: "evangelisation",
    title: "Évangélisation & Implantation rurale",
    desc: "Déploiement des équipes missionnaires dans les 79 régions ecclésiastiques et soutien aux pasteurs pionniers.",
    icon: Globe,
    badge: "Priorité 3R",
  },
  {
    id: "eau",
    title: "Accès à l'eau potable (Forages villageois)",
    desc: "Construction de forages et puits modernes pour les populations vulnérables.",
    icon: Droplets,
    badge: "Action sociale",
  },
  {
    id: "education",
    title: "Écoles communautaires & Enfance",
    desc: "Scolarisation, cantines scolaires et équipements pour les enfants en zones rurales.",
    icon: BookOpen,
    badge: "Éducation",
  },
  {
    id: "sante",
    title: "Centres de santé & Dispensaires",
    desc: "Soins médicaux, médicaments et maternités soutenus par l'Église.",
    icon: Heart,
    badge: "Santé",
  },
  {
    id: "formation",
    title: "Formation pastorale & Instituts Bibliques",
    desc: "Bourses d'études et équipements pour la relève pastorale (IBO et écoles bibliques).",
    icon: HeartHandshake,
    badge: "Formation",
  },
  {
    id: "general",
    title: "Fonds général de la Mission",
    desc: "Affectation aux besoins les plus urgents de la mission nationale AD/BF.",
    icon: Sparkles,
    badge: "Général",
  },
];

const montants = [
  { val: 5000, label: "5 000 FCFA" },
  { val: 10000, label: "10 000 FCFA" },
  { val: 25000, label: "25 000 FCFA" },
  { val: 50000, label: "50 000 FCFA" },
  { val: 100000, label: "100 000 FCFA" },
];

export default function DonMission({ onNavigate, preselectedProject }: DonMissionProps) {
  const [selectedProjet, setSelectedProjet] = useState(preselectedProject || "evangelisation");
  const [montant, setMontant] = useState<number>(25000);
  const [customMontant, setCustomMontant] = useState<string>("");
  const [frequence, setFrequence] = useState<"unique" | "mensuel">("unique");
  const [modePaiement, setModePaiement] = useState<"orange" | "moov" | "wave" | "carte" | "virement">("orange");

  // Coordonnées donateur
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [eglise, setEglise] = useState("");
  const [intention, setIntention] = useState("");
  const [anonyme, setAnonyme] = useState(false);

  // États de validation
  const [step, setStep] = useState<"form" | "confirmation" | "succes">("form");
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");
  const [copied, setCopied] = useState(false);

  const getEffectiveMontant = () => {
    if (customMontant && parseInt(customMontant) > 0) {
      return parseInt(customMontant);
    }
    return montant;
  };

  const handleProceder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telephone && (modePaiement === "orange" || modePaiement === "moov" || modePaiement === "wave")) {
      alert("Veuillez renseigner votre numéro de téléphone pour le paiement mobile.");
      return;
    }
    setStep("confirmation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmerPaiement = () => {
    setLoading(true);
    setTimeout(() => {
      const randomCode = Math.floor(10000 + Math.random() * 90000);
      setReference(`ADBF-DON-2026-${randomCode}`);
      setLoading(false);
      setStep("succes");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1800);
  };

  const copyRef = () => {
    navigator.clipboard.writeText(reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentProjetObj = projets.find(p => p.id === selectedProjet) || projets[0];

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Header */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 50%, #0F78C8 100%)", padding: "64px 0 48px" }}>
        <div className="absolute inset-0">
          <img src={heroChurchExterior} alt="Édifice National" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(3,42,78,0.9) 0%, rgba(10,84,144,0.7) 60%, rgba(15,120,200,0.5) 100%)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => onNavigate("mission")}
            className="inline-flex items-center gap-2 text-sm font-medium mb-5 px-3 py-1.5 rounded-lg text-sky-200 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <ArrowLeft size={16} /> Retour à la Mission
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3" style={{ background: "rgba(200,151,58,0.25)", color: "#FDE047" }}>
            <Heart size={13} /> Soutien à l'Œuvre de Dieu
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Faire un don pour la Mission
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
            Votre générosité permet d'évangéliser, de forer des puits, de former les serviteurs de Dieu et de transformer des milliers de vies à travers les 79 régions ecclésiastiques du Burkina Faso.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* ÉTAPE : SUCCÈS / REÇU NUMÉRIQUE */}
        {step === "succes" && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-100 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle size={44} />
            </div>

            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 mb-3 border border-emerald-200">
              Paiement confirmé avec succès
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Que le Seigneur bénisse votre libéralité !
            </h2>

            <p className="text-slate-600 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              Votre contribution de <span className="font-bold text-slate-900">{getEffectiveMontant().toLocaleString("fr-FR")} FCFA</span> pour le projet <span className="font-semibold text-blue-800">« {currentProjetObj.title} »</span> a bien été reçue. Un reçu de confirmation a été généré et un SMS a été transmis à votre numéro.
            </p>

            {/* Reçu Numérique */}
            <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left mb-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">Reçu Numérique Officiel</div>
                  <div className="text-sm font-bold text-slate-800">Assemblées de Dieu du Burkina Faso</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-600 font-bold">Payé</div>
                  <div className="text-xs text-slate-400">{new Date().toLocaleDateString("fr-FR")}</div>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Référence transaction :</span>
                  <span className="font-mono font-bold text-slate-800 flex items-center gap-1.5">
                    {reference}
                    <button onClick={copyRef} className="text-blue-600 hover:text-blue-800" title="Copier la référence">
                      {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    </button>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Montant versé :</span>
                  <span className="font-bold text-blue-900">{getEffectiveMontant().toLocaleString("fr-FR")} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Affectation :</span>
                  <span className="font-medium text-slate-800 text-right">{currentProjetObj.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Moyen de règlement :</span>
                  <span className="font-medium text-slate-800 capitalize">{modePaiement.toUpperCase()} Money</span>
                </div>
                {!anonyme && nom && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Donateur :</span>
                    <span className="font-medium text-slate-800">{prenom} {nom}</span>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-dashed border-slate-300 text-center">
                <p className="text-[11px] text-slate-400 italic">
                  « Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte; car Dieu aime celui qui donne avec joie. » — 2 Cor 9:7
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-all"
              >
                <Download size={16} /> Imprimer l'attestation
              </button>
              <button
                onClick={() => onNavigate("mission")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-700 text-white font-semibold text-sm hover:bg-blue-800 transition-all shadow-md"
              >
                Revenir aux actualités Mission <ArrowLeft size={16} className="rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE : CONFIRMATION DU PAIEMENT */}
        {step === "confirmation" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
            <button
              onClick={() => setStep("form")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6"
            >
              <ArrowLeft size={14} /> Modifier mes informations
            </button>

            <h2 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Validation du paiement
            </h2>
            <p className="text-sm text-slate-500 mb-8">
              Veuillez vérifier le récapitulatif de votre don avant de valider l'opération.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Carte Récapitulatif */}
              <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-100">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-3">Récapitulatif du don</div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-xs text-slate-500 block">Projet soutenu :</span>
                    <span className="font-bold text-slate-900">{currentProjetObj.title}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Montant du don :</span>
                    <span className="text-2xl font-black text-blue-900">{getEffectiveMontant().toLocaleString("fr-FR")} FCFA</span>
                    <span className="text-xs text-slate-500 ml-2">({frequence === "unique" ? "Versement unique" : "Soutien mensuel"})</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Mode de paiement :</span>
                    <span className="font-semibold text-slate-800 capitalize">{modePaiement} Money</span>
                  </div>
                </div>
              </div>

              {/* Instructions de paiement mobile / carte */}
              <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-3 flex items-center gap-1.5">
                  <AlertCircle size={14} /> Procédure de validation
                </div>
                {modePaiement === "orange" && (
                  <div className="text-xs leading-relaxed text-amber-950 space-y-2">
                    <p>Un message d'autorisation va être envoyé au numéro <strong>{telephone || "+226 7X XX XX XX"}</strong>.</p>
                    <p>Composez également le code USSD : <strong>#144*4*6*Montant#</strong> pour générer votre code OTP de sécurité si demandé.</p>
                    <p className="text-slate-500 italic">Plateforme sécurisée certifiée par Orange Burkina.</p>
                  </div>
                )}
                {modePaiement === "moov" && (
                  <div className="text-xs leading-relaxed text-amber-950 space-y-2">
                    <p>Une notification Moov Money Push sera transmise au numéro <strong>{telephone || "+226 XX XX XX XX"}</strong>.</p>
                    <p>Confirmez la transaction en saisissant votre code PIN secret sur votre téléphone.</p>
                  </div>
                )}
                {modePaiement === "wave" && (
                  <div className="text-xs leading-relaxed text-amber-950 space-y-2">
                    <p>L'application Wave s'ouvrira pour confirmer le prélèvement instantané au numéro <strong>{telephone}</strong>.</p>
                  </div>
                )}
                {modePaiement === "carte" && (
                  <div className="text-xs leading-relaxed text-amber-950 space-y-2">
                    <p>Règlement sécurisé par carte bancaire internationale Visa / Mastercard avec protocole 3D-Secure.</p>
                  </div>
                )}
                {modePaiement === "virement" && (
                  <div className="text-xs leading-relaxed text-amber-950 space-y-2">
                    <p>RIB officiel AD/BF : <strong>BF054 01001 0214589001 45</strong> (Coris Bank International).</p>
                    <p>Indiquez votre nom et le motif « Mission AD » dans le libellé du virement.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="px-6 py-3 rounded-xl border border-slate-300 font-semibold text-sm text-slate-700 hover:bg-slate-50 transition-all"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleConfirmerPaiement}
                className="px-8 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #16A34A, #15803D)" }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    Traitement en cours…
                  </span>
                ) : (
                  <>
                    <ShieldCheck size={18} /> Confirmer et verser {getEffectiveMontant().toLocaleString("fr-FR")} FCFA
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE : FORMULAIRE PRINCIPAL */}
        {step === "form" && (
          <form onSubmit={handleProceder} className="space-y-8">

            {/* 1. Choix du projet */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Choisissez le projet à soutenir
                  </h2>
                  <p className="text-xs text-slate-500">Sélectionnez l'œuvre missionnaire ou sociale de votre choix</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {projets.map(p => {
                  const active = selectedProjet === p.id;
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProjet(p.id)}
                      className={`p-4 rounded-2xl text-left transition-all border-2 flex flex-col justify-between ${
                        active ? "border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20" : "border-slate-100 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                            <Icon size={18} />
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active ? "bg-blue-200 text-blue-900" : "bg-slate-100 text-slate-600"}`}>
                            {p.badge}
                          </span>
                        </div>
                        <div className="font-bold text-sm text-slate-900 mb-1 leading-snug">{p.title}</div>
                        <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                      </div>
                      {active && (
                        <div className="mt-3 pt-2 border-t border-blue-200 flex items-center gap-1 text-xs font-semibold text-blue-700">
                          <CheckCircle size={13} /> Projet sélectionné
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Montant et Fréquence */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Montant de votre contribution
                  </h2>
                  <p className="text-xs text-slate-500">Chaque don est une semence précieuse pour le Royaume</p>
                </div>
              </div>

              {/* Fréquence */}
              <div className="flex gap-3 mb-6 p-1.5 rounded-2xl bg-slate-100 w-fit">
                <button
                  type="button"
                  onClick={() => setFrequence("unique")}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    frequence === "unique" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Don ponctuel
                </button>
                <button
                  type="button"
                  onClick={() => setFrequence("mensuel")}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    frequence === "mensuel" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Soutien mensuel régulier
                </button>
              </div>

              {/* Grille de montants */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {montants.map(m => {
                  const isSelected = montant === m.val && !customMontant;
                  return (
                    <button
                      key={m.val}
                      type="button"
                      onClick={() => { setMontant(m.val); setCustomMontant(""); }}
                      className={`py-3.5 px-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-102"
                          : "border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>

              {/* Montant personnalisé */}
              <div className="relative max-w-sm">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Ou saisissez un autre montant (FCFA) :</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    value={customMontant}
                    onChange={e => setCustomMontant(e.target.value)}
                    placeholder="Ex: 75 000"
                    className="w-full rounded-xl border border-slate-300 py-2.5 pl-3.5 pr-16 text-sm font-bold text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">FCFA</span>
                </div>
              </div>
            </div>

            {/* 3. Mode de règlement */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Mode de paiement
                  </h2>
                  <p className="text-xs text-slate-500">Moyens sécurisés acceptés au Burkina Faso et à l'international</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                {[
                  { id: "orange", name: "Orange Money", sub: "Burkina Faso", color: "#FF6600", bg: "#FFF4EB" },
                  { id: "moov", name: "Moov Money", sub: "Burkina Faso", color: "#006699", bg: "#EBF5FF" },
                  { id: "wave", name: "Wave", sub: "Paiement direct", color: "#1DC7EA", bg: "#E8FAFE" },
                  { id: "carte", name: "Carte Bancaire", sub: "Visa / Mastercard", color: "#6366F1", bg: "#EEF2FF" },
                  { id: "virement", name: "Virement / RIB", sub: "Banques BF", color: "#0F78C8", bg: "#EBF6FD" },
                ].map(m => {
                  const active = modePaiement === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setModePaiement(m.id as any)}
                      className={`p-3.5 rounded-2xl text-center border-2 transition-all ${
                        active ? "border-blue-600 bg-blue-50/50 shadow-md ring-1 ring-blue-500/30" : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: m.bg }}>
                        {m.id === "carte" ? <CreditCard size={17} style={{ color: m.color }} /> : m.id === "virement" ? <Building size={17} style={{ color: m.color }} /> : <Smartphone size={17} style={{ color: m.color }} />}
                      </div>
                      <div className="text-xs font-bold text-slate-900">{m.name}</div>
                      <div className="text-[10px] text-slate-400">{m.sub}</div>
                    </button>
                  );
                })}
              </div>

              {/* Champ téléphone pour mobile money */}
              {(modePaiement === "orange" || modePaiement === "moov" || modePaiement === "wave") && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Numéro de téléphone de débit {modePaiement.toUpperCase()} *
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={telephone}
                      onChange={e => setTelephone(e.target.value)}
                      placeholder="+226 70 00 00 00"
                      className="w-full rounded-xl border border-slate-300 py-2 pl-10 pr-3 text-sm font-semibold focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Un prompt de validation vous sera envoyé sur ce numéro pour autoriser le don.
                  </p>
                </div>
              )}
            </div>

            {/* 4. Coordonnées du donateur */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Informations du donateur
                  </h2>
                  <p className="text-xs text-slate-500">Pour l'émission de votre attestation et suivi de prière</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Prénom *</label>
                  <input
                    type="text"
                    required
                    value={prenom}
                    onChange={e => setPrenom(e.target.value)}
                    placeholder="Ex: Samuel"
                    className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Nom *</label>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={e => setNom(e.target.value)}
                    placeholder="Ex: Ouédraogo"
                    className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Email pour le reçu</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Église locale ou Ville (facultatif)</label>
                  <input
                    type="text"
                    value={eglise}
                    onChange={e => setEglise(e.target.value)}
                    placeholder="Ex: Temple Shiloh, Ouagadougou"
                    className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-600 block mb-1">Mot d'accompagnement ou intention de prière (facultatif)</label>
                <textarea
                  rows={3}
                  value={intention}
                  onChange={e => setIntention(e.target.value)}
                  placeholder="Écrivez un mot d'encouragement pour les missionnaires sur le terrain…"
                  className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={anonyme}
                  onChange={e => setAnonyme(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600"
                />
                Je souhaite faire ce don de façon anonyme (le nom ne figurera pas publiquement)
              </label>
            </div>

            {/* Bouton de soumission */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500">Total de votre versement :</div>
                <div className="text-2xl font-black text-blue-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {getEffectiveMontant().toLocaleString("fr-FR")} FCFA
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">Paiement chiffré 256-bit sécurisé</div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                style={{ background: "linear-gradient(135deg, #0F78C8 0%, #0A5490 100%)" }}
              >
                Procéder au paiement <ArrowLeft size={18} className="rotate-180" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
