import React from 'react';
import { useNavigate } from 'react-router-dom';

const categoryClass = { 'AI': 'ai', 'Web Development': 'web', 'Data Science': 'data', 'Cybersecurity': 'cyber', 'Cloud': 'cloud', 'Mobile': 'mobile' };

export default function CourseCard({ course, progress, showProgress }) {
  const navigate = useNavigate();
  const cat = categoryClass[course.category] || 'web';

  return (
    <div className="course-card" onClick={() => navigate(`/courses/${course._id}`)}>
      <img
        className="thumbnail"
        src={course.thumbnail || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400`}
        alt={course.title}
        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'; }}
      />
      <div className="card-body">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span className={`badge badge-${cat}`}>{course.category}</span>
          <span className={`badge badge-${course.level}`}>{course.level}</span>
          {course.isFree && <span className="badge badge-free">Free</span>}
        </div>
        <div className="course-title">{course.title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>by {course.instructor}</div>
        {showProgress && typeof progress !== 'undefined' && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
              <span>Progress</span><span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>{progress}%</span>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          </div>
        )}
        {course.recommendReason && (
          <div style={{ fontSize: 11, color: 'var(--accent-light)', background: 'var(--accent-glow)', padding: '4px 8px', borderRadius: 6, marginBottom: 8 }}>
            ✨ {course.recommendReason}
          </div>
        )}
        <div className="course-meta">
          <span className="rating">★ {course.rating?.toFixed(1)}</span>
          <span>({(course.reviewCount || 0).toLocaleString()})</span>
          <span>•</span>
          <span>{course.duration}h</span>
          <span>•</span>
          <span>{(course.enrolledCount || 0).toLocaleString()} enrolled</span>
        </div>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, color: course.isFree ? 'var(--success)' : 'var(--text-primary)' }}>
            {course.isFree ? 'FREE' : `₹${course.price}`}
          </span>
          {course.certificate && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>🎓 Certificate</span>}
        </div>
      </div>
    </div>
  );
}
