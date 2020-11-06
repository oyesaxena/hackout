import React, { Component } from "react";
import Base from "../core/Base";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import "./Pagination.css";
import "../core/Homemin.css"

import { Button, Modal, ModalBody, Row, Col, Container } from "reactstrap";
class Videos extends Component {
  state = {
    images: [],
    bool:[],
    loading: true,
    selectedImage: "",
    selectedTitle:"",
    selectedPost: null,
    status: "Add to wishlist",
    status2: "",
    offset: 0,
    modal: false,
    currentPage: 1,
    postsPerPage: 8,
    pageCount:0
    // showResults:false
  };

  componentDidMount = () => {
    this.getUserImages();
  };

  toggle = (img = null) => {
    this.setState({ selectedPost: img, modal: !this.state.modal }, () => {
      console.log(this.state.modal);
      console.log(this.state.selectedPost);
    });
  };

  closeIt = () => {
    this.setState(
      {
        modal: !this.state.modal,
        status: "Add to wishlist",
        status2: "",
        selectedPost: null,
        loading: false,
      },
      () => {
        this.getUserImages();
      }
    );
  };

  getUserImages = () => {
    const userData = JSON.parse(localStorage.jwt);
    axios
      .get("http://localhost:8000/userVideos/" + userData.user._id)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        this.setState({ images: data, loading: false });
        console.log(this.state.images)
        this.setState({
          pageCount: Math.ceil(this.state.images.images.length / this.state.postsPerPage),
    
        });
        console.log(this.state.pageCount)
        console.log("Data has been received!!");
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving data!!!");
        this.setState({ loading: false });
      });
  };

 

  renderModal = () => {
    if (this.state.selectedPost !== null) {
      const image = this.state.images[this.state.selectedPost];
      console.log(image);
      return (
        <div style={{ width: 400, height: 400, backgroundColor: "orange" }}>
          <img src={image} />
          <button>Add</button>
        </div>
      );
    }
  };

  paginate = (pageNumber) => {
    console.log(pageNumber);
    this.setState({ currentPage: pageNumber }, () => {
      console.log(this.state.currentPage);
    });
  };

  pagination = (postsPerPage, totalPosts) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <Link onClick={() => this.paginate(number)} className="page-link">
                {number}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  handlePageClick = e => {
    const selectedPage = e.selected;
    console.log(selectedPage);
    const offset = selectedPage * this.state.postsPerPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset
      },
      () => {
        this.getUserImages();
      }
    );
  };

  displayImages = (imageData) => {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    
    const { selectedPost } = this.state;
    const { videos = [] } = imageData;
    const currentPosts = videos.slice(this.state.offset,
      this.state.offset + this.state.postsPerPage);
    console.log(currentPosts);
    if (!videos.length) return null;

    return currentPosts.map((video, index) => (
        
      <div key={index} className=".col-sm-4">
        <iframe width="500px" height="315px"  style={{margin:"20px"}}
                src={"//www.youtube.com/embed/"+video} 
                frameBorder="20"
                allowFullScreen
                
                ></iframe>
                
        
        {/* <Button id={image.location} style={{alignContent:"center",marginLeft:"100px",marginTop:"20px",marginBottom:"10px"}} value={image.location} onClick={this.select} className="bg-warning text-dark">{this.state.status}</Button> */}

        
      </div>
    ));
  };

  render() {
    const { loading, images } = this.state;
    
    if (loading) {
      return <h2>Loading...</h2>;
    }
    console.log(this.state.images);
    
    console.log(this.state.postsPerPage);

    return (
      <Base title="user Dashboard Page">
        <h1>This is photos page</h1>

        <div className="row">
          {this.displayImages(this.state.images)}
        </div>
        
        <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
        
        </Base>
    );
  }
}

export default Videos;
