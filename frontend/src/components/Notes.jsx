import { useEffect, useState } from "react";

export default function Notes({ courseId }) {

  const [note, setNote] =
    useState("");

  /* LOAD SAVED NOTE */

  useEffect(() => {

    const savedNote =
      localStorage.getItem(
        `notes-${courseId}`
      );

    if(savedNote){
      setNote(savedNote);
    }

  }, [courseId]);

  /* SAVE NOTE */

  const saveNote = () => {

    localStorage.setItem(
      `notes-${courseId}`,
      note
    );

    alert("Notes Saved");
  };

  return (

    <div className="notes-box">

      <h2 className="notes-title">
        My Notes
      </h2>

      <textarea
        placeholder="Write important notes..."
        value={note}
        onChange={(e)=>
          setNote(e.target.value)
        }
      />

      <button onClick={saveNote}>
        Save Notes
      </button>

    </div>

  );

}