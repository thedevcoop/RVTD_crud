import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import PeopleTable from "./Components/PeopleTable";
import NewUserModal from "./Components/NewUserModal";

class App extends Component {
  // Initial state
  state = {
    people: [],
    showModal: false,
    changePerson: undefined
  };

  async componentDidMount() {
    try {
      const res = await axios.get("http://localhost:3000/people/json");

      this.setState({ people: res.data });
      // console.log("DATA->: ", this.state.people);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  }

  updatePeopleList = newPerson => {
    this.setState({ people: [...this.state.people, newPerson] });
  };

  putPerson = (index, newPerson) => {
    const { people } = this.state;
    const newState = [
      ...people.slice(0, index),
      newPerson,
      ...people.slice(index + 1)
    ];
    this.setState({ people: newState });
    this.setState({ changePerson: undefined });
  };

  editPerson = async (index, newPerson) => {
    const data = { index, ...newPerson };
    await this.setState({ changePerson: data });
    this.open();
  };

  selectPerson = async id => {
    try {
      const res = await axios.delete(`/people/${id}`, { id });
      const people = this.state.people.filter(person => {
        return person.id === id ? false : true;
      });
      this.setState({ people });
    } catch (error) {}
    this.deleteBanner();
  };

  // Modal set open/close -- start
  close = () => {
    this.setState({
      showModal: false,
      changePerson: undefined
    });
  };

  open = () => {
    this.setState({
      showModal: true
    });
  };
  // Modal set open/close -- end

  deleteBanner = () => {
    console.log("Person deleted");
    // alert("Person deleted");
  };

  render() {
    return (
      <div>
        <PeopleTable
          people={this.state.people}
          selectPerson={this.selectPerson}
          editPerson={this.editPerson}
        />
        {/* Getting passed as prop to NewUserModal*/}
        <NewUserModal
          changePerson={this.state.changePerson}
          showModal={this.state.showModal}
          putPerson={this.putPerson}
          updatePeopleList={this.updatePeopleList}
          openModal={this.open}
          closeModal={this.close}
        />
      </div>
    );
  }
}

export default App;
