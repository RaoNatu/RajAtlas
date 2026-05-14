import { RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../common/Card";

export default function Flashcard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className="block w-full text-left"
      onClick={() => setFlipped((value) => !value)}
    >
      <Card className="min-h-[170px] overflow-hidden p-0" interactive>
        <motion.div
          className="flex min-h-[170px] flex-col justify-between p-5"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.45 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div style={{ transform: flipped ? "rotateY(180deg)" : "none" }}>
            <p className="text-xs font-bold uppercase tracking-wide text-royal-800">
              Flashcard
            </p>
            <h3 className="mt-3 text-lg font-black text-desert-900">
              {flipped ? back : front}
            </h3>
          </div>
          <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-desert-600">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Tap to flip
          </span>
        </motion.div>
      </Card>
    </button>
  );
}
