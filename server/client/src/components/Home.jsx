import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => (
  <Container className="mt-5">
    <Row className="justify-content-center">
      <Col md={8} className="text-center">
        <h1>Welcome to the CMS</h1>
        <p>This is a simple content management system where you can create and manage entities.</p>
        <Button variant="primary" href="/create-entity">Create Entity</Button>
      </Col>
    </Row>
  </Container>
);

export default Home;
