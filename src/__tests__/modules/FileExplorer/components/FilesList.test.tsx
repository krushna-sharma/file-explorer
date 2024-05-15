import { screen } from "@testing-library/react";
import FilesList from "../../../../modules/FileExplorer/components/FilesList/FilesList.component";
import { data } from "../../../../mockData";
import { renderWithProviders } from "../../../../store/utils";

describe("Testing FilesList component", () => {
  it("should render a list of files and folders if data is present", () => {
    renderWithProviders(
      <FilesList
        filesData={{
          ...data,
          ...{
            someId: {
              fileType: "folder",
              id: "someId",
              level: 0,
              name: "src",
              parentId: "root",
              path: "root/src",
            },
          },
        }}
      />
    );
    expect(screen.getByText("src")).toBeInTheDocument();
  });

  it("should not render a list of files and folders if data is not present", () => {
    renderWithProviders(<FilesList filesData={{}} />);
    expect(screen.queryByText("src")).not.toBeInTheDocument();
  });
});
