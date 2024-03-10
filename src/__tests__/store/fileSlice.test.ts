import { FileProps } from "../../modules/FileExplorer/components/File/File.component";
import reducer, {
    addFile,
    editFileName,
    deleteFile,
} from "../../store/filesSlice";
import { data } from "../../mockData";
import * as Utils from "../../utils/common";

test("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
        files: {
            root: {
                fileType: "folder",
                id: "root",
                isOpen: false,
                level: 0,
                name: "src",
            },
        },
    });
});

test("should add a new file", () => {
    const previousState: { files: Record<string, FileProps> } = { files: data };
    jest.spyOn(Utils, "getID").mockReturnValue("RANDOM_ID");
    expect(
        reducer(
            previousState,
            addFile({
                fileName: `src_0`,
                parentId: "root",
                fileType: "file",
                level: 1,
            })
        )
    ).toEqual({
        files: {
            root: {
                ...data.root,
                isOpen: true,
            },
            ...{
                RANDOM_ID: {
                    fileType: "file",
                    id: "RANDOM_ID",
                    isOpen: true,
                    level: 1,
                    name: "src_0",
                    parentId: "root",
                },
            },
        },
    });
});

test("should delete a file", () => {
    const previousState: { files: Record<string, FileProps> } = { files: data };
    expect(reducer(previousState, deleteFile({ id: "root" }))).toEqual({
        files: {},
    });
});

test("should edit the fileName", () => {
    const previousState: { files: Record<string, FileProps> } = { files: data };
    expect(
        reducer(previousState, editFileName({ id: "root", fileName: "source" }))
    ).toEqual({
        files: {
            root: {
                ...previousState.files.root,
                name: "source",
            },
        },
    });
});

test("should return a randomID", () => {
    jest.spyOn(Math, "random").mockImplementation(() => 0.1);

    expect(Utils.generateRandomID(8)).toEqual("GGGGGGGG");
});
