import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Message from "./Message";

test("Renders the message correctly and uses correct class", () => {
  const message = "Customer deleted";
  const isPositive = true;

  const component = render(
    <Message message={message} isPositive={isPositive} />
  );

  // component.debug();

  expect(component.container).toHaveTextContent("Customer deleted");
  expect(component.container.firstChild).toHaveClass("pos");
});

// set CI=true&&npm test
