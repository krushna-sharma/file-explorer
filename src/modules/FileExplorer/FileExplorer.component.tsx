import React, { Suspense, lazy } from "react";
import styles from "./FileExplorer.module.css";
import { useSelector } from "react-redux";
import { filesData } from "../../store/filesSlice";

const FileList = lazy(
    () => import("./components/FilesList/FilesList.component")
);

const FileExplorer = () => {
    const files = useSelector(filesData);

    return (
        <div className={styles.container}>
            <Suspense fallback="loading...">
                {Object.keys(files).length > 0 && (
                    <FileList filesData={files} />
                )}
            </Suspense>
        </div>
    );
};

export default FileExplorer;
