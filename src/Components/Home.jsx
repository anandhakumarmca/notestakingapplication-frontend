import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../config/global";
import Note from "./Note";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          // Handle the case where the user is not authenticated
          toast.error("User is not authenticated. ");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/note/getAllNotes`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

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
          {notes.length > 0 ? (
            notes.map((note) => <Note key={note._id} note={note} />)
          ) : (
            <div className="no-notes">
              <h2>No notes available. </h2>
              <img src="/nonotes.png" alt="No Notes" />
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
