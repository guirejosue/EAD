import { useState } from "react";
import { MapPin, Calendar, Clock, ChevronRight, ArrowLeft, User, Mail, Phone, Users, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";

const events = [
  { id: 1, date: "15", month: "Sep", year: "2026", title: "Conférence des Jeunes AG — Bobo-Dioulasso", location: "Bobo-Dioulasso, Hauts-Bassins", type: "Conférence", desc: "Trois jours de jeûne, d'adoration et d'enseignement pour les jeunes de 15 à 35 ans. Thème : « Debout pour cette génération ».", heure: "08h00", img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=380&fit=crop&auto=format", places: 500, inscriptions: 347, payant: false, tarif: 0 },
  { id: 2, date: "22", month: "Sep", year: "2026", title: "Séminaire de leadership pastoral — Région Centre", location: "Ouagadougou, Centre", type: "Séminaire", desc: "Formation intensive d'une journée sur la gestion d'église, la gouvernance et la Vision 3R. Réservé aux pasteurs titulaires.", heure: "09h00", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=380&fit=crop&auto=format", places: 120, inscriptions: 98, payant: false, tarif: 0 },
  { id: 3, date: "08", month: "Oct", year: "2026", title: "Assemblée Générale du Bureau National", location: "Ouagadougou, Centre", type: "Assemblée", desc: "Session plénière annuelle du Bureau National. Présentation du bilan 2026, vote du budget 2027, élection des commissions.", heure: "08h30", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=380&fit=crop&auto=format", places: 200, inscriptions: 164, payant: false, tarif: 0 },
  { id: 4, date: "20", month: "Oct", year: "2026", title: "Convention Nationale de la Femme Chrétienne", location: "Koudougou, Centre-Ouest", type: "Convention", desc: "Rassemblement annuel du ministère femme avec enseignements, témoignages et moments de prière. Thème : « La femme, lumière dans la cité ».", heure: "07h30", img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=380&fit=crop&auto=format", places: 800, inscriptions: 512, payant: true, tarif: 5000 },
  { id: 5, date: "05", month: "Nov", year: "2026", title: "Campagne d'évangélisation — Province du Yatenga", location: "Ouahigouya, Nord", type: "Évangélisation", desc: "Grande campagne d'évangélisation en plein air avec plusieurs équipes déployées dans les villages et villes de la province.", heure: "16h00", img: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=380&fit=crop&auto=format", places: 1000, inscriptions: 234, payant: false, tarif: 0 },
  { id: 6, date: "15", month: "Nov", year: "2026", title: "Institut Biblique — Journée portes ouvertes", location: "Ouagadougou, Centre", type: "Formation", desc: "Découvrez les programmes de formation théologique de l'Institut Biblique de Ouagadougou : Bachelor en théologie, diplômes courts, formation continue.", heure: "09h00", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=380&fit=crop&auto=format", places: 150, inscriptions: 89, payant: false, tarif: 0 },
  { id: 7, date: "06", month: "Déc", year: "2026", title: "Journée nationale de prière et de jeûne", location: "Toutes les régions", type: "Prière", desc: "Journée de prière intercessive pour le Burkina Faso, l'église et la Vision 3R. Toutes les assemblées locales participent simultanément.", heure: "06h00", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=380&fit=crop&auto=format", places: 0, inscriptions: 0, payant: false, tarif: 0 },
  { id: 8, date: "27", month: "Déc", year: "2026", title: "Célébration de Noël — Concert national", location: "Ouagadougou, Centre", type: "Culte", desc: "Grand concert de Noël réunissant les chorales des 79 régions ecclésiastiques à l'Église Centrale de Ouagadougou. Entrée libre.", heure: "18h00", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=380&fit=crop&auto=format", places: 2000, inscriptions: 1203, payant: false, tarif: 0 },
];

const types = ["Tous", "Conférence", "Séminaire", "Assemblée", "Convention", "Évangélisation", "Formation", "Prière", "Culte"];

const typeColors: Record<string, { bg: string; color: string }> = {
  "Conférence": { bg: "#D9EEFA", color: "#0A5490" },
  "Séminaire": { bg: "#FDF4E0", color: "#9A6F22" },
  "Assemblée": { bg: "#DCFCE7", color: "#15803D" },
  "Convention": { bg: "#EDE9FE", color: "#6D28D9" },
  "Évangélisation": { bg: "#FEE2E2", color: "#B91C1C" },
  "Formation": { bg: "#FEF3C7", color: "#92400E" },
  "Prière": { bg: "#D9EEFA", color: "#0F78C8" },
  "Culte": { bg: "#FDF4E0", color: "#C8973A" },
};

const regions = ["Bogodogo (Centre N°5)", "Ziniaré (Centre N°5)", "Centre (Ouagadougou)", "Hauts-Bassins (Bobo-Dioulasso)", "Centre-Ouest (Koudougou)", "Nord (Ouahigouya)", "Sahel (Dori)", "Est (Fada N'Gourma)", "Cascades (Banfora)", "Boucle du Mouhoun (Dédougou)", "Centre-Nord (Kaya)", "Centre-Est (Tenkodogo)", "Centre-Sud (Manga)", "Sud-Ouest (Gaoua)", "Plateau-Central"];

type View = "list" | "detail" | "register" | "confirmed";

type Event = typeof events[0];

export default function Evenements({ initialEventId }: { initialEventId?: number | null }) {
  const [selectedType, setSelectedType] = useState("Tous");
  const initialEv = initialEventId ? (events.find(e => e.id === initialEventId) ?? null) : null;
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(initialEv);
  const [view, setView] = useState<View>(initialEv ? "detail" : "list");

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [region, setRegion] = useState("");
  const [eglise, setEglise] = useState("");
  const [accompagnants, setAccompagnants] = useState("0");
  const [besoins, setBesoins] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filtered = events.filter(e => selectedType === "Tous" || e.type === selectedType);

  const openDetail = (e: Event) => {
    setSelectedEvent(e);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openRegister = () => {
    setNom(""); setPrenom(""); setEmail(""); setTelephone("");
    setRegion(""); setEglise(""); setAccompagnants("0"); setBesoins("");
    setErrors({});
    setView("register");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!nom.trim()) e.nom = "Le nom est requis.";
    if (!prenom.trim()) e.prenom = "Le prénom est requis.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = "Adresse email invalide.";
    if (!telephone.trim()) e.telephone = "Le numéro de téléphone est requis.";
    if (!region) e.region = "Veuillez sélectionner votre région.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setView("confirmed"); window.scrollTo({ top: 0, behavior: "smooth" }); }, 1400);
  };

  const placesLeft = selectedEvent ? (selectedEvent.places > 0 ? selectedEvent.places - selectedEvent.inscriptions : null) : null;
  const complet = placesLeft !== null && placesLeft <= 0;

  /* ── LISTE ── */
  if (view === "list") return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 60%, #0F78C8 100%)", padding: "72px 0 56px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#E8C98A" }}>Agenda</div>
          <h1 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>Événements à venir</h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#CBD5E1" }}>Conférences, séminaires, campagnes d'évangélisation et conventions des Assemblées de Dieu du Burkina Faso.</p>
        </div>
      </section>

      <section className="py-12" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 flex-wrap mb-8">
            {types.map(t => (
              <button key={t} onClick={() => setSelectedType(t)} style={{ background: selectedType === t ? "#0F78C8" : "white", color: selectedType === t ? "white" : "#64748B", border: `1px solid ${selectedType === t ? "#0F78C8" : "#D9EEFA"}`, padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.15s" }}>
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map(e => (
              <div key={e.id} onClick={() => openDetail(e)} className="card overflow-hidden group cursor-pointer" style={{ borderRadius: "14px", display: "flex", transition: "all 0.2s" }}>
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 text-center" style={{ background: "#0F78C8", padding: "16px 12px" }}>
                  <div className="text-3xl font-black text-white" style={{ fontFamily: "'Manrope', sans-serif", lineHeight: 1 }}>{e.date}</div>
                  <div className="text-xs text-blue-200 font-semibold mt-1 uppercase">{e.month}</div>
                  <div className="text-xs text-blue-300 mt-0.5">{e.year}</div>
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: typeColors[e.type]?.bg || "#D9EEFA", color: typeColors[e.type]?.color || "#0A5490" }}>{e.type}</span>
                    {e.places > 0 && e.places - e.inscriptions <= 20 && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#FEE2E2", color: "#B91C1C" }}>
                        {e.places - e.inscriptions <= 0 ? "Complet" : `${e.places - e.inscriptions} places`}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm leading-snug mb-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{e.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-1"><MapPin size={10} /> {e.location}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-400"><Clock size={10} /> {e.heure}</div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-gray-400 line-clamp-1 flex-1">{e.desc.slice(0, 60)}…</p>
                    <ChevronRight size={14} style={{ color: "#0F78C8", flexShrink: 0 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  /* ── DÉTAIL ── */
  if (view === "detail" && selectedEvent) return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 60%, #0F78C8 100%)", padding: "48px 0 36px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button onClick={() => setView("list")} className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: "#93C5FD", background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft size={15} /> Retour aux événements
          </button>
          <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#E8C98A" }}>{selectedEvent.type}</div>
        </div>
      </section>

      <section className="py-12" style={{ background: "#F8F9FC" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="card overflow-hidden" style={{ borderRadius: "20px" }}>
            <div style={{ height: 300, overflow: "hidden" }}>
              <img src={selectedEvent.img} alt={selectedEvent.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: typeColors[selectedEvent.type]?.bg || "#D9EEFA", color: typeColors[selectedEvent.type]?.color || "#0A5490" }}>{selectedEvent.type}</span>
                <span className="text-sm text-gray-400 flex items-center gap-1"><Calendar size={13} /> {selectedEvent.date} {selectedEvent.month} {selectedEvent.year}</span>
                <span className="text-sm text-gray-400 flex items-center gap-1"><Clock size={13} /> {selectedEvent.heure}</span>
                <span className="text-sm text-gray-400 flex items-center gap-1"><MapPin size={13} /> {selectedEvent.location}</span>
              </div>

              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{selectedEvent.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{selectedEvent.desc}</p>

              {/* Infos pratiques */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Date", value: `${selectedEvent.date} ${selectedEvent.month} ${selectedEvent.year}` },
                  { label: "Heure", value: selectedEvent.heure },
                  { label: "Lieu", value: selectedEvent.location },
                  { label: "Participation", value: selectedEvent.payant ? `${selectedEvent.tarif.toLocaleString("fr-FR")} FCFA` : "Gratuit" },
                ].map(({ label, value }) => (
                  <div key={label} className="p-4 rounded-xl text-center" style={{ background: "#F8F9FC", border: "1px solid #D9EEFA" }}>
                    <div className="text-xs text-gray-400 mb-1">{label}</div>
                    <div className="text-sm font-bold" style={{ color: "#0F78C8" }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Jauge places */}
              {selectedEvent.places > 0 && (
                <div className="mb-8">
                  <div className="flex justify-between text-xs mb-2" style={{ color: "#64748B" }}>
                    <span className="font-medium">{selectedEvent.inscriptions} inscrits</span>
                    <span>{placesLeft} places restantes sur {selectedEvent.places}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "#E2E8F0" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (selectedEvent.inscriptions / selectedEvent.places) * 100)}%`, background: complet ? "#DC2626" : "#0F78C8" }} />
                  </div>
                </div>
              )}

              <div className="flex gap-3 flex-wrap">
                {complet ? (
                  <div className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold" style={{ background: "#FEE2E2", color: "#B91C1C" }}>
                    <AlertCircle size={16} /> Événement complet
                  </div>
                ) : (
                  <button onClick={openRegister} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white" style={{ background: "#0F78C8", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                    S'inscrire à l'événement
                  </button>
                )}
                <button onClick={() => setView("list")} className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm" style={{ background: "white", color: "#64748B", border: "1px solid #E2E8F0", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                  Retour
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  /* ── FORMULAIRE D'INSCRIPTION ── */
  if (view === "register" && selectedEvent) return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 60%, #0F78C8 100%)", padding: "48px 0 36px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button onClick={() => setView("detail")} className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: "#93C5FD", background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft size={15} /> Retour à l'événement
          </button>
          <h1 className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>Formulaire d'inscription</h1>
          <p className="text-sm" style={{ color: "#93C5FD" }}>{selectedEvent.title}</p>
        </div>
      </section>

      <section className="py-12" style={{ background: "#F8F9FC" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Récapitulatif événement */}
            <div className="lg:col-span-1">
              <div className="card p-5 sticky top-24" style={{ borderRadius: "16px" }}>
                <div style={{ height: 140, borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
                  <img src={selectedEvent.img} alt={selectedEvent.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: typeColors[selectedEvent.type]?.bg || "#D9EEFA", color: typeColors[selectedEvent.type]?.color || "#0A5490" }}>{selectedEvent.type}</span>
                <h3 className="font-bold text-sm mt-3 mb-3 leading-snug" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{selectedEvent.title}</h3>
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2"><Calendar size={12} style={{ color: "#C8973A" }} /> {selectedEvent.date} {selectedEvent.month} {selectedEvent.year} à {selectedEvent.heure}</div>
                  <div className="flex items-center gap-2"><MapPin size={12} style={{ color: "#C8973A" }} /> {selectedEvent.location}</div>
                  <div className="flex items-center gap-2"><Users size={12} style={{ color: "#C8973A" }} />
                    {selectedEvent.places > 0 ? `${placesLeft} places disponibles` : "Accès libre"}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t" style={{ borderColor: "#F1F5F9" }}>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Participation</span>
                    <span className="font-bold" style={{ color: selectedEvent.payant ? "#C8973A" : "#16A34A" }}>
                      {selectedEvent.payant ? `${selectedEvent.tarif.toLocaleString("fr-FR")} FCFA` : "Gratuit"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="card p-8" style={{ borderRadius: "20px" }}>
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>
                  <User size={18} /> Vos informations personnelles
                </h3>

                {/* Nom / Prénom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="form-label">Nom <span style={{ color: "#DC2626" }}>*</span></label>
                    <input value={nom} onChange={e => setNom(e.target.value)} placeholder="KABORÉ" className="form-input" />
                    {errors.nom && <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#DC2626" }}><AlertCircle size={11} /> {errors.nom}</p>}
                  </div>
                  <div>
                    <label className="form-label">Prénom <span style={{ color: "#DC2626" }}>*</span></label>
                    <input value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Samuel" className="form-input" />
                    {errors.prenom && <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#DC2626" }}><AlertCircle size={11} /> {errors.prenom}</p>}
                  </div>
                </div>

                {/* Email / Téléphone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="form-label">Adresse email <span style={{ color: "#DC2626" }}>*</span></label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nom@email.com" className="form-input" style={{ paddingLeft: 36 }} />
                    </div>
                    {errors.email && <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#DC2626" }}><AlertCircle size={11} /> {errors.email}</p>}
                  </div>
                  <div>
                    <label className="form-label">Téléphone <span style={{ color: "#DC2626" }}>*</span></label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
                      <input type="tel" value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="70 00 00 00" className="form-input" style={{ paddingLeft: 36 }} />
                    </div>
                    {errors.telephone && <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#DC2626" }}><AlertCircle size={11} /> {errors.telephone}</p>}
                  </div>
                </div>

                {/* Région / Église */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="form-label">Région <span style={{ color: "#DC2626" }}>*</span></label>
                    <div className="relative">
                      <select value={region} onChange={e => setRegion(e.target.value)} className="form-input appearance-none" style={{ paddingRight: 36 }}>
                        <option value="">Sélectionner une région</option>
                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#94A3B8" }} />
                    </div>
                    {errors.region && <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#DC2626" }}><AlertCircle size={11} /> {errors.region}</p>}
                  </div>
                  <div>
                    <label className="form-label">Église locale</label>
                    <input value={eglise} onChange={e => setEglise(e.target.value)} placeholder="Nom de votre assemblée" className="form-input" />
                  </div>
                </div>

                {/* Accompagnants */}
                <div className="mb-4">
                  <label className="form-label flex items-center gap-1"><Users size={13} /> Nombre d'accompagnants</label>
                  <div className="flex items-center gap-3 mt-1">
                    {["0","1","2","3","4","5+"].map(n => (
                      <button key={n} type="button" onClick={() => setAccompagnants(n)} style={{ width: 40, height: 40, borderRadius: 10, border: `2px solid ${accompagnants === n ? "#0F78C8" : "#E2E8F0"}`, background: accompagnants === n ? "#EBF6FD" : "white", color: accompagnants === n ? "#0F78C8" : "#64748B", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                        {n}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">En plus de vous-même</p>
                </div>

                {/* Besoins spéciaux */}
                <div className="mb-6">
                  <label className="form-label">Besoins spéciaux ou remarques</label>
                  <textarea value={besoins} onChange={e => setBesoins(e.target.value)} rows={3} placeholder="Accessibilité, régime alimentaire, hébergement…" className="form-input" style={{ resize: "none" }} />
                </div>

                {/* Paiement si payant */}
                {selectedEvent.payant && (
                  <div className="mb-6 p-4 rounded-xl" style={{ background: "#FDF4E0", border: "1px solid #F3D98A" }}>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#9A6F22" }}>Participation : {selectedEvent.tarif.toLocaleString("fr-FR")} FCFA</p>
                    <p className="text-xs" style={{ color: "#B08032" }}>Le paiement sera collecté sur place le jour de l'événement. Présentez votre confirmation d'inscription.</p>
                  </div>
                )}

                <div className="flex gap-3 flex-wrap">
                  <button type="submit" disabled={submitting} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white" style={{ background: submitting ? "#6B7280" : "#0F78C8", border: "none", cursor: submitting ? "wait" : "pointer", fontFamily: "'Inter', sans-serif" }}>
                    {submitting ? "Envoi en cours…" : "Confirmer mon inscription"}
                  </button>
                  <button type="button" onClick={() => setView("detail")} className="px-5 py-3 rounded-xl font-semibold text-sm" style={{ background: "white", color: "#64748B", border: "1px solid #E2E8F0", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                    Annuler
                  </button>
                </div>

                <p className="mt-4 text-xs text-gray-400">Les champs marqués <span style={{ color: "#DC2626" }}>*</span> sont obligatoires.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  /* ── CONFIRMATION ── */
  if (view === "confirmed" && selectedEvent) return (
    <section className="py-24" style={{ background: "#F8F9FC" }}>
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className="card p-10" style={{ borderRadius: "24px" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#DCFCE7" }}>
            <CheckCircle size={40} style={{ color: "#16A34A" }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Inscription confirmée !</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Votre inscription à <strong>« {selectedEvent.title} »</strong> a bien été enregistrée. Un email de confirmation vous sera envoyé à <strong>{email}</strong>.
          </p>

          <div className="text-left p-5 rounded-xl mb-6 space-y-2" style={{ background: "#F8F9FC", border: "1px solid #D9EEFA" }}>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Participant</span><span className="font-semibold" style={{ color: "#0F78C8" }}>{prenom} {nom}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Date</span><span className="font-semibold" style={{ color: "#374151" }}>{selectedEvent.date} {selectedEvent.month} {selectedEvent.year}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Lieu</span><span className="font-semibold" style={{ color: "#374151" }}>{selectedEvent.location}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Accompagnants</span><span className="font-semibold" style={{ color: "#374151" }}>{accompagnants}</span></div>
            {selectedEvent.payant && <div className="flex justify-between text-sm"><span className="text-gray-400">À régler sur place</span><span className="font-bold" style={{ color: "#C8973A" }}>{selectedEvent.tarif.toLocaleString("fr-FR")} FCFA</span></div>}
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setView("list"); setSelectedEvent(null); }} className="flex-1 py-3 rounded-xl font-semibold text-sm" style={{ background: "#0F78C8", color: "white", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
              Retour aux événements
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  return null;
}
