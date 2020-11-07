import React, { Component } from "react";
import Base from "../core/Base";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import axios from "axios";

class AdminDashboard extends Component {
  state = {
    users: [],
    loading: true,
    id: "",
    selectedImage: "",
    selectedPost: null,
    status: "Yes",
    status2: "",
    modal: false,
    search: "",
  };
  componentDidMount = () => {
    this.getUsers();
  };

  toggle = (id = null) => {
    this.setState({ selectedPost: id, modal: !this.state.modal }, () => {
      console.log(this.state.modal);
      console.log(this.state.selectedPost);
    });
  };

  updateSearch(e) {
    this.setState({ search: e.target.value.substr(0, 20) }, () => {
      console.log(this.state.search);
    });
  }

  closeIt = () => {
    this.setState(
      {
        modal: !this.state.modal,
        status: "Yes",
        status2: "",
        selectedPost: null,
      },
      () => {
        this.getUsers();
      }
    );
  };

  getUsers = () => {
    axios
      .get("http://localhost:8000/getAdmins/")
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        this.setState({ users: data, loading: false });
        console.log(this.state.users);
        console.log("Data has been received!!");
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving data!!!");
        this.setState({ loading: false });
      });
  };

  displayUsers = (users) => {
    let filterUsers = users.filter((user) => {
      return user.name.toLowerCase().indexOf(this.state.search) !== -1;
    });

    return filterUsers.map((user, index) => (
      <tr key={index}>
        <th scope="col">{index + 1}</th>
        <th scope="col">{user.name}</th>
        <th scope="col">{user.title}</th>
        <th scope="col">{user.status}</th>
        <th scope="col">{user.updatedAt.slice(0, 10)}</th>
        <th scope="col">
          <Link
            to={
              (user.role === 1 ? "/farmerImages/" : "/guideStock/") + user._id
            }
            className="text-warning"
          >
            Stock and Prices
          </Link>
        </th>
      </tr>
    ));
  };

  render() {
    const { loading, users } = this.state;
    if (loading) {
      return (
        <div
          style={{
            marginLeft: "30%",
            marginRight: "auto",
            marginTop: "20%",
            width: "100%",
          }}
        >
          <h2>Loading!! Please wait...</h2>
          <ReactLoading type={"bars"} color={"#ffff00"} />
        </div>
      );
    }
    console.log(this.state.users);
    return (
      <Base title="user Dashboard Page">
        <div>
          <div className="container">
            <form class="form-inline">
              <div class="form-group mt-3">
                <input
                  type="text"
                  placeholder="SEARCH USERNAME"
                  id="search"
                  style={{
                    width: "500px",
                    borderColor: "#0000ff",
                    borderStyle: "solid",
                  }}
                  onChange={this.updateSearch.bind(this)}
                  class="form-control mx-sm-3"
                  aria-describedby="passwordHelpInline"
                />
              </div>
            </form>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Username</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              {this.displayUsers(this.state.users)}
            </table>
          </div>
        </div>
      </Base>
    );
  }
}

export default AdminDashboard;
