import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Statistics from "./pages/Statistics";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import Surveys from "./pages/Surveys";
import Admin from "./pages/Admin";
import VieEglise from "./pages/VieEglise";
import AppLayout, { type SupervisionScope, SUPERVISION_SCOPES } from "./components/AppLayout";
import PublicLayout from "./components/PublicLayout";
import Apropos from "./pages/public/Apropos";
import Actualites from "./pages/public/Actualites";
import Evenements from "./pages/public/Evenements";
import Mission from "./pages/public/Mission";
import PublicBibliotheque from "./pages/public/PublicBibliotheque";
import PublicSondages from "./pages/public/PublicSondages";
import Contact from "./pages/public/Contact";
import EcolesBibliques from "./pages/public/EcolesBibliques";
import Structures from "./pages/public/Structures";
import Sante from "./pages/public/Sante";
import Education from "./pages/public/Education";
import DonMission from "./pages/public/DonMission";

type Page =
  | "home" | "login"
  | "apropos" | "actualites" | "evenements" | "mission" | "bibliotheque-pub" | "sondages-pub" | "contact"
  | "ecoles-bibliques" | "structures" | "sante" | "education" | "don-mission"
  | "dashboard" | "finance" | "statistics" | "library" | "settings" | "surveys" | "admin" | "vie-eglise";

const publicPages = new Set<Page>([
  "home", "login", "apropos", "actualites", "evenements", "mission", "bibliotheque-pub", "sondages-pub", "contact",
  "ecoles-bibliques", "structures", "sante", "education", "don-mission",
]);

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [subPage, setSubPage] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [articleId, setArticleId] = useState<number | null>(null);
  const [eventId, setEventId] = useState<number | null>(null);
  const [bookId, setBookId] = useState<number | null>(null);
  const [adminTab, setAdminTab] = useState<string | null>(null);

  const [currentScope, setCurrentScope] = useState<SupervisionScope>(SUPERVISION_SCOPES[0]);

  const navigate = (p: string) => {
    if (p.startsWith("actualites:")) {
      setArticleId(parseInt(p.split(":")[1]));
      setEventId(null); setBookId(null); setSubPage(null);
      setPage("actualites");
    } else if (p.startsWith("evenements:")) {
      setEventId(parseInt(p.split(":")[1]));
      setArticleId(null); setBookId(null); setSubPage(null);
      setPage("evenements");
    } else if (p.startsWith("bibliotheque-pub:")) {
      setBookId(parseInt(p.split(":")[1]));
      setArticleId(null); setEventId(null); setSubPage(null);
      setPage("bibliotheque-pub");
    } else if (p.includes(":")) {
      const parts = p.split(":");
      const main = parts[0] as Page;
      const sub = parts.slice(1).join(":");
      setArticleId(null); setEventId(null); setBookId(null);
      setSubPage(sub);
      if (main === "admin") {
        setAdminTab(sub);
      }
      setPage(main);
    } else {
      setArticleId(null); setEventId(null); setBookId(null); setAdminTab(null); setSubPage(null);
      setPage(p as Page);
    }
  };

  const handleLogin = (selectedScope?: SupervisionScope) => {
    if (selectedScope) {
      setCurrentScope(selectedScope);
    }
    setAuthenticated(true);
    setPage("dashboard");
    setSubPage(null);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPage("home");
    setSubPage(null);
  };

  if (page === "login") {
    return <Login onLogin={handleLogin} onBack={() => setPage("home")} />;
  }

  if (!authenticated && publicPages.has(page)) {
    const publicMap: Record<string, React.ReactNode> = {
      home: <Home onNavigate={navigate} />,
      apropos: <Apropos />,
      actualites: <Actualites initialArticleId={articleId} />,
      evenements: <Evenements initialEventId={eventId} />,
      mission: <Mission onNavigate={navigate} />,
      "don-mission": <DonMission onNavigate={navigate} />,
      "bibliotheque-pub": <PublicBibliotheque onNavigate={navigate} initialBookId={bookId} />,
      "sondages-pub": <PublicSondages onNavigate={navigate} />,
      contact: <Contact />,
      "ecoles-bibliques": <EcolesBibliques initialTab={subPage} />,
      structures: <Structures initialTab={subPage} />,
      sante: <Sante initialTab={subPage} />,
      education: <Education initialTab={subPage} />,
    };

    if (page === "home") {
      return <Home onNavigate={navigate} />;
    }

    return (
      <PublicLayout currentPage={page} onNavigate={navigate}>
        {publicMap[page]}
      </PublicLayout>
    );
  }

  if (!authenticated) {
    return <Login onLogin={handleLogin} onBack={() => setPage("home")} />;
  }

  const appMap: Record<string, React.ReactNode> = {
    dashboard: <Dashboard currentScope={currentScope} key={`dashboard-${currentScope.id}`} />,
    finance: <Finance initialTab={subPage} currentScope={currentScope} key={`finance-${subPage || "default"}-${currentScope.id}`} />,
    statistics: <Statistics initialNiveau={subPage} currentScope={currentScope} key={`statistics-${subPage || "default"}-${currentScope.id}`} />,
    library: <Library initialView={subPage} key={`library-${subPage || "default"}`} />,
    settings: <Settings initialTab={subPage} currentScope={currentScope} key={`settings-${subPage || "default"}-${currentScope.id}`} />,
    surveys: <Surveys initialView={subPage} key={`surveys-${subPage || "default"}`} />,
    admin: <Admin initialTab={subPage || adminTab} currentScope={currentScope} key={`admin-${subPage || adminTab || "default"}-${currentScope.id}`} />,
    "vie-eglise": <VieEglise initialTab={subPage} currentScope={currentScope} key={`vie-eglise-${subPage || "default"}-${currentScope.id}`} />,
    "ecoles-bibliques": <EcolesBibliques initialTab={subPage} key={`ecoles-${subPage || "default"}`} />,
    structures: <Structures initialTab={subPage} key={`structures-${subPage || "default"}`} />,
    sante: <Sante initialTab={subPage} key={`sante-${subPage || "default"}`} />,
    education: <Education initialTab={subPage} key={`education-${subPage || "default"}`} />,
  };

  return (
    <AppLayout
      currentPage={page}
      currentSub={subPage}
      currentScope={currentScope}
      onScopeChange={setCurrentScope}
      onNavigate={navigate}
      onLogout={handleLogout}
    >
      {appMap[page] || <Dashboard />}
    </AppLayout>
  );
}
