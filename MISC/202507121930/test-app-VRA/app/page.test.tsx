import { render, screen } from "@testing-library/react";
import Page from "@/app/mdl/page";
import "@testing-library/jest-dom";

describe("MDL Page", () => {
  it("renders without crashing", () => {
    render(<Page />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("displays MdlPage content", () => {
    render(<Page />);
    expect(screen.getByText(/Welcome to MDL/i)).toBeInTheDocument();
  });
});
