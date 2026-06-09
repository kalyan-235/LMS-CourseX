import { useState,useEffect } from "react";

import AdminLayout from "../layouts/AdminLayout";
import API from "../../api/axios";

export default function AdminCourses() {

  const [courses, setCourses] =
  useState([]);

  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  // FORM STATES

  const [title, setTitle] =
    useState("");

  const [author, setAuthor] =
    useState("");

  const [role, setRole] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [oldPrice, setOldPrice] =
    useState("");

  const [video, setVideo] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [imagePreview, setImagePreview] =
    useState("");

  const [editingCourseId, setEditingCourseId] =
    useState(null);

  // LEARN

  const [learnPoints, setLearnPoints] =
    useState([""]);

  // PREREQUISITES

  const [
    prerequisites,
    setPrerequisites,
  ] = useState([""]);

  // PDFS

  const [pdfs, setPdfs] =
    useState([
      {
        title:"",
        file:"",
      },
    ]);
    const fetchCourses =
async ()=>{

  try{

    const res =
      await API.get(
        "/courses"
      );

    setCourses(
      res.data
    );

  }catch(err){

    console.log(err);

  }

};
useEffect(()=>{

  fetchCourses();

},[]);
  // IMAGE
  const handleImageUpload =
  async (e)=>{
  
    const file =
      e.target.files[0];
  
    if(!file) return;
  
    const formData =
      new FormData();
  
    formData.append(
      "image",
      file
    );
  
    try{
    
      const res =
        await API.post(
          "/upload/image",
          formData
        );
      
      setImagePreview(
        res.data.imageUrl
      );
    
    }catch(err){
    
      console.log(err);
    
      alert(
        "Image Upload Failed"
      );
    
    }
  
  };

  const handlePdfUpload =
async(index,e)=>{

  const file =
    e.target.files[0];

  if(!file) return;

  const formData =
    new FormData();

  formData.append(
    "pdf",
    file
  );

  try{

    const res =
      await API.post(
        "/upload/pdf",
        formData
      );

    const updated =
      [...pdfs];

    updated[index].file =
      res.data.pdfUrl;

    setPdfs(updated);

  }catch(err){

    console.log(err);

  }

};

  // LEARN

  const handleLearnChange = (
    index,
    value
  ) => {

    const updated =
      [...learnPoints];

    updated[index] = value;

    setLearnPoints(updated);
  };

  const addLearnPoint = () => {

    setLearnPoints([
      ...learnPoints,
      "",
    ]);
  };

  // PREREQUISITES

  const handlePrerequisiteChange = (
    index,
    value
  ) => {

    const updated =
      [...prerequisites];

    updated[index] = value;

    setPrerequisites(updated);
  };

  const addPrerequisite = () => {

    setPrerequisites([
      ...prerequisites,
      "",
    ]);
  };

  // PDFS

  const handlePdfChange = (
    index,
    field,
    value
  ) => {

    const updated =
      [...pdfs];

    updated[index][field] =
      value;

    setPdfs(updated);
  };

  const addPdfField = () => {

    setPdfs([
      ...pdfs,
      {
        title:"",
        file:"",
      },
    ]);
  };

  // RESET FORM

  const resetForm = () => {

    setTitle("");
    setAuthor("");
    setRole("");
    setEmail("");
    setBio("");
    setCategory("");
    setPrice("");
    setOldPrice("");
    setVideo("");
    setDescription("");
    setImagePreview("");

    setLearnPoints([""]);

    setPrerequisites([""]);

    setPdfs([
      {
        title:"",
        file:"",
      },
    ]);

    setEditingCourseId(null);

    setShowForm(false);
  };

  // ADD COURSE
const addCourse =
async ()=>{

  try{

    const token =
      localStorage.getItem(
        "token"
      );

    const courseData = {

      title,
      author,
      category,
      price,
      oldprice:oldPrice,
      video,
      description,
      image:imagePreview,

      learn:learnPoints,

      prerequisites,

      pdfs,

      instructor:{
        name:author,
        role,
        email,
        bio,
      }

    };

    await API.post(
      "/courses",
      courseData,
      {
        headers:{
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    fetchCourses();

    resetForm();

    alert(
      "Course Added"
    );

  }catch(err){

    console.log(err);

    alert(
      "Failed To Add Course"
    );

  }

};

  // DELETE COURSE

const deleteCourse =
async(id)=>{

  try{

    const token =
      localStorage.getItem(
        "token"
      );

    await API.delete(

      `/courses/${id}`,

      {
        headers:{
          Authorization:
            `Bearer ${token}`,
        },
      }

    );

    fetchCourses();

  }catch(err){

    console.log(err);

  }

};

  // EDIT COURSE

  const editCourse = (course) => {

    setEditingCourseId(course._id);

    setTitle(course.title);
    setAuthor(course.author);

    setRole(
      course.instructor?.role || ""
    );

    setEmail(
      course.instructor?.email || ""
    );

    setBio(
      course.instructor?.bio || ""
    );

    setCategory(course.category);

    setPrice(course.price);

    setOldPrice(
      course.oldprice || ""
    );

    setVideo(course.video);

    setDescription(
      course.description
    );

    setImagePreview(course.image);

    setLearnPoints(
      course.learn || [""]
    );

    setPrerequisites(
      course.prerequisites || [""]
    );

    setPdfs(
      course.pdfs || [
        {
          title:"",
          file:"",
        },
      ]
    );

    setShowForm(true);

    window.scrollTo({
      top:0,
      behavior:"smooth",
    });
  };

  // UPDATE COURSE

const updateCourse =
async ()=>{

  try{

    const token =
      localStorage.getItem(
        "token"
      );

    await API.put(

      `/courses/${editingCourseId}`,

      {
        title,
        author,
        category,
        price,
        oldprice:oldPrice,
        video,
        description,
        image:imagePreview,

        learn:learnPoints,

        prerequisites,

        pdfs,

        instructor:{
          name:author,
          role,
          email,
          bio,
        }

      },

      {
        headers:{
          Authorization:
            `Bearer ${token}`,
        },
      }

    );

    fetchCourses();

    resetForm();

    alert(
      "Course Updated"
    );

  }catch(err){

    console.log(err);

  }

};

  // SEARCH

  const filteredCourses =
    courses.filter((course) =>

      course.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <AdminLayout>

      <div className="admin-course-page">

        {/* TOP */}

        <div className="course-top">

          <h2>
            Course Management
          </h2>

          <div className="course-top-actions">

            <input
              type="text"
              placeholder="Search course..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="search-course"
            />

            <button
              className="add-course-btn"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              + Add Course
            </button>

          </div>

        </div>

        {/* FORM */}

        {showForm && (

        <div className="add-course-box">
          <div className="form-section">

            <h3>Course Thumbnail</h3>

            <div className="thumbnail-card">

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                />
              )}

            </div>
            
          </div>

          
          <input
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={(e) =>
              setAuthor(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Instructor Role"
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
          />

          <input
            type="email"
            placeholder="Instructor Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <textarea
            placeholder="Instructor Bio"
            value={bio}
            onChange={(e) =>
              setBio(
                e.target.value
              )
            }
          ></textarea>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >

            <option value="">
              Select Category
            </option>

            <option>
              Frontend
            </option>

            <option>
              Backend
            </option>

            <option>
              Full Stack
            </option>

            <option>
              Database
            </option>

            <option>
              AI/ML
            </option>

          </select>

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Old Price"
            value={oldPrice}
            onChange={(e) =>
              setOldPrice(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Video URL"
            value={video}
            onChange={(e) =>
              setVideo(
                e.target.value
              )
            }
          />

          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          ></textarea>

          {/* LEARN */}

          <div>

            <h3>
              Learn Points
            </h3>

            {learnPoints.map(
              (point,index) => (

                <input
                  key={index}
                  type="text"
                  placeholder={`Learn Point ${index + 1}`}
                  value={point}
                  onChange={(e) =>
                    handleLearnChange(
                      index,
                      e.target.value
                    )
                  }
                />

              )
            )}

            <button
              className="add-course-btn"
              onClick={
                addLearnPoint
              }
            >
              Add Learn Point
            </button>

          </div>

          {/* PREREQUISITES */}

          <div>

            <h3>
              Prerequisites
            </h3>

            {prerequisites.map(
              (item,index) => (

                <input
                  key={index}
                  type="text"
                  placeholder={`Prerequisite ${index + 1}`}
                  value={item}
                  onChange={(e) =>
                    handlePrerequisiteChange(
                      index,
                      e.target.value
                    )
                  }
                />

              )
            )}

            <button
              className="add-course-btn"
              onClick={
                addPrerequisite
              }
            >
              Add Prerequisite
            </button>

          </div>

          {/* PDFS */}

          <div>

            <h3>
              PDFs
            </h3>

            {pdfs.map(
              (pdf,index) => (
              
                <div key={index}>
                
                  <input
                    type="text"
                    placeholder="PDF Title"
                    value={pdf.title}
                    onChange={(e) =>
                      handlePdfChange(
                        index,
                        "title",
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      handlePdfUpload(
                        index,
                        e
                      )
                    }
                  />

                  {pdf.file && (
                  
                    <p>
                    
                      ✅ PDF Uploaded
                  
                    </p>

                  )}

                </div>

              )
            )}

            <button
              className="add-course-btn"
              onClick={
                addPdfField
              }
            >
              Add PDF
            </button>

          </div>

          {/* BUTTON */}

          <div className="form-buttons">

            {
              editingCourseId ? (

                <>

                  <button
                    className="add-course-btn"
                    onClick={updateCourse}
                  >
                    Update Course
                  </button>

                  <button
                    className="cancel-course-btn"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>

                </>

              ) : (

                <>

                  <button
                    className="add-course-btn"
                    onClick={addCourse}
                  >
                    Add Course
                  </button>

                  <button
                    className="cancel-course-btn"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>

                </>

              )
            }

          </div>

        </div>

        )}

        {/* IMAGE PREVIEW */}

        {imagePreview && (

          <div className="preview-box">

            <h4>
              Thumbnail Preview
            </h4>

            <img
              src={imagePreview}
              alt="Preview"
              className="preview-image"
            />

          </div>

        )}

        {/* COURSE LIST */}

        <div className="admin-course-list">

          <h2>
            All Courses
          </h2>

          <div className="course-grid">

            {filteredCourses.map(
              (course) => (

                <div
                  className="course-card-admin"
                  key={course.id}
                >

                  <img
                    src={course.image}
                    alt={course.title}
                    className="course-admin-image"
                  />

                  <div className="course-admin-content">

                    <h3>
                      {course.title}
                    </h3>

                    <p>
                      {course.author}
                    </p>

                    <span>
                      {course.category}
                    </span>

                    <div className="course-admin-price">

                      <strong>
                        {course.price}
                      </strong>

                    </div>

                    <div className="course-admin-actions">

                      <button
                        className="edit-course-btn"
                        onClick={() =>
                          editCourse(course)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-course-btn"
                        onClick={() =>
                          deleteCourse(course.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </AdminLayout>

  );
}