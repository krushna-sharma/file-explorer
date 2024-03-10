import { screen } from "@testing-library/react";
import FilesList from "../../../../modules/FileExplorer/components/FilesList/FilesList.component";
import { data } from "../../../../mockData";
import { renderWithProviders } from "../../../../store/utils";

describe("Testing FilesList component", () => {
    it("should render a list of files and folders of data is present", () => {
        renderWithProviders(<FilesList filesData={data} />);
        expect(screen.getByText("src")).toBeInTheDocument();
    });

    it("should not render a list of files and folders of data is not present", () => {
        renderWithProviders(<FilesList filesData={{}} />);
        expect(screen.queryByText("src")).not.toBeInTheDocument();
    });
});
