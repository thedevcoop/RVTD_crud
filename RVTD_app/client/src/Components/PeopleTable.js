import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

class PeopleTable extends Component {
  render() {
    const renderPeopleTable = () => {
      return this.props.people.map((person, index) => {
        return (
          <tr key={person.id}>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.streetAddress}</td>
            <td>{person.city}</td>
            <td>{person.state}</td>
            <td>{person.zip}</td>
            <td>
              <Button
                bsStyle="warning"
                bsSize="xsmall"
                onClick={() => this.props.editPerson(index, person)}
              >
                update
              </Button>
            </td>
            <td>
              <Button
                bsStyle="danger"
                bsSize="xsmall"
                onClick={() => {
                  const confirmDelete = prompt(
                    "Type DELETE to remove this person."
                  );
                  if (
                    confirmDelete != null &&
                    confirmDelete.toLowerCase() === "delete"
                  ) {
                    this.props.selectPerson(person.id);
                  }
                }}
              >
                delete
              </Button>
            </td>
          </tr>
        );
      });
    };
    return (
      <div>
        <h1>Rogue Valley Transportation District</h1>
        <Table responsive>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
            </tr>

            {renderPeopleTable()}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default PeopleTable;
