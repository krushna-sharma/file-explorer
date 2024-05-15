import { data } from "../../../mockData";
import FileExplorer from "../../../modules/FileExplorer/FileExplorer.component";
import { renderWithProviders } from "../../../store/utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Actions from "../../../store/hooks";
import axios from "axios";

describe("Testing FileExplorer component...", () => {
  it("should render the folder name based on the data", async () => {
    renderWithProviders(<FileExplorer />, {
      preloadedState: { files: { files: data, selectedFile: "" } },
    });
    await waitFor(() => {
      expect(screen.getByText("src")).toBeInTheDocument();
    });
  });

  it("should have the add file and folder button", () => {
    renderWithProviders(<FileExplorer />);
    expect(screen.getByTestId("addFileIcon")).toBeInTheDocument();
    expect(screen.getByTestId("addFolderIcon")).toBeInTheDocument();
  });

  it("should add a new file on clicking the new file button", () => {
    let dispatch = jest.fn();
    jest.spyOn(Actions, "useAppDispatch").mockReturnValue(dispatch);
    renderWithProviders(<FileExplorer />, {
      preloadedState: { files: { files: data, selectedFile: "" } },
    });
    let addFileButton = screen.getByTestId("addFileIcon");
    fireEvent.click(addFileButton);
    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        fileName: "new_file",
        fileType: "file",
      },
      type: "filesData/addFile",
    });
  });

  it("should add a new file on clicking the new folder button", () => {
    let dispatch = jest.fn();
    jest.spyOn(Actions, "useAppDispatch").mockReturnValue(dispatch);
    renderWithProviders(<FileExplorer />, {
      preloadedState: { files: { files: data, selectedFile: "" } },
    });
    let addFolderButton = screen.getByTestId("addFolderIcon");
    fireEvent.click(addFolderButton);
    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        fileName: "new_folder",
        fileType: "folder",
      },
      type: "filesData/addFile",
    });
  });

  it("should fetch the files from github API", async () => {
    let dispatch = jest.fn();
    jest.spyOn(Actions, "useAppDispatch").mockReturnValue(dispatch);
    jest.spyOn(axios, "get").mockReturnValue(
      Promise.resolve({
        data: { tree: [{ mode: "100644", path: "test.tsx", sha: "test" }] },
      })
    );
    renderWithProviders(<FileExplorer />, {
      preloadedState: { files: { files: {}, selectedFile: "" } },
    });
    await waitFor(() => {
      //   expect(screen.getByText(/test.tsx/)).toBeInTheDocument();
      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          files: {
            test: {
              fileType: "file",
              id: "test",
              level: 1,
              name: "test.tsx",
              parentId: undefined,
              path: "test.tsx",
            },
          },
        },
        type: "filesData/updateInitialState",
      });
    });
  });
});
