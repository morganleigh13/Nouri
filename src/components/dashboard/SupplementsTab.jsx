export default function SupplementsTab({ recommendations }) {
  const supplementCards = recommendations.supplementRecommendations || [];
  const extraRecommendations = recommendations.supplementExtraRecommendations || [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {supplementCards.map((item) => (
          <div key={item.name} className="card bg-base-200 shadow">
            <figure className="h-56 overflow-hidden bg-base-100">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            </figure>
            <div className="card-body">
              <div className="flex items-start justify-between gap-3">
                <h3 className="card-title">{item.name}</h3>
                <div className="flex flex-wrap gap-2 justify-end">
                  {(item.bestFor || []).map((label) => (
                    <span key={label} className="badge badge-primary">{label}</span>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm">{item.description}</p>

              <div className="mt-3 rounded-2xl bg-base-100 p-3">
                <p className="font-semibold text-sm">Why this may help</p>
                <p className="mt-1 text-sm opacity-80">{item.whyItMayHelp}</p>
              </div>

              <ul className="mt-3 space-y-2 text-sm opacity-80">
                {item.benefits.map((benefit) => (
                  <li key={benefit} className="rounded-xl bg-base-100 p-2">• {benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h3 className="card-title">Extra recommendations</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {extraRecommendations.map((item) => (
              <div key={item.title} className="rounded-2xl bg-base-100 p-4">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm opacity-80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
