import React, { useState } from "react";
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

const FileBox = ({ fileData }: any) => {
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const file = useSelector(selectedFile);
  const dispatch = useAppDispatch();

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
      onMouseEnter={() => setShowCloseBtn(true)}
      onMouseLeave={() => setShowCloseBtn(false)}
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
  console.log(recentFiles);

  return (
    <div className={styles.container}>
      {recentFiles?.map((recentFileId) => (
        <FileBox key={recentFileId} fileData={files[recentFileId]} />
      ))}
    </div>
  );
};

export default EditorHeader;
