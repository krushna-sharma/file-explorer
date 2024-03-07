import { fireEvent, render, screen } from "@testing-library/react";
import File, {
} from "../../../../modules/FileExplorer/components/File/File.component";
import { Provider } from "react-redux";
import { store } from "../../../../store";
import { FileType } from "../mockData";

describe("Testing File component...", () => {
    it.only("Should have a name associated with the file/folder", () => {
        render(
            <Provider store={store}>
                <File
                    fileType={FileType.FILE}
                    name="test.tsx"
                    id="test"
                    level={2}
                    parentId="root"
                />
            </Provider>
        );
        expect(screen.getByText("test.tsx")).toBeInTheDocument();
    });

    it("if file type is file should show a file icon", () => {
        render(
            <File
                fileType={FileType.FILE}
                name="test.tsx"
                id="test"
                level={2}
            />
        );
        expect(screen.getByRole("img")).toHaveAttribute("src", "file_icon.png");
    });

    it("should open the folder on click and show it's children", () => {
        render(
            <File
                fileType={FileType.FOLDER}
                name="test.tsx"
                id="test"
                level={2}
            />
        );
        const button = screen.getByText("test.tsx");
        fireEvent.click(button);
        expect(screen.getByText("child.tsx")).toBeInTheDocument();
    });

    it("hover over file should show 2 buttons", () => {});

    it("if file type is folder should show a folder icon", () => {
        render(
            <File
                fileType={FileType.FOLDER}
                name="test.tsx"
                id="test"
                level={2}
            />
        );
        expect(screen.getByRole("img")).toHaveAttribute(
            "src",
            "folder_icon.png"
        );
    });

    it("hover over folder should show 4 buttons", () => {});
});
