import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import File from "../../../../modules/FileExplorer/components/File/File.component";
import { renderWithProviders } from "../../../../store/utils";
import * as Actions from "../../../../store/hooks";

describe("Testing File component...", () => {
    it("Should have a name associated with the file/folder", () => {
        renderWithProviders(
            <File
                fileType={"file"}
                name="test.tsx"
                id="test"
                level={2}
                parentId="root"
            />
        );
        expect(screen.getByText("test.tsx")).toBeInTheDocument();
    });

    it("if file type is file should show a file icon", () => {
        renderWithProviders(
            <File fileType={"file"} name="test.tsx" id="test" level={2} />
        );
        expect(screen.getByRole("img")).toHaveAttribute("src", "file_icon.png");
    });
    it("should open the folder on click and show it's children", () => {
        renderWithProviders(
            <File fileType={"folder"} name="src" id="root" level={0} isOpen />,
            {
                preloadedState: {
                    files: {
                        files: {
                            root: {
                                fileType: "folder",
                                id: "root",
                                name: "src",
                                level: 0,
                                isOpen: true,
                            },
                            child: {
                                fileType: "file",
                                id: "child",
                                name: "child.tsx",
                                level: 1,
                                parentId: "root",
                            },
                        },
                    },
                },
            }
        );
        const button = screen.getByText("src");
        fireEvent.click(button);
        // expect(mockDispatch).toHaveBeenCalledWith({});
        expect(screen.getByText("child.tsx")).toBeInTheDocument();
    });

    it("hover over file should show 2 buttons", () => {
        renderWithProviders(
            <File
                fileType={"file"}
                name="test.tsx"
                id="test"
                level={2}
                parentId="root"
            />
        );
        let fileComponent = screen.getByText("test.tsx");
        userEvent.hover(fileComponent);
        screen.debug();
        expect(screen.getByTestId("editIcon")).toBeInTheDocument();
        expect(screen.getByTestId("deleteIcon")).toBeInTheDocument();
    });

    it("if file type is folder should show a folder icon", () => {
        renderWithProviders(
            <File fileType={"folder"} name="src" id="root" level={0} />
        );
        expect(screen.getByRole("img")).toHaveAttribute(
            "src",
            "folder_icon.png"
        );
    });

    it("hover over folder should show 4 buttons", () => {
        renderWithProviders(
            <File fileType={"folder"} name="src" id="root" level={0} />
        );
        let fileComponent = screen.getByText("src");
        userEvent.hover(fileComponent);
        expect(screen.getByTestId("editIcon")).toBeInTheDocument();
        expect(screen.getByTestId("deleteIcon")).toBeInTheDocument();
        expect(screen.getByTestId("addFileIcon")).toBeInTheDocument();
        expect(screen.getByTestId("addFolderIcon")).toBeInTheDocument();
    });

    it("edit button click should enable input component", () => {
        renderWithProviders(
            <File fileType={"folder"} name="src" id="root" level={0} />
        );
        let fileComponent = screen.getByText("src");
        userEvent.hover(fileComponent);
        let editButton = screen.getByTestId("editIcon");
        fireEvent.click(editButton);
        expect(screen.getByDisplayValue("src")).toBeInTheDocument();
    });

    it("file name should be editable", () => {
        let dispatch = jest.fn();
        jest.spyOn(Actions, "useAppDispatch").mockReturnValue(dispatch);
        renderWithProviders(
            <File fileType={"folder"} name="src" id="root" level={0} />
        );
        let fileComponent = screen.getByText("src");
        userEvent.hover(fileComponent);
        let editButton = screen.getByTestId("editIcon");
        fireEvent.click(editButton);
        let inputComp = screen.getByDisplayValue("src");
        userEvent.type(inputComp, "source{enter}");
        expect(dispatch).toHaveBeenCalledWith({
            payload: { fileName: "srcsource", id: "root" },
            type: "filesData/editFileName",
        });
    });

    it("should delete a file when delete button is clicked", () => {
        let dispatch = jest.fn();
        jest.spyOn(Actions, "useAppDispatch").mockReturnValue(dispatch);
        renderWithProviders(
            <File fileType={"folder"} name="src" id="root" level={0} />
        );
        let fileComponent = screen.getByText("src");
        userEvent.hover(fileComponent);
        let deleteButton = screen.getByTestId("deleteIcon");
        fireEvent.click(deleteButton);
        expect(dispatch).toHaveBeenCalledWith({
            payload: { id: "root" },
            type: "filesData/deleteFile",
        });
    });
    it("should add a file when add new file button is clicked", () => {
        let dispatch = jest.fn();
        jest.spyOn(Actions, "useAppDispatch").mockReturnValue(dispatch);
        renderWithProviders(
            <File fileType={"folder"} name="src" id="root" level={0} />
        );
        let fileComponent = screen.getByText("src");
        userEvent.hover(fileComponent);
        let addFileButton = screen.getByTestId("addFileIcon");
        fireEvent.click(addFileButton);
        expect(dispatch).toHaveBeenCalledWith({
            payload: {
                fileName: "src_0",
                fileType: "file",
                level: 1,
                parentId: "root",
            },
            type: "filesData/addFile",
        });
    });

    it("should add a file when add new file button is clicked", () => {
        let dispatch = jest.fn();
        jest.spyOn(Actions, "useAppDispatch").mockReturnValue(dispatch);
        renderWithProviders(
            <File fileType={"folder"} name="src" id="root" level={0} />
        );
        let fileComponent = screen.getByText("src");
        userEvent.hover(fileComponent);
        let addFolderButton = screen.getByTestId("addFolderIcon");
        fireEvent.click(addFolderButton);
        expect(dispatch).toHaveBeenCalledWith({
            payload: {
                fileName: "src_0",
                fileType: "folder",
                level: 1,
                parentId: "root",
            },
            type: "filesData/addFile",
        });
    });
});
