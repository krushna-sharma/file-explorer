import { data, dataWithFile } from "../../../mockData";
import Editor from "../../../modules/Editor/Editor.component";
import { renderWithProviders } from "../../../store/utils";
import axios from "axios";
import { screen, waitFor, act } from "@testing-library/react";

describe("Testing Editor component", () => {
  it("should render Editor component", async () => {
    renderWithProviders(<Editor />, {
      preloadedState: {
        files: {
          files: data,
          selectedFile: "",
        },
      },
    });
    await waitFor(() => {
      expect(screen.getByTestId("codeMirror")).toBeInTheDocument();
    });
  });

  it("should stringify the file content if the file is json file", async () => {
    jest
      .spyOn(axios, "get")
      .mockReturnValue(Promise.resolve({ data: { name: "John" } }));
    renderWithProviders(<Editor />, {
      preloadedState: {
        files: {
          files: {
            ...data,
            ...{
              app: {
                fileType: "file",
                id: "app",
                level: 1,
                name: "App.json",
                path: "root/App.json",
              },
            },
          },
          selectedFile: "app",
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByText(/John/)).toBeInTheDocument();
    });
  });

  it("should render file content as it is if it is not a json file", async () => {
    jest
      .spyOn(axios, "get")
      .mockReturnValue(Promise.resolve({ data: "console.log('data');" }));
    renderWithProviders(<Editor />, {
      preloadedState: {
        files: {
          files: dataWithFile,
          selectedFile: "anotherId",
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByText("console")).toBeInTheDocument();
      expect(screen.getByText("log")).toBeInTheDocument();
    });
  });

  it("should fetch the content for the file with specified path", async () => {
    const axiosMock = jest
      .spyOn(axios, "get")
      .mockReturnValue(Promise.resolve({ data: {} }));

    renderWithProviders(<Editor />, {
      preloadedState: {
        files: {
          files: dataWithFile,
          selectedFile: "anotherId",
        },
      },
    });

    expect(axiosMock).toHaveBeenCalledWith(
      "https://raw.githubusercontent.com/krushna-sharma/file-explorer/feature-vs-code/root/index.js"
    );
  });

  it.skip("should hide the loader if the api call fails", async () => {
    jest.spyOn(axios, "get").mockReturnValue(Promise.reject("Error"));

    renderWithProviders(<Editor />, {
      preloadedState: {
        files: {
          files: {
            ...data,
            ...{
              app: {
                fileType: "file",
                id: "app",
                level: 1,
                name: "App.tsx",
                path: "root/App.tsx",
              },
            },
          },
          selectedFile: "app",
        },
      },
    });
    await waitFor(() => {
      expect(screen.queryByText("loading...")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText("loading...")).not.toBeInTheDocument();
    });
  });
});
