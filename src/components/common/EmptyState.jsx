import { MapPinned } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  title = "Nothing here yet",
  description = "Add data to unlock this section.",
  actionLabel,
  onAction,
  icon: Icon = MapPinned,
}) {
  return (
    <div className="rounded-lg border border-dashed border-desert-300 bg-desert-50/70 p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-royal-700 shadow-sm">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-desert-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-desert-700">
        {description}
      </p>
      {actionLabel ? (
        <Button className="mt-5" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
