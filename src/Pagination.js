import React from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./App.css";
import {
      TableContainer,
      TableHead,
      Table,
      TableRow,
      TableCell,
    } from "@material-ui/core";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import * as rowActions from "./actions/row";
// import { connect } from "react-redux";

export class PaginationExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 10,
      currentPage: 0,
    };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };

  loadMoreData() {
    const data = this.state.orgtableData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice,
    });
  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    axios.get("http://jsonplaceholder.typicode.com/photos").then((res) => {
      var tdata = res.data;
      console.log("data-->" + JSON.stringify(tdata));
      var slice = tdata.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        pageCount: Math.ceil(tdata.length / this.state.perPage),
        orgtableData: tdata,
        tableData: slice,
      });
    });
  }
deleteRow = (e , dataId) => {
    axios.delete("http://jsonplaceholder.typicode.com/photos/"+dataId)
    .then(response => {
        if(response.data != null){
            console.log("deleted")
            this.setState({
                tableData : this.state.tableData.filter(data => data.id !== dataId)
            })
            // this.props.actions.removeTodo(dataId);
        }
    });
};
  render() {
    return (
      <div  style={{ marginLeft: "25%" }}>
      
        <TableContainer style={{   width: "50%",
      borderColor: "lightgrey",
      borderStyle: "solid",}}>
         <Table
            aria-label="simple table"
          >
            <TableHead>
              <TableCell >AlbumID </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              
            </TableHead>
            {
              this.state.tableData.map ( (data) => {
                return(
                  <TableRow key={data.id}>
                    <TableCell>{data.albumId}</TableCell>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.title}</TableCell>
                    {/* <TableCell><i className="fa fa-trash pt-2" onClick={this.deleteRow(data.id)} ></i></TableCell> */}
                    <TableCell><button type="submit" onClick={e => this.deleteRow(e, data.id)}>
              Delete
            </button></TableCell>
                  </TableRow>
                );
              })
            }

          </Table>
        </TableContainer>
        
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
      </div>
    );
  }
}

export default PaginationExample;
// const mapStateToProps = ({ row }) => ({
//     row,
//   });

  
// const mapDispatchToProps = (dispatch) => ({
//     actions: bindActionCreators(rowActions, dispatch),
//   });
  
//   export default connect(mapStateToProps, mapDispatchToProps)(PaginationExample);
  
