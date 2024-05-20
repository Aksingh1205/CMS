import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Home from './components/Home';
import ViewEntries from './components/ViewEntries';
import CreateEntity from './components/CreateEntity';
import CreateEntry from './components/CreateEntry';

const App = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create-entity">Create Entity</Nav.Link>
            <Nav.Link href="/view-entries">View Entries</Nav.Link>
            <Nav.Link href="/create-entry">Create Entry</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-entity" element={<CreateEntity />} />
          <Route path="/view-entries" element={<ViewEntries />} />
          <Route path="/create-entry" element={<CreateEntry />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
