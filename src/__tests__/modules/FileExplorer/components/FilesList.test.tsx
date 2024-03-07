import { render, screen } from "@testing-library/react";
import FilesList from "../../../../modules/FileExplorer/components/FilesList/FilesList.component";
import { data } from "../mockData";

describe("Testing FilesList component", () => {
    it("should render a list of files and folders of data is present", () => {
        render(<FilesList filesData={data} />);
        expect(screen.getByText("src")).toBeInTheDocument();
    });

    it("should not render a list of files and folders of data is not present", () => {
        render(<FilesList filesData={{}} />);
        expect(screen.queryByText("src")).not.toBeInTheDocument();
    });
});
