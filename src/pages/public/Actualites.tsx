import { useState } from "react";
import { Search, ArrowRight, Calendar, ArrowLeft, Clock } from "lucide-react";
import img1AG from "../../imports/img1_AG.jpeg";
import imgCGE1 from "../../imports/WhatsApp_Image_2026-09-12_at_12.43.44__2_.jpeg";
import imgTemple from "../../imports/WhatsApp_Image_2026-09-12_at_12.43.44.jpeg";
import imgCGE2 from "../../imports/WhatsApp_Image_2026-09-12_at_12.43.45.jpeg";
import imgYouth from "../../imports/WhatsApp_Image_2026-09-12_at_12.43.44__1_.jpeg";
import imgCGE3 from "../../imports/WhatsApp_Image_2026-09-12_at_12.43.46.jpeg";
import imgBallot from "../../imports/WhatsApp Image 2026-09-12 at 12.43.47.jpeg";
import imgCGE4 from "../../imports/WhatsApp_Image_2026-09-12_at_12.43.50__1_.jpeg";

const articles = [
  {
    id: 1,
    img: img1AG,
    category: "Ministère", date: "28 août 2026", readTime: "5 min", featured: true,
    title: "Conférence nationale des pasteurs : 2 340 leaders réunis à Ouagadougou",
    summary: "La rencontre annuelle des pasteurs des Assemblées de Dieu du Burkina Faso a réuni plus de deux mille responsables d'église pour trois jours d'enseignement et de vision partagée autour de la Vision 3R.",
    content: [
      "Du 25 au 27 août 2026, la capitale burkinabè a vibré au rythme d'une mobilisation inédite. Plus de 2 340 pasteurs et responsables d'église des Assemblées de Dieu du Burkina Faso ont convergé vers Ouagadougou pour la Conférence Nationale Annuelle des Pasteurs, l'un des événements ecclésiastiques les plus importants du calendrier AD/BF.",
      "Répartis en plénières, ateliers thématiques et groupes régionaux, les participants ont consacré trois jours intenses à l'approfondissement de la Vision 3R — Réveil, Réforme, Rayonnement — qui constitue la boussole stratégique du mouvement pour la période 2024–2030.",
      "\"Cette conférence n'est pas un rassemblement ordinaire\", a déclaré le Président National lors de la séance d'ouverture. \"C'est un moment de réalignement collectif. Nous venons chercher, ensemble, la direction que Dieu trace pour notre peuple.\" Ces mots ont donné le ton de trois jours marqués par des temps d'intercession prolongés, des enseignements ancrés dans la réalité burkinabè, et un esprit de fraternité qui a frappé les observateurs.",
      "Parmi les temps forts : une session dédiée à la gestion de l'église face aux crises sécuritaires, un atelier sur le discipulat intégral animé par le leadership national, et une plénière sur la rigueur financière de l'église locale qui a réuni plus de 800 participants simultanément.",
      "À l'issue des trois journées, les délégués ont adopté une résolution commune appelant à l'implantation de nouvelles assemblées et au renforcement de la formation théologique pastorale.",
    ],
  },
  {
    id: 2,
    img: imgCGE1,
    category: "Gouvernance", date: "26 août 2026", readTime: "4 min", featured: false,
    title: "Conseil Général Extraordinaire : Mise en conformité avec les nouvelles dispositions statutaires",
    summary: "Sous le thème biblique « Jésus dit : Je bâtirai mon Église », le Conseil Général Extraordinaire a adopté d'importantes résolutions institutionnelles pour consolider l'organisation de l'Église.",
    content: [
      "Le 26 août 2026 restera gravé dans les annales des Assemblées de Dieu du Burkina Faso avec la tenue du Conseil Général Extraordinaire, placé sous le mot d'ordre solennel : « Mise en conformité avec les nouvelles dispositions — Jésus dit : Je bâtirai mon Église ».",
      "Les délégués venus de l'ensemble des centres, régions et sous-régions ecclésiastiques ont examiné et approuvé les réformes institutionnelles et les nouveaux statuts révisés, visant à adapter le fonctionnement de l'Église aux défis contemporains.",
      "Dans son allocution magistrale, le Bureau Exécutif National a réaffirmé que cette mise en conformité vise à préserver l'unité du corps du Christ, à assurer la transparence administrative et à doter l'institution de structures saines et pérennes.",
      "Les résolutions adoptées ouvrent une ère nouvelle de renforcement de la gouvernance à tous les échelons : national, centres de supervision, régions, sous-régions et églises locales.",
    ],
  },
  {
    id: 3,
    img: imgTemple,
    category: "Infrastructures", date: "18 août 2026", readTime: "3 min", featured: false,
    title: "Temple Shiloh de Tanghin Taambila : Modernisation des grands complexes nationaux",
    summary: "Le Bureau Exécutif National poursuit le développement des grands complexes ecclésiastiques et des centres logistiques pour soutenir le rayonnement de l'Église.",
    content: [
      "Le complexe du Temple Shiloh de Tanghin Taambila témoigne de la montée en puissance des infrastructures des Assemblées de Dieu au Burkina Faso. Conçu pour accueillir les grands rassemblements nationaux et régionaux, le site bénéficie d'aménagements modernes.",
      "L'organisation logistique mise en place lors des grands événements comprend des zones de stationnement adaptées aux convois et transports interurbains, des espaces d'accueil pour les délégations provinciales et des dispositifs techniques de pointe.",
      "Le Bureau National réaffirme son engagement à doter les églises régionales d'infrastructures dignes, sûres et adaptées à l'accueil de milliers de fidèles dans les meilleures conditions de culte et de fraternité.",
    ],
  },
  {
    id: 4,
    img: imgCGE2,
    category: "Mission", date: "12 août 2026", readTime: "4 min", featured: false,
    title: "Mobilisation pastorale et missionnaire : Les délégués régionaux au rendez-vous",
    summary: "Venus des 79 régions ecclésiastiques et des centres de supervision, les délégués ont manifesté une ferveur exemplaire pour la mission et la communion fraternelle.",
    content: [
      "Dès les premières heures de la matinée, pasteurs, anciens et responsables des régions ecclésiastiques ont afflué vers le grand complexe pour participer aux assises nationales de l'Église.",
      "Vêtus des tenues officielles et traditionnelles burkinabè, les délégués ont illustré la richesse et la diversité culturelle unies dans une même foi en Jésus-Christ.",
      "Les échanges de couloir et les temps de prière partagée ont renforcé les liens fraternels entre serviteurs de Dieu oeuvrant parfois dans des localités isolées. Cette communion fraternelle réaffirme la solidarité de tout le corps pastoral national.",
    ],
  },
  {
    id: 5,
    img: imgYouth,
    category: "Jeunesse", date: "28 juillet 2026", readTime: "3 min", featured: false,
    title: "Convention nationale des jeunes : Mobilisation des équipes et volontaires",
    summary: "Des centaines de volontaires en chasubles officielles et des milliers de jeunes se sont mobilisés avec zèle pour le service, la logistique et l'action missionnaire.",
    content: [
      "La jeunesse des Assemblées de Dieu du Burkina Faso démontre un dynamisme remarquable au service de l'Église et de la nation. Équipés de gilets de service et de badges d'accréditation, les comités de jeunes ont assuré avec brio la sécurité, l'orientation et l'accueil des milliers de participants.",
      "Le département de la jeunesse des AD continue d'inculquer des valeurs de discipline chrétienne, d'intégrité civique et de consécration spirituelle aux nouvelles générations.",
      "De nombreux jeunes ont témoigné de leur désir de s'investir durablement dans l'évangélisation, les ministères locaux et les projets communautaires d'entraide.",
    ],
  },
  {
    id: 6,
    img: imgCGE3,
    category: "Ministère", date: "15 juillet 2026", readTime: "3 min", featured: false,
    title: "Célébration et louange : Des moments d'adoration intense aux assises de l'Église",
    summary: "Les ministères de louange et les musiciens ont conduit l'assemblée dans des temps exceptionnels d'intercession, d'édification et de célébration.",
    content: [
      "L'adoration et la louange constituent le cœur battant des grands rassemblements des Assemblées de Dieu. Les chorales et musiciens instrumentistes ont su créer une atmosphère propice à l'écoute de la Parole de Dieu et au renouvellement spirituel.",
      "Guitares, percussions, cuivres et chœurs ont rythmé les cantiques en langues nationales et en français, élevant des prières ferventes pour la paix et la bénédiction sur le Burkina Faso.",
      "Ces temps de culte et de consécration ont rappelé que toute action administrative et pastorale puise sa source dans l'intimité avec le Seigneur et la puissance du Saint-Esprit.",
    ],
  },
  {
    id: 7,
    img: imgBallot,
    category: "Gouvernance", date: "2 juillet 2026", readTime: "3 min", featured: false,
    title: "Commissions statutaires et scrutins : Rigueur et transparence dans le dépouillement",
    summary: "La commission de dépouillement a procédé au comptage minutieux des scrutins dans le strict respect des règles statutaires et de l'ordre ecclésial.",
    content: [
      "Dans le cadre de l'adoption des résolutions statutaires du Conseil Général, la commission électorale et de dépouillement a opéré avec une rigueur irréprochable sous le regard attentif des délégués scrutateurs.",
      "Chaque bulletin a été vérifié, décompté et enregistré conformément aux normes établies par les statuts révisés, illustrant l'engagement des Assemblées de Dieu pour la transparence et la bonne gouvernance.",
      "Cette gouvernance intègre reflète le principe fondamental selon lequel l'administration de l'Église doit être menée avec la même fidélité et sainteté que la prédication de l'Évangile.",
    ],
  },
  {
    id: 8,
    img: imgCGE4,
    category: "Leadership", date: "20 juin 2026", readTime: "4 min", featured: false,
    title: "Allocution du Président National Rév. Dr Etienne P. Zongo : « Servir avec humilité et vérité »",
    summary: "Accueilli chaleureusement par les pasteurs et délégués, le Président National a rappelé la primauté de l'intégrité, du pardon et du service désintéressé pour le Royaume.",
    content: [
      "À son arrivée aux assises nationales, le Révérend Docteur Etienne P. Zongo, Président National du Bureau Exécutif des Assemblées de Dieu du Burkina Faso, a été chaleureusement accueilli par le collège pastoral et les délégations régionales.",
      "Dans une allocution inspirée et percutante, le Président National a exhorté les pasteurs et conducteurs spirituels à placer l'intérêt supérieur du Corps du Christ au-dessus des ambitions personnelles : « Dans l'Église, nous ne sommes pas propriétaires de nos fonctions. Nous sommes des serviteurs ».",
      "Il a appelé à vivre concrètement les trois impératifs de la Vision 3R : un Réveil spirituel authentique, une Réforme en profondeur des pratiques, et un Rayonnement qui transforme la société burkinabè dans l'amour et la vérité.",
    ],
  },
];

const categories = ["Toutes", "Ministère", "Gouvernance", "Infrastructures", "Mission", "Jeunesse", "Leadership"];
type Article = typeof articles[0];

export default function Actualites({ initialArticleId }: { initialArticleId?: number | null }) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("Toutes");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(
    initialArticleId ? (articles.find(a => a.id === initialArticleId) ?? null) : null
  );

  const featured = articles[0];
  const rest = articles.slice(1).filter(a => {
    const matchCat = selectedCat === "Toutes" || a.category === selectedCat;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openArticle = (a: Article) => {
    setSelectedArticle(a);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── ARTICLE COMPLET ── */
  if (selectedArticle) return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 60%, #0F78C8 100%)", padding: "48px 0 36px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: "#93C5FD", background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft size={15} /> Retour aux actualités
          </button>
          <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#E8C98A" }}>{selectedArticle.category}</div>
        </div>
      </section>

      <section className="py-12" style={{ background: "#F8F9FC" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-8" style={{ height: 340 }}>
            <img src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#D9EEFA", color: "#0A5490" }}>{selectedArticle.category}</span>
            <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={12} /> {selectedArticle.date}</span>
            <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {selectedArticle.readTime} de lecture</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-6 leading-snug" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{selectedArticle.title}</h1>

          {/* Chapeau */}
          <p className="text-base font-medium leading-relaxed mb-8 pb-8" style={{ color: "#374151", borderBottom: "1px solid #E8EDF8" }}>{selectedArticle.summary}</p>

          {/* Corps */}
          <div className="space-y-5 mb-12">
            {selectedArticle.content.map((para, i) => (
              <p key={i} className="text-base leading-8" style={{ color: "#374151", fontFamily: "'Inter', sans-serif" }}>{para}</p>
            ))}
          </div>

          {/* Autres articles */}
          <div className="border-t pt-10" style={{ borderColor: "#E8EDF8" }}>
            <h3 className="font-bold mb-5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Autres actualités</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articles.filter(a => a.id !== selectedArticle.id).slice(0, 4).map(a => (
                <div key={a.id} onClick={() => openArticle(a)} className="card group cursor-pointer flex gap-3 p-4" style={{ borderRadius: "12px" }}>
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold" style={{ color: "#0F78C8" }}>{a.category}</span>
                    <p className="text-xs font-bold leading-snug line-clamp-2 mt-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#374151" }}>{a.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  /* ── LISTE ── */
  return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 60%, #0F78C8 100%)", padding: "72px 0 56px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#E8C98A" }}>Actualités</div>
          <h1 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>Dernières nouvelles</h1>
          <p className="text-base max-w-xl mx-auto mb-8" style={{ color: "#CBD5E1" }}>Restez informé de la vie et des activités des Assemblées de Dieu du Burkina Faso.</p>
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un article…" className="w-full rounded-xl pl-11 pr-4 py-3 text-sm" style={{ background: "white", border: "none", outline: "none", fontFamily: "'Inter', sans-serif", color: "#334155" }} />
          </div>
        </div>
      </section>

      <section className="py-12" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map(c => (
              <button key={c} onClick={() => setSelectedCat(c)} style={{ background: selectedCat === c ? "#0F78C8" : "white", color: selectedCat === c ? "white" : "#64748B", border: `1px solid ${selectedCat === c ? "#0F78C8" : "#D9EEFA"}`, padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.15s" }}>
                {c}
              </button>
            ))}
          </div>

          {/* Article à la une */}
          {selectedCat === "Toutes" && !search && (
            <div onClick={() => openArticle(featured)} className="card overflow-hidden mb-8 group cursor-pointer" style={{ borderRadius: "16px" }}>
              <div className="lg:flex">
                <div className="overflow-hidden lg:w-1/2" style={{ height: 320 }}>
                  <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="badge badge-info">{featured.category}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={12} /> {featured.date}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#FDF4E0", color: "#9A6F22" }}>À la une</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 leading-snug" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{featured.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{featured.summary}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#0F78C8" }}>
                    Lire l'article complet <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(a => (
              <div key={a.id} onClick={() => openArticle(a)} className="card overflow-hidden group cursor-pointer flex flex-col" style={{ borderRadius: "14px", transition: "all 0.2s" }}>
                <div className="overflow-hidden" style={{ height: 200 }}>
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="badge badge-info text-xs">{a.category}</span>
                    <span className="text-xs text-gray-400">{a.date}</span>
                    <span className="text-xs text-gray-300 flex items-center gap-0.5"><Clock size={10} /> {a.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-2 leading-snug line-clamp-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{a.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">{a.summary}</p>
                  <span className="mt-4 text-xs font-semibold flex items-center gap-1" style={{ color: "#C8973A" }}>
                    Lire la suite <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {rest.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Search size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-sm">Aucun article trouvé pour votre recherche.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
