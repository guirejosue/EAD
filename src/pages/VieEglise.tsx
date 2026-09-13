import { useState, useMemo } from "react";
import {
  Users, Shield, CheckCircle2, AlertTriangle, XCircle, Clock, FileText,
  Search, Plus, Filter, Download, Eye, Printer, Check, ArrowRight,
  Building2, Calendar, Lock, UserCheck, MessageSquare, AlertCircle, ChevronDown,
  Sparkles, RefreshCw, X, ChevronRight, Award, BookmarkCheck, Heart,
  Briefcase, HeartHandshake, History, UserPlus, Phone, Mail, MapPin,
  HelpCircle, UserX, Star, BookOpen, Stethoscope, GraduationCap, Hammer
} from "lucide-react";
import type { SupervisionScope } from "../components/AppLayout";
import adLogo from "../imports/ead-bf.png";

// ══════════════════════════════════════════════════════════════════════
// TYPES : MEMBRES & GESTION ECCLÉSIALE
// ══════════════════════════════════════════════════════════════════════

export type StatutVital = "actif" | "inactif" | "sous_discipline" | "transfere" | "rappel_seigneur";

export type StatutMatrimonial =
  | "celibataire"
  | "fiance"
  | "marie_civil"
  | "benediction_nuptiale"
  | "veuf"
  | "divorce";

export interface HistoriqueMatrimonial {
  id: string;
  ancienStatut: StatutMatrimonial;
  nouveauStatut: StatutMatrimonial;
  dateChangement: string;
  nomConjoint?: string;
  matriculeConjoint?: string;
  dateMariageCivil?: string;
  dateBenedictionNuptiale?: string;
  pasteurCelebrant?: string;
  egliseCelebration?: string;
  certificatRef?: string;
  notePastorale?: string;
  auteurModification: string;
}

export interface InformationDeces {
  dateDeces: string;
  lieuDeces?: string;
  dateInhumation: string;
  lieuInhumation: string;
  pasteurOfficiant: string;
  culteActionGrace?: string;
  versetCommemoratif?: string;
  enregistreLe: string;
  enregistrePar: string;
}

export interface ActiviteProfessionnelle {
  profession: string;
  categorie:
    | "education"
    | "sante"
    | "fonction_publique"
    | "commerce"
    | "artisanat"
    | "agriculture"
    | "ingenierie_btp"
    | "juridique_finance"
    | "etudiant"
    | "retraite"
    | "autre";
  secteur: "public" | "prive" | "liberal" | "informel" | "ong_mission";
  employeur?: string;
  talentsMobilisables: string[];
}

export interface MembreEglise {
  id: string;
  matricule: string;
  nom: string;
  prenoms: string;
  sexe: "M" | "F";
  dateNaissance: string;
  lieuNaissance: string;
  telephone: string;
  email?: string;
  adresse: string;
  cniOuB10?: string;
  // Statut vital & ecclésial
  statutVital: StatutVital;
  deces?: InformationDeces;
  // Situation matrimoniale
  statutMatrimonial: StatutMatrimonial;
  nomConjoint?: string;
  matriculeConjoint?: string;
  historiqueMatrimonial: HistoriqueMatrimonial[];
  // Profession & Talents (Point 4)
  profession: ActiviteProfessionnelle;
  // Parcours ecclésial
  dateConversion: string;
  dateBaptemeEau: string;
  baptemeSaintEsprit: boolean;
  ministeres: string[];
  // Origine & Rattachement (Point 5)
  egliseActuelle: string;
  sousRegionActuelle: string;
  regionActuelle: string;
  typeEntree: "conversion_locale" | "transfert_adbf" | "provenance_externe";
  egliseOrigine?: string;
  dateAdmission: string;
}

// ══════════════════════════════════════════════════════════════════════
// TYPES : ATTESTATIONS & RECOMMANDATIONS (SECTIONS A, B, C, D)
// ══════════════════════════════════════════════════════════════════════

export type StatutMembreAttestation =
  | "en_regle"
  | "inactif"
  | "accompagnement_restauration"
  | "discipline_ecclesiastique"
  | "clarification_en_cours"
  | "temoignage_non_verifiable"
  | "autre";

export type TypeRecommandation =
  | "transfert_recommande"
  | "transfert_avec_reserve"
  | "attestation_sans_recommandation"
  | "recommandation_suspendue";

export type ReserveType =
  | "situation_pastorale"
  | "processus_restauration"
  | "conflit_non_resolu"
  | "responsabilite_a_regulariser"
  | "situation_administrative"
  | "autre";

export type MotifSuspension =
  | "discipline_en_cours"
  | "situation_grave_non_clarifiee"
  | "processus_reconciliation"
  | "manquement_grave"
  | "situation_administrative"
  | "autre_motif_statuts";

export interface DossierVieEglise {
  id: string;
  matricule: string;
  dateEmission: string;
  // Section A
  nom: string;
  prenoms: string;
  sexe: "M" | "F";
  dateNaissance: string;
  telephone: string;
  email: string;
  dateConversion: string;
  dateBaptemeEau: string;
  baptemeSaintEsprit: boolean;
  ministeres: string[];
  egliseOrigine: string;
  sousRegionOrigine: string;
  regionOrigine: string;
  egliseDestination: string;
  motifTransfert: string;
  pasteurSignataire: string;
  // Section B
  statutMembre: StatutMembreAttestation;
  statutAutrePrecision?: string;
  // Section C
  appreciation: {
    vieChretienne: "tres_satisfaisant" | "satisfaisant" | "a_ameliorer" | "non_verifiable";
    relationsFraternelles: "tres_satisfaisant" | "satisfaisant" | "a_ameliorer" | "non_verifiable";
    participationVieEglise: "reguliere" | "occasionnelle" | "inactive" | "non_verifiable";
    fideliteResponsabilites: "tres_satisfaisant" | "satisfaisant" | "a_ameliorer" | "non_applicable";
    respectValeursDoctrines: "satisfaisant" | "a_ameliorer" | "non_verifiable";
    observationsPastorales?: string;
  };
  // Section D
  recommandation: TypeRecommandation;
  reserves?: ReserveType[];
  reserveAutrePrecision?: string;
  motifsSuspension?: MotifSuspension[];
  motifSuspensionAutrePrecision?: string;
  // Suivi hiérarchique
  statutValidation: "valide" | "en_attente" | "signale_hierarchie";
  visaSuperieur?: {
    niveau: string;
    par: string;
    date: string;
    remarque?: string;
  };
}

// ══════════════════════════════════════════════════════════════════════
// DONNÉES INITIALES RÉALISTES
// ══════════════════════════════════════════════════════════════════════

const INITIAL_MEMBRES: MembreEglise[] = [
  {
    id: "MEM-001",
    matricule: "ADBF-CEN-OUA01-2024-00892",
    nom: "KABORÉ",
    prenoms: "David Wend-Panga",
    sexe: "M",
    dateNaissance: "1991-06-14",
    lieuNaissance: "Ouagadougou",
    telephone: "+226 70 23 45 67",
    email: "david.kabore@email.bf",
    adresse: "Secteur 22, Tampouy",
    cniOuB10: "B12849503",
    statutVital: "actif",
    statutMatrimonial: "marie_civil",
    nomConjoint: "KABORÉ / OUÉDRAOGO Marie",
    matriculeConjoint: "ADBF-CEN-OUA01-2024-00940",
    historiqueMatrimonial: [
      {
        id: "HIST-01",
        ancienStatut: "celibataire",
        nouveauStatut: "marie_civil",
        dateChangement: "18/02/2023",
        nomConjoint: "OUÉDRAOGO Marie",
        dateMariageCivil: "18/02/2023",
        dateBenedictionNuptiale: "25/02/2023",
        pasteurCelebrant: "Pasteur Samuel Kaboré",
        egliseCelebration: "Église Centrale Ouagadougou",
        certificatRef: "LFC-2023-042",
        notePastorale: "Bénédiction nuptiale célébrée avec joie et témoignage exemplaire.",
        auteurModification: "Pasteur Samuel Kaboré"
      }
    ],
    profession: {
      profession: "Professeur de Mathématiques Certifié",
      categorie: "education",
      secteur: "public",
      employeur: "Lycée Mixte de Gounghin",
      talentsMobilisables: ["Enseignement biblique", "Organisation logistique", "Gestion de budget"]
    },
    dateConversion: "2012-04-12",
    dateBaptemeEau: "2012-11-18",
    baptemeSaintEsprit: true,
    ministeres: ["Diaconat", "Moniteur ECODIM"],
    egliseActuelle: "Église Centrale Ouagadougou",
    sousRegionActuelle: "Sous-région Ouaga-Nord",
    regionActuelle: "Région du Centre",
    typeEntree: "conversion_locale",
    dateAdmission: "18/11/2012"
  },
  {
    id: "MEM-002",
    matricule: "ADBF-CEN-OUA01-2024-00741",
    nom: "SOMÉ",
    prenoms: "Ruth Bapio",
    sexe: "F",
    dateNaissance: "1995-03-22",
    lieuNaissance: "Koudougou",
    telephone: "+226 76 88 12 34",
    email: "ruth.some@email.bf",
    adresse: "Secteur 15, Patte d'Oie",
    cniOuB10: "B84920194",
    statutVital: "actif",
    statutMatrimonial: "fiance",
    historiqueMatrimonial: [
      {
        id: "HIST-02",
        ancienStatut: "celibataire",
        nouveauStatut: "fiance",
        dateChangement: "14/05/2026",
        nomConjoint: "BADO Éric (Église Centrale Koudougou)",
        pasteurCelebrant: "Pasteur Samuel Kaboré",
        egliseCelebration: "Église Centrale Ouagadougou",
        notePastorale: "Fiançailles chrétiennes officielles notifiées au Conseil Pastoral.",
        auteurModification: "Pasteur Samuel Kaboré"
      }
    ],
    profession: {
      profession: "Sage-femme diplômée d'État",
      categorie: "sante",
      secteur: "public",
      employeur: "CSPS Somgandé",
      talentsMobilisables: ["Santé communautaire", "Chant choral", "Secourisme"]
    },
    dateConversion: "2018-01-05",
    dateBaptemeEau: "2018-04-29",
    baptemeSaintEsprit: true,
    ministeres: ["Chorale Francophone"],
    egliseActuelle: "Église Centrale Ouagadougou",
    sousRegionActuelle: "Sous-région Ouaga-Nord",
    regionActuelle: "Région du Centre",
    typeEntree: "conversion_locale",
    dateAdmission: "29/04/2018"
  },
  {
    id: "MEM-003",
    matricule: "ADBF-CEN-OUA01-2022-00318",
    nom: "OUÉDRAOGO",
    prenoms: "Mathieu Tégawendé",
    sexe: "M",
    dateNaissance: "1958-09-10",
    lieuNaissance: "Ziniaré",
    telephone: "+226 70 11 22 33",
    adresse: "Secteur 11, Dapoya",
    statutVital: "rappel_seigneur",
    statutMatrimonial: "marie_civil",
    nomConjoint: "OUÉDRAOGO Élisabeth",
    historiqueMatrimonial: [],
    deces: {
      dateDeces: "12/07/2026",
      lieuDeces: "CHU Yalgado Ouédraogo",
      dateInhumation: "15/07/2026",
      lieuInhumation: "Cimetière Municipal de Gounghin",
      pasteurOfficiant: "Pasteur Samuel Kaboré",
      culteActionGrace: "Culte d'action de grâce et d'espérance le 15/07/2026 à 10h00",
      versetCommemoratif: "« J'ai combattu le bon combat, j'ai achevé la course, j'ai gardé la foi. » — 2 Timothée 4:7",
      enregistreLe: "16/07/2026",
      enregistrePar: "Pasteur Samuel Kaboré (Titulaire)"
    },
    profession: {
      profession: "Ancien fonctionnaire (Douanes) à la retraite",
      categorie: "retraite",
      secteur: "public",
      talentsMobilisables: ["Conseil des anciens", "Prière d'intercession"]
    },
    dateConversion: "1980-05-15",
    dateBaptemeEau: "1980-09-20",
    baptemeSaintEsprit: true,
    ministeres: ["Doyen du Conseil des Anciens"],
    egliseActuelle: "Église Centrale Ouagadougou",
    sousRegionActuelle: "Sous-région Ouaga-Nord",
    regionActuelle: "Région du Centre",
    typeEntree: "conversion_locale",
    dateAdmission: "20/09/1980"
  },
  {
    id: "MEM-004",
    matricule: "ADBF-BBO-BET01-2023-01102",
    nom: "SANOU",
    prenoms: "Brahima Moïse",
    sexe: "M",
    dateNaissance: "1989-11-04",
    lieuNaissance: "Bobo-Dioulasso",
    telephone: "+226 78 45 67 89",
    email: "moise.sanou@btp-bf.com",
    adresse: "Secteur 28, Karpala",
    cniOuB10: "B92018471",
    statutVital: "actif",
    statutMatrimonial: "celibataire",
    historiqueMatrimonial: [],
    profession: {
      profession: "Ingénieur Génie Civil & BTP",
      categorie: "ingenierie_btp",
      secteur: "prive",
      employeur: "Société Burkinabè de Construction",
      talentsMobilisables: ["Plans d'architecture", "Suivi des chantiers de temple", "Sono & Électrique"]
    },
    dateConversion: "2014-02-10",
    dateBaptemeEau: "2014-07-27",
    baptemeSaintEsprit: true,
    ministeres: ["Comité Bâtiment & Travaux"],
    egliseActuelle: "Église Centrale Ouagadougou",
    sousRegionActuelle: "Sous-région Ouaga-Nord",
    regionActuelle: "Région du Centre",
    typeEntree: "transfert_adbf",
    egliseOrigine: "Temple Béthel Bobo-Dioulasso",
    dateAdmission: "15/01/2026"
  },
  {
    id: "MEM-005",
    matricule: "ADBF-CEN-OUA01-2025-01429",
    nom: "YAMÉOGO",
    prenoms: "Esther Wend-Yam",
    sexe: "F",
    dateNaissance: "1998-08-19",
    lieuNaissance: "Koudougou",
    telephone: "+226 65 99 88 77",
    adresse: "Secteur 30, Wemtenga",
    statutVital: "actif",
    statutMatrimonial: "celibataire",
    historiqueMatrimonial: [],
    profession: {
      profession: "Comptable & Gestionnaire financière",
      categorie: "juridique_finance",
      secteur: "prive",
      employeur: "Cabinet Audit & Fiscalité",
      talentsMobilisables: ["Audit financier", "Comptabilité paroissiale", "Formation jeunesse JAD"]
    },
    dateConversion: "2019-10-01",
    dateBaptemeEau: "2020-03-15",
    baptemeSaintEsprit: false,
    ministeres: ["Jeunesse JAD", "Comité d'Accueil"],
    egliseActuelle: "Église Centrale Ouagadougou",
    sousRegionActuelle: "Sous-région Ouaga-Nord",
    regionActuelle: "Région du Centre",
    typeEntree: "provenance_externe",
    egliseOrigine: "Église Évangélique de l'Alliance Chrétienne",
    dateAdmission: "04/02/2025"
  }
];

const INITIAL_DOSSIERS: DossierVieEglise[] = [
  {
    id: "REC-2026-001",
    matricule: "ADBF-CEN-OUA01-2024-00892",
    dateEmission: "10/09/2026",
    nom: "KABORÉ",
    prenoms: "David Wend-Panga",
    sexe: "M",
    dateNaissance: "1991-06-14",
    telephone: "+226 70 23 45 67",
    email: "david.kabore@email.bf",
    dateConversion: "2012-04-12",
    dateBaptemeEau: "2012-11-18",
    baptemeSaintEsprit: true,
    ministeres: ["Diaconat", "Moniteur ECODIM"],
    egliseOrigine: "Église Centrale Ouagadougou",
    sousRegionOrigine: "Sous-région Ouaga-Nord",
    regionOrigine: "Région du Centre",
    egliseDestination: "Temple Béthel Bobo-Dioulasso",
    motifTransfert: "Mutation professionnelle (Ministère de l'Éducation)",
    pasteurSignataire: "Pasteur Samuel Kaboré",
    statutMembre: "en_regle",
    appreciation: {
      vieChretienne: "tres_satisfaisant",
      relationsFraternelles: "tres_satisfaisant",
      participationVieEglise: "reguliere",
      fideliteResponsabilites: "tres_satisfaisant",
      respectValeursDoctrines: "satisfaisant",
      observationsPastorales: "Frère très engagé, modèle d'intégrité et de zèle dans l'enseignement des enfants."
    },
    recommandation: "transfert_recommande",
    statutValidation: "valide",
    visaSuperieur: {
      niveau: "Sous-Région",
      par: "Pasteur Samuel Zoungrana",
      date: "11/09/2026",
      remarque: "Dossier vérifié et approuvé sans réserve."
    }
  },
  {
    id: "REC-2026-002",
    matricule: "ADBF-CEN-OUA01-2024-00741",
    dateEmission: "06/09/2026",
    nom: "SOMÉ",
    prenoms: "Ruth Bapio",
    sexe: "F",
    dateNaissance: "1995-03-22",
    telephone: "+226 76 88 12 34",
    email: "ruth.some@email.bf",
    dateConversion: "2018-01-05",
    dateBaptemeEau: "2018-04-29",
    baptemeSaintEsprit: true,
    ministeres: ["Chorale Francophone"],
    egliseOrigine: "Église Centrale Ouagadougou",
    sousRegionOrigine: "Sous-région Ouaga-Nord",
    regionOrigine: "Région du Centre",
    egliseDestination: "Église Centrale Koudougou",
    motifTransfert: "Rapprochement conjugal suite à mariage",
    pasteurSignataire: "Pasteur Samuel Kaboré",
    statutMembre: "accompagnement_restauration",
    appreciation: {
      vieChretienne: "satisfaisant",
      relationsFraternelles: "satisfaisant",
      participationVieEglise: "reguliere",
      fideliteResponsabilites: "satisfaisant",
      respectValeursDoctrines: "satisfaisant",
      observationsPastorales: "Accompagnement pastoral en cours pour consolidation spirituelle et suivi pré-marital."
    },
    recommandation: "transfert_avec_reserve",
    reserves: ["processus_restauration", "situation_pastorale"],
    statutValidation: "signale_hierarchie",
    visaSuperieur: {
      niveau: "Sous-Région",
      par: "Pasteur Samuel Zoungrana",
      date: "08/09/2026",
      remarque: "Contact direct à établir entre le pasteur cédant et le pasteur accueillant de Koudougou."
    }
  }
];

export default function VieEglise({
  initialTab,
  currentScope
}: {
  initialTab?: string | null;
  currentScope?: SupervisionScope;
}) {
  const niveau = currentScope?.niveau || "national";
  const isLocal = niveau === "local";

  // Navigation tabs within Vie de l'Église
  const [activeMainTab, setActiveMainTab] = useState<"registre" | "transferts" | "archives" | "professions">(
    initialTab === "transferts" ? "transferts" : "registre"
  );

  // States: Membres & Recommandations
  const [membres, setMembres] = useState<MembreEglise[]>(INITIAL_MEMBRES);
  const [dossiers, setDossiers] = useState<DossierVieEglise[]>(INITIAL_DOSSIERS);

  // Selection modals
  const [selectedMembre, setSelectedMembre] = useState<MembreEglise | null>(null);
  const [selectedDossier, setSelectedDossier] = useState<DossierVieEglise | null>(null);

  // Sub-modals for special workflows (Points 1, 2, 3, 5)
  const [showNewMembreModal, setShowNewMembreModal] = useState(false);
  const [showMatrimonialModal, setShowMatrimonialModal] = useState(false);
  const [showDecesModal, setShowDecesModal] = useState(false);
  const [showNewAttestationModal, setShowNewAttestationModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Filters & Search
  const [searchMembre, setSearchMembre] = useState("");
  const [filterStatutVital, setFilterStatutVital] = useState<string>("tous");
  const [filterCategoriePro, setFilterCategoriePro] = useState<string>("tous");
  const [filterMatrimonial, setFilterMatrimonial] = useState<string>("tous");

  // Anti-doublon live alert (Point 1)
  const [doublonDetecte, setDoublonDetecte] = useState<MembreEglise | null>(null);

  // New Member Form State (Point 1, 4, 5)
  const [newMembreData, setNewMembreData] = useState<Partial<MembreEglise>>({
    nom: "",
    prenoms: "",
    sexe: "M",
    dateNaissance: "1995-01-01",
    lieuNaissance: "Ouagadougou",
    telephone: "",
    email: "",
    adresse: "",
    cniOuB10: "",
    statutVital: "actif",
    statutMatrimonial: "celibataire",
    profession: {
      profession: "",
      categorie: "autre",
      secteur: "prive",
      employeur: "",
      talentsMobilisables: []
    },
    dateConversion: "2018-01-01",
    dateBaptemeEau: "2018-06-01",
    baptemeSaintEsprit: true,
    ministeres: [],
    typeEntree: "conversion_locale",
    egliseOrigine: "",
    dateAdmission: new Date().toLocaleDateString("fr-FR")
  });

  // Matrimonial update form state (Point 2)
  const [matrimonialForm, setMatrimonialForm] = useState<{
    nouveauStatut: StatutMatrimonial;
    nomConjoint: string;
    matriculeConjoint: string;
    dateMariageCivil: string;
    dateBenedictionNuptiale: string;
    pasteurCelebrant: string;
    egliseCelebration: string;
    certificatRef: string;
    notePastorale: string;
  }>({
    nouveauStatut: "marie_civil",
    nomConjoint: "",
    matriculeConjoint: "",
    dateMariageCivil: new Date().toISOString().split("T")[0],
    dateBenedictionNuptiale: new Date().toISOString().split("T")[0],
    pasteurCelebrant: currentScope?.nom || "Pasteur titulaire",
    egliseCelebration: currentScope?.instance || "Église Centrale Ouagadougou",
    certificatRef: "",
    notePastorale: ""
  });

  // Deces declaration form state (Point 3)
  const [decesForm, setDecesForm] = useState<{
    dateDeces: string;
    lieuDeces: string;
    dateInhumation: string;
    lieuInhumation: string;
    pasteurOfficiant: string;
    culteActionGrace: string;
    versetCommemoratif: string;
  }>({
    dateDeces: new Date().toISOString().split("T")[0],
    lieuDeces: "Domicile",
    dateInhumation: new Date().toISOString().split("T")[0],
    lieuInhumation: "Cimetière Municipal",
    pasteurOfficiant: currentScope?.nom || "Pasteur Samuel Kaboré",
    culteActionGrace: "Culte d'espérance et d'action de grâce célébré au temple",
    versetCommemoratif: "« Car pour moi, Christ est ma vie, et la mort m'est un gain. » — Philippiens 1:21"
  });

  // Attestation Form State (Sections A, B, C, D)
  const [attestationForm, setAttestationForm] = useState<Partial<DossierVieEglise>>({
    nom: "",
    prenoms: "",
    sexe: "M",
    dateNaissance: "1995-01-01",
    telephone: "",
    email: "",
    dateConversion: "2018-01-01",
    dateBaptemeEau: "2018-06-01",
    baptemeSaintEsprit: true,
    ministeres: [],
    egliseOrigine: isLocal ? (currentScope?.instance || "Église Centrale Ouagadougou") : "Église Centrale Ouagadougou",
    sousRegionOrigine: "Sous-région Ouaga-Nord",
    regionOrigine: "Région du Centre",
    egliseDestination: "",
    motifTransfert: "",
    pasteurSignataire: isLocal ? (currentScope?.nom || "Pasteur Samuel Kaboré") : "Pasteur Samuel Kaboré",
    statutMembre: "en_regle",
    statutAutrePrecision: "",
    appreciation: {
      vieChretienne: "satisfaisant",
      relationsFraternelles: "satisfaisant",
      participationVieEglise: "reguliere",
      fideliteResponsabilites: "satisfaisant",
      respectValeursDoctrines: "satisfaisant",
      observationsPastorales: ""
    },
    recommandation: "transfert_recommande",
    reserves: [],
    reserveAutrePrecision: "",
    motifsSuspension: [],
    motifSuspensionAutrePrecision: ""
  });

  const [activeStepAttestation, setActiveStepAttestation] = useState<1 | 2 | 3 | 4>(1);

  // ══════════════════════════════════════════════════════════════════
  // ANTI-DOUBLON LIVE CHECK (Point 1)
  // ══════════════════════════════════════════════════════════════════
  const checkDoublon = (tel: string, nom: string, prenoms: string, dateNaiss: string) => {
    const cleanTel = tel.replace(/\s+/g, "").trim();
    if (!cleanTel && (!nom || !prenoms)) {
      setDoublonDetecte(null);
      return;
    }

    const found = membres.find(m => {
      const matchTel = cleanTel.length >= 8 && m.telephone.replace(/\s+/g, "").includes(cleanTel);
      const matchIdentite =
        nom.trim().length >= 2 &&
        prenoms.trim().length >= 2 &&
        m.nom.toLowerCase().trim() === nom.toLowerCase().trim() &&
        m.prenoms.toLowerCase().trim() === prenoms.toLowerCase().trim() &&
        m.dateNaissance === dateNaiss;
      return matchTel || matchIdentite;
    });

    setDoublonDetecte(found || null);
  };

  // ══════════════════════════════════════════════════════════════════
  // HANDLERS : CREATION, MATRIMONIAL, DÉCÈS
  // ══════════════════════════════════════════════════════════════════

  // 1. Créer un nouveau membre (Point 1 & 4)
  const handleSaveNouveauMembre = (e: React.FormEvent) => {
    e.preventDefault();
    if (doublonDetecte) {
      alert("Impossible d'enregistrer : un doublon avec la même identité/téléphone existe déjà.");
      return;
    }

    const newId = `MEM-${String(membres.length + 1).padStart(3, "0")}`;
    const seq = String(Math.floor(100 + Math.random() * 900));
    const annee = new Date().getFullYear();
    const newMatricule = `ADBF-CEN-OUA01-${annee}-${seq}`;

    const membreComplet: MembreEglise = {
      id: newId,
      matricule: newMatricule,
      nom: (newMembreData.nom || "").toUpperCase().trim(),
      prenoms: (newMembreData.prenoms || "").trim(),
      sexe: newMembreData.sexe || "M",
      dateNaissance: newMembreData.dateNaissance || "1995-01-01",
      lieuNaissance: newMembreData.lieuNaissance || "Ouagadougou",
      telephone: newMembreData.telephone || "",
      email: newMembreData.email,
      adresse: newMembreData.adresse || "",
      cniOuB10: newMembreData.cniOuB10,
      statutVital: "actif",
      statutMatrimonial: newMembreData.statutMatrimonial || "celibataire",
      historiqueMatrimonial: [],
      profession: {
        profession: newMembreData.profession?.profession || "Non renseigné",
        categorie: newMembreData.profession?.categorie || "autre",
        secteur: newMembreData.profession?.secteur || "prive",
        employeur: newMembreData.profession?.employeur,
        talentsMobilisables: newMembreData.profession?.talentsMobilisables || []
      },
      dateConversion: newMembreData.dateConversion || "2018-01-01",
      dateBaptemeEau: newMembreData.dateBaptemeEau || "2018-06-01",
      baptemeSaintEsprit: newMembreData.baptemeSaintEsprit ?? true,
      ministeres: newMembreData.ministeres || [],
      egliseActuelle: currentScope?.instance || "Église Centrale Ouagadougou",
      sousRegionActuelle: "Sous-région Ouaga-Nord",
      regionActuelle: "Région du Centre",
      typeEntree: newMembreData.typeEntree || "conversion_locale",
      egliseOrigine: newMembreData.egliseOrigine,
      dateAdmission: new Date().toLocaleDateString("fr-FR")
    };

    setMembres([membreComplet, ...membres]);
    setShowNewMembreModal(false);
    setSelectedMembre(membreComplet);
    setDoublonDetecte(null);
  };

  // 2. Mettre à jour la situation matrimoniale (Point 2)
  const handleUpdateMatrimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMembre) return;

    const nouvelHist: HistoriqueMatrimonial = {
      id: `HIST-${Date.now()}`,
      ancienStatut: selectedMembre.statutMatrimonial,
      nouveauStatut: matrimonialForm.nouveauStatut,
      dateChangement: new Date().toLocaleDateString("fr-FR"),
      nomConjoint: matrimonialForm.nomConjoint,
      matriculeConjoint: matrimonialForm.matriculeConjoint,
      dateMariageCivil: matrimonialForm.dateMariageCivil,
      dateBenedictionNuptiale: matrimonialForm.dateBenedictionNuptiale,
      pasteurCelebrant: matrimonialForm.pasteurCelebrant,
      egliseCelebration: matrimonialForm.egliseCelebration,
      certificatRef: matrimonialForm.certificatRef,
      notePastorale: matrimonialForm.notePastorale,
      auteurModification: currentScope?.nom || "Pasteur titulaire"
    };

    const updatedMembres = membres.map(m => {
      if (m.id === selectedMembre.id) {
        return {
          ...m,
          statutMatrimonial: matrimonialForm.nouveauStatut,
          nomConjoint: matrimonialForm.nomConjoint || m.nomConjoint,
          matriculeConjoint: matrimonialForm.matriculeConjoint || m.matriculeConjoint,
          historiqueMatrimonial: [nouvelHist, ...m.historiqueMatrimonial]
        };
      }
      return m;
    });

    setMembres(updatedMembres);
    setSelectedMembre({
      ...selectedMembre,
      statutMatrimonial: matrimonialForm.nouveauStatut,
      nomConjoint: matrimonialForm.nomConjoint || selectedMembre.nomConjoint,
      matriculeConjoint: matrimonialForm.matriculeConjoint || selectedMembre.matriculeConjoint,
      historiqueMatrimonial: [nouvelHist, ...selectedMembre.historiqueMatrimonial]
    });
    setShowMatrimonialModal(false);
  };

  // 3. Déclarer le rappel auprès du Seigneur (Point 3)
  const handleDeclareDeces = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMembre) return;

    const infoDeces: InformationDeces = {
      dateDeces: decesForm.dateDeces,
      lieuDeces: decesForm.lieuDeces,
      dateInhumation: decesForm.dateInhumation,
      lieuInhumation: decesForm.lieuInhumation,
      pasteurOfficiant: decesForm.pasteurOfficiant,
      culteActionGrace: decesForm.culteActionGrace,
      versetCommemoratif: decesForm.versetCommemoratif,
      enregistreLe: new Date().toLocaleDateString("fr-FR"),
      enregistrePar: currentScope?.nom || "Pasteur titulaire"
    };

    const updatedMembres = membres.map(m => {
      if (m.id === selectedMembre.id) {
        return {
          ...m,
          statutVital: "rappel_seigneur" as StatutVital,
          deces: infoDeces
        };
      }
      return m;
    });

    setMembres(updatedMembres);
    setSelectedMembre({
      ...selectedMembre,
      statutVital: "rappel_seigneur",
      deces: infoDeces
    });
    setShowDecesModal(false);
  };

  // 4. Lancer une recommandation de transfert depuis une fiche membre
  const handleInitierRecommandation = (membre: MembreEglise) => {
    setAttestationForm({
      nom: membre.nom,
      prenoms: membre.prenoms,
      sexe: membre.sexe,
      dateNaissance: membre.dateNaissance,
      telephone: membre.telephone,
      email: membre.email || "",
      dateConversion: membre.dateConversion,
      dateBaptemeEau: membre.dateBaptemeEau,
      baptemeSaintEsprit: membre.baptemeSaintEsprit,
      ministeres: membre.ministeres,
      egliseOrigine: membre.egliseActuelle,
      sousRegionOrigine: membre.sousRegionActuelle,
      regionOrigine: membre.regionActuelle,
      egliseDestination: "",
      motifTransfert: "Mutation / Rapprochement",
      pasteurSignataire: currentScope?.nom || "Pasteur Samuel Kaboré",
      statutMembre: "en_regle",
      appreciation: {
        vieChretienne: "tres_satisfaisant",
        relationsFraternelles: "tres_satisfaisant",
        participationVieEglise: "reguliere",
        fideliteResponsabilites: "tres_satisfaisant",
        respectValeursDoctrines: "satisfaisant",
        observationsPastorales: `Membre inscrit sous le matricule ${membre.matricule}. Profession : ${membre.profession.profession}.`
      },
      recommandation: "transfert_recommande",
      reserves: [],
      motifsSuspension: []
    });
    setActiveStepAttestation(1);
    setShowNewAttestationModal(true);
  };

  // 5. Enregistrer attestation officielle
  const handleSaveAttestation = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `REC-2026-${String(dossiers.length + 1).padStart(3, "0")}`;
    const today = new Date().toLocaleDateString("fr-FR");

    const newDossier: DossierVieEglise = {
      id: newId,
      matricule: attestationForm.matricule || `ADBF-CEN-OUA01-2026-${Math.floor(100 + Math.random() * 900)}`,
      dateEmission: today,
      nom: (attestationForm.nom || "").toUpperCase(),
      prenoms: attestationForm.prenoms || "",
      sexe: attestationForm.sexe || "M",
      dateNaissance: attestationForm.dateNaissance || "1995-01-01",
      telephone: attestationForm.telephone || "",
      email: attestationForm.email || "",
      dateConversion: attestationForm.dateConversion || "2018-01-01",
      dateBaptemeEau: attestationForm.dateBaptemeEau || "2018-06-01",
      baptemeSaintEsprit: attestationForm.baptemeSaintEsprit ?? true,
      ministeres: attestationForm.ministeres || [],
      egliseOrigine: attestationForm.egliseOrigine || currentScope?.instance || "Église Centrale Ouagadougou",
      sousRegionOrigine: "Sous-région Ouaga-Nord",
      regionOrigine: "Région du Centre",
      egliseDestination: attestationForm.egliseDestination || "Église de destination",
      motifTransfert: attestationForm.motifTransfert || "Raison personnelle",
      pasteurSignataire: attestationForm.pasteurSignataire || currentScope?.nom || "Pasteur Samuel Kaboré",
      statutMembre: attestationForm.statutMembre || "en_regle",
      statutAutrePrecision: attestationForm.statutAutrePrecision,
      appreciation: {
        vieChretienne: attestationForm.appreciation?.vieChretienne || "satisfaisant",
        relationsFraternelles: attestationForm.appreciation?.relationsFraternelles || "satisfaisant",
        participationVieEglise: attestationForm.appreciation?.participationVieEglise || "reguliere",
        fideliteResponsabilites: attestationForm.appreciation?.fideliteResponsabilites || "satisfaisant",
        respectValeursDoctrines: attestationForm.appreciation?.respectValeursDoctrines || "satisfaisant",
        observationsPastorales: attestationForm.appreciation?.observationsPastorales || ""
      },
      recommandation: attestationForm.recommandation || "transfert_recommande",
      reserves: attestationForm.reserves || [],
      reserveAutrePrecision: attestationForm.reserveAutrePrecision,
      motifsSuspension: attestationForm.motifsSuspension || [],
      motifSuspensionAutrePrecision: attestationForm.motifSuspensionAutrePrecision,
      statutValidation: attestationForm.recommandation === "recommandation_suspendue" ? "signale_hierarchie" : "valide"
    };

    setDossiers([newDossier, ...dossiers]);
    setShowNewAttestationModal(false);
    setSelectedDossier(newDossier);
  };

  // ══════════════════════════════════════════════════════════════════
  // COMPTEURS STATISTIQUES (Point 3 : Exclusion automatique des décédés)
  // ══════════════════════════════════════════════════════════════════
  const totalMembresEnregistres = membres.length;
  const totalMembresActifs = membres.filter(m => m.statutVital === "actif").length;
  const totalMembresDecedes = membres.filter(m => m.statutVital === "rappel_seigneur").length;
  const totalNouveauxArrivants = membres.filter(m => m.typeEntree === "transfert_adbf" || m.typeEntree === "provenance_externe").length;

  // Filtrage des membres
  const filteredMembres = useMemo(() => {
    return membres.filter(m => {
      // Exclure ou inclure les décédés selon l'onglet
      if (activeMainTab === "archives") {
        if (m.statutVital !== "rappel_seigneur") return false;
      } else if (activeMainTab === "professions") {
        if (m.statutVital === "rappel_seigneur") return false;
        if (filterCategoriePro !== "tous" && m.profession.categorie !== filterCategoriePro) return false;
      } else {
        // Dans le registre standard, on affiche par défaut les vivants sauf filtre explicite
        if (filterStatutVital !== "rappel_seigneur" && m.statutVital === "rappel_seigneur" && filterStatutVital !== "tous") return false;
        if (filterStatutVital !== "tous" && m.statutVital !== filterStatutVital) return false;
      }

      if (filterMatrimonial !== "tous" && m.statutMatrimonial !== filterMatrimonial) return false;

      const q = searchMembre.toLowerCase();
      return (
        m.nom.toLowerCase().includes(q) ||
        m.prenoms.toLowerCase().includes(q) ||
        m.matricule.toLowerCase().includes(q) ||
        m.telephone.includes(q) ||
        m.profession.profession.toLowerCase().includes(q)
      );
    });
  }, [membres, activeMainTab, searchMembre, filterStatutVital, filterCategoriePro, filterMatrimonial]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ══ EN-TÊTE DE LA PAGE ══ */}
      <div className="page-header flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
              {isLocal ? "Échelon Église locale" : `Supervision ${currentScope?.instance || "Hiérarchique"}`}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Circonscription : <strong>{currentScope?.instance || "Bureau National"}</strong>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
              <CheckCircle2 size={11} /> Unicité & Registre 3R
            </span>
          </div>
          <h1 className="section-title text-2xl sm:text-3xl text-slate-900 font-extrabold" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Vie de l'Église & Registre des Membres
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Gestion intégrée des fidèles : Prévention active des doublons, actualisation des statuts matrimoniaux avec historique, traçabilité des rappels à Dieu, cartographie des compétences et recommandations pastorales.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0 flex-wrap">
          {isLocal && (
            <>
              <button
                onClick={() => {
                  setDoublonDetecte(null);
                  setShowNewMembreModal(true);
                }}
                className="btn-primary flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                <UserPlus size={15} /> Nouveau membre (Anti-doublon)
              </button>
              <button
                onClick={() => {
                  setActiveStepAttestation(1);
                  setShowNewAttestationModal(true);
                }}
                className="btn-secondary flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <FileText size={14} /> Attestation & Recommandation
              </button>
            </>
          )}
          <button
            onClick={() => window.print()}
            className="btn-secondary flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer"
            title="Imprimer"
          >
            <Printer size={14} /> Imprimer
          </button>
        </div>
      </div>

      {/* ══ COMPTEURS STATISTIQUES AVEC RETRAIT AUTOMATIQUE DES DÉCÉDÉS (Point 3) ══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="card p-4 flex items-center justify-between border-l-4" style={{ borderLeftColor: "#0F78C8" }}>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Membres Actifs (Communicants)</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{totalMembresActifs}</p>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">✓ En règle dans l'assemblée</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-50 text-sky-700">
            <Users size={20} />
          </div>
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4" style={{ borderLeftColor: "#16A34A" }}>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Nouveaux Arrivants (2026)</p>
            <p className="text-2xl font-bold text-emerald-700 mt-1">{totalNouveauxArrivants}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Transferts & Provenances externes</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-700">
            <UserCheck size={20} />
          </div>
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4" style={{ borderLeftColor: "#7C3AED" }}>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Dossiers Recommandations</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">{dossiers.length}</p>
            <p className="text-[10px] text-purple-600 mt-0.5">Attestations officielles A, B, C, D</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-50 text-purple-700">
            <FileText size={20} />
          </div>
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4" style={{ borderLeftColor: "#64748B" }}>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Rappelés à Dieu (Archives)</p>
            <p className="text-2xl font-bold text-slate-700 mt-1">{totalMembresDecedes}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Déduits des membres actifs</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 text-slate-600">
            <HeartHandshake size={20} />
          </div>
        </div>
      </div>

      {/* ══ ONGLETS PRINCIPAUX DU MODULE ══ */}
      <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold">
        {[
          { id: "registre", label: "Registre des Membres", icon: Users, count: totalMembresActifs },
          { id: "transferts", label: "Recommandations & Transferts", icon: FileText, count: dossiers.length },
          { id: "professions", label: "Activités Professionnelles & Talents", icon: Briefcase, count: totalMembresActifs },
          { id: "archives", label: "Archives Mémorielles (Décès)", icon: HeartHandshake, count: totalMembresDecedes },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveMainTab(tab.id as any)}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeMainTab === tab.id
                ? "border-sky-600 text-sky-700 font-extrabold bg-sky-50/50"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <tab.icon size={15} />
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeMainTab === tab.id ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-600"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* VUE 1 : REGISTRE DES MEMBRES                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {(activeMainTab === "registre" || activeMainTab === "professions" || activeMainTab === "archives") && (
        <div className="space-y-4">
          {/* BARRE DE FILTRES */}
          <div className="card p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 sm:max-w-md">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Recherche membre par nom, matricule, téléphone, profession..."
                  value={searchMembre}
                  onChange={e => setSearchMembre(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {activeMainTab === "professions" && (
                  <select
                    value={filterCategoriePro}
                    onChange={e => setFilterCategoriePro(e.target.value)}
                    className="text-xs py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 cursor-pointer"
                  >
                    <option value="tous">Toutes les catégories pro</option>
                    <option value="education">Éducation & Enseignement</option>
                    <option value="sante">Santé & Médecine</option>
                    <option value="fonction_publique">Fonction publique</option>
                    <option value="ingenierie_btp">Ingénierie & BTP</option>
                    <option value="juridique_finance">Finance, Audit & Droit</option>
                    <option value="commerce">Commerce & Affaires</option>
                    <option value="artisanat">Artisanat & Technique</option>
                    <option value="agriculture">Agriculture & Élevage</option>
                    <option value="retraite">Retraités</option>
                  </select>
                )}

                <select
                  value={filterMatrimonial}
                  onChange={e => setFilterMatrimonial(e.target.value)}
                  className="text-xs py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 cursor-pointer"
                >
                  <option value="tous">Toutes situations matrimoniales</option>
                  <option value="celibataire">Célibataire</option>
                  <option value="fiance">Fiancé(e)</option>
                  <option value="marie_civil">Marié(e) civilement</option>
                  <option value="benediction_nuptiale">Bénédiction nuptiale AD</option>
                  <option value="veuf">Veuf / Veuve</option>
                  <option value="divorce">Divorcé(e)</option>
                </select>
              </div>
            </div>
          </div>

          {/* TABLEAU DES MEMBRES */}
          <div className="card overflow-hidden">
            <div className="p-3.5 border-b flex items-center justify-between bg-slate-50/70">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700">
                {activeMainTab === "archives"
                  ? "Mémorial — Membres rappelés auprès du Seigneur"
                  : activeMainTab === "professions"
                  ? "Répertoire des compétences & talents des membres"
                  : `Liste des fidèles enregistrés (${filteredMembres.length})`}
              </span>
              <span className="text-[11px] text-slate-500">
                {activeMainTab === "archives"
                  ? "Conservés pour l'histoire de l'assemblée"
                  : "Unicité vérifiée par matricule national"}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="data-table w-full text-left">
                <thead>
                  <tr className="bg-slate-100 text-[11px] text-slate-600 uppercase tracking-wider font-bold">
                    <th className="py-3 px-4">Matricule & Identité</th>
                    <th className="py-3 px-4">Contact & Adresse</th>
                    <th className="py-3 px-4">Statut Matrimonial</th>
                    <th className="py-3 px-4">Activité Professionnelle</th>
                    <th className="py-3 px-4">Parcours & Origine</th>
                    <th className="py-3 px-4">Statut Vital</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {filteredMembres.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-slate-400">
                        Aucun membre trouvé dans cette catégorie.
                      </td>
                    </tr>
                  ) : (
                    filteredMembres.map(m => (
                      <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            <span>{m.nom} {m.prenoms}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 font-semibold">{m.sexe}</span>
                          </div>
                          <div className="font-mono text-[10px] text-sky-800 font-bold mt-0.5">{m.matricule}</div>
                          <div className="text-[10px] text-slate-400">Né(e) le {m.dateNaissance} à {m.lieuNaissance}</div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-800 flex items-center gap-1">
                            <Phone size={11} className="text-emerald-600" /> {m.telephone}
                          </div>
                          {m.email && <div className="text-[11px] text-slate-500">{m.email}</div>}
                          <div className="text-[10px] text-slate-400 mt-0.5">{m.adresse}</div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                            {m.statutMatrimonial === "celibataire" && "Célibataire"}
                            {m.statutMatrimonial === "fiance" && "Fiancé(e)"}
                            {m.statutMatrimonial === "marie_civil" && "Marié(e) civilement"}
                            {m.statutMatrimonial === "benediction_nuptiale" && "Bénédiction Nuptiale"}
                            {m.statutMatrimonial === "veuf" && "Veuf / Veuve"}
                            {m.statutMatrimonial === "divorce" && "Divorcé(e)"}
                          </span>
                          {m.nomConjoint && (
                            <div className="text-[10px] text-slate-600 mt-1 truncate max-w-[160px]">
                              Conj : <strong>{m.nomConjoint}</strong>
                            </div>
                          )}
                          {m.historiqueMatrimonial.length > 0 && (
                            <div className="text-[9px] text-slate-400 mt-0.5 flex items-center gap-1">
                              <History size={10} /> {m.historiqueMatrimonial.length} événement(s) archivé(s)
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-800">{m.profession.profession}</div>
                          <div className="text-[10px] text-slate-500 capitalize">{m.profession.categorie.replace("_", " ")} · {m.profession.secteur}</div>
                          {m.profession.talentsMobilisables.length > 0 && (
                            <div className="flex gap-1 flex-wrap mt-1">
                              {m.profession.talentsMobilisables.slice(0, 2).map(t => (
                                <span key={t} className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${
                            m.typeEntree === "conversion_locale"
                              ? "bg-emerald-50 text-emerald-800"
                              : m.typeEntree === "transfert_adbf"
                              ? "bg-sky-50 text-sky-800"
                              : "bg-amber-50 text-amber-800"
                          }`}>
                            {m.typeEntree === "conversion_locale" && "Conversion locale"}
                            {m.typeEntree === "transfert_adbf" && "Transfert entrant AD"}
                            {m.typeEntree === "provenance_externe" && "Origine externe"}
                          </span>
                          {m.egliseOrigine && (
                            <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[150px]">
                              De : {m.egliseOrigine}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          {m.statutVital === "actif" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              <CheckCircle2 size={11} /> Actif
                            </span>
                          )}
                          {m.statutVital === "rappel_seigneur" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                              🕊️ Rappelé à Dieu
                            </span>
                          )}
                          {m.statutVital === "inactif" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              <Clock size={11} /> Inactif
                            </span>
                          )}
                          {m.statutVital === "sous_discipline" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                              <AlertTriangle size={11} /> Discipline
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedMembre(m)}
                              className="p-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors cursor-pointer"
                              title="Consulter la fiche complète"
                            >
                              <Eye size={14} />
                            </button>
                            {isLocal && m.statutVital === "actif" && (
                              <button
                                onClick={() => handleInitierRecommandation(m)}
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                                title="Initier une attestation / recommandation de transfert"
                              >
                                <FileText size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* VUE 2 : RECOMMANDATIONS & TRANSFERTS (SECTIONS A, B, C, D)    */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeMainTab === "transferts" && (
        <div className="space-y-4">
          <div className="card overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between bg-slate-50/70">
              <span className="font-bold text-sm text-slate-800">
                Registres des Recommandations et Attestations officielles ({dossiers.length})
              </span>
              <span className="text-xs text-slate-500">
                Remontée synchronisée vers les échelons supérieurs (Sous-région, Région, BEN)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="data-table w-full text-left">
                <thead>
                  <tr className="bg-slate-100 text-[11px] text-slate-600 uppercase tracking-wider font-bold">
                    <th className="py-3 px-4">Réf / Date</th>
                    <th className="py-3 px-4">Membre</th>
                    <th className="py-3 px-4">Église Origine & Destination</th>
                    <th className="py-3 px-4">Situation Ecclésiastique</th>
                    <th className="py-3 px-4">Recommandation</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {dossiers.map(dossier => (
                    <tr key={dossier.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{dossier.id}</div>
                        <div className="text-[10px] text-slate-400">{dossier.dateEmission}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{dossier.nom} {dossier.prenoms}</div>
                        <div className="font-mono text-[10px] text-slate-500">{dossier.matricule}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div>De : <strong>{dossier.egliseOrigine}</strong></div>
                        <div className="text-amber-800">Vers : <strong>{dossier.egliseDestination}</strong></div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                          {dossier.statutMembre === "en_regle" ? "Membre en règle" : dossier.statutMembre}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800">
                          {dossier.recommandation.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedDossier(dossier);
                            setShowPrintModal(true);
                          }}
                          className="btn-secondary text-xs px-2.5 py-1 cursor-pointer"
                        >
                          <Printer size={13} /> Certificat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODAL 1 : FICHE MEMBRE COMPLÈTE & HISTORIQUE (Points 2, 3, 4) */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {selectedMembre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-sky-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center font-bold text-base text-amber-300 border border-white/20">
                  {selectedMembre.nom[0]}{selectedMembre.prenoms[0]}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{selectedMembre.nom} {selectedMembre.prenoms}</h3>
                  <p className="text-xs text-sky-200 font-mono">
                    Matricule Unique National : <strong>{selectedMembre.matricule}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMembre(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
              {/* BANDEAU MÉMORIEL EN CAS DE DÉCÈS (Point 3) */}
              {selectedMembre.statutVital === "rappel_seigneur" && selectedMembre.deces && (
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 space-y-2">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <span>🕊️ Rappelé(e) auprès du Seigneur le {selectedMembre.deces.dateDeces}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                      Archivé commémoratif
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Lieu du décès : <strong>{selectedMembre.deces.lieuDeces}</strong> · Inhumé(e) le <strong>{selectedMembre.deces.dateInhumation}</strong> à <strong>{selectedMembre.deces.lieuInhumation}</strong>.
                  </p>
                  <p className="text-xs italic text-slate-700 font-serif">
                    {selectedMembre.deces.versetCommemoratif}
                  </p>
                  <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                    Pasteur officiant : {selectedMembre.deces.pasteurOfficiant} · {selectedMembre.deces.culteActionGrace}
                  </p>
                </div>
              )}

              {/* BLOC ÉTAT CIVIL & CONTACT */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 text-[11px]">Sexe & Date de Naissance :</span>
                  <p className="font-bold text-slate-800">{selectedMembre.sexe === "M" ? "Masculin" : "Féminin"} · {selectedMembre.dateNaissance} ({selectedMembre.lieuNaissance})</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Téléphone & Contact :</span>
                  <p className="font-bold text-slate-800">{selectedMembre.telephone}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Pièce d'identité (CNI / B10) :</span>
                  <p className="font-mono text-slate-800">{selectedMembre.cniOuB10 || "Non renseigné"}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Adresse / Quartier :</span>
                  <p className="font-medium text-slate-800">{selectedMembre.adresse}</p>
                </div>
              </div>

              {/* BLOC SITUATION MATRIMONIALE & HISTORIQUE (Point 2) */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <Heart size={15} className="text-rose-600" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
                      Situation Matrimoniale Actuelle
                    </span>
                  </div>
                  {isLocal && selectedMembre.statutVital === "actif" && (
                    <button
                      onClick={() => setShowMatrimonialModal(true)}
                      className="text-sky-700 hover:text-sky-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      Modifier le statut matrimonial →
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900 px-3 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                    {selectedMembre.statutMatrimonial === "celibataire" && "Célibataire"}
                    {selectedMembre.statutMatrimonial === "fiance" && "Fiancé(e)"}
                    {selectedMembre.statutMatrimonial === "marie_civil" && "Marié(e) civilement"}
                    {selectedMembre.statutMatrimonial === "benediction_nuptiale" && "Bénédiction Nuptiale à l'Église"}
                    {selectedMembre.statutMatrimonial === "veuf" && "Veuf / Veuve"}
                    {selectedMembre.statutMatrimonial === "divorce" && "Divorcé(e)"}
                  </span>
                  {selectedMembre.nomConjoint && (
                    <span className="text-xs text-slate-700">
                      Conjoint(e) : <strong>{selectedMembre.nomConjoint}</strong>
                    </span>
                  )}
                </div>

                {/* TIMELINE HISTORIQUE MATRIMONIAL */}
                {selectedMembre.historiqueMatrimonial.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                      <History size={12} /> Historique & Traçabilité des changements d'état civil :
                    </span>
                    <div className="space-y-2">
                      {selectedMembre.historiqueMatrimonial.map(h => (
                        <div key={h.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                          <div className="flex items-center justify-between font-semibold text-slate-800">
                            <span>{h.ancienStatut} ➔ {h.nouveauStatut}</span>
                            <span className="text-slate-400">{h.dateChangement}</span>
                          </div>
                          {h.nomConjoint && <div>Conjoint(e) : {h.nomConjoint}</div>}
                          {h.pasteurCelebrant && <div>Pasteur célébrant : {h.pasteurCelebrant} ({h.egliseCelebration})</div>}
                          {h.notePastorale && <div className="italic text-slate-600">« {h.notePastorale} »</div>}
                          <div className="text-[10px] text-slate-400">Enregistré par : {h.auteurModification}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* BLOC ACTIVITÉ PROFESSIONNELLE & TALENTS (Point 4) */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 border-b pb-2">
                  <Briefcase size={15} className="text-amber-600" />
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
                    Activité Professionnelle & Compétences Mobilisables
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 text-[11px]">Profession / Métier :</span>
                    <p className="font-bold text-slate-900 text-sm">{selectedMembre.profession.profession}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px]">Secteur & Employeur :</span>
                    <p className="font-semibold text-slate-800 capitalize">
                      {selectedMembre.profession.secteur} · {selectedMembre.profession.employeur || "Indépendant / Non précisé"}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-[11px] font-bold block mb-1">
                    Talents et compétences mobilisables pour l'Église et la mission :
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {selectedMembre.profession.talentsMobilisables.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                        ⭐ {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ACTIONS PASTORALES DU MEMBRE (Point 3 : Décès / Point 5 : Transfert) */}
              {isLocal && selectedMembre.statutVital === "actif" && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-600 font-medium">
                    Actions pastorales sur la fiche :
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleInitierRecommandation(selectedMembre)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      Émettre transfert
                    </button>
                    <button
                      onClick={() => setShowDecesModal(true)}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-300 transition-colors cursor-pointer"
                    >
                      Enregistrer décès (Archive)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedMembre(null)}
                className="btn-secondary text-xs px-4 py-2 cursor-pointer"
              >
                Fermer
              </button>
              <button
                onClick={() => window.print()}
                className="btn-primary flex items-center gap-2 text-xs px-4 py-2 cursor-pointer"
              >
                <Printer size={14} /> Imprimer fiche membre
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODAL 2 : NOUVEAU MEMBRE AVEC CONTRÔLE ANTI-DOUBLON (Point 1, 4) */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {showNewMembreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-sky-950 to-blue-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Nouvelle fiche d'identification paroissiale
                </span>
                <h3 className="font-extrabold text-base text-white">Enregistrement d'un membre avec contrôle anti-doublon</h3>
              </div>
              <button
                onClick={() => setShowNewMembreModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveNouveauMembre} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs text-slate-700">
              {/* ALERTE ANTI-DOUBLON EN DIRECT (Point 1) */}
              {doublonDetecte && (
                <div className="p-4 rounded-xl bg-red-50 border-2 border-red-300 text-red-900 flex items-start gap-3 animate-in shake">
                  <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-xs">DOUBLON DÉTECTÉ DANS LE SYSTÈME !</p>
                    <p className="text-[11px] leading-relaxed">
                      Un membre portant le même numéro de téléphone ou la même identité existe déjà :<br />
                      <strong>{doublonDetecte.nom} {doublonDetecte.prenoms}</strong> (Matricule : <code className="font-bold">{doublonDetecte.matricule}</code>) à l'église <em>{doublonDetecte.egliseActuelle}</em>.
                    </p>
                    <p className="text-[10px] text-red-700 italic">
                      Pour garantir l'unicité de la base ecclésiale, veuillez ne pas créer de nouvelle fiche. Utilisez plutôt la procédure de transfert ou rattachez la fiche existante.
                    </p>
                  </div>
                </div>
              )}

              {/* ORIGINE DU MEMBRE (Point 5) */}
              <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200">
                <label className="font-bold text-xs text-sky-900 block mb-1.5">Type d'entrée / Origine du fidèle :</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { val: "conversion_locale", label: "Conversion / Baptême local" },
                    { val: "transfert_adbf", label: "Transfert reçu d'une église AD" },
                    { val: "provenance_externe", label: "Provenance église externe" },
                  ].map(opt => (
                    <label key={opt.val} className={`p-2 rounded-lg border text-center cursor-pointer font-semibold ${newMembreData.typeEntree === opt.val ? "bg-sky-600 text-white border-sky-600" : "bg-white text-slate-700 border-slate-200"}`}>
                      <input
                        type="radio"
                        name="typeEntree"
                        className="sr-only"
                        checked={newMembreData.typeEntree === opt.val}
                        onChange={() => setNewMembreData({ ...newMembreData, typeEntree: opt.val as any })}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                {newMembreData.typeEntree !== "conversion_locale" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Nom de l'église d'origine et ville/pays..."
                      value={newMembreData.egliseOrigine || ""}
                      onChange={e => setNewMembreData({ ...newMembreData, egliseOrigine: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                    />
                  </div>
                )}
              </div>

              {/* IDENTITÉ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nom de famille *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : KABORÉ"
                    value={newMembreData.nom}
                    onChange={e => {
                      const v = e.target.value.toUpperCase();
                      setNewMembreData({ ...newMembreData, nom: v });
                      checkDoublon(newMembreData.telephone || "", v, newMembreData.prenoms || "", newMembreData.dateNaissance || "");
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Prénoms *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : David Wend-Panga"
                    value={newMembreData.prenoms}
                    onChange={e => {
                      const v = e.target.value;
                      setNewMembreData({ ...newMembreData, prenoms: v });
                      checkDoublon(newMembreData.telephone || "", newMembreData.nom || "", v, newMembreData.dateNaissance || "");
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Téléphone (Clé forte d'unicité) *</label>
                  <input
                    type="text"
                    required
                    placeholder="+226 XX XX XX XX"
                    value={newMembreData.telephone}
                    onChange={e => {
                      const v = e.target.value;
                      setNewMembreData({ ...newMembreData, telephone: v });
                      checkDoublon(v, newMembreData.nom || "", newMembreData.prenoms || "", newMembreData.dateNaissance || "");
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date de naissance *</label>
                  <input
                    type="date"
                    required
                    value={newMembreData.dateNaissance}
                    onChange={e => {
                      const v = e.target.value;
                      setNewMembreData({ ...newMembreData, dateNaissance: v });
                      checkDoublon(newMembreData.telephone || "", newMembreData.nom || "", newMembreData.prenoms || "", v);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sexe *</label>
                  <select
                    value={newMembreData.sexe}
                    onChange={e => setNewMembreData({ ...newMembreData, sexe: e.target.value as "M" | "F" })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                  >
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Situation matrimoniale initiale *</label>
                  <select
                    value={newMembreData.statutMatrimonial}
                    onChange={e => setNewMembreData({ ...newMembreData, statutMatrimonial: e.target.value as StatutMatrimonial })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none font-semibold"
                  >
                    <option value="celibataire">Célibataire</option>
                    <option value="fiance">Fiancé(e)</option>
                    <option value="marie_civil">Marié(e) civilement</option>
                    <option value="benediction_nuptiale">Bénédiction nuptiale à l'Église</option>
                    <option value="veuf">Veuf / Veuve</option>
                    <option value="divorce">Divorcé(e)</option>
                  </select>
                </div>
              </div>

              {/* ACTIVITÉ PROFESSIONNELLE & TALENTS (Point 4) */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <p className="font-bold text-xs text-slate-800 uppercase tracking-wide">Activité professionnelle & Talents</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Profession / Métier *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Infirmier d'État, Enseignant, Maçon..."
                      value={newMembreData.profession?.profession}
                      onChange={e => setNewMembreData({
                        ...newMembreData,
                        profession: { ...newMembreData.profession!, profession: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Catégorie socio-professionnelle</label>
                    <select
                      value={newMembreData.profession?.categorie}
                      onChange={e => setNewMembreData({
                        ...newMembreData,
                        profession: { ...newMembreData.profession!, categorie: e.target.value as any }
                      })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                    >
                      <option value="education">Éducation & Enseignement</option>
                      <option value="sante">Santé & Action sociale</option>
                      <option value="fonction_publique">Fonction publique / Administration</option>
                      <option value="commerce">Commerce & Prestations</option>
                      <option value="artisanat">Artisanat & Métiers manuels</option>
                      <option value="agriculture">Agriculture & Élevage</option>
                      <option value="ingenierie_btp">Ingénierie & BTP</option>
                      <option value="juridique_finance">Droit, Gestion & Finance</option>
                      <option value="etudiant">Étudiant / Élève</option>
                      <option value="retraite">Retraité</option>
                      <option value="autre">Autre profession</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bouton de soumission */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowNewMembreModal(false)}
                  className="btn-secondary text-xs px-4 py-2 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!!doublonDetecte}
                  className={`btn-primary text-xs px-5 py-2 font-bold cursor-pointer ${
                    doublonDetecte ? "opacity-50 cursor-not-allowed bg-slate-400" : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  Enregistrer la fiche unique
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODAL 3 : MISE À JOUR STATUT MATRIMONIAL (Point 2)            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {showMatrimonialModal && selectedMembre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-5 sm:p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                  Mise à jour sans recréation de fiche
                </span>
                <h3 className="font-extrabold text-base text-slate-900">
                  Actualiser la situation matrimoniale
                </h3>
              </div>
              <button
                onClick={() => setShowMatrimonialModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdateMatrimonial} className="space-y-3.5 text-xs text-slate-700">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                Membre : <strong>{selectedMembre.nom} {selectedMembre.prenoms}</strong><br />
                Statut actuel : <span className="font-bold text-slate-900 capitalize">{selectedMembre.statutMatrimonial.replace("_", " ")}</span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nouveau statut matrimonial *</label>
                <select
                  value={matrimonialForm.nouveauStatut}
                  onChange={e => setMatrimonialForm({ ...matrimonialForm, nouveauStatut: e.target.value as StatutMatrimonial })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs outline-none font-bold"
                >
                  <option value="marie_civil">Marié(e) civilement</option>
                  <option value="benediction_nuptiale">Bénédiction nuptiale à l'Église</option>
                  <option value="fiance">Fiancé(e)</option>
                  <option value="veuf">Veuf / Veuve</option>
                  <option value="divorce">Divorcé(e)</option>
                  <option value="celibataire">Célibataire</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nom & Prénoms du conjoint(e)</label>
                <input
                  type="text"
                  placeholder="Ex : KABORÉ / OUÉDRAOGO Marie"
                  value={matrimonialForm.nomConjoint}
                  onChange={e => setMatrimonialForm({ ...matrimonialForm, nomConjoint: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date mariage civil</label>
                  <input
                    type="date"
                    value={matrimonialForm.dateMariageCivil}
                    onChange={e => setMatrimonialForm({ ...matrimonialForm, dateMariageCivil: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date bénédiction nuptiale</label>
                  <input
                    type="date"
                    value={matrimonialForm.dateBenedictionNuptiale}
                    onChange={e => setMatrimonialForm({ ...matrimonialForm, dateBenedictionNuptiale: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Pasteur célébrant / Église</label>
                <input
                  type="text"
                  value={matrimonialForm.pasteurCelebrant}
                  onChange={e => setMatrimonialForm({ ...matrimonialForm, pasteurCelebrant: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Note pastorale / Référence certificat</label>
                <input
                  type="text"
                  placeholder="Ex : Livret de famille chrétienne n° 2026-084"
                  value={matrimonialForm.certificatRef}
                  onChange={e => setMatrimonialForm({ ...matrimonialForm, certificatRef: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                />
              </div>

              <div className="pt-3 border-t flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowMatrimonialModal(false)}
                  className="btn-secondary text-xs px-3 py-1.5 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs px-4 py-1.5 font-bold cursor-pointer bg-rose-600 hover:bg-rose-700"
                >
                  Enregistrer l'historique
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODAL 4 : DÉCLARER LE RAPPEL À DIEU (Point 3 : Décès)          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {showDecesModal && selectedMembre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-5 sm:p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Registre commémoratif & Archives paroissiales
                </span>
                <h3 className="font-extrabold text-base text-slate-900">
                  🕊️ Enregistrer le rappel auprès du Seigneur
                </h3>
              </div>
              <button
                onClick={() => setShowDecesModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleDeclareDeces} className="space-y-3 text-xs text-slate-700">
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                <strong>Effet statistique immédiat :</strong> La fiche du fidèle sera conservée définitivement dans le grand livre des archives, et il sera <em>automatiquement retiré du décompte des membres actifs</em>.
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date du rappel à Dieu *</label>
                  <input
                    type="date"
                    required
                    value={decesForm.dateDeces}
                    onChange={e => setDecesForm({ ...decesForm, dateDeces: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date de l'inhumation *</label>
                  <input
                    type="date"
                    required
                    value={decesForm.dateInhumation}
                    onChange={e => setDecesForm({ ...decesForm, dateInhumation: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lieu de l'inhumation / Cimetière</label>
                <input
                  type="text"
                  placeholder="Ex : Cimetière Municipal de Gounghin"
                  value={decesForm.lieuInhumation}
                  onChange={e => setDecesForm({ ...decesForm, lieuInhumation: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Pasteur officiant au culte d'adieu</label>
                <input
                  type="text"
                  value={decesForm.pasteurOfficiant}
                  onChange={e => setDecesForm({ ...decesForm, pasteurOfficiant: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Verset commémoratif d'espérance</label>
                <textarea
                  rows={2}
                  value={decesForm.versetCommemoratif}
                  onChange={e => setDecesForm({ ...decesForm, versetCommemoratif: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs outline-none italic"
                />
              </div>

              <div className="pt-3 border-t flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowDecesModal(false)}
                  className="btn-secondary text-xs px-3 py-1.5 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs px-4 py-1.5 font-bold cursor-pointer bg-slate-800 hover:bg-slate-900"
                >
                  Valider et archiver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODAL 5 : FORMULAIRE OFFICIEL RECOMMANDATION (SECTIONS A,B,C,D) */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {showNewAttestationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="p-4 bg-gradient-to-r from-slate-900 to-sky-950 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Formulaire Pastoral Officiel · Assemblées de Dieu
                </span>
                <h3 className="font-extrabold text-base text-white">Émission d'une attestation & recommandation pastorale</h3>
              </div>
              <button onClick={() => setShowNewAttestationModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Stepper tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
              {[
                { step: 1, label: "A. Membre" },
                { step: 2, label: "B. Situation Ecclésiale" },
                { step: 3, label: "C. Témoignage" },
                { step: 4, label: "D. Recommandation" },
              ].map(s => (
                <button
                  key={s.step}
                  onClick={() => setActiveStepAttestation(s.step as any)}
                  className={`flex-1 py-3 px-2 text-center border-b-2 cursor-pointer ${
                    activeStepAttestation === s.step ? "border-sky-600 text-sky-800 bg-white font-bold" : "text-slate-500"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveAttestation} className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
              {activeStepAttestation === 1 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">Nom *</label>
                      <input
                        type="text"
                        required
                        value={attestationForm.nom}
                        onChange={e => setAttestationForm({ ...attestationForm, nom: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-1.5 rounded border text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Prénoms *</label>
                      <input
                        type="text"
                        required
                        value={attestationForm.prenoms}
                        onChange={e => setAttestationForm({ ...attestationForm, prenoms: e.target.value })}
                        className="w-full px-3 py-1.5 rounded border text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Église de destination *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Temple Béthel Bobo"
                      value={attestationForm.egliseDestination}
                      onChange={e => setAttestationForm({ ...attestationForm, egliseDestination: e.target.value })}
                      className="w-full px-3 py-1.5 rounded border text-xs"
                    />
                  </div>
                </div>
              )}

              {activeStepAttestation === 2 && (
                <div className="space-y-2">
                  <p className="font-bold text-sky-900 mb-2">B. Situation ecclésiastique actuelle du membre :</p>
                  {[
                    { key: "en_regle", label: "☐ Membre en règle (bon témoignage)" },
                    { key: "inactif", label: "☐ Membre inactif" },
                    { key: "accompagnement_restauration", label: "☐ Membre en accompagnement / restauration" },
                    { key: "discipline_ecclesiastique", label: "☐ Membre sous discipline ecclésiastique" },
                    { key: "clarification_en_cours", label: "☐ Situation ecclésiastique en cours de clarification" },
                    { key: "temoignage_non_verifiable", label: "☐ Témoignage actuel non vérifiable" },
                  ].map(it => (
                    <label key={it.key} className="flex items-center gap-2 p-2 rounded bg-slate-50 border cursor-pointer">
                      <input
                        type="radio"
                        name="statutMembre"
                        checked={attestationForm.statutMembre === it.key}
                        onChange={() => setAttestationForm({ ...attestationForm, statutMembre: it.key as any })}
                      />
                      <span>{it.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {activeStepAttestation === 3 && (
                <div className="space-y-3">
                  <p className="font-bold text-sky-900">C. Appréciation du témoignage du membre :</p>
                  <div>
                    <span className="font-semibold block mb-1">Vie chrétienne et témoignage public :</span>
                    <select
                      value={attestationForm.appreciation?.vieChretienne}
                      onChange={e => setAttestationForm({
                        ...attestationForm,
                        appreciation: { ...attestationForm.appreciation!, vieChretienne: e.target.value as any }
                      })}
                      className="w-full p-1.5 rounded border text-xs"
                    >
                      <option value="tres_satisfaisant">Très satisfaisant</option>
                      <option value="satisfaisant">Satisfaisant</option>
                      <option value="a_ameliorer">À améliorer</option>
                      <option value="non_verifiable">Non vérifiable</option>
                    </select>
                  </div>
                  <div>
                    <span className="font-semibold block mb-1">Relations fraternelles :</span>
                    <select
                      value={attestationForm.appreciation?.relationsFraternelles}
                      onChange={e => setAttestationForm({
                        ...attestationForm,
                        appreciation: { ...attestationForm.appreciation!, relationsFraternelles: e.target.value as any }
                      })}
                      className="w-full p-1.5 rounded border text-xs"
                    >
                      <option value="tres_satisfaisant">Très satisfaisantes</option>
                      <option value="satisfaisant">Satisfaisantes</option>
                      <option value="a_ameliorer">Difficultés signalées</option>
                      <option value="non_verifiable">Non vérifiables</option>
                    </select>
                  </div>
                </div>
              )}

              {activeStepAttestation === 4 && (
                <div className="space-y-3">
                  <p className="font-bold text-sky-900">D. Recommandation de l'Église d'origine :</p>
                  {[
                    { key: "transfert_recommande", label: "1. Transfert recommandé (en règle)" },
                    { key: "transfert_avec_reserve", label: "2. Transfert recommandé avec réserve" },
                    { key: "attestation_sans_recommandation", label: "3. Attestation d'appartenance sans recommandation" },
                    { key: "recommandation_suspendue", label: "4. Recommandation temporairement suspendue" },
                  ].map(opt => (
                    <label key={opt.key} className="flex items-center gap-2 p-2.5 rounded bg-slate-50 border cursor-pointer">
                      <input
                        type="radio"
                        name="recommandation"
                        checked={attestationForm.recommandation === opt.key}
                        onChange={() => setAttestationForm({ ...attestationForm, recommandation: opt.key as any })}
                      />
                      <span className="font-bold">{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t flex justify-between">
                {activeStepAttestation > 1 ? (
                  <button type="button" onClick={() => setActiveStepAttestation((activeStepAttestation - 1) as any)} className="btn-secondary text-xs px-3 py-1.5 cursor-pointer">
                    Précédent
                  </button>
                ) : <div />}
                {activeStepAttestation < 4 ? (
                  <button type="button" onClick={() => setActiveStepAttestation((activeStepAttestation + 1) as any)} className="btn-primary text-xs px-4 py-1.5 cursor-pointer">
                    Suivant
                  </button>
                ) : (
                  <button type="submit" className="btn-primary text-xs px-5 py-2 font-bold cursor-pointer bg-emerald-700">
                    Valider l'attestation
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODAL 6 : IMPRESSION DU CERTIFICAT OFFICIEL                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {selectedDossier && showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 text-slate-900 border-4 border-double border-amber-900/30 relative">
            <div className="no-print absolute top-3 right-3 flex items-center gap-2">
              <button onClick={() => window.print()} className="px-3 py-1.5 rounded-lg bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <Printer size={14} /> Imprimer
              </button>
              <button onClick={() => setShowPrintModal(false)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div className="text-center border-b-2 border-slate-800 pb-4 mb-5">
              <div className="flex justify-center mb-2">
                <img src={adLogo} alt="AD/BF" className="h-16 w-16 object-contain" />
              </div>
              <h2 className="text-base sm:text-lg font-extrabold uppercase font-serif">Assemblées de Dieu du Burkina Faso</h2>
              <p className="text-[11px] font-semibold text-slate-700 uppercase">Bureau Exécutif National · Conseil Général</p>
              <p className="text-[10px] text-slate-500">{selectedDossier.egliseOrigine} ({selectedDossier.regionOrigine})</p>
              <div className="mt-2 inline-block px-3 py-0.5 rounded-full bg-slate-100 border text-[11px] font-serif font-bold uppercase">
                Attestation pastorale & Recommandation de transfert
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed font-serif">
              <div>
                <strong>A. Membre :</strong> {selectedDossier.nom} {selectedDossier.prenoms} (Matricule : {selectedDossier.matricule})<br />
                Église d'origine : {selectedDossier.egliseOrigine} ➔ Église cible : {selectedDossier.egliseDestination}
              </div>
              <div>
                <strong>B. Situation ecclésiastique :</strong> {selectedDossier.statutMembre === "en_regle" ? "Membre en règle" : selectedDossier.statutMembre}
              </div>
              <div>
                <strong>D. Avis pastoral :</strong> {selectedDossier.recommandation.replace("_", " ")}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-slate-800 flex justify-between items-end text-xs font-serif">
              <div>
                <p className="text-[10px] text-slate-500">Date : {selectedDossier.dateEmission}</p>
                <p className="font-bold mt-1">Le Secrétaire</p>
                <div className="h-10 italic text-slate-400 text-[10px]">[Signature]</div>
              </div>
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-red-700 flex items-center justify-center text-[7px] font-bold text-red-800 text-center uppercase">
                Sceau Église
              </div>
              <div>
                <p className="font-bold mt-1">Le Pasteur Titulaire</p>
                <div className="h-10 italic text-slate-700 font-bold">{selectedDossier.pasteurSignataire}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
