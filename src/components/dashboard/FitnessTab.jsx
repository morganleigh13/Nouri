export default function FitnessTab({ recommendations }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {recommendations.fitnessRecommendations.map((item) => (
        <div key={item} className="card bg-base-200 shadow">
          <div className="card-body">
            <h3 className="card-title">Fitness suggestion</h3>
            <p className="mt-2 text-sm">{item}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
