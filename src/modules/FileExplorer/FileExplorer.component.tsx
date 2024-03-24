import React, { Suspense, lazy } from "react";
import styles from "./FileExplorer.module.css";
import { useSelector } from "react-redux";
import { addFile, filesData } from "../../store/filesSlice";
import FileActions from "./components/FileActions/FileActions.component";
import { useAppDispatch } from "../../store/hooks";

const FileList = lazy(
    () => import("./components/FilesList/FilesList.component")
);

const FileExplorer = () => {
    const files = useSelector(filesData);
    const dispatch = useAppDispatch();

    const onNewFileClick = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        // should add new file to the current folder
        e.stopPropagation();
        dispatch(
            addFile({
                fileName: `new_file`,
                fileType: "file",
            })
        );
    };

    const onNewFolderClick = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        // should add new folder to the current folder
        e.stopPropagation();
        dispatch(
            addFile({
                fileName: `new_folder`,
                fileType: "folder",
            })
        );
    };

    return (
        <div className={styles.container}>
            <div style={{padding: '10px'}}>
                <FileActions
                    show
                    isTab
                    onNewFileClick={onNewFileClick}
                    onNewFolderClick={onNewFolderClick}
                />
            </div>
            <Suspense fallback="loading...">
                {Object.keys(files).length > 0 && (
                    <FileList filesData={files} />
                )}
            </Suspense>
        </div>
    );
};

export default FileExplorer;
