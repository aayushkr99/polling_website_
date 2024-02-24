import "./App.css";
import { useState, useEffect } from "react";
// import Login from "./components/Login";
import Button from "./components/Button";
// import { FcGoogle } from "react-icons/fc";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import {callApi} from "./utils/Api";
function App() {
  const history = useNavigate();
  const [data, setData] = useState([]);

  const handleClick = () => {
    history("/list");
  };

  const fetchData = async () => {
    const graphqlQuery = `
    query GetPhotos {
      photos {
        updated_at
        id
        photo_url
        description
      }
    }
`;

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
        <h1>Welcome to Jeera Portal!</h1>
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
                <p>
                  unde omnis iste natus error sit voluptatem accusantium
                  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                  illo inventore veritatis et quasi architecto beatae vitae
                  dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                  sit aspernatur aut odit aut fugit, sed quia
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
                <p>
                  unde omnis iste natus error sit voluptatem accusantium
                  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                  illo inventore veritatis et quasi architecto beatae vitae
                  dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                  sit aspernatur aut odit aut fugit, sed quia
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
