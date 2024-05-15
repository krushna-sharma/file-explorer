import { data } from "../../../mockData";
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
      expect(
        screen.getByText(/Select a file to show content./)
      ).toBeInTheDocument();
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
      expect(screen.getByText(/console.log/)).toBeInTheDocument();
    });
  });

  it("should fetch the content for the file with specified path", async () => {
    const axiosMock = jest
      .spyOn(axios, "get")
      .mockReturnValue(Promise.resolve({ data: {} }));

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

    expect(axiosMock).toHaveBeenCalledWith(
      "https://raw.githubusercontent.com/krushna-sharma/file-explorer/feature-vs-code/root/App.tsx"
    );
  });

  it("should hide the loader if the api call fails", async () => {
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
