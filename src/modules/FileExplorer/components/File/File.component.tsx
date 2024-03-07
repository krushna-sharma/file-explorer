import React, { FC, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileIcon from "./Icons/file_icon.png";
import FolderIcon from "./Icons/folder_icon.png";
import FolderOpenIcon from "./Icons/folder_open_icon.png";
import EditIcon from "./Icons/edit_icon.png";
import DeleteIcon from "./Icons/delete_icon.png";
import styles from "./file.module.css";
import {
    addFile,
    setIsOpen,
    deleteFile,
    editFileName,
} from "../../../../store/filesSlice";

export enum FileType {
    FILE,
    FOLDER,
}

export interface FileProps {
    parentId?: string;
    fileType: FileType;
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
    const { files } = useSelector((state: any) => state.filesData);
    console.log("here", files);
    
    const dispatch = useDispatch();

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
                fileType: FileType.FILE,
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
                fileType: FileType.FOLDER,
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
                    !isEditingFileName && dispatch(setIsOpen({ openState: !isOpen, id: id }));
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                title={name}
            >
                <div className={styles.icon}>
                    {fileType === FileType.FILE && (
                        <img src={FileIcon} alt="file_icon" />
                    )}
                    {fileType === FileType.FOLDER && (
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

                {isHovering && (
                    <div className={styles.fileActions}>
                        <img
                            className={styles.icon}
                            src={EditIcon}
                            alt="edit_icon"
                            onClick={onEditClick}
                        />

                        {fileType === FileType.FOLDER && (
                            <>
                                <img
                                    className={styles.icon}
                                    src={FileIcon}
                                    alt="add_new_file_icon"
                                    onClick={onNewFileClick}
                                />

                                <img
                                    className={styles.icon}
                                    src={FolderIcon}
                                    alt="add_new_folder_icon"
                                    onClick={onNewFolderClick}
                                />
                            </>
                        )}

                        <img
                            className={styles.icon}
                            src={DeleteIcon}
                            alt="delete_icon"
                            onClick={onDeleteClick}
                        />
                    </div>
                )}
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
