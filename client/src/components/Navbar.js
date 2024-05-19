import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import Signup from "./Signup";
import Login from "./Login";
import Auth from "../utils/auth";
import icon from "../assets/icon.png";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false); // modal display for login and sign up

  return (
    <>
      <Navbar className={`navbar bg-dark`}>
        <Container fluid>
          <img
            src={icon}
            className="icon"
            alt={"pea icon"}
          />
          <Navbar.Brand className="navbar-brand fs-1 p-3" as={Link} to="/">
            Sweet Peas
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
            <Nav>
              <Nav.Link className="navlink" as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link className="navlink" as={Link} to="/projectClearinghouse">
                Project Clearinghouse
              </Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link className="navlink" as={Link} to="/givingPortfolio">
                    Giving Portfolio
                  </Nav.Link>
                  <Nav.Link className="navlink" onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link className="navlink" onClick={() => setShowModal(true)}>
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* login and sign up*/}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link
                    eventKey="login"
                    style={{ backgroundColor: "#21ba94" }}
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="signup"
                    style={{ backgroundColor: "#21ba94" }}
                  >
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <Login handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <Signup handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
