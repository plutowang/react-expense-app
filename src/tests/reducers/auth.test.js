import authReducer from "../../reducers/auth";

test("should set default state for login", () => {
  const state = authReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test("should set uid login correctly", () => {
  const uid = "1234";
  const state = authReducer({}, { type: "LOGIN", uid });
  expect(state).toEqual({uid});
});

test("should clear uid logout correctly", () => {
  const state = authReducer({}, { type: "LOGOUT" });
  expect(state).toEqual({});
});
