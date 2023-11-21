import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../config/global";

const DeleteNotes = () => {
  const navigate = useNavigate();

  const handleDeleteNote = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("User is not authenticated.");
        return;
      }

      // Example delete note logic
      const response = await axios.delete(`${API_URL}/note/deleteNote/:id`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Note deleted successfully:", response.data.data);
      toast.success("Note deleted successfully.");
      navigate("/home"); // Use navigate to redirect
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error deleting note. Please try again.");
    }
  };

  return (
    <div className="delete-notes-container">
      <h1>Delete Note</h1>
      <p>Are you sure you want to delete this note?</p>
      <Button variant="danger" onClick={handleDeleteNote}>
        Delete Note
      </Button>
      <ToastContainer />
    </div>
  );
};

export default DeleteNotes;
