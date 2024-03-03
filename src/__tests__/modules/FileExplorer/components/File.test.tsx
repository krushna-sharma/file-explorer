import { fireEvent, render, screen } from "@testing-library/react";
import File, {
    FileType,
} from "../../../../modules/FileExplorer/components/File/File.component";

describe("Testing File component...", () => {
    it("Should have a name associated with the file/folder", () => {
        render(<File fileType={FileType.FILE} name="test.tsx" />);
        expect(screen.getByText("test.tsx")).toBeInTheDocument();
    });

    it("if file type is file should show a file icon", () => {
        render(<File fileType={FileType.FILE} name="test.tsx" />);
        expect(screen.getByRole("img")).toHaveAttribute("src", "file_icon.png");
    });

    it("should open the folder on click and show it's children", () => {
        render(
            <File
                fileType={FileType.FOLDER}
                name="test.tsx"
                children={[{ fileType: FileType.FILE, name: "child.tsx" }]}
            />
        );
        const button = screen.getByText("test.tsx");
        fireEvent.click(button);
        expect(screen.getByText("child.tsx")).toBeInTheDocument();
    });

    it("hover over file should show 2 buttons", () => {});

    it("if file type is folder should show a folder icon", () => {
        render(<File fileType={FileType.FOLDER} name="test.tsx" />);
        expect(screen.getByRole("img")).toHaveAttribute(
            "src",
            "folder_icon.png"
        );
    });

    it("hover over folder should show 4 buttons", () => {});
});
