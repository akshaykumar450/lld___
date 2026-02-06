import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Day pages
import RoseDay from "./pages/days/RoseDay";
import ProposeDay from "./pages/days/ProposeDay";
import ChocolateDay from "./pages/days/ChocolateDay";
import TeddyDay from "./pages/days/TeddyDay";
import PromiseDay from "./pages/days/PromiseDay";
import KissDay from "./pages/days/KissDay";
import HugDay from "./pages/days/HugDay";
import ValentineDay from "./pages/days/ValentineDay";

import FunZone from "./pages/FunZone";

// Fun Zone Games
import LoveCalculator from "./pages/fun/LoveCalculator";
import BubbleWrap from "./pages/fun/BubbleWrap";
import FortuneCookie from "./pages/fun/FortuneCookie";
import TruthOrDare from "./pages/fun/TruthOrDare";
import DateNightWheel from "./pages/fun/DateNightWheel";
import ComplimentShower from "./pages/fun/ComplimentShower";
import DoodleBoard from "./pages/fun/DoodleBoard";
import MoodRing from "./pages/fun/MoodRing";
import LovePotion from "./pages/fun/LovePotion";
import EmojiTranslator from "./pages/fun/EmojiTranslator";

import MusicPlayer from "./components/MusicPlayer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MusicPlayer />
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Valentine Week Day Routes */}
          <Route path="/day/rose" element={<RoseDay />} />
          <Route path="/day/propose" element={<ProposeDay />} />
          <Route path="/day/chocolate" element={<ChocolateDay />} />
          <Route path="/day/teddy" element={<TeddyDay />} />
          <Route path="/day/promise" element={<PromiseDay />} />
          <Route path="/day/kiss" element={<KissDay />} />
          <Route path="/day/hug" element={<HugDay />} />
          <Route path="/day/valentine" element={<ValentineDay />} />

          {/* Fun Zone Arcade */}
          <Route path="/fun-zone" element={<FunZone />} />
          <Route path="/fun-zone/love-calculator" element={<LoveCalculator />} />
          <Route path="/fun-zone/bubble-wrap" element={<BubbleWrap />} />
          <Route path="/fun-zone/fortune-cookie" element={<FortuneCookie />} />
          <Route path="/fun-zone/truth-or-dare" element={<TruthOrDare />} />
          <Route path="/fun-zone/date-wheel" element={<DateNightWheel />} />
          <Route path="/fun-zone/compliments" element={<ComplimentShower />} />
          <Route path="/fun-zone/doodle" element={<DoodleBoard />} />
          <Route path="/fun-zone/mood-ring" element={<MoodRing />} />
          <Route path="/fun-zone/potion-mixer" element={<LovePotion />} />
          <Route path="/fun-zone/emoji-translator" element={<EmojiTranslator />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Hidden Entry Button */}
        <a
          href="/fun-zone"
          className="fixed bottom-4 right-4 z-50 text-rose-500/20 hover:text-rose-500 hover:scale-110 transition-all duration-500"
          title="???"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </a>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
