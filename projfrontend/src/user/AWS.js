import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Base from "../core/Base";
import axios from "axios";
import { forEach } from "lodash";

export default class FilesUploadComponent extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onChangeRate = this.onChangeRate.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    //   this.onChangePassword = this.onChangePassword.bind(this);
    //   this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeQuality = this.onChangeQuality.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
    //   this.handleChange=this.handleChange.bind(this);
    //  this.addVideo=this.addVideo.bind(this);

    this.state = {
      imgCollection: "",
    };
    this.state = {
      loading: false,
    };
    this.state = {
      type: "",
    };
    // this.state = {
    //   password: "",
    // };
    // this.state = {
    //   title: "",
    // };
    this.state = {
      quality: "",
    };
    this.state = {
      rate: "",
    };
    // this.state = {
    //   videoCollection: [],
    // };
  }

  onChangeRate(e) {
    this.setState({ rate: e.target.value });
    console.log(e.target.value);
  }
  onChangeType(e) {
    this.setState({ type: e.target.value });
    console.log(e.target.value);
  }
  // onChangePassword(e) {
  //   this.setState({ password: e.target.value });
  // }
  // onChangeTitle(e) {
  //   this.setState({ title: e.target.value });
  //   console.log(e.target.value);
  // }
  onChangeQuality(e) {
    this.setState({ quality: e.target.value });
    console.log(e.target.value);
  }

  // handleChange(e,index){
  //   this.state.videoCollection[index]=e.target.value
  //   this.setState({videoCollection:this.state.videoCollection})
  //   console.log(this.state.videoCollection)
  // }

  // addVideo(){
  //   this.setState({videoCollection:[...this.state.videoCollection, ""]})
  // }

  onFileChange(e) {
    this.setState({ imgCollection: e.target.files }, () => {
      console.log(this.state.imgCollection[0]);

      const h = {};
      let data = new FormData();
      data.append("image", this.state.imgCollection[0]);
      data.append("name", this.state.imgCollection[0].name);

      console.log(data);
    });
  }

  onCheck(e) {
    e.preventDefault();
    var formData = new FormData();
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append("imgCollection", this.state.imgCollection[key]);
      console.log(this.state.imgCollection[key]);
    }
    console.log("check--", formData);
    formData.append("type", this.state.type);
    axios
      .post("https://farm-boy.herokuapp.com/prediction", formData, {})
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubmit(e) {
    e.preventDefault();

    var formData = new FormData();
    this.setState({ loading: true });
    console.log(formData);
    // for (const key of Object.keys(this.state.videoCollection)){
    //   formData.append("videoCollection",this.state.videoCollection[key])
    // }
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append("imgCollection", this.state.imgCollection[key]);
      console.log(this.state.imgCollection[key]);
    }
    formData.append("rate", this.state.rate);
    formData.append("type", this.state.type);
    // formData.append("password", this.state.password);
    // formData.append("title", this.state.title);
    formData.append("quality", this.state.quality);
    console.log(formData);

    const userData = JSON.parse(localStorage.jwt);

    axios
      .post("http://localhost:8000/upload/" + userData.user._id, formData, {})
      .then(() => {
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
                <label className="">Upload Photos</label>
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

                <button onClick={this.onCheck} type="submit">
                  Check
                </button>
              </div>
              <div className="form-group">
                <label for="type" className="">
                  Vegetable Type
                </label>
                <select name="type" id="type" onChange={this.onChangeType}>
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
                  onChange={this.onChangeQuality}
                />
              </div>
              <div className="form-group">
                <label className="">Rate</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChangeRate}
                />
              </div>
              {/* <div className="form-group">
                <label className="">Sample Videos</label>
               <p style={{color:"#ffff00"}}>Click add more to add IDs of youtube videos</p>
                </div>
                { 
                  
                  this.state.videoCollection.map((video,index)=>{
                    return(
                      <div key={index}>
                      <input onChange={(e)=>this.handleChange(e,index)} value={video} /> 
                      </div>
                    )
                  })
                }
                <Link style={{color:"#ffff00"}} onClick={()=>this.addVideo()}>Add more</Link> */}

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
