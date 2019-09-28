import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";

class DatatablePage extends Component {


  render() {
    return (
      <MDBDataTable
        striped
        bordered
        small
        autoWidth
        hover
        responsive
        data={this.props.tableData}
        entriesOptions={[10, 100, 500, 1000, 2000, 5000]}
        entries={100}
      />
    );
  }
}

export default DatatablePage;
