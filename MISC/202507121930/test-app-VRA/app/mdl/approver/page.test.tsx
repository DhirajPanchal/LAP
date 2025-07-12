import { render } from "@testing-library/react";
import { useAppSelector } from "@/lib/hooks";
import Page from "@/app/mdl/approver/page";
import { redirect } from "next/navigation";

jest.mock("@/lib/hooks", () => ({
  useAppSelector: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Approver Page", () => {
  it("should redirect if role is not APPROVER", () => {
    (useAppSelector as jest.Mock).mockReturnValue({ role: "REVIEWER" });
    render(<Page />);
    expect(redirect).toHaveBeenCalledWith("/mdl");
  });

  it("should render Approver grid", () => {
    (useAppSelector as jest.Mock).mockReturnValue({ role: "APPROVER" });
    const { getByText } = render(<Page />);
    expect(getByText(/Approver/i)).toBeInTheDocument();
  });
});