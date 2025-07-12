// __tests__/app/mdl/page.test.tsx

import { render, screen } from "@testing-library/react";
import Page from "@/app/mdl/page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import roleRegionReducer from "@/lib/store/roleRegionSlice"; // adjust import as needed
import { AuthRoles } from "@types/mdl-types";

// Minimal test redux store
const testStore = configureStore({
  reducer: {
    roleRegion: roleRegionReducer,
  },
  preloadedState: {
    roleRegion: {
      role: null,
      region: null,
      selectRoleRegion: () => {},
      setAvailable: () => {},
    },
  },
});

describe("MDL Page", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={testStore}>
        <Page />
      </Provider>
    );

    expect(screen.getByText("Master Default List")).toBeInTheDocument();
  });

  it("displays MdlPage content", () => {
    render(
      <Provider store={testStore}>
        <Page />
      </Provider>
    );

    expect(screen.getByText(/Welcome to MDL/i)).toBeInTheDocument();
  });
});
