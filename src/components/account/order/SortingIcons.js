import React, { useState } from "react";
import { Button, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

function SortingIcons({ OnSortingOrderCost }) {
  const [selctedOption, setSelectedOption] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Icon
        style={
          selctedOption === 1 || selctedOption === 0
            ? { color: "black" }
            : { color: "white" }
        }
        onClick={() => {
          setSelectedOption(1);
          OnSortingOrderCost("lowToHigh");
        }}
        name="triangle up"
      ></Icon>
      <Icon
        style={
          selctedOption === 2 || selctedOption === 0
            ? { color: "black" }
            : { color: "white" }
        }
        onClick={() => {
          setSelectedOption(2);
          OnSortingOrderCost("highToLow");
        }}
        name="triangle down"
      ></Icon>
    </div>
  );
}

export default SortingIcons;
