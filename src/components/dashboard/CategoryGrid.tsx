import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle, Car, ShieldAlert, Cpu, Wind, FileText, TrafficCone } from "lucide-react";
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

export function CategoryGrid({ sectionStats }: CategoryGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Practice by Category (विषयगत अभ्यास)
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Master questions section-by-section according to the official Nepal DOTM curriculum.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {sectionStats.map((sec, idx) => {
          const Icon = SECTION_ICONS[sec.name] || BookOpen;
          return (
            <div
              key={sec.name}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle hover:shadow-card hover:border-blue-200 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant={sec.completionPercentage === 100 ? "success" : "default"}>
                    {sec.total} Questions
                  </Badge>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                  {sec.name}
                </h3>

                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500 font-medium">
                    <span>
                      {sec.attempted} of {sec.total} practiced
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
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Accuracy: <strong className="text-slate-800">{sec.percentage}%</strong></span>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  href={`/practice?section=${encodeURIComponent(sec.name)}`}
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-blue-600 hover:text-blue-700 py-1"
                >
                  <span>Practice this category</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

