import React, {Suspense, Fragment} from "react"
import Form from "./components/Form";
import QueryWindow from "./components/QueryWindow";
import axios from "axios";
import DatatablePage from "./components/DataTablePage";

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
    error: undefined
  };

  handleRowClick = props => {
    console.log(props);
    var clickedDateISO = new Date(props[3]);
    var clickedDateNormalized = clickedDateISO.toLocaleDateString("lt-LT");

    this.setState({
      author: props[0],
      publishedAt: clickedDateNormalized,
      title: props[5],
      url: props[6],
      urlToImage:
        props[7] ||
        "https://cdn0.iconfinder.com/data/icons/handdrawn-ui-elements/512/Question_Mark-512.png",
      content: props[2]
    });
  };
  deleteQuery = () => {
    this.setState({
      querySubmitted: false,
      author: undefined,
      content: undefined,
      description: undefined,
      publishedAt: undefined,
      sourceName: undefined,
      title: undefined,
      url: undefined,
      urlToImage: undefined
    });
  };

  getNews = async e => {
    this.data = {
      columns: [
        {
          label: "Date",
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
    let url = `https://newsapi.org/v2/everything?pageSize=${pageSize}&q=${searchQuery}`;

    let arr = [];

    await axios
      .get(url, {
        headers: headers
      })
      .then(response => {
        let arr1 = [...response.data.articles];
        console.log("arr1 below");
        console.log(arr1);
        arr1.map((item, index) => {
          arr[index] = [];
          arr[index].push(item.author || "-");
          arr[index].push(item.content);
          arr[index].push(item.description);
          arr[index].push(item.publishedAt);
          arr[index].push(item.sourceName);
          arr[index].push(item.title);
          arr[index].push(item.url);
          arr[index].push(item.urlToImage);
        });

        this.setState(
          {
            dataReceived: arr
          },
          () => {}
        );
      });

    this.setState(
      prevState => ({
        querySubmitted: !prevState.querySubmitted
      })
    );

    if (this.state.dataReceived) {
      console.log("Data has been received");
      this.state.dataReceived.map((article, index) => {
        var dateISO = new Date(article[3]);
        var dateNormalized = dateISO.toLocaleDateString("lt-LT");

        let dataToBePushed = {
          date: dateNormalized,
          author: article[0],
          title: article[5],
          clickEvent: () => this.handleRowClick(arr[index])
        };
        this.data.rows.push(dataToBePushed);
      });
    }

    return 
  };
  render() {

    var {querySubmitted} = this.state
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container w-100 m-0">
              <div className="row">
                <div className="col-7 form-container">
                  <Form
                    getNews={this.getNews}
                    querySubmitted={querySubmitted}
                  />
                  {querySubmitted ? (
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "6px",
                        padding: "15px"
                      }}
                    >
                      <DatatablePage tableData={this.data} />
                    </div>
                  ) : null}
                  
                </div>
                {querySubmitted ? (
                  <QueryWindow currentState={this.state} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
