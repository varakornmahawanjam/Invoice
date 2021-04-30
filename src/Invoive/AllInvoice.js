import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";

export default class AllInvoice extends Component {
  render() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={this.props.Data}
          columns={this.props.columns}
          pageSize={10}
        />
      </div>
    );
  }
}
