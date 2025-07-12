import { render } from "@testing-library/react";
import { useAppSelector } from "@/lib/hooks";
import Page from "@/app/mdl/reviewer/page";
import { redirect } from "next/navigation";

jest.mock("@/lib/hooks", () => ({
  useAppSelector: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Reviewer Page", () => {
  it("should redirect if role is not REVIEWER", () => {
    (useAppSelector as jest.Mock).mockReturnValue({ role: "VIEWER" });
    render(<Page />);
    expect(redirect).toHaveBeenCalledWith("/mdl");
  });

  it("should render Reviewer grid", () => {
    (useAppSelector as jest.Mock).mockReturnValue({ role: "REVIEWER" });
    const { getByText } = render(<Page />);
    expect(getByText(/Reviewer/i)).toBeInTheDocument();
  });
});