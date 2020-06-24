import React, { Component } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './abc.css'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput,
  MDBCardImage,
  MDBCardTitle
} from "mdbreact";
import {Redirect} from 'react-router-dom';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
        name: "",
        email: "",
        password: "",
        redirectToReferrer: false,
        resultpath: false,
        result: 0
    }

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  };
  
    submitHandler = event => {
       
        event.preventDefault();
        event.target.className += " was-validated";
      
      fetch('http://169.48.88.7:5000/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
        }).then(res => {
          localStorage.setItem("remainingTime",600000)
          if(!res.ok) throw new Error(res.status);
          else return res.json();
        }).then(resData => {
            this.setState({name:resData.name});
            console.log(resData)
            console.log(resData.Result)
            if (resData.Result != null) {
              console.log(resData.Result)
              this.setState({result:resData.Result});
              this.setState({resultpath:true});
              this.setState({redirectToReferrer:true});
            }
            this.setState({redirectToReferrer:true});
        })
        .catch((error) => {
        console.log('error: ' + error);
        alert("Invalid login")
        this.setState({ redirectToReferrer: false });
      });
    };
        
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
      
    render() {
      const redirectToReferrer = this.state.redirectToReferrer;
      const resultpath = this.state.resultpath;
      if (resultpath === true) {
        return <Redirect to={{ 
          pathname: "/result",
          state: { isauthrequired: true,
                   user: this.state.name,
                   result: this.state.result}
        }} />
    }   
    
        if (redirectToReferrer === true) {
            return <Redirect to={{ 
              pathname: '/quiz',
              state: { isauthrequired: true,
                       user: this.state.name,}
            }} />
        }   
        
        return(
          
          <div className="container-mdb-login">
          <form
                className="needs-validation"
                onSubmit={this.submitHandler}
                noValidate
            >
            <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <MDBCard>
                <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                  waves />
                  <MDBCardBody>
                  <MDBCardTitle>Employee Details</MDBCardTitle>
                      <div className="grey-text">
                      <MDBInput classname="label-mdb" label="Email" icon="envelope" name="email" onChange={this.changeHandler} type="email" id="email" required></MDBInput>
                      <MDBInput label="Password" icon="key" name="password" onChange={this.changeHandler} type="password" id="password" required></MDBInput> 
                      </div>
                    <div className="text-center mt-4">
                      <MDBBtn color="primary" className="mb-3" type="submit">
                        Login 
                      </MDBBtn>
                    </div> 
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            </MDBContainer></form>
            </div>
        )
    }
}

export default Form;

  
