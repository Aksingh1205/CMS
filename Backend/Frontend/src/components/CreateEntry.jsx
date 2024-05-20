import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { getEntity, createEntry } from '../services/entityService';

const CreateEntry = () => {
  const [entityName, setEntityName] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [entry, setEntry] = useState({});

  useEffect(() => {
    const fetchEntity = async () => {
      if (entityName) {
        const entity = await getEntity(entityName);
        setAttributes(entity.attributes);
        const initialEntry = entity.attributes.reduce((acc, attr) => {
          acc[attr.name] = '';
          return acc;
        }, {});
        setEntry(initialEntry);
      }
    };
    fetchEntity();
  }, [entityName]);

  const handleChange = (attrName, value) => {
    setEntry({ ...entry, [attrName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEntry(entityName, entry);
    setEntry(attributes.reduce((acc, attr) => {
      acc[attr.name] = '';
      return acc;
    }, {}));
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Create New Entry</Card.Title>
        <Form onSubmit={handleSubmit}>
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
          {attributes.map((attribute, index) => (
            <Form.Group controlId={`attribute-${index}`} key={index}>
              <Form.Label>{attribute.name}</Form.Label>
              <Form.Control
                type={attribute.type === 'number' ? 'number' : 'text'}
                value={entry[attribute.name]}
                onChange={(e) => handleChange(attribute.name, e.target.value)}
                required
              />
            </Form.Group>
          ))}
          <Button variant="success" className='mt-3' type="submit">Create Entry</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateEntry;
