import { SERVER_BASE_URL } from "./SERVER_BASE_URL";

console.log("SERVER_BASE_URL:", SERVER_BASE_URL);
const X_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmphbkBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiZGQ2OWEwMTAtZjMyNC0xMWU5LWFlYjQtYmZmODRhNjY2MGZjIiwiaWF0IjoxNTcxNjczODM2LCJleHAiOjE1NzE3MTcwMzZ9.EaTARI5vrsb4gt2_oBFjr3v4NuJ5-fqSHdTb3VXOzZk";

class HomeApi {
  getTweet() {
    console.log("getTweet-->>");
    return new Promise(function(resolve, reject) {
      let url = "getTweet";

      try {
        fetch(SERVER_BASE_URL + url, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "X-ACCESS-TOKEN": X_ACCESS_TOKEN
          }
        })
          .then(response => {
            console.log("response is", response);
            response
              .json()
              .then(res => {
                console.log("response is", res);
                resolve(res);
              })
              .catch(error => reject(error));
          })
          .catch(error => reject(error));
      } catch (error) {
        console.log("ERROR: ", error);
        reject(error);
      }
    });
  }
  createTweet(params) {
    return new Promise(function(resolve, reject) {
      try {
        fetch(SERVER_BASE_URL + "addTweet", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "X-ACCESS-TOKEN": X_ACCESS_TOKEN
          },
          body: JSON.stringify(params)
        })
          .then(response => {
            console.log("response is", response);
            response
              .json()
              .then(res => {
                console.log("response is", res);
                resolve(res);
              })
              .catch(error => reject(error));
          })
          .catch(error => reject(error));
      } catch (error) {
        console.log("ERROR: ", error);
        reject(error);
      }
    });
  }
}

export default new HomeApi();
