import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../logo.svg";
import "../App.css";

function Forlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // this is the function that will be called when the user submit the form and will passed the event as well
  const credentialVerify = (event) => {
    event.preventDefault();
    console.log(event);
    console.log("event");

    //post construction, after the set name nad set password updated it will get send here
    const dataSend = { email: email, password: password, logout: false };
    // creating header to make sure we are sending the JSON format
    const headers = new Headers();
    headers.append("content-type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(dataSend), // here datassend is object so first convert the data into object before stingify
      // redirect: "follow",
      // we need to include credentails if not then the cookies will not be recieved or sent
      credentials: "include",
    };
    console.log(email);

    // const request = new Request("https://lid36d8wya.execute-api.eu-west-2.amazonaws.com/devopl", options);
    const request = new Request("https:/yogaoutlet.herokuapp.com/api/newuser", options);

    (async () => {
      const incomingdata = await fetch(request)
        .then((res) => {
          console.log(res);
          if (res.status >= 200 && res.status < 400) {
            window.location.href = "http://localhost:3000/";
            console.log(res);
          } else {
            console.log(res.status);
            console.log(res.json());
            console.log(res.location);
            return res.json();
          }
        })
        .then((body) => {
          return body;
        })
        .catch((err) => console.log("err"));
      // console.log(e);

      //  console.log(name, password);
      console.log(incomingdata);

      setItems(incomingdata);
      setEmail("");
      setPassword("");
      console.log(items);
    })();
  };

  return (
    <div>
      {
        <form method="POST" className="formstyle" onSubmit={credentialVerify}>
          <input type="text" placeholder="email" name="email" value={email} onChange={updateEmail} />

          <input type="text" placeholder="Password" name="password" value={password} onChange={updatePassword} />
          <button type="submit">Submit</button>
        </form>
      }
    </div>
  );
}

export default Forlogin;
