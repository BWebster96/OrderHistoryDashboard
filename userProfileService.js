import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";
import debug from "sabio-debug";

const _logger = debug.extend("userProfileService");

let userProfileService = {
  endpoint: `${API_HOST_PREFIX}/api/userprofiles`,
  headers: { "Content-Type": "application/json" },
};

const orderHistory = (pagination) => {
  _logger("Order History Paginate is Firing.");

  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/userorders/?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`,
    headers: userProfileService.headers,
    withCredentials: true,
    crossdomain: true,
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export default {
  orderHistory
};
