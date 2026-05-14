import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Card from "../common/Card";

export default function TopicCard({
  title,
  description,
  to,
  icon: Icon,
  status = "Ready",
  color = "blue",
}) {
  return (
    <Card as={Link} to={to} className="block p-5" interactive>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-desert-100 text-royal-800">
          {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
        </div>
        <Badge color={color}>{status}</Badge>
      </div>
      <h3 className="mt-5 text-xl font-black text-desert-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-desert-700">{description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-royal-800">
        Open module
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Card>
  );
}
