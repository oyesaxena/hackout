import React from "react";
import Base from "../core/Base";
import Line from "../core/lineChart";
import Donut from "../core/donutChart";

function AdminData() {
  return (
    <Base>
      <Line />
      <Donut
        data={[
          {
            label: "Onion",
            value: 50,
          },
          {
            label: "Tomato",
            value: 30,
          },
          {
            label: "Cabbage",
            value: 35,
          },
          {
            label: "Carrot",
            value: 90,
          },
          {
            label: "Garlic",
            value: 150,
          },
          {
            label: "Ginger",
            value: 60,
          },
        ]}
      />
    </Base>
  );
}

export default AdminData;
