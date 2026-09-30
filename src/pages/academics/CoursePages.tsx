import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, EyeOff, GraduationCap } from "lucide-react";
import SubPageLayout from "../../components/SubPageLayout";
import { CourseDetail } from "../../components/AcademicsLayouts";
import DynamicSubPage from "../DynamicSubPage";
import { COURSE_SLUG_PREFIX, courseNavLabel, useCourses } from "../../hooks/useCourses";

/**
 * /academics/<slug>. Course pages are data, so they are matched here by
 * address rather than each having a route: /academics/courses-offered-<id> is
 * the course with that id. Any other /academics/<slug> is the scraped page it
 * always was.
 */
export function CourseBySlug() {
  const { slug = "" } = useParams();
  const { content, preview, loaded } = useCourses();

  if (!slug.startsWith(COURSE_SLUG_PREFIX)) return <DynamicSubPage />;

  const id = slug.slice(COURSE_SLUG_PREFIX.length);
  const course = content.courses.find((c) => c.id === id);
  // A disabled course is absent from the live data; a preview carries it, flagged.
  const shown = course && (course.enabled || preview);

  if (!shown) {
    // A course added in the panel is not in the shipped defaults; wait for the list.
    if (!loaded) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#123a1a] border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }
    return (
      <SubPageLayout
        title="Course not offered"
        subtitle="This course is not currently offered at CKPIPSR."
        category="academics"
        activeItemLabel="Courses Offered"
      >
        <div className="bg-white rounded-2xl border border-slate-100 p-8 sm:p-10 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#123a1a]/5 text-[#123a1a] flex items-center justify-center mx-auto">
            <GraduationCap size={22} />
          </div>
          <h2 className="text-xl font-serif font-bold text-slate-900">This course is not currently offered</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            It may have been renamed or withdrawn. See the programs we offer now.
          </p>
          <Link
            to="/academics/courses-offered"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123a1a] text-white font-bold text-xs hover:bg-[#1a4a25] transition-all"
          >
            All courses
            <ArrowRight size={14} />
          </Link>
        </div>
      </SubPageLayout>
    );
  }

  return (
    <SubPageLayout
      title={course.page.pageTitle}
      subtitle={course.page.pageSubtitle}
      category="academics"
      activeItemLabel={courseNavLabel(course)}
    >
      {!course.enabled && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
          <EyeOff size={16} className="shrink-0" />
          Preview only: this course is disabled and hidden on the live site.
        </div>
      )}
      <CourseDetail course={course.page} />
    </SubPageLayout>
  );
}
