import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_EVENT } from "../utils/mutations";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import Auth from "../utils/auth";

const CreateEvent = () => {
  const [createEvent] = useMutation(CREATE_EVENT);
  const [eventInput, setEventInput] = useState({
    title: "",
    description: "",
    cost: "",
    location: "",
    date: "",
  });
  const userToken = Auth.getProfile();
  const userId = userToken.data._id;
  const handleFormSubmit = async (event) => {

    event.preventDefault();
    try {
      console.log({
        variables: {
          title: eventInput.title,
          description: eventInput.description,
          cost: parseFloat(eventInput.cost),
          location: eventInput.location,
          date: eventInput.date,
        },
      })
      await createEvent({
        variables: {
          title: eventInput.title,
          description: eventInput.description,
          cost: parseFloat(eventInput.cost),
          location: eventInput.location,
          date: eventInput.date,
          userId: userId
        },
      });
      setEventInput({
        title: "",
        description: "",
        cost: "",
        location: "",
        date: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="background">
      <Container>
        <h1 className="home-title">Create Fundraising Project</h1>
        <Form onSubmit={handleFormSubmit}>
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <Form.Control
                name="title"
                className="create-event"
                value={eventInput.title}
                onChange={(e) =>
                  setEventInput({ ...eventInput, title: e.target.value })
                }
                type="text"
                size="lg"
                placeholder="Project Name"
                required
              />
              <Form.Control
                name="description"
                className="create-event"
                value={eventInput.description}
                onChange={(e) =>
                  setEventInput({
                    ...eventInput,
                    description: e.target.value,
                  })
                }
                type="text"
                size="lg"
                placeholder="Project Description"
                required
              />
              <Form.Control
                name="cost"
                className="create-event"
                value={eventInput.cost}
                onChange={(e) =>
                  setEventInput({
                    ...eventInput,
                    cost: e.target.value,
                  })
                }
                type="number"
                size="lg"
                placeholder="Fundraising Target"
                step="0.01"
                min="0"
                required
              />
              <Form.Control
                name="location"
                className="create-event"
                value={eventInput.location}
                onChange={(e) =>
                  setEventInput({
                    ...eventInput,
                    location: e.target.value,
                  })
                }
                type="text"
                size="lg"
                placeholder="Project Location"
                required
              />
              <Form.Control
                name="date"
                className="create-event"
                value={eventInput.date}
                onChange={(e) =>
                  setEventInput({
                    ...eventInput,
                    date: e.target.value,
                  })
                }
                type="datetime-local"
                size="lg"
                placeholder="Project End Date"
                required
              />
              <Button className="submitButton" type="submit" size="lg"  >
                Create Project
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CreateEvent;
