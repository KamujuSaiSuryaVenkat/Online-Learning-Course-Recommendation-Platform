import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, BookOpenCheck, Flame, GraduationCap, Rocket, Sparkles, Timer } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { progressAPI, enrollmentAPI, recommendationAPI, userAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';
import { DashboardCard, Button, EmptyState } from '../components/ui';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      progressAPI.getSummary(),
      enrollmentAPI.getMyEnrollments(),
      recommendationAPI.get(),
      userAPI.getLeaderboard()
    ]).then(([sum, enr, rec, lb]) => {
      setSummary(sum.data.summary);
      setEnrollments(enr.data.enrollments.slice(0, 3));
      setRecommendations(rec.data.recommendations.slice(0, 3));
      setLeaderboard(lb.data.users.slice(0, 5));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const progressChartData = useMemo(() => summary?.progressList?.slice(0, 6).map((item) => ({
    name: item.course?.title?.slice(0, 14) + '...',
    progress: item.progressPercent
  })) || [], [summary]);

  const activityData = [
    { day: 'Mon', minutes: 45 }, { day: 'Tue', minutes: 72 }, { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 90 }, { day: 'Fri', minutes: 55 }, { day: 'Sat', minutes: 120 }, { day: 'Sun', minutes: 0 }
  ];

  const successData = [
    { label: 'Applied', value: 100 },
    { label: 'Interview', value: Math.max(35, (summary?.completed || 0) * 3) },
    { label: 'Offer', value: Math.max(15, (summary?.completed || 0) * 1.4) }
  ];

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <div className="space-y-8">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              <Sparkles className="h-3.5 w-3.5" /> Daily performance at a glance
            </div>
            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-lg font-black text-white shadow-lg shadow-brand-500/20">{initials}</div>
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Welcome back, {user?.name?.split(' ')[0]}.</h2>
                <p className="mt-2 text-sm text-slate-500">{user?.level} learner · {user?.interests?.join(', ') || 'No interests selected yet'}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => navigate('/courses')}>Explore courses</Button>
              <Button variant="outline" onClick={() => navigate('/recommendations')}>View recommendations</Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-3xl bg-slate-900 p-4 text-white shadow-soft">
              <Flame className="h-5 w-5 text-amber-400" />
              <div className="mt-6 text-3xl font-black">{user?.streak || 0}</div>
              <div className="mt-1 text-xs text-slate-300">Day streak</div>
            </div>
            <div className="rounded-3xl bg-brand-50 p-4 text-slate-900 shadow-sm">
              <GraduationCap className="h-5 w-5 text-brand-600" />
              <div className="mt-6 text-3xl font-black text-brand-700">{user?.totalPoints || 0}</div>
              <div className="mt-1 text-xs text-slate-500">Total points</div>
            </div>
            <div className="rounded-3xl bg-emerald-50 p-4 text-slate-900 shadow-sm">
              <Rocket className="h-5 w-5 text-emerald-600" />
              <div className="mt-6 text-3xl font-black text-emerald-700">{summary?.completed || 0}</div>
              <div className="mt-1 text-xs text-slate-500">Completed</div>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Enrolled" value={summary?.totalCourses || 0} delta="Live across your active courses" icon={BookOpenCheck} />
        <DashboardCard title="Completed" value={summary?.completed || 0} delta="Milestones achieved so far" icon={GraduationCap} tone="success" />
        <DashboardCard title="Avg. progress" value={`${summary?.avgProgress || 0}%`} delta="Momentum across enrolled courses" icon={Activity} tone="warning" />
        <DashboardCard title="Hours learned" value={`${Math.round((summary?.totalTimeMinutes || 0) / 60)}h`} delta="Tracked study time" icon={Timer} tone="danger" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-panel p-6">
          <div className="section-header">
            <div>
              <div className="section-title">Weekly activity</div>
              <div className="section-sub">Minutes studied per day</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="minutes" stroke="#2563eb" fill="url(#activityFill)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="surface-panel p-6">
          <div className="section-header">
            <div>
              <div className="section-title">Leaderboard</div>
              <div className="section-sub">Top learners this week</div>
            </div>
          </div>
          {leaderboard.length === 0 ? (
            <EmptyState title="No leaderboard data" description="Complete more courses to appear on the board." />
          ) : (
            <div className="space-y-1">
              {leaderboard.map((item, index) => (
                <div className="leaderboard-row" key={item._id}>
                  <div className={`rank ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>#{index + 1}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-slate-900">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.level}</div>
                  </div>
                  <div className="text-sm font-bold text-brand-600">{item.totalPoints}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <div className="surface-panel p-6">
          <div className="section-header">
            <div>
              <div className="section-title">Progress snapshot</div>
              <div className="section-sub">Most recent enrolled courses</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={progressChartData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} width={110} />
              <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }} />
              <Bar dataKey="progress" fill="#06b6d4" radius={[0, 999, 999, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="surface-panel p-6">
          <div className="section-header">
            <div>
              <div className="section-title">Completion curve</div>
              <div className="section-sub">Success indicators across status stages</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={successData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }} />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {successData.map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
                <div className="mt-2 text-2xl font-black text-slate-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {enrollments.length > 0 && (
        <section>
          <div className="section-header">
            <div>
              <div className="section-title">Continue learning</div>
              <div className="section-sub">Pick up where you left off</div>
            </div>
            <Button variant="outline" onClick={() => navigate('/my-learning')}>View all</Button>
          </div>
          <div className="grid-courses">
            {enrollments.map((item) => item.course && <CourseCard key={item._id} course={item.course} progress={item.progressPercent} showProgress />)}
          </div>
        </section>
      )}

      {recommendations.length > 0 && (
        <section>
          <div className="section-header">
            <div>
              <div className="section-title">Recommended for you</div>
              <div className="section-sub">Based on your interests and learning history</div>
            </div>
            <Button variant="outline" onClick={() => navigate('/recommendations')}>View all</Button>
          </div>
          <div className="grid-courses">
            {recommendations.map((course) => <CourseCard key={course._id} course={course} />)}
          </div>
        </section>
      )}
    </div>
  );
}
