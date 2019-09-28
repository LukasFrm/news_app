import React from "react";
import Form from "./components/Form";
import QueryWindow from "./components/QueryWindow";
import axios from "axios";
import { Spring } from "react-spring/renderprops";
import DatatablePage from "./components/DataTablePage"

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


  getNews = async e => {

    this.data = {
      columns: [
        {
          label: "Published at",
          field: "date",
          sort: "asc",
          width: 270
        },
        {
          label: "Author",
          field: "author",
          sort: "asc",
          width: 270
        },
        {
          label: "Title",
          field: "title",
          sort: "asc",
          width: 150
        }
      ],
      rows: []
    };


    e.preventDefault();
    let headers = {
      Authorization: "d137b326c612435e93c08624f36e5bd4"
    };
    let searchQuery = e.target[0].value;
    let pageSize = 100; // <-- Max allowed articles per page
    let pagesToLoop = 5000 / pageSize; // <-- Article loop length
    // let url = `https://newsapi.org/v2/everything?p=2&pageSize=${pageSize}&q=${searchQuery}`;
        let url = `https://newsapi.org/v2/everything?q=${searchQuery}`;

    let massJSON = [];

    await axios
      .get(url, {
        headers: headers
      })
      .then(response => {
        // for (let k = 0; k < pagesToLoop; k++) {
          console.log(response);
          console.log(response.data.articles);
          let arr1 = [...response.data.articles];
          let arr = [];
          console.log("arr1 below");
          console.log(arr1);
          arr1.map((item, index) => {
            arr[index] = [];
            arr[index].push(item.author);
            arr[index].push(item.content);
            arr[index].push(item.description);
            arr[index].push(item.publishedAt);
            arr[index].push(item.sourceName);
            arr[index].push(item.title);
            arr[index].push(item.url);
            arr[index].push(item.urlToImage);
          });
        //  massJSON.push(arr1)
        // }
        this.setState({
          dataReceived: arr
        }, () => {
          console.log(`${this.state.dataReceived}`)
        });
      });

    this.setState(
      prevState => ({
        querySubmitted: !prevState.querySubmitted
      }),
      () => {
        console.log(` the state is ${this.state.querySubmitted}`);
      }
    );



   if (this.state.dataReceived) {
     console.log('Data has been received')
    this.state.dataReceived.map((article, index) => {
     var dateISO = new Date(article[3]);
     var dateNormalized = dateISO.toLocaleDateString("lt-LT");

     let dataToBePushed = {
       date: dateNormalized,
       author: article[0],
       title: article[5]
     };
     console.log(this.data);
     this.data.rows.push(dataToBePushed)
     console.warn(this.data.rows[index])
     // if (this.data.rows[index].title == article[5]){
     //   index = index + 1
     // }
   })
  }}
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
                  <div style={{backgroundColor:'white', borderRadius: '6px', padding: '15px'}}>
                  <DatatablePage tableData = {this.data} dataReceived={this.state.dataReceived}/>
                  </div>
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
