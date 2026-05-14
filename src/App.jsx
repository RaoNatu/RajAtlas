import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

const Home = lazy(() => import("./pages/Home"));
const MapExplorer = lazy(() => import("./pages/MapExplorer"));
const RegionExplorer = lazy(() => import("./pages/RegionExplorer"));
const QuizArena = lazy(() => import("./pages/QuizArena"));
const Progress = lazy(() => import("./pages/Progress"));
const Geography = lazy(() => import("./pages/Geography"));
const Economy = lazy(() => import("./pages/Economy"));
const Politics = lazy(() => import("./pages/Politics"));
const History = lazy(() => import("./pages/History"));
const Culture = lazy(() => import("./pages/Culture"));
const AdvancedLearning = lazy(() => import("./pages/AdvancedLearning"));

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapExplorer />} />
            <Route path="/regions" element={<RegionExplorer />} />
            <Route path="/quiz" element={<QuizArena />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/economy" element={<Economy />} />
            <Route path="/politics" element={<Politics />} />
            <Route path="/history" element={<History />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/learn" element={<AdvancedLearning />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function RouteLoading() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-4">
      <div className="rounded-lg border border-desert-200 bg-white px-5 py-4 text-sm font-bold text-desert-800 shadow-soft">
        Loading atlas module...
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
