import React from "react";
import Navigationbar from "../../components/elements/Navigationbar";
import { Button } from "react-bootstrap";
import { shallow } from "enzyme";

describe("rendering components", () => {
  it("renders Navigationbar component", () => {
    shallow(<Navigationbar />);
  });
  it("renders Navigationbar component with button", () => {
    const wrapper = shallow(<Navigationbar />);
    const button = <Button variant="success">My Orders</Button>;
    expect(wrapper.contains(button)).toEqual(true);
  });
});
