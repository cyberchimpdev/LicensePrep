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

const SECTION_ENGLISH_NAMES: Record<string, string> = {
  "सवारी सञ्चालन सम्बन्धी ज्ञान": "Vehicle Operation & Driving Knowledge",
  "सवारी ऐन नियमसम्बन्धी ज्ञान": "Traffic Acts, Rules & Regulations",
  "सवारी साधनको प्राविधिक तथा यान्त्रिक ज्ञान": "Vehicle Technical & Mechanical Knowledge",
  "वातावरण प्रदूषण सम्बन्धी अवधारणात्मक ज्ञान": "Environmental Pollution & Emission",
  "दुर्घटना सचेतना सम्बन्धी ज्ञान": "Road Accident Awareness & Safety",
  "ट्राफिक सङ्केत सम्बन्धी ज्ञान": "Traffic Signs, Signals & Road Markings",
};

export function CategoryGrid({ sectionStats }: CategoryGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-sans">
            Curriculum Categories (6 Official Sections)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured in accordance with the official Department of Transport Management (DOTM) syllabus.
          </p>
        </div>
        <Link
          href="/questions"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>All 500 Questions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectionStats.map((sec) => {
          const Icon = SECTION_ICONS[sec.name] || BookOpen;
          const englishTitle = SECTION_ENGLISH_NAMES[sec.name] || sec.name;

          return (
            <div
              key={sec.name}
              className="liquid-glass-card liquid-glass-card-hover p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60 shadow-sm group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant={sec.completionPercentage === 100 ? "success" : "default"}>
                    {sec.total} Questions
                  </Badge>
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-blue-600 transition-colors font-devanagari">
                  {sec.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                  {englishTitle}
                </p>

                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500 font-medium">
                    <span>
                      {sec.attempted} / {sec.total} Practiced
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

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2 text-xs">
                <Link
                  href={`/questions?section=${encodeURIComponent(sec.name)}`}
                  className="font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>View Q&A</span>
                </Link>

                <Link
                  href={`/practice?section=${encodeURIComponent(sec.name)}`}
                  className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700"
                >
                  <span>Practice Set</span>
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
