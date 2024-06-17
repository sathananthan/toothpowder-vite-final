/* eslint-disable */
import React from "react";
import { Col, Row, Toast } from "react-bootstrap";
import "../style/Toast.css";
import { useStateValue } from "./StateProvider";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function Toast1({ show, setShow }) {
  //   console.log(name);
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <>
      <Row>
        <Col xs={6}>
          <div className={`toast-container1 ${show ? "show" : ""}`}>
            <Toast
              onClose={() => setShow(false)}
              bg="dark"
              show={show}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <CheckBoxIcon />
                &nbsp;
                <strong className="me-auto">Added to cart</strong>
                <small>Check Cart</small>
              </Toast.Header>
              <Toast.Body className="text-white">
                Hey! {user?.name} your product added to cart "Check Cart"
              </Toast.Body>
            </Toast>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Toast1;
