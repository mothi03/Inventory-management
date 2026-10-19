export default function SummaryCard({ title, value, note, icon, color }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{title}</span>
        <span className={`stat-icon ${color}`}>{icon}</span>
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}