import React, { useState, Component } from "react";
import LineChart, { parseFlatArray } from "react-linechart";
// import '../node_modules/react-linechart/dist/styles.css';

export default class Line extends Component {
  render() {
    const gsmData = [
      {
        Name: 1,
        Price: 50,
      },
      {
        Name: 2,
        Price: 30,
      },
      {
        Name: 3,
        Price: 35,
      },
      {
        Name: 4,
        Price: 90,
      },
      {
        Name: 5,
        Price: 150,
      },
      {
        Name: 6,
        Price: 60,
      },
    ];
    const gsmFlat = parseFlatArray(gsmData, "Name", ["Price"]);

    return (
      <div className="lineChart-container">
        <form className="lineChart">
          <div className="App">
            <h1>Vegetable Price Statistics</h1>
            <LineChart
              width={950}
              height={400}
              showLegends
              legendPosition="bottom-right"
              onPointHover={(obj) =>
                `Vegetable Index: ${obj.x}<br />Price: ${obj.y}`
              }
              data={gsmFlat}
            />
          </div>
        </form>
      </div>
    );
  }
}
