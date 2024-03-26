import React, { Suspense, lazy, useEffect } from "react";
import styles from "./FileExplorer.module.css";
import { useSelector } from "react-redux";
import { addFile, filesData, updateInitialState } from "../../store/filesSlice";
import FileActions from "./components/FileActions/FileActions.component";
import { useAppDispatch } from "../../store/hooks";
import axios from "axios";
import { FileProps } from "./components/File/File.component";

const FileList = lazy(
    () => import("./components/FilesList/FilesList.component")
);

const FileExplorer = () => {
    const files = useSelector(filesData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        axios
            .get(
                "https://api.github.com/repos/krushna-sharma/file-explorer/git/trees/main?recursive=1"
            )
            .then((resp: any) => {
                let files: Record<string, FileProps> = {};
                let fileShaMap: Record<string, string> = {};
                resp.data.tree.forEach(
                    (val: {
                        mode: "040000" | "100644";
                        path: string;
                        sha: string;
                    }) => {
                        let data = val.path.split("/");
                        fileShaMap[data[data.length - 1]] = val.sha;
                        if (val.mode === "040000") {
                            files[val.sha] = {
                                fileType: "folder",
                                id: val.sha,
                                name: data[data.length - 1],
                                level: data.length,
                                parentId: fileShaMap[data[data.length - 2]],
                            };
                        } else {
                            files[val.sha] = {
                                fileType: "file",
                                id: val.sha,
                                name: data[data.length - 1],
                                level: data.length,
                                parentId: fileShaMap[data[data.length - 2]],
                            };
                        }
                    }
                );
                dispatch(updateInitialState({ files }));
            });
    }, [dispatch]);

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
            <div style={{ padding: "10px" }}>
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
