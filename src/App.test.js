import React from "react";
import App from "./App";
import Home from "./components/pages/Home";
import { shallow } from "enzyme";

describe("rendering components", () => {
  it("renders App component", () => {
    shallow(<App />);
  });
  it("renders Home component", () => {
    shallow(<Home />);
  });
  it("renders Home component with h1 tag", () => {
    const wrapper = shallow(<Home />);
    const header = <h1>WELCOME</h1>;
    expect(wrapper.contains(header)).toEqual(true);
  });
});
