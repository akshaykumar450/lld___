import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface DayLayoutProps {
  children: ReactNode;
  dayName: string;
  emoji: string;
  backLink?: string;
}

const DayLayout = ({ children, dayName, emoji, backLink = "/" }: DayLayoutProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link
            to={backLink}
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xl">{emoji}</span>
            <span className="font-display font-medium text-foreground">{dayName}</span>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
};

export default DayLayout;
