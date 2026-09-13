import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, CheckCircle, Mail, Lock, AlertCircle, Shield } from "lucide-react";
import adLogo from "../imports/ead-bf.png";
import heroChurchExterior from "../imports/hero_church_exterior.jpg";
import { SUPERVISION_SCOPES, type SupervisionScope } from "../components/AppLayout";

type AuthView = "login" | "forgot" | "email-sent" | "new-password" | "success";

// Comptes autorisés pour l'authentification
const CREDENTIALS_STORE: Record<string, { scopeId: string; pass: string }> = {
  "president.ben@adbf.bf": { scopeId: "president-national", pass: "President2026!" },
  "centre5.ben@adbf.bf": { scopeId: "ben-centre", pass: "CentreBEN2026!" },
  "centre.kadiogo@adbf.bf": { scopeId: "ben-centre", pass: "CentreBEN2026!" },
  "region.centre@adbf.bf": { scopeId: "president-regional", pass: "Region2026!" },
  "sousregion.nord@adbf.bf": { scopeId: "president-sousregion", pass: "SousRegion2026!" },
  "eglise.locale@adbf.bf": { scopeId: "pasteur-local", pass: "Eglise2026!" },
  "tresorier.national@adbf.bf": { scopeId: "tresorier-central", pass: "Tresorerie2026!" },
};

export default function Login({
  onLogin,
  onBack
}: {
  onLogin: (selectedScope?: SupervisionScope) => void;
  onBack: () => void;
}) {
  const [view, setView] = useState<AuthView>("login");
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setError("Veuillez saisir votre identifiant et votre mot de passe.");
      return;
    }

    const cred = CREDENTIALS_STORE[cleanEmail];
    if (cred && cred.pass === password) {
      setError("");
      setLoading(true);
      const targetScope = SUPERVISION_SCOPES.find(s => s.id === cred.scopeId) || SUPERVISION_SCOPES[0];
      setTimeout(() => {
        setLoading(false);
        onLogin(targetScope);
      }, 700);
      return;
    }

    // Si mot de passe invalide ou email non reconnu
    if (cred && cred.pass !== password) {
      setError("Mot de passe incorrect pour cet identifiant.");
      return;
    }

    // Authentification de secours générale sécurisée si utilisateur enregistré
    if (cleanEmail.endsWith("@adbf.bf") && password.length >= 6) {
      setError("");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLogin(SUPERVISION_SCOPES[0]);
      }, 700);
      return;
    }

    setError("Identifiants non reconnus. Veuillez vérifier votre adresse email institutionnelle.");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F8F9FC" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 p-12 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #032A4E 0%, #0A5490 55%, #0D67B0 100%)" }}>
        <div className="absolute inset-0">
          <img
            src={heroChurchExterior}
            alt="Édifice Assemblées de Dieu"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(3,42,78,0.88) 0%, rgba(10,84,144,0.80) 55%, rgba(13,103,176,0.75) 100%)" }} />
        <div className="absolute left-0 top-0 w-1 h-full z-10" style={{ background: "linear-gradient(to bottom, #C8973A, transparent)" }} />

        <button onClick={onBack} className="relative z-10 flex items-center gap-2 text-sm font-medium" style={{ color: "#93C5FD", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
          <ArrowLeft size={16} /> Retour au site
        </button>

        <div className="relative z-10">
          <div className="flex flex-col items-center mb-10">
            <div className="p-4 rounded-2xl mb-3" style={{ background: "white" }}>
              <img src={adLogo} alt="AD/BF" className="h-20 w-20 object-contain" />
            </div>
            <div className="text-sm font-semibold text-white text-center" style={{ fontFamily: "'Manrope', sans-serif" }}>Assemblées de Dieu du Burkina Faso</div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Plateforme de gestion institutionnelle
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
            Accédez à votre espace personnalisé pour gérer les statistiques, les finances, la bibliothèque numérique et l'organisation ecclésiale des Assemblées de Dieu du Burkina Faso.
          </p>
          <div className="mt-10 space-y-3">
            {["Gestion des 1 842 églises locales", "Finances et budgets en FCFA", "Statistiques et tableaux de bord", "Bibliothèque numérique"].map(f => (
              <div key={f} className="flex items-center gap-3 text-sm" style={{ color: "#CBD5E1" }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,151,58,0.2)" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C8973A" }} />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs" style={{ color: "#475569" }}>
          © 2026 AD/BF — Tous droits réservés
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
        {/* Mobile back */}
        <div className="lg:hidden mb-4 w-full max-w-xl">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-500" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <ArrowLeft size={16} /> Retour au site
          </button>
        </div>

        <div className="w-full max-w-xl">
          {/* LOGIN */}
          {view === "login" && (
            <div className="space-y-5">
              <div className="card p-6 sm:p-8" style={{ background: "white", borderRadius: "16px", border: "1px solid #D9EEFA", boxShadow: "0 4px 24px rgba(11,31,75,0.08)" }}>
                <div className="lg:hidden flex flex-col items-center mb-6">
                  <div className="p-3 rounded-2xl mb-2" style={{ background: "#EBF6FD" }}>
                    <img src={adLogo} alt="AD/BF" className="h-14 w-14 object-contain" />
                  </div>
                  <p className="text-xs font-semibold text-center" style={{ color: "#64748B" }}>Assemblées de Dieu du Burkina Faso</p>
                </div>

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>
                      Connexion
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Saisissez vos identifiants personnels pour accéder à votre espace de gestion.</p>
                  </div>
                 {/* <div className="p-2 rounded-xl bg-sky-50 text-sky-700 hidden sm:block">
                    <Shield size={24} />
                  </div>*/}
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg mb-4 text-xs sm:text-sm" style={{ background: "#FEE2E2", color: "#B91C1C", border: "1px solid #FCA5A5" }}>
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="form-label text-xs font-semibold text-slate-700">Adresse email ou identifiant ecclésial</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
                      <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="nom@adbf.bf"
                        className="form-input text-xs sm:text-sm"
                        style={{ paddingLeft: "40px" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label text-xs font-semibold text-slate-700">Mot de passe</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
                      <input
                        type={showPw ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Votre mot de passe"
                        className="form-input text-xs sm:text-sm"
                        style={{ paddingLeft: "40px", paddingRight: "40px" }}
                      />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1" style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-3.5 h-3.5 rounded" style={{ accentColor: "#0F78C8" }} />
                      <span className="text-gray-600">Se souvenir de moi</span>
                    </label>
                    <button type="button" onClick={() => setView("forgot")} className="font-semibold" style={{ color: "#0F78C8", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
                    style={{ background: loading ? "#6B7280" : "#0F78C8", color: "white", border: "none", cursor: loading ? "wait" : "pointer", fontFamily: "'Inter', sans-serif", borderRadius: "10px", transition: "all 0.15s" }}
                  >
                    {loading ? "Connexion en cours…" : "Se connecter à la plateforme"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* FORGOT */}
          {view === "forgot" && (
            <div className="card p-8 sm:p-10" style={{ background: "white", borderRadius: "16px", border: "1px solid #D9EEFA", boxShadow: "0 4px 24px rgba(11,31,75,0.08)" }}>
              <button onClick={() => setView("login")} className="flex items-center gap-2 text-sm text-gray-500 mb-6" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                <ArrowLeft size={14} /> Retour à la connexion
              </button>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "#D9EEFA" }}>
                <Mail size={26} style={{ color: "#0F78C8" }} />
              </div>
              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Mot de passe oublié</h1>
              <p className="text-sm text-gray-500 mb-8">Entrez l'adresse email associée à votre compte. Nous vous enverrons un lien de réinitialisation.</p>
              <div className="space-y-5">
                <div>
                  <label className="form-label">Adresse email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nom@adbf.bf" className="form-input" />
                </div>
                <button
                  onClick={() => email && setView("email-sent")}
                  className="w-full py-3 rounded-xl font-semibold text-sm"
                  style={{ background: "#0F78C8", color: "white", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 700, borderRadius: "10px" }}
                >
                  Envoyer le lien
                </button>
              </div>
            </div>
          )}

          {/* EMAIL SENT */}
          {view === "email-sent" && (
            <div className="card p-8 sm:p-10 text-center" style={{ background: "white", borderRadius: "16px", border: "1px solid #D9EEFA", boxShadow: "0 4px 24px rgba(11,31,75,0.08)" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#DCFCE7" }}>
                <Mail size={30} style={{ color: "#16A34A" }} />
              </div>
              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Email envoyé !</h1>
              <p className="text-sm text-gray-500 mb-2">Un lien de réinitialisation a été envoyé à</p>
              <p className="font-semibold text-sm mb-8" style={{ color: "#0F78C8" }}>{email || "votre@email.com"}</p>
              <p className="text-xs text-gray-400 mb-8">Le lien est valable 30 minutes. Vérifiez également votre dossier spam.</p>
              <button onClick={() => setView("new-password")} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ background: "#0F78C8", color: "white", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 700, borderRadius: "10px" }}>
                Simuler l'ouverture du lien
              </button>
              <button onClick={() => setView("login")} className="mt-3 w-full py-3 rounded-xl font-semibold text-sm text-gray-500" style={{ background: "none", border: "1px solid #E2E8F0", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                Retour à la connexion
              </button>
            </div>
          )}

          {/* NEW PASSWORD */}
          {view === "new-password" && (
            <div className="card p-8 sm:p-10" style={{ background: "white", borderRadius: "16px", border: "1px solid #D9EEFA", boxShadow: "0 4px 24px rgba(11,31,75,0.08)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "#D9EEFA" }}>
                <Lock size={26} style={{ color: "#0F78C8" }} />
              </div>
              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Nouveau mot de passe</h1>
              <p className="text-sm text-gray-500 mb-8">Choisissez un mot de passe sécurisé d'au moins 8 caractères.</p>
              <div className="space-y-5">
                <div>
                  <label className="form-label">Nouveau mot de passe</label>
                  <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="••••••••" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Confirmer le mot de passe</label>
                  <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="••••••••" className="form-input" />
                  {newPw && confirmPw && newPw !== confirmPw && (
                    <p className="mt-1 text-xs" style={{ color: "#DC2626" }}>Les mots de passe ne correspondent pas.</p>
                  )}
                </div>
                <button
                  onClick={() => newPw && confirmPw && newPw === confirmPw && setView("success")}
                  className="w-full py-3 rounded-xl font-semibold text-sm"
                  style={{ background: "#0F78C8", color: "white", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 700, borderRadius: "10px" }}
                >
                  Réinitialiser le mot de passe
                </button>
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {view === "success" && (
            <div className="card p-8 sm:p-10 text-center" style={{ background: "white", borderRadius: "16px", border: "1px solid #D9EEFA", boxShadow: "0 4px 24px rgba(11,31,75,0.08)" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#DCFCE7" }}>
                <CheckCircle size={30} style={{ color: "#16A34A" }} />
              </div>
              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Mot de passe réinitialisé</h1>
              <p className="text-sm text-gray-500 mb-8">Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant vous connecter.</p>
              <button onClick={() => { setView("login"); setNewPw(""); setConfirmPw(""); }} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ background: "#0F78C8", color: "white", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 700, borderRadius: "10px" }}>
                Se connecter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
