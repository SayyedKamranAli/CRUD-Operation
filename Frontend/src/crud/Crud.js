import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addData } from "../redux/Form/addForm.action";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Pic from "./download.jpg";
import { Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Pagination from "../pagination/Pagination";

let PageSize = 4;

function Crud() {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
  };

  const [validation, setValidation] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    // password: "",
    // confirmPassword: "",
  });

  const [datas, setDatas] = useState([]);
  const [arr, setArr] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [editShow, setEditShow] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  //const state = useSelector((state) => state.addForm);
  const dispatch = useDispatch();

  const checkValidation = () => {
    let errors = { ...validation };
    let isValid = true;
    //first Name validation
    if (!values.firstname) {
      errors.firstname = "First name is required";
      isValid = false;
    } else {
      errors.firstname = "";
    }

    //last Name validation
    if (!values.lastname) {
      errors.lastname = "Last name is required";
      isValid = false;
    } else {
      errors.lastname = "";
    }

    // email validation
    // eslint-disable-next-line
    const emailCond = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!values.email.match(emailCond)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      errors.email = "";
    }

    //mobile number validation
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!values.mobile) {
      errors.mobile = "mobile no. is requird";
      isValid = false;
    } else if (!values.mobile.match(re)) {
      
      errors.mobile = "Number must be equal to 10 digit";
      isValid = false;
    } else {
      errors.mobile = "";
    }

    //   //password validation
    //   // const cond1 = "/^(?=.*[a-z]).{6,20}$/";
    //   // const cond2 = "/^(?=.*[A-Z]).{6,20}$/";
    //   // const cond3 = "/^(?=.*[0-9]).{6,20}$/";
    //   // const password = inputValues.password;
    //   // if (!password) {
    //   //   errors.password = "password is required";
    //   // } else if (password.length < 6) {
    //   //   errors.password = "Password must be longer than 6 characters";
    //   // } else if (password.length >= 20) {
    //   //   errors.password = "Password must shorter than 20 characters";
    //   // } else if (!password.match(cond1)) {
    //   //   errors.password = "Password must contain at least one lowercase";
    //   // } else if (!password.match(cond2)) {
    //   //   errors.password = "Password must contain at least one capital letter";
    //   // } else if (!password.match(cond3)) {
    //   //   errors.password = "Password must contain at least a number";
    //   // } else {
    //   //   errors.password = "";
    //   // }

    //   // //matchPassword validation
    //   // if (!inputValues.confirmPassword) {
    //   //   errors.confirmPassword = "Password confirmation is required";
    //   // } else if (inputValues.confirmPassword !== inputValues.Password) {
    //   //   errors.confirmPassword = "Password does not match confirmation password";
    //   // } else {
    //   //   errors.password = "";
    //   // }

    setValidation(errors);
    return isValid;
  };

  const handleClose = () => {
    setShow(false);
    setEditShow(false);
    setValidation('');
  };
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArr({ ...arr, [name]: value });
  };

  const create = (event) => {
    event.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
      dispatch(addData(values));
      console.log("values", values);
      // axios
      //   .post("http://localhost:5000/add", values)
      //   .then((response) => console.log("res", response))
      //   .catch(function (error) {
      //     // handle error
      //     console.log(error, "error");
      //   });
      //  window.location.reload();

      setValues("");
      setValidation("");
      setShow(false);
    }
  };

  const edit = (id) => {
    setEditShow(true);
    let jsondata = "";
    for (let i = 0; i < datas.length; i++) {
      jsondata = datas[i];
      if (jsondata.id === id) {
        setArr(datas[i]);
      }
    }
  };
  const update = (e) => {
    window.location.reload();
    setEditShow(false);
    e.preventDefault();
    axios.put("http://localhost:5000/update", arr);
    console.log("arr", arr).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  const deleti = (id) => {
    window.location.reload();
    axios.post("http://localhost:5000/delete", { id }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  const reset1 = (e) => {
    e.preventDefault();
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mobile").value = "";

    setValues("");
    setArr("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/")

      .then(function (response) {
        // handle success
        setDatas(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error, "network");
      });
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;

    const lastPageIndex = firstPageIndex + PageSize;

    return datas.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, datas]);

  return (
    <div>
      <div className="text-center">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label className="fw-bold">Firstname</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={values.firstname}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter firstName"
                />

                {validation.firstname && (
                  <p className="mb-0" style={{ color: "red" }}>
                    {validation.firstname}
                  </p>
                )}
                <small className="form-text text-muted">
                  We'll never share your firstname with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label className="fw-bold">Lastname </label>
                <input
                  type="email"
                  name="lastname"
                  id="lastname"
                  value={values.lastname}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter lastname"
                />
                {validation.lastname && (
                  <p className="mb-0" style={{ color: "red" }}>
                    {validation.lastname}
                  </p>
                )}
                <small className="form-text text-muted">
                  We'll never share your lastname with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label className="fw-bold">Email address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter email"
                />
                {validation.email && (
                  <p className="mb-0" style={{ color: "red" }}>
                    {validation.email}
                  </p>
                )}
                <small className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label className="fw-bold">Mobile Number</label>
                <input
                  type="number"
                  name="mobile"
                  id="mobile"
                  value={values.mobile}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter number"
                />
                {validation.mobile && (
                  <p className="mb-0" style={{ color: "red" }}>
                    {validation.mobile}
                  </p>
                )}
                <small className="form-text text-muted ">
                  We'll never share your mobile number with anyone else.
                </small>
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  className="btn btn-success mx-2"
                  onClick={create}
                >
                  Submit
                </button>
                <button
                  className="btn btn-danger"
                  type="submit"
                  onClick={reset1}
                >
                  Reset
                </button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Button className="text-center" variant="primary" onClick={handleShow}>
          Create
        </Button>
      </div>

      <Container fluid>
        <Row>
          {currentTableData.map((item, index) => {
            return (
              <div key={index} className="col-md-3">
                <Card
                  style={{ width: "18rem", backgroundColor: " #0000000d" }}
                  className="mb-2 mt-3"
                >
                  <Card.Img
                    variant="top"
                    className="mt-2 px-2"
                    src={Pic}
                    style={{ borderRadius: "5%" }}
                  />
                  <Card.Body>
                    <Card.Title>Profile</Card.Title>
                    <Card.Text>
                      <div className="d-flex">
                        <strong>Name:&nbsp;</strong>
                        <p>
                          {item.firstname}&nbsp;{item.lastname}
                        </p>
                      </div>
                      <div className="d-flex">
                        <strong>Email:&nbsp;</strong>
                        <p>{item.email}</p>
                      </div>
                      <div className="d-flex">
                        <strong>Number:&nbsp;</strong>
                        <p>{item.mobile}</p>
                      </div>
                    </Card.Text>
                    <Button
                      variant="warning"
                      className="mx-2"
                      onClick={() => edit(item.id)}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => deleti(item.id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </Row>
      </Container>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={datas.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* This Modal is for Edit Details */}
      <Modal show={editShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label className="fw-bold mt-1">Firstname</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={arr.firstname}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter firstName"
              />
            </div>
            <div className="form-group">
              <label className="fw-bold mt-1">Lastname </label>
              <input
                type="email"
                name="lastname"
                id="lastname"
                value={arr.lastname}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter lastname"
              />
            </div>
            <div className="form-group">
              <label className="fw-bold mt-1">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={arr.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label className="fw-bold mt-1">Mobile Number</label>
              <input
                type="number"
                name="mobile"
                id="mobile"
                value={arr.mobile}
                onChange={handleChange}
                className="form-control "
                placeholder="Enter number"
              />
            </div>
            <button
              className="btn btn-danger mt-2"
              type="submit"
              onClick={reset1}
            >
              Reset
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" type="submit" onClick={update}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Crud;
