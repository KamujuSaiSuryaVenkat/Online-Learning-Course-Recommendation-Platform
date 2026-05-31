import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Clock3, Sparkles } from 'lucide-react';
import { enrollmentAPI, progressAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import { DashboardCard, Button, EmptyState, LoadingSpinner } from '../components/ui';

export default function MyLearning() {
  const [enrollments, setEnrollments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [tab, setTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([enrollmentAPI.getMyEnrollments(), progressAPI.getSummary()])
      .then(([e, s]) => { setEnrollments(e.data.enrollments); setSummary(s.data.summary); })
      .catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => enrollments.filter((item) => {
    if (tab === 'all') return true;
    if (tab === 'completed') return item.progressPercent >= 100;
    if (tab === 'in-progress') return item.progressPercent > 0 && item.progressPercent < 100;
    if (tab === 'not-started') return item.progressPercent === 0;
    return true;
  }), [enrollments, tab]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="surface-panel p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          <Sparkles className="h-3.5 w-3.5" /> Track learning momentum
        </div>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">My Learning</h2>
        <p className="mt-2 text-sm text-slate-500">Monitor your enrolled courses with a clean progress dashboard.</p>
      </motion.section>

      {summary && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard title="Total enrolled" value={summary.totalCourses} icon={BookOpen} />
          <DashboardCard title="Completed" value={summary.completed} icon={CheckCircle2} tone="success" />
          <DashboardCard title="In progress" value={summary.inProgress} icon={Clock3} tone="warning" />
          <DashboardCard title="Hours spent" value={`${Math.round(summary.totalTimeMinutes / 60)}h`} icon={Clock3} tone="danger" />
        </div>
      )}

      <div className="tabs">
        {[
          ['all', 'All courses'],
          ['in-progress', 'In progress'],
          ['completed', 'Completed'],
          ['not-started', 'Not started']
        ].map(([value, label]) => (
          <button key={value} className={`tab ${tab === value ? 'active' : ''}`} onClick={() => setTab(value)}>{label}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No courses here yet"
          description="Browse the catalog and enroll in a course to see it here."
          action={<Button onClick={() => navigate('/courses')}>Browse courses</Button>}
        />
      ) : (
        <div className="grid-courses">
          {filtered.map((item) => item.course && <CourseCard key={item._id} course={item.course} progress={item.progressPercent} showProgress />)}
        </div>
      )}
    </div>
  );
}
