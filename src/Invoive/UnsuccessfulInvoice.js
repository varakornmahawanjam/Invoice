import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";

export default class UnsuccessfulInvoice extends Component {
  state = {
    isLoading: false,
    Data: [],
  };

  async componentDidMount() {
    var tempdata = [];
    this.setState({ isLoading: true });
    if (this.state.category !== null) {
      await Object.values(this.props.Data).map(async (data, i) => {
        if (data.status === "ไม่สำเร็จ") {
          await tempdata.push(data);
          console.log(data);
        }
      });
    }
    this.setState({ Data: tempdata, isLoading: false });
    console.log("tempdata :", tempdata);
  }

  render() {
    if (this.state.isLoading) {
      return <div> Loading... </div>;
    } else {
      return (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={this.state.Data}
            columns={this.props.columns}
            pageSize={5}
          />
        </div>
      );
    }
  }
}
