import { useState } from "react";
import {
  Search, Star, BookOpen, ArrowLeft, ShoppingCart, Download,
  CheckCircle, CreditCard, Smartphone, ChevronRight, Eye,
  ChevronLeft, MessageSquare, Lock, Send,
} from "lucide-react";

type Book = typeof books[0];

const books = [
  {
    id: 1,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=560&fit=crop&auto=format",
    title: "La Vision 3R Expliquée",
    author: "Pasteur Samuel Kaboré",
    category: "Théologie",
    pages: 184,
    format: "PDF + ePub",
    price: 3500,
    free: false,
    rating: 4.8,
    reviews: 124,
    desc: "Une exploration approfondie de la Vision 3R des Assemblées de Dieu du Burkina Faso — Réveil, Réforme, Rayonnement. Ce livre examine les fondements bibliques et les implications pratiques pour chaque église locale.",
    extrait: "La Vision 3R n'est pas un programme parmi d'autres. C'est une conviction profonde que Dieu veut faire quelque chose de nouveau au Burkina Faso. Elle repose sur trois convictions bibliques fondamentales…",
    annee: "2024",
    langue: "Français",
    chapters: [
      { title: "Introduction : Pourquoi une vision ?", content: "La Vision 3R est née d'une rencontre profonde avec la Parole de Dieu. Au fil des années, les responsables des Assemblées de Dieu du Burkina Faso ont observé que sans vision, le peuple périt. Cette réalité biblique a conduit à une période de jeûne et de prière collective qui a abouti à la formulation de trois axes stratégiques : Réveil, Réforme et Rayonnement.\n\nChacun de ces axes répond à un diagnostic précis de la situation ecclésiale burkinabè. Le Réveil répond au manque de ferveur spirituelle observé dans certaines communautés. La Réforme répond aux dysfonctionnements organisationnels et doctrinaux. Le Rayonnement répond à l'appel missionnaire qui demeure au cœur de notre identité." },
      { title: "Chapitre 1 : Le Réveil — Revenir à la source", content: "Le premier R, le Réveil, désigne un retour à la vie spirituelle authentique. Il ne s'agit pas d'une simple effusion émotionnelle, mais d'un renouvellement profond de la vie avec Dieu. Dans les Actes des Apôtres, chaque réveil était accompagné de trois signes : la repentance, la prière et la puissance du Saint-Esprit agissant dans la vie des croyants.\n\nLe Burkina Faso a connu des réveils historiques, notamment dans les années 1970 et 1980. Ces périodes se caractérisaient par des conversions massives, une vie de prière intense dans les assemblées locales, et un témoignage public qui transformait les communautés. La Vision 3R appelle à une renaissance de cet esprit." },
      { title: "Chapitre 2 : La Réforme — Bâtir sur des bases solides", content: "La Réforme ne signifie pas rompre avec la tradition. Elle signifie purifier les pratiques qui se sont éloignées de l'Écriture et renforcer les structures qui servent réellement la mission. Dans l'histoire de l'Église, de Luther à Wesley, les grandes réformes ont toujours commencé par un retour aux textes fondateurs.\n\nPour les Assemblées de Dieu du Burkina Faso, la Réforme implique notamment : une formation théologique rigoureuse des pasteurs, une transparence financière à tous les niveaux, un renouvellement des pratiques liturgiques, et une gouvernance ecclésiale plus participative et biblique." },
      { title: "Chapitre 3 : Le Rayonnement — Aller jusqu'aux extrémités", content: "Le troisième R, le Rayonnement, est le fruit naturel des deux premiers. Une église réveillée et réformée ne peut que rayonner. Ce rayonnement prend plusieurs formes dans la vision portée par les AD/BF : évangélisation dans les zones rurales non atteintes, engagement social auprès des plus vulnérables, présence culturelle et intellectuelle dans la société burkinabè.\n\nLe Burkina Faso compte encore de nombreuses zones où l'Évangile n'a pas encore pénétré en profondeur. La Vision 3R fixe un objectif : implanter 500 nouvelles églises d'ici 2030, avec une attention particulière aux régions du Nord et du Sahel." },
    ],
  },
  {
    id: 2,
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=560&fit=crop&auto=format",
    title: "Leadership pastoral en Afrique",
    author: "Dr. Jean-Marc Ouédraogo",
    category: "Leadership",
    pages: 248,
    format: "PDF",
    price: 4000,
    free: false,
    rating: 4.6,
    reviews: 89,
    desc: "Un guide pratique pour les responsables d'église en Afrique subsaharienne, abordant les défis culturels, la gestion des conflits, et le développement d'une vision communautaire ancrée dans les réalités africaines.",
    extrait: "Le leader pastoral africain évolue dans un contexte unique : entre la modernité des villes et les traditions des villages, entre l'influence des médias mondiaux et la réalité de communautés rurales…",
    annee: "2023",
    langue: "Français",
    chapters: [
      { title: "Préface : Le leader pastoral dans l'Afrique d'aujourd'hui", content: "Le leadership pastoral en Afrique subsaharienne est confronté à des défis sans précédent. La mondialisation, l'urbanisation rapide, la montée des nouvelles religions et les crises sécuritaires redessinent le paysage ecclésial africain. Dans ce contexte, le pasteur africain doit être à la fois gardien de la tradition et pionnier de l'innovation.\n\nCet ouvrage s'adresse aux responsables d'église qui cherchent à exercer un leadership enraciné dans les valeurs africaines et bibliques, sans tomber dans le piège de l'imitation des modèles occidentaux ou de l'enfermement dans des traditions qui ne servent plus la mission." },
      { title: "Chapitre 1 : Comprendre le contexte africain", content: "L'Afrique n'est pas un monolithe. Le Burkina Faso n'est pas le Nigeria, et Ouagadougou n'est pas le village de Dori. Tout leader efficace commence par une écoute attentive de son contexte spécifique. Quelles sont les structures de pouvoir traditionnel ? Quels sont les réseaux de solidarité communautaire ? Quelles sont les peurs et les espoirs de la communauté ?\n\nLa collecte de ces données contextuelles n'est pas un luxe académique. C'est une exigence du ministère incarné. Jésus lui-même a pris le temps de connaître les cultures dans lesquelles il évoluait." },
    ],
  },
  {
    id: 3,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=560&fit=crop&auto=format",
    title: "Guide du Discipulat Intégral",
    author: "Pasteur Pierre Sawadogo",
    category: "Discipulat",
    pages: 132,
    format: "PDF + ePub",
    price: 2500,
    free: false,
    rating: 4.9,
    reviews: 201,
    desc: "Un programme structuré de discipulat en 12 semaines, adapté au contexte burkinabè. Inclut des fiches d'animation, des études bibliques et des outils d'évaluation spirituelle.",
    extrait: "Faire des disciples, c'est bien plus qu'enseigner des doctrines. C'est accompagner une vie vers une autre vie. Ce guide propose une méthode éprouvée sur le terrain burkinabè…",
    annee: "2025",
    langue: "Français",
    chapters: [
      { title: "Introduction au discipulat intégral", content: "Le discipulat intégral part d'un constat simple : un chrétien qui grandit dans sa foi grandit dans toutes les dimensions de sa vie. Ce programme de 12 semaines vise à accompagner les nouveaux croyants — et les croyants plus anciens en quête de renouveau — dans un parcours structuré qui touche la vie spirituelle, relationnelle, professionnelle et communautaire.\n\nChaque semaine est organisée autour d'un thème central, d'une étude biblique, d'un temps de partage en groupe et d'une application pratique à mettre en œuvre dans la semaine." },
      { title: "Semaine 1 : Qui suis-je en Christ ?", content: "La première semaine pose le fondement de toute croissance spirituelle : l'identité en Christ. Avant de parler de ce que nous devons faire, ce guide parle de qui nous sommes. Cette approche est délibérée et contre-culturelle : dans nos sociétés africaines, comme dans beaucoup d'autres, la valeur d'une personne est souvent mesurée à ses accomplissements, son statut social ou ses relations familiales.\n\nL'Évangile propose une réalité radicalement différente : notre valeur est établie par Celui qui nous a créés et rachetés, indépendamment de nos performances." },
    ],
  },
  {
    id: 4,
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=560&fit=crop&auto=format",
    title: "Évangélisation dans le contexte sahélien",
    author: "Équipe Mission AD/BF",
    category: "Évangélisation",
    pages: 96,
    format: "PDF",
    price: 0,
    free: true,
    rating: 4.5,
    reviews: 312,
    desc: "Stratégies et méthodologies d'évangélisation adaptées aux contextes ruraux et urbains du Sahel burkinabè. Témoignages et études de cas issus des campagnes 2022–2025.",
    extrait: "L'évangélisation au Sahel ne peut pas ignorer le contexte : la chaleur, les longues distances, la diversité des langues, la présence d'autres religions. Ce manuel propose des approches adaptées…",
    annee: "2025",
    langue: "Français",
    chapters: [
      { title: "Introduction : Évangéliser dans un contexte difficile", content: "Le Sahel burkinabè présente des défis spécifiques pour l'évangélisation : des distances immenses entre les villages, un climat extrême, des tensions interreligieuses parfois vives, et une pauvreté structurelle qui peut rendre le message de l'Évangile difficile à entendre sans un engagement social tangible.\n\nCe manuel ne propose pas de recettes miracles. Il compile plutôt des approches qui ont fait leurs preuves dans les contextes sahéliens du Burkina Faso, tirées des campagnes d'évangélisation menées entre 2022 et 2025." },
      { title: "Chapitre 1 : Comprendre les cultures sahéliennes", content: "Avant d'évangéliser, il faut écouter. Les cultures du Sahel burkinabè — mossi, peul, touareg, bella, et bien d'autres — ont chacune leurs propres codes de communication, leurs structures d'autorité et leurs conceptions du sacré. Un message qui fonctionne dans une culture peut être contre-productif dans une autre.\n\nCe chapitre propose une méthode d'enquête culturelle simple que tout évangéliste peut utiliser avant de débuter un travail dans une nouvelle communauté." },
    ],
  },
  {
    id: 5,
    cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=560&fit=crop&auto=format",
    title: "Finances de l'Église Locale",
    author: "Comité Finance AD/BF",
    category: "Administration",
    pages: 156,
    format: "PDF",
    price: 3000,
    free: false,
    rating: 4.7,
    reviews: 67,
    desc: "Manuel complet de gestion financière pour les responsables d'église : tenue de caisse, comptabilité simplifiée, budgets, dîmes et offrandes. Conforme aux procédures AD/BF 2026.",
    extrait: "La transparence financière est un témoignage. Une église qui gère bien ses ressources montre à sa communauté qu'elle est digne de confiance. Ce manuel vous guidera pas à pas…",
    annee: "2026",
    langue: "Français",
    chapters: [
      { title: "Introduction : Les finances au service de la mission", content: "La gestion financière d'une église n'est pas une affaire de chiffres froids. C'est un acte d'intendance, de responsabilité envers Dieu et envers la communauté. Ce manuel a été conçu pour les responsables d'église qui n'ont pas de formation comptable formelle, mais qui ont la charge de gérer les ressources financières de leur assemblée.\n\nLes principes présentés ici sont conformes aux procédures financières des Assemblées de Dieu du Burkina Faso telles qu'elles ont été révisées en 2026." },
    ],
  },
  {
    id: 6,
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=560&fit=crop&auto=format",
    title: "La Femme dans l'Église de Dieu",
    author: "Sœur Esther Koala",
    category: "Ministère",
    pages: 112,
    format: "PDF + ePub",
    price: 2500,
    free: false,
    rating: 4.4,
    reviews: 88,
    desc: "Une étude biblique et contextuelle du rôle de la femme dans le ministère chrétien en Afrique de l'Ouest. Destiné aux femmes de foi et aux responsables souhaitant mieux intégrer les femmes dans la vie ecclésiale.",
    extrait: "La question du ministère féminin n'est pas nouvelle. De Débora à Priscille, de Marie-Madeleine à Phœbé, les femmes ont toujours occupé une place centrale dans l'histoire du salut…",
    annee: "2024",
    langue: "Français",
    chapters: [
      { title: "Avant-propos : Une question brûlante", content: "Ce livre est né d'une frustration et d'une espérance. La frustration de voir des femmes talentueuses, aimant Dieu profondément, limitées dans leur ministère par des interprétations qui semblent parfois plus culturelles que scripturaires. L'espérance de voir une Église africaine qui libère pleinement les dons que le Saint-Esprit accorde sans distinction de genre.\n\nL'auteure ne prétend pas avoir toutes les réponses. Elle souhaite ouvrir un espace de dialogue sérieux, respectueux et bibliquement fondé sur cette question essentielle." },
    ],
  },
];

const categories = ["Toutes", "Théologie", "Leadership", "Discipulat", "Évangélisation", "Administration", "Ministère"];

type View = "catalog" | "detail" | "reader" | "checkout" | "confirmed";

type UserReview = { name: string; rating: number; text: string; date: string };

const initialReviews: Record<number, UserReview[]> = {
  1: [
    { name: "Frère Emmanuel T.", rating: 5, text: "Un ouvrage fondamental pour comprendre la direction que prend notre mouvement. Je l'ai offert à tous mes anciens.", date: "Mars 2025" },
    { name: "Pasteur Augustin K.", rating: 5, text: "Très bien structuré et ancré dans les réalités locales. Indispensable pour tout responsable AD/BF.", date: "Janvier 2025" },
  ],
  3: [
    { name: "Sœur Mariam O.", rating: 5, text: "J'utilise ce guide dans mon groupe de discipulat depuis 3 mois. Les résultats sont remarquables.", date: "Juin 2025" },
  ],
  4: [
    { name: "Évangéliste David S.", rating: 4, text: "Des stratégies concrètes et adaptées au terrain sahélien. Je recommande à toute équipe missionnaire.", date: "Avril 2025" },
    { name: "Pasteur Isaac B.", rating: 5, text: "Gratuit et pourtant d'une qualité exceptionnelle. Merci à l'équipe Mission AD/BF.", date: "Février 2025" },
  ],
};

export default function PublicBibliotheque({ onNavigate: _onNavigate, initialBookId }: { onNavigate?: (p: string) => void; initialBookId?: number | null }) {
  const initialBook = initialBookId ? (books.find(b => b.id === initialBookId) ?? books[0]) : books[0];
  const [view, setView] = useState<View>(initialBookId ? "detail" : "catalog");
  const [selectedBook, setSelectedBook] = useState<Book>(initialBook);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("Toutes");
  const [paymentMethod, setPaymentMethod] = useState<"mobile" | "card" | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [payLoading, setPayLoading] = useState(false);
  const [readerChapter, setReaderChapter] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [purchasedBooks, setPurchasedBooks] = useState<Set<number>>(new Set());
  const [reviews, setReviews] = useState(initialReviews);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const filtered = books.filter(b => {
    const matchCat = selectedCat === "Toutes" || b.category === selectedCat;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const go = (v: View, book?: Book) => {
    if (book) setSelectedBook(book);
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setPayLoading(true);
    setTimeout(() => {
      setPayLoading(false);
      setPurchasedBooks(prev => new Set(prev).add(selectedBook.id));
      setView("confirmed");
      setReviewSubmitted(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1600);
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;
    const newReview: UserReview = {
      name: reviewName,
      rating: reviewRating,
      text: reviewText,
      date: new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
    };
    setReviews(prev => ({ ...prev, [selectedBook.id]: [newReview, ...(prev[selectedBook.id] ?? [])] }));
    setReviewName("");
    setReviewText("");
    setReviewRating(5);
    setReviewSubmitted(true);
  };

  const fmtFCFA = (v: number) => v === 0 ? "Gratuit" : v.toLocaleString("fr-FR") + " FCFA";
  const hasPurchased = (id: number) => purchasedBooks.has(id) || books.find(b => b.id === id)?.free;
  const bookReviews = reviews[selectedBook.id] ?? [];

  /* ── CATALOGUE ── */
  if (view === "catalog") return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 60%, #0F78C8 100%)", padding: "72px 0 56px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#E8C98A" }}>Bibliothèque numérique</div>
          <h1 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>Ouvrages théologiques & pastoraux</h1>
          <p className="text-base max-w-xl mx-auto mb-8" style={{ color: "#CBD5E1" }}>Parcourez librement notre catalogue. Consultez, lisez des extraits et achetez directement en ligne.</p>
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un titre, un auteur…" className="w-full rounded-xl pl-11 pr-4 py-3 text-sm" style={{ background: "white", border: "none", outline: "none", fontFamily: "'Inter', sans-serif", color: "#334155" }} />
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
            {filtered.map(b => (
              <div key={b.id} onClick={() => go("detail", b)} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-3 shadow-sm group-hover:shadow-md transition-shadow" style={{ height: 220 }}>
                  <img src={b.cover} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {b.free && <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#16A34A", color: "white" }}>Gratuit</div>}
                  <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(to top, rgba(3,42,78,0.7) 0%, transparent 60%)" }}>
                    <span className="text-xs font-semibold text-white flex items-center gap-1">Voir le détail <ChevronRight size={12} /></span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#D9EEFA", color: "#0D67B0" }}>{b.category}</span>
                <h3 className="font-bold text-xs mt-2 leading-snug line-clamp-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{b.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{b.author}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={10} fill="#C8973A" style={{ color: "#C8973A" }} />
                  <span className="text-xs font-semibold" style={{ color: "#C8973A" }}>{b.rating}</span>
                  <span className="text-xs text-gray-300">({b.reviews})</span>
                </div>
                <div className="text-xs font-bold mt-1" style={{ color: b.free ? "#16A34A" : "#C8973A" }}>{fmtFCFA(b.price)}</div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-sm">Aucun ouvrage trouvé.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  /* ── DÉTAIL OUVRAGE ── */
  if (view === "detail") {
    const owned = hasPurchased(selectedBook.id);
    return (
      <div>
        <section style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 60%, #0F78C8 100%)", padding: "48px 0 36px" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <button onClick={() => go("catalog")} className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: "#93C5FD", background: "none", border: "none", cursor: "pointer" }}>
              <ArrowLeft size={15} /> Retour au catalogue
            </button>
            <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#E8C98A" }}>{selectedBook.category}</div>
          </div>
        </section>

        <section className="py-12" style={{ background: "#F8F9FC" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl overflow-hidden shadow-xl mb-6" style={{ aspectRatio: "3/4" }}>
                  <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover" />
                </div>
                <div className="card p-5" style={{ borderRadius: "16px" }}>
                  <div className="text-2xl font-black mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: selectedBook.free ? "#16A34A" : "#C8973A" }}>{fmtFCFA(selectedBook.price)}</div>
                  {!selectedBook.free && <p className="text-xs text-gray-400 mb-4">Paiement sécurisé · Téléchargement immédiat</p>}

                  <div className="flex flex-col gap-2">
                    {/* Lire en ligne */}
                    <button
                      onClick={() => { setReaderChapter(0); go("reader"); }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm"
                      style={{ background: owned ? "#EBF6FD" : "#F1F5F9", color: owned ? "#0F78C8" : "#94A3B8", border: `1px solid ${owned ? "#B3D9F6" : "#E2E8F0"}`, cursor: owned ? "pointer" : "default", fontFamily: "'Inter', sans-serif" }}
                    >
                      <Eye size={15} />
                      {owned ? "Lire en ligne" : "Lire en ligne (après achat)"}
                    </button>

                    {selectedBook.free
                      ? <button
                          onClick={() => { setReaderChapter(0); go("reader"); }}
                          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm"
                          style={{ background: "#16A34A", color: "white", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                        ><Download size={15} /> Télécharger gratuitement</button>
                      : <button
                          onClick={() => { setPaymentMethod(null); setPhoneNumber(""); go("checkout"); }}
                          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm"
                          style={{ background: "#0F78C8", color: "white", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                        ><ShoppingCart size={15} /> {owned ? "Télécharger" : "Acheter cet ouvrage"}</button>
                    }
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-gray-500">
                    {[
                      ["Format", selectedBook.format],
                      ["Pages", `${selectedBook.pages} pages`],
                      ["Langue", selectedBook.langue],
                      ["Année", selectedBook.annee],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-gray-400">{k}</span>
                        <span className="font-semibold" style={{ color: "#374151" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{selectedBook.title}</h1>
                <p className="text-base text-gray-500 mb-3">{selectedBook.author}</p>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= Math.round(selectedBook.rating) ? "#C8973A" : "none"} style={{ color: "#C8973A" }} />)}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "#C8973A" }}>{selectedBook.rating}</span>
                  <span className="text-xs text-gray-400">({bookReviews.length + selectedBook.reviews} avis)</span>
                </div>

                <div className="card p-6 mb-6" style={{ borderRadius: "16px" }}>
                  <h3 className="font-bold mb-3" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>À propos de cet ouvrage</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedBook.desc}</p>
                </div>

                {/* Extrait / aperçu chapitre 1 */}
                <div className="card p-6 mb-6" style={{ borderRadius: "16px", background: "#FAFBFF", border: "1px solid #D9EEFA" }}>
                  <h3 className="font-bold mb-3 flex items-center gap-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>
                    <BookOpen size={16} /> Extrait — {selectedBook.chapters[0].title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                    {selectedBook.chapters[0].content.slice(0, 420)}…
                  </p>
                  {owned && (
                    <button onClick={() => { setReaderChapter(0); go("reader"); }} className="mt-4 text-sm font-semibold flex items-center gap-1" style={{ color: "#0F78C8", background: "none", border: "none", cursor: "pointer" }}>
                      Continuer la lecture <ChevronRight size={14} />
                    </button>
                  )}
                </div>

                {/* Table des matières */}
                <div className="card p-6 mb-8" style={{ borderRadius: "16px" }}>
                  <h3 className="font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Table des matières</h3>
                  <ol className="space-y-2">
                    {selectedBook.chapters.map((ch, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#D9EEFA", color: "#0F78C8" }}>{i + 1}</span>
                        <span style={{ color: "#374151" }}>{ch.title}</span>
                        {!owned && i > 0 && <Lock size={12} style={{ color: "#CBD5E1", flexShrink: 0, marginTop: 3 }} />}
                      </li>
                    ))}
                  </ol>
                  {!owned && (
                    <p className="mt-4 text-xs text-gray-400 flex items-center gap-1">
                      <Lock size={11} /> Les chapitres suivants sont accessibles après achat ou téléchargement.
                    </p>
                  )}
                </div>

                {/* Section Avis */}
                <div className="mb-8">
                  <h3 className="font-bold mb-5 flex items-center gap-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>
                    <MessageSquare size={16} /> Avis des lecteurs ({bookReviews.length + selectedBook.reviews})
                  </h3>

                  {/* Formulaire avis — acheteurs seulement */}
                  {owned ? (
                    reviewSubmitted ? (
                      <div className="card p-5 mb-6 flex items-center gap-3" style={{ borderRadius: "14px", background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                        <CheckCircle size={20} style={{ color: "#16A34A" }} />
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "#15803D" }}>Merci pour votre avis !</p>
                          <p className="text-xs text-gray-500">Votre commentaire a été publié.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="card p-5 mb-6" style={{ borderRadius: "14px", border: "1px solid #D9EEFA" }}>
                        <p className="text-sm font-semibold mb-4" style={{ color: "#0F78C8" }}>Donnez votre avis</p>
                        <form onSubmit={handleReview} className="space-y-3">
                          <div>
                            <label className="form-label">Votre note</label>
                            <div className="flex gap-1 mt-1">
                              {[1,2,3,4,5].map(n => (
                                <button key={n} type="button" onClick={() => setReviewRating(n)}>
                                  <Star size={22} fill={n <= reviewRating ? "#C8973A" : "none"} style={{ color: "#C8973A", cursor: "pointer" }} />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="form-label">Votre nom</label>
                            <input value={reviewName} onChange={e => setReviewName(e.target.value)} placeholder="Frère / Sœur …" className="form-input" required />
                          </div>
                          <div>
                            <label className="form-label">Votre commentaire</label>
                            <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} rows={3} placeholder="Partagez votre expérience de lecture…" className="form-input" style={{ resize: "none" }} required />
                          </div>
                          <button type="submit" className="btn-primary" style={{ padding: "9px 20px" }}>
                            <Send size={14} /> Publier mon avis
                          </button>
                        </form>
                      </div>
                    )
                  ) : (
                    <div className="card p-4 mb-6 flex items-center gap-3" style={{ borderRadius: "14px", background: "#F8F9FC", border: "1px solid #E2E8F0" }}>
                      <Lock size={16} style={{ color: "#94A3B8" }} />
                      <p className="text-sm text-gray-500">Seuls les lecteurs ayant acheté cet ouvrage peuvent laisser un avis.</p>
                    </div>
                  )}

                  {/* Liste des avis */}
                  <div className="space-y-4">
                    {bookReviews.map((r, i) => (
                      <div key={i} className="card p-5" style={{ borderRadius: "14px" }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm" style={{ color: "#0F78C8" }}>{r.name}</span>
                          <span className="text-xs text-gray-400">{r.date}</span>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {[1,2,3,4,5].map(n => <Star key={n} size={12} fill={n <= r.rating ? "#C8973A" : "none"} style={{ color: "#C8973A" }} />)}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                      </div>
                    ))}
                    {bookReviews.length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-4">Aucun avis pour le moment. Soyez le premier à partager votre expérience !</p>
                    )}
                  </div>
                </div>

                {/* Autres ouvrages */}
                <h3 className="font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Autres ouvrages</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {books.filter(b => b.id !== selectedBook.id).slice(0, 3).map(b => (
                    <div key={b.id} onClick={() => go("detail", b)} className="cursor-pointer group">
                      <div className="overflow-hidden rounded-xl mb-2" style={{ height: 120 }}>
                        <img src={b.cover} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <p className="text-xs font-bold leading-snug line-clamp-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{b.title}</p>
                      <p className="text-xs font-bold mt-1" style={{ color: b.free ? "#16A34A" : "#C8973A" }}>{fmtFCFA(b.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ── LECTEUR EN LIGNE ── */
  if (view === "reader") {
    const chapter = selectedBook.chapters[readerChapter];
    const total = selectedBook.chapters.length;
    const progressPct = Math.round(((readerChapter + 1) / total) * 100);
    return (
      <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
        {/* Barre de lecture */}
        <div className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3 shadow-sm" style={{ background: "white", borderBottom: "1px solid #E8EDF8" }}>
          <button onClick={() => go("detail")} className="flex items-center gap-2 text-sm font-medium" style={{ color: "#64748B", background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft size={15} /> <span className="hidden sm:inline">{selectedBook.title}</span>
          </button>
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-32 h-1.5 rounded-full" style={{ background: "#E2E8F0" }}>
              <div className="h-full rounded-full" style={{ background: "#0F78C8", width: `${progressPct}%`, transition: "width 0.3s" }} />
            </div>
            <span className="text-xs text-gray-400">{progressPct}% lu</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:inline">Police</span>
            <button
              onClick={() => setFontSize(s => Math.max(12, s - 2))}
              disabled={fontSize <= 12}
              style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #E2E8F0", background: fontSize <= 12 ? "#F8F9FC" : "white", color: fontSize <= 12 ? "#CBD5E1" : "#374151", cursor: fontSize <= 12 ? "default" : "pointer", fontWeight: 700, fontSize: 16, lineHeight: 1 }}
            >A</button>
            <span className="text-xs font-semibold w-6 text-center" style={{ color: "#0F78C8" }}>{fontSize}</span>
            <button
              onClick={() => setFontSize(s => Math.min(28, s + 2))}
              disabled={fontSize >= 28}
              style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #E2E8F0", background: fontSize >= 28 ? "#F8F9FC" : "white", color: fontSize >= 28 ? "#CBD5E1" : "#374151", cursor: fontSize >= 28 ? "default" : "pointer", fontWeight: 700, fontSize: 20, lineHeight: 1 }}
            >A</button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          {/* Sommaire chapitres */}
          <div className="flex gap-2 flex-wrap mb-10">
            {selectedBook.chapters.map((ch, i) => (
              <button
                key={i}
                onClick={() => setReaderChapter(i)}
                style={{
                  background: i === readerChapter ? "#0F78C8" : "white",
                  color: i === readerChapter ? "white" : "#64748B",
                  border: `1px solid ${i === readerChapter ? "#0F78C8" : "#D9EEFA"}`,
                  padding: "4px 12px", borderRadius: "16px", fontSize: "12px", fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Inter', sans-serif",
                }}
              >
                Ch. {i + 1}
              </button>
            ))}
          </div>

          <div className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#C8973A" }}>
            Chapitre {readerChapter + 1}
          </div>
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{chapter.title}</h2>

          <div className="prose max-w-none">
            {chapter.content.split("\n\n").map((para, i) => (
              <p key={i} className="mb-5 leading-8" style={{ color: "#374151", fontFamily: "'Inter', sans-serif", fontSize: fontSize }}>{para}</p>
            ))}
          </div>

          {/* Navigation entre chapitres */}
          <div className="flex items-center justify-between mt-12 pt-8" style={{ borderTop: "1px solid #E8EDF8" }}>
            <button
              onClick={() => setReaderChapter(c => Math.max(0, c - 1))}
              disabled={readerChapter === 0}
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: readerChapter === 0 ? "#CBD5E1" : "#0F78C8", background: "none", border: "none", cursor: readerChapter === 0 ? "default" : "pointer" }}
            >
              <ChevronLeft size={16} /> Précédent
            </button>
            <span className="text-xs text-gray-400">{readerChapter + 1} / {total}</span>
            {readerChapter < total - 1 ? (
              <button
                onClick={() => setReaderChapter(c => c + 1)}
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: "#0F78C8", background: "none", border: "none", cursor: "pointer" }}
              >
                Suivant <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={() => go("detail")} className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#16A34A", background: "none", border: "none", cursor: "pointer" }}>
                Terminer <CheckCircle size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── PAIEMENT ── */
  if (view === "checkout") return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 60%, #0F78C8 100%)", padding: "48px 0 36px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button onClick={() => go("detail")} className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: "#93C5FD", background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft size={15} /> Retour à l'ouvrage
          </button>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>Finaliser votre achat</h1>
        </div>
      </section>

      <section className="py-12" style={{ background: "#F8F9FC" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6" style={{ borderRadius: "16px" }}>
              <h3 className="font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Récapitulatif</h3>
              <div className="flex gap-4 mb-5">
                <img src={selectedBook.cover} alt={selectedBook.title} className="w-16 h-20 object-cover rounded-lg flex-shrink-0" />
                <div>
                  <p className="font-bold text-sm leading-snug mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{selectedBook.title}</p>
                  <p className="text-xs text-gray-400 mb-2">{selectedBook.author}</p>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#D9EEFA", color: "#0D67B0" }}>{selectedBook.format}</span>
                </div>
              </div>
              <div className="border-t pt-4 space-y-2 text-sm" style={{ borderColor: "#F1F5F9" }}>
                <div className="flex justify-between text-gray-500"><span>Prix</span><span>{fmtFCFA(selectedBook.price)}</span></div>
                <div className="flex justify-between text-gray-500"><span>Frais de service</span><span>0 FCFA</span></div>
                <div className="flex justify-between font-bold text-base border-t pt-2" style={{ borderColor: "#F1F5F9", color: "#0F78C8" }}>
                  <span>Total</span><span>{fmtFCFA(selectedBook.price)}</span>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-xl text-xs text-gray-500 flex items-start gap-2" style={{ background: "#F8F9FC", border: "1px solid #D9EEFA" }}>
                <Eye size={12} style={{ color: "#0F78C8", flexShrink: 0, marginTop: 1 }} />
                Accès immédiat à la lecture en ligne + téléchargement PDF après confirmation.
              </div>
            </div>

            <div className="card p-6" style={{ borderRadius: "16px" }}>
              <h3 className="font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Mode de paiement</h3>
              <div className="space-y-3 mb-5">
                {[
                  { id: "mobile", label: "Mobile Money", sub: "Orange Money · Moov Money · Coris", icon: Smartphone },
                  { id: "card", label: "Carte bancaire", sub: "Visa · Mastercard", icon: CreditCard },
                ].map(m => (
                  <button key={m.id} onClick={() => setPaymentMethod(m.id as "mobile" | "card")} className="w-full flex items-center gap-4 p-4 rounded-xl text-left"
                    style={{ background: paymentMethod === m.id ? "rgba(15,120,200,0.06)" : "white", border: `2px solid ${paymentMethod === m.id ? "#0F78C8" : "#E8EDF8"}`, cursor: "pointer" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: paymentMethod === m.id ? "#D9EEFA" : "#F8F9FC" }}>
                      <m.icon size={18} style={{ color: "#0F78C8" }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm" style={{ color: "#0F78C8" }}>{m.label}</p>
                      <p className="text-xs text-gray-400">{m.sub}</p>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: paymentMethod === m.id ? "#0F78C8" : "#CBD5E1" }}>
                      {paymentMethod === m.id && <div className="w-2 h-2 rounded-full" style={{ background: "#0F78C8" }} />}
                    </div>
                  </button>
                ))}
              </div>

              <form onSubmit={handlePay} className="space-y-4">
                {paymentMethod === "mobile" && (
                  <div>
                    <label className="form-label">Numéro Mobile Money</label>
                    <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Ex : 70 00 00 00" className="form-input" required />
                  </div>
                )}
                {paymentMethod === "card" && (
                  <div className="space-y-3">
                    <div>
                      <label className="form-label">Numéro de carte</label>
                      <input type="text" placeholder="•••• •••• •••• ••••" className="form-input" required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="form-label">Expiration</label><input type="text" placeholder="MM/AA" className="form-input" required /></div>
                      <div><label className="form-label">CVV</label><input type="text" placeholder="•••" className="form-input" required /></div>
                    </div>
                  </div>
                )}
                <button type="submit" disabled={!paymentMethod || payLoading} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm"
                  style={{ background: "#0F78C8", color: "white", border: "none", cursor: !paymentMethod || payLoading ? "not-allowed" : "pointer", opacity: !paymentMethod || payLoading ? 0.5 : 1, fontFamily: "'Inter', sans-serif" }}>
                  {payLoading ? "Traitement en cours…" : `Payer ${fmtFCFA(selectedBook.price)}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  /* ── CONFIRMATION ── */
  if (view === "confirmed") return (
    <section className="py-24" style={{ background: "#F8F9FC" }}>
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className="card p-10" style={{ borderRadius: "24px" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#DCFCE7" }}>
            <CheckCircle size={40} style={{ color: "#16A34A" }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Paiement confirmé !</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Votre accès à <strong>« {selectedBook.title} »</strong> est activé. Vous pouvez lire en ligne immédiatement ou télécharger le fichier.
          </p>
          <div className="flex gap-3 mb-6 text-left">
            <img src={selectedBook.cover} alt={selectedBook.title} className="w-14 object-cover rounded-lg flex-shrink-0" style={{ height: 72 }} />
            <div>
              <p className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{selectedBook.title}</p>
              <p className="text-xs text-gray-400 mb-3">{selectedBook.author}</p>
              <div className="flex gap-2">
                <button onClick={() => { setReaderChapter(0); go("reader"); }} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "#EBF6FD", color: "#0F78C8", border: "none", cursor: "pointer" }}>
                  <Eye size={12} /> Lire en ligne
                </button>
                <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "#D9EEFA", color: "#0F78C8", border: "none", cursor: "pointer" }}>
                  <Download size={12} /> Télécharger
                </button>
              </div>
            </div>
          </div>
          <button onClick={() => go("catalog")} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ background: "#F1F5F9", color: "#374151", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            Retour au catalogue
          </button>
        </div>
      </div>
    </section>
  );

  return null;
}
