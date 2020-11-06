// this.props.match.params.userId
import React, { Component } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Modal, ModalBody, Row, Col, Container } from "reactstrap";
import ReactPaginate from "react-paginate";
// import "././Pagination.css";

class Selected extends Component {
  state = {
    images: [],
    loading: true,
    selectedImage: "",
    selectedPost: null,
    status: "Remove from wishlist",
    status2: "",
    modal: false,
    offset: 0,
    modal: false,
    currentPage: 1,
    postsPerPage: 8,
    pageCount: 0,
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
        status: "Remove from wishlist",
        status2: "",
        selectedPost: null,
      },
      () => {
        this.getUserImages();
      }
    );
  };

  getUserImages = () => {
    axios
      .get(
        "http://localhost:8000/selectedImages/" + this.props.match.params.userId
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        this.setState({ images: data, loading: false });
        this.setState({
          pageCount: Math.ceil(
            this.state.images.selectedImages.length / this.state.postsPerPage
          ),
        });
        console.log(this.state.pageCount);
        console.log("Data has been received!!");
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving data!!!");
        this.setState({ loading: false });
      });
  };

  select = (imageLocation) => {
    console.log("clicked");
    console.log(imageLocation);
    this.setState({
      status: "Removed",
      status2: "Image is removed!! Please reload the page",
    });
    this.setState({ selectedImage: imageLocation }, () => {
      console.log("selected Image--", this.state.selectedImage);
      const userData = JSON.parse(localStorage.jwt);

      axios
        .post(
          "http://localhost:8000/removeSelectedImage/" + userData.user._id,
          {
            selectedImage: this.state.selectedImage,
            userId: userData.user._id,
          }
        )
        .then((res) => {
          console.log(res.data);
        });
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
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage);
    const offset = selectedPage * this.state.postsPerPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.getUserImages();
      }
    );
  };

  download = (imageData) => {
    const { selectedImages = [] } = imageData;

    return selectedImages.map((image, index) => window.open(image.location));
  };

  displayImages = (imageData) => {
    const { selectedPost } = this.state;
    const { selectedImages = [] } = imageData;
    const currentPosts = selectedImages.slice(
      this.state.offset,
      this.state.offset + this.state.postsPerPage
    );
    console.log(currentPosts);
    console.log(imageData);
    console.log(selectedImages);
    if (!selectedImages.length) return null;

    return currentPosts.map((image, index) => (
      <div key={index} className=".col-sm-4">
        <img
          className="small rounded imageBorder"
          onClick={() => this.toggle(image)}
          src={image.location}
          style={{
            height: "300px",
            width: "300px",
            margin: "10px 10px",
            borderColor: "#ffff00",
            borderStyle: "solid",
          }}
        />
      </div>
    ));
  };

  render() {
    const { loading, images } = this.state;
    if (loading) {
      return <h2>loading...</h2>;
    }
    console.log(this.state.images);
    return (
      <Base title="user Dashboard Page">
        <h1>Selected Vegetables of {this.state.images.name}</h1>
        <Link onClick={() => this.download(this.state.images)}>
          Download all
        </Link>
        <div className="row">{this.displayImages(this.state.images)}</div>
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
          activeClassName={"active"}
        />
      </Base>
    );
  }
}

export default Selected;
