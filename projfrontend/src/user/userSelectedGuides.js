import React, { Component } from "react";
import Base from "../core/Base";
import ReactLoading from "react-loading";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, Row, Col, Container } from "reactstrap";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

class UserSelectedGuides extends Component {
  state = {
    images: [],
    loading: true,
    selectedImage: "",
    selectedPost: null,
    rate: "",
    productName: "",
    location: "",
    time: "",
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
  postUserImages = () => {
    console.log("post clicked");
    console.log(this.state.offset);
    console.log(this.state.postsPerPage);
    const userData = JSON.parse(localStorage.jwt);
    axios
      .post("http://localhost:8000/selectedSellerImages/" + userData.user._id, {
        userId: userData.user._id,
        offset: this.state.offset,
      })
      .then((response) => {
        const data = response.data;
        this.setState({ images: data, loading: false });
        this.setState({
          pageCount: Math.ceil(
            this.state.images.selectedImagesCount / this.state.postsPerPage
          ),
        });
        console.log(this.state.images);
      })
      .catch((err) => {
        console.log(err);
        alert("Error retrieving data!!!");
        this.setState({ loading: false });
      });
  };

  getUserImages = () => {
    const userData = JSON.parse(localStorage.jwt);
    axios
      .get(
        "http://localhost:8000/selectedSellerImages/" +
          this.props.match.params.userId
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        this.setState({ images: data, loading: false });
        console.log(this.state.images);
        this.setState({
          pageCount: Math.ceil(
            this.state.images.selectedImagesCount / this.state.postsPerPage
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

  //   select = (name, price, location, time) => {
  //     console.log("clicked");

  //     this.setState({
  //       status: "Removed",
  //       status2: "Image is removed!!",
  //     });
  //     this.setState(
  //       { productName: name, rate: price, location: location, time: time },
  //       () => {
  //         console.log("selected Image--", this.state.selectedImage);
  //         const userData = JSON.parse(localStorage.jwt);

  //         axios
  //           .post(
  //             "http://localhost:8000/removeSelectedGuide/" + userData.user._id,
  //             {
  //               name: this.state.productName,
  //               price: this.state.rate,
  //               location: this.state.location,
  //               time: this.state.time,
  //               userId: userData.user._id,
  //             }
  //           )
  //           .then((res) => {
  //             console.log(res.data);
  //           });
  //       }
  //     );
  //   };

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
        this.postUserImages();
      }
    );
  };

  displayImages = (imageData) => {
    const { selectedPost } = this.state;
    const {
      selectedSellerImages = [],
      selectedGuides = [],
      selectedProductNames = [],
    } = imageData;
    const currentPosts = selectedSellerImages.slice(
      this.state.offset,
      this.state.offset + this.state.postsPerPage
    );
    console.log(currentPosts);
    console.log(imageData);
    console.log(selectedSellerImages);
    if (!selectedGuides.length) return null;

    return selectedGuides.map((image, index) => (
      <div key={index} className=".col-sm-4">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Location</th>
              <th scope="col">Time</th>
              {/* <th scope="col">Quality</th> */}
            </tr>
          </thead>
          <tr>
            <th scope="col">{image.name}</th>
            <th scope="col">{image.price}</th>
            <th scope="col">{image.location}</th>
            <th scope="col">{image.time}</th>

            {/* <th scope="col">{locations[index]}</th> */}
          </tr>
        </table>
        {/* <Button id={image.location} style={{alignContent:"center",marginLeft:"100px",marginTop:"20px",marginBottom:"10px"}} value={image.location} onClick={this.select} className="bg-warning text-dark">{this.state.status}</Button> */}
      </div>
    ));
  };

  render() {
    const { loading, images } = this.state;
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
    console.log(this.state.images);
    return (
      <Base title="user Dashboard Page">
        <div className="container">
          <h1>Your Cart</h1>
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
        </div>

        {/* <Modal open={this.state.modal} onClose={this.closeIt} center>
          <h2>Simple centered modal</h2>
          <div>{this.renderModal()}</div>
        </Modal> */}
      </Base>
    );
  }
}

export default UserSelectedGuides;
