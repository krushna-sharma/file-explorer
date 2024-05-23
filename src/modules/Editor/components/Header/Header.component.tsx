import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  filesData,
  selectedFile,
  updateSelectedFile,
  removeRecentFiles,
} from "../../../../store/filesSlice";
import styles from "./header.module.css";
import cx from "classnames";
import { useAppDispatch } from "../../../../store/hooks";
import { RootState } from "../../../../store";
import { FileProps } from "../../../FileExplorer/components/File/File.component";

const FileBox = ({ fileData }: { fileData: FileProps }) => {
  const file = useSelector(selectedFile);
  const [showCloseBtn, setShowCloseBtn] = useState(file === fileData.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setShowCloseBtn(file === fileData.id);
  }, [file, fileData.id]);

  const onFileClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeRecentFiles({ fileId: fileData.id }));
  };
  return (
    <span
      className={cx(styles.fileBox, {
        [styles.selected]: file === fileData.id,
      })}
      onMouseEnter={() => file !== fileData.id && setShowCloseBtn(true)}
      onMouseLeave={() => file !== fileData.id && setShowCloseBtn(false)}
      onClick={() =>
        dispatch(updateSelectedFile({ selectedFileId: fileData.id }))
      }
    >
      {fileData.name}
      {showCloseBtn && <button onClick={onFileClose}>×</button>}

      {!showCloseBtn && <span style={{ height: "16px", width: "14px" }}></span>}
    </span>
  );
};

const EditorHeader = () => {
  const files = useSelector(filesData);
  const recentFiles = useSelector(
    (state: RootState) => state.files.recentFiles
  );

  return (
    <div className={styles.container}>
      {recentFiles?.map((recentFileId) => (
        <FileBox key={recentFileId} fileData={files[recentFileId]} />
      ))}
    </div>
  );
};

export default EditorHeader;
