import React, { Component } from "react";
import Base from "../core/Base";
import ReactLoading from "react-loading";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

import { Button, Modal, ModalBody, Row, Col, Container } from "reactstrap";
class Photos extends Component {
  state = {
    images: [],
    bool: [],
    loading: true,
    selectedImage: "",
    selectedTitle: "",
    selectedPost: null,
    status: "Add to wishlist",
    status2: "",
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
        status: "Add to wishlist",
        status2: "",
        selectedPost: null,
        loading: false,
      },
      () => {
        this.postUserImages();
      }
    );
  };

  postUserImages = () => {
    console.log("post clicked");
    console.log(this.state.offset);
    console.log(this.state.postsPerPage);
    // const userData = JSON.parse(localStorage.jwt);
    axios
      .post(
        "http://localhost:8000/userImages/" + this.props.match.params.userId,
        {
          // userId: userData.user._id,
          offset: this.state.offset,
        }
      )
      .then((response) => {
        const data = response.data;
        this.setState({ images: data, loading: false });
        this.setState({
          pageCount: Math.ceil(
            this.state.images.imagesCount / this.state.postsPerPage
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
    console.log("get clicked");
    const userData = JSON.parse(localStorage.jwt);
    console.log(this.state.offset);
    console.log(this.state.postsPerPage);
    axios
      .get("http://localhost:8000/userImages/" + this.props.match.params.userId)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        this.setState({ images: data, loading: false });
        console.log(this.state.images);

        this.setState({
          pageCount: Math.ceil(
            this.state.images.imagesCount / this.state.postsPerPage
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

  select = (image) => {
    console.log("clicked");

    this.setState({
      status: "Selected",
      status2: "You can view this photo in SELECTED PHOTOS",
    });

    this.setState({ selectedImage: image }, () => {
      console.log("selected Image--", this.state.selectedImage);
      const userData = JSON.parse(localStorage.jwt);

      axios
        .post("http://localhost:8000/selectImage/" + userData.user._id, {
          selectedImage: this.state.selectedImage,
          userId: userData.user._id,
        })
        .then((res) => {
          console.log(res.data);
          this.setState({ loading: false });
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
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;

    const { selectedPost } = this.state;
    const { images = [], rates = [], types = [], quality = [] } = imageData;
    console.log(rates);
    if (!images.length) return null;

    return images.map((image, index) => (
      <div key={index} className=".col-sm-4">
        {/* <h2>{rates[index]}</h2>
        <h2>{types[index]}</h2>
        <h2>{quality[index]}</h2> */}
        <img
          className="small rounded imageBorder"
          onClick={() => this.toggle(image.location)}
          src={image.location}
          style={{
            height: "300px",
            width: "300px",
            margin: "10px 10px",
            borderColor: "#ffff00",
            borderStyle: "solid",
          }}
        />
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Rate/kg</th>
              <th scope="col">Quality</th>
            </tr>
          </thead>
          <tr>
            <th scope="col">{types[index]}</th>
            <th scope="col">{rates[index]}</th>
            <th scope="col">{quality[index]}</th>
          </tr>
        </table>

        {/* <Button id={image.location} style={{alignContent:"center",marginLeft:"100px",marginTop:"20px",marginBottom:"10px"}} value={image.location} onClick={this.select} className="bg-warning text-dark">{this.state.status}</Button> */}

        <Modal
          isOpen={selectedPost === image.location}
          className="mt-2"
          style={{ maxWidth: "600px" }}
        >
          <div className="modal-header bg-warning">
            <h3
              className="modal-title"
              style={{
                textAlign: "center",
                width: "550px",
                wordWrap: "break-word",
              }}
              id="exampleModalLabel"
            >
              {image.originalname.slice(0, -5)}
            </h3>
            <button
              type="button"
              className="close"
              onClick={() => this.closeIt()}
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <ModalBody>
            <Row className="mr-2 ml-2" onClick={this.onshow}>
              <img
                className="small"
                src={image.location}
                alt="no image"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: "450px",
                  width: "500px",
                }}
              />
            </Row>

            <Container className="text-center pt-3">
              <Button
                onClick={() => this.select(image)}
                className="bg-warning text-light"
              >
                {this.state.status}
              </Button>
              <p>{this.state.status2}</p>
            </Container>
          </ModalBody>
        </Modal>
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

    return (
      <div className="myDiv" tabIndex="0" ref="myDiv">
        <Base title="user Dashboard Page">
          <h1>Stocks and Prices of {this.state.images.name}</h1>

          <div className="row">
            {this.displayImages(this.state.images)}

            {/* <Pagination 
        postsPerPage={this.state.postsPerPage}
        totalPosts={images.images.length}
        paginate={()=>this.paginate()} /> */}
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
            activeClassName={"active"}
          />
        </Base>
      </div>
    );
  }
}

export default Photos;
