import { FileProps } from "../modules/FileExplorer/components/File/File.component";
import { createSlice } from "@reduxjs/toolkit";
import { getID } from "../utils/common";
import { RootState } from ".";

const initialState: { files: Record<string, FileProps> } = {
    files: {
        root: {
            fileType: "folder",
            id: "root",
            name: "src",
            isOpen: false,
            level: 0,
        },
    },
};

const filesSlice = createSlice({
    name: "filesData",
    initialState: initialState,
    reducers: {
        addFile: (state, props) => {
            const id = getID();
            const { fileName, parentId, fileType, level } = props.payload;
            state.files[id] = {
                fileType: fileType,
                id: id,
                name: fileName,
                parentId: parentId,
                isOpen: fileType === "file" ? true : false,
                level,
            };
            if (parentId) {
                state.files[parentId].isOpen = true;
            }
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
            // TODO: Should also delete all its children if it is a folder
            delete state.files[props.payload.id];
        },
    },
});
export const filesData = (state: RootState) => state.files.files;
export const { addFile, setIsOpen, editFileName, deleteFile } =
    filesSlice.actions;
export default filesSlice.reducer;
