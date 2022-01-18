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

let paginate = (pageIndex, pageSize) => {
  _logger("User Profile Paginate is Firing.");

  const config = {
    method: "GET",
    url: `${userProfileService.endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    headers: userProfileService.headers,
    withCredentials: true,
    crossdomain: true,
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
let search = (pageIndex, pageSize, query) => {
  _logger("User Profile Search Paginate is Firing.");

  const config = {
    method: "GET",
    url: `${userProfileService.endpoint}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    headers: userProfileService.headers,
    withCredentials: true,
    crossdomain: true,
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getById = (id) => {
  _logger("User Profile Get By Id is Firing.");

  const config = {
    method: "GET",
    url: `${userProfileService.endpoint}/${id}`,
    headers: userProfileService.headers,
    withCredentials: true,
    crossdomain: true,
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getCurrent = () => {
  _logger("User Profile Get By Id is Firing.");

  const config = {
    method: "GET",
    url: `${userProfileService.endpoint}/current`,
    headers: userProfileService.headers,
    withCredentials: true,
    crossdomain: true,
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let create = (payload) => {
  _logger("User Profile Create is Firing.");

  const config = {
    method: "POST",
    data: payload,
    url: `${userProfileService.endpoint}`,
    headers: userProfileService.headers,
    withCredentials: true,
    crossdomain: true,
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let update = (payload) => {
  _logger("User Profile Update is Firing.");
  const config = {
    method: "PUT",
    data: payload,
    url: `${userProfileService.endpoint}/${payload.id}`,
    headers: userProfileService.headers,
    withCredentials: true,
    crossdomain: true,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let deleteById = (id) => {
  _logger("User Profile Delete is Firing.");

  const config = {
    method: "DEL",
    url: `${userProfileService.endpoint}/${id}`,
    headers: userProfileService.headers,
    withCredentials: true,
    crossdomain: true,
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
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
  paginate,
  getById,
  getCurrent,
  create,
  update,
  deleteById,
  search,
  orderHistory,
};
