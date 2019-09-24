import React from "react";
import Form from "./components/Form";
import News from "./components/News";
import QueryWindow from "./components/QueryWindow";
import axios from "axios";
// import { Spring } from 'react-spring/renderprops'

class App extends React.Component {
  state = {
    querySubmitted: false,
    author: undefined,
    content: undefined,
    description: undefined,
    publishedAt: undefined,
    sourceName: undefined,
    title: undefined,
    url: undefined,
    urlToImage: undefined,
    error: undefined,

  };

  deleteQuery = () => {
    
  }

  getNews = async e => {
    e.preventDefault();

    var headers = {
      Authorization: "bf46b4b6cf2944809ec6c175982b259b"
    };
    var searchQuery = e.target[0].value;
    var url = `https://newsapi.org/v2/everything?q=${searchQuery}`;
    var dataReiceived;

    await axios
      .get(url, {
        headers: headers,
        data: dataReiceived
      })
      .then(response => {
        console.log(response.data.articles);
        console.log(searchQuery);
      });

    this.setState(
      prevState => ({
        querySubmitted: !prevState.querySubmitted
      }),
      () => {
        console.log(` the state is ${this.state.querySubmitted}`);
      }
    );
  };
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container w-100 m-0">
              <div className="row">
                <div className="col-7 form-container">
                  <Form
                    getNews={this.getNews}
                    querySubmitted={this.state.querySubmitted}
                  />
                </div>
                {this.state.querySubmitted ? <QueryWindow /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
