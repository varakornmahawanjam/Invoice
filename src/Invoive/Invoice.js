import React, { Component } from "react";
import { Tab, Tabs, Button } from "react-bootstrap";
import AllInvoice from "./AllInvoice";
import CancelInvoice from "./CancelInvoice";
import PaidInvoice from "./PaidInvoice";
import UnsuccessfulInvoice from "./UnsuccessfulInvoice";
import WaitingForPaymentInvoice from "./WaitingForPaymentInvoice";
import WaitingToCheckInvoice from "./WaitingToCheckInvoice";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

export default class Invoice extends Component {
  state = {
    isLoading: false,
    isError: false,
    Data: [],
    TotalPayment: 0,
  };
  async componentDidMount() {
    let tempValue = 0;
    this.setState({ isLoading: true });
    const response = await fetch(
      "https://my-json-server.typicode.com/varakornmahawanjam/myjson/Invoice"
    );
    if (response.ok) {
      const data = await response.json();
      await Object.values(data).map(async (value, i) => {
        tempValue = tempValue + value.payment;
      });
      this.setState({ Data: data, isLoading: false, TotalPayment: tempValue });
    } else {
      this.setState({ isError: true, isLoading: false });
    }
    console.log("Data :", this.state.Data);
    console.log("TotalPayment :", this.state.TotalPayment);
  }

  render() {
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: 140,
        width: 100,
      },
    }));

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
      <Container fixed>
        <div className={useStyles.root}>
          <Grid container spacing={5}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} sm={9}>
              <Paper></Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button variant="outline-danger" disabled>
                ยอดชำระทั้งหมด <h2 color="red">{this.state.TotalPayment}</h2>{" "}
                บาท
              </Button>
            </Grid>
          </Grid>
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
      </Container>
    ) : (
      <div> No Data </div>
    );
  }
}
