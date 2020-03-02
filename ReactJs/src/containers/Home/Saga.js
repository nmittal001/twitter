import { takeLatest, call, put } from "redux-saga/effects";

import Api from "./Api";

export const HOME_API_RESPONSE = "HOME_API_RESPONSE";
export const HOME_SAVE_TWEET_APPS = "HOME_SAVE_TWEET_APPS";
export const HOME_GET_TWEET_APPS = "HOME_GET_TWEET_APPS";
export const HOME_CREATE_TWEET = "HOME_CREATE_TWEET";

export const homeApiResponse = payload => ({
  type: HOME_API_RESPONSE,
  payload
});

export const homeGetTweetApps = payload => ({
  type: HOME_GET_TWEET_APPS,
  payload
});

export const homeSaveTweetApps = payload => ({
  type: HOME_SAVE_TWEET_APPS,
  payload
});
export const homeCreateTweet = payload => ({
  type: HOME_CREATE_TWEET,
  payload
});

export default function* homeSaga(dispatch) {
  yield takeLatest(HOME_GET_TWEET_APPS, handleHomeGetTweetApps);
  yield takeLatest(HOME_CREATE_TWEET, handleHomeCreateTweet);
}

function* handleHomeGetTweetApps() {
  try {
    console.log("handleHomeGetTweetApps kya hua");
    const response = yield call(Api.getTweet);
    if (response.success === 1) {
      console.log("get response.data-->>", response.data);
      yield put(homeSaveTweetApps(response.data));
    }
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

function* handleHomeCreateTweet(action) {
  try {
    let response = yield call(Api.createTweet, action.payload);
    if (response.success === 1) {
      yield put(
        homeApiResponse({
          success: 1,
          type: "createUser",
          message: "Create tweet successfully"
        })
      );
      console.log("handleHomeGetTweetApps-1-->>");
      yield put(homeGetTweetApps());
      console.log("handleHomeGetTweetApps-2-->>");
    } else {
      yield put(
        homeApiResponse({
          success: 0,
          type: "createUser",
          message: response.message
        })
      );
    }
  } catch (error) {
    yield put(
      homeApiResponse({
        success: 0,
        type: "createUser",
        message: "Unable to create User"
      })
    );
  }
}
