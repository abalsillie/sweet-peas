import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'font-awesome/css/font-awesome.min.css';
import './style.css';

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GivingPortfolio from "./components/GivingPortfolio";
import CreateEvent from "./components/CreateEvent";
import ProjectClearinghouse from "./components/ProjectClearinghouse";
import UpdateEvent from "./components/UpdateEvent";
import EventDetails from "./components/EventDetails";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/givingPortfolio" element={<GivingPortfolio />} />
            <Route path="/createEvent" element={<CreateEvent />} />
            <Route path="/projectClearinghouse" element={<ProjectClearinghouse />} />
            <Route path="/updateEvent/:eventId" element={<UpdateEvent />} />
            <Route path="/eventDetails/:eventId" element={<EventDetails />} />
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
