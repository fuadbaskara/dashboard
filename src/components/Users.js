import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import "react-table/react-table.css";
import { database } from "../services/database.js";

import Page from "../Page";
import Manage from "./Manage";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: {
        data: [],
        totalData: 0
      }
    };
    this.editStatus = this.editStatus.bind(this);
  }

  fetchUsersData = state => {
    this.setState(prevState => ({
      users: { ...prevState.users }
    }));

    const { pageSize, page, sorted, filtered } = state;
    let queryParams = `userType=${
      this.props.match.params.usertype
    }&page=${page}`;
    // console.log(queryParams);

    if (filtered.length > 0) {
      filtered.forEach(item => {
        queryParams = queryParams + `&filter[${item.id}]=${item.value}`;
      });
    }

    axios
      .get(
        `${process.env.REACT_APP_API_HOSTNAME}/api/admin/users/?${queryParams}`
      )
      .then(response => {
        if (response.data.data.length > 0) {
          this.setState(prevState => {
            return {
              users: {
                ...prevState.users,
                data: response.data.data,
                totalData: response.data.metaInfo.nbHits
              }
            };
          });
        }
        // console.log(this.state.users.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  async editStatus(uid, enable) {
    var user_metadataRef = database
      .database()
      .ref()
      .child("user_metadata");
    var uidRef = user_metadataRef.child(uid);

    if (enable === 1) {
      await uidRef.update({
        enable: 0
      });
    } else {
      await uidRef.update({
        enable: 1
      });
    }
    alert("the data successfully updated");
    window.location.reload();
  }

  render() {
    const columns = [
      {
        Header: "Name",
        accessor: "displayName"
      },
      {
        Header: "Type",
        accessor: "userType"
      },
      {
        Header: "Registered",
        accessor: "created"
      },
      {
        Header: "Status",
        accessor: "enable",
        width: 190,
        Cell: row =>
          row.value === 1 ? (
            <div>
              {this.state.users.data && (
                <div className="d-flex justify-content-around">
                  <div>Active </div>
                  <div style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-info btn-sm text-light ml-3 btn-danger"
                      onClick={() => {
                        this.editStatus(row.original.uid, row.original.enable);
                      }}
                    >
                      Suspend
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {this.state.users.data && (
                <div className="d-flex justify-content-around">
                  <div>Suspend </div>
                  <div style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-info btn-sm text-light pr-2 pl-2 btn-success"
                      onClick={() => {
                        this.editStatus(
                          row.original.uid,
                          row.original.displayName,
                          row.original.enable
                        );
                      }}
                    >
                      Activate
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Phone country code",
        accessor: "phoneDialCode"
      },
      {
        Header: "Phone number",
        accessor: "phoneNumber"
      },
      {
        Header: "Country",
        accessor: "countryName"
      },
      {
        Header: "Actions",
        accessor: "uid",
        Cell: row => (
          <div style={{ textAlign: "center" }}>
            <Link
              to={`/users/${this.props.match.params.usertype}/${row.value}/${
                row.original.displayName
              }`}
            >
              <button className="btn btn-info btn-sm">Manage</button>
            </Link>
          </div>
        )
      }
    ];

    const sorting = [
      {
        id: "created",
        desc: true
      }
    ];

    const pages = Math.ceil(this.state.users.totalData / 50);

    return (
      <Page>
        <div className="d-flex justify-content-start">
          <h1 className="mr-5 mb-2">Users</h1>
          <div className="mr-3">
            <Link to={`/users/t`}>
              <button className="btn btn-dark btn-info btn-sm p-2">
                Traveller's Data
              </button>
            </Link>
          </div>
          <div className="mr-5">
            <Link to={`/users/p`}>
              <button className="btn btn-dark btn-info btn-sm p-2">
                Photographer's Data
              </button>
            </Link>
          </div>
        </div>
        <Route
          exact
          path={`/users/p`}
          render={() => (
            <ReactTable
              style={{ height: "720px" }}
              columns={columns}
              showPagination
              data={this.state.users.data}
              pages={pages}
              loading={this.state.users.loading}
              onFetchData={this.fetchUsersData}
              filterable
              defaultFilterMethod={(filter, row, column) => {
                const id = filter.pivotId || filter.id;
                return row[id] !== undefined
                  ? String(row[id])
                      .toLowerCase()
                      .includes(filter.value)
                  : true;
              }}
              defaultSorted={sorting}
              defaultPageSize={50}
              className="-striped -highlight"
            />
          )}
        />
        <Route
          exact
          path={`/users/t`}
          render={() => (
            <ReactTable
              style={{ height: "720px" }}
              columns={columns}
              showPagination
              data={this.state.users.data}
              pages={pages}
              loading={this.state.users.loading}
              onFetchData={this.fetchUsersData}
              filterable
              defaultFilterMethod={(filter, row, column) => {
                const id = filter.pivotId || filter.id;
                return row[id] !== undefined
                  ? String(row[id])
                      .toLowerCase()
                      .includes(filter.value)
                  : true;
              }}
              defaultSorted={sorting}
              defaultPageSize={50}
              className="-striped -highlight"
            />
          )}
        />
      </Page>
    );
  }
}

export default Users;
