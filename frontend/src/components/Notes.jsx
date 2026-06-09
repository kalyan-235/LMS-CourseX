import { useEffect, useState } from "react";

export default function Notes({ courseId }) {
  const [note, setNote] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [isEditing, setIsEditing] = useState(true);

useEffect(() => {

  const savedData =
    localStorage.getItem(`notes-${courseId}`);

  if (!savedData) return;

  try {

    const parsed =
      JSON.parse(savedData);

    setNote(parsed.note || "");
    setLastUpdated(
      parsed.lastUpdated || ""
    );

    setIsEditing(false);

  } catch (error) {

    // Old notes format support

    setNote(savedData);
    setIsEditing(false);

  }

}, [courseId]);

  const saveNote = () => {
    const now = new Date();

    const formattedDate = now.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const noteData = {
      note,
      lastUpdated: formattedDate,
    };

    localStorage.setItem(
      `notes-${courseId}`,
      JSON.stringify(noteData)
    );

    setLastUpdated(formattedDate);
    setIsEditing(false);

    alert("Notes Saved Successfully");
  };

  const editNote = () => {
    setIsEditing(true);
  };

  const deleteNote = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete notes?"
    );

    if (!confirmDelete) return;

    localStorage.removeItem(`notes-${courseId}`);

    setNote("");
    setLastUpdated("");
    setIsEditing(true);
  };

  return (
    <div className="notes-container">

      <div className="notes-header">
        <div>
          <h2>📒 Course Notes</h2>

          {lastUpdated && (
            <p className="updated-time">
              Last Updated: {lastUpdated}
            </p>
          )}
        </div>

        <div className="notes-stats">
          {note.length} Characters
        </div>
      </div>

      <textarea
        placeholder="Write your important notes here..."
        value={note}
        disabled={!isEditing}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="notes-actions">

        {isEditing ? (
          <button
            className="save-btn"
            onClick={saveNote}
          >
            Save Notes
          </button>
        ) : (
          <button
            className="edit-btn"
            onClick={editNote}
          >
            Edit Notes
          </button>
        )}

        <button
          className="delete-btn"
          onClick={deleteNote}
        >
          Delete
        </button>

      </div>

    </div>
  );
}