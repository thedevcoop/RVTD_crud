import React, { Component, Button } from "react";

class Alert extends Component {
  render() {
    return (
      <div className="alert alert-success alert-dismissible fade show">
        <Button className="close" data-dismiss="alert" type="button">
          <span>&times;</span>
        </Button>
        <strong>Alert Message:</strong> something has happened
      </div>
    );
  }
}

export default Alert;
