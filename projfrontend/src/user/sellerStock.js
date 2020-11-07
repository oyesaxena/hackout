import React, { useState } from "react";
import ReactLoading from "react-loading";
import Base from "../core/Base";
import axios from "axios";
import { isAutheticated } from "../auth/helper";

function SellerStock() {
  const [imgCollection, setImageCollection] = useState(null);
  const [productName, setProductName] = useState("");
  const [location, setLocation] = useState("");
  const [expectedRate, setExpectedRate] = useState("");
  const [customRate, setCustomRate] = useState("");
  const [loadMessage, setLoadMessage] = useState(null);

  function onFileChange(e) {
    const files = Array.from(e.target.files);
    setImageCollection(files[0]);
  }

  function getEstimatedPrice(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("location", location);

    setLoadMessage("Getting Estimated Price...");
    fetch("https://sell-guide.herokuapp.com/prediction", {
      method: "POST",
      body: formData,
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

    const finalFormData = new FormData();
    setLoadMessage("Registering Product...");

    finalFormData.append("imgCollection", imgCollection);
    finalFormData.append("productName", productName);
    finalFormData.append("location", location);
    finalFormData.append("rate", customRate);

    const userData = JSON.parse(localStorage.jwt);

    axios
      .post(
        "http://localhost:8000/upload/" + userData.user._id,
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
            {isAutheticated().user.role === 1 && (
              <div className="form-group">
                <label className="">Upload Photos</label>
                <br></br>
                <div className="input-group">
                  <div>
                    <input
                      style={{ borderColor: "#0000ff", borderBlock: "solid" }}
                      type="file"
                      className="custom-file"
                      name="imgCollection"
                      onChange={onFileChange}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="form-group">
              <label className="">Product Name</label>
              <select
                name="type"
                id="type"
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
                className="form-control"
              >
                <option value="">Select an Option</option>
                <option value="Small Wooden Handicrafts">
                  Small Wooden Handicrafts
                </option>
                <option value="Glasswork door hanging">
                  Glasswork door hanging
                </option>
                <option value="Terracotta Sculpture">
                  Terracotta Sculpture
                </option>
                <option value="Cane Mat">Cane Mat</option>
                <option value="Pashmina Shawls">Pashmina Shawls</option>
                <option value="Small Wooden Handicrafts">
                  Small Wooden Handicrafts
                </option>
              </select>
            </div>
            <div className="form-group">
              <label className="">Location</label>
              <select
                name="type"
                id="type"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className="form-control"
              >
                <option value="">Select an Option</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Kashmir">Kashmir</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <button
              className="btn btn-primary btn-block"
              onClick={getEstimatedPrice}
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
            {isAutheticated().user.role === 1 && (
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
            {isAutheticated().user.role === 1 && (
              <button type="submit" className="btn btn-warning btn-block">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </Base>
  );
}

export default SellerStock;
