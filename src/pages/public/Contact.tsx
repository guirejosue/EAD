import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Building2 } from "lucide-react";
import heroChurchExterior from "../../imports/hero_church_exterior.jpg";

const bureaux = [
  {
    title: "Bureau National",
    address: "Avenue de la Nation, Secteur 15, Ouagadougou",
    phone: "+226 25 30 XX XX",
    email: "contact@adbf.bf",
    hours: "Lun–Ven : 08h–17h",
    type: "national",
  },
  {
    title: "Institut Biblique",
    address: "Rue des Missions, Ouagadougou",
    phone: "+226 25 31 XX XX",
    email: "ibo@adbf.bf",
    hours: "Lun–Sam : 07h30–17h30",
    type: "formation",
  },
  {
    title: "Région Centre",
    address: "Secteur 4, Ouagadougou",
    phone: "+226 70 XX XX XX",
    email: "centre@adbf.bf",
    hours: "Lun–Ven : 08h–16h30",
    type: "region",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 60%, #0F78C8 100%)", padding: "72px 0 56px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#E8C98A" }}>Contactez-nous</div>
          <h1 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>Nous sommes là pour vous</h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#CBD5E1" }}>Pour toute question, demande d'information ou prise de contact avec le Bureau National des Assemblées de Dieu du Burkina Faso.</p>
        </div>
      </section>

      <section className="py-16" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <div className="card p-8" style={{ borderRadius: "20px" }}>
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#DCFCE7" }}>
                    <CheckCircle size={30} style={{ color: "#16A34A" }} />
                  </div>
                  <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Message envoyé !</h2>
                  <p className="text-sm text-gray-500 mb-6">Votre message a été transmis au Bureau National. Nous vous répondrons dans les meilleurs délais.</p>
                  <button onClick={() => { setSent(false); setForm({ nom: "", email: "", sujet: "", message: "" }); }} className="btn-secondary">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="section-title text-xl mb-6">Envoyer un message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">Nom complet *</label>
                        <input
                          value={form.nom}
                          onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                          placeholder="Votre nom"
                          className="form-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label">Adresse email *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="votre@email.com"
                          className="form-input"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Sujet</label>
                      <select
                        value={form.sujet}
                        onChange={e => setForm(f => ({ ...f, sujet: e.target.value }))}
                        className="form-input"
                      >
                        <option value="">Sélectionnez un sujet…</option>
                        <option>Demande d'information générale</option>
                        <option>Inscription à une formation</option>
                        <option>Partenariat et mission</option>
                        <option>Bibliothèque numérique</option>
                        <option>Prise de contact — Bureau régional</option>
                        <option>Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Écrivez votre message ici…"
                        rows={5}
                        className="form-input"
                        style={{ resize: "vertical" }}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center"
                      style={{ opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? "Envoi en cours…" : <><Send size={15} /> Envoyer le message</>}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Infos */}
            <div className="space-y-6">
              {bureaux.map(b => (
                <div key={b.title} className="card p-6" style={{ borderRadius: "16px" }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#D9EEFA" }}>
                      <Building2 size={18} style={{ color: "#0F78C8" }} />
                    </div>
                    <h3 className="font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{b.title}</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 text-gray-600">
                      <MapPin size={15} style={{ color: "#C8973A", flexShrink: 0, marginTop: 2 }} />
                      <span>{b.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone size={15} style={{ color: "#C8973A", flexShrink: 0 }} />
                      <span>{b.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail size={15} style={{ color: "#C8973A", flexShrink: 0 }} />
                      <span>{b.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock size={15} style={{ color: "#C8973A", flexShrink: 0 }} />
                      <span>{b.hours}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bureau National — Ouagadougou avec Image de l'Édifice en fond */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-lg border border-blue-200"
                style={{ minHeight: 240 }}
              >
                <img
                  src={heroChurchExterior}
                  alt="Édifice du Bureau National — Ouagadougou"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(3,42,78,0.95) 0%, rgba(3,42,78,0.75) 50%, rgba(10,84,144,0.4) 100%)",
                  }}
                />
                <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white" style={{ minHeight: 240 }}>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 w-fit" style={{ background: "rgba(200,151,58,0.9)", color: "white" }}>
                    <Building2 size={12} /> Siège National
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Bureau National — Ouagadougou
                  </h4>
                  <p className="text-xs text-blue-100 mb-3 flex items-center gap-1.5">
                    <MapPin size={13} style={{ color: "#E8C98A", flexShrink: 0 }} /> Avenue de la Nation, Secteur 15 · Ouagadougou
                  </p>
                  <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-blue-200">
                    <span>Horaires : Lun–Ven · 08h–17h</span>
                    <span className="font-semibold text-amber-300">Accueil du public</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
