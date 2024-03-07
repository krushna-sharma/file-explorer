import {
    FileProps,
    FileType,
} from "../modules/FileExplorer/components/File/File.component";
import { createSlice } from "@reduxjs/toolkit";
import { getID } from "../utils/common";

const initialState: { files: Record<string, FileProps> } = {
    files: {
        root: {
            fileType: FileType.FOLDER,
            id: "root",
            name: "src",
            isOpen: true,
            level: 0,
        },
    },
};

const filesSlice = createSlice({
    name: "filesData",
    initialState: initialState,
    reducers: {
        addFile: (state, props) => {
            console.log("props: ", props);

            const id = getID();
            const { fileName, parentId, fileType, level } = props.payload;
            state.files[id] = {
                fileType: fileType,
                id: id,
                name: fileName,
                parentId: parentId,
                isOpen: fileType === FileType.FILE ? true : false,
                level,
            };
            state.files[parentId].isOpen = true;
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

export const { addFile, setIsOpen, editFileName, deleteFile } =
    filesSlice.actions;
export default filesSlice.reducer;
