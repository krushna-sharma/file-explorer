import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  filesData,
  selectedFile,
  updateSelectedFile,
} from "../../../../store/filesSlice";
import styles from "./header.module.css";
import cx from "classnames";
import { useAppDispatch } from "../../../../store/hooks";

const FileBox = ({ fileData }: any) => {
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const file = useSelector(selectedFile);
  const dispatch = useAppDispatch();

  const onFileClose = (fileId: string) => {
    dispatch(updateSelectedFile(""));
  };
  return (
    <span
      className={cx(styles.fileBox, {
        [styles.selected]: file === fileData.id,
      })}
      onMouseEnter={() => setShowCloseBtn(true)}
      onMouseLeave={() => setShowCloseBtn(false)}
      onClick={() => dispatch(updateSelectedFile(fileData.id))}
    >
      {fileData.name}
      {showCloseBtn && (
        <button onClick={() => onFileClose(fileData.id)}>×</button>
      )}

      {!showCloseBtn && <span style={{ height: "16px", width: "14px" }}></span>}
    </span>
  );
};

const EditorHeader = () => {
  const files = useSelector(filesData);
  const file = useSelector(selectedFile);

  return file && files?.[file].fileType === "file" ? (
    <div className={styles.container}>
      <FileBox fileData={files[file]} />
    </div>
  ) : (
    <></>
  );
};

export default EditorHeader;
