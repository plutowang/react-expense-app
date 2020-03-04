import React from "react";
import { shallow } from "enzyme";
import LoginPage from "../../components/LoginPage";

test("should render LoginPage correctly", () => {
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogin}/>);
  expect(wrapper).toMatchSnapshot();
});
