import Contact from "../components/Contact";
import "../style.css";
import logo from "../assets/logo.png";

const Home = () => {
  return (

    <div className="background">
      <img
        src={logo}
        className="pea logo"
        alt={"pea logo"}
      />
      <h1 className="home-title">Welcome to your favourite grants management software</h1>

      <div className="home-content">
        <p>
          We help bridge the gap between charitable non-profit projects in need of funding,
          and generous donors who are passionate about social impact.
          Sweet Peas allows you to find projects based on geography and area of interest,
          contribute how you wish, and add these to your giving portfolio.
        </p>
      </div>
        <Contact />
        <Donation />
    </div>
  );
};

function Donation() {
  return (
    <div className="donation-container">
      <h2 className="title">Donation</h2>
      <p className="home-content">If you'd like to support our work, you can donate using the button below:</p>
      <button className="submitButton">Donate</button>
    </div>
  );
}

export default Home;
