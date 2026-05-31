import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Filter, SortAsc } from 'lucide-react';
import { courseAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import { SearchBar, Select, ViewToggle, Pagination, EmptyState, LoadingSpinner, Button } from '../components/ui';

const CATEGORIES = ['all', 'AI', 'Web Development', 'Data Science', 'Cybersecurity', 'Cloud', 'Mobile'];
const LEVELS = ['all', 'beginner', 'intermediate', 'advanced'];
const SORTS = [{ value: 'popular', label: 'Most Popular' }, { value: 'rating', label: 'Top Rated' }, { value: 'newest', label: 'Newest' }, { value: 'price', label: 'Price: Low' }];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [view, setView] = useState('grid');

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await courseAPI.getAll({ search, category, level, sort, page, limit: 12 });
      setCourses(res.data.courses);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search, category, level, sort, page]);

  useEffect(() => { setPage(1); }, [search, category, level, sort]);
  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const listItems = courses.map((course) => (
    <motion.div whileHover={{ y: -3 }} key={course._id} className="surface-panel overflow-hidden">
      <div className="grid gap-0 md:grid-cols-[220px_1fr]">
        <img src={course.thumbnail} alt={course.title} className="h-48 w-full object-cover md:h-full" onError={(event) => { event.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'; }} />
        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            <span className={`badge badge-${course.category === 'Web Development' ? 'web' : course.category === 'Data Science' ? 'data' : course.category === 'Cybersecurity' ? 'cyber' : course.category === 'Cloud' ? 'cloud' : course.category === 'Mobile' ? 'mobile' : 'ai'}`}>{course.category}</span>
            <span className={`badge badge-${course.level}`}>{course.level}</span>
            {course.isFree && <span className="badge badge-free">Free</span>}
          </div>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">{course.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{course.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>★ {course.rating?.toFixed(1)}</span>
            <span>{course.reviewCount?.toLocaleString()} reviews</span>
            <span>{course.duration}h</span>
            <span>{course.enrolledCount?.toLocaleString()} enrolled</span>
          </div>
        </div>
      </div>
    </motion.div>
  ));

  return (
    <div className="space-y-6">
      <section className="surface-panel p-6 md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              <Filter className="h-3.5 w-3.5" /> Explore the catalog
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">Explore Courses</h2>
            <p className="mt-2 text-sm text-slate-500">{total} courses available in the catalog.</p>
          </div>
          <ViewToggle value={view} onChange={setView} />
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <SearchBar placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((item) => <option key={item} value={item}>{item === 'all' ? 'All categories' : item}</option>)}
          </Select>
          <Select value={level} onChange={(e) => setLevel(e.target.value)}>
            {LEVELS.map((item) => <option key={item} value={item}>{item === 'all' ? 'All levels' : item.charAt(0).toUpperCase() + item.slice(1)}</option>)}
          </Select>
          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </Select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-500">Popular filters</span>
          {CATEGORIES.map((item) => (
            <button key={item} type="button" className={`chip ${category === item ? 'selected' : ''}`} onClick={() => setCategory(item)}>
              {item === 'all' ? 'All' : item}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <LoadingSpinner />
      ) : courses.length === 0 ? (
        <EmptyState title="No courses found" description="Try adjusting your search, category, or sort filters." action={<Button onClick={() => { setSearch(''); setCategory('all'); setLevel('all'); setSort('popular'); }}>Reset filters</Button>} />
      ) : (
        <>
          {view === 'grid' ? (
            <div className="grid-courses">
              {courses.map((course) => <CourseCard key={course._id} course={course} />)}
            </div>
          ) : (
            <div className="space-y-4">{listItems}</div>
          )}
          {pages > 1 && <Pagination page={page} pages={pages} onPrev={() => setPage((current) => current - 1)} onNext={() => setPage((current) => current + 1)} />}
        </>
      )}
    </div>
  );
}
