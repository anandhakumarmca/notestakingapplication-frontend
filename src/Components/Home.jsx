import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../config/global";
import Note from "./Note";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${API_URL}/note/getAllNotes`);

        console.log("Data", response.data.data);
        setNotes(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching notes:", error);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>All Notes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="note-container">
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
