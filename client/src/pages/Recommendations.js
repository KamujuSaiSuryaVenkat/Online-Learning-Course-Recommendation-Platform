import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Target, TrendingUp } from 'lucide-react';
import { recommendationAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';
import { EmptyState, LoadingSpinner } from '../components/ui';

export default function Recommendations() {
  const { user } = useAuth();
  const [data, setData] = useState({ recommendations: [], trending: [], categoryBased: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recommendationAPI.get().then(res => setData(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="surface-panel p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          <Brain className="h-3.5 w-3.5" /> Recommendation engine
        </div>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">Recommended for you</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">Personalized based on your interests: <span className="font-semibold text-brand-700">{user?.interests?.join(', ') || 'no interests selected yet'}</span></p>
      </motion.section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { title: 'Interest match', description: 'Highest priority is given to the topics you care about.', icon: Target },
          { title: 'Skill overlap', description: 'Courses that build on existing strengths are lifted higher.', icon: Sparkles },
          { title: 'Level fit', description: 'Content is balanced against your experience level.', icon: TrendingUp },
          { title: 'Popularity score', description: 'Highly rated and widely enrolled courses rank up.', icon: Brain }
        ].map((item) => (
          <div key={item.title} className="surface-panel p-5">
            <item.icon className="h-5 w-5 text-brand-600" />
            <div className="mt-4 text-base font-bold text-slate-900">{item.title}</div>
            <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
          </div>
        ))}
      </div>

      {data.recommendations?.length > 0 && (
        <section>
          <div className="section-header"><div><div className="section-title">Top picks for you</div><div className="section-sub">Matched to your profile</div></div></div>
          <div className="grid-courses">
            {data.recommendations.map((course) => <CourseCard key={course._id} course={course} />)}
          </div>
        </section>
      )}

      {data.trending?.length > 0 && (
        <section>
          <div className="section-header"><div><div className="section-title">Trending now</div><div className="section-sub">Most enrolled courses this week</div></div></div>
          <div className="grid-courses">
            {data.trending.map((course) => <CourseCard key={course._id} course={course} />)}
          </div>
        </section>
      )}

      {data.categoryBased?.length > 0 && (
        <section>
          <div className="section-header"><div><div className="section-title">More like what you're learning</div><div className="section-sub">Based on your enrolled categories</div></div></div>
          <div className="grid-courses">
            {data.categoryBased.map((course) => <CourseCard key={course._id} course={course} />)}
          </div>
        </section>
      )}

      {data.recommendations?.length === 0 && data.trending?.length === 0 && <EmptyState title="Update your interests" description="Go to your profile and add interests to get personalized recommendations." />}
    </div>
  );
}
