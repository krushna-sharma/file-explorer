import React, { FC, useEffect, useState } from "react";
import { FileProps } from "../File/File.component";
import File from "../File/File.component";
import styles from "./FilesList.module.css";

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
    <div className={styles.container}>
      {data.map((file) => {
        return <File key={file.id} {...file} />;
      })}
    </div>
  );
};

export default FilesList;
