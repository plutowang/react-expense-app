import React from "react";
import { shallow } from "enzyme";
import LoadingPage from "../../components/LoadingPage";

test("should render LoadingPage correctly", () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<LoadingPage startLogout={startLogout} />);
  expect(wrapper).toMatchSnapshot();
});
