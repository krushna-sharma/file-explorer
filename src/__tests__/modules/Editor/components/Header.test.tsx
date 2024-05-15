import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../store/utils";
import EditorHeader from "../../../../modules/Editor/components/Header/Header.component";
import { dataWithFile } from "../../../../mockData";
import userEvent from "@testing-library/user-event";

describe("Testing Editor Header component", () => {
  it("should show the header if the file is selected", () => {
    renderWithProviders(<EditorHeader />, {
      preloadedState: {
        files: {
          files: dataWithFile,
          selectedFile: "anotherId",
        },
      },
    });

    expect(screen.getByText(/index.js/)).toBeInTheDocument();
  });

  // TODO: Update the test case
  it.skip("clicking on the file box should select it", () => {
    renderWithProviders(<EditorHeader />, {
      preloadedState: {
        files: {
          files: dataWithFile,
          selectedFile: "anotherId",
        },
      },
    });

    // expect()
  });

  it("clicking on close should close the file and remove it from the header", () => {
    renderWithProviders(<EditorHeader />, {
      preloadedState: {
        files: {
          files: dataWithFile,
          selectedFile: "anotherId",
        },
      },
    });

    const fileBox = screen.getByText("index.js");

    userEvent.hover(fileBox);
    const closeBtn = screen.getByText("×");
    fireEvent.click(closeBtn);
    expect(screen.queryByText("×")).not.toBeInTheDocument();
  });

  it("should hide the close button if user is not hovering over the file box", () => {
    renderWithProviders(<EditorHeader />, {
      preloadedState: {
        files: {
          files: dataWithFile,
          selectedFile: "anotherId",
        },
      },
    });
    const fileBox = screen.getByText("index.js");
    userEvent.hover(fileBox);
    expect(screen.getByText("×")).toBeInTheDocument();
    userEvent.unhover(fileBox);
    expect(screen.queryByText("×")).not.toBeInTheDocument();
  });
});
