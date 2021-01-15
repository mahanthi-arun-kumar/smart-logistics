import React, { useState, useEffect } from "react";
import { Divider } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PastOrders1 from "./PastOrders1";
import NumberOfOrders from "./NumberOfOrders";
import { BASE_URL } from "../../utils/Constants";

//changes needed in this file

function Order(props) {
  const userId = props.logInDetails.userDetail.userId;
  const [selectedAmountSorting, setSelectedAmountSorting] = useState("");
  const [selectedBookingDateSorting, setSelectedBookingDateSorting] = useState(
    ""
  );
  const [
    selectedDeliveryDateSorting,
    setSelectedDeliveryDateSorting,
  ] = useState("");
  const [allOrdersData, setAllOrdersData] = useState([]);
  const [pastOrdersData, setPastOrdersData] = useState([]);
  useEffect(async () => {
    await axios
      .get(`${BASE_URL}/order-transaction/${userId}`)
      .then((res) => {
        let tableData = res.data.filter(
          (data) => data.orderStatus === "inProgress" //orderCost is the important field
        );
        let dataOfOrders = res.data.filter((item) => item.orderCost);

        setPastOrdersData(tableData);
        setAllOrdersData(dataOfOrders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const options = [
    { key: "htl", value: "htl", text: "high ---> low" },
    { key: "lth", value: "lth", text: "low ---> high" },
  ];
  const dateOptions = [
    { key: "nfd", value: "nfd", text: "Newest First" },
    { key: "ofd", value: "ofd", text: "Oldest First" },
  ];

  const history = useHistory();
  const navigateToPlaceOrder = () => {
    history.push("/account/placeOrder", props.logInDetails);
  };

  const OnChange = (e, selectedOption, type) => {
    if (type === "sort-on-amount") {
      setSelectedAmountSorting(selectedOption.value);
      if (selectedOption.value === "lth") {
        let data = [...pastOrdersData];
        data.sort((a, b) => {
          return a.orderCost - b.orderCost;
        });
        setPastOrdersData(data);
      } else {
        let data = [...pastOrdersData];
        data.sort((a, b) => {
          return b.orderCost - a.orderCost;
        });
        setPastOrdersData(data);
      }
    } else if (type === "sort-on-booking-date") {
      setSelectedBookingDateSorting(selectedOption.value);
      if (selectedOption.value === "ofd") {
        let data = [...pastOrdersData];
        data.sort(function (a, b) {
          let aa = a.orderBookingDate.split("/").reverse().join(),
            bb = b.orderBookingDate.split("/").reverse().join();
          return aa < bb ? -1 : aa > bb ? 1 : 0;
        });
        setPastOrdersData(data);
      } else {
        let data = [...pastOrdersData];
        data.sort(function (a, b) {
          let aa = a.orderBookingDate.split("/").reverse().join(),
            bb = b.orderBookingDate.split("/").reverse().join();
          return aa > bb ? -1 : aa > bb ? 1 : 0;
        });
        setPastOrdersData(data);
      }
    } else {
      setSelectedDeliveryDateSorting(selectedOption.value);
      if (selectedOption.value === "ofd") {
        let data = [...pastOrdersData];
        data.sort(function (a, b) {
          let aa = a.delieveredOn.split("/").reverse().join(),
            bb = b.delieveredOn.split("/").reverse().join();
          return aa < bb ? -1 : aa > bb ? 1 : 0;
        });
        setPastOrdersData(data);
      } else {
        let data = [...pastOrdersData];
        data.sort(function (a, b) {
          let aa = a.delieveredOn.split("/").reverse().join(),
            bb = b.delieveredOn.split("/").reverse().join();
          return aa > bb ? -1 : aa > bb ? 1 : 0;
        });
        setPastOrdersData(data);
      }
    }
  };
  const OnOrderTypeChange = (type) => {
    let data = [...allOrdersData];
    if (type === "open") {
      let tableData = data.filter(
        (item) => item.orderStatus === "open" || item.orderStatus === "accepted"
      );
      setPastOrdersData(tableData);
    } else {
      let tableData = data.filter((item) => item.orderStatus === type);
      setPastOrdersData(tableData);
    }
  };
  const OnSortingOrderCost = (type) => {
    let data = [...pastOrdersData];
    if (type === "lowToHigh") {
      data.sort((a, b) => {
        return a.orderCost - b.orderCost;
      });
      setPastOrdersData(data);
    } else {
      data.sort((a, b) => {
        return b.orderCost - a.orderCost;
      });
      setPastOrdersData(data);
    }
  };

  return (
    <div>
      <NumberOfOrders allOrdersData={allOrdersData} />
      <Divider />
      <PastOrders1
        data={pastOrdersData}
        OnOrderTypeChange={OnOrderTypeChange}
        OnSortingOrderCost={OnSortingOrderCost}
        navigateToPlaceOrder={navigateToPlaceOrder}
        allOrdersData={allOrdersData}
        setAllOrdersData={setAllOrdersData}
      />
    </div>
  );
}

export default Order;
