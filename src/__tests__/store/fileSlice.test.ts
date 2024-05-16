import reducer, {
  addFile,
  editFileName,
  deleteFile,
  FilesState,
  updateSelectedFile,
  updateInitialState,
} from "../../store/filesSlice";
import { data, dataWithFile } from "../../mockData";
import * as Utils from "../../utils/common";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: "unknown" })).toEqual({
    selectedFile: "",
    files: {
      root: {
        fileType: "folder",
        id: "root",
        isOpen: false,
        level: 0,
        name: "src",
        path: "",
      },
    },
  });
});

test("should add a new file as a child of the selected file", () => {
  const previousState: FilesState = { files: data, selectedFile: "root" };
  jest.spyOn(Utils, "generateID").mockReturnValue("RANDOM_ID");
  expect(
    reducer(
      previousState,
      addFile({
        fileName: `src_0`,
        parentId: "root",
        fileType: "file",
        level: 1,
        path: "",
      })
    )
  ).toEqual({
    selectedFile: "RANDOM_ID",
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
          path: "",
        },
      },
    },
  });
});

test("should add a new file on the root level if there is no selectedFile", () => {
  const previousState: FilesState = { files: data, selectedFile: "" };
  jest.spyOn(Utils, "generateID").mockReturnValue("RANDOM_ID");
  expect(
    reducer(
      previousState,
      addFile({
        fileName: `src_0`,
        parentId: "",
        fileType: "file",
        path: "",
      })
    )
  ).toEqual({
    selectedFile: "RANDOM_ID",
    files: {
      ...data,
      RANDOM_ID: {
        fileType: "file",
        id: "RANDOM_ID",
        isOpen: true,
        level: 0,
        name: "src_0",
        path: "",
      },
    },
  });
});

test("should delete a file", () => {
  const previousState: FilesState = {
    files: dataWithFile,
    selectedFile: "",
  };
  expect(reducer(previousState, deleteFile({ id: "root" }))).toEqual({
    files: {},
    selectedFile: "",
  });
});

test("should edit the fileName", () => {
  const previousState: FilesState = { files: data, selectedFile: "" };
  expect(
    reducer(previousState, editFileName({ id: "root", fileName: "source" }))
  ).toEqual({
    selectedFile: "",
    files: {
      root: {
        ...previousState.files.root,
        name: "source",
      },
    },
  });
});

test("should updated the selectedFile id", () => {
  const previousState: FilesState = { files: data, selectedFile: "" };
  expect(
    reducer(previousState, updateSelectedFile({ selectedFileId: "root" }))
  ).toEqual({
    ...previousState,
    selectedFile: "root",
  });
});

test("should update the initial state", () => {
  const previousState: FilesState = { files: data, selectedFile: "" };
  expect(
    reducer(
      previousState,
      updateInitialState({ files: {}, selectedFile: "root" })
    )
  ).toEqual({
    files: {},
    selectedFile: "root",
  });
});

test("should update the initial state", () => {
  const previousState: FilesState = { files: data, selectedFile: "" };
  expect(reducer(previousState, updateInitialState({}))).toEqual({
    ...previousState,
    selectedFile: "",
  });
});
