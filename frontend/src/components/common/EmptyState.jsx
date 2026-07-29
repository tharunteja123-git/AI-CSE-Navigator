import { Link } from "react-router-dom";

export default function EmptyState({ emoji = "📭", title, desc, cta, ctaLink }) {
  return (
    <div className="card flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="font-bold text-slate-800 text-lg mb-2">{title}</h3>
      {desc && <p className="text-slate-500 text-sm max-w-xs mb-5">{desc}</p>}
      {cta && ctaLink && (
        <Link to={ctaLink} className="btn-primary inline-flex">{cta}</Link>
      )}
    </div>
  );
}
