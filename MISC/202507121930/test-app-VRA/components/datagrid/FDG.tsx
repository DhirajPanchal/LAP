import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { FrameDataGridV2 } from "@/components/datagrid/FrameDataGridV2";
import { STAGE_TYPE } from "@/types/mdl-types";
import { InputState } from "@/types/Submission"; // adjust import path if needed

describe("FrameDataGridV2", () => {
  const defaultProps = {
    data: [],
    pageSkip: 0,
    pageLimit: 10,
    total: 0,
    onPageChange: jest.fn(),
    onPageLimitChange: jest.fn(),
    gridHeader: <div>Grid Header</div>,
    stageType: STAGE_TYPE.REVIEWER, // ✅ Valid enum
    refreshTriggered: jest.fn(),
    onColumnFilterChange: jest.fn(),
    onColumnSortChange: jest.fn(),
    inputState: { includeHistory: false } as InputState, // ✅ typed
    isDirty: true, // so "Clear All Filters" button shows
    onHistoryChange: jest.fn(),
    onClearAll: jest.fn(),
    busy: { loading: false, error: false, success: true },
  };

  it("renders FrameDataGridV2 with header and settings", () => {
    render(<FrameDataGridV2 {...defaultProps} />);

    expect(screen.getByText("Grid Header")).toBeInTheDocument();
    expect(screen.getByTitle("Clear All Filter(s)")).toBeInTheDocument();
    expect(screen.getByTitle("Settings")).toBeInTheDocument();
  });

  it("calls onClearAll when Clear All Filters button is clicked", () => {
    render(<FrameDataGridV2 {...defaultProps} />);

    act(() => {
      fireEvent.click(screen.getByTitle("Clear All Filter(s)"));
    });

    expect(defaultProps.onClearAll).toHaveBeenCalled();
  });
});
