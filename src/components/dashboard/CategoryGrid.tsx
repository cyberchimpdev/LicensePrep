import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle, Car, ShieldAlert, Cpu, Wind, FileText, TrafficCone, Layers } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";

interface SectionStat {
  name: string;
  total: number;
  attempted: number;
  correct: number;
  percentage: number;
  completionPercentage: number;
}

interface CategoryGridProps {
  sectionStats: SectionStat[];
}

const SECTION_ICONS: Record<string, React.ElementType> = {
  "सवारी सञ्चालन सम्बन्धी ज्ञान": Car,
  "सवारी ऐन नियमसम्बन्धी ज्ञान": FileText,
  "सवारी साधनको प्राविधिक तथा यान्त्रिक ज्ञान": Cpu,
  "वातावरण प्रदूषण सम्बन्धी अवधारणात्मक ज्ञान": Wind,
  "दुर्घटना सचेतना सम्बन्धी ज्ञान": ShieldAlert,
  "ट्राफिक सङ्केत सम्बन्धी ज्ञान": TrafficCone,
};

const SECTION_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "सवारी सञ्चालन सम्बन्धी ज्ञान": { bg: "bg-blue-50", text: "text-blue-600", border: "hover:border-blue-300" },
  "सवारी ऐन नियमसम्बन्धी ज्ञान": { bg: "bg-indigo-50", text: "text-indigo-600", border: "hover:border-indigo-300" },
  "सवारी साधनको प्राविधिक तथा यान्त्रिक ज्ञान": { bg: "bg-amber-50", text: "text-amber-600", border: "hover:border-amber-300" },
  "वातावरण प्रदूषण सम्बन्धी अवधारणात्मक ज्ञान": { bg: "bg-emerald-50", text: "text-emerald-600", border: "hover:border-emerald-300" },
  "दुर्घटना सचेतना सम्बन्धी ज्ञान": { bg: "bg-rose-50", text: "text-rose-600", border: "hover:border-rose-300" },
  "ट्राफिक सङ्केत सम्बन्धी ज्ञान": { bg: "bg-purple-50", text: "text-purple-600", border: "hover:border-purple-300" },
};

export function CategoryGrid({ sectionStats }: CategoryGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Study by Category (६ विषयगत प्रश्नोत्तर)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            यातायात व्यवस्था विभाग (DOTM) को पाठ्यक्रम अनुसार विषयगत विभाजन।
          </p>
        </div>
        <Link
          href="/questions"
          className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>All 500 Questions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {sectionStats.map((sec, idx) => {
          const Icon = SECTION_ICONS[sec.name] || BookOpen;
          const colors = SECTION_COLORS[sec.name] || {
            bg: "bg-blue-50",
            text: "text-blue-600",
            border: "hover:border-blue-300",
          };

          return (
            <div
              key={sec.name}
              className={`bg-white rounded-3xl border border-slate-200/90 p-6 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between group ${colors.border}`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant={sec.completionPercentage === 100 ? "success" : "default"}>
                    {sec.total} Questions
                  </Badge>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors font-devanagari">
                  {sec.name}
                </h3>

                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500 font-bold">
                    <span>
                      {sec.attempted} of {sec.total} Practiced
                    </span>
                    <span>{sec.completionPercentage}%</span>
                  </div>
                  <ProgressBar
                    value={sec.attempted}
                    max={sec.total}
                    size="sm"
                    barColor={sec.completionPercentage === 100 ? "emerald" : "blue"}
                  />
                </div>

                {sec.attempted > 0 && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Accuracy: <strong className="text-slate-800 font-bold">{sec.percentage}%</strong></span>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  href={`/questions?section=${encodeURIComponent(sec.name)}`}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <Layers className="w-3 h-3 text-slate-400" />
                  <span>View Q&A</span>
                </Link>

                <Link
                  href={`/practice?section=${encodeURIComponent(sec.name)}`}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-600 hover:text-blue-700"
                >
                  <span>Practice</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
