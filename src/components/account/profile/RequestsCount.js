import React from "react";

function RequestsCount({ count, desc }) {
  return (
    <div className="order-count-box">
      <div className="order-count-label">{count}</div>
      <div className="order-count-type">{desc}</div>
    </div>
  );
}

export default RequestsCount;
