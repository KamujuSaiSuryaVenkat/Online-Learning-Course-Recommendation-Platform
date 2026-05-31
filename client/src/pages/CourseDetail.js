import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, ChevronRight, Clock3, GraduationCap, PlayCircle, Star } from 'lucide-react';
import { courseAPI, enrollmentAPI, progressAPI } from '../services/api';
import { Button, EmptyState, LoadingSpinner } from '../components/ui';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState('');
  const [activeLesson, setActiveLesson] = useState(0);

  useEffect(() => {
    Promise.all([courseAPI.getById(id), enrollmentAPI.checkEnrollment(id), progressAPI.get(id)])
      .then(([courseResponse, enrollmentResponse, progressResponse]) => {
        setCourse(courseResponse.data.course);
        setEnrollment(enrollmentResponse.data.enrollment);
        setProgress(progressResponse.data.progress);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const enrolled = Boolean(enrollment);
  const percentage = progress?.progressPercent || 0;
  const completedLessons = progress?.completedLessons || [];

  const highlights = useMemo(() => [
    { label: 'Rating', value: `${course?.rating?.toFixed(1) || '0.0'} / 5`, icon: Star },
    { label: 'Lessons', value: course?.totalLessons || 0, icon: BookOpen },
    { label: 'Duration', value: `${course?.duration || 0}h`, icon: Clock3 },
    { label: 'Certificate', value: course?.certificate ? 'Included' : 'Not included', icon: GraduationCap }
  ], [course]);

  const handleEnroll = async () => {
    setEnrolling(true);
    setMessage('');
    try {
      const response = await enrollmentAPI.enroll(id);
      setEnrollment(response.data.enrollment);
      setMessage(response.data.message);
      const refreshed = await progressAPI.get(id);
      setProgress(refreshed.data.progress);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  const markLesson = async (lessonIndex) => {
    try {
      const response = await progressAPI.update(id, {
        lessonIndex,
        timeSpent: course?.lessons?.[lessonIndex]?.duration || 10
      });
      setProgress(response.data.progress);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to update progress');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!course) return <EmptyState title="Course not found" description="The selected course could not be loaded." action={<Button onClick={() => navigate('/courses')}>Back to catalog</Button>} />;

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>← Back</Button>
      {message && <div className={`alert ${message.toLowerCase().includes('failed') || message.toLowerCase().includes('unable') ? 'alert-error' : 'alert-success'}`}>{message}</div>}

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="surface-panel overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-72 w-full object-cover"
            onError={(event) => { event.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200'; }}
          />
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              <span className={`badge badge-${course.category === 'Web Development' ? 'web' : course.category === 'Data Science' ? 'data' : course.category === 'Cybersecurity' ? 'cyber' : course.category === 'Cloud' ? 'cloud' : course.category === 'Mobile' ? 'mobile' : 'ai'}`}>{course.category}</span>
              <span className={`badge badge-${course.level}`}>{course.level}</span>
              {course.isFree && <span className="badge badge-free">Free</span>}
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">{course.title}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{course.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <Icon className="h-5 w-5 text-brand-600" />
                    <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
                    <div className="mt-2 text-base font-bold text-slate-900">{item.value}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">Skills you'll gain</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {course.skills?.map((skill) => <span key={skill} className="chip selected">{skill}</span>)}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <div className="surface-panel p-6 sticky top-28">
            <div className="text-3xl font-black text-slate-900">{course.isFree ? <span className="text-emerald-600">FREE</span> : `₹${course.price}`}</div>
            <p className="mt-2 text-sm text-slate-500">{enrolled ? 'You are enrolled in this course.' : 'Secure access to the full learning experience.'}</p>
            {!enrolled ? (
              <Button className="mt-5 w-full" onClick={handleEnroll} disabled={enrolling}>{enrolling ? 'Enrolling...' : course.isFree ? 'Enroll for free' : 'Enroll now'}</Button>
            ) : (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">✅ You’re enrolled and ready to continue.</div>
            )}
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              {['Certificate of completion', 'Desktop and mobile access', 'Lifetime course access', 'Community support'].map((item) => <div key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> {item}</div>)}
            </div>
          </div>

          {enrolled && (
            <div className="surface-panel p-6">
              <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                <span>Progress</span>
                <span className="text-brand-700">{percentage}%</span>
              </div>
              <div className="progress-bar mt-3 h-3"><div className="progress-fill" style={{ width: `${percentage}%` }} /></div>
              {percentage >= 100 && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-700">🎉 Course completed. Certificate earned!</div>}
            </div>
          )}
        </div>
      </div>

      {enrolled && course.lessons?.length > 0 && (
        <div className="surface-panel p-6 md:p-8">
          <div className="section-header">
            <div>
              <div className="section-title">Course curriculum</div>
              <div className="section-sub">Track each lesson and mark it complete as you progress.</div>
            </div>
          </div>
          <div className="space-y-3">
            {course.lessons.map((lesson, index) => {
              const done = completedLessons.includes(index);
              const active = activeLesson === index;
              return (
                <button key={lesson.title + index} type="button" onClick={() => setActiveLesson(index)} className={`w-full rounded-2xl border p-4 text-left transition ${active ? 'border-brand-200 bg-brand-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {done ? <CheckCircle2 className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`font-semibold ${done ? 'text-slate-500 line-through' : 'text-slate-900'}`}>{lesson.title}</div>
                      <div className="text-xs text-slate-500">{lesson.type} · {lesson.duration} min</div>
                    </div>
                    {!done ? <Button variant="outline" size="sm" onClick={(event) => { event.stopPropagation(); markLesson(index); }}>Complete</Button> : <span className="text-sm font-semibold text-emerald-600">Done</span>}
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
