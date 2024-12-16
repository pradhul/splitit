import axios from "axios";
import { BASE_URL, DEFAULT_REQUEST_TIMEOUT, DEFAULT_TIMEOUT_ERROR } from "@/apis/constants";
import { auth } from "@/firebaseConfig";

let cachedToken: string | null = null;
let authReady: Promise<void>;

const ApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_REQUEST_TIMEOUT,
  timeoutErrorMessage: DEFAULT_TIMEOUT_ERROR,
  headers: {
    "Content-Type": "application/json",
  },
});

//FIXME: Move Auth logics to a separate AuthManager class to user here and _layout file
/**
 * Initializes the authentication readiness state.
 *
 * This function sets up a listener for authentication state changes and
 * updates the cached token accordingly. It creates a promise that resolves
 * when the initial auth state is determined.
 *
 * @returns {void} This function doesn't return anything.
 */
const initializeAuthReady = () => {
  authReady = new Promise<void>((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (!!user) {
        cachedToken = await user.getIdToken();
      } else {
        cachedToken = null;
      }
      resolve();
    });
  });
};

initializeAuthReady();

ApiClient.interceptors.request.use(
  async (config) => {
    await authReady;
    if (!cachedToken) {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user is signed in");
      }
      cachedToken = await user.getIdToken();
    }
    config.headers.Authorization = `Bearer ${cachedToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiClient;