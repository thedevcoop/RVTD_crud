import React, { Component } from "react";
import {
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  HelpBlock
} from "react-bootstrap";
import axios from "axios";

class NewUserModal extends Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: ""
  };

  async componentWillReceiveProps(nextProps) {
    if (
      nextProps.changePerson !== this.props.changePerson &&
      nextProps.changePerson
    ) {
      const {
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        zip,
        index,
        id
      } = nextProps.changePerson;

      await this.setState({
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        zip,
        index,
        id
      });
    }
  }

  getValidationFirst() {
    const first = this.state.firstName.match(/[A-Za-z]/);
    if (first) {
      return "success";
    } else if (!first) return "error";
    return null;
  }
  getValidationLast() {
    const last = this.state.lastName.match(/[A-Za-z]/);
    if (last) {
      return "success";
    } else if (!last) return "error";
    return null;
  }
  getValidationAddress() {
    const address = this.state.streetAddress.match(/[\w\s.-]+[#]*/);
    if (address) {
      return "success";
    } else if (!address) return "error";
    return null;
  }
  getValidationCity() {
    const city = this.state.city.match(/[A-Za-z]/);
    if (city) {
      return "success";
    } else if (!city) return "error";
    return null;
  }
  getValidationState() {
    const state = this.state.state.match(/[A-Za-z]/);
    if (state) {
      return "success";
    } else if (!state) return "error";
    return null;
  }
  getValidationZip() {
    const zip = this.state.zip.match(/^\d{5}(?:[-\s]\d{4})?$/);
    if (zip) {
      return "success";
    } else if (!zip) return "error";
    return null;
  }

  handleChangeFirst = e => {
    this.setState({
      firstName: e.target.value
    });
  };

  handleChangeLast = e => {
    this.setState({
      lastName: e.target.value
    });
  };

  handleChangeAddress = e => {
    this.setState({
      streetAddress: e.target.value
    });
  };

  handleChangeCity = e => {
    this.setState({
      city: e.target.value
    });
  };

  handleChangeState = e => {
    this.setState({
      state: e.target.value
    });
  };

  handleChangeZip = e => {
    this.setState({
      zip: e.target.value
    });
  };

  createBanner = () => {
    console.log("New person created");
    // alert("New person created");
  };
  editBanner = () => {
    console.log("Person updated");
    // alert("Person updated");
  };

  createNewPerson = async () => {
    const { firstName, lastName, streetAddress, city, state, zip } = this.state;

    try {
      const res = await axios.post("/people", {
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        zip
      });
      const newPerson = res.data.person;
      this.props.updatePeopleList(newPerson);
      this.setState({
        id: "",
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: ""
      });
      this.props.closeModal();
    } catch (error) {
      console.error("ERROR: ", error);
    }
    this.createBanner();
  };

  putPerson = async () => {
    const {
      id,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zip
    } = this.state;

    try {
      const res = await axios.put(`/people/${id}`, {
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        zip,
        id
      });
      const newPerson = res.data.person;
      this.props.putPerson(this.state.index, newPerson);
      this.props.closeModal();
      this.setState({
        id: "",
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: ""
      });
    } catch (error) {}
    this.editBanner();
  };

  exitModal = () => {
    this.setState({
      id: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: ""
    });
    this.props.closeModal();
  };
  render() {
    return (
      <div className="modal-container">
        <Modal show={this.props.showModal} onHide={this.exitModal}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              {this.props.changePerson ? (
                <Modal.Title> Edit Person </Modal.Title>
              ) : (
                <Modal.Title> Create New Person </Modal.Title>
              )}
            </Modal.Header>
            <Modal.Body>
              <form>
                {/* first name */}
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getValidationFirst()}
                >
                  <ControlLabel> First Name </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.firstName}
                    placeholder="John"
                    onChange={this.handleChangeFirst}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                {/* last name */}
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getValidationLast()}
                >
                  <ControlLabel> Last Name </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.lastName}
                    placeholder="Doe"
                    onChange={this.handleChangeLast}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                {/* address */}
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getValidationAddress()}
                >
                  <ControlLabel> Address </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.streetAddress}
                    placeholder="123 abc st"
                    onChange={this.handleChangeAddress}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                {/* city */}
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getValidationCity()}
                >
                  <ControlLabel> City </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.city}
                    placeholder="Portland"
                    onChange={this.handleChangeCity}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                {/* state */}
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getValidationState()}
                >
                  <ControlLabel> State </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.state}
                    placeholder="Oregon"
                    onChange={this.handleChangeState}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                {/* zip */}
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.getValidationZip()}
                >
                  <ControlLabel> Zip </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.zip}
                    placeholder="97007"
                    onChange={this.handleChangeZip}
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.exitModal()}> Close </Button>
              {this.props.changePerson ? (
                <Button onClick={() => this.putPerson()} bsStyle="primary">
                  Edit Person
                </Button>
              ) : (
                <Button onClick={this.createNewPerson} bsStyle="primary">
                  Save changes
                </Button>
              )}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={() => this.props.openModal()}
        >
          Create New User
        </Button>
      </div>
    );
  }
}

export default NewUserModal;
