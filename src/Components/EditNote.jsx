// EditNotePage.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const EditNotePage = () => {
  const { noteId } = useParams();
  const history = useHistory();
  const [note, setNote] = useState({ title: '', content: '' });

  useEffect(() => {
    // Fetch data for the specific note using the API
    fetch(`${API_URL}/note/${noteId}`)
      .then(response => response.json())
      .then(data => setNote(data))
      .catch(error => console.error('Error fetching note:', error));
  }, [noteId]);

  const handleEditNote = () => {
    // Make API request to update the note
    fetch(`your-api-url/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then(response => response.json())
      .then(updatedNote => {
        console.log('Note updated successfully:', updatedNote);
        history.push('/'); // Redirect to the home page or wherever you want
      })
      .catch(error => console.error('Error updating note:', error));
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Edit Note</h1>
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
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditNotePage;
