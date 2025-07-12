import { render } from "@testing-library/react";
import { useAppSelector } from "@/lib/hooks";
import Page from "@/app/mdl/viewer/page";
import { redirect } from "next/navigation";

jest.mock("@/lib/hooks", () => ({
  useAppSelector: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Viewer Page", () => {
  it("should redirect if role is not VIEWER", () => {
    (useAppSelector as jest.Mock).mockReturnValue({ role: "APPROVER" });
    render(<Page />);
    expect(redirect).toHaveBeenCalledWith("/mdl");
  });

  it("should render Viewer grid", () => {
    (useAppSelector as jest.Mock).mockReturnValue({ role: "VIEWER" });
    const { getByText } = render(<Page />);
    expect(getByText(/Viewer/i)).toBeInTheDocument();
  });
});