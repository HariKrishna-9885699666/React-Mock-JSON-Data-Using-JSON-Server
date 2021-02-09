import React, { useEffect, useState } from "react";
import { getOrder } from "../api/orders";
import { Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import _ from "lodash";

const Order = () => {
  const [order, setOrder] = useState({});
  const { id } = useParams();
  useEffect(async () => {
    setOrder(await getOrder(id));
  }, []);
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
    </div>
  );
};

export default Order;
