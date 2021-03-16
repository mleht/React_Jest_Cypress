import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Customer from "./Customer";

test("renders content", () => {
  const customer = {
    companyName: "Testi",
  };

  const component = render(<Customer customer={customer} />);
  // component.debug();
  expect(component.container).toHaveTextContent("Testi");
});

// set CI=true&&npm test

test("clicking the button calls event handler once", () => {
  const customer = {
    companyName: "Testi",
  };

  const mockHandler = jest.fn();

  const component = render(
    <Customer customer={customer} handleDeleteClick={mockHandler} />
  );
  // component.debug();
  const button = component.getByText("Delete");
  fireEvent.click(button);
  expect(mockHandler.mock.calls).toHaveLength(1);
});
