import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import CustomerList from "./CustomerList";

test("Add new button test", () => {
  const component = render(<CustomerList />);
  const button = component.getByText("Add new");
  fireEvent.click(button);
  // component.debug();
  expect(component.container).toHaveTextContent("Create");
});

// set CI=true&&npm test
