const SECTIONS = [
  {
    title: "Éditeur du site",
    content:
      "SAIEN (Synergie Africaine pour l'Innovation et l'Excellence Numérique)\nAssociation loi 1901\nSiège social : Paris, France",
  },
  {
    title: "Propriété intellectuelle",
    content:
      "L'ensemble de ce site relève des législations française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents iconographiques et photographiques.",
  },
  {
    title: "Protection des Données",
    content:
      "Vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, veuillez nous contacter via notre formulaire dédié.",
  },
];

export default function LegalSection() {
  return (
    <section
      className="bg-slate-50 py-20 lg:py-24"
      aria-labelledby="legal-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="legal-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
          >
            Informations Légales
          </h2>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden shadow-sm">
          {SECTIONS.map(({ title, content }) => (
            <div key={title} className="px-6 py-6">
              <h3 className="font-bold text-slate-900 text-sm mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">
                {content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
