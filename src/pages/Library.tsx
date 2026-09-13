import { useState, useEffect } from "react";
import {
  Search, Filter, ShoppingCart, Download, Star, BookOpen, Plus, X,
  CheckCircle, CreditCard, Smartphone, ArrowLeft, Eye
} from "lucide-react";

type LibView = "catalog" | "book" | "cart" | "payment" | "confirmed" | "mylibrary" | "admin";

const initialBooks = [
  {
    id: 1,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format",
    title: "La Vision 3R Expliquée",
    author: "Pasteur Samuel Kaboré",
    category: "Théologie",
    pages: 184,
    format: "PDF + ePub",
    price: 3500,
    rating: 4.8,
    desc: "Une exploration approfondie de la Vision 3R des Assemblées de Dieu du Burkina Faso — Réveil, Réforme, Rayonnement. Ce livre examine les fondements bibliques et les implications pratiques pour chaque église locale.",
  },
  {
    id: 2,
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop&auto=format",
    title: "Leadership pastoral en Afrique",
    author: "Dr. Jean-Marc Ouédraogo",
    category: "Leadership",
    pages: 248,
    format: "PDF",
    price: 4000,
    rating: 4.6,
    desc: "Un guide pratique pour les responsables d'église en Afrique subsaharienne, abordant les défis culturels, la gestion des conflits, et le développement d'une vision communautaire ancrée dans les réalités africaines.",
  },
  {
    id: 3,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format",
    title: "Guide du Discipulat Intégral",
    author: "Pasteur Pierre Sawadogo",
    category: "Discipulat",
    pages: 132,
    format: "PDF + ePub",
    price: 2500,
    rating: 4.9,
    desc: "Un programme structuré de discipulat en 12 semaines, adapté au contexte burkinabè. Inclut des fiches d'animation, des études bibliques et des outils d'évaluation spirituelle.",
  },
  {
    id: 4,
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format",
    title: "Évangélisation dans le contexte sahélien",
    author: "Équipe Mission AD/BF",
    category: "Évangélisation",
    pages: 96,
    format: "PDF",
    price: 2000,
    rating: 4.5,
    desc: "Stratégies et méthodologies d'évangélisation adaptées aux contextes ruraux et urbains du Sahel burkinabè. Témoignages et études de cas issus des campagnes 2022–2025.",
  },
  {
    id: 5,
    cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&h=400&fit=crop&auto=format",
    title: "Finances de l'Église Locale",
    author: "Comité Finance AD/BF",
    category: "Administration",
    pages: 156,
    format: "PDF",
    price: 3000,
    rating: 4.7,
    desc: "Manuel complet de gestion financière pour les responsables d'église : tenue de caisse, comptabilité simplifiée, budgets, dîmes et offrandes. Conforme aux procédures AD/BF 2026.",
  },
  {
    id: 6,
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop&auto=format",
    title: "La Femme dans l'Église de Dieu",
    author: "Sœur Esther Koala",
    category: "Ministère",
    pages: 112,
    format: "PDF + ePub",
    price: 2500,
    rating: 4.4,
    desc: "Une étude biblique et contextuelle du rôle de la femme dans le ministère chrétien en Afrique de l'Ouest. Destiné aux femmes de foi et aux responsables souhaitant mieux intégrer les femmes dans la vie ecclésiale.",
  },
];

const PRESET_COVERS = [
  { label: "Théologie / Bible", url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format" },
  { label: "Leadership pastoral", url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop&auto=format" },
  { label: "Discipulat & Prière", url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format" },
  { label: "Mission & Sahel", url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format" },
  { label: "Administration & Finances", url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&h=400&fit=crop&auto=format" },
  { label: "Ministère & Foi", url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop&auto=format" },
];

const categories = ["Toutes", "Théologie", "Leadership", "Discipulat", "Évangélisation", "Administration", "Ministère"];

export default function Library({ initialView }: { initialView?: string | null }) {
  const [view, setView] = useState<LibView>(
    (initialView && ["catalog", "book", "cart", "payment", "confirmed", "mylibrary", "admin"].includes(initialView))
      ? (initialView as LibView)
      : "catalog"
  );

  const [bookList, setBookList] = useState(initialBooks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New book form state
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "Théologie",
    pages: 140,
    format: "PDF + ePub",
    price: 3000,
    cover: PRESET_COVERS[0].url,
    desc: "",
  });

  useEffect(() => {
    if (initialView && ["catalog", "book", "cart", "payment", "confirmed", "mylibrary", "admin"].includes(initialView)) {
      setView(initialView as LibView);
    }
  }, [initialView]);

  const [selectedBook, setSelectedBook] = useState(bookList[0] || initialBooks[0]);
  const [cart, setCart] = useState<typeof initialBooks>([]);
  const [selectedCat, setSelectedCat] = useState("Toutes");
  const [search, setSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const filtered = bookList.filter(b => {
    const matchCat = selectedCat === "Toutes" || b.category === selectedCat;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (book: typeof initialBooks[0]) => {
    if (!cart.find(b => b.id === book.id)) setCart([...cart, book]);
  };

  const handleDeleteBook = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet ouvrage du catalogue ?")) {
      setBookList(prev => prev.filter(b => b.id !== id));
      setSuccessToast("Ouvrage retiré du catalogue avec succès.");
      setTimeout(() => setSuccessToast(null), 4000);
    }
  };

  const handleAddBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title.trim() || !newBook.author.trim()) {
      alert("Veuillez renseigner au minimum le titre et l'auteur.");
      return;
    }

    const createdBook = {
      id: Date.now(),
      title: newBook.title.trim(),
      author: newBook.author.trim(),
      category: newBook.category,
      pages: Number(newBook.pages) || 120,
      format: newBook.format,
      price: Number(newBook.price) || 2500,
      cover: newBook.cover || PRESET_COVERS[0].url,
      rating: 5.0,
      desc: newBook.desc.trim() || `Ouvrage de référence sur ${newBook.title}, édité sous l'égide du Bureau Exécutif National des Assemblées de Dieu du Burkina Faso.`,
    };

    setBookList(prev => [createdBook, ...prev]);
    setShowAddModal(false);
    setSuccessToast(`L'ouvrage « ${createdBook.title} » a été enregistré avec succès dans la bibliothèque !`);
    setTimeout(() => setSuccessToast(null), 5000);

    // Reset form
    setNewBook({
      title: "",
      author: "",
      category: "Théologie",
      pages: 140,
      format: "PDF + ePub",
      price: 3000,
      cover: PRESET_COVERS[0].url,
      desc: "",
    });
  };

  const total = cart.reduce((s, b) => s + b.price, 0);

  const tabs: { id: LibView; label: string }[] = [
    { id: "catalog", label: "Catalogue" },
    { id: "admin", label: "Gérer les ouvrages" },
    { id: "mylibrary", label: "Ma bibliothèque" },
  ];

  return (
    <div>
      {/* Toast Notification */}
      {successToast && (
        <div className="mb-4 p-4 rounded-xl flex items-center justify-between shadow-sm animate-in fade-in" style={{ background: "#DCFCE7", border: "1px solid #86EFAC", color: "#166534" }}>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CheckCircle size={18} className="text-green-600" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-green-700 hover:text-green-900 font-bold text-xs" style={{ background: "none", border: "none", cursor: "pointer" }}>✕</button>
        </div>
      )}

      <div className="page-header mb-5">
        <div>
          <h1 className="section-title text-2xl">Bibliothèque numérique</h1>
          <p className="text-sm text-gray-500 mt-1">Ouvrages théologiques, pastoraux et institutionnels AD/BF</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Enregistrer un livre
          </button>
          <div className="relative">
            <button onClick={() => setView("cart")} className="btn-secondary relative">
              <ShoppingCart size={16} /> Panier
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#DC2626" }}>
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {view !== "book" && view !== "cart" && view !== "payment" && view !== "confirmed" && (
        <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: "#F1F5F9", border: "1px solid #D9EEFA", display: "inline-flex" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setView(t.id)} className={`tab-btn ${view === t.id ? "active" : ""}`}>{t.label}</button>
          ))}
        </div>
      )}

      {/* CATALOG */}
      {view === "catalog" && (
        <div>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un ouvrage, un auteur…" className="form-input pl-9" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCat(c)}
                  className="whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: selectedCat === c ? "#0F78C8" : "white",
                    color: selectedCat === c ? "white" : "#64748B",
                    border: `1px solid ${selectedCat === c ? "#0F78C8" : "#D9EEFA"}`,
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map(b => (
              <div key={b.id} className="card overflow-hidden group cursor-pointer flex flex-col" style={{ transition: "all 0.2s" }}>
                <div className="overflow-hidden" style={{ height: 180, background: "#EBF6FD" }}>
                  <img src={b.cover} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full w-fit mb-2" style={{ background: "#D9EEFA", color: "#0D67B0" }}>{b.category}</span>
                  <h3 className="text-xs font-bold leading-snug mb-1 flex-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{b.title}</h3>
                  <p className="text-xs text-gray-400 mb-3">{b.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm" style={{ color: "#C8973A", fontFamily: "'Manrope', sans-serif" }}>{b.price.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => { setSelectedBook(b); setView("book"); }}
                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: "#EBF6FD", color: "#0F78C8", border: "1px solid #D9EEFA", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                    >
                      Voir
                    </button>
                    <button
                      onClick={() => addToCart(b)}
                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: cart.find(c => c.id === b.id) ? "#DCFCE7" : "#0F78C8", color: cart.find(c => c.id === b.id) ? "#16A34A" : "white", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                    >
                      {cart.find(c => c.id === b.id) ? "Ajouté ✓" : "Acheter"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOK DETAIL */}
      {view === "book" && (
        <div>
          <button onClick={() => setView("catalog")} className="flex items-center gap-2 text-sm text-gray-500 mb-5" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <ArrowLeft size={15} /> Retour au catalogue
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <img src={selectedBook.cover} alt={selectedBook.title} className="w-full rounded-2xl object-cover" style={{ height: 380 }} />
            </div>
            <div className="lg:col-span-2">
              <span className="badge badge-info mb-3 inline-block">{selectedBook.category}</span>
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{selectedBook.title}</h1>
              <p className="text-gray-500 mb-2">{selectedBook.author}</p>
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                <span>{selectedBook.pages} pages</span>
                <span>·</span>
                <span>{selectedBook.format}</span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Star size={14} fill="#C8973A" style={{ color: "#C8973A" }} />
                  <span style={{ color: "#C8973A", fontWeight: 600 }}>{selectedBook.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-8">{selectedBook.desc}</p>
              <div className="flex items-center gap-6 mb-6 p-5 rounded-2xl" style={{ background: "#F8F9FC", border: "1px solid #D9EEFA" }}>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Prix</div>
                  <div className="text-3xl font-black" style={{ fontFamily: "'Manrope', sans-serif", color: "#C8973A" }}>{selectedBook.price.toLocaleString("fr-FR")} FCFA</div>
                </div>
                <div className="flex gap-3 flex-1 justify-end">
                  <button onClick={() => { addToCart(selectedBook); setView("cart"); }} className="btn-primary px-8">
                    <ShoppingCart size={16} /> Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART */}
      {view === "cart" && (
        <div>
          <button onClick={() => setView("catalog")} className="flex items-center gap-2 text-sm text-gray-500 mb-5" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <ArrowLeft size={15} /> Continuer mes achats
          </button>
          <h2 className="section-title text-xl mb-5">Mon panier</h2>
          {cart.length === 0 ? (
            <div className="card p-12 text-center">
              <ShoppingCart size={40} className="mx-auto mb-4" style={{ color: "#CBD5E1" }} />
              <h3 className="section-title text-base mb-2">Votre panier est vide</h3>
              <p className="text-sm text-gray-400 mb-5">Parcourez le catalogue pour ajouter des ouvrages.</p>
              <button onClick={() => setView("catalog")} className="btn-primary">Voir le catalogue</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                {cart.map(b => (
                  <div key={b.id} className="card p-4 flex items-center gap-4">
                    <img src={b.cover} alt={b.title} className="w-16 h-20 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{b.title}</h4>
                      <p className="text-xs text-gray-400 mb-2">{b.author}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#D9EEFA", color: "#0D67B0" }}>{b.format}</span>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="font-bold" style={{ color: "#C8973A", fontFamily: "'Manrope', sans-serif" }}>{b.price.toLocaleString("fr-FR")} FCFA</div>
                      <button onClick={() => setCart(cart.filter(c => c.id !== b.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="card p-5 sticky top-6">
                  <h3 className="font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Récapitulatif</h3>
                  <div className="space-y-2 mb-4">
                    {cart.map(b => (
                      <div key={b.id} className="flex justify-between text-xs">
                        <span className="text-gray-500 truncate mr-2">{b.title}</span>
                        <span className="font-semibold" style={{ color: "#374151" }}>{b.price.toLocaleString("fr-FR")}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center mb-5" style={{ borderColor: "#F1F5F9" }}>
                    <span className="font-bold" style={{ color: "#0F78C8" }}>Total</span>
                    <span className="text-xl font-black" style={{ fontFamily: "'Manrope', sans-serif", color: "#C8973A" }}>{total.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                  <button onClick={() => setView("payment")} className="btn-primary w-full justify-center">
                    <CreditCard size={16} /> Procéder au paiement
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PAYMENT */}
      {view === "payment" && (
        <div className="max-w-lg mx-auto">
          <button onClick={() => setView("cart")} className="flex items-center gap-2 text-sm text-gray-500 mb-5" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <ArrowLeft size={15} /> Retour au panier
          </button>
          <div className="card p-6">
            <h2 className="section-title text-xl mb-2">Paiement</h2>
            <p className="text-sm text-gray-400 mb-6">{cart.length} ouvrage(s) · Total : <strong style={{ color: "#C8973A" }}>{total.toLocaleString("fr-FR")} FCFA</strong></p>

            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3" style={{ color: "#374151" }}>Mode de paiement</h3>
              <div className="space-y-3">
                {[
                  { id: "mobile-money", label: "Mobile Money", sub: "Orange Money · Moov Money", icon: Smartphone },
                  { id: "card", label: "Carte bancaire", sub: "Visa · Mastercard", icon: CreditCard },
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                    style={{
                      background: paymentMethod === m.id ? "#D9EEFA" : "#F8F9FC",
                      border: `2px solid ${paymentMethod === m.id ? "#0F78C8" : "#D9EEFA"}`,
                      cursor: "pointer",
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: paymentMethod === m.id ? "#0F78C8" : "#D9EEFA" }}>
                      <m.icon size={18} style={{ color: paymentMethod === m.id ? "white" : "#64748B" }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "#0F78C8" }}>{m.label}</div>
                      <div className="text-xs text-gray-400">{m.sub}</div>
                    </div>
                    <div className="ml-auto">
                      <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: paymentMethod === m.id ? "#0F78C8" : "#CBD5E1", background: paymentMethod === m.id ? "#0F78C8" : "transparent" }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === "mobile-money" && (
              <div className="mb-5">
                <label className="form-label">Numéro Mobile Money</label>
                <input type="tel" placeholder="+226 XX XX XX XX" className="form-input" />
              </div>
            )}

            <button
              onClick={() => setView("confirmed")}
              disabled={!paymentMethod}
              className="btn-primary w-full justify-center py-3"
              style={{ background: !paymentMethod ? "#CBD5E1" : "#0F78C8", cursor: !paymentMethod ? "not-allowed" : "pointer" }}
            >
              <CheckCircle size={16} /> Confirmer le paiement de {total.toLocaleString("fr-FR")} FCFA
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMED */}
      {view === "confirmed" && (
        <div className="max-w-md mx-auto">
          <div className="card p-8 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#DCFCE7" }}>
              <CheckCircle size={40} style={{ color: "#16A34A" }} />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Paiement confirmé !</h2>
            <p className="text-gray-500 mb-2">Votre paiement de <strong style={{ color: "#C8973A" }}>{total.toLocaleString("fr-FR")} FCFA</strong> a bien été reçu.</p>
            <p className="text-xs text-gray-400 mb-8">Réf. paiement : PAY-2026-{Math.random().toString().slice(2, 10).toUpperCase()}</p>
            <div className="space-y-3">
              {cart.map(b => (
                <div key={b.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#F8F9FC", border: "1px solid #D9EEFA" }}>
                  <div className="text-left">
                    <div className="text-xs font-semibold" style={{ color: "#0F78C8" }}>{b.title}</div>
                    <div className="text-xs text-gray-400">{b.format}</div>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg" style={{ background: "#0F78C8", color: "white", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                    <Download size={13} /> Télécharger
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => { setView("mylibrary"); setCart([]); }} className="mt-6 btn-secondary w-full justify-center">
              <BookOpen size={15} /> Voir ma bibliothèque
            </button>
          </div>
        </div>
      )}

      {/* MY LIBRARY */}
      {view === "mylibrary" && (
        <div>
          <h2 className="section-title text-xl mb-5">Ma bibliothèque</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bookList.slice(0, 4).map(b => (
              <div key={b.id} className="card overflow-hidden flex flex-col">
                <img src={b.cover} alt={b.title} className="w-full object-cover" style={{ height: 160 }} />
                <div className="p-3 flex flex-col flex-1">
                  <h4 className="text-xs font-bold mb-1 flex-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{b.title}</h4>
                  <p className="text-xs text-gray-400 mb-2">{b.author}</p>
                  <div className="text-xs text-gray-400 mb-3">Acheté le 28/08/2026 · {b.format}</div>
                  <button className="w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2" style={{ background: "#0F78C8", color: "white", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                    <Download size={13} /> Télécharger
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADMIN */}
      {view === "admin" && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="section-title text-xl">Gestion des ouvrages</h3>
              <p className="text-xs text-gray-500 mt-0.5">Ajout, modification et gestion du catalogue national AD/BF</p>
            </div>
            <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
              <Plus size={15} /> Ajouter un ouvrage
            </button>
          </div>
          <div className="card overflow-hidden">
            <table className="data-table">
              <thead>
                <tr><th>Couverture</th><th>Titre</th><th>Auteur</th><th>Catégorie</th><th>Format</th><th style={{ textAlign: "right" }}>Prix</th><th>Ventes</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {bookList.map(b => (
                  <tr key={b.id}>
                    <td><img src={b.cover} alt={b.title} className="w-10 h-14 object-cover rounded shadow-sm" /></td>
                    <td className="font-medium text-sm" style={{ color: "#0F78C8" }}>{b.title}</td>
                    <td className="text-xs text-gray-500">{b.author}</td>
                    <td><span className="badge badge-info">{b.category}</span></td>
                    <td className="text-xs">{b.format}</td>
                    <td className="text-right font-semibold" style={{ color: "#C8973A" }}>{b.price.toLocaleString("fr-FR")} FCFA</td>
                    <td className="text-center font-semibold text-sm">{Math.floor(Math.random() * 80 + 10)}</td>
                    <td>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => { setSelectedBook(b); setView("book"); }}
                          style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", cursor: "pointer", padding: "5px 8px", borderRadius: "6px", color: "#0F78C8", fontSize: "12px", fontWeight: 600 }}
                        >
                          Voir
                        </button>
                        <button
                          onClick={() => handleDeleteBook(b.id)}
                          style={{ background: "#FEE2E2", border: "1px solid #FECACA", cursor: "pointer", padding: "5px 8px", borderRadius: "6px", color: "#DC2626", fontSize: "12px", fontWeight: 600 }}
                        >
                          Suppr.
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL AJOUTER UN OUVRAGE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-sky-100 animate-in zoom-in-95">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <BookOpen size={20} className="text-sky-600" />
                  Enregistrer un nouvel ouvrage
                </h3>
                <p className="text-xs text-slate-500">Ajout au catalogue officiel de la bibliothèque nationale AD/BF</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddBookSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Titre de l'ouvrage <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newBook.title}
                    onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                    placeholder="Ex: Fondements de la Réforme Spirituelle"
                    className="form-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Auteur <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newBook.author}
                    onChange={e => setNewBook({ ...newBook, author: e.target.value })}
                    placeholder="Ex: Rév. Dr Etienne P. Zongo"
                    className="form-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Catégorie
                  </label>
                  <select
                    value={newBook.category}
                    onChange={e => setNewBook({ ...newBook, category: e.target.value })}
                    className="form-input w-full"
                  >
                    {categories.filter(c => c !== "Toutes").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="Vie chrétienne">Vie chrétienne</option>
                    <option value="Famille & Couple">Famille & Couple</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Format
                  </label>
                  <select
                    value={newBook.format}
                    onChange={e => setNewBook({ ...newBook, format: e.target.value })}
                    className="form-input w-full"
                  >
                    <option value="PDF + ePub">PDF + ePub (Numérique complet)</option>
                    <option value="PDF">PDF seul</option>
                    <option value="ePub">ePub seul</option>
                    <option value="Livre papier">Livre papier (Broché)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Prix (FCFA)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={newBook.price}
                    onChange={e => setNewBook({ ...newBook, price: Number(e.target.value) })}
                    placeholder="3000"
                    className="form-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nombre de pages
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newBook.pages}
                    onChange={e => setNewBook({ ...newBook, pages: Number(e.target.value) })}
                    placeholder="140"
                    className="form-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    URL de la couverture
                  </label>
                  <input
                    type="url"
                    value={newBook.cover}
                    onChange={e => setNewBook({ ...newBook, cover: e.target.value })}
                    placeholder="https://..."
                    className="form-input w-full"
                  />
                </div>
              </div>

              {/* Preset cover quick selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">
                  Ou choisir une couverture thématique prédéfinie :
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {PRESET_COVERS.map(pc => (
                    <button
                      type="button"
                      key={pc.label}
                      onClick={() => setNewBook({ ...newBook, cover: pc.url })}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all text-left ${
                        newBook.cover === pc.url ? "border-sky-600 ring-2 ring-sky-300" : "border-slate-200 opacity-75 hover:opacity-100"
                      }`}
                      style={{ cursor: "pointer", background: "none", padding: 0 }}
                    >
                      <img src={pc.url} alt={pc.label} className="w-full h-16 object-cover" />
                      <span className="block text-[9px] p-1 truncate font-medium bg-slate-900/80 text-white text-center">{pc.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Résumé & Description
                </label>
                <textarea
                  rows={3}
                  value={newBook.desc}
                  onChange={e => setNewBook({ ...newBook, desc: e.target.value })}
                  placeholder="Présentation des thématiques abordées, public cible, recommandations pastorales..."
                  className="form-input w-full"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  style={{ background: "none", border: "1px solid #E2E8F0", cursor: "pointer" }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md"
                >
                  <CheckCircle size={16} /> Enregistrer l'ouvrage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
