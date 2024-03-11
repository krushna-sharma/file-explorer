import React, { FC, useEffect, useState } from "react";
import { FileProps } from "../File/File.component";
import File from "../File/File.component";

interface FilesListProps {
    filesData: Record<string, FileProps>;
}

const FilesList: FC<FilesListProps> = ({ filesData }) => {
    const [data, setData] = useState<FileProps[]>([]);
    useEffect(() => {
        const allChild: FileProps[] = [];
        Object.keys(filesData).forEach((fileId) => {
            if (!filesData[fileId]?.parentId) {
                allChild.push(filesData[fileId]);
            }
        });
        setData(allChild);
    }, [filesData]);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {data.map((file) => {
                return <File key={file.id} {...file} />;
            })}
        </div>
    );
};

export default FilesList;
