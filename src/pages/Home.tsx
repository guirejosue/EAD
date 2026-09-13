import { useState } from "react";
import {
  ChevronRight, ChevronDown, BookOpen, Users, MapPin, Heart, Globe, Star,
  Calendar, ArrowRight, Phone, Mail, Share2, Video, MessageCircle,
  Building2, Church, TrendingUp, Award, Mic, Shield, CheckCircle, Sparkles, Layers,
} from "lucide-react";
import adLogo from "../imports/ead-bf.png";
import img1AG from "../imports/img1_AG.jpeg";
import img3AG from "../imports/img3_AG.jpeg";
import logo3R from "../imports/logo_3R.jpeg";
import imgPresident from "../imports/WhatsApp_Image_2026-09-12_at_12.43.49.jpeg";
import imgCGE1 from "../imports/WhatsApp_Image_2026-09-12_at_12.43.44__2_.jpeg";
import imgCGE2 from "../imports/WhatsApp_Image_2026-09-12_at_12.43.45.jpeg";
import imgCGE3 from "../imports/WhatsApp_Image_2026-09-12_at_12.43.46.jpeg";
import imgCGE4 from "../imports/WhatsApp_Image_2026-09-12_at_12.43.50__1_.jpeg";
import imgTemple from "../imports/WhatsApp_Image_2026-09-12_at_12.43.44.jpeg";
import imgCongressHall from "../imports/WhatsApp Image 2026-09-12 at 12.43.51.jpeg";
import heroChurchExterior from "../imports/hero_church_exterior.jpg";

const stats = [
  { label: "Églises locales", value: "1 842", icon: Church, color: "#0F78C8" },
  { label: "Régions", value: "79", icon: MapPin, color: "#0D67B0" },
  { label: "Pasteurs", value: "2 340", icon: Users, color: "#C8973A" },
  { label: "Membres", value: "487 000", icon: Heart, color: "#16A34A" },
  { label: "Implantations", value: "318", icon: Globe, color: "#0D67B0" },
  { label: "Actions missionnaires", value: "94", icon: Star, color: "#C8973A" },
];

const news = [
  {
    id: 1,
    img: img1AG,
    category: "Ministère",
    date: "28 août 2026",
    title: "Conférence nationale des pasteurs : 2 340 leaders réunis à Ouagadougou",
    summary: "La rencontre annuelle des pasteurs des Assemblées de Dieu du Burkina Faso a réuni plus de deux mille responsables d'église pour trois jours d'enseignement et de vision partagée autour de la Vision 3R.",
  },
  {
    id: 2,
    img: imgCGE1,
    category: "Gouvernance",
    date: "26 août 2026",
    title: "Conseil Général Extraordinaire : Mise en conformité avec les nouvelles dispositions",
    summary: "Le Conseil Général Extraordinaire tenu le 26 août 2026 a adopté d'importantes résolutions institutionnelles pour consolider l'organisation nationale et dynamiser la Vision 3R.",
  },
  {
    id: 3,
    img: imgTemple,
    category: "Infrastructures",
    date: "2 août 2026",
    title: "Temple Shiloh de Tanghin Taambila : Renforcement des infrastructures nationales",
    summary: "Le Bureau Exécutif National poursuit la modernisation des infrastructures d'accueil et des centres de formation pour soutenir le rayonnement de l'Église au Burkina Faso.",
  },
];

const events = [
  { id: 1, date: "15", month: "Sep", title: "Conférence des Jeunes AG — Bobo-Dioulasso", location: "Bobo-Dioulasso", type: "Conférence" },
  { id: 2, date: "22", month: "Sep", title: "Séminaire de leadership pastoral — Région Centre", location: "Ouagadougou", type: "Séminaire" },
  { id: 3, date: "08", month: "Oct", title: "Assemblée Générale du Bureau National", location: "Ouagadougou", type: "Assemblée" },
  { id: 4, date: "20", month: "Oct", title: "Convention Nationale de la Femme Chrétienne", location: "Koudougou", type: "Convention" },
];

const books = [
  { id: 1, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=240&h=320&fit=crop&auto=format", title: "La Vision 3R Expliquée", author: "Pasteur Samuel Kaboré", category: "Théologie", price: "3 500" },
  { id: 2, cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=240&h=320&fit=crop&auto=format", title: "Leadership pastoral en Afrique", author: "Dr. Jean-Marc Ouédraogo", category: "Leadership", price: "4 000" },
  { id: 3, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=240&h=320&fit=crop&auto=format", title: "Guide du Discipulat", author: "Pasteur Pierre Sawadogo", category: "Discipulat", price: "2 500" },
];

const navLinks = [
  { label: "Accueil", page: "home" },
  { label: "À propos", page: "apropos" },
  { label: "Actualités", page: "actualites" },
  { label: "Événements", page: "evenements" },
  { label: "Mission", page: "mission" },
  { label: "Bibliothèque", page: "bibliotheque-pub" },
  { label: "Sondages", page: "sondages-pub" },
  { label: "Contact", page: "contact" },
];

export default function Home({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => onNavigate("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <img src={adLogo} alt="Assemblées de Dieu du Burkina Faso" className="h-10 object-contain" />
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className="px-3 py-2 text-sm font-medium rounded-lg transition-all"
                  style={{ color: link.page === "home" ? "#0F78C8" : "#4B5563", background: link.page === "home" ? "#EBF6FD" : "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: link.page === "home" ? 600 : 500, borderBottom: link.page === "home" ? "2px solid #0F78C8" : "2px solid transparent" }}
                  onMouseEnter={e => { if (link.page !== "home") { e.currentTarget.style.color = "#0F78C8"; e.currentTarget.style.background = "#EBF6FD"; } }}
                  onMouseLeave={e => { if (link.page !== "home") { e.currentTarget.style.color = "#4B5563"; e.currentTarget.style.background = "none"; } }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate("login")}
                className="hidden sm:flex btn-primary text-sm"
                style={{ background: "#0F78C8", color: "white", padding: "8px 16px", borderRadius: "8px", border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer", alignItems: "center", gap: "6px" }}
              >
                Se connecter
              </button>
              <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <button key={link.page} onClick={() => { onNavigate(link.page); setMenuOpen(false); }} className="py-2 px-3 text-sm text-gray-700 rounded-lg text-left" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>{link.label}</button>
            ))}
            <button onClick={() => onNavigate("login")} className="mt-2 btn-primary justify-center" style={{ background: "#0F78C8", color: "white", padding: "10px", borderRadius: "8px", border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer" }}>
              Se connecter
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="accueil" className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 50%, #0F78C8 100%)", minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0">
          <img
            src={heroChurchExterior}
            alt="Édifice National — Assemblées de Dieu du Burkina Faso"
            className="w-full h-full object-cover object-center opacity-40"
          />
          {/* Subtle directional gradient so text on the left is 100% crisp while the architecture shines through */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(3,42,78,0.92) 0%, rgba(3,42,78,0.78) 45%, rgba(10,84,144,0.50) 80%, rgba(15,120,200,0.35) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(3,42,78,0.85) 0%, transparent 40%)",
            }}
          />
        </div>
        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 w-1 h-full" style={{ background: "linear-gradient(to bottom, #C8973A, transparent)" }} />
        <div className="absolute top-0 right-0 w-px h-full opacity-20" style={{ background: "#C8973A" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6" style={{ fontFamily: "'Manrope', sans-serif", lineHeight: 1.1 }}>
              Les Assemblées de Dieu<br />
              <span style={{ color: "#E8C98A" }}>du Burkina Faso</span>
            </h1>

            <p className="text-lg text-blue-100 mb-10 max-w-xl leading-relaxed" style={{ color: "#CBD5E1" }}>
              Une communauté engagée dans la foi, la mission, la formation et le développement des églises à travers tout le Burkina Faso.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-gold px-8 py-4 text-base font-semibold rounded-xl" style={{ background: "linear-gradient(135deg, #C8973A, #D9AE5F)", color: "white", border: "none", padding: "14px 28px", borderRadius: "10px", fontFamily: "'Inter', sans-serif", fontWeight: 700, cursor: "pointer", fontSize: "15px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                Découvrir notre vision <ChevronRight size={18} />
              </button>
              <button
                onClick={() => onNavigate("apropos")}
                className="px-8 py-4 text-base font-semibold rounded-xl"
                style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "14px 28px", borderRadius: "10px", fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer", fontSize: "15px", backdropFilter: "blur(4px)", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                Nos Églises & Ministères <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to bottom, transparent, #F8F9FC)" }} />
      </section>

      {/* STATS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C8973A" }}>En chiffres</div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Un réseau d'envergure nationale</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="card text-center p-6" style={{ background: "white", borderRadius: "12px", border: "1px solid #D9EEFA", boxShadow: "0 1px 4px rgba(11,31,75,0.05)" }}>
                <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: "#EBF6FD" }}>
                  <s.icon size={20} style={{ color: s.color }} />
                </div>
                <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{s.value}</div>
                <div className="text-xs text-gray-500 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION 3R */}
      <section id="apropos" className="py-20" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C8973A" }}>Notre vision</div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>La Vision 3R</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Trois piliers qui structurent notre engagement pour le Burkina Faso et au-delà.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { letter: "R", title: "Réveil", desc: "Un réveil spirituel profond touchant chaque église locale, chaque famille et chaque individu à travers la prière et la Parole.", icon: Mic, color: "#0F78C8", light: "#D9EEFA" },
              { letter: "R", title: "Réforme", desc: "Une transformation structurelle des pratiques ecclésiales, de la gouvernance et de la formation des leaders pour une église ancrée.", icon: TrendingUp, color: "#C8973A", light: "#FDF4E0" },
              { letter: "R", title: "Rayonnement", desc: "Une expansion missionnaire et un témoignage social qui atteignent les nations, en commençant par le Burkina Faso et la région sahélienne.", icon: Globe, color: "#16A34A", light: "#DCFCE7" },
            ].map((v) => (
              <div key={v.title} className="relative overflow-hidden rounded-2xl p-8" style={{ border: "1px solid #D9EEFA", background: "white", boxShadow: "0 2px 12px rgba(11,31,75,0.06)" }}>
                <div className="absolute top-4 right-4 text-8xl font-black opacity-5" style={{ fontFamily: "'Manrope', sans-serif", color: v.color, lineHeight: 1 }}>{v.letter}</div>
                <div className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center" style={{ background: v.light }}>
                  <v.icon size={24} style={{ color: v.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Manrope', sans-serif", color: v.color }}>{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                <div className="mt-6 w-8 h-1 rounded" style={{ background: v.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section id="actualites" className="py-20" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#C8973A" }}>Actualités</div>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Dernières nouvelles</h2>
            </div>
            <button onClick={() => onNavigate("actualites")} className="hidden sm:flex items-center gap-2 text-sm font-semibold" style={{ color: "#0F78C8", background: "none", border: "none", cursor: "pointer" }}>
              Toutes les actualités <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((n) => (
              <div key={n.title} onClick={() => onNavigate(`actualites:${n.id}`)} className="card overflow-hidden group cursor-pointer" style={{ background: "white", borderRadius: "14px", border: "1px solid #D9EEFA", boxShadow: "0 1px 4px rgba(11,31,75,0.05)", transition: "all 0.2s" }}>
                <div className="overflow-hidden" style={{ height: 200 }}>
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="badge badge-info text-xs" style={{ background: "#D9EEFA", color: "#0D67B0", padding: "2px 10px", borderRadius: "20px", fontWeight: 600 }}>{n.category}</span>
                    <span className="text-xs text-gray-400">{n.date}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-2 leading-snug line-clamp-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{n.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{n.summary}</p>
                  <span className="mt-4 text-xs font-semibold flex items-center gap-1" style={{ color: "#C8973A" }}>
                    Lire la suite <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉVÉNEMENTS */}
      <section id="evenements" className="py-20" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#C8973A" }}>Agenda</div>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Événements à venir</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {events.map((e) => (
              <div key={e.title} onClick={() => onNavigate(`evenements:${e.id}`)} className="rounded-2xl p-5 cursor-pointer group" style={{ border: "1px solid #D9EEFA", background: "white", boxShadow: "0 1px 4px rgba(11,31,75,0.05)", transition: "all 0.2s" }}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-center rounded-xl p-3 w-16" style={{ background: "#0F78C8" }}>
                    <div className="text-2xl font-black text-white" style={{ fontFamily: "'Manrope', sans-serif", lineHeight: 1 }}>{e.date}</div>
                    <div className="text-xs text-blue-300 font-semibold mt-1 uppercase">{e.month}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: "#FDF4E0", color: "#9A6F22" }}>{e.type}</span>
                    <h3 className="text-sm font-bold leading-snug mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{e.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin size={10} /> {e.location}
                    </div>
                  </div>
                </div>
                <div className="mt-4 w-full text-xs font-semibold py-2 rounded-lg border border-gray-200 text-center text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Voir l'événement <ChevronRight size={11} className="inline" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIBLIOTHÈQUE */}
      <section id="bibliotheque" className="py-20" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#C8973A" }}>Bibliothèque numérique</div>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Ouvrages disponibles</h2>
            </div>
            <button onClick={() => onNavigate("bibliotheque-pub")} className="btn-secondary hidden sm:flex" style={{ background: "white", color: "#0F78C8", border: "1px solid #CBD5E1", padding: "8px 16px", borderRadius: "8px", fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
              <BookOpen size={16} /> Catalogue complet
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {books.map((b) => (
              <div key={b.title} onClick={() => onNavigate(`bibliotheque-pub:${b.id}`)} className="card overflow-hidden group cursor-pointer" style={{ background: "white", borderRadius: "14px", border: "1px solid #D9EEFA", boxShadow: "0 1px 4px rgba(11,31,75,0.05)", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 200, overflow: "hidden", background: "#EBF6FD" }}>
                  <img src={b.cover} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block w-fit" style={{ background: "#D9EEFA", color: "#0D67B0" }}>{b.category}</span>
                  <h3 className="font-bold text-sm leading-snug mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{b.title}</h3>
                  <p className="text-xs text-gray-500 mb-4">{b.author}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold" style={{ color: "#C8973A", fontFamily: "'Manrope', sans-serif" }}>{b.price} FCFA</span>
                    <span className="text-xs font-semibold px-4 py-2 rounded-lg" style={{ background: "#0F78C8", color: "white", fontFamily: "'Inter', sans-serif" }}>
                      Voir l'ouvrage
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SONDAGES */}
      <section className="py-20" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#C8973A" }}>Espace membres</div>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Sondages en cours</h2>
            </div>
            <button onClick={() => onNavigate("sondages-pub")} className="hidden sm:flex items-center gap-2 text-sm font-semibold" style={{ color: "#0F78C8", background: "none", border: "none", cursor: "pointer" }}>
              Tous les sondages <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: "Votre participation à la vie de l'église",
                desc: "À quelle fréquence participez-vous aux activités de votre assemblée locale ?",
                cover: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=340&fit=crop&auto=format",
                participants: 1234,
                cloture: "30 sept. 2026",
                options: ["Chaque semaine", "Deux à trois fois par mois", "Une fois par mois", "Rarement"],
                statut: "Actif",
              },
              {
                id: 2,
                title: "La Vision 3R dans votre église locale",
                desc: "Est-ce que votre assemblée a officiellement adopté un plan d'action Vision 3R ?",
                cover: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=340&fit=crop&auto=format",
                participants: 876,
                cloture: "15 oct. 2026",
                options: ["Oui, pleinement", "En cours", "Pas encore", "Je ne sais pas"],
                statut: "Actif",
              },
              {
                id: 3,
                title: "Besoins en formation des responsables",
                desc: "Quels domaines de formation sont les plus prioritaires pour votre ministère en 2027 ?",
                cover: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=340&fit=crop&auto=format",
                participants: 542,
                cloture: "31 oct. 2026",
                options: ["Leadership pastoral", "Finances d'église", "Évangélisation", "Discipulat"],
                statut: "Actif",
              },
            ].map(s => (
              <div key={s.id} className="card overflow-hidden group" style={{ borderRadius: "16px", border: "1px solid #D9EEFA", display: "flex", flexDirection: "column" }}>
                {/* Cover */}
                <div className="relative overflow-hidden" style={{ height: 160 }}>
                  <img src={s.cover} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,42,78,0.75) 0%, transparent 60%)" }} />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#16A34A", color: "white" }}>{s.statut}</div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
                      <span>{s.participants.toLocaleString("fr-FR")} participants</span>
                      <span>Clôture : {s.cloture}</span>
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-sm leading-snug mb-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{s.desc}</p>

                  {/* Options floutées */}
                  <div className="space-y-1.5 mb-4 relative">
                    {s.options.slice(0, 3).map((opt, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: "#F8F9FC", border: "1px solid #E8EDF8", color: "#94A3B8" }}>
                        <div className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0" />
                        <span style={{ filter: i > 0 ? "blur(3px)" : "none", userSelect: "none" }}>{opt}</span>
                      </div>
                    ))}
                    {/* Overlay avec verrou */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ background: "rgba(248,249,252,0.6)", backdropFilter: "blur(1px)" }}>
                      <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "white", color: "#64748B", border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                        <svg width="11" height="13" viewBox="0 0 11 13" fill="none"><rect x="1" y="5" width="9" height="7" rx="1.5" stroke="#94A3B8" strokeWidth="1.3"/><path d="M3 5V3.5a2.5 2.5 0 015 0V5" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/></svg>
                        Réservé aux membres
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate("sondages-pub")}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #0F78C8, #0A5490)", color: "white", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                  >
                    Participer au sondage <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="py-20" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C8973A" }}>Notre mission</div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>
                Évangélisation, action sociale et développement communautaire
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Les Assemblées de Dieu du Burkina Faso mènent des actions missionnaires dans toutes les 79 régions ecclésiastiques du pays. De l'évangélisation rurale aux projets de développement communautaire, notre engagement va au-delà du spirituel.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Puits et forages construits", value: "47", icon: "💧" },
                  { label: "Écoles communautaires", value: "23", icon: "🏫" },
                  { label: "Centres de santé soutenus", value: "12", icon: "🏥" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "white", border: "1px solid #D9EEFA" }}>
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <div className="font-bold text-lg" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{m.value}</div>
                      <div className="text-xs text-gray-500">{m.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={img1AG}
                alt="Grande assemblée des pasteurs AD/BF"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute -bottom-4 -left-4 rounded-xl p-4 shadow-lg" style={{ background: "white", border: "1px solid #D9EEFA" }}>
                <div className="text-2xl font-black" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>94</div>
                <div className="text-xs text-gray-500">Actions missionnaires<br />en cours en 2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONSEIL GÉNÉRAL EXTRAORDINAIRE */}
      <section className="py-20" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* En-tête */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>
                Conseil Général Extraordinaire
              </h2>
              <p className="text-sm mt-1 font-bold" style={{ color: "#C8973A" }}>Assemblées de Dieu du Burkina Faso</p>
            </div>
            <button onClick={() => onNavigate("actualites")} className="btn-secondary text-sm flex items-center gap-2 flex-shrink-0">
              Toutes les actualités <ChevronRight size={14} />
            </button>
          </div>

          {/* Galerie photos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-lg" style={{ height: 240 }}>
              <img src={imgCGE1} alt="Session plénière" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,42,78,0.65) 0%, transparent 55%)" }} />
              <p className="absolute bottom-3 left-4 text-white text-xs font-semibold">Session plénière du Conseil</p>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow" style={{ height: 240 }}>
              <img src={imgCGE2} alt="Arrivée des délégués" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,42,78,0.5) 0%, transparent 60%)" }} />
              <p className="absolute bottom-3 left-3 text-white text-xs font-semibold">Arrivée des délégués</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative rounded-xl overflow-hidden shadow flex-1" style={{ height: 113 }}>
                <img src={imgCGE3} alt="Adoration" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "rgba(3,42,78,0.4)" }} />
                <p className="absolute bottom-2 left-3 text-white text-xs font-semibold">Adoration</p>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow flex-1" style={{ height: 113 }}>
                <img src={imgCGE4} alt="Accueil officiel" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "rgba(3,42,78,0.4)" }} />
                <p className="absolute bottom-2 left-3 text-white text-xs font-semibold">Accueil officiel</p>
              </div>
            </div>
          </div>

          {/* Discours du Président */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 rounded-3xl overflow-hidden shadow-xl" style={{ background: "#032A4E" }}>
            {/* Photo Président */}
            <div className="lg:col-span-2 relative" style={{ minHeight: 380 }}>
              <img src={imgPresident} alt="Rév. Dr Etienne P. ZONGO" className="w-full h-full object-cover" style={{ objectPosition: "center 8%", minHeight: 380 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, #032A4E 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden" style={{ background: "linear-gradient(to top, #032A4E 60%, transparent)" }}>
                <p className="text-xs font-bold tracking-widest" style={{ color: "#C8973A" }}>RÉV. DR ETIENNE P. ZONGO</p>
                <p className="text-white text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Président — AD/BF</p>
              </div>
            </div>

            {/* Texte discours */}
            <div className="lg:col-span-3 p-7 sm:p-10 flex flex-col justify-center">
              <div className="hidden lg:block mb-5">
                <p className="text-xs font-bold tracking-widest mb-0.5" style={{ color: "#C8973A" }}>RÉV. DR ETIENNE P. ZONGO</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Président — Assemblées de Dieu du Burkina Faso</p>
              </div>

              {/* Titre discours */}
              <h3 className="text-xl sm:text-2xl font-black text-white mb-5 leading-snug" style={{ fontFamily: "'Manrope', sans-serif" }}>
                LE VRAI COMBAT N'EST PAS<br />ENTRE DES HOMMES.
              </h3>

              {/* Corps du discours */}
              <div className="space-y-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                <p>L'Église n'a pas besoin de nouveaux clans ni de nouvelles querelles. Elle a besoin de <span className="font-semibold text-white">vérité</span>, de <span className="font-semibold text-white">justice</span>, de <span className="font-semibold text-white">repentance</span> et de <span className="font-semibold text-white">pardon</span>. Elle a besoin de responsables capables de reconnaître leurs erreurs, de serviteurs capables de servir sans s'accrocher à leurs positions.</p>
                <p>Ce Conseil Général ne doit pas simplement gérer une crise. Il doit <span className="font-semibold text-white">préparer l'avenir</span>. Et cet avenir ne se construira pas seulement avec de nouveaux textes — il se construira avec des hommes et des femmes qui auront compris :</p>

                {/* Citation clé */}
                <div className="my-4 pl-4 py-3" style={{ borderLeft: "3px solid #C8973A" }}>
                  <p className="text-base font-bold italic" style={{ color: "#E8C98A", fontFamily: "'Manrope', sans-serif" }}>
                    "Dans l'Église, nous ne sommes pas propriétaires de nos fonctions. Nous sommes des serviteurs."
                  </p>
                </div>

                <p style={{ color: "rgba(255,255,255,0.65)" }}>La question n'est plus : <em>"Qui va gagner ?"</em></p>
                <p className="font-semibold text-white">Mais : <em>"Quelle Église voulons-nous transmettre à ceux qui viendront après nous ?"</em></p>
                <p style={{ color: "rgba(255,255,255,0.65)" }}>Parfois, Dieu permet qu'une tempête secoue une maison non pas pour la détruire, mais pour révéler les endroits qu'il faut consolider.</p>
              </div>

              {/* Conclusion 3R */}
              <div className="mt-6 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-base font-black tracking-wide mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#C8973A" }}>
                  Réforme. Réveil. Rayonnement.
                </p>
                <p className="text-sm font-bold text-white">Cette fois, il ne suffit plus de les proclamer. Il faut les <span style={{ color: "#C8973A" }}>vivre</span>.</p>
                <p className="text-xs mt-3 italic" style={{ color: "rgba(255,255,255,0.4)" }}>— Discours du Président lors du Conseil Général Extraordinaire · 26 Août 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOUVERNANCE 3R */}
      <section className="py-20 lg:py-28 overflow-hidden" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Badge + Titre */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>
              Notre Gouvernance :{" "}
              <span style={{ color: "#0F78C8" }}>Une Vision Partagée</span><br />
              au Service du Royaume de Dieu
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "#64748B" }}>
              Au sein des Assemblées de Dieu du Burkina Faso, notre architecture ecclésiale concilie l'unité spirituelle, la responsabilité pastorale et la rigueur administrative, pour porter ensemble les fruits du Réveil, de la Réforme et du Rayonnement.
            </p>
          </div>

          {/* Bannière centrale Vision 3R avec le Logo officiel */}
          <div className="mb-12 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #032A4E 0%, #0A5490 55%, #0D67B0 100%)",
              borderColor: "rgba(255,255,255,0.12)"
            }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
              <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 p-3 rounded-2xl bg-white shadow-2xl flex items-center justify-center border border-amber-200/50">
                <img src={logo3R} alt="Logo Réforme 3R — AD/BF" className="w-full h-full object-contain drop-shadow" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide mb-3 text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  UN CŒUR RÉFORMÉ · UNE VIE RÉVEILLÉE · UNE MISSION RAYONNANTE
                </h3>
                <p className="text-sm sm:text-base leading-relaxed max-w-3xl" style={{ color: "rgba(255,255,255,0.85)" }}>
                  Impulsée par le Bureau Exécutif National présidé par le Rév. Dr Etienne P. Zongo, la Vision 3R structure notre action autour de trois impératifs bibliques indissociables pour bâtir une Église consacrée, moderne et missionnaire.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 w-full lg:w-48 flex-shrink-0">
                <div className="px-4 py-2.5 rounded-xl border text-center lg:text-left" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}>
                  <div className="text-lg font-bold text-white">1 842</div>
                  <div className="text-[11px]" style={{ color: "#93C5FD" }}>Églises locales unies</div>
                </div>
                <div className="px-4 py-2.5 rounded-xl border text-center lg:text-left" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}>
                  <div className="text-lg font-bold text-amber-300">79 Régions</div>
                  <div className="text-[11px]" style={{ color: "#93C5FD" }}>Supervisées par le BEN</div>
                </div>
                <div className="col-span-2 sm:col-span-1 px-4 py-2.5 rounded-xl border text-center lg:text-left" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}>
                  <div className="text-lg font-bold text-emerald-300">+500</div>
                  <div className="text-[11px]" style={{ color: "#93C5FD" }}>Implantations visées</div>
                </div>
              </div>
            </div>
          </div>

          {/* Les 3 Piliers 3R — Grille parfaitement équilibrée */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 items-stretch">
            
            {/* 1. RÉFORME */}
            <div className="rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white border-2 transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: "#0F78C8" }}>
              <div className="px-6 py-5 text-white" style={{ background: "linear-gradient(135deg, #032A4E 0%, #0F78C8 100%)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.18)" }}>
                    <Building2 size={22} color="white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200">Pilier 1</span>
                    <h3 className="font-black text-2xl" style={{ fontFamily: "'Manrope', sans-serif" }}>Réforme</h3>
                  </div>
                </div>
                <div className="text-xs text-sky-100 font-semibold mt-2">Dans l'organisation & la gestion</div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <p className="text-sm leading-relaxed text-slate-600 mb-4">
                    Restructurer nos instances ecclésiales, moderniser la gestion financière et comptable, et garantir une gouvernance intègre, responsable et transparente à chaque échelon de la base au sommet.
                  </p>
                  <div className="p-3.5 rounded-xl mb-4 bg-sky-50 border border-sky-100">
                    <p className="text-xs italic font-semibold text-sky-900 leading-snug">
                      "Tout ce que vous faites, faites-le de bon cœur, comme pour le Seigneur."
                    </p>
                    <span className="text-[11px] font-bold text-sky-700 block mt-1">— Colossiens 3:23</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-sky-600 flex-shrink-0" />
                    <span>Déclarations financières transparentes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-sky-600 flex-shrink-0" />
                    <span>Responsabilité pastorale décentralisée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-sky-600 flex-shrink-0" />
                    <span>Audits et harmonisation comptable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. RÉVEIL */}
            <div className="rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white border-2 transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: "#C8973A" }}>
              <div className="px-6 py-5 text-white" style={{ background: "linear-gradient(135deg, #855C14 0%, #C8973A 100%)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.18)" }}>
                    <Heart size={22} color="white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200">Pilier 2</span>
                    <h3 className="font-black text-2xl" style={{ fontFamily: "'Manrope', sans-serif" }}>Réveil</h3>
                  </div>
                </div>
                <div className="text-xs text-amber-100 font-semibold mt-2">Dans la vie spirituelle & la foi</div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <p className="text-sm leading-relaxed text-slate-600 mb-4">
                    Ranimer la flamme apostolique et la ferveur spirituelle par la prière persévérante, le jeûne, la communion fraternelle sincère et un discipulat profond au sein de chaque foyer et église locale.
                  </p>
                  <div className="p-3.5 rounded-xl mb-4 bg-amber-50 border border-amber-100">
                    <p className="text-xs italic font-semibold text-amber-900 leading-snug">
                      "Cherchez l'Éternel pendant qu'il se trouve ; invoquez-le pendant qu'il est près."
                    </p>
                    <span className="text-[11px] font-bold text-amber-700 block mt-1">— Ésaïe 55:6</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-amber-600 flex-shrink-0" />
                    <span>Mouvement national de prière & jeûne</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-amber-600 flex-shrink-0" />
                    <span>Discipulat intégral et sanctification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-amber-600 flex-shrink-0" />
                    <span>Formation spirituelle des familles</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. RAYONNEMENT */}
            <div className="rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white border-2 transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: "#16A34A" }}>
              <div className="px-6 py-5 text-white" style={{ background: "linear-gradient(135deg, #0F6E31 0%, #16A34A 100%)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.18)" }}>
                    <Globe size={22} color="white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Pilier 3</span>
                    <h3 className="font-black text-2xl" style={{ fontFamily: "'Manrope', sans-serif" }}>Rayonnement</h3>
                  </div>
                </div>
                <div className="text-xs text-emerald-100 font-semibold mt-2">Dans la mission & les œuvres</div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <p className="text-sm leading-relaxed text-slate-600 mb-4">
                    Porter la Bonne Nouvelle dans toutes les contrées non atteintes du Burkina Faso, implanter de nouvelles églises et servir la société par des œuvres chrétiennes d'éducation, de santé et d'entraide.
                  </p>
                  <div className="p-3.5 rounded-xl mb-4 bg-emerald-50 border border-emerald-100">
                    <p className="text-xs italic font-semibold text-emerald-900 leading-snug">
                      "Vous êtes la lumière du monde. Que votre lumière brille devant les hommes."
                    </p>
                    <span className="text-[11px] font-bold text-emerald-700 block mt-1">— Matthieu 5:14-16</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 flex-shrink-0" />
                    <span>Objectif 500 nouvelles implantations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 flex-shrink-0" />
                    <span>Centres de santé & écoles confessionnelles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-600 flex-shrink-0" />
                    <span>Actions compassionnelles au Sahel</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Structure de gouvernance — Les 5 Niveaux Institutionnels */}
          <div className="rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border bg-white" style={{ borderColor: "#D9EEFA" }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-sky-50 text-sky-700">
                  <Layers size={13} />
                  Architecture Institutionnelle
                </div>
                <h3 className="text-2xl font-black text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Structure de gouvernance ecclésiale en 5 niveaux
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Les Centres font le lien stratégique entre les Régions et le Bureau National : chaque membre du BEN supervise un Centre/Région, tandis que les données et déclarations remontent des églises locales vers les sous-régions, puis les régions, les centres et le Bureau National.
                </p>
              </div>
              <button
                onClick={() => onNavigate("apropos")}
                className="btn-secondary text-xs font-bold self-start md:self-auto flex items-center gap-1.5"
              >
                En savoir plus sur l'organisation <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Colonne gauche : Les 5 niveaux hierarchiques */}
              <div className="lg:col-span-8 space-y-3">
                {[
                  {
                    num: "5",
                    niveau: "Niveau National",
                    instance: "Bureau Exécutif National (BEN) & Conseil Général",
                    role: "Présidence Rév. Dr Etienne P. Zongo : vision suprême, orientations doctrinales, arbitrage exécutif et consolidation nationale globale.",
                    mode: "Gouvernance centrale & décision finale",
                    bgBadge: "#032A4E",
                    color: "text-white",
                    bgCard: "linear-gradient(135deg, #032A4E 0%, #083D70 100%)",
                    icon: Shield
                  },
                  {
                    num: "4",
                    niveau: "Échelon des Centres (BEN)",
                    instance: "Centres Ecclésiastiques (Supervision directe par les membres du BEN)",
                    role: "Situés entre les régions et le Bureau National : chaque membre du BEN supervise un Centre regroupant des régions pour assurer la coordination stratégique.",
                    mode: "Supervision inter-régionale BEN",
                    bgBadge: "#0A5490",
                    color: "text-white",
                    bgCard: "linear-gradient(135deg, #0A5490 0%, #0F78C8 100%)",
                    icon: Layers
                  },
                  {
                    num: "3",
                    niveau: "Échelon Régional",
                    instance: "79 Régions Ecclésiastiques (Conseils Régionaux)",
                    role: "Supervision ecclésiastique régionale, coordination des sous-régions, consolidation des rapports et animation pastorale.",
                    mode: "Coordination régionale & visa",
                    bgBadge: "#0F78C8",
                    color: "text-white",
                    bgCard: "linear-gradient(135deg, #0F78C8 0%, #3B82F6 100%)",
                    icon: Globe
                  },
                  {
                    num: "2",
                    niveau: "Échelon Sous-Régional",
                    instance: "Conseils Sous-Régionaux (Présidents de Sous-région)",
                    role: "Coordination et encadrement pastoral de proximité au contact direct des églises locales, suivi fraternel et validation de terrain.",
                    mode: "Proximité & validation de terrain",
                    bgBadge: "#C8973A",
                    color: "text-white",
                    bgCard: "linear-gradient(135deg, #B8832A 0%, #D97706 100%)",
                    icon: MapPin
                  },
                  {
                    num: "1",
                    niveau: "Échelon Local (Base)",
                    instance: "1 842 Églises Locales",
                    role: "Le socle vivant de la communauté : cultes, discipulat, saisie primaire des déclarations financières et statistiques remontées vers le haut.",
                    mode: "Déclarations primaires & culte",
                    bgBadge: "#16A34A",
                    color: "text-white",
                    bgCard: "linear-gradient(135deg, #15803D 0%, #16A34A 100%)",
                    icon: Church
                  },
                ].map((l, i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl text-white shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 transition-all hover:shadow-md hover:scale-[1.01]"
                    style={{ background: l.bgCard }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shadow-sm flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
                        {l.num}
                      </div>
                      <l.icon size={22} className="text-white/80 sm:hidden flex-shrink-0" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">{l.niveau}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/20 text-white">
                          {l.mode}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-white truncate" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        {l.instance}
                      </h4>
                      <p className="text-xs text-slate-100/80 mt-0.5 line-clamp-2">
                        {l.role}
                      </p>
                    </div>

                    <l.icon size={24} className="text-white/40 hidden sm:block flex-shrink-0" />
                  </div>
                ))}
              </div>

              {/* Colonne droite : Principes clés & Accès Intranet */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                  <h4 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    <Shield size={16} className="text-sky-600" />
                    Principes de Collaboration
                  </h4>
                  <ul className="space-y-3.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <strong className="text-slate-800">Délégation claire :</strong> Chaque échelon possède des attributions précises pour favoriser la réactivité.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <strong className="text-slate-800">Remontée ascendante :</strong> Les déclarations saisies localement sont directement consolidées au national.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <strong className="text-slate-800">Supervision BEN :</strong> Les membres du bureau exécutif accompagnent chacun une région ecclésiastique.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">4</div>
                      <div>
                        <strong className="text-slate-800">Unité et communion :</strong> Une vision unifiée au service du Corps du Christ sur l'ensemble du territoire.
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl text-white shadow-md flex flex-col justify-between" style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 100%)" }}>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Engagement Pastoral</span>
                    <h4 className="font-bold text-base text-white mt-1 mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      Au Service du Corps du Christ
                    </h4>
                    <p className="text-xs text-sky-100/90 leading-relaxed mb-4">
                      « Car, comme les membres sont plusieurs dans un seul corps, et que tous les membres n'ont pas la même fonction, ainsi nous qui sommes plusieurs, nous formons un seul corps en Christ. »
                    </p>
                    <div className="text-[11px] font-semibold text-amber-300 italic">
                      — Romains 12:4-5
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/15 flex items-center justify-between text-xs text-sky-200">
                    <span>1 842 églises locales unies</span>
                    <span className="font-bold text-white">Burkina Faso</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{ background: "#032A4E", color: "#94A3B8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="px-3 py-2 rounded-xl" style={{ background: "white", display: "inline-flex" }}>
                  <img src={adLogo} alt="AD/BF" className="h-8 object-contain" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}></div>
                  <div className="text-xs" style={{ color: "#64748B" }}>Assemblées de Dieu</div>
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
                {[
                  { label: "Accueil", page: "home" },
                  { label: "À propos", page: "apropos" },
                  { label: "Actualités", page: "actualites" },
                  { label: "Événements", page: "evenements" },
                  { label: "Contact", page: "contact" },
                ].map(l => (
                  <li key={l.page}><button onClick={() => onNavigate(l.page)} style={{ color: "#64748B", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "14px", padding: 0 }} onMouseEnter={e => e.currentTarget.style.color = "#ffffff"} onMouseLeave={e => e.currentTarget.style.color = "#64748B"}>{l.label}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Services</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Bibliothèque numérique", page: "bibliotheque-pub" },
                  { label: "Sondages", page: "sondages-pub" },
                  { label: "Mission", page: "mission" },
                  { label: "Espace membre", page: "login" },
                ].map(l => (
                  <li key={l.page}><button onClick={() => onNavigate(l.page)} style={{ color: "#64748B", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "14px", padding: 0 }} onMouseEnter={e => e.currentTarget.style.color = "#ffffff"} onMouseLeave={e => e.currentTarget.style.color = "#64748B"}>{l.label}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Contact</h4>
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
