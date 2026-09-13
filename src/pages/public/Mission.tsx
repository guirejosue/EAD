import { Globe, Users, Heart, Home, BookOpen, Droplets, ArrowRight } from "lucide-react";
import heroChurchExterior from "../../imports/hero_church_exterior.jpg";
import missionWaterWell from "../../imports/mission_water_well.jpg";
import missionCommunitySchool from "../../imports/mission_community_school.jpg";
import missionHealthCentre from "../../imports/mission_health_centre.jpg";
import img1AG from "../../imports/img1_AG.jpeg";
import imgDelegatesMission from "../../imports/WhatsApp_Image_2026-09-12_at_12.43.45.jpeg";

const actions = [
  { icon: Droplets, title: "Accès à l'eau potable", value: "47", unit: "puits forés", desc: "Forages et puits construits dans les zones rurales des régions sahéliennes, bénéficiant à plus de 18 000 personnes.", color: "#0F78C8", bg: "#D9EEFA", img: missionWaterWell },
  { icon: Home, title: "Écoles communautaires", value: "23", unit: "établissements", desc: "Écoles primaires communautaires construites et soutenues dans les zones où l'État est peu présent, scolarisant 4 200 enfants.", color: "#16A34A", bg: "#DCFCE7", img: missionCommunitySchool },
  { icon: Heart, title: "Centres de santé", value: "12", unit: "structures médicales", desc: "Dispensaires et centres de santé communautaires gérés en partenariat avec les autorités sanitaires du Burkina Faso.", color: "#DC2626", bg: "#FEE2E2", img: missionHealthCentre },
  { icon: BookOpen, title: "Formation théologique", value: "320", unit: "étudiants/an", desc: "L'Institut Biblique de Ouagadougou forme chaque année des centaines de ministres pour les 79 régions ecclésiastiques du pays.", color: "#C8973A", bg: "#FDF4E0", img: img1AG },
];

const regions = [
  { name: "Région Centre", implantations: 284, responsable: "Pasteur D. Ouédraogo" },
  { name: "Hauts-Bassins", implantations: 210, responsable: "Pasteur R. Compaoré" },
  { name: "Cascades", implantations: 142, responsable: "Pasteur A. Traoré" },
  { name: "Centre-Ouest", implantations: 138, responsable: "Pasteur M. Zongo" },
  { name: "Sahel", implantations: 98, responsable: "Pasteur I. Sawadogo" },
  { name: "Est", implantations: 112, responsable: "Pasteur F. Kaboré" },
  { name: "Nord", implantations: 124, responsable: "Pasteur J. Ouédraogo" },
  { name: "Centre-Nord", implantations: 105, responsable: "Pasteur P. Barry" },
  { name: "Boucle du Mouhoun", implantations: 98, responsable: "Pasteur S. Diallo" },
  { name: "Centre-Est", implantations: 112, responsable: "Pasteur L. Koné" },
  { name: "Centre-Sud", implantations: 89, responsable: "Pasteur B. Tapsoba" },
  { name: "Sud-Ouest", implantations: 76, responsable: "Pasteur T. Coulibaly" },
  { name: "Plateau Central", implantations: 254, responsable: "Pasteur G. Ouédraogo" },
];

export default function Mission({ onNavigate }: { onNavigate?: (p: string) => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #032A4E 0%, #0A5490 50%, #0F78C8 100%)", padding: "96px 0 72px" }}>
        <div className="absolute inset-0">
          <img src={heroChurchExterior} alt="Mission et action sociale" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(3,42,78,0.85) 0%, rgba(10,84,144,0.65) 55%, rgba(15,120,200,0.50) 100%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#E8C98A" }}>Notre engagement</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>Mission & Action sociale</h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#CBD5E1" }}>
            Les Assemblées de Dieu du Burkina Faso croient que l'Évangile transforme à la fois les âmes et les communautés. Notre mission englobe l'évangélisation, la formation et le développement intégral.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { label: "Actions missionnaires actives", value: "94" },
              { label: "Nouvelles implantations 2026", value: "38" },
              { label: "Régions couvertes", value: "13/13" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#94A3B8" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate?.("don-mission")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-xl hover:scale-102 transition-all cursor-pointer"
            style={{ background: "linear-gradient(135deg, #C8973A, #D9AE5F)" }}
          >
            Faire un don pour la mission <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Actions sociales */}
      <section className="py-20" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C8973A" }}>Développement communautaire</div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Notre impact social</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">Au-delà du message, nous agissons : eau, éducation, santé, formation — un engagement concret au service des populations burkinabè.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {actions.map(a => (
              <div key={a.title} className="card overflow-hidden group" style={{ borderRadius: "16px" }}>
                <div style={{ height: 220, overflow: "hidden" }}>
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: a.bg }}>
                      <a.icon size={22} style={{ color: a.color }} />
                    </div>
                    <div>
                      <div className="text-2xl font-black" style={{ fontFamily: "'Manrope', sans-serif", color: a.color }}>{a.value} <span className="text-sm font-semibold text-gray-400">{a.unit}</span></div>
                      <h3 className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{a.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Évangélisation */}
      <section className="py-20" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C8973A" }}>Évangélisation</div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>Porter l'Évangile jusqu'aux extrémités du Burkina</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Chaque année, des centaines d'équipes d'évangélisation sont déployées dans les villes, villages et campements les plus reculés. Les campagnes de plein air, la radio chrétienne et les visites à domicile permettent d'atteindre des milliers de personnes avec le message de l'Évangile.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { label: "Décisions enregistrées en 2026", value: "14 200+" },
                  { label: "Campagnes d'évangélisation", value: "94" },
                  { label: "Nouvelles assemblées plantées", value: "38" },
                  { label: "Équipes missionnaires actives", value: "67" },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between p-4 rounded-xl" style={{ background: "white", border: "1px solid #D9EEFA" }}>
                    <span className="text-sm text-gray-600">{s.label}</span>
                    <span className="font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{s.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate?.("don-mission")}
                className="btn-primary inline-flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
              >
                Soutenir la mission <ArrowRight size={16} />
              </button>
            </div>
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ height: 360 }}>
                <img src={imgDelegatesMission} alt="Délégués et équipes missionnaires sur le terrain" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,42,78,0.7) 0%, transparent 60%)" }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-1 inline-block" style={{ background: "rgba(200,151,58,0.9)", color: "white" }}>Mobilisation</span>
                  <p className="text-white text-xs font-semibold">Délégués et conducteurs pastoraux engagés pour l'évangélisation dans les régions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Présence régionale */}
      <section className="py-20" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#C8973A" }}>Présence nationale</div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>79 régions couvertes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regions.map(r => (
              <div key={r.name} className="card p-5 flex items-center justify-between" style={{ borderRadius: "12px" }}>
                <div>
                  <h3 className="font-bold text-sm" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{r.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{r.responsable}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black" style={{ fontFamily: "'Manrope', sans-serif", color: "#0F78C8" }}>{r.implantations}</div>
                  <div className="text-xs text-gray-400">églises</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
