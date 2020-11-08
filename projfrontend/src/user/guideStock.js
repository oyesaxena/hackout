import React, { useState } from "react";
import ReactLoading from "react-loading";
import Base from "../core/Base";
import axios from "axios";
import { isAutheticated } from "../auth/helper";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Agra",
    time: 270,
  },
  {
    name: "Mumbai",
    time: 250,
  },
  {
    name: "Chennai",
    time: 150,
  },
  { name: "Delhi", time: 300 },
];

function GuideStock() {
  const [type, setType] = useState("");
  const [quality, setQuality] = useState("");
  const [expectedRate, setExpectedRate] = useState("");
  const [customRate, setCustomRate] = useState("");
  const [loadMessage, setLoadMessage] = useState(null);

  function checkFoodQuality(e) {
    e.preventDefault();

    const placeData = new FormData();
    placeData.append("place", quality);
    placeData.append("hours", type);

    setLoadMessage("Getting Expected Price...");

    fetch("http://to-guide.herokuapp.com/prediction", {
      method: "POST",
      body: placeData,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setExpectedRate(json["expected_price"]);
        setCustomRate(json["expected_price"]);
        setLoadMessage(null);
      })
      .catch(() => console.log());
  }

  function onSubmit(e) {
    e.preventDefault();

    const data = {
      place: quality,
      hours: type,
      rate: customRate,
    };

    setLoadMessage("Registering Product...");

    const userData = JSON.parse(localStorage.jwt);

    axios
      .post("http://localhost:8000/uploadGuideStock/" + userData.user._id, data)
      .then(() => {
        window.location.reload(false);
      })
      .catch(console.log);
  }

  return loadMessage !== null ? (
    <div
      style={{
        marginLeft: "30%",
        marginRight: "auto",
        marginTop: "20%",
        width: "100%",
      }}
    >
      <h2>{loadMessage}</h2>
      <ReactLoading type={"bars"} color={"#ffff00"} />
    </div>
  ) : (
    <Base>
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="">Hours</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-control"
              ></input>
            </div>
            <div className="form-group">
              <label className="">Places</label>
              <select
                name="type"
                id="type"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="form-control"
              >
                <option value="">Select an Option</option>
                <option value="Agra">Agra</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Pune">Pune</option>
              </select>
            </div>
            <button
              onClick={checkFoodQuality}
              className="btn btn-primary btn-block"
            >
              Check
            </button>
            <div className="form-group">
              <label className="">Expected Rate</label>
              <input
                type="text"
                className="form-control"
                value={expectedRate}
                readOnly
              />
            </div>
            {isAutheticated().user.role === 2 && (
              <div className="form-group">
                <label className="">Your Rate</label>
                <input
                  type="text"
                  className="form-control"
                  value={customRate}
                  onChange={(e) => setCustomRate(e.target.value)}
                />
              </div>
            )}
            {isAutheticated().user.role === 2 && (
              <button type="submit" className="btn btn-warning btn-block">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="row">
        <div
          className="col-md-6 offset-sm-3 text-left"
          style={{ height: 350, paddingLeft: 100, paddingRight: 100 }}
        >
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="time" stackId="a" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Base>
  );
}

export default GuideStock;
