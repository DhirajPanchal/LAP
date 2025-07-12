import { render } from "@testing-library/react";
import DataGridWrapperV2 from "@/components/datagrid/DataGridWrapperV2";

describe("DataGridWrapperV2", () => {
  it("renders without crashing", () => {
    render(<DataGridWrapperV2 title="Test Grid" stageType="REVIEWER" visibilityDashboard={[]} defaultPayload={{}} />);
  });
});