import {useState} from "react";
import { Card, Button, Form, Col, CardGroup } from "react-bootstrap";
import Axios from "axios";
import "./App.css";

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: usernameLogin,
      password: passwordLogin,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus("Login Success for" + "  " + response.data[0].username);
      }
    });
  };
  return (
    <>
      {" "}
      <Col xl={15}>
        <Form.Group as={Col}>
          <Form.Label> Username :</Form.Label>
          <Form.Control
            placeholder="Enter email"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label> Password :</Form.Label>
          <Form.Control
            placeholder="*********"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
        </Form.Group>

        <Button variant="warning" onClick={register}>
          Register
        </Button>
      </Col>
      <Form.Group as={Col}>
        <Form.Label> Username :</Form.Label>
        <Form.Control
          placeholder="Enter email"
          onChange={(e) => {
            setUsernameLogin(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label> Password :</Form.Label>
        <Form.Control
          placeholder="*********"
          onChange={(e) => {
            setPasswordLogin(e.target.value);
          }}
        />
      </Form.Group>
      <Button variant="warning" onClick={login}>
        LOGIN
      </Button>
      <h4>{loginStatus}</h4>
    </>
  );
}

export default App;
