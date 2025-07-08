import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import ProfileDropdown from "./ProfileDropdown";
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ProfileDropdown Component", () => {
  test("should not display the dropdown menu when rendered", () => {
    renderWithRouter(<ProfileDropdown />);
    expect(screen.queryByText("Minha Conta")).not.toBeInTheDocument();
  });

  test("should display dropdown menu when user button is clicked", () => {
    renderWithRouter(<ProfileDropdown />);
    const dropdownButton = screen.getByRole("button");
    fireEvent.click(dropdownButton);
    expect(screen.getByText("Entrar")).toBeInTheDocument();
    expect(screen.getByText("Minha Conta")).toBeInTheDocument();
  });

  test("should close the dropdown menu when the button is clicked again", () => {
    renderWithRouter(<ProfileDropdown />);
    const dropdownButton = screen.getByRole("button");
    fireEvent.click(dropdownButton);
    expect(screen.getByText("Minha Conta")).toBeInTheDocument();
    fireEvent.click(dropdownButton);
    expect(screen.queryByText("Minha Conta")).not.toBeInTheDocument();
  });
});
