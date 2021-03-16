import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CustomerAdd from "./CustomerAdd";

test("Addform updates the state", () => {
  const component = render(<CustomerAdd />);

  const id5 = component.container.querySelector("#id5");

  fireEvent.change(id5, {
    target: { value: "ALFKI" },
  });

  const tarkistus = component.container.querySelector("#id5");
  let compId = tarkistus.value;
  expect(compId).toMatch("ALFKI");

  //component.debug();
});

// set CI=true&&npm test
