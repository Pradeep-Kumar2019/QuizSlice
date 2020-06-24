import React, { Component } from "react";
import quizData from "../test.json";
import NavBar from '../Navbar'
import QuizBar from '../Quizbar'
import {Redirect} from 'react-router-dom';
import './abc.css'
import Timer from 'react-compound-timer'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput, 
  MDBCardTitle
} from "mdbreact";



class Quiz extends Component {
  
  constructor(props) {
    super(props);
    var remainingTime = localStorage.getItem("remainingTime")
    remainingTime = remainingTime || 600000;
    this.state = {
      radio: 2,
      selected: {},
      result: 0,
      redirectToReferrer: false,
      reload: false,
      remainingTime: remainingTime
    }

    setInterval(() => {
      var remainingTime = this.state.remainingTime - 1000;
      localStorage.setItem("remainingTime",remainingTime)
      this.setState({remainingTime:remainingTime });
    }, 1000)
    }


onClick = (qindex,aindex) => () => {
  const selectedvalue = {...this.state.selected};
  selectedvalue[qindex] = aindex;
  this.setState({
    selected: selectedvalue
  });
}

clickme() {
  console.log("Submit")
  //this.onSubmit()
  document.getElementById("submitbutton").click()
}



onSubmit = () => () => {
  console.log(this.state.selected)
  console.log(this.props.location.state.user)
  fetch('http://169.48.88.7:5000/submitanswer', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: this.props.location.state.user,
          answers: this.state.selected,
        }),
        }).then(res => {
          if(!res.ok) throw new Error(res.status);
          else return res.json();
        }).then(resData => {
            this.setState({result:resData.Result});
            this.setState({redirectToReferrer:true});
        })
        .catch((error) => {
        console.log('error: ' + error);
        this.setState({ redirectToReferrer: false });
      });
  
}
  render() {

    const redirectToReferrer = this.state.redirectToReferrer;
    //const reloadvalue = this.state.reload
    if (redirectToReferrer === true) {
      return <Redirect to={{ 
          pathname: '/result',
          state: { isauthrequired: this.props.location.state.isauthrequired, 
                   user: this.props.location.state.user,
                   result: this.state.result }
      }} />
    }   
    
    if (this.props.location.state && this.props.location.state.isauthrequired) {
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
          <QuizBar></QuizBar>
          <MDBRow> 
          <MDBCol md="12">
              <MDBCard>
              <div className="quiz-timer">
              Time Left:
              <Timer 
                initialTime= {this.state.remainingTime}
                direction="backward"
                checkpoints={[
                   {
                       time: 0,
                       callback: () => this.clickme(),
                    },
                ]}
              >   
              {() => (
                 <React.Fragment>
                     <Timer.Minutes /> minutes
                     <Timer.Seconds /> seconds
                  </React.Fragment>
              )}
              </Timer>
              </div>
              <MDBCardBody>
                {quizData.map((dataq,qindex) => (
                  <div key={qindex}>
                  <MDBCardTitle> 
                  {dataq.id}.  {dataq.question} 
                  </MDBCardTitle>
                  <div className="black-text">
                  {dataq.options.map((option,aindex) => (
                  <MDBInput key={aindex}
                      onClick={this.onClick(dataq.id,option)} checked={this.state.selected[dataq.id]===option ? true : false} 
                      label= {option} type="radio" id="radio1" />
                      ))}
                  </div>
                  
                  </div>
                 ))}
                 <div className="text-center mt-4">
                    <MDBBtn id="submitbutton" onClick={this.onSubmit()} color="primary" className="mb-3" type="button">
                      Submit Quiz 
                  </MDBBtn>
                  </div> 
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
export default Quiz;
