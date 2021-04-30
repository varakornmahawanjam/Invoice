import React, { Component } from "react";
//import { DataGrid } from "@material-ui/data-grid";
import { Tab, Tabs } from "react-bootstrap";
import AllInvoice from "./AllInvoice";
import CancelInvoice from "./CancelInvoice";
import PaidInvoice from "./PaidInvoice";
import UnsuccessfulInvoice from "./UnsuccessfulInvoice";
import WaitingForPaymentInvoice from "./WaitingForPaymentInvoice";
import WaitingToCheckInvoice from "./WaitingToCheckInvoice";

export default class Invoice extends Component {
  state = {
    isLoading: false,
    isError: false,
    Data: [],
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await fetch(
      "https://my-json-server.typicode.com/varakornmahawanjam/myjson/Invoice"
    );
    if (response.ok) {
      const data = await response.json();
      this.setState({ Data: data, isLoading: false });
    } else {
      this.setState({ isError: true, isLoading: false });
    }
    console.log("Data :", this.state.Data);
  }

  render() {
    const columns = [
      { field: "id", headerName: "No", width: 100 },
      { field: "projectName", headerName: "Project Name", width: 180 },
      {
        field: "date",
        headerName: "Date",
        type: "date",
        width: 120,
      },
      { field: "name", headerName: "Customer Name", width: 180 },
      {
        field: "payment",
        headerName: "Payment Amount",
        type: "number",
        width: 180,
      },
      {
        field: "status",
        headerName: "Status",
        width: 180,
        sortable: false,
      },
    ];

    if (this.state.isLoading) {
      return <div> Loading... </div>;
    }
    if (this.state.isError) {
      return <div> Error... </div>;
    }
    return this.state.Data.length > 0 ? (
      <div>
        <Tabs defaultActiveKey="all" id="invoiceTable">
          <Tab eventKey="all" title="ทั้งหมด">
            <AllInvoice Data={this.state.Data} columns={columns} />
            {/* <div style={{ height: 400, width: "100%" }}>
              <DataGrid rows={this.state.Data} columns={columns} pageSize={5} />
            </div> */}
          </Tab>
          <Tab eventKey="waitingForPayment" title="รอชำระเงิน">
            <WaitingForPaymentInvoice
              Data={this.state.Data}
              columns={columns}
            />
          </Tab>
          <Tab eventKey="waitingToCheck" title="รอตรวจสอบ">
            <WaitingToCheckInvoice Data={this.state.Data} columns={columns} />
          </Tab>
          <Tab eventKey="paid" title="จ่ายแล้ว">
            <PaidInvoice Data={this.state.Data} columns={columns} />
          </Tab>
          <Tab eventKey="unsuccessful" title="ไม่สำเร็จ">
            <UnsuccessfulInvoice Data={this.state.Data} columns={columns} />
          </Tab>
          <Tab eventKey="cancel" title="ยกเลิก">
            <CancelInvoice Data={this.state.Data} columns={columns} />
          </Tab>
        </Tabs>
      </div>
    ) : (
      <div> No Data </div>
    );
  }
}
