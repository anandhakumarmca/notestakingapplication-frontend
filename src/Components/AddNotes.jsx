import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../config/global";

const AddNotes = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "" });

  const handleAddNote = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        toast.error("User is not authenticated.");
        return;
      }

      const response = await axios.post(`${API_URL}/note/createNote`, note, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Note added successfully:", response.data.data);
      toast.success("Note added successfully.");
      const userId = localStorage.getItem("userId");
      navigate(`/getAllNotes/${userId}`);
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Error adding note. Please try again.");
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
    <div className="add-notes-container">
      <h1>Add Note</h1>
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

        <Button variant="primary" onClick={handleAddNote}>
          Add Note
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddNotes;
