import { useState, useEffect } from "react";
import {
  Plus, X, Save, Trash2, ClipboardList,
  ChevronRight, CheckCircle, Circle, BookOpen,
} from "lucide-react";
import API from "../../api/axios";
import AdminLayout from "../layouts/AdminLayout";
import Loading from "../../components/Loading";

const EMPTY_Q = { question: "", options: ["", "", "", ""], answer: "" };

export default function AdminQuiz() {
  const [courses,  setCourses]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [questions, setQuestions] = useState([EMPTY_Q]);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data || []);
    } catch { window.addToast?.("Failed to load courses", "error"); }
    finally { setLoading(false); }
  };

  const openModal = (course) => {
    setSelectedCourse(course);
    setQuestions(course.quiz?.length ? [...course.quiz] : [{ ...EMPTY_Q, options: ["","","",""] }]);
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setSelectedCourse(null); };

  // Question helpers
  const setQ = (idx, field, val) =>
    setQuestions(qs => qs.map((q, i) => i === idx ? { ...q, [field]: val } : q));

  const setOpt = (qIdx, oIdx, val) =>
    setQuestions(qs => qs.map((q, i) => {
      if (i !== qIdx) return q;
      const opts = [...q.options]; opts[oIdx] = val;
      return { ...q, options: opts };
    }));

  const addQ   = () => setQuestions(qs => [...qs, { question:"", options:["","","",""], answer:"" }]);
  const removeQ = (idx) => setQuestions(qs => qs.filter((_, i) => i !== idx));

  const saveQuiz = async () => {
    if (!selectedCourse) { window.addToast?.("Select a course first", "warning"); return; }
    if (questions.some(q => !q.question.trim())) { window.addToast?.("All questions must have text", "warning"); return; }
    setSaving(true);
    try {
      await API.put(`/courses/${selectedCourse._id}/quiz`, { quiz: questions });
      window.addToast?.("Quiz saved successfully!", "success");
      fetchCourses();
      closeModal();
    } catch { window.addToast?.("Failed to save quiz", "error"); }
    finally { setSaving(false); }
  };

  const filtered = courses.filter(c =>
    c.title?.toLowerCase().includes(search.toLowerCase())
  );

  const totalQuestions = courses.reduce((s, c) => s + (c.quiz?.length || 0), 0);
  const coursesWithQuiz = courses.filter(c => c.quiz?.length > 0).length;

  if (loading) return <AdminLayout><div style={{padding:"60px",textAlign:"center"}}><Loading fullPage={false}/></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="aqz-page">

        {/* ── TOPBAR ──────────────────────────────────── */}
        <div className="aqz-topbar">
          <div>
            <h1 className="aqz-title">Quiz Management</h1>
            <p className="aqz-sub">Create and manage quizzes for your courses</p>
          </div>
        </div>

        {/* ── STATS ───────────────────────────────────── */}
        <div className="aqz-stats">
          {[
            { label:"Total Courses",      value: courses.length,   color:"indigo", icon:"📚" },
            { label:"Courses with Quiz",  value: coursesWithQuiz,  color:"emerald",icon:"✅" },
            { label:"Total Questions",    value: totalQuestions,   color:"violet", icon:"❓" },
            { label:"Pending Setup",      value: courses.length - coursesWithQuiz, color:"amber", icon:"⏳" },
          ].map((s, i) => (
            <div key={i} className={`aqz-stat aqz-stat-${s.color}`}>
              <span className="aqz-stat-emoji">{s.icon}</span>
              <div>
                <div className="aqz-stat-val">{s.value}</div>
                <div className="aqz-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── SEARCH ──────────────────────────────────── */}
        <div className="aqz-search-row">
          <input
            className="aqz-search"
            placeholder="Search courses…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="aqz-count">{filtered.length} courses</span>
        </div>

        {/* ── COURSE CARDS ────────────────────────────── */}
        <div className="aqz-grid">
          {filtered.map(course => {
            const qCount = course.quiz?.length || 0;
            const hasQuiz = qCount > 0;
            return (
              <div key={course._id} className={`aqz-card ${hasQuiz ? "aqz-card--has-quiz" : ""}`}>
                <div className="aqz-card-thumb">
                  <img
                    src={course.image}
                    alt={course.title}
                    onError={e => { e.target.src = "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&h=200&fit=crop"; }}
                  />
                  <span className={`aqz-quiz-badge ${hasQuiz ? "aqz-quiz-badge--yes" : "aqz-quiz-badge--no"}`}>
                    {hasQuiz ? `${qCount} Q` : "No Quiz"}
                  </span>
                </div>
                <div className="aqz-card-body">
                  <span className="aqz-cat-chip">{course.category}</span>
                  <h3 className="aqz-card-title">{course.title}</h3>
                  <p className="aqz-card-author">by {course.author}</p>

                  <div className="aqz-card-meta">
                    {hasQuiz ? (
                      <span className="aqz-meta-item aqz-meta-green">
                        <CheckCircle size={13}/> {qCount} questions
                      </span>
                    ) : (
                      <span className="aqz-meta-item aqz-meta-amber">
                        <Circle size={13}/> No quiz yet
                      </span>
                    )}
                  </div>
                </div>
                <button className="aqz-manage-btn" onClick={() => openModal(course)}>
                  {hasQuiz ? "Edit Quiz" : "Create Quiz"}
                  <ChevronRight size={15}/>
                </button>
              </div>
            );
          })}
        </div>

        {/* ── QUIZ MODAL ──────────────────────────────── */}
        {showModal && (
          <div className="aqz-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
            <div className="aqz-modal">

              {/* Modal header */}
              <div className="aqz-modal-head">
                <div>
                  <h2>
                    {selectedCourse
                      ? `Quiz — ${selectedCourse.title}`
                      : "New Quiz"}
                  </h2>
                  <p>{questions.length} question{questions.length !== 1 ? "s" : ""}</p>
                </div>
                <button className="aqz-modal-close" onClick={closeModal}><X size={18}/></button>
              </div>

              {/* Course select if needed */}
              {!selectedCourse && (
                <div className="aqz-modal-body">
                  <div className="aqz-field">
                    <label>Select Course</label>
                    <select onChange={e => {
                      const c = courses.find(x => x._id === e.target.value);
                      if (c) {
                        setSelectedCourse(c);
                        setQuestions(c.quiz?.length ? [...c.quiz] : [{ ...EMPTY_Q, options:["","","",""] }]);
                      }
                    }}>
                      <option value="">Choose a course…</option>
                      {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Questions */}
              <div className="aqz-questions-list">
                {questions.map((q, qi) => (
                  <div key={qi} className="aqz-question-card">
                    <div className="aqz-q-header">
                      <span className="aqz-q-num">Q{qi + 1}</span>
                      {questions.length > 1 && (
                        <button className="aqz-q-remove" onClick={() => removeQ(qi)}>
                          <Trash2 size={14}/>
                        </button>
                      )}
                    </div>

                    <div className="aqz-field">
                      <label>Question</label>
                      <input
                        placeholder="Type your question here…"
                        value={q.question}
                        onChange={e => setQ(qi, "question", e.target.value)}
                      />
                    </div>

                    <div className="aqz-options-grid">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className="aqz-field">
                          <label>Option {oi + 1}</label>
                          <input
                            placeholder={`Option ${oi + 1}`}
                            value={opt}
                            onChange={e => setOpt(qi, oi, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="aqz-field">
                      <label className="aqz-answer-label">✓ Correct Answer</label>
                      <select
                        value={q.answer}
                        onChange={e => setQ(qi, "answer", e.target.value)}
                        className="aqz-answer-select"
                      >
                        <option value="">Select correct answer…</option>
                        {q.options.filter(Boolean).map((opt, oi) => (
                          <option key={oi} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add question */}
              <div className="aqz-modal-add-row">
                <button className="aqz-add-q-btn" onClick={addQ}>
                  <Plus size={15}/> Add Question
                </button>
              </div>

              {/* Footer */}
              <div className="aqz-modal-footer">
                <button className="aqz-cancel-btn" onClick={closeModal}><X size={14}/> Cancel</button>
                <button className="aqz-save-btn" onClick={saveQuiz} disabled={saving}>
                  {saving
                    ? <><span className="aqz-spinner"/>Saving…</>
                    : <><Save size={14}/> Save Quiz</>}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
