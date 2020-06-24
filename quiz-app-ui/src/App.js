// App.js
import React, { Component } from 'react';
import './App.css';
import NavBar from './Navbar';
import Form from "./components/Form"

class App extends Component {

    render() {
        return (
            <div>
            <NavBar></NavBar>
            <Form></Form>
            </div>
        );
    }
}
export default App;
