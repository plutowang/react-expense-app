import React from "react";
import { shallow } from "enzyme";
import Header from "../../components/Header";

test("should render Header correctly", () => {
  const wrapper = shallow(<Header />);
  // Just rendered output
  // extract just the meaningful stuff the rendered output
  expect(wrapper).toMatchSnapshot()
});