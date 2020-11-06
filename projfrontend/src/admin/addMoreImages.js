import React, { Component, useState } from "react";
import {Link} from 'react-router-dom'
import ReactLoading from 'react-loading';
import Base from "../core/Base";
import axios from "axios";


export default class AddMoreImages extends Component {
  constructor(props) {
    super(props);
    
    this.onFileChange = this.onFileChange.bind(this);


    this.state = {
      imgCollection: "",
    };
    this.state={
      loading:false
    }
    this.state={
        userId:''
      }
      this.state={
        name:''
      }
    
  }
  componentDidMount = () => {
    this.getUsers();
    
  }; 

  onFileChange(e) {
    this.setState({ imgCollection: e.target.files },()=>{console.log(this.state.imgCollection)});
  }
  getUsers=()=>{
    axios.get("http://localhost:8000/userAddImages/"+this.props.match.params.userId)
    .then((response)=>{
        console.log(response.data)
        const data= response.data
        this.setState({userId:data._id,name:data.name,loading:false},()=>{console.log("Data has been recieved")})          
    })
    .catch(err =>{ console.log(err)
      alert('Error retrieving data!!!');
      this.setState({ loading: false });})
}

  onSubmit(e) {
    e.preventDefault()
    console.log(this.state.imgCollection)
    var formData = new FormData();
    
    console.log(formData);
    for (const key of Object.keys(this.state.imgCollection)) {
      formData.append("imgCollection", this.state.imgCollection[key]);
      console.log(this.state.imgCollection[key]);
    }
    formData.append("userId",this.state.userId)
    console.log(formData);

    axios.post("http://localhost:8000/userAddImages/"+this.props.match.params.userId, formData, {}).then(() => {
     
      this.getUsers()
      window.location.reload(false);
      
    });
  }

  render() {
      console.log(this.state.name)
      console.log(this.state.userId)
    if (this.state.loading) {
      return <div style={{marginLeft:"30%",marginRight:"auto",marginTop:"20%",width:"100%"}}> 
      <h2>Creating User! Please wait...</h2>
      <ReactLoading type={"bars"}  color={"#ffff00"} />
    </div>
    }
    
    return (
      <Base title="Signup page" description="page for user to signup">
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
          <div className="form-group">
                <label className="">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={this.state.name}
                  
                 
                  readOnly
                />
              </div>
            <form onSubmit={(e)=>this.onSubmit(e)}>
              <div className="row">
                <div className="col-4"></div>
                <div className="col">
                </div>
              </div>
              <div className="form-group">
              <label className="">Add Photos</label>
              <br></br>
                <div class="input-group">
                  <div>
                  
                    <input
                      style={{ borderColor: "#0000ff", borderBlock: "solid" }}
                      type="file"
                      className="custom-file"
                      name="imgCollection"
                      onChange={this.onFileChange} 
                      multiple
                    />
                    
                  </div>
                </div>
              </div>
            
              

              <button type="submit" className="btn btn-warning btn-block">
                Add Images
              </button>
            </form>
          </div>
        </div>
      </Base>
      
    );
  }
}