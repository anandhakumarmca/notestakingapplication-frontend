import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../config/global";

const EditNotes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoteToEdit = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          setError("User is not authenticated.");
          return;
        }

        setLoading(true);

        const response = await axios.get(`${API_URL}/note/getNote/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log("Response from getNote:", response);

        const noteData = response.data.note;

        if (!noteData) {
          setError("Note not found.");
          setLoading(false);
          return;
        }

        setNote({
          title: noteData.title || "", // Handle potential undefined values
          content: noteData.content || "", // Handle potential undefined values
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching note:", error);
        setError("Error fetching note. Please try again.");
        setLoading(false);
      }
    };

    fetchNoteToEdit();
  }, [id]);

  const handleEditNote = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("User is not authenticated.");
        return;
      }

      setLoading(true);

      const response = await axios.put(`${API_URL}/note/editNote/${id}`, note, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Note edited successfully:", response.data.data);
      toast.success("Note edited successfully.");
      const userId = localStorage.getItem("userId");
      navigate(`/getAllNotes/${userId}`);
    } catch (error) {
      console.error("Error editing note:", error);
      toast.error("Error editing note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <div className="edit-notes-container">
      <h1>Edit Note</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={note.title}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter content"
              name="content"
              value={note.content}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleEditNote}>
            Edit Note
          </Button>
        </Form>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditNotes;
