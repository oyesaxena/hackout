import React, { Component, useState } from "react";
import Base from "../core/Base";
import axios from "axios";

export default class userEdit extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: "",
    };
    this.state = {
      password: "",
    };
    this.state = {
      title: "",
    };
    this.state = {
      status: "",
    };
    this.state = {
      name: "",
    };
    this.state={
        userId:''
    }
    this.state={
        loading:true
    }
  }

  componentDidMount = () => {
    this.getUsers();
    
  }; 

  getUsers=()=>{
      axios.get("http://localhost:8000/userEdit/"+this.props.match.params.userId)
      .then((response)=>{
          console.log(response.data)
          const data= response.data
          this.setState({userId:data._id,name:data.name,email:data.email,status:data.status,title:data.title,loading:false},()=>{console.log("Data has been recieved")})          
      })
      .catch(err =>{ console.log(err)
        alert('Error retrieving data!!!');
        this.setState({ loading: false });})
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
  onChangeTitle(e) {
    this.setState({ title: e.target.value });
    console.log(e.target.value);
  }
  onChangeStatus(e) {
    this.setState({ status: e.target.value });
    console.log(e.target.value);
  }

  

  onSubmit(userId) {
    
    console.log(this.state.name);
    console.log(this.state.email);
    this.setState({userId:userId},()=>{
        axios.post("http://localhost:8000/userEdit", {name:this.state.name,email:this.state.email,password:this.state.password,title:this.state.title,status:this.state.status,userId:this.state.userId}).then((res) => {
            console.log(res.data);
            
          });
    })
    
  }

  

  render() {
      if (this.state.loading){
          return null
      }

    return (
      <Base title="Signup page" description="page for user to signup">
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-4"></div>
                <div className="col">
                  <h4 className="">Edit Customer:</h4>
                </div>
              </div>
              <div className="form-group">
                <label className="">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={this.state.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label className="">Email</label>
                <input
                  type="email"
                  onChange={this.onChangeEmail}
                  placeholder={this.state.email}
                  className="form-control"
                />
              </div>
              {/* <div className="form-group">
                <label className="">Password</label>
                <input
                  type="password"
                  onChange={this.onChangePassword}
                  className="form-control"
                />
              </div> */}
              <div className="form-group">
                <label className="">Title</label>
                <br></br>
                <div className="container">
                  <div className="row">
                    <div className="col-sm">
                      <input
                        type="radio"
                        value="Wedding"
                        onClick={this.onChangeTitle}
                        name="title"
                      />{" "}
                      Wedding
                    </div>
                    <div className="col-sm">
                      <input
                        type="radio"
                        value="Reception"
                        onClick={this.onChangeTitle}
                        name="title"
                      />{" "}
                      Reception
                    </div>
                    <div className="col-sm">
                      <input
                        type="radio"
                        value="Engagement"
                        onClick={this.onChangeTitle}
                        name="title"
                      />{" "}
                      Engagement
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="container">
                  <div className="row">
                    <div className="col-sm">
                      <input
                        type="radio"
                        value="Birthday"
                        onClick={this.onChangeTitle}
                        name="title"
                      />{" "}
                      Birthday
                    </div>
                    <div className="col-sm">
                      <input
                        type="radio"
                        value="Pre Wedding Shoots"
                        onClick={this.onChangeTitle}
                        name="title"
                      />{" "}
                      Pre Wedding Shoots
                    </div>
                    <div className="col-sm">
                      <input
                        type="radio"
                        value="Others"
                        onClick={this.onChangeTitle}
                        name="title"
                      />{" "}
                      Others
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="">Status</label>
                <br></br>
                <div className="container">
                  <div className="row">
                    <div className="col-sm">
                      <input
                        type="radio"
                        name="status"
                        value="Confirmed"
                        onChange={this.onChangeStatus}
                      />{" "}
                      Confirmed
                    </div>
                    <div className="col-sm">
                      <input
                        type="radio"
                        name="status"
                        value="Pending"
                        onChange={this.onChangeStatus}
                      />{" "}
                      Pending
                    </div>
                  </div>
                </div>
              </div>
              {/* <div>
                <label className="">Upload Photos</label>
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="imgCollection"
                  onChange={this.onFileChange}
                  value={this.userId}
                  multiple
                />

                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">
                      Upload
                    </span>
                  </div>
                  <div class="custom-file">
                    <input
                      type="file"
                      name="imgCollection"
                      onChange={this.onFileChange}
                      value={this.userId}
                      multiple
                    />
                    <label class="custom-file-label" for="inputGroupFile01">
                      Choose file
                    </label>
                  </div>
                </div>
              </div> */}

              <button onClick={()=>this.onSubmit(this.state.userId)} type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Base>
    );
  }
}
