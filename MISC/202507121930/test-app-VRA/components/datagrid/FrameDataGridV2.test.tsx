import { render, screen, fireEvent } from "@testing-library/react";
import { FrameDataGridV2 } from "@/components/datagrid/FrameDataGridV2";

describe("FrameDataGridV2", () => {
  const defaultProps = {
    data: [],
    pageSkip: 0,
    pageLimit: 10,
    total: 0,
    onPageChange: jest.fn(),
    onPageLimitChange: jest.fn(),
    gridHeader: <div>Grid Header</div>,
    stageType: "APPROVER",
    refreshTriggered: jest.fn(),
    onColumnFilterChange: jest.fn(),
    onColumnSortChange: jest.fn(),
    inputState: { includeHistory: false },
    onHistoryChange: jest.fn(),
    onClearAll: jest.fn(),
    isDirty: true,
    busy: { loading: false, error: false, success: false },
  };

  it("renders essential UI elements", () => {
    render(<FrameDataGridV2 {...defaultProps} />);
    expect(screen.getByText("Grid Header")).toBeInTheDocument();
    expect(screen.getByTitle("Clear All Filter(s)")).toBeInTheDocument();
    expect(screen.getByTitle("Settings")).toBeInTheDocument();
  });

  it("calls onClearAll when clear button is clicked", () => {
    render(<FrameDataGridV2 {...defaultProps} />);
    fireEvent.click(screen.getByTitle("Clear All Filter(s)"));
    expect(defaultProps.onClearAll).toHaveBeenCalled();
  });
});