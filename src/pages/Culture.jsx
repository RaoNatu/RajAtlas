import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  CalendarDays,
  CheckCircle2,
  Gem,
  Landmark,
  Music,
  Palette,
  Sparkles,
} from "lucide-react";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PageHeader from "../components/layout/PageHeader";
import StatsCard from "../components/dashboard/StatsCard";
import MCQQuiz from "../components/quiz/MCQQuiz";
import {
  cultureCategories,
  cultureGallery,
  cultureQuiz,
  danceCards,
  festivalCalendar,
  fortExplorer,
  templeExplorer,
} from "../data/culture";
import { useProgress } from "../hooks/useProgress";

const categoryIcons = {
  Forts: Landmark,
  Temples: Landmark,
  Fairs: CalendarDays,
  "Folk Dance": Sparkles,
  Music,
  Paintings: Palette,
  Handicrafts: Gem,
  Languages: Sparkles,
};

export default function Culture() {
  const [activeCategory, setActiveCategory] = useState("Forts");
  const [selectedItemId, setSelectedItemId] = useState(cultureGallery[0].id);
  const {
    markTopicComplete,
    recordQuizScore,
    setLastOpenedModule,
    toggleBookmark,
    isBookmarked,
    progress,
  } = useProgress();

  useEffect(() => {
    setLastOpenedModule("Culture");
  }, [setLastOpenedModule]);

  const filteredGallery = useMemo(
    () => cultureGallery.filter((item) => item.category === activeCategory),
    [activeCategory],
  );
  const selectedItem =
    cultureGallery.find((item) => item.id === selectedItemId) || filteredGallery[0] || cultureGallery[0];
  const selectedStudied = progress.completedTopics.includes(selectedItem.id);
  const selectedSaved = isBookmarked(`culture-${selectedItem.id}`);

  function chooseCategory(category) {
    setActiveCategory(category);
    const firstItem = cultureGallery.find((item) => item.category === category);
    if (firstItem) setSelectedItemId(firstItem.id);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Phase 6"
        title="Art and Culture of Rajasthan"
        description="Explore forts, temples, fairs, dances, instruments, paintings, handicrafts, and languages as visual memory cards with culture-specific quizzes."
        badge="Implemented"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Culture categories"
          value={cultureCategories.length}
          helper="Gallery filters for major art and culture topics."
          icon={Palette}
          tone="blue"
        />
        <StatsCard
          label="Fort cards"
          value={fortExplorer.length}
          helper="District, builder, and historical memory slots."
          icon={Landmark}
          tone="sand"
        />
        <StatsCard
          label="Dance cards"
          value={danceCards.length}
          helper="Region, community, costume, occasion."
          icon={Sparkles}
          tone="green"
        />
        <StatsCard
          label="Fair calendar"
          value={festivalCalendar.length}
          helper="Location and month placeholders ready for source data."
          icon={CalendarDays}
          tone="maroon"
        />
      </div>

      <section className="mt-8">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
              Culture gallery
            </p>
            <h2 className="mt-2 text-3xl font-black text-desert-900">
              Filter by visual memory type
            </h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {cultureCategories.map((category) => {
              const Icon = categoryIcons[category] || Sparkles;
              return (
                <Button
                  key={category}
                  variant={activeCategory === category ? "primary" : "outline"}
                  size="sm"
                  icon={Icon}
                  onClick={() => chooseCategory(category)}
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-6">
            {filteredGallery.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredGallery.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => setSelectedItemId(item.id)}
                    className={[
                      "rounded-lg border p-4 text-left transition",
                      selectedItem.id === item.id
                        ? "border-royal-300 bg-royal-50"
                        : "border-desert-200 bg-desert-50 hover:border-royal-200",
                    ].join(" ")}
                  >
                    <Badge color="gold">{item.category}</Badge>
                    <div className="mt-4 h-24 rounded-lg bg-gradient-to-br from-desert-200 via-amber-100 to-royal-100 p-4">
                      <p className="text-sm font-black text-desert-900">{item.visualCue}</p>
                    </div>
                    <h3 className="mt-4 text-lg font-black text-desert-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-desert-700">{item.memoryHook}</p>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-desert-300 bg-desert-50 p-6 text-sm font-semibold text-desert-700">
                Add {activeCategory} cards in src/data/culture.js to populate this gallery.
              </div>
            )}
          </Card>

          <Card className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Badge color="blue">{selectedItem.category}</Badge>
                <h2 className="mt-3 text-2xl font-black text-desert-900">
                  {selectedItem.title}
                </h2>
                <p className="mt-1 text-sm font-bold text-desert-600">
                  District or region: {selectedItem.district}
                </p>
              </div>
              <Button
                variant={selectedSaved ? "primary" : "outline"}
                size="sm"
                icon={Bookmark}
                onClick={() =>
                  toggleBookmark({
                    id: `culture-${selectedItem.id}`,
                    title: selectedItem.title,
                    type: selectedItem.category,
                    category: "Culture",
                    path: "/culture",
                  })
                }
              >
                {selectedSaved ? "Saved" : "Save"}
              </Button>
            </div>
            <p className="mt-5 rounded-lg bg-royal-50 p-4 text-sm font-semibold leading-6 text-royal-900">
              {selectedItem.details}
            </p>
            <div className="mt-4 rounded-lg bg-desert-50 p-4">
              <p className="text-sm font-bold uppercase tracking-wide text-desert-600">
                Memory hook
              </p>
              <p className="mt-2 text-base font-black text-desert-900">
                {selectedItem.memoryHook}
              </p>
            </div>
            <Button
              className="mt-5 w-full"
              variant={selectedStudied ? "secondary" : "primary"}
              icon={selectedStudied ? CheckCircle2 : Palette}
              onClick={() => markTopicComplete(selectedItem.id, selectedItem.title, "Culture")}
            >
              {selectedStudied ? "Studied" : "Mark culture card studied"}
            </Button>
          </Card>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Temple explorer
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Deity, location, festival
          </h2>
          <div className="mt-6 space-y-3">
            {templeExplorer.map((temple) => (
              <div key={temple.id} className="rounded-lg border border-desert-200 bg-white p-4">
                <Badge color="maroon">{temple.deity}</Badge>
                <h3 className="mt-3 font-black text-desert-900">{temple.name}</h3>
                <p className="mt-1 text-sm font-bold text-royal-800">{temple.location}</p>
                <p className="mt-2 text-sm leading-6 text-desert-700">{temple.importance}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Folk dance module
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Region, community, costume, occasion
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {danceCards.map((dance) => (
              <div key={dance.id} className="rounded-lg bg-desert-50 p-4">
                <Badge color="green">{dance.region}</Badge>
                <h3 className="mt-3 font-black text-desert-900">{dance.name}</h3>
                <p className="mt-2 text-sm leading-6 text-desert-700">
                  {dance.community} - {dance.costume}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-desert-600">
                  {dance.occasion}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Fairs and festivals
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Festival calendar seed
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {festivalCalendar.map((festival) => (
              <div key={festival.id} className="rounded-lg bg-desert-50 p-4">
                <Badge color="gold">{festival.month}</Badge>
                <h3 className="mt-3 font-black text-desert-900">{festival.name}</h3>
                <p className="mt-1 text-sm font-bold text-royal-800">{festival.location}</p>
                <p className="mt-2 text-sm leading-6 text-desert-700">{festival.importance}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-royal-800">
            Culture quiz
          </p>
          <h2 className="mt-2 text-2xl font-black text-desert-900">
            Practice visual recall
          </h2>
          <div className="mt-5">
            <MCQQuiz
              key="culture-quiz"
              questions={cultureQuiz}
              quizId="phase-6-culture"
              onComplete={recordQuizScore}
            />
          </div>
        </Card>
      </section>
    </div>
  );
}
