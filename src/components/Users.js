import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import { Link } from "react-router-dom";
// import map from 'lodash/map';
import "react-table/react-table.css";
// import { database } from "../services/database";

import Page from "../Page";
import Manage from "./Manage";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: {
        loaded: false,
        data: [],
        totalData: 0
      }
    };
    this.editStatusSuspend = this.editStatusSuspend.bind(this);
  }

  fetchUsersData = state => {
    this.setState(prevState => ({
      users: { ...prevState.users }
    }));

    const { pageSize, page, sorted, filtered } = state;
    let queryParams = `userType=${
      this.props.match.params.usertype
    }&page=${page}`;
    console.log(queryParams);

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
        console.log(this.state.users.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  async editStatusSuspend(uid, displayName) {
    const key = {
      uid: uid,
      displayName: displayName
    };
    console.log(key);

    let queryParams = `userType=${this.props.match.params.usertype}`;
    queryParams = queryParams + `&filter[${key.uid}]=${key.displayName}`;
    console.log(queryParams);

    await axios({
      url: `${
        process.env.REACT_APP_API_HOSTNAME
      }/api/admin/users/?${queryParams}`,
      method: "PUT",
      data: {
        enable: 0
      }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
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
        Cell: row =>
          row.value === 1 ? (
            <div>
              {this.state.users.data && (
                <div className="d-flex justify-content-around">
                  <div>Active </div>
                  <div style={{ textAlign: "center" }}>
                    <a
                      className="btn btn-info btn-sm text-light ml-3"
                      onClick={() => {
                        this.editStatusSuspend(
                          row.original.uid,
                          row.original.displayName
                        );
                      }}
                    >
                      Suspend
                    </a>
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
                    <a
                      className="btn btn-info btn-sm text-light ml-1"
                      onClick={() => {
                        this.editStatus(
                          row.original.uid,
                          row.original.displayName
                        );
                      }}
                    >
                      Activate
                    </a>
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
        <h2>Users</h2>
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
              ? String(row[id].toLowerCase())
                  .toLowerCase()
                  .includes(filter.value)
              : true;
          }}
          defaultSorted={sorting}
          defaultPageSize={50}
          className="-striped -highlight"
        />
      </Page>
    );
  }
}

export default Users;
