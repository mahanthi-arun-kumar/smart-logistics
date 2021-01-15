import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./PastOrders.css";
import moment from "moment";

export default function PastOrders(props) {
  let tableData = props.data;

  return (
    <Table>
      <Thead>
        <Tr className="table-row">
          <Th className="tableData">Tracking Id</Th>
          <Th className="tableData">From</Th>
          <Th className="tableData">To</Th>
          <Th className="tableData">Amount</Th>
          <Th className="tableData">Status</Th>
          <Th className="tableData">Booked On</Th>
          <Th className="tableData">Delivered On</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tableData.length !== 0 ? (
          tableData.map((data, index) => {
            var timestamp = new Date(data.orderBookingDate);
            var todate = new Date(timestamp).getDate();
            var tomonth = new Date(timestamp).getMonth() + 1;
            var toyear = new Date(timestamp).getFullYear();
            var original_date = tomonth + "/" + todate + "/" + toyear;
            return (
              <Tr className={index % 2 === 0 ? "cn1" : "cn2"}>
                <Td className="tableData">{data.trackingId}</Td>
                <Td className="tableData">{data.pickupAddress}</Td>
                <Td className="tableData">{data.dropAddress}</Td>
                <Td className="tableData">{data.orderCost}</Td>
                <Td className="tableData">{data.orderStatus}</Td>
                <Td className="tableData">{original_date}</Td>
                <Td className="tableData">not yet </Td>
              </Tr>
            );
          })
        ) : (
          <Tr>
            <Td style={{ fontSize: "1.5rem", paddingTop: "1rem" }}>
              No orders placed yet
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
}
