import { useState } from "react";
import { ChevronDown, Phone, Mail, MapPin, Share2, Video, MessageCircle, Menu, X, GraduationCap, Network, HeartPulse, School } from "lucide-react";
import adLogo from "../imports/ead-bf.png";

const mainLinks = [
  { label: "Accueil", page: "home" },
  { label: "À propos", page: "apropos" },
  { label: "Actualités", page: "actualites" },
  { label: "Événements", page: "evenements" },
  { label: "Mission", page: "mission" },
  { label: "Bibliothèque", page: "bibliotheque-pub" },
  { label: "Contact", page: "contact" },
];

const moreLinks = [
  { label: "Écoles bibliques", desc: "ESTB, formation pastorale & instituts", page: "ecoles-bibliques", icon: GraduationCap },
  { label: "Les Structures", desc: "Départements, comités & ministères nationaux", page: "structures", icon: Network },
  { label: "La Santé", desc: "Centres médicaux, dispensaires & santé", page: "sante", icon: HeartPulse },
  { label: "L'Éducation", desc: "Écoles, collèges & lycées confessionnels", page: "education", icon: School },
  { label: "Sondages", desc: "Consultations et enquêtes participatives", page: "sondages-pub", icon: null },
];

const allLinks = [...mainLinks, ...moreLinks];

export default function PublicLayout({
  children,
  currentPage,
  onNavigate,
}: {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (p: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = moreLinks.some(l => l.page === currentPage);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => onNavigate("home")}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <img src={adLogo} alt="Assemblées de Dieu du Burkina Faso" className="h-10 object-contain" />
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5" style={{ overflow: "visible" }}>
              {mainLinks.map(link => {
                const active = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => onNavigate(link.page)}
                    style={{
                      background: active ? "#EBF6FD" : "none",
                      color: active ? "#0F78C8" : "#4B5563",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: active ? 600 : 500,
                      padding: "7px 10px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      transition: "all 0.15s",
                      borderBottom: active ? "2px solid #0F78C8" : "2px solid transparent",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "#0F78C8"; e.currentTarget.style.background = "#EBF6FD"; } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "#4B5563"; e.currentTarget.style.background = "none"; } }}
                  >
                    {link.label}
                  </button>
                );
              })}

              {/* Dropdown "Pôles & Œuvres" */}
              <div className="relative">
                <button
                  onClick={() => setMoreOpen(o => !o)}
                  style={{
                    background: moreActive ? "#EBF6FD" : "none",
                    color: moreActive ? "#0F78C8" : "#4B5563",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: moreActive ? 600 : 500,
                    padding: "7px 10px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    whiteSpace: "nowrap",
                    borderBottom: moreActive ? "2px solid #0F78C8" : "2px solid transparent",
                  }}
                >
                  Pôles & Œuvres <ChevronDown size={13} style={{ transform: moreOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </button>
                {moreOpen && (
                  <div
                    className="absolute top-full right-0 mt-1 rounded-2xl overflow-hidden z-50 p-2"
                    style={{ background: "white", boxShadow: "0 12px 36px rgba(15,120,200,0.18)", border: "1px solid #D9EEFA", minWidth: 280 }}
                    onMouseLeave={() => setMoreOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <div className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">Institutions & Ministères</div>
                      <div className="text-[10px] text-slate-400">Pôles nationaux des Assemblées de Dieu</div>
                    </div>
                    {moreLinks.map(link => {
                      const active = currentPage === link.page;
                      const Icon = link.icon;
                      return (
                        <button
                          key={link.page}
                          onClick={() => { onNavigate(link.page); setMoreOpen(false); }}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            width: "100%",
                            background: active ? "#EBF6FD" : "none",
                            color: active ? "#0F78C8" : "#374151",
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "'Inter', sans-serif",
                            borderRadius: "10px",
                            padding: "9px 12px",
                            textAlign: "left",
                            transition: "background 0.1s",
                          }}
                          onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#F8FAFC"; }}
                          onMouseLeave={e => { if (!active) e.currentTarget.style.background = "none"; }}
                        >
                          {Icon ? (
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: active ? "#D9EEFA" : "#F1F5F9" }}>
                              <Icon size={15} style={{ color: active ? "#0F78C8" : "#64748B" }} />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-100 text-xs font-bold text-slate-500">
                              📊
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight" style={{ color: active ? "#0F78C8" : "#1E293B" }}>{link.label}</div>
                            <div className="text-[10px] text-slate-400 truncate mt-0.5">{link.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate("login")}
                className="hidden md:flex btn-primary text-sm"
                style={{ background: "#0F78C8", color: "white", padding: "8px 16px", borderRadius: "8px", border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer", alignItems: "center", gap: "6px" }}
              >
                Se connecter
              </button>
              <button
                className="md:hidden p-2 rounded-lg"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#374151" }}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-0.5">
            {allLinks.map(link => {
              const active = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => { onNavigate(link.page); setMenuOpen(false); }}
                  style={{
                    background: active ? "#EBF6FD" : "none",
                    color: active ? "#0F78C8" : "#374151",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: active ? 600 : 400,
                    padding: "10px 12px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    textAlign: "left",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => { onNavigate("login"); setMenuOpen(false); }}
              style={{ background: "#0F78C8", color: "white", padding: "10px", borderRadius: "8px", border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer", marginTop: "8px" }}
            >
              Se connecter
            </button>
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer style={{ background: "#032A4E", color: "#94A3B8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="px-3 py-2 rounded-xl" style={{ background: "white", display: "inline-flex" }}>
                  <img src={adLogo} alt="AD/BF" className="h-8 object-contain" />
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#64748B" }}>
                Bureau National des Assemblées de Dieu du Burkina Faso. Ouagadougou, Burkina Faso.
              </p>
              <div className="flex gap-3">
                {[Share2, Video, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#0A5490", color: "#94A3B8" }}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Navigation</h4>
              <ul className="space-y-2 text-sm">
                {mainLinks.map(l => (
                  <li key={l.page}>
                    <button onClick={() => onNavigate(l.page)} style={{ color: "#64748B", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "14px", padding: 0 }}
                      onMouseEnter={e => e.currentTarget.style.color = "#ffffff"}
                      onMouseLeave={e => e.currentTarget.style.color = "#64748B"}
                    >{l.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Œuvres & Institutions</h4>
              <ul className="space-y-2 text-sm">
                {moreLinks.map(l => (
                  <li key={l.page}>
                    <button onClick={() => onNavigate(l.page)} style={{ color: "#64748B", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "14px", padding: 0 }}
                      onMouseEnter={e => e.currentTarget.style.color = "#ffffff"}
                      onMouseLeave={e => e.currentTarget.style.color = "#64748B"}
                    >{l.label}</button>
                  </li>
                ))}
                <li>
                  <button onClick={() => onNavigate("mission")} style={{ color: "#64748B", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "14px", padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = "#ffffff"}
                    onMouseLeave={e => e.currentTarget.style.color = "#64748B"}
                  >Vision 3R & Missions</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Contact</h4>
              <div className="mb-4">
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2" style={{ color: "#64748B" }}>
                  <MapPin size={14} style={{ color: "#C8973A" }} /> Ouagadougou, Burkina Faso
                </div>
                <div className="flex items-center gap-2" style={{ color: "#64748B" }}>
                  <Phone size={14} style={{ color: "#C8973A" }} /> +226 25 30 XX XX
                </div>
                <div className="flex items-center gap-2" style={{ color: "#64748B" }}>
                  <Mail size={14} style={{ color: "#C8973A" }} /> contact@adbf.bf
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: "#0A5490", color: "#475569" }}>
            <span>© 2026 Assemblées de Dieu du Burkina Faso. Tous droits réservés.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
