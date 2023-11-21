import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../config/global";
import { useNavigate, useParams } from "react-router-dom";
import Note from "./Note";

const Home = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          toast.error("User is not authenticated.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${API_URL}/note/getAllNotes/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setNotes(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching notes:", error);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (noteId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("User is not authenticated.");
        return;
      }

      const response = await axios.delete(
        `${API_URL}/note/deleteNote/${noteId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Note deleted successfully.");
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
      } else {
        toast.error("Failed to delete note.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error deleting note. Please try again.");
    }
  };

  const handleEdit = (noteId) => {
    // Handle the edit logic or navigate to the edit page
    console.log(`Editing note with ID: ${noteId}`);
    navigate(`/editNote/${noteId}`);
    // You can add your logic to navigate to the edit page if needed
  };

  return (
    <div>
      <h1>All Notes</h1>
      {loading ? (
        <h3 align="center">Loading...</h3>
      ) : (
        <div className="note-container">
          {notes.length > 0 ? (
            notes.map((note) => (
              <Note
                key={note._id}
                note={note}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="no-notes">
              <h2>No notes available. </h2>
              <img src="/nonotes.png" alt="No Notes" width="250" height="250" />
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
