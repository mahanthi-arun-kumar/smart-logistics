import React, { useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import "antd/dist/antd.css";
import { Steps, Popover } from "antd";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants";
import { toLower } from "lodash";

export const getDate = (dateObject, monthName) => {
  var timestamp = new Date(dateObject);
  //   var date = new Date(timestamp);
  var todate = timestamp.getDate();
  var tomonth = timestamp.getMonth();
  var toyear = timestamp.getFullYear();
  var time =
    timestamp.getHours() +
    ":" +
    timestamp.getMinutes() +
    ":" +
    timestamp.getSeconds();
  var original_date = todate + "-" + monthName[tomonth] + "-" + toyear;
  return original_date + " " + time;
};

function Tracking({ open, setOpen, trackingId }) {
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const { Step } = Steps;

  const [progressStep, setProgressStep] = useState(0);
  const [errorResponse, setErrorResponse] = useState();

  const customDot = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          {status === "finish"
            ? "Order Placed"
            : status === "process"
            ? "In Progress"
            : "Delivered"}
        </span>
      }
    >
      {dot}
    </Popover>
  );

  const [trackingHistory, setTrackingHistory] = useState([]);
  const [liveTracking, setLiveTracking] = useState();

  useEffect(() => {
    if (trackingId) {
      axios
        .get(`${BASE_URL}/tracking/history/${trackingId}`)
        .then((res) => {
          setTrackingHistory(res.data);
          if (res.data.length !== 0) {
            setProgressStep(1);
            if (
              toLower(res.data[res.data.length - 1].orderStatus) ===
              "inprogress"
            ) {
              axios
                .get(`${BASE_URL}/tracking/live-address/${trackingId}`)
                .then((response) => {
                  setLiveTracking(response.data[0]);
                  if (response.data[0].orderStatus === "delivered") {
                    setProgressStep(2);
                  }
                })
                .catch((error) => console.log(error));
            }
          }
        })
        .catch((error) => setErrorResponse(error.response.data));
    } else {
      setErrorResponse({ message: "Please enter a valid Tracking ID" });
    }

    return () => {
      setErrorResponse(null);
      setTrackingHistory(null);
      setLiveTracking(null);
      setProgressStep(0);
    };
  }, [, trackingId]);

  return (
    <div>
      <Modal open={open}>
        <Modal.Header> Tracking Details </Modal.Header>
        <Modal.Content scrolling>
          {errorResponse ? (
            <h3 style={{ marginTop: "2rem", color: "#49769c" }}>
              {errorResponse.message}
            </h3>
          ) : (
            <>
              <Steps current={progressStep} progressDot={customDot}>
                <Step
                  style={{ cursor: "pointer" }}
                  title="Order Placed"
                  description="Order is successfully placed. Please wait for shipper to accept."
                />
                <Step
                  title="In Progress"
                  description="Your order is in progress and will be delivered soon"
                />
                <Step
                  title="Delivered"
                  description="Your order is succesfully delivered. Thank you !!"
                />
              </Steps>
              <Steps
                progressDot
                current={
                  trackingHistory && trackingHistory.length !== 0
                    ? (liveTracking && liveTracking.orderStatus ==="inProgress" ? trackingHistory.length - 2 : trackingHistory.length - 1)
                    : 1
                }
                direction="vertical"
              >
                {trackingHistory && trackingHistory.length !== 0 ? (
                  [...trackingHistory]
                    .reverse()
                    .map((history, index) => (
                      <>
                        {liveTracking &&
                        index === trackingHistory.length - 1 ? (
                          <Step
                            title={getDate(
                              liveTracking.trackingTime,
                              monthName
                            )}
                            description={
                              (liveTracking.orderStatus === "inProgress"
                                ? "Reaching"
                                : "Delivered") +
                              " to " +
                              liveTracking.liveAddress
                            }
                          />
                        ) : (
                          <Step
                            title={getDate(history.trackedDate, monthName)}
                            description={"Shipped from " + history.address}
                          />
                        )}
                      </>
                    ))
                ) : (
                  <h3 style={{ marginTop: "2rem", color: "#49769c" }}>
                    Your Order is not yet accepted or tracking is not yet started. Please check after some time
                  </h3>
                )}
              </Steps>
            </>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button color="instagram" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default Tracking;
