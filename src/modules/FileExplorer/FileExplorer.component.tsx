import React, { Suspense, lazy } from "react";
import { FileProps, FileType } from "./components/File/File.component";
import styles from "./FileExplorer.module.css";
import { useSelector } from "react-redux";

const FileList = lazy(
    () => import("./components/FilesList/FilesList.component")
);

export const data: FileProps[] = [
    {
        fileType: FileType.FOLDER,
        id: "root",
        name: "src",
        isOpen: false
        //     children: [
        //         { fileType: FileType.FILE, name: "App.tsx" },
        //         { fileType: FileType.FILE, name: "App.css" },
        //         {
        //             fileType: FileType.FOLDER,
        //             name: "__tests__",
        //             children: [{ fileType: FileType.FILE, name: "test.tsx" }],
        //         },
        //     ],
        // },
        // {
        //     fileType: FileType.FILE,
        //     name: "package.json",
    },
];

const FileExplorer = () => {
    const { files } = useSelector((state: any) => state.filesData);
    console.log(files);

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
