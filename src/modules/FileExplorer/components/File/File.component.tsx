import React, { FC, useState, useEffect, useRef } from "react";
import FileIcon from "./Icons/file_icon.png";
import FolderIcon from "./Icons/folder_icon.png";
import FolderOpenIcon from "./Icons/folder_open_icon.png";
import styles from "./file.module.css";
import {
    addFile,
    setIsOpen,
    deleteFile,
    editFileName,
    filesData,
} from "../../../../store/filesSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import FileActions from "../FileActions/FileActions.component";

export interface FileProps {
    parentId?: string;
    fileType: "file" | "folder";
    name: string;
    id: string;
    isOpen?: boolean;
    level: number;
}

const File: FC<FileProps> = ({ fileType, name, id, isOpen, level }) => {
    const [fileName, setFileName] = useState<string>(name);
    const [children, setChildren] = useState<FileProps[]>([]);
    const [isEditingFileName, setIsEditingFileName] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const files = useAppSelector(filesData);
    const dispatch = useAppDispatch();

    const inputRef: React.LegacyRef<HTMLInputElement> = useRef(null);

    useEffect(() => {
        if (isEditingFileName) {
            inputRef.current?.focus();
        }
    }, [isEditingFileName]);

    useEffect(() => {
        const allChild: FileProps[] = [];
        Object.keys(files).forEach((fileId) => {
            if (files[fileId]?.parentId === id) {
                allChild.push(files[fileId]);
            }
        });
        setChildren(allChild);
    }, [files, id]);

    const onEditClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        // should edit the file/folder name
        e.stopPropagation();
        setIsEditingFileName(true);
        // dispatch(editFileName({ id, fileName: "testing" }));
    };

    const onNewFileClick = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        // should add new file to the current folder
        e.stopPropagation();
        dispatch(
            addFile({
                fileName: `${name}_${children?.length}`,
                parentId: id,
                fileType: "file",
                level: level + 1,
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
                fileName: `${name}_${children?.length}`,
                parentId: id,
                fileType: "folder",
                level: level + 1,
            })
        );
    };

    const onDeleteClick = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        // should delete the current file/folder and all its children
        e.stopPropagation();
        dispatch(deleteFile({ id }));
    };

    const onFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setFileName(e.target.value);
    };

    const updateFileName = () => {
        if (fileName) {
            dispatch(editFileName({ id, fileName }));
        }
        setIsEditingFileName(false);
    };

    return (
        <>
            <div
                className={styles.container}
                style={{ paddingLeft: `${10 * level + 5}px` }}
                onClick={() => {
                    !isEditingFileName &&
                        dispatch(setIsOpen({ openState: !isOpen, id: id }));
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                title={name}
            >
                <div className={styles.icon}>
                    {fileType === "file" && (
                        <img src={FileIcon} alt="file_icon" />
                    )}
                    {fileType === "folder" && (
                        <img
                            src={isOpen ? FolderOpenIcon : FolderIcon}
                            alt="folder_icon"
                        />
                    )}
                </div>

                {!isEditingFileName && (
                    <div className={styles.fileName}>{fileName}</div>
                )}
                {isEditingFileName && (
                    <input
                        ref={inputRef}
                        className={styles.fileName}
                        defaultValue={fileName}
                        onChange={onFileNameChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                updateFileName();
                            }
                        }}
                        onBlur={() => updateFileName()}
                    ></input>
                )}

                <FileActions
                    show={isHovering}
                    fileType={fileType}
                    onEditClick={onEditClick}
                    onNewFileClick={onNewFileClick}
                    onNewFolderClick={onNewFolderClick}
                    onDeleteClick={onDeleteClick}
                />
            </div>
            {!!children?.length && isOpen && (
                <>
                    {children.map((childFile: FileProps) => (
                        <File key={childFile.id} {...childFile} />
                    ))}
                </>
            )}
        </>
    );
};

export default File;
