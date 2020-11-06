import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Base from "../core/Base";
import axios from "axios";

export default class FilesUploadComponent extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    // this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //     this.handleChange=this.handleChange.bind(this);
    //    this.addVideo=this.addVideo.bind(this);

    this.state = {
      imgCollection: "",
    };
    this.state = {
      loading: false,
    };
    this.state = {
      email: "",
    };
    this.state = {
      password: "",
    };
    // this.state = {
    //   title: "",
    // };
    this.state = {
      status: "",
    };
    this.state = {
      name: "",
    };
    // this.state = {
    //   videoCollection: [],
    // };
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
    console.log(e.target.value);
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
    console.log(e.target.value);
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  //   onChangeTitle(e) {
  //     this.setState({ title: e.target.value });
  //     console.log(e.target.value);
  //   }
  onChangeStatus(e) {
    this.setState({ status: e.target.value });
    console.log(e.target.value);
  }

  //   handleChange(e,index){
  //     this.state.videoCollection[index]=e.target.value
  //     this.setState({videoCollection:this.state.videoCollection})
  //     console.log(this.state.videoCollection)
  //   }

  //   addVideo(){
  //     this.setState({videoCollection:[...this.state.videoCollection, ""]})
  //   }

  onFileChange(e) {
    this.setState({ imgCollection: e.target.files }, () => {
      console.log(this.state.imgCollection);
    });
  }

  onSubmit(e) {
    e.preventDefault();

    var formData = new FormData();
    this.setState({ loading: true });
    // console.log(formData);
    // for (const key of Object.keys(this.state.videoCollection)){
    //   formData.append("videoCollection",this.state.videoCollection[key])
    // }
    if (this.state.status === "Farmer") {
      for (const key of Object.keys(this.state.imgCollection)) {
        formData.append("imgCollection", this.state.imgCollection[key]);
        console.log(this.state.imgCollection[key]);
      }
    }

    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    // formData.append("title", this.state.title);
    formData.append("status", this.state.status);
    console.log(formData);

    axios.post("http://localhost:8000/signUp", formData, {}).then(() => {
      window.location.reload(false);
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            marginLeft: "30%",
            marginRight: "auto",
            marginTop: "20%",
            width: "100%",
          }}
        >
          <h2>Creating User! Please wait...</h2>
          <ReactLoading type={"bars"} color={"#ffff00"} />
        </div>
      );
    }

    return (
      <Base title="Signup page" description="page for user to signup">
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-4"></div>
                <div className="col"></div>
              </div>
              <div className="form-group">
                <label className="">Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label className="">Email</label>
                <input
                  type="email"
                  onChange={this.onChangeEmail}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="">Password</label>
                <input
                  type="password"
                  onChange={this.onChangePassword}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="">Role</label>
                <br></br>
                <div className="container">
                  <div className="row">
                    <div className="col-sm">
                      <input
                        type="radio"
                        name="status"
                        value="Farmer"
                        onChange={this.onChangeStatus}
                      />{" "}
                      Farmer
                    </div>
                    <div className="col-sm">
                      <input
                        type="radio"
                        name="status"
                        value="Buyer"
                        onChange={this.onChangeStatus}
                      />{" "}
                      Buyer
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="">Upload Photos</label>
                <h3>Please upload documents of proof if you are a farmer</h3>
                <br></br>
                <div class="input-group">
                  <div>
                    <input
                      style={{ borderColor: "#0000ff", borderBlock: "solid" }}
                      type="file"
                      className="custom-file"
                      name="imgCollection"
                      onChange={this.onFileChange}
                    />
                  </div>
                </div>
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
}
