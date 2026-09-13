import { useState } from "react";
import {
  Church, Users, TrendingUp, TrendingDown, Wallet, BarChart3, Award, Baby,
  ArrowUpRight, ArrowDownRight, Clock, Activity, Globe, Layers
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import type { SupervisionScope } from "../components/AppLayout";

function fmtFCFA(v: number) {
  return new Intl.NumberFormat("fr-FR").format(v) + " FCFA";
}

export default function Dashboard({ currentScope }: { currentScope?: SupervisionScope }) {
  const [chartTab, setChartTab] = useState<"recettes" | "frequentation" | "budget">("recettes");
  const niveau = currentScope?.niveau || "national";

  // Data tailored per ecclesiastical jurisdiction
  const scopeConfigs = {
    local: {
      title: "Tableau de bord — Église Centrale Ouagadougou",
      subtitle: "Circonscription locale · Église Ouaga-Centrale · Pasteur Samuel Kaboré",
      levelBadge: "Échelon Local (Église locale)",
      levelColor: "#16A34A",
      kpis: [
        { label: "Église locale", value: "1", change: "4 annexes rattachées", pct: "", up: true, icon: Church, color: "#16A34A", bg: "#DCFCE7" },
        { label: "Membres actifs", value: "1 240", change: "+34 ce mois", pct: "+2.8%", up: true, icon: Users, color: "#0F78C8", bg: "#D9EEFA" },
        { label: "Recettes (mois)", value: "1,85M FCFA", change: "+140K", pct: "+8.2%", up: true, icon: TrendingUp, color: "#C8973A", bg: "#FDF4E0" },
        { label: "Dépenses (mois)", value: "1,12M FCFA", change: "-45K", pct: "-3.8%", up: false, icon: TrendingDown, color: "#DC2626", bg: "#FEE2E2" },
        { label: "Budget annuel local", value: "18M FCFA", change: "61% exécuté", pct: "", up: true, icon: Wallet, color: "#0D67B0", bg: "#D9EEFA" },
        { label: "Fréquentation moy.", value: "1 150", change: "+45 / dim.", pct: "+4.1%", up: true, icon: Activity, color: "#7C3AED", bg: "#EDE9FE" },
        { label: "Baptêmes (cumul)", value: "28", change: "+6 ce trim.", pct: "+27%", up: true, icon: Award, color: "#0891B2", bg: "#E0F2FE" },
        { label: "Nouveaux convertis", value: "42", change: "ce mois", pct: "", up: true, icon: Baby, color: "#16A34A", bg: "#DCFCE7" },
      ],
      revenueData: [
        { mois: "Jan", recettes: 1200000, depenses: 850000 },
        { mois: "Fév", recettes: 1350000, depenses: 920000 },
        { mois: "Mar", recettes: 1520000, depenses: 980000 },
        { mois: "Avr", recettes: 1480000, depenses: 950000 },
        { mois: "Mai", recettes: 1650000, depenses: 1050000 },
        { mois: "Jun", recettes: 1720000, depenses: 1100000 },
        { mois: "Jul", recettes: 1680000, depenses: 1080000 },
        { mois: "Aoû", recettes: 1850000, depenses: 1120000 },
      ],
      frequentationData: [
        { mois: "Jan", adultes: 820, jeunes: 210, enfants: 180 },
        { mois: "Fév", adultes: 840, jeunes: 220, enfants: 185 },
        { mois: "Mar", adultes: 880, jeunes: 235, enfants: 195 },
        { mois: "Avr", adultes: 870, jeunes: 230, enfants: 190 },
        { mois: "Mai", adultes: 910, jeunes: 250, enfants: 205 },
        { mois: "Jun", adultes: 930, jeunes: 260, enfants: 210 },
        { mois: "Jul", adultes: 920, jeunes: 255, enfants: 205 },
        { mois: "Aoû", adultes: 960, jeunes: 275, enfants: 220 },
      ],
      budgetData: [
        { name: "Culte & Liturgie", budget: 6000000, realise: 4200000 },
        { name: "Évangélisation", budget: 3500000, realise: 2600000 },
        { name: "Entretien temple", budget: 4500000, realise: 2900000 },
        { name: "Diaconat & Social", budget: 2500000, realise: 1800000 },
        { name: "Quote-part SR", budget: 1500000, realise: 1100000 },
      ],
      activities: [
        { icon: Wallet, color: "#16A34A", label: "Dîme enregistrée", detail: "Culte de réveil dominical", amount: "320 000 FCFA", time: "Il y a 12 min" },
        { icon: Wallet, color: "#16A34A", label: "Offrande de reconnaissance", detail: "Culte jeunesse du vendredi", amount: "84 000 FCFA", time: "Hier 19h" },
        { icon: BarChart3, color: "#0F78C8", label: "Rapport de culte transmis", detail: "Remontée vers Sous-région Ouaga-Nord", amount: "1 240 fidèles", time: "Hier 16h" },
        { icon: Wallet, color: "#DC2626", label: "Dépense de fonctionnement", detail: "Facture électricité & sonorisation", amount: "125 000 FCFA", time: "Il y a 2 jours" },
        { icon: Award, color: "#C8973A", label: "Classe de baptême", detail: "18 catéchumènes en préparation", amount: "", time: "Il y a 3 jours" },
      ],
      tableTitle: "Annexes & cellules rattachées à l'Église locale",
      tableCols: ["Annexe", "Responsable", "Fidèles", "Statut"],
      tableRows: [
        { col1: "Annexe Tanghin", col2: "Pasteur stagiaire Compaoré", col3: "280", col4: "Actif" },
        { col1: "Annexe Karpala", col2: "Diacre Ouédraogo", col3: "310", col4: "Actif" },
        { col1: "Annexe Somgandé", col2: "Ancien Zongo", col3: "240", col4: "Actif" },
        { col1: "Annexe Tampouy", col2: "Pasteur adjoint Ilboudo", col3: "410", col4: "Actif" },
      ]
    },

    sousregional: {
      title: "Tableau de bord — Sous-région Ouaga-Nord",
      subtitle: "Circonscription sous-régionale · 12 Églises locales · Pasteur Samuel Zoungrana",
      levelBadge: "Échelon Sous-Régional",
      levelColor: "#C8973A",
      kpis: [
        { label: "Églises de la sous-région", value: "12", change: "+1 implantation", pct: "+8.3%", up: true, icon: Church, color: "#C8973A", bg: "#FDF4E0" },
        { label: "Membres actifs", value: "4 820", change: "+68 ce mois", pct: "+1.4%", up: true, icon: Users, color: "#0F78C8", bg: "#D9EEFA" },
        { label: "Recettes (mois)", value: "4,2M FCFA", change: "+350K", pct: "+9.1%", up: true, icon: TrendingUp, color: "#16A34A", bg: "#DCFCE7" },
        { label: "Dépenses (mois)", value: "2,65M FCFA", change: "+120K", pct: "+4.7%", up: false, icon: TrendingDown, color: "#DC2626", bg: "#FEE2E2" },
        { label: "Budget sous-régional", value: "36M FCFA", change: "54% exécuté", pct: "", up: true, icon: Wallet, color: "#0D67B0", bg: "#D9EEFA" },
        { label: "Fréquentation moy.", value: "4 120", change: "+160 / dim.", pct: "+4.0%", up: true, icon: Activity, color: "#7C3AED", bg: "#EDE9FE" },
        { label: "Baptêmes 2026", value: "86", change: "+14 ce trim.", pct: "+19%", up: true, icon: Award, color: "#0891B2", bg: "#E0F2FE" },
        { label: "Pasteurs encadrés", value: "12", change: "100% en activité", pct: "", up: true, icon: Users, color: "#16A34A", bg: "#DCFCE7" },
      ],
      revenueData: [
        { mois: "Jan", recettes: 2800000, depenses: 1900000 },
        { mois: "Fév", recettes: 3100000, depenses: 2100000 },
        { mois: "Mar", recettes: 3600000, depenses: 2350000 },
        { mois: "Avr", recettes: 3450000, depenses: 2200000 },
        { mois: "Mai", recettes: 3900000, depenses: 2500000 },
        { mois: "Jun", recettes: 4100000, depenses: 2600000 },
        { mois: "Jul", recettes: 4050000, depenses: 2550000 },
        { mois: "Aoû", recettes: 4200000, depenses: 2650000 },
      ],
      frequentationData: [
        { mois: "Jan", adultes: 2750, jeunes: 720, enfants: 580 },
        { mois: "Fév", adultes: 2820, jeunes: 740, enfants: 600 },
        { mois: "Mar", adultes: 2950, jeunes: 790, enfants: 630 },
        { mois: "Avr", adultes: 2910, jeunes: 780, enfants: 620 },
        { mois: "Mai", adultes: 3050, jeunes: 840, enfants: 670 },
        { mois: "Jun", adultes: 3120, jeunes: 870, enfants: 700 },
        { mois: "Jul", adultes: 3080, jeunes: 850, enfants: 690 },
        { mois: "Aoû", adultes: 3200, jeunes: 910, enfants: 730 },
      ],
      budgetData: [
        { name: "Supervision pastorale", budget: 12000000, realise: 8400000 },
        { name: "Implantation d'églises", budget: 10000000, realise: 6200000 },
        { name: "Formation responsable", budget: 6000000, realise: 3900000 },
        { name: "Événements sous-région", budget: 5000000, realise: 2800000 },
        { name: "Quote-part Région", budget: 3000000, realise: 2100000 },
      ],
      activities: [
        { icon: Wallet, color: "#16A34A", label: "Déclaration reçue", detail: "Dîme — Église Centrale Ouagadougou", amount: "320 000 FCFA", time: "Il y a 12 min" },
        { icon: BarChart3, color: "#0F78C8", label: "Rapport mensuel validé", detail: "Temple Béthel Nord — 640 membres", amount: "Validé", time: "Il y a 45 min" },
        { icon: Wallet, color: "#DC2626", label: "Frais de déplacement", detail: "Visite pastorale église de Tampouy", amount: "45 000 FCFA", time: "Hier 14h" },
        { icon: Users, color: "#C8973A", label: "Conseil pastoral sous-régional", detail: "12 pasteurs présents au Temple Béthel", amount: "Taux 100%", time: "Il y a 2 jours" },
      ],
      tableTitle: "Églises locales de la Sous-région Ouaga-Nord",
      tableCols: ["Église locale", "Pasteur titulaire", "Membres", "Statut déclaration"],
      tableRows: [
        { col1: "Église Centrale Ouagadougou", col2: "Pasteur Samuel Kaboré", col3: "1 240", col4: "À jour" },
        { col1: "Temple Béthel Nord", col2: "Pasteur Josué Sawadogo", col3: "640", col4: "À jour" },
        { col1: "Temple Eben-Ezer Somgandé", col2: "Pasteur Marc Oubda", col3: "520", col4: "À jour" },
        { col1: "Temple Sinaï Tanghin", col2: "Pasteur Pierre Ilboudo", col3: "480", col4: "À jour" },
        { col1: "Temple Emmanuel Tampouy", col2: "Pasteur David Sanogo", col3: "410", col4: "À jour" },
        { col1: "Temple Philadelphie Kilwin", col2: "Pasteur Jonas Kaboré", col3: "380", col4: "À jour" },
      ]
    },

    regional: {
      title: "Tableau de bord — Région Ecclésiastique du Centre",
      subtitle: "Circonscription régionale · 35 Sous-régions · 284 Églises locales · Pasteur Jean-Baptiste Kaboré",
      levelBadge: "Échelon Régional",
      levelColor: "#0F78C8",
      kpis: [
        { label: "Églises de la Région", value: "284", change: "+8 cette année", pct: "+2.9%", up: true, icon: Church, color: "#0F78C8", bg: "#D9EEFA" },
        { label: "Membres actifs région", value: "98 400", change: "+840 ce mois", pct: "+0.9%", up: true, icon: Users, color: "#16A34A", bg: "#DCFCE7" },
        { label: "Recettes (mois)", value: "12,4M FCFA", change: "+1.2M", pct: "+10.7%", up: true, icon: TrendingUp, color: "#C8973A", bg: "#FDF4E0" },
        { label: "Dépenses (mois)", value: "8,1M FCFA", change: "+420K", pct: "+5.5%", up: false, icon: TrendingDown, color: "#DC2626", bg: "#FEE2E2" },
        { label: "Budget annuel région", value: "142M FCFA", change: "59% exécuté", pct: "", up: true, icon: Wallet, color: "#0D67B0", bg: "#D9EEFA" },
        { label: "Fréquentation moy.", value: "18 600", change: "+1.1K / dim.", pct: "+6.3%", up: true, icon: Activity, color: "#7C3AED", bg: "#EDE9FE" },
        { label: "Baptêmes (cumul)", value: "482", change: "+38 ce mois", pct: "+8.5%", up: true, icon: Award, color: "#0891B2", bg: "#E0F2FE" },
        { label: "Sous-régions actives", value: "35", change: "100% coordinat.", pct: "", up: true, icon: Globe, color: "#16A34A", bg: "#DCFCE7" },
      ],
      revenueData: [
        { mois: "Jan", recettes: 7800000, depenses: 4900000 },
        { mois: "Fév", recettes: 8600000, depenses: 5600000 },
        { mois: "Mar", recettes: 9800000, depenses: 6400000 },
        { mois: "Avr", recettes: 9400000, depenses: 6100000 },
        { mois: "Mai", recettes: 10800000, depenses: 7100000 },
        { mois: "Jun", recettes: 11600000, depenses: 7600000 },
        { mois: "Jul", recettes: 11200000, depenses: 7400000 },
        { mois: "Aoû", recettes: 12400000, depenses: 8100000 },
      ],
      frequentationData: [
        { mois: "Jan", adultes: 13200, jeunes: 3100, enfants: 2200 },
        { mois: "Fév", adultes: 13600, jeunes: 3250, enfants: 2300 },
        { mois: "Mar", adultes: 14200, jeunes: 3450, enfants: 2450 },
        { mois: "Avr", adultes: 14000, jeunes: 3400, enfants: 2400 },
        { mois: "Mai", adultes: 14800, jeunes: 3700, enfants: 2600 },
        { mois: "Jun", adultes: 15400, jeunes: 3900, enfants: 2750 },
        { mois: "Jul", adultes: 15100, jeunes: 3800, enfants: 2700 },
        { mois: "Aoû", adultes: 15900, jeunes: 4100, enfants: 2900 },
      ],
      budgetData: [
        { name: "Administration régionale", budget: 45000000, realise: 32000000 },
        { name: "Coordination sous-régions", budget: 35000000, realise: 24500000 },
        { name: "Projets missionnaires", budget: 30000000, realise: 18200000 },
        { name: "Formations régionales", budget: 20000000, realise: 12400000 },
        { name: "Quote-part BEN / Centre", budget: 12000000, realise: 8500000 },
      ],
      activities: [
        { icon: Wallet, color: "#16A34A", label: "Déclaration sous-régionale validée", detail: "Remontée Sous-région Ouaga-Nord", amount: "4 200 000 FCFA", time: "Il y a 30 min" },
        { icon: BarChart3, color: "#0F78C8", label: "Rapport statistique régional", detail: "35 sous-régions consolidées pour le BEN", amount: "98 400 fidèles", time: "Il y a 2h" },
        { icon: Wallet, color: "#DC2626", label: "Subvention missionnaire", detail: "Financement implantation Sous-région Kadiogo-Sud", amount: "450 000 FCFA", time: "Hier 11h" },
        { icon: Globe, color: "#0F78C8", label: "Session du Conseil Régional", detail: "Ordre du jour : Préparation assemblée générale", amount: "35 délégués", time: "Hier 09h" },
      ],
      tableTitle: "Sous-régions de la Région Centre",
      tableCols: ["Sous-région", "Président sous-régional", "Églises", "Membres"],
      tableRows: [
        { col1: "Ouaga-Nord", col2: "Pasteur Samuel Zoungrana", col3: "12", col4: "4 820" },
        { col1: "Ouaga-Sud", col2: "Pasteur Michel Ouédraogo", col3: "14", col4: "5 430" },
        { col1: "Ouaga-Est", col2: "Pasteur Daniel Kaboré", col3: "11", col4: "4 120" },
        { col1: "Ouaga-Ouest", col2: "Pasteur Paul Tiendrebéogo", col3: "13", col4: "4 950" },
        { col1: "Kadiogo-Nord", col2: "Pasteur Lazare Sawadogo", col3: "10", col4: "3 680" },
        { col1: "Kadiogo-Sud", col2: "Pasteur Simon Compaoré", col3: "16", col4: "5 890" },
      ]
    },

    centre: {
      title: "Tableau de bord — Centre N°5 (Bogodogo & Ziniaré)",
      subtitle: "Supervision BEN · 2 Régions (Bogodogo & Ziniaré) · 9 Sous-régions · Pasteur Philippe Oubda (Membre BEN)",
      levelBadge: "Échelon des Centres (BEN)",
      levelColor: "#0A5490",
      kpis: [
        { label: "Églises supervisées", value: "90", change: "+4 ce trim.", pct: "+4.4%", up: true, icon: Church, color: "#0A5490", bg: "#E0F2FE" },
        { label: "Membres consolidés", value: "32 700", change: "+450 ce mois", pct: "+1.4%", up: true, icon: Users, color: "#16A34A", bg: "#DCFCE7" },
        { label: "Recettes supervisées", value: "12,0M FCFA", change: "+1.1M", pct: "+9.8%", up: true, icon: TrendingUp, color: "#C8973A", bg: "#FDF4E0" },
        { label: "Dépenses de supervision", value: "7,8M FCFA", change: "+320K", pct: "+4.1%", up: false, icon: TrendingDown, color: "#DC2626", bg: "#FEE2E2" },
        { label: "Régions rattachées", value: "2", change: "Bogodogo & Ziniaré", pct: "", up: true, icon: Globe, color: "#0D67B0", bg: "#D9EEFA" },
        { label: "Taux remontée 3R", value: "98,2%", change: "+1.5%", pct: "+1.5%", up: true, icon: Activity, color: "#7C3AED", bg: "#EDE9FE" },
        { label: "Sous-régions actives", value: "9", change: "2 Bogodogo, 7 Ziniaré", pct: "", up: true, icon: Layers, color: "#16A34A", bg: "#DCFCE7" },
        { label: "Missions BEN effectuées", value: "8", change: "En 2026", pct: "", up: true, icon: Award, color: "#0891B2", bg: "#E0F2FE" },
      ],
      revenueData: [
        { mois: "Jan", recettes: 6800000, depenses: 4200000 },
        { mois: "Fév", recettes: 7900000, depenses: 5100000 },
        { mois: "Mar", recettes: 8600000, depenses: 5800000 },
        { mois: "Avr", recettes: 9100000, depenses: 6100000 },
        { mois: "Mai", recettes: 10400000, depenses: 6900000 },
        { mois: "Jun", recettes: 11200000, depenses: 7400000 },
        { mois: "Jul", recettes: 10900000, depenses: 7100000 },
        { mois: "Aoû", recettes: 12000000, depenses: 7800000 },
      ],
      frequentationData: [
        { mois: "Jan", adultes: 16100, jeunes: 3900, enfants: 2800 },
        { mois: "Fév", adultes: 16700, jeunes: 4100, enfants: 2950 },
        { mois: "Mar", adultes: 17500, jeunes: 4350, enfants: 3100 },
        { mois: "Avr", adultes: 17200, jeunes: 4250, enfants: 3050 },
        { mois: "Mai", adultes: 18200, jeunes: 4600, enfants: 3300 },
        { mois: "Jun", adultes: 18900, jeunes: 4850, enfants: 3500 },
        { mois: "Jul", adultes: 18500, jeunes: 4750, enfants: 3400 },
        { mois: "Aoû", adultes: 19600, jeunes: 5100, enfants: 3700 },
      ],
      budgetData: [
        { name: "Supervision BEN Région Bogodogo", budget: 20000000, realise: 15400000 },
        { name: "Supervision BEN Région Ziniaré", budget: 15000000, realise: 10800000 },
        { name: "Audits & Missions de terrain", budget: 12000000, realise: 9500000 },
        { name: "Coordination 3R inter-régionale", budget: 8000000, realise: 6100000 },
        { name: "Transmission BEN National", budget: 6000000, realise: 4800000 },
      ],
      activities: [
        { icon: Layers, color: "#0A5490", label: "Mission de supervision BEN réalisée", detail: "Contrôle de conformité Vision 3R — Région Bogodogo (Sous-régions Nord & Sud)", amount: "Rapport déposé", time: "Il y a 1h" },
        { icon: Wallet, color: "#16A34A", label: "Flux financier régional validé", detail: "Consolidation Région Ziniaré (7 sous-régions) transmise", amount: "1 850 000 FCFA", time: "Il y a 3h" },
        { icon: BarChart3, color: "#0F78C8", label: "Audit des 9 sous-régions du Centre N°5", detail: "Vérification des déclarations d'assemblées", amount: "98,2% conformité", time: "Hier 15h" },
      ],
      tableTitle: "Régions coordonnées par le Centre N°5 (BEN)",
      tableCols: ["Région ecclésiastique", "Chef-lieu", "Sous-régions", "Églises", "Membres"],
      tableRows: [
        { col1: "Région Bogodogo", col2: "Bogodogo", col3: "2 (Bogodogo Sud, Bogodogo Nord)", col4: "32", col5: "14 000" },
        { col1: "Région Ziniaré", col2: "Ziniaré", col3: "7 (Ziniaré, Loumbila, Zitenga, Dapélogo, Nagréongo, Absouya, Ourgou)", col4: "58", col5: "18 700" },
      ]
    },

    national: {
      title: "Tableau de bord — Présidence Nationale BEN",
      subtitle: "Vue nationale consolidée · Bureau Exécutif National (BEN) · Rév. Dr Etienne P. Zongo",
      levelBadge: "Gouvernance Nationale BEN",
      levelColor: "#7C3AED",
      kpis: [
        { label: "Églises locales nationales", value: "1 842", change: "+23 ce trim.", pct: "+1.3%", up: true, icon: Church, color: "#0F78C8", bg: "#D9EEFA" },
        { label: "Membres actifs consolidés", value: "487 320", change: "+4 218 ce mois", pct: "+0.9%", up: true, icon: Users, color: "#16A34A", bg: "#DCFCE7" },
        { label: "Recettes nationales (mois)", value: "15,6M FCFA", change: "+1.8M", pct: "+13%", up: true, icon: TrendingUp, color: "#C8973A", bg: "#FDF4E0" },
        { label: "Dépenses nationales (mois)", value: "10,2M FCFA", change: "+0.5M", pct: "+5%", up: false, icon: TrendingDown, color: "#DC2626", bg: "#FEE2E2" },
        { label: "Budget national annuel", value: "79M FCFA", change: "58% exécuté", pct: "", up: true, icon: Wallet, color: "#0D67B0", bg: "#D9EEFA" },
        { label: "Fréquentation moyenne", value: "57 800", change: "+3.6K / dim.", pct: "+6.6%", up: true, icon: Activity, color: "#7C3AED", bg: "#EDE9FE" },
        { label: "Baptêmes nationaux (cumul)", value: "2 340", change: "+187 ce trim.", pct: "+8.7%", up: true, icon: Award, color: "#0891B2", bg: "#E0F2FE" },
        { label: "Nouveaux convertis", value: "4 218", change: "ce mois", pct: "", up: true, icon: Baby, color: "#16A34A", bg: "#DCFCE7" },
      ],
      revenueData: [
        { mois: "Jan", recettes: 8200000, depenses: 5100000 },
        { mois: "Fév", recettes: 9400000, depenses: 6300000 },
        { mois: "Mar", recettes: 11200000, depenses: 7800000 },
        { mois: "Avr", recettes: 10800000, depenses: 6900000 },
        { mois: "Mai", recettes: 12500000, depenses: 8200000 },
        { mois: "Jun", recettes: 14200000, depenses: 9100000 },
        { mois: "Jul", recettes: 13800000, depenses: 8700000 },
        { mois: "Aoû", recettes: 15600000, depenses: 10200000 },
      ],
      frequentationData: [
        { mois: "Jan", adultes: 48200, jeunes: 12300, enfants: 9800 },
        { mois: "Fév", adultes: 49100, jeunes: 12800, enfants: 10100 },
        { mois: "Mar", adultes: 51200, jeunes: 13400, enfants: 10600 },
        { mois: "Avr", adultes: 50800, jeunes: 13100, enfants: 10400 },
        { mois: "Mai", adultes: 53400, jeunes: 14200, enfants: 11200 },
        { mois: "Jun", adultes: 55100, jeunes: 14800, enfants: 11900 },
        { mois: "Jul", adultes: 54200, jeunes: 14500, enfants: 11600 },
        { mois: "Aoû", adultes: 57800, jeunes: 15600, enfants: 12400 },
      ],
      budgetData: [
        { name: "Fonctionnement", budget: 24000000, realise: 18400000 },
        { name: "Missions", budget: 15000000, realise: 12200000 },
        { name: "Formation", budget: 8000000, realise: 5600000 },
        { name: "Infrastructure", budget: 20000000, realise: 9800000 },
        { name: "Évangélisation", budget: 12000000, realise: 10100000 },
      ],
      activities: [
        { icon: Wallet, color: "#16A34A", label: "Recette consolidée", detail: "Dîme — Église Centrale Ouagadougou", amount: "320 000 FCFA", time: "Il y a 12 min" },
        { icon: BarChart3, color: "#0F78C8", label: "Statistiques saisies", detail: "Rapport mensuel — District Bobo-Dioulasso Nord", amount: "3 482 membres", time: "Il y a 1h" },
        { icon: Activity, color: "#C8973A", label: "Sondage clôturé", detail: "\"Vision 3R 2026\" — 1 842 répondants", amount: "98 % complétude", time: "Il y a 3h" },
        { icon: Award, color: "#7C3AED", label: "Achat bibliothèque", detail: "\"Leadership pastoral en Afrique\"", amount: "4 000 FCFA", time: "Il y a 4h" },
        { icon: Globe, color: "#0D67B0", label: "Actualité publiée", detail: "Conférence nationale des pasteurs 2026", amount: "", time: "Il y a 6h" },
      ],
      tableTitle: "Régions ecclésiastiques — Vue d'ensemble nationale",
      tableCols: ["Région", "Églises", "Membres", "Statut"],
      tableRows: [
        { col1: "Centre", col2: "284", col3: "98 400", col4: "Actif" },
        { col1: "Hauts-Bassins", col2: "210", col3: "72 300", col4: "Actif" },
        { col1: "Cascades", col2: "142", col3: "48 200", col4: "Actif" },
        { col1: "Centre-Ouest", col2: "138", col3: "46 800", col4: "Actif" },
        { col1: "Sahel", col2: "98", col3: "31 200", col4: "Actif" },
        { col1: "Est", col2: "112", col3: "38 400", col4: "Actif" },
      ]
    },

    finance: {
      title: "Tableau de bord — Trésorerie Centrale AD/BF",
      subtitle: "Consolidation financière nationale · Dr. Enoch Yaméogo (Trésorier National)",
      levelBadge: "Trésorerie Centrale AD/BF",
      levelColor: "#059669",
      kpis: [
        { label: "Églises déclarantes", value: "1 702", change: "92,4% de couverture", pct: "+4.1%", up: true, icon: Church, color: "#059669", bg: "#D1FAE5" },
        { label: "Solde consolidé", value: "5,4M FCFA", change: "Caisse + Banque", pct: "+12%", up: true, icon: Wallet, color: "#0F78C8", bg: "#D9EEFA" },
        { label: "Recettes nationales", value: "15,6M FCFA", change: "+1.8M ce mois", pct: "+13%", up: true, icon: TrendingUp, color: "#C8973A", bg: "#FDF4E0" },
        { label: "Dépenses nationales", value: "10,2M FCFA", change: "+0.5M", pct: "+5%", up: false, icon: TrendingDown, color: "#DC2626", bg: "#FEE2E2" },
        { label: "Budget national", value: "79M FCFA", change: "58% exécuté", pct: "", up: true, icon: Wallet, color: "#0D67B0", bg: "#D9EEFA" },
        { label: "Régions auditées", value: "79 / 79", change: "100% validées", pct: "", up: true, icon: Activity, color: "#7C3AED", bg: "#EDE9FE" },
        { label: "Centres BEN visés", value: "6 / 6", change: "Flux supervisés", pct: "", up: true, icon: Layers, color: "#0891B2", bg: "#E0F2FE" },
        { label: "Déclarations en attente", value: "14", change: "À valider", pct: "", up: false, icon: Award, color: "#DC2626", bg: "#FEE2E2" },
      ],
      revenueData: [
        { mois: "Jan", recettes: 8200000, depenses: 5100000 },
        { mois: "Fév", recettes: 9400000, depenses: 6300000 },
        { mois: "Mar", recettes: 11200000, depenses: 7800000 },
        { mois: "Avr", recettes: 10800000, depenses: 6900000 },
        { mois: "Mai", recettes: 12500000, depenses: 8200000 },
        { mois: "Jun", recettes: 14200000, depenses: 9100000 },
        { mois: "Jul", recettes: 13800000, depenses: 8700000 },
        { mois: "Aoû", recettes: 15600000, depenses: 10200000 },
      ],
      frequentationData: [
        { mois: "Jan", adultes: 48200, jeunes: 12300, enfants: 9800 },
        { mois: "Fév", adultes: 49100, jeunes: 12800, enfants: 10100 },
        { mois: "Mar", adultes: 51200, jeunes: 13400, enfants: 10600 },
        { mois: "Avr", adultes: 50800, jeunes: 13100, enfants: 10400 },
        { mois: "Mai", adultes: 53400, jeunes: 14200, enfants: 11200 },
        { mois: "Jun", adultes: 55100, jeunes: 14800, enfants: 11900 },
        { mois: "Jul", adultes: 54200, jeunes: 14500, enfants: 11600 },
        { mois: "Aoû", adultes: 57800, jeunes: 15600, enfants: 12400 },
      ],
      budgetData: [
        { name: "Fonctionnement", budget: 24000000, realise: 18400000 },
        { name: "Missions", budget: 15000000, realise: 12200000 },
        { name: "Formation", budget: 8000000, realise: 5600000 },
        { name: "Infrastructure", budget: 20000000, realise: 9800000 },
        { name: "Évangélisation", budget: 12000000, realise: 10100000 },
      ],
      activities: [
        { icon: Wallet, color: "#16A34A", label: "Remontée locale validée", detail: "Dîme — Église Centrale Ouagadougou", amount: "320 000 FCFA", time: "Il y a 12 min" },
        { icon: Wallet, color: "#16A34A", label: "Remontée sous-régionale", detail: "Sous-région Ouaga-Nord", amount: "4 200 000 FCFA", time: "Il y a 45 min" },
        { icon: BarChart3, color: "#0F78C8", label: "Clôture mensuelle", detail: "Rapprochement bancaire National Août", amount: "5 400 000 FCFA", time: "Hier 18h" },
      ],
      tableTitle: "Consolidation financière par Région",
      tableCols: ["Région", "Églises déclarantes", "Recettes cumulées", "Statut"],
      tableRows: [
        { col1: "Centre", col2: "278 / 284", col3: "24 800 000 FCFA", col4: "Conforme" },
        { col1: "Hauts-Bassins", col2: "198 / 210", col3: "18 500 000 FCFA", col4: "Conforme" },
        { col1: "Cascades", col2: "135 / 142", col3: "12 000 000 FCFA", col4: "Conforme" },
        { col1: "Centre-Ouest", col2: "132 / 138", col3: "11 500 000 FCFA", col4: "Conforme" },
        { col1: "Sahel", col2: "89 / 98", col3: "8 200 000 FCFA", col4: "Conforme" },
        { col1: "Est", col2: "105 / 112", col3: "9 800 000 FCFA", col4: "Conforme" },
      ]
    }
  };

  const currentConfig = scopeConfigs[niveau] || scopeConfigs.national;

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white shadow-xs"
                style={{ background: currentConfig.levelColor }}
              >
                {currentConfig.levelBadge}
              </span>
              <span className="text-xs text-gray-500 font-medium">Exercice 2026</span>
            </div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>
              {currentConfig.title}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {currentConfig.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="w-2 h-2 rounded-full" style={{ background: "#16A34A" }} />
            <span className="text-xs text-gray-500">Données à jour au 2 septembre 2026</span>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {currentConfig.kpis.map(kpi => (
          <div key={kpi.label} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: kpi.bg }}>
                <kpi.icon size={18} style={{ color: kpi.color }} />
              </div>
              {kpi.pct && (
                <span className="flex items-center gap-0.5 text-xs font-semibold" style={{ color: kpi.up ? "#16A34A" : "#DC2626" }}>
                  {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {kpi.pct}
                </span>
              )}
            </div>
            <div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{kpi.value}</div>
            <div className="text-xs text-gray-400 mb-1">{kpi.label}</div>
            <div className="text-xs font-medium" style={{ color: kpi.up ? "#16A34A" : "#DC2626" }}>{kpi.change}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Main chart */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="section-title text-base">Évolution financière & Fréquentation</h3>
              <p className="text-xs text-gray-400 mt-1">Données cumulatives 2026 — {currentConfig.levelBadge}</p>
            </div>
            <div className="flex gap-1 p-1 rounded-lg" style={{ background: "#F8F9FC", border: "1px solid #D9EEFA" }}>
              {(["recettes", "frequentation", "budget"] as const).map(t => (
                <button key={t} onClick={() => setChartTab(t)} className={`tab-btn text-xs ${chartTab === t ? "active" : ""}`}>
                  {t === "recettes" ? "Finances" : t === "frequentation" ? "Fréquentation" : "Budget"}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            {chartTab === "recettes" ? (
              <AreaChart data={currentConfig.revenueData}>
                <defs>
                  <linearGradient id="gRecettes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F78C8" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0F78C8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gDepenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => (niveau === "local" ? (v / 1000).toFixed(0) + "K" : (v / 1000000).toFixed(1) + "M")}
                />
                <Tooltip formatter={(v: any) => fmtFCFA(v)} labelStyle={{ color: "#0F78C8", fontWeight: 700 }} contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="recettes" name="Recettes" stroke="#0F78C8" strokeWidth={2} fill="url(#gRecettes)" />
                <Area type="monotone" dataKey="depenses" name="Dépenses" stroke="#DC2626" strokeWidth={2} fill="url(#gDepenses)" />
              </AreaChart>
            ) : chartTab === "frequentation" ? (
              <BarChart data={currentConfig.frequentationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => (niveau === "local" ? String(v) : (v / 1000).toFixed(0) + "K")}
                />
                <Tooltip formatter={(v: any) => new Intl.NumberFormat("fr-FR").format(v)} contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="adultes" name="Adultes" fill="#0F78C8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="jeunes" name="Jeunes" fill="#C8973A" radius={[3, 3, 0, 0]} />
                <Bar dataKey="enfants" name="Enfants" fill="#16A34A" radius={[3, 3, 0, 0]} />
              </BarChart>
            ) : (
              <BarChart data={currentConfig.budgetData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => (niveau === "local" ? (v / 1000000).toFixed(1) + "M" : (v / 1000000).toFixed(0) + "M")}
                />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={130} />
                <Tooltip formatter={(v: any) => fmtFCFA(v)} contentStyle={{ borderRadius: "8px", border: "1px solid #D9EEFA", fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="budget" name="Budget prévu" fill="#D9EEFA" radius={[0, 3, 3, 0]} />
                <Bar dataKey="realise" name="Réalisé" fill="#0F78C8" radius={[0, 3, 3, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Mini charts */}
        <div className="flex flex-col gap-4">
          {/* Vision 3R */}
          <div className="card p-5 flex-1">
            <h3 className="text-sm font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>
              Vision 3R — Conformité circonscription
            </h3>
            <div className="space-y-4">
              {[
                { name: "Réveil spirituel", pct: niveau === "local" ? 85 : 78, color: "#0F78C8" },
                { name: "Réforme de gestion", pct: niveau === "local" ? 72 : 65, color: "#C8973A" },
                { name: "Rayonnement missionnaire", pct: niveau === "local" ? 80 : 72, color: "#16A34A" },
              ].map(v => (
                <div key={v.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold" style={{ color: "#374151" }}>{v.name}</span>
                    <span className="text-xs font-bold" style={{ color: v.color }}>{v.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "#F1F5F9" }}>
                    <div className="h-2 rounded-full transition-all" style={{ width: `${v.pct}%`, background: v.color }} />
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t" style={{ borderColor: "#F1F5F9" }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Indice global {currentConfig.levelBadge}</span>
                  <span className="text-base font-black" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>
                    {niveau === "local" ? "79%" : niveau === "sousregional" ? "76%" : "74%"}
                  </span>
                </div>
                <div className="h-2 rounded-full mt-1.5" style={{ background: "#F1F5F9" }}>
                  <div className="h-2 rounded-full" style={{ width: niveau === "local" ? "79%" : "74%", background: "linear-gradient(90deg, #0F78C8, #C8973A)" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Solde de la circonscription */}
          <div className="card p-5">
            <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>
              Solde de trésorerie ({niveau === "local" ? "Caisse locale" : niveau === "sousregional" ? "Sous-région" : niveau === "regional" ? "Région Centre" : "Consolidé"})
            </h3>
            <div className="text-2xl font-black mb-1" style={{ fontFamily: "'Manrope', sans-serif", color: "#16A34A" }}>
              {niveau === "local" ? "+1,62M FCFA" : niveau === "sousregional" ? "+2,35M FCFA" : "+5,4M FCFA"}
            </div>
            <div className="text-xs text-gray-400 mb-4">Solde disponible caisse & banque — Août 2026</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg" style={{ background: "#F0FDF4", border: "1px solid #DCFCE7" }}>
                <div className="text-xs text-gray-500 mb-1">Caisse</div>
                <div className="font-bold text-sm" style={{ color: "#16A34A" }}>
                  {niveau === "local" ? "420 000 FCFA" : niveau === "sousregional" ? "650 000 FCFA" : "1,2M FCFA"}
                </div>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "#D9EEFA", border: "1px solid #CBD5E1" }}>
                <div className="text-xs text-gray-500 mb-1">Banque</div>
                <div className="font-bold text-sm" style={{ color: "#0F78C8" }}>
                  {niveau === "local" ? "1,20M FCFA" : niveau === "sousregional" ? "1,70M FCFA" : "4,2M FCFA"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: Activités récentes & Table de la circonscription */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent activities */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="section-title text-base">Activités récentes — {currentConfig.levelBadge}</h3>
            <button className="text-xs font-semibold" style={{ color: "#0F78C8", background: "none", border: "none", cursor: "pointer" }}>Voir tout</button>
          </div>
          <div className="space-y-4">
            {currentConfig.activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: a.color + "15" }}>
                  <a.icon size={15} style={{ color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold" style={{ color: "#0F78C8" }}>{a.label}</p>
                    {a.amount && <span className="text-xs font-semibold flex-shrink-0" style={{ color: a.color }}>{a.amount}</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{a.detail}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock size={10} style={{ color: "#94A3B8" }} />
                    <span className="text-xs" style={{ color: "#94A3B8" }}>{a.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Jurisdiction Table (strictly no unauthorized external data) */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="section-title text-base">{currentConfig.tableTitle}</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">
              {currentConfig.tableRows.length} entités
            </span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                {currentConfig.tableCols.map(c => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentConfig.tableRows.map((r, i) => (
                <tr key={i}>
                  <td className="font-semibold" style={{ color: "#0F78C8" }}>{r.col1}</td>
                  <td className="text-xs text-slate-700">{r.col2}</td>
                  <td className="font-medium">{r.col3}</td>
                  <td>
                    <span className="badge badge-success">{r.col4}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
