import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_ALL_EVENTS } from "../utils/queries";
import fundraiser from "../assets/fundraiser-image.png";
import logo from "../assets/logo.png";

// display all fundraising events
const ProjectClearinghouse = () => {
  const { loading, data } = useQuery(GET_ALL_EVENTS);

  if (loading) {
    return <div>Loading fundraising projects</div>;
  }

  const events = data.events;

  return (
    <div className="background">
      <img
        src={logo}
        className="pea logo"
        alt={"pea logo"}
      />
      <h1 className="home-title">Project Clearinghouse</h1>
      <div className="d-flex align-items-center justify-content-center">
        <button className="submitButton mx-2">Regional and Rural</button>
        <button className="submitButton mx-2">Small NFPs</button>
        <button className="submitButton mx-2">Environment</button>
        <button className="submitButton mx-2">International Development</button>
      </div>
      <div className="container">
        {events.length === 0 ? (
          <div>No projects found</div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {events.map((event) => (
              <div key={event.id} className="col">
                <Link
                  to={`/eventDetails/${event.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="card h-100">
                    {parseInt(event.date) > new Date().getTime() ? (
                      <img
                        src={fundraiser}
                        className="card-img-top"
                        alt={event.title}
                      />
                    ) : (
                      <div style={{ position: "relative" }}>
                        <img
                          src={fundraiser}
                          className="card-img-top"
                          alt={event.title}
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
                    <div className="card-body">
                      <h5 className="card-title">{event.title}</h5>
                      <p className="card-text">{event.description}</p>
                      <div className="mb-1">
                        <span className="fw-bold me-1">Location:</span>
                        {event.location}
                      </div>
                      <div className="mb-1">
                        <span className="fw-bold me-1">Date:</span>
                        {new Date(parseInt(event.date)).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <div className="text-muted">
                        {event.user ? "Endorsed by " + event.user.username : ""}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectClearinghouse;