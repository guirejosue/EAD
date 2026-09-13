import { useState } from "react";
import { Lock, Clock, Users, ArrowRight, ClipboardList, ShieldCheck, AlertCircle, CheckCircle, Eye, EyeOff, ArrowLeft } from "lucide-react";

const sondages = [
  {
    id: 1,
    titre: "Votre participation à la vie de l'église",
    desc: "Ce sondage nous aide à mieux comprendre la situation de nos membres et à améliorer l'accompagnement pastoral.",
    cloture: "30 septembre 2026",
    participants: 1234,
    status: "actif",
    options: ["Chaque semaine", "Deux à trois fois par mois", "Une fois par mois", "Rarement", "Je ne participe plus"],
    cover: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: 2,
    titre: "Vision 3R — votre niveau de connaissance",
    desc: "Mesurez votre connaissance de la Vision 3R (Réveil, Réforme, Rayonnement) et aidez-nous à adapter notre communication.",
    cloture: "15 octobre 2026",
    participants: 847,
    status: "actif",
    options: ["Je la connais très bien", "Je la connais partiellement", "J'en ai entendu parler", "Je ne la connais pas"],
    cover: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: 3,
    titre: "Évaluation des services de formation disponibles",
    desc: "Dites-nous quels types de formations vous intéressent le plus pour améliorer notre offre à travers le Burkina Faso.",
    cloture: "31 août 2026",
    participants: 2108,
    status: "cloture",
    options: ["Formation théologique", "Leadership", "Finances d'église", "Évangélisation", "Musique et adoration"],
    cover: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop&auto=format",
  },
];

type View = "list" | "auth" | "survey";

export default function PublicSondages({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [view, setView] = useState<View>("list");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [numeroMembre, setNumeroMembre] = useState("");
  const [dateConversion, setDateConversion] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const currentSondage = sondages.find(s => s.id === selectedId) ?? null;

  const openAuth = (id: number) => {
    setSelectedId(id);
    setNumeroMembre("");
    setDateConversion("");
    setAuthError("");
    setSelectedOption(null);
    setSubmitted(false);
    setView("auth");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numeroMembre || !dateConversion) {
      setAuthError("Veuillez remplir les deux champs.");
      return;
    }
    setAuthError("");
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      if (numeroMembre.replace(/\D/g, "").length >= 4) {
        setView("survey");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setAuthError("Numéro de membre ou date de conversion incorrects. Vérifiez vos informations.");
      }
    }, 1200);
  };

  const handleSubmitVote = () => {
    if (selectedOption == null) return;
    setSubmitted(true);
  };

  /* ── LISTE ── */
  if (view === "list") return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 60%, #0F78C8 100%)", padding: "72px 0 56px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#E8C98A" }}>Participation membres</div>
          <h1 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>Sondages AD/BF</h1>
          <p className="text-base max-w-xl mx-auto mb-8" style={{ color: "#CBD5E1" }}>
            Votre avis compte. Les sondages sont réservés aux membres disposant d'un numéro de membre AD/BF.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{ background: "rgba(200,151,58,0.2)", border: "1px solid rgba(200,151,58,0.4)", color: "#E8C98A" }}>
            <ShieldCheck size={15} /> Accès par numéro de membre + date de conversion
          </div>
        </div>
      </section>

      <section className="py-14" style={{ background: "#F8F9FC" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center gap-4" style={{ background: "white", border: "2px solid #D9EEFA", boxShadow: "0 2px 12px rgba(15,120,200,0.08)" }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#D9EEFA" }}>
              <Lock size={20} style={{ color: "#0F78C8" }} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-sm mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Accès membres uniquement</h3>
              <p className="text-sm text-gray-500">Cliquez sur un sondage pour vous identifier avec votre <strong>numéro de membre</strong> et votre <strong>date de conversion</strong>.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sondages.map(s => (
              <div key={s.id} className="card overflow-hidden" style={{ borderRadius: "16px" }}>
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <img src={s.cover} alt={s.titre} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(3,42,78,0.65) 100%)" }} />
                  <div className="absolute top-3 left-3">
                    {s.status === "actif"
                      ? <span className="badge badge-success" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.25)" }}>Actif</span>
                      : <span className="badge badge-warning" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.25)" }}>Clôturé</span>}
                  </div>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)" }}>
                    <Lock size={13} style={{ color: "white" }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="font-bold text-sm text-white leading-snug" style={{ fontFamily: "'Manrope', sans-serif", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{s.titre}</h2>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{s.desc}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-5 flex-wrap">
                    <span className="flex items-center gap-1"><Users size={11} /> {s.participants.toLocaleString("fr-FR")} participants</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> Clôture le {s.cloture}</span>
                    <span className="flex items-center gap-1"><ClipboardList size={11} /> {s.options.length} choix</span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden" style={{ border: "1px solid #D9EEFA" }}>
                    <div className="p-3 space-y-2 pointer-events-none select-none" style={{ filter: "blur(3px)", opacity: 0.3 }}>
                      {s.options.slice(0, 3).map((_, i) => (
                        <div key={i} className="rounded-lg" style={{ background: "#F1F5F9", height: 38 }} />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ background: "rgba(248,249,252,0.8)", backdropFilter: "blur(1px)" }}>
                      {s.status === "cloture"
                        ? <p className="text-xs font-semibold text-gray-400 text-center px-4">Ce sondage est clôturé.</p>
                        : (
                          <button onClick={() => openAuth(s.id)} className="btn-primary text-xs" style={{ padding: "8px 20px" }}>
                            <Lock size={12} /> Participer au sondage
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">
            Vous n'avez pas encore d'identifiant membre ? Contactez votre responsable d'église ou de district.
          </p>
        </div>
      </section>
    </div>
  );

  /* ── IDENTIFICATION MEMBRE ── */
  if (view === "auth" && currentSondage) return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 60%, #0F78C8 100%)", padding: "56px 0 40px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button onClick={() => setView("list")} className="flex items-center gap-2 text-sm font-medium mb-6" style={{ color: "#93C5FD", background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft size={15} /> Retour aux sondages
          </button>
          <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#E8C98A" }}>Identification requise</div>
          <h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>Vérification de votre identité membre</h1>
        </div>
      </section>

      <section className="py-14" style={{ background: "#F8F9FC" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Sondage ciblé */}
          <div className="card overflow-hidden mb-8" style={{ borderRadius: "16px" }}>
            <div className="relative overflow-hidden" style={{ height: 160 }}>
              <img src={currentSondage.cover} alt={currentSondage.titre} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 20%, rgba(3,42,78,0.75) 100%)" }} />
              <div className="absolute bottom-4 left-5 right-5">
                <span className="badge badge-success mb-2 inline-block">Actif</span>
                <h2 className="font-bold text-white text-base leading-snug" style={{ fontFamily: "'Manrope', sans-serif" }}>{currentSondage.titre}</h2>
              </div>
            </div>
            <div className="px-5 py-4 flex items-center gap-4 text-xs text-gray-400" style={{ background: "#FAFBFF", borderTop: "1px solid #F1F5F9" }}>
              <span className="flex items-center gap-1"><Users size={11} /> {currentSondage.participants.toLocaleString("fr-FR")} participants</span>
              <span className="flex items-center gap-1"><Clock size={11} /> Clôture le {currentSondage.cloture}</span>
            </div>
          </div>

          {/* Formulaire */}
          <div className="card p-8" style={{ borderRadius: "20px" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#D9EEFA" }}>
                <ShieldCheck size={20} style={{ color: "#0F78C8" }} />
              </div>
              <div>
                <h3 className="font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Identifiez-vous pour participer</h3>
                <p className="text-xs text-gray-400">Ces informations restent confidentielles et ne sont pas stockées.</p>
              </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              {authError && (
                <div className="flex items-start gap-2 p-3 rounded-xl text-sm" style={{ background: "#FEE2E2", color: "#B91C1C", border: "1px solid #FCA5A5" }}>
                  <AlertCircle size={15} className="flex-shrink-0 mt-0.5" /> {authError}
                </div>
              )}

              <div>
                <label className="form-label">Numéro de membre AD/BF *</label>
                <input
                  type="text"
                  value={numeroMembre}
                  onChange={e => setNumeroMembre(e.target.value)}
                  placeholder="Ex : ADBF-2024-00847"
                  className="form-input"
                  style={{ fontFamily: "monospace", letterSpacing: "0.06em" }}
                />
                <p className="text-xs text-gray-400 mt-1.5">Votre numéro figure sur votre carte de membre ou votre fiche d'inscription à l'église.</p>
              </div>

              <div>
                <label className="form-label">Date de conversion *</label>
                <div className="relative">
                  <input
                    type={showDate ? "text" : "date"}
                    value={dateConversion}
                    onChange={e => setDateConversion(e.target.value)}
                    placeholder="JJ/MM/AAAA"
                    className="form-input"
                    style={{ paddingRight: "44px" }}
                  />
                  <button type="button" onClick={() => setShowDate(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
                    {showDate ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">La date à laquelle vous avez accepté Jésus-Christ comme Seigneur et Sauveur.</p>
              </div>

              <button type="submit" disabled={authLoading} className="btn-primary w-full justify-center" style={{ padding: "12px", opacity: authLoading ? 0.7 : 1 }}>
                {authLoading ? "Vérification en cours…" : <><ShieldCheck size={16} /> Accéder au sondage <ArrowRight size={15} /></>}
              </button>
            </form>

            <div className="mt-6 p-4 rounded-xl text-xs text-gray-500 flex items-start gap-2" style={{ background: "#F8F9FC", border: "1px solid #E8EDF8" }}>
              <Lock size={13} style={{ color: "#94A3B8", flexShrink: 0, marginTop: 1 }} />
              Vos informations sont utilisées uniquement pour vérifier votre appartenance à l'église. Aucune donnée personnelle n'est conservée après la vérification.
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  /* ── SONDAGE DÉVERROUILLÉ ── */
  if (view === "survey" && currentSondage) return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 60%, #0F78C8 100%)", padding: "56px 0 40px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button onClick={() => setView("list")} className="flex items-center gap-2 text-sm font-medium mb-6" style={{ color: "#93C5FD", background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft size={15} /> Retour aux sondages
          </button>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(200,151,58,0.25)", color: "#E8C98A", border: "1px solid rgba(200,151,58,0.4)" }}>
              ✓ Membre vérifié
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>{currentSondage.titre}</h1>
        </div>
      </section>

      <section className="py-14" style={{ background: "#F8F9FC" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl mb-8" style={{ height: 220 }}>
            <img src={currentSondage.cover} alt={currentSondage.titre} className="w-full h-full object-cover" />
          </div>

          <div className="card p-8" style={{ borderRadius: "20px" }}>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "#DCFCE7" }}>
                  <CheckCircle size={32} style={{ color: "#16A34A" }} />
                </div>
                <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Merci pour votre participation !</h2>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">Votre réponse a été enregistrée anonymement. Elle contribue directement à orienter les décisions du Bureau National des Assemblées de Dieu du Burkina Faso.</p>
                <button onClick={() => { setView("list"); setSubmitted(false); }} className="btn-primary">
                  Retour aux sondages
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-6 flex-wrap">
                  <span className="flex items-center gap-1"><Users size={12} /> {currentSondage.participants.toLocaleString("fr-FR")} participants</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> Clôture le {currentSondage.cloture}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{currentSondage.desc}</p>
                <h3 className="font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Choisissez votre réponse :</h3>
                <div className="space-y-3 mb-7">
                  {currentSondage.options.map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedOption(i)}
                      className="w-full text-left px-5 py-4 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: selectedOption === i ? "rgba(15,120,200,0.08)" : "white",
                        color: selectedOption === i ? "#0F78C8" : "#374151",
                        border: `2px solid ${selectedOption === i ? "#0F78C8" : "#E8EDF8"}`,
                        cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      <span className="flex items-center gap-4">
                        <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: selectedOption === i ? "#0F78C8" : "#CBD5E1" }}>
                          {selectedOption === i && <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#0F78C8" }} />}
                        </span>
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleSubmitVote}
                  disabled={selectedOption == null}
                  className="btn-primary w-full justify-center"
                  style={{ padding: "13px", opacity: selectedOption == null ? 0.4 : 1 }}
                >
                  Soumettre ma réponse
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">Votre réponse est anonyme et définitive.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );

  return null;
}
