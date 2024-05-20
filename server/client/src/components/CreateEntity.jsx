import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { createEntity } from '../services/entityService';

const CreateEntity = () => {
  const [entityName, setEntityName] = useState('');
  const [attributes, setAttributes] = useState([{ name: '', type: 'string' }]);

  const handleAddAttribute = () => {
    setAttributes([...attributes, { name: '', type: 'string' }]);
  };

  const handleRemoveAttribute = (index) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  const handleChangeAttribute = (index, field, value) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEntity({ entityName, attributes });
    setEntityName('');
    setAttributes([{ name: '', type: 'string' }]);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Create New Entity</Card.Title>
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
          <Form.Label>Attributes</Form.Label>
          {attributes.map((attribute, index) => (
            <Row key={index} className="mb-2">
              <Col md={5}>
                <Form.Group controlId={`attributeName-${index}`}>
                  <Form.Control
                    type="text"
                    placeholder="Attribute name"
                    value={attribute.name}
                    onChange={(e) => handleChangeAttribute(index, 'name', e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group controlId={`attributeType-${index}`}>
                  <Form.Control
                    as="select"
                    value={attribute.type}
                    onChange={(e) => handleChangeAttribute(index, 'type', e.target.value)}
                    required
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button variant="danger" onClick={() => handleRemoveAttribute(index)}>Remove</Button>
              </Col>
            </Row>
          ))}
          <Button variant="primary" className='mt-3' onClick={handleAddAttribute}>Add Attribute</Button>
          <Button variant="success" type="submit" className="ml-3 ms-2 mt-3">Create Entity</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateEntity;
