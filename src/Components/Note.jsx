import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const Note = ({ note }) => {
  return (
    <Card className="note-card">
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.content}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{/* Additional details or actions can go here */}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Note;
