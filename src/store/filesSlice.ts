import { FileProps } from "../modules/FileExplorer/components/File/File.component";
import { createSlice } from "@reduxjs/toolkit";
import { generateID } from "../utils/common";
import { RootState } from ".";

export interface FilesState {
  files: Record<string, FileProps>;
  selectedFile: string;
}

const initialState: FilesState = {
  files: {
    root: {
      fileType: "folder",
      id: "root",
      name: "src",
      isOpen: false,
      level: 0,
      path: "",
    },
  },
  selectedFile: "",
};

const filesSlice = createSlice({
  name: "filesData",
  initialState: initialState,
  reducers: {
    updateInitialState: (state, props) => {
      state.files = props.payload.files || state.files;
      state.selectedFile = props.payload.selectedFile || state.selectedFile;
    },
    addFile: (state, props) => {
      const id = generateID();
      const { fileName, fileType } = props.payload;
      if (state.selectedFile) {
        const {
          level: selectedFileLevel,
          fileType: selectedFileType,
          parentId: selectedParentId,
        } = state.files[state.selectedFile];

        state.files[id] = {
          fileType: fileType,
          id: id,
          name: fileName,
          parentId:
            selectedFileType === "folder"
              ? state.selectedFile
              : selectedParentId,
          isOpen: fileType === "file" ? true : false,
          level:
            selectedFileType === "folder"
              ? selectedFileLevel + 1
              : selectedFileLevel,
          path: "",
        };
      } else {
        state.files[id] = {
          fileType: fileType,
          id: id,
          name: fileName,
          level: 0,
          path: "",
        };
      }
      if (state.selectedFile) {
        state.files[state.selectedFile].isOpen = true;
      }
      state.selectedFile = id; // Select the newly added file/folder
      state.files[state.selectedFile].isOpen = true;
    },
    setIsOpen: (state, props) => {
      // TODO: Might want to check if we want to close all of child folder as well.
      // Does not happen in VS Code though.
      const { openState, id } = props.payload;
      Object.assign(state.files[id], { isOpen: openState });
    },
    editFileName: (state, props) => {
      const { id, fileName } = props.payload;
      state.files[id] = { ...state.files[id], name: fileName };
    },

    deleteFile: (state, props) => {
      for (const key in state.files) {
        if (state.files[key].parentId === props.payload.id) {
          // Recursively call deleteFile function for all its children
          if (state.files[key].fileType === "folder") {
            filesSlice.caseReducers.deleteFile(state, {
              payload: {
                id: state.files[key].id,
              },
              type: "filesData/deleteFile",
            });
          }
          delete state.files[key];
        }
      }
      delete state.files[props.payload.id];
    },
    updateSelectedFile: (state, props) => {
      state.selectedFile = props.payload.selectedFileId;
    },
  },
});
export const filesData = (state: RootState) => state.files.files;
export const selectedFile = (state: RootState) => state.files.selectedFile;
export const {
  addFile,
  setIsOpen,
  editFileName,
  deleteFile,
  updateSelectedFile,
  updateInitialState,
} = filesSlice.actions;
export default filesSlice.reducer;
