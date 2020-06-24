import React, { Component } from "react";
import NavBar from '../Navbar'
import {Redirect} from 'react-router-dom';
import './abc.css'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody 
  // MDBChip
} from "mdbreact";

import { Doughnut } from "react-chartjs-2";


class Result extends Component {

  state = {
    result: {
      labels: ["Right Answers", "Wrong Answers"],
      datasets: [
        {
          data: [0,0],
          backgroundColor: ["#28a745", "#dc3545"],
          hoverBackgroundColor: [
            "#28a745",
            "#dc3545"
          ]
        }
      ]
    }
  }
  

  render() {

    if (this.props.location.state && this.props.location.state.isauthrequired) {
      
      console.log("Arvinder", this.state.result.datasets[0].data);
      this.state.result.datasets[0].data[0] = this.props.location.state.result
      this.state.result.datasets[0].data[1] = 10 - this.props.location.state.result
      return (
        <>
        <div>
        <NavBar></NavBar>
        </div> 
        <div className="container-mdb">
        <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
          <MDBContainer>
          {/* <MDBChip className= "chip-mdb" size="md" src="https://mdbootstrap.com/img/Photos/Avatars/img(27).jpg" bgColor="green"
            text="white" waves>  Welcome {this.props.location.state.user}
          </MDBChip> */}
          <br>
          </br>
          <MDBRow>
            <MDBCol md="12">
              <MDBCard>
              <MDBCardBody>
                <div>
                <h2>Your Score : {this.props.location.state.result}/10</h2>
                </div>
                <h2 className="mt-5">Score Analysis</h2>
                <Doughnut data={this.state.result} 
                          options={{ responsive: true }}
                />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          </MDBContainer></form>
          </div>
      </>
      );
    }
    else {
      return <Redirect to='/' />
    }  
  } 
}
export default Result;
