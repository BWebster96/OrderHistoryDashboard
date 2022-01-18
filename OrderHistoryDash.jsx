import React from "react";
import debug from "sabio-debug";
import Pagination from "rc-pagination";
import toastr from "toastr";
import "../components/userProfile/styles/UserProfiles.css";
import {
  Table,
  Card,
  CardHeader,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";
import { Settings, Circle } from "react-feather";
import userProfileService from "@services/userProfileService";
import OrdersDashCard from "./OrderDashCard";

const _logger = debug.extend("OrderHistoryCard");

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: true,
  onclick: null,
  showDuration: "300",
  hideDuration: "500",
  timeOut: "3000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

class OrderHistoryDash extends React.Component {
  state = {
    orders: [],
    pagination: {
      pageIndex: 0,
      pageSize: 5,
      total: 0,
      currentPage: 1,
    },
  };

  componentDidMount() {
    _logger("OrderHistoryDashboard Component Mounting");
    this.getOrdHistPaginated();
  }

  getOrdHistPaginated() {
    userProfileService
      .orderHistory(this.state.pagination)
      .then(this.onGetSuccess)
      .catch(this.onGetError);
  }

  onGetSuccess = (response) => {
    var ordersArray = response.item.pagedItems;
    let mappedOrderData = ordersArray.map(this.mapOrderData);
    _logger("Paginated Orders Array: ", mappedOrderData);
    this.setState((prevState) => {
      let paginationData = { ...prevState.pagination };
      paginationData.total = response.item.totalCount;
      return {
        orders: mappedOrderData.map(this.mapOrders),
        pagination: paginationData,
      };
    });
  };

  onGetError = (error) => {
    _logger(error, "No Resources Found");
    toastr["error"]("The Application Resource is not Available");
  };

  mapOrderData = (order) => {
    let newCreated = new Date(order.created);
    let dateC = newCreated.toLocaleString();
    order.created = dateC;
    let newModified = new Date(order.modified);
    let dateM = newModified.toLocaleString();
    order.modified = dateM;

    return order;
  };

  mapOrders = (order) => {
    return <OrdersDashCard key={`Order-${order.orderId}`} orderProp={order} />;
  };

  onPaginationSizeChange = (size, e) => {
    e.preventDefault();
    _logger("New Page Size is ", size);
    let newCurrentPage = this.state.pagination.currentPage;
    if (size === this.state.pagination.pageSize) {
      return;
    } else {
      newCurrentPage = Math.floor(
        (this.state.pagination.pageSize *
          (this.state.pagination.currentPage - 1)) /
          size
      );
    }
    _logger("The new CurrentPage is ", newCurrentPage + 1);
    this.setState(
      (prevState) => {
        let pagination = { ...prevState.pagination };
        pagination.pageSize = size;
        pagination.currentPage = newCurrentPage + 1;
        pagination.pageIndex = newCurrentPage;
        return { pagination };
      },
      () => {
        this.getOrdHistPaginated();
      }
    );
  };

  onPageChange = (page) => {
    this.setState(
      (prevState) => {
        let pagination = { ...prevState.pagination };
        pagination.currentPage = page;
        pagination.pageIndex = page - 1;
        return { pagination };
      },
      () => {
        this.getOrdHistPaginated();
      }
    );
  };

  render() {
    return (
      <Card className="card-box mb-5">
        <CardHeader className="d-flex align-items-center justify-content-between card-header-alt p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-0 text-black">
              Order History
            </h6>
          </div>
          <UncontrolledDropdown>
            <DropdownToggle
              size="sm"
              outline
              color="primary"
              className="d-flex align-items-center justify-content-center"
            >
              <Settings className="w-50" />
            </DropdownToggle>
            <DropdownMenu
              right
              className="dropdown-menu-lg overflow-hidden p-0"
            >
              <div className="font-weight-bold px-4 pt-3">Results</div>
              <Nav className="nav-neutral-first nav-pills-rounded flex-column p-2">
                <NavItem>
                  <NavLinkStrap
                    onClick={(e) => this.onPaginationSizeChange(5, e)}
                  >
                    <div className="nav-link-icon mr-2">
                      <Circle />
                    </div>
                    <span className="font-size-md">
                      <b>5</b> results per page
                    </span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    onClick={(e) => this.onPaginationSizeChange(10, e)}
                  >
                    <div className="nav-link-icon mr-2">
                      <Circle />
                    </div>
                    <span className="font-size-md">
                      <b>10</b> results per page
                    </span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    onClick={(e) => this.onPaginationSizeChange(15, e)}
                  >
                    <div className="nav-link-icon mr-2">
                      <Circle />
                    </div>
                    <span className="font-size-md">
                      <b>15</b> results per page
                    </span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardHeader>
        <div className="divider" />
        <div className="card-body pt-3 px-4 pb-4">
          <Table className="table-alternate-spaced mb-0">
            <thead>
              <tr>
                <th className="text-center">
                  Customer/
                  <br />
                  Order #
                </th>
                <th className="text-center">Date</th>
                <th className="text-center">Tracking #</th>
                <th className="text-center">Status</th>
                <th className="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              <>{this.state.orders}</>
            </tbody>
          </Table>
        </div>
        <div className="card-footer p-4 d-flex justify-content-center">
          <Pagination
            onChange={this.onPageChange}
            current={this.state.pagination.currentPage}
            pageSize={this.state.pagination.pageSize}
            total={this.state.pagination.total}
            hideOnSinglePage={true}
          />
        </div>
      </Card>
    );
  }
}
export default OrderHistoryDash;
