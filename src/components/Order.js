import React, { useEffect, useState, useMemo, useCallback } from "react";
import { getOrder } from "../api/orders";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useStyles from "../constants/useStyles";
import _ from "lodash";
import useAsync from "react-use-async-hook";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const Order = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [loaderOpen, setLoaderOpen] = useState(false);
  const handleLoader = (value) => {
    if (loaderOpen !== value) {
      setLoaderOpen(value);
    }
  };

  const {
    data: order,
    loading: getMyOrdersDetailsLoading,
    execute: getMyOrdersDetailsAPIExec,
  } = useAsync({
    autoExecute: false,
    initialData: useMemo(() => [], []),
    task: useCallback(
      (id) => {
        return getOrder(id);
      },
      [id]
    ),
    dataLoader: useCallback((response) => {
      return response;
    }, []),
    onError: useCallback((errorRes) => {
      console.log(errorRes);
    }, []),
  });

  useEffect(() => {
    getMyOrdersDetailsAPIExec(id);
  }, [id]);

  const showLoader = useMemo(() => getMyOrdersDetailsLoading, [
    getMyOrdersDetailsLoading,
  ]);
  handleLoader(showLoader);
  return (
    <div className=" ml-5 mr-5">
      <h1>Order Details</h1>
      <Table striped bordered hover className="mb-5">
        <tbody>
          <tr>
            <td>Order Id</td>
            <td>{order?.orderId}</td>
          </tr>
          <tr>
            <td>Product Name</td>
            <td>{_.get(order, "items[0].name")}</td>
          </tr>
          <tr>
            <td>Plan</td>
            <td>{_.get(order, "items[0].plan")}</td>
          </tr>
          <tr>
            <td>SKU</td>
            <td>{_.get(order, "items[0].skuId")}</td>
          </tr>
          <tr>
            <td>Telephone</td>
            <td>{_.get(order, "items[0].telephoneNumber")}</td>
          </tr>
          <tr>
            <td>Quantity</td>
            <td>{_.get(order, "items[0].quantity")}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td className={`first-letter ${order.status}`}>{order.status}</td>
          </tr>
          <tr>
            <td>Completed</td>
            <td>{order.complete ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>Shipping Address</td>
            <td>{`${_.get(order, "shipingAddress.city")} ${_.get(
              order,
              "shipingAddress.state"
            )} ${_.get(order, "shipingAddress.zip")}`}</td>
          </tr>
          <tr>
            <td>Shipment Tracking url</td>
            <td>{_.get(order, "shipments[0].trackingUrl")}</td>
          </tr>
        </tbody>
      </Table>
      <Backdrop className={classes.backdrop} open={loaderOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Order;
