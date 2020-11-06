import React, { useState } from "react";
import ReactLoading from "react-loading";
import Base from "../core/Base";
import axios from "axios";

function AWS() {
  const [imgCollection, setImageCollection] = useState(null);
  const [formData, setFormData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [type, setType] = useState(null);
  const [quality, setQuality] = useState(null);
  const [rate, setRate] = useState(null);
  const [loadMessage, setLoadMessage] = useState(null);

  function onFileChange(e) {
    const files = Array.from(e.target.files);
    setImageCollection(files[0]);
    const formData = new FormData();

    formData.append("image", files[0]);
    formData.append("vegetable", type);

    setFormData(formData);
  }

  function checkFoodQuality(e) {
    e.preventDefault();
    setLoadMessage("Checking Food Quality...");
    fetch("https://farm-boy.herokuapp.com/prediction", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setFetchedData(json);
        setLoadMessage(null);
      })
      .catch(() => console.log());
  }

  function onSubmit(e) {
    e.preventDefault();

    const finalFormData = new FormData();
    setLoadMessage("Registering Product...");

    finalFormData.append("imgCollection", imgCollection);
    finalFormData.append("rate", rate);
    finalFormData.append("type", type);
    finalFormData.append("quality", quality);

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

              <button onClick={checkFoodQuality} type="submit">
                Check
              </button>
            </div>
            <div className="form-group">
              <label for="type" className="">
                Vegetable Type
              </label>
              <select
                name="type"
                id="type"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="onion">Onion</option>
                <option value="tomato">Tomato</option>
                <option value="cabbage">Cabbage</option>
                <option value="carrot">Carrot</option>
                <option value="garlic">Garlic</option>
                <option value="ginger">Ginger</option>
              </select>
            </div>
            <div className="form-group">
              <label className="">Quality</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setQuality(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="">Rate</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setRate(e.target.value)}
              />
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

export default AWS;
