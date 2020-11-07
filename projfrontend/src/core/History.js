import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "./Base";
import "./history.css";
import axios from "axios";
function History() {
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("0");
  const [productName, setProductName] = useState("");
  const [location, setLocation] = useState("");
  const [hours, setHours] = useState("");
  const [profit, setProfit] = useState("");
  const [filterUsers, setFilterUser] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.jwt);
    const historyUsers = [];
    userData.user["history"].forEach((obj) => {
      historyUsers.push({
        name: obj.name,
        userType: obj.status,
        productName: obj.productName,
        location: obj.location,
        hours: obj.time,
        profit: obj.price,
      });
    });
    setFilterUser(historyUsers);
  }, []);

  function addUsers() {
    setFilterUser((users) => [
      ...users,
      {
        name: name,
        userType: userType,
        productName: productName,
        location: location,
        hours: hours,
        profit: profit,
      },
    ]);

    const userData = JSON.parse(localStorage.jwt);

    axios.post("http://localhost:8000/addHistory/" + userData.user._id, {
      name: name,
      status: userType,
      location: location,
      time: hours,
      productName: productName,
      price: profit,
    });

    setName("");
    setUserType("0");
    setProductName("");
    setLocation("");
    setHours("");
    setProfit("");
  }

  function displayUsers(users) {
    return users.map((user, index) => (
      <tr key={index}>
        <th scope="col">{index + 1}</th>
        <th scope="col">{user.name}</th>
        {isAutheticated().user.role === 0 && (
          <th scope="col">{user.userType}</th>
        )}
        <th scope="col">{user.location}</th>
        {isAutheticated().user.role === 1 ||
          (isAutheticated().user.role === 0 && (
            <th scope="col">{user.productName}</th>
          ))}
        {isAutheticated().user.role === 2 ||
          (isAutheticated().user.role === 0 && (
            <th scope="col">{user.hours}</th>
          ))}
        <th scope="col">{user.profit}</th>
      </tr>
    ));
  }

  return (
    <Base>
      <div>
        <div className="container-lg">
          <form class="form-inline">
            <div class="form-group mt-3">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control mx-sm-3"
              />
            </div>
            {isAutheticated().user.role === 0 && (
              <div class="form-group mt-3">
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="form-control mx-sm-3"
                >
                  <option value="">Select an Option</option>
                  <option value="Seller">Seller</option>
                  <option value="Tour Guide">Tour Guide</option>
                </select>
              </div>
            )}
            {(isAutheticated().user.role === 1 || userType === "Seller") && (
              <div className="form-group mt-3">
                <select
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                  className="form-control mx-sm-3"
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
            )}
            {(isAutheticated().user.role === 1 || userType === "Seller") && (
              <div className="form-group mt-3">
                <select
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  className="form-control mx-sm-3"
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
            )}
            {(isAutheticated().user.role === 2 ||
              userType === "Tour Guide") && (
              <div className="form-group mt-3">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-control mx-sm-3"
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
            )}
            {(isAutheticated().user.role === 2 ||
              userType === "Tour Guide") && (
              <div class="form-group mt-3">
                <input
                  type="text"
                  placeholder="Hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="form-control mx-sm-3"
                />
              </div>
            )}
            <div class="form-group mt-3">
              <input
                type="text"
                placeholder="Total Profit"
                value={profit}
                onChange={(e) => setProfit(e.target.value)}
                className="form-control mx-sm-3"
              />
            </div>
            <div class="form-group mt-3">
              <button
                type="text"
                style={{
                  "background-color": "#0000ff",
                  borderColor: "#0000ff",
                  borderStyle: "solid",
                  color: "#FFF",
                }}
                className="form-control"
                onClick={(e) => {
                  e.preventDefault();
                  addUsers();
                }}
              >
                Submit
              </button>
            </div>
          </form>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                {isAutheticated().user.role === 0 && (
                  <th scope="col">Status</th>
                )}
                <th scope="col">Location</th>
                {isAutheticated().user.role === 1 ||
                  (isAutheticated().user.role === 0 && (
                    <th scope="col">Product Name</th>
                  ))}
                {isAutheticated().user.role === 2 ||
                  (isAutheticated().user.role === 0 && (
                    <th scope="col">Hours</th>
                  ))}
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>{displayUsers(filterUsers)}</tbody>
          </table>
        </div>
      </div>
    </Base>
  );
}

export default History;
