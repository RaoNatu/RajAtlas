import { CheckCircle2, PlusCircle } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";

export default function FactCard({ fact, completed = false, onComplete }) {
  return (
    <Card className="flex h-full flex-col p-5" interactive>
      <div className="flex items-start justify-between gap-3">
        <Badge color={fact.sourceStatus === "To be added" ? "maroon" : "blue"}>
          {fact.category}
        </Badge>
        {completed ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-label="Completed" />
        ) : null}
      </div>
      <h3 className="mt-4 text-lg font-black text-desert-900">{fact.title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-desert-800">
        {fact.summary}
      </p>
      <p className="mt-3 flex-1 text-sm leading-6 text-desert-700">{fact.detail}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <Badge color={fact.sourceStatus === "To be added" ? "gold" : "green"}>
          {fact.sourceStatus}
        </Badge>
        <Button
          variant={completed ? "ghost" : "secondary"}
          size="sm"
          icon={completed ? CheckCircle2 : PlusCircle}
          onClick={() => onComplete?.(fact.id, fact.title)}
        >
          {completed ? "Studied" : "Mark"}
        </Button>
      </div>
    </Card>
  );
}
