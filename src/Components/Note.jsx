import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";

const Note = ({ note, onDelete, onEdit }) => {
  const handleDelete = () => {
    onDelete(note.id);
  };

  const handleEdit = () => {
    onEdit(note.id);
  };

  return (
    <Card className="note-card">
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.content}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleEdit} className="ml-2">
            Edit
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Note;
