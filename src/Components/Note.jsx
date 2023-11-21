import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Note = ({ note, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(note._id); // Assuming note._id is the unique identifier for notes
  };

  const handleEdit = () => {
    onEdit(note._id);
  };

  return (
    <Card className="note-card">
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.content}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Button variant="primary" onClick={handleEdit} className="ml-2">
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete} className="ml-2">
            Delete
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Note;
