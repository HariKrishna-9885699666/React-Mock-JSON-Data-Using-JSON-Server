import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { getMyOrder } from "../api/orders";
import useStyles from "../constants/useStyles";
import { Table, Button } from "react-bootstrap";
import _ from "lodash";
import useAsync from "react-use-async-hook";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const MyOrders = () => {
  const classes = useStyles();
  const [loaderOpen, setLoaderOpen] = useState(false);
  const handleLoader = (value) => {
    if (loaderOpen !== value) {
      setLoaderOpen(value);
    }
  };

  const {
    data: myOrders,
    loading: getMyOrdersLoading,
    execute: getMyOrdersAPIExec,
  } = useAsync({
    autoExecute: false,
    initialData: useMemo(() => [], []),
    task: useCallback(() => {
      return getMyOrder();
    }, []),
    dataLoader: useCallback((response) => {
      return response;
    }, []),
    onError: useCallback((errorRes) => {
      console.log(errorRes);
    }, []),
  });

  useEffect(() => {
    getMyOrdersAPIExec();
  }, []);

  const showLoader = useMemo(() => getMyOrdersLoading, [getMyOrdersLoading]);
  handleLoader(showLoader);

  return (
    <div className=" ml-5 mr-5">
      <h1>My orders</h1>
      {myOrders &&
        myOrders.map((item, index) => {
          return (
            <div key={index}>
              <Table striped bordered hover className="mb-5">
                <tbody>
                  <tr>
                    <td>Order Id</td>
                    <td>
                      {item.orderId}
                      <Link to={`/myOrders/${item.id}`} className="btn ml-5">
                        <Button variant="success">Get Order Details</Button>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Product Name</td>
                    <td>{_.get(item, "items[0].name")}</td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    <td>{_.get(item, "items[0].quantity")}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td className={`first-letter ${item.status}`}>
                      {item.status}
                    </td>
                  </tr>
                  <tr>
                    <td>Completed</td>
                    <td>{item.complete ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td>Shipment Tracking url</td>
                    <td>{_.get(item, "shipments[0].trackingUrl")}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          );
        })}
      <Backdrop className={classes.backdrop} open={loaderOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default MyOrders;
