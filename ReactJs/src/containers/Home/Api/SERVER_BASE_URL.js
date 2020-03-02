const SERVER_TYPE = "test";
export const SERVER_BASE_URL =
  SERVER_TYPE === "test"
    ? "http://localhost:7005/twitter/"
    : "http://api:7005/twitter";
