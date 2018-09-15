import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    console.log("inside componentDidMount");
    this.callApi()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
    console.log(this.state.data);
  }

  callApi = async () => {
    console.log("inside callApi");
    const response = await fetch("/api/test", {
            method: 'POST',
            body: JSON.stringify({food: "Fish"}),
            credentials: 'include',
            headers: {'Content-Type' : 'application/json'}
        });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log("cp2");
    console.log(body);
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cook</h1>
        </header>
        <p>Testing backend connectivity: {this.state.data}</p>
        <ul>
          {this.state.data.map((meal, key) => (
            <li key={key}>{meal}</li>
          ))}
        </ul>
        {/* <img src={this.state.data} /> */}
      </div>
    );
  }
}

export default App;
