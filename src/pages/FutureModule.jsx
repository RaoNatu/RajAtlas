import { ArrowRight, Database, Layers } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Badge from "../components/common/Badge";
import Card from "../components/common/Card";
import EmptyState from "../components/common/EmptyState";

export default function FutureModule({
  title,
  phase,
  description,
  topics = [],
  nextStep,
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title={title}
        eyebrow="Rajasthan GK"
        description={description}
        badge="Study module"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-royal-700" aria-hidden="true" />
            <h2 className="text-2xl font-black text-desert-900">Planned topics</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {topics.map((topic) => (
              <div
                key={topic}
                className="flex items-center justify-between rounded-lg border border-desert-200 bg-desert-50 px-4 py-3"
              >
                <span className="font-bold text-desert-900">{topic}</span>
                <ArrowRight className="h-4 w-4 text-royal-700" aria-hidden="true" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <Badge color="gold">Study path</Badge>
          <h2 className="mt-4 text-2xl font-black text-desert-900">
            Focused topic groups
          </h2>
          <p className="mt-3 text-sm leading-6 text-desert-700">
            This section groups related Rajasthan GK topics so learners can move
            from overview to practice without losing context.
          </p>
          <div className="mt-5 rounded-lg bg-royal-50 p-4 text-sm leading-6 text-royal-900">
            {nextStep}
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <EmptyState
          icon={Database}
          title={`${title} study material`}
          description="Choose a topic above to begin building your revision trail."
        />
      </div>
    </div>
  );
}
