import axios from "axios";
import { BASE_URL, DEFAULT_REQUEST_TIMEOUT, DEFAULT_TIMEOUT_ERROR } from "@/apis/constants";

export default axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_REQUEST_TIMEOUT,
  timeoutErrorMessage: DEFAULT_TIMEOUT_ERROR,
  headers: {
    "Content-Type": "application/json",
  },
});
