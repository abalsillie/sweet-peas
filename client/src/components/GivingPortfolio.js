import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Card,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import fundraiser from "../assets/fundraiser-image.png";
import logo from "../assets/logo.png";

import { DELETE_EVENT } from "../utils/mutations";
import { GET_ONE_USER } from "../utils/queries";
import Auth from "../utils/auth";

const GivingPortfolio = () => {
  const [hover, setHover] = useState(null);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const userToken = Auth.getProfile();
  const userId = userToken.data._id;
  console.log(userId);

  const onHover = (eventId) => {
    setHover(eventId);
  };

  const onLeave = () => {
    setHover(null);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent({
        variables: {
          deleteEventId: eventId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const { loading, error, data } = useQuery(GET_ONE_USER, {
    variables: { userId: userId },
  });

  if (error) console.log(error.message);
  console.log(data);

  const { user } = data || {};

  const eventHoverStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "40%",
    zIndex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  if (!loading) {
    const events = user.events;
    console.log(events);

    return (
      <>
        <div className="background">
          <img
            src={logo}
            className="pea logo"
            alt={"pea logo"}
          />
          <h1 className="home-title">Welcome {user.username}!</h1>
          <Container>
            <div className="mx-auto">
              <div>
                {events.length > 0 ? (
                  <>
                    <p className="home-content">Here are your saved projects, to edit or delete projects, hover over the project card</p>
                    <Container>
                      <Row xs={1} md={2} lg={3} className="g-4">
                        {events.map((event) => (
                          <Col key={event.id}>
                            <Card
                              onMouseEnter={() => onHover(event.id)}
                              onMouseLeave={() => onLeave(null)}
                              style={{ width: "18rem" }}
                            >
                              {parseInt(event.date) > new Date().getTime() ? (
                                <img
                                  src={fundraiser}
                                  alt={event.title}
                                  className="card-img-top"
                                />
                              ) : (
                                <div style={{ position: "relative" }}>
                                  <img
                                    src={fundraiser}
                                    alt={event.title}
                                    className="card-img-top"
                                    style={{ filter: "brightness(25%)" }}
                                  />
                                  <p
                                    style={{
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      zIndex: 1,
                                      color: "white",
                                    }}
                                  >
                                    CAMPAIGN CLOSED
                                  </p>
                                </div>
                              )}
                              {hover === event.id && (
                                <div style={eventHoverStyle}>
                                  <Button
                                    variant="link"
                                    as={Link}
                                    to={`/updateEvent/${event.id}`}
                                  >
                                    <FontAwesomeIcon
                                      icon={faPenToSquare}
                                      size="2x"
                                      color="#189d99"
                                    />
                                  </Button>
                                  <Button
                                    variant="link"
                                    onClick={() => handleDeleteEvent(event.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrashCan}
                                      size="2x"
                                      color="#EC4899"
                                    />
                                  </Button>
                                </div>
                              )}
                              <Card.Body>
                                <Card.Title>{event.title}</Card.Title>
                                <Card.Text>{event.description}</Card.Text>
                                <Button
                                  as={Link}
                                  to={`/eventDetails/${event.id}`}
                                  variant="primary"
                                  className="submitButton"
                                >
                                  More Info
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  </>
                ) : (
                  <>
                    <h4 className="home-content">You haven't endorsed any fundraising projects yet! To post a project on behalf of a charity, click the + icon
                    </h4>
                  </>
                )}
              </div>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">Create New Project!</Tooltip>
                }
              >
                <Button
                  as={Link}
                  to="/createEvent"
                  variant="info"
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    position: "fixed",
                    bottom: "100px",
                    right: "100px",
                    width: "50px",
                    height: "50px",
                    color: "white"
                  }}
                  key="addEventBtn"
                  onMouseEnter={() => onHover("addEventBtn")}
                  onMouseLeave={() => onLeave(null)}
                >
                  <FontAwesomeIcon icon={faPlus} size="2x" />
                </Button>
              </OverlayTrigger>
            </div>

          </Container>
        </div>
      </>
    );
  }
};
export default GivingPortfolio;
