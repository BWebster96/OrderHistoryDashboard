import React from "react";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";

export default function OrdersDashCard(props) {
  const order = props.orderProp;
  let statusColor = "neutral-first";
  let statusTextColor =
    "px-4 py-1 h-auto text-first text-capitalize font-size-sm border-0";
  if (order.status === "Completed") {
    statusColor = "neutral-success";
    statusTextColor =
      "px-4 py-1 h-auto text-success text-capitalize font-size-sm border-0";
  } else if (order.status === "Rejected" || order.status === "Cancelled") {
    statusColor = "neutral-danger";
    statusTextColor =
      "px-4 py-1 h-auto text-danger text-capitalize font-size-sm border-0";
  } else if (order.status === "Processing") {
    statusColor = "neutral-primary";
    statusTextColor =
      "px-4 py-1 h-auto text-primary text-capitalize font-size-sm border-0";
  }

  return (
    <>
      <tr>
        <td className="text-center">
          <div>
            <span className="font-weight-bold text-black">{order.name}</span>
            <span className="text-black-50 d-block">{order.orderId}</span>
          </div>
        </td>
        <td className="text-center">
          <span className="font-weight-bold">
            Updated: {order.modified}
            <br />
            Placed: {order.created}
          </span>
        </td>
        <td className="text-center">
          <span className="font-weight-bold">
            {order.trackingUrl}
            <br />
            {order.trackingCode}
          </span>
        </td>
        <td className="text-center">
          <Badge className={statusTextColor} color={statusColor}>
            {order.status}
          </Badge>
        </td>
        <td className="text-center">
          <span className="font-weight-bold">${order.total}</span>
        </td>
      </tr>
      <tr className="divider"></tr>
    </>
  );
}

OrdersDashCard.propTypes = {
  orderProp: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    trackingCode: PropTypes.string,
    trackingUrl: PropTypes.string,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
  }),
};
