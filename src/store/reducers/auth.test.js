import reducer from "./auth";
import * as actionType from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: "/",
      },
      {
        type: actionType.AUTH_SUCCESS,
        token: "some",
        userId: "someId",
      }
    )).toEqual({
      token: "some",
      userId: "someId",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
