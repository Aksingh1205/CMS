import React, { useState } from 'react';
import { Form, Button, Card, Table } from 'react-bootstrap';
import { getEntries, deleteEntry, updateEntry } from '../services/entityService';

const ViewEntries = () => {
  const [entityName, setEntityName] = useState('');
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedEntry, setUpdatedEntry] = useState({});

  const fetchEntries = async () => {
    const fetchedEntries = await getEntries(entityName);
    setEntries(fetchedEntries);
  };

  const handleDelete = async (index) => {
    await deleteEntry(entityName, index);
    fetchEntries();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setUpdatedEntry(entries[index]);
  };

  const handleSave = async () => {
    await updateEntry(entityName, editingIndex, updatedEntry);
    setEditingIndex(null);
    fetchEntries();
  };

  const handleEditChange = (event) => {
    setUpdatedEntry({ ...updatedEntry, [event.target.name]: event.target.value });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>View Entries</Card.Title>
        <Form>
          <Form.Group controlId="entityName">
            <Form.Label>Entity Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter entity name"
              value={entityName}
              onChange={(e) => setEntityName(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" className='mt-2' onClick={fetchEntries}>Fetch Entries</Button>
        </Form>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              {entries.length > 0 && Object.keys(entries[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                {editingIndex === index ? (
                  Object.keys(entry).map((key) => (
                    <td key={key}>
                      <Form.Control
                        type="text"
                        name={key}
                        value={updatedEntry[key]}
                        onChange={handleEditChange}
                      />
                    </td>
                  ))
                ) : (
                  Object.values(entry).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))
                )}
                <td>
                  {editingIndex === index ? (
                    <Button variant="success" onClick={handleSave}>Save</Button>
                  ) : (
                    <>
                      <Button variant="warning" onClick={() => handleEdit(index)}>Edit</Button>
                      <Button variant="danger" className='ms-2' onClick={() => handleDelete(index)}>Delete</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ViewEntries;
