// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const User = props => (
//   <tr>
//     <td>{props.user.username}</td>
//   </tr>
// )

// export default class UserList extends Component {
//   constructor(props) {
//     super(props);

    

//     this.state = {exercises: []};
//   }

//   componentDidMount() {
//     axios.get('http://localhost:8000/exercises/')
//       .then(response => {
//         this.setState({ exercises: response.data })
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   }

//   deleteExercise(id) {
//     axios.delete('http://localhost:8000/exercises/'+id)
//       .then(response => { console.log(response.data)});

//     this.setState({
//       exercises: this.state.exercises.filter(el => el._id !== id)
//     })
//   }

//   exerciseList() {
//     return this.state.exercises.map(currentexercise => {
//       return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
//     })
//   }

//   render() {
//     return (
//       <div>
//         <h3>Logged Exercises</h3>
//         <table className="table">
//           <thead className="thead-light">
//             <tr>
//               <th>Username</th>
//               <th>Description</th>
//               <th>Duration</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             { this.exerciseList() }
//           </tbody>
//         </table>
//       </div>
//     )
//   }
// }
