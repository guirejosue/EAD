import { Mic, TrendingUp, Globe, Users, Church, Award, BookOpen, Heart, Calendar } from "lucide-react";
import img2AG from "../../imports/img2_AG.jpeg";
import img1AG from "../../imports/img1_AG.jpeg";
import imgPresident from "../../imports/WhatsApp_Image_2026-09-12_at_12.43.49.jpeg";
import imgBatiment from "../../imports/WhatsApp_Image_2026-09-12_at_12.43.50.jpeg";

const timeline = [
  { year: "1921", title: "Fondation au Burkina Faso", desc: "Les premières missionnaires des Assemblées de Dieu arrivent au Burkina Faso (alors Haute-Volta) et plantent les premières communautés de foi." },
  { year: "1952", title: "Première église nationale", desc: "Création de la première structure nationale avec des pasteurs burkinabè formés et ordonnés au service des communautés locales." },
  { year: "1975", title: "Indépendance administrative", desc: "Les Assemblées de Dieu du Burkina Faso deviennent autonomes et établissent leur propre Bureau National à Ouagadougou." },
  { year: "1999", title: "Institut Biblique de Ouagadougou", desc: "Inauguration de l'Institut Biblique national, formant des centaines de responsables d'église chaque année." },
  { year: "2018", title: "Lancement de la Vision 3R", desc: "Adoption officielle de la Vision 3R (Réveil, Réforme, Rayonnement) comme feuille de route stratégique de l'église à l'horizon 2030." },
  { year: "2026", title: "1 842 églises locales", desc: "Le réseau compte aujourd'hui 1 842 assemblées locales réparties dans les 79 régions ecclésiastiques du Burkina Faso." },
];

const orgChart = {
  president: {
    nom: "Dr Etienne ZONGO",
    role: "Président",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&face",
    color: "#0F78C8",
    bg: "#D9EEFA",
  },
  vicePresident: {
    nom: "Dr Jephté SAWADOGO",
    role: "Vice-Président",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format&face",
    color: "#0A5490",
    bg: "#EBF6FD",
  },
  niveau2: [
    { nom: "Dr Salomon SAWADOGO", role: "Secrétaire Général", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format&face", color: "#16A34A", bg: "#DCFCE7" },
    { nom: "Dr Jean Marie BADIEL", role: "Secrétaire Général Adjoint", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&auto=format&face", color: "#16A34A", bg: "#DCFCE7" },
    { nom: "Dr Enoch YAMEOGO", role: "Trésorier Général", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&auto=format&face", color: "#C8973A", bg: "#FDF4E0" },
    { nom: "Dr Timothé BALBONE", role: "Trésorier Général Adjoint", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&auto=format&face", color: "#C8973A", bg: "#FDF4E0" },
    { nom: "Dr Philippe OUEDRAOGO", role: "Membre du Bureau", img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop&auto=format&face", color: "#7C3AED", bg: "#EDE9FE" },
  ],
  niveau3: [],
};

const valeurs = [
  { icon: BookOpen, title: "La Parole", desc: "L'autorité absolue de la Bible dans tous les aspects de la vie et du ministère.", color: "#0F78C8", bg: "#D9EEFA" },
  { icon: Heart, title: "La Prière", desc: "Un engagement constant dans la prière communautaire et personnelle comme fondement de notre action.", color: "#DC2626", bg: "#FEE2E2" },
  { icon: Users, title: "La Communauté", desc: "Le corps de Christ uni dans la diversité ethnique, régionale et culturelle du Burkina Faso.", color: "#16A34A", bg: "#DCFCE7" },
  { icon: Globe, title: "La Mission", desc: "L'appel universel à évangéliser toutes les nations, en commençant par notre propre pays.", color: "#C8973A", bg: "#FDF4E0" },
];

export default function Apropos() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 50%, #0F78C8 100%)", padding: "96px 0 72px" }}>
        <div className="absolute inset-0">
          <img src={imgBatiment} alt="Siège des Assemblées de Dieu du Burkina Faso" className="w-full h-full object-cover opacity-20" style={{ objectPosition: "center 30%" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(200,151,58,0.15)", border: "1px solid rgba(200,151,58,0.3)" }}>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#E8C98A" }}>Depuis 1921</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
            À propos des AD/BF
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#CBD5E1" }}>
            Plus d'un siècle d'engagement évangélique au cœur du Burkina Faso: notre histoire, nos valeurs, notre vision.
          </p>
        </div>
        {/* Photo du Bureau National en bas du hero */}
        <div className="relative max-w-3xl mx-auto px-4 mt-12">
          <img src={img2AG} alt="Bureau National des Assemblées de Dieu du Burkina Faso" className="w-full rounded-2xl object-cover shadow-2xl" style={{ maxHeight: 340, objectPosition: "top" }} />
          <div className="absolute bottom-3 left-7 right-7 rounded-xl px-4 py-2 text-center" style={{ background: "rgba(3,42,78,0.82)", backdropFilter: "blur(6px)" }}>
            <p className="text-xs font-semibold text-white">Bureau National: Assemblées de Dieu du Burkina Faso</p>
          </div>
        </div>
      </section>

      {/* Stats rapides */}
      <section className="py-14" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { icon: Church, label: "Églises locales", value: "1 842", color: "#0F78C8", bg: "#D9EEFA" },
              { icon: Users, label: "Membres", value: "487 000", color: "#16A34A", bg: "#DCFCE7" },
              { icon: Award, label: "Années de présence", value: "105", color: "#C8973A", bg: "#FDF4E0" },
              { icon: Globe, label: "Régions couvertes", value: "79 / 79", color: "#0D67B0", bg: "#D9EEFA" },
            ].map(s => (
              <div key={s.label} className="stat-card text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: s.bg }}>
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
                <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision 3R */}
      <section className="py-20" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C8973A" }}>Notre cap stratégique</div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>La Vision 3R — Horizon 2030</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">Trois piliers adoptés en 2018 pour guider le développement de toutes nos assemblées jusqu'en 2030.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { letter: "R", title: "Réveil", subtitle: "Renouveau spirituel profond", desc: "Un réveil spirituel touchant chaque église locale, chaque famille et chaque individu à travers la prière, l'adoration et la Parole. Objectif : 80% des assemblées engagées dans un programme de prière continue d'ici 2028.", icon: Mic, color: "#0F78C8", light: "#D9EEFA", progress: 78 },
              { letter: "R", title: "Réforme", subtitle: "Transformation structurelle", desc: "Une transformation des pratiques ecclésiales, de la gouvernance et de la formation des leaders. Cela inclut la révision des statuts, le renforcement de la formation théologique et la transparence financière.", icon: TrendingUp, color: "#C8973A", light: "#FDF4E0", progress: 65 },
              { letter: "R", title: "Rayonnement", subtitle: "Expansion missionnaire", desc: "Une expansion missionnaire et un témoignage social qui atteignent les nations, en commençant par les zones non évangélisées du Burkina Faso, les pays voisins du Sahel et au-delà.", icon: Globe, color: "#16A34A", light: "#DCFCE7", progress: 72 },
            ].map(v => (
              <div key={v.title} className="relative overflow-hidden rounded-2xl p-8" style={{ border: "1px solid #D9EEFA", background: "white", boxShadow: "0 2px 12px rgba(11,31,75,0.06)" }}>
                <div className="absolute top-4 right-4 text-8xl font-black opacity-5" style={{ fontFamily: "'Manrope', sans-serif", color: v.color, lineHeight: 1 }}>{v.letter}</div>
                <div className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center" style={{ background: v.light }}>
                  <v.icon size={24} style={{ color: v.color }} />
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: v.color }}>{v.title}</h3>
                <p className="text-xs font-semibold mb-4" style={{ color: "#64748B" }}>{v.subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{v.desc}</p>
                <div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C8973A" }}>Ce en quoi nous croyons</div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Nos valeurs fondamentales</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valeurs.map(v => (
              <div key={v.title} className="card p-7 text-center" style={{ background: "white" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: v.bg }}>
                  <v.icon size={26} style={{ color: v.color }} />
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Histoire / Timeline */}
      <section className="py-24" style={{ background: "white" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C8973A" }}>Notre parcours</div>
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Un siècle d'histoire</h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto">De 1921 à aujourd'hui, une trajectoire de foi, d'engagement et de croissance au cœur du Burkina Faso.</p>
          </div>

          <div className="relative">
            {/* Ligne centrale */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(to bottom, #D9EEFA 0%, #0F78C8 40%, #C8973A 100%)" }} />

            <div className="space-y-0">
              {timeline.map((t, i) => {
                const isLeft = i % 2 === 0;
                const isLast = i === timeline.length - 1;
                const dotColor = isLast ? "#C8973A" : "#0F78C8";
                const cardBg = isLast ? "linear-gradient(135deg, #FDF4E0 0%, #FEF9EE 100%)" : "linear-gradient(135deg, #EBF6FD 0%, #F8FCFF 100%)";
                const borderColor = isLast ? "#F3D98A" : "#B3D9F6";
                return (
                  <div key={t.year} className="relative flex items-center" style={{ minHeight: 120, paddingBottom: i < timeline.length - 1 ? 0 : 0 }}>
                    {/* Côté gauche */}
                    <div className="flex-1 flex justify-end pr-10">
                      {isLeft ? (
                        <div className="max-w-xs w-full p-6 rounded-2xl shadow-sm" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
                          <div className="text-2xl font-black mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: dotColor }}>{t.year}</div>
                          <h3 className="font-bold text-sm mb-2 leading-snug" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{t.title}</h3>
                          <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                        </div>
                      ) : (
                        <div className="max-w-xs w-full" />
                      )}
                    </div>

                    {/* Nœud central */}
                    <div className="relative z-10 flex-shrink-0 flex flex-col items-center" style={{ width: 56 }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md" style={{ background: dotColor, border: "4px solid white", boxShadow: `0 0 0 3px ${isLast ? "#F3D98A" : "#B3D9F6"}, 0 4px 12px rgba(0,0,0,0.12)` }}>
                        <Calendar size={14} color="white" />
                      </div>
                    </div>

                    {/* Côté droit */}
                    <div className="flex-1 flex justify-start pl-10">
                      {!isLeft ? (
                        <div className="max-w-xs w-full p-6 rounded-2xl shadow-sm" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
                          <div className="text-2xl font-black mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: dotColor }}>{t.year}</div>
                          <h3 className="font-bold text-sm mb-2 leading-snug" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{t.title}</h3>
                          <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                        </div>
                      ) : (
                        <div className="max-w-xs w-full" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile : version linéaire */}
          <style>{`
            @media (max-width: 640px) {
              .timeline-desktop { display: none; }
              .timeline-mobile { display: block; }
            }
            @media (min-width: 641px) {
              .timeline-mobile { display: none; }
            }
          `}</style>
        </div>

        {/* Version mobile (liste verticale propre) */}
        <div className="timeline-mobile max-w-lg mx-auto px-4 mt-4 hidden sm:hidden">
          <div className="relative pl-10">
            <div className="absolute left-3 top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(to bottom, #D9EEFA, #C8973A)" }} />
            <div className="space-y-6">
              {timeline.map((t, i) => {
                const isLast = i === timeline.length - 1;
                const dotColor = isLast ? "#C8973A" : "#0F78C8";
                return (
                  <div key={t.year} className="relative">
                    <div className="absolute -left-7 top-3 w-4 h-4 rounded-full border-2 border-white" style={{ background: dotColor, boxShadow: `0 0 0 2px ${isLast ? "#F3D98A" : "#B3D9F6"}` }} />
                    <div className="p-5 rounded-xl" style={{ background: isLast ? "#FDF4E0" : "#EBF6FD", border: `1px solid ${isLast ? "#F3D98A" : "#B3D9F6"}` }}>
                      <div className="text-xl font-black mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: dotColor }}>{t.year}</div>
                      <h3 className="font-bold text-sm mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{t.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Organigramme Bureau National */}
      <section className="py-24 overflow-x-auto" style={{ background: "#F8F9FC" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C8973A" }}>Bureau National</div>
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Organigramme du leadership</h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto">Structure de gouvernance des Assemblées de Dieu du Burkina Faso.</p>
          </div>

          <div className="flex flex-col items-center">

            {/* ── Niveau 1 : Président ── */}
            <div className="relative px-8 py-6 rounded-2xl text-center shadow-lg" style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 100%)", border: "3px solid #0F78C8", width: 300 }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase" style={{ background: "#C8973A", color: "white", whiteSpace: "nowrap" }}>Président</div>
              <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden" style={{ border: "3px solid rgba(255,255,255,0.4)" }}>
                <img src={imgPresident} alt="Rév. Dr Etienne ZONGO" className="w-full h-full object-cover" style={{ objectPosition: "center 10%" }} />
              </div>
              <div className="font-bold text-white text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>{orgChart.president.nom}</div>
              <div className="text-xs mt-1" style={{ color: "#93C5FD" }}>{orgChart.president.role}</div>
            </div>

            {/* Connecteur */}
            <div className="w-0.5 h-8" style={{ background: "#0F78C8" }} />

            {/* ── Niveau 2 : Vice-Président ── */}
            <div className="relative px-6 py-5 rounded-2xl text-center shadow-md" style={{ background: "white", border: "2px solid #B3D9F6", width: 280 }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#0F78C8", color: "white", whiteSpace: "nowrap" }}>Vice-Président</div>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-base" style={{ background: "#EBF6FD", color: "#0F78C8", border: "2px solid #B3D9F6" }}>
                {orgChart.vicePresident.nom.split(" ").slice(-1)[0][0]}
              </div>
              <div className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{orgChart.vicePresident.nom}</div>
              <div className="text-xs mt-1" style={{ color: "#64748B" }}>{orgChart.vicePresident.role}</div>
            </div>

            {/* Connecteur vers membres */}
            <div className="w-0.5 h-8" style={{ background: "#CBD5E1" }} />

            {/* ── Membres du Bureau ── */}
            <div className="flex flex-wrap gap-4 justify-center">
              {orgChart.niveau2.map(p => (
                <div key={p.nom} className="relative px-5 py-5 rounded-2xl text-center shadow-sm" style={{ background: "white", border: `2px solid ${p.bg === "#FDF4E0" ? "#F3D98A" : p.bg === "#DCFCE7" ? "#86EFAC" : "#C4B5FD"}`, width: 195 }}>
                  <div className="w-5 h-5 rounded-full absolute -top-2.5 left-1/2 -translate-x-1/2" style={{ background: p.color, border: "2px solid white" }} />
                  <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-sm" style={{ background: p.bg, color: p.color }}>
                    {p.nom.split(" ").slice(-1)[0][0]}
                  </div>
                  <div className="font-bold text-xs leading-snug mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#032A4E" }}>{p.nom}</div>
                  <div className="text-xs leading-tight" style={{ color: "#64748B" }}>{p.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Légende */}
          <div className="flex flex-wrap justify-center gap-5 mt-14">
            {[
              { label: "Présidence", color: "#032A4E" },
              { label: "Vice-Présidence", color: "#0F78C8" },
              { label: "Membres du Bureau", color: "#94A3B8" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
