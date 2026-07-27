const supplementImageMap = {
  protein: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80',
  collagen: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=80',
  magnesium: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=900&q=80',
  vitamin: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  omega: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
  sleep: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
  probiotic: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
  'vitamin d3': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
  'l-theanine': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
  default: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80',
};

function getSupplementImage(item) {
  const text = `${item.name || ''} ${item.description || ''}`.toLowerCase();

  if (text.includes('protein')) return supplementImageMap.protein;
  if (text.includes('collagen')) return supplementImageMap.collagen;
  if (text.includes('magnesium')) return supplementImageMap.magnesium;
  if (text.includes('vitamin d3') || text.includes('vitamin d')) return supplementImageMap['vitamin d3'];
  if (text.includes('l-theanine') || text.includes('theanine')) return supplementImageMap['l-theanine'];
  if (text.includes('probiotic')) return supplementImageMap.probiotic;
  if (text.includes('vitamin')) return supplementImageMap.vitamin;
  if (text.includes('omega')) return supplementImageMap.omega;
  if (text.includes('sleep') || text.includes('night')) return supplementImageMap.sleep;

  return supplementImageMap.default;
}

export default function SupplementsTab({ recommendations }) {
  const supplementCards = recommendations.supplementRecommendations || [];
  const extraRecommendations = recommendations.supplementExtraRecommendations || [];

  return (
    <div className="space-y-6">
      <div className="alert alert-warning text-sm">
        <span>Supplement suggestions are educational content, not medical advice. Check allergies, medications, pregnancy status, and lab-based needs with a qualified clinician before starting a supplement.</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {supplementCards.map((item) => (
          <div key={item.name} className="card h-full bg-base-200 shadow-xl">
            <figure className="h-56 overflow-hidden bg-base-100">
              <img src={getSupplementImage(item)} alt={item.name} className="h-full w-full object-cover" />
            </figure>
            <div className="card-body">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="card-title text-xl text-primary">{item.name}</h3>
                <div className="flex flex-wrap gap-2 justify-end">
                  {(item.bestFor || []).map((label) => (
                    <span key={label} className="badge badge-accent">{label}</span>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm font-semibold text-base-content">{item.description}</p>

              <div className="mt-3 rounded-2xl bg-base-100 p-3">
                <p className="text-sm font-semibold text-secondary">Why this may help</p>
                <p className="mt-1 text-sm font-semibold opacity-80">{item.whyItMayHelp}</p>
              </div>

              <ul className="mt-3 space-y-2 text-sm font-semibold opacity-80">
                {item.benefits.map((benefit) => (
                  <li key={benefit} className="rounded-xl bg-base-100 p-2 text-info">• {benefit}</li>
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
