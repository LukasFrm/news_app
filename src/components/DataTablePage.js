import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";

class DatatablePage extends Component {
  render() {
    return  (
      <MDBDataTable
        ref="table"
        striped
        bordered
        small
        autoWidth
        hover
        responsive
        data={this.props.tableData}
        entriesOptions={[10, 20, 50, 100, 500, 2000, 5000]}
        entries={20}
      />
    )
  }
}

export default DatatablePage;
