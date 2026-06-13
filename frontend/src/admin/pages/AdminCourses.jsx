import { useState, useEffect } from "react";
import {
  Plus, Search, Pencil, Trash2, X, BookOpen,
  Upload, Link2, ChevronDown, ChevronUp, Save,
  ImagePlus, FileText, CheckCircle2,
} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import API from "../../api/axios";

const CATEGORIES = [
  "Web Development","Frontend","Backend","Data Science",
  "Programming","Design","DevOps","Cloud",
  "Mobile","Cybersecurity","Database","Full Stack","AI/ML",
];

const EMPTY_FORM = {
  title:"", author:"", role:"", email:"", bio:"",
  category:"", price:"", oldPrice:"", video:"", description:"",
  image:"", learnPoints:[""], prerequisites:[""],
  pdfs:[{ title:"", file:"" }],
};

export default function AdminCourses() {
  const [courses, setCourses]         = useState([]);
  const [search,  setSearch]          = useState("");
  const [showForm, setShowForm]       = useState(false);
  const [editingId, setEditingId]     = useState(null);
  const [saving,  setSaving]          = useState(false);
  const [deleting, setDeleting]       = useState(null);
  const [form,    setForm]            = useState(EMPTY_FORM);
  const [expandedSection, setExpandedSection] = useState("basic");

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch { window.addToast?.("Failed to load courses", "error"); }
  };

  // ── Form helpers ────────────────────────────────────────
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const setListItem = (key, idx, val) =>
    setForm(f => {
      const arr = [...f[key]];
      arr[idx] = val;
      return { ...f, [key]: arr };
    });

  const addListItem  = (key, empty) => setForm(f => ({ ...f, [key]: [...f[key], empty] }));
  const removeListItem = (key, idx) => setForm(f => ({ ...f, [key]: f[key].filter((_,i) => i !== idx) }));

  const setPdfField = (idx, field, val) =>
    setForm(f => {
      const pdfs = [...f.pdfs];
      pdfs[idx] = { ...pdfs[idx], [field]: val };
      return { ...f, pdfs };
    });

  const resetForm = () => { setForm(EMPTY_FORM); setEditingId(null); setShowForm(false); setExpandedSection("basic"); };

  // ── Image upload ────────────────────────────────────────
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await API.post("/upload/image", fd);
      set("image", res.data.imageUrl);
    } catch { window.addToast?.("Image upload failed", "error"); }
  };

  const handlePdfUpload = async (idx, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("pdf", file);
    try {
      const res = await API.post("/upload/pdf", fd);
      setPdfField(idx, "file", res.data.pdfUrl);
    } catch { window.addToast?.("PDF upload failed", "error"); }
  };

  // ── Save (Add/Update) ───────────────────────────────────
  const handleSave = async () => {
    if (!form.title || !form.category || !form.price) {
      window.addToast?.("Title, category and price are required", "warning");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title, author: form.author, category: form.category,
      price: form.price, oldPrice: form.oldPrice, video: form.video,
      description: form.description, image: form.image,
      learn: form.learnPoints.filter(Boolean),
      prerequisites: form.prerequisites.filter(Boolean),
      pdfs: form.pdfs.filter(p => p.title),
      instructor: { name: form.author, role: form.role, email: form.email, bio: form.bio },
    };
    try {
      if (editingId) {
        await API.put(`/courses/${editingId}`, payload);
        window.addToast?.("Course updated successfully!", "success");
      } else {
        await API.post("/courses", payload);
        window.addToast?.("Course added successfully!", "success");
      }
      fetchCourses();
      resetForm();
    } catch { window.addToast?.("Failed to save course", "error"); }
    finally { setSaving(false); }
  };

  // ── Delete ──────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await API.delete(`/courses/${id}`);
      window.addToast?.("Course deleted", "success");
      fetchCourses();
    } catch { window.addToast?.("Failed to delete course", "error"); }
    finally { setDeleting(null); }
  };

  // ── Edit ────────────────────────────────────────────────
  const handleEdit = (c) => {
    setForm({
      title: c.title || "", author: c.author || "",
      role: c.instructor?.role || "", email: c.instructor?.email || "",
      bio: c.instructor?.bio || "", category: c.category || "",
      price: c.price || "", oldPrice: c.oldPrice || "",
      video: c.video || "", description: c.description || "",
      image: c.image || "",
      learnPoints: c.learn?.length ? c.learn : [""],
      prerequisites: c.prerequisites?.length ? c.prerequisites : [""],
      pdfs: c.pdfs?.length ? c.pdfs : [{ title:"", file:"" }],
    });
    setEditingId(c._id);
    setShowForm(true);
    setExpandedSection("basic");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = courses.filter(c =>
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.author?.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase())
  );

  const Section = ({ id, label, icon, children }) => (
    <div className="acp-form-section">
      <button
        type="button"
        className={`acp-section-toggle ${expandedSection === id ? "acp-section-toggle--open" : ""}`}
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
      >
        <span className="acp-section-toggle-left">{icon}<span>{label}</span></span>
        {expandedSection === id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
      </button>
      {expandedSection === id && <div className="acp-section-body">{children}</div>}
    </div>
  );

  return (
    <AdminLayout>
      <div className="acp-page">

        {/* ── TOPBAR ────────────────────────────────────── */}
        <div className="acp-topbar">
          <div>
            <h1 className="acp-page-title">Course Management</h1>
            <p className="acp-page-sub">{courses.length} course{courses.length !== 1 ? "s" : ""} total</p>
          </div>
          <div className="acp-topbar-right">
            <div className="acp-search-wrap">
              <Search size={15} className="acp-search-icon"/>
              <input
                className="acp-search-input"
                placeholder="Search courses…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="acp-add-btn" onClick={() => { resetForm(); setShowForm(true); }}>
              <Plus size={17}/> Add Course
            </button>
          </div>
        </div>

        {/* ── FORM PANEL ────────────────────────────────── */}
        {showForm && (
          <div className="acp-form-panel">
            <div className="acp-form-panel-header">
              <div>
                <h2>{editingId ? "Edit Course" : "Add New Course"}</h2>
                <p>{editingId ? "Update the course details below" : "Fill in the details to create a new course"}</p>
              </div>
              <button className="acp-close-btn" onClick={resetForm}><X size={18}/></button>
            </div>

            {/* BASIC INFO */}
            <Section id="basic" label="Basic Information" icon={<BookOpen size={16}/>}>
              <div className="acp-grid-2">
                <div className="acp-field">
                  <label>Course Title *</label>
                  <input placeholder="e.g. Full Stack Web Development" value={form.title} onChange={e => set("title", e.target.value)}/>
                </div>
                <div className="acp-field">
                  <label>Category *</label>
                  <select value={form.category} onChange={e => set("category", e.target.value)}>
                    <option value="">Select category…</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="acp-field">
                <label>Description</label>
                <textarea rows={4} placeholder="Describe what students will learn…" value={form.description} onChange={e => set("description", e.target.value)}/>
              </div>
              <div className="acp-grid-2">
                <div className="acp-field">
                  <label>Price (₹) *</label>
                  <input placeholder="e.g. 999" value={form.price} onChange={e => set("price", e.target.value)}/>
                </div>
                <div className="acp-field">
                  <label>Old Price (₹)</label>
                  <input placeholder="e.g. 2999" value={form.oldPrice} onChange={e => set("oldPrice", e.target.value)}/>
                </div>
              </div>
              <div className="acp-field">
                <label>Video URL (YouTube Embed)</label>
                <div className="acp-input-icon-wrap">
                  <Link2 size={15} className="acp-input-icon"/>
                  <input placeholder="https://www.youtube.com/embed/…" value={form.video} onChange={e => set("video", e.target.value)} style={{paddingLeft:"38px"}}/>
                </div>
              </div>
            </Section>

            {/* THUMBNAIL */}
            <Section id="thumbnail" label="Course Thumbnail" icon={<ImagePlus size={16}/>}>
              <div className="acp-thumb-area">
                {form.image ? (
                  <div className="acp-thumb-preview">
                    <img src={form.image} alt="Thumbnail"/>
                    <button className="acp-thumb-remove" onClick={() => set("image","")}>
                      <X size={14}/>
                    </button>
                  </div>
                ) : (
                  <label className="acp-thumb-upload">
                    <Upload size={24}/>
                    <span>Click to upload image</span>
                    <small>JPG, PNG, WEBP</small>
                    <input type="file" accept="image/*" onChange={handleImageUpload} hidden/>
                  </label>
                )}
              </div>
            </Section>

            {/* INSTRUCTOR */}
            <Section id="instructor" label="Instructor Details" icon={<BookOpen size={16}/>}>
              <div className="acp-grid-2">
                <div className="acp-field">
                  <label>Instructor Name</label>
                  <input placeholder="e.g. Rahul Sharma" value={form.author} onChange={e => set("author", e.target.value)}/>
                </div>
                <div className="acp-field">
                  <label>Instructor Role</label>
                  <input placeholder="e.g. Senior Dev @ Google" value={form.role} onChange={e => set("role", e.target.value)}/>
                </div>
              </div>
              <div className="acp-field">
                <label>Instructor Email</label>
                <input type="email" placeholder="instructor@email.com" value={form.email} onChange={e => set("email", e.target.value)}/>
              </div>
              <div className="acp-field">
                <label>Bio</label>
                <textarea rows={3} placeholder="Brief instructor bio…" value={form.bio} onChange={e => set("bio", e.target.value)}/>
              </div>
            </Section>

            {/* LEARN POINTS */}
            <Section id="learn" label="What You'll Learn" icon={<CheckCircle2 size={16}/>}>
              {form.learnPoints.map((pt, i) => (
                <div key={i} className="acp-list-field">
                  <input placeholder={`Learning point ${i+1}`} value={pt} onChange={e => setListItem("learnPoints", i, e.target.value)}/>
                  {form.learnPoints.length > 1 && (
                    <button className="acp-list-remove" onClick={() => removeListItem("learnPoints", i)}><X size={14}/></button>
                  )}
                </div>
              ))}
              <button className="acp-add-item-btn" onClick={() => addListItem("learnPoints","")}>
                <Plus size={14}/> Add Point
              </button>
            </Section>

            {/* PREREQUISITES */}
            <Section id="prereq" label="Prerequisites" icon={<CheckCircle2 size={16}/>}>
              {form.prerequisites.map((pt, i) => (
                <div key={i} className="acp-list-field">
                  <input placeholder={`Prerequisite ${i+1}`} value={pt} onChange={e => setListItem("prerequisites", i, e.target.value)}/>
                  {form.prerequisites.length > 1 && (
                    <button className="acp-list-remove" onClick={() => removeListItem("prerequisites", i)}><X size={14}/></button>
                  )}
                </div>
              ))}
              <button className="acp-add-item-btn" onClick={() => addListItem("prerequisites","")}>
                <Plus size={14}/> Add Prerequisite
              </button>
            </Section>

            {/* PDFS */}
            <Section id="pdfs" label="Course PDFs" icon={<FileText size={16}/>}>
              {form.pdfs.map((pdf, i) => (
                <div key={i} className="acp-pdf-row">
                  <input placeholder="PDF title" value={pdf.title} onChange={e => setPdfField(i, "title", e.target.value)}/>
                  <label className="acp-pdf-upload-btn">
                    <Upload size={13}/> {pdf.file ? "Uploaded ✓" : "Upload PDF"}
                    <input type="file" accept=".pdf" onChange={e => handlePdfUpload(i, e)} hidden/>
                  </label>
                  {form.pdfs.length > 1 && (
                    <button className="acp-list-remove" onClick={() => removeListItem("pdfs", i)}><X size={14}/></button>
                  )}
                </div>
              ))}
              <button className="acp-add-item-btn" onClick={() => addListItem("pdfs", {title:"",file:""})}>
                <Plus size={14}/> Add PDF
              </button>
            </Section>

            {/* FORM FOOTER */}
            <div className="acp-form-footer">
              <button className="acp-cancel-btn" onClick={resetForm}><X size={15}/> Cancel</button>
              <button className="acp-save-btn" onClick={handleSave} disabled={saving}>
                {saving ? <><span className="acp-spinner"/>Saving…</> : <><Save size={15}/>{editingId ? "Update Course" : "Add Course"}</>}
              </button>
            </div>
          </div>
        )}

        {/* ── COURSES GRID ──────────────────────────────── */}
        <div className="acp-courses-section">
          <div className="acp-courses-header">
            <h2>All Courses <span>({filtered.length})</span></h2>
          </div>

          {filtered.length === 0 ? (
            <div className="acp-empty">
              <BookOpen size={40}/>
              <h3>No courses found</h3>
              <p>Add your first course or try a different search term</p>
            </div>
          ) : (
            <div className="acp-course-grid">
              {filtered.map(course => (
                <div className="acp-course-card" key={course._id}>
                  <div className="acp-course-thumb">
                    <img
                      src={course.image}
                      alt={course.title}
                      onError={e => { e.target.src = "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&h=220&fit=crop"; }}
                    />
                    <span className="acp-course-cat-badge">{course.category}</span>
                  </div>
                  <div className="acp-course-body">
                    <h3 className="acp-course-title">{course.title}</h3>
                    <p className="acp-course-author">by {course.author}</p>
                    <div className="acp-course-meta">
                      <span className="acp-price">₹{course.price}</span>
                      {course.oldPrice && <span className="acp-old-price">₹{course.oldPrice}</span>}
                      <span className="acp-rating">{course.rating}</span>
                    </div>
                  </div>
                  <div className="acp-course-actions">
                    <button className="acp-edit-btn" onClick={() => handleEdit(course)}>
                      <Pencil size={14}/> Edit
                    </button>
                    <button
                      className="acp-delete-btn"
                      onClick={() => handleDelete(course._id)}
                      disabled={deleting === course._id}
                    >
                      <Trash2 size={14}/> {deleting === course._id ? "…" : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
