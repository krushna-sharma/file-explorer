import React, { FC } from "react";
import { FileProps } from "../File/File.component";
import File from "../File/File.component";

interface FilesListProps {
    filesData: Record<string, FileProps>;
}

const FilesList: FC<FilesListProps> = ({ filesData }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <File {...filesData["root"]} />
        </div>
    );
};

export default FilesList;
