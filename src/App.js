import "./App.css";
import { useState, useEffect } from "react";
// import Login from "./components/Login";
import Button from "./components/Button";
// import { FcGoogle } from "react-icons/fc";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import {callApi} from "./utils/Api";
import { fetchPhotos } from "./utils/Query";
function App() {
  const history = useNavigate();
  const [data, setData] = useState([]);

  const handleClick = () => {
    history("/list");
  };

  const fetchData = async () => {
    const graphqlQuery = fetchPhotos()

    const response = await callApi(graphqlQuery);

    setData(response.data.data.photos);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{fontFamily: "Arial, sans-serif"}}>Welcome to Jeera Polling Portal!</h1>
        {/* <Button> <FcGoogle size={50} style={{ marginRight: "10px" }} />
                <span style={{ color: "white" }}>Login with Google</span></Button> */}
        <Button onClick={handleClick}>Try For Free</Button>
      </header>
      <h4>
        "A place where you can find and share your ideas, see market trends,
        participate in polls, and contribute."
      </h4>

      {data.map((obj, i) => {
        return (
          <ul>
            {i % 2 === 0 ? (
              <div
                style={{
                  display: "flex",
                  gap: "40px",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{fontFamily:"Open Sans", fontSize:"20px"}}>
                Explore a world of opinions and insights with ease. Engage in meaningful discussions and make your voice count. Join us as we strive to create a platform where every opinion matters. Let's shape the future together through informed choices. Start polling now and be part of something bigger!
                </p>
                <img src={obj.photo_url} alt="pic"></img>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "40px",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{fontFamily:"Open Sans", fontSize:"20px"}}>
                This website provides a platform for seamless collaboration, efficient communication, and streamlined project management. It enhances productivity, fosters teamwork, and facilitates the exchange of ideas, ultimately leading to successful outcomes.
                </p>
                <img src={obj.photo_url} alt="pic"></img>
              </div>
            )}
          </ul>
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
