import { Brain, CheckCircle2 } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";

export default function DailyChallenge({ onComplete, completed = false }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge color="gold">Daily challenge</Badge>
          <h2 className="mt-4 text-2xl font-black text-desert-900">
            Can you name 10 districts of Rajasthan?
          </h2>
          <p className="mt-3 text-sm leading-6 text-desert-700">
            Use the map first, then test your memory in the quiz arena.
          </p>
        </div>
        <div className="rounded-lg bg-royal-50 p-3 text-royal-800">
          <Brain className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>
      <Button
        className="mt-6"
        variant={completed ? "secondary" : "primary"}
        icon={completed ? CheckCircle2 : Brain}
        onClick={onComplete}
      >
        {completed ? "Challenge noted" : "Mark challenge done"}
      </Button>
    </Card>
  );
}
