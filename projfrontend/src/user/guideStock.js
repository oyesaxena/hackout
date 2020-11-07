import React, { useState } from "react";
import ReactLoading from "react-loading";
import Base from "../core/Base";
import axios from "axios";

function SellerStock() {
  const [type, setType] = useState(null);
  const [quality, setQuality] = useState(null);
  const [rate, setRate] = useState(null);
  const [loadMessage, setLoadMessage] = useState(null);

  function checkFoodQuality(e) {
    e.preventDefault();

    const placeData = new FormData();
    placeData.append("place", quality);
    placeData.append("hours", type);

    setLoadMessage("Checking Food Quality...");

    fetch("http://to-guide.herokuapp.com/prediction", {
      method: "POST",
      body: placeData,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setRate(json["expected_price"]);
        setLoadMessage(null);
      })
      .catch(() => console.log());
  }

  function onSubmit(e) {
    e.preventDefault();

    const finalFormData = new FormData();
    setLoadMessage("Registering Product...");

    finalFormData.append("place", quality);
    finalFormData.append("hours", type);
    finalFormData.append("rate", rate);

    const userData = JSON.parse(localStorage.jwt);

    axios
      .post(
        "http://localhost:8000/uploadGuideStock/" + userData.user._id,
        finalFormData,
        {}
      )
      .then(() => {
        window.location.reload(false);
      });
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
              <button onClick={checkFoodQuality} type="submit">
                Check
              </button>
            </div>
            <div className="form-group">
              <label for="type" className="">
                Hours
              </label>
              <input
                type="text"
                onChange={(e) => setType(e.target.value)}
                className="form-control"
              ></input>
            </div>
            <div className="form-group">
              <label for="type" className="">
                Places
              </label>
              <select
                name="type"
                id="type"
                onChange={(e) => setQuality(e.target.value)}
              >
                <option value={null}>Select an Option</option>
                <option value="Agra">Agra</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Pune">Pune</option>
              </select>
            </div>
            <div className="form-group">
              <label className="">Rate</label>
              <input type="text" className="form-control" value={rate} />
            </div>
            <button type="submit" className="btn btn-warning btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
}

export default SellerStock;
