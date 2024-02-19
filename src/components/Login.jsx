import React, { useState } from "react";
import firebaseAuth from "../utils/FirebaseConfig";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import PollingComponent from "./PollingComponent";
import TestPoling from "./TestPoling";
import Button from "./Button";

const optionsObject = {
    Azure: { label: "Azure", color: "blue", vote: 0 },
    GoogleCloud: { label: "Google Cloud", color: "red", vote: 0 },
    AWS: { label: "AWS", color: "black", vote: 0 },
  others: { label: "Others", color: "orange", vote: 0 }
}
const Login = () => {

  const [login, setLogin] = useState(true);
  const [userData, setUserData] = useState([]);
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    console.log(profileImage, { name, email });
    try {
      if (email) {
        const graphqlMutation = `
        mutation InsertUser($name: String!, $email: String!, $profileImage: String!) {
          insert_user(objects: { name: $name, email: $email, profile_image: $profileImage }) {
            affected_rows
            returning {
              id
              name
              email
              profile_image
              created_at
              updated_at
            }
          }
        }
      `;
      
      const { data } = await axios.post("http://localhost:8080/v1/graphql", {
        query: graphqlMutation,
        variables: {
          name: name,
          email: email,
          profileImage: profileImage
        }
      });
      console.log(data, "=========")
        console.log( data.data.insert_user.returning[0]);
        setLogin(true);
        setUserData(data.data.insert_user.returning[0]);
        alert('Logged In Sucessfully')
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div style={{"display": "flex", justifyContent: "center", "gap":"25px", backgroundColor: "pink", minHeight: '50px'}}>
        <Button  onClick={handleLogin}> <FcGoogle size={50} style={{ marginRight: "10px" }} />
                <span style={{ color: "white" }}>Login with Google</span></Button>
                <Button>Try For Free</Button>
            </div>
        
        {/* {login && <>
        <div>Hi, {userData.name}</div>
        <PollingComponent />
        </>
        }
        {!login && <TestPoling optionsObject = {optionsObject} heading={"Which cloud platform u prefer to use ?"} />}
        <button onClick={() => setLogin(prev => !prev)}>change</button> */}
    </>
  );
};

export default Login;