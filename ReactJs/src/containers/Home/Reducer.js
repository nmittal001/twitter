import { HOME_SAVE_TWEET_APPS } from "./Saga";

const initialState = {
  homeApps: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_SAVE_TWEET_APPS:
      console.log("HOME_SAVE reducer-->>", action);
      return {
        ...state,
        homeApps: action.payload
      };
    default:
      return state;
  }
};
