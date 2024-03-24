import React, { FC } from "react";
import styles from "./fileActions.module.css";
import IconButton from "../File/IconButton";
// import { FileProps } from "../File/File.component";
import FileIcon from "../File/Icons/file_icon.png";
import FolderIcon from "../File/Icons/folder_icon.png";
import EditIcon from "../File/Icons/edit_icon.png";
import DeleteIcon from "../File/Icons/delete_icon.png";

interface FileActionsProps {
    show: boolean;
    // fileType: FileProps["fileType"];
    isTab?: boolean;
    onEditClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
    onNewFileClick?: (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => void;
    onNewFolderClick?: (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => void;
    onDeleteClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

const FileActions: FC<FileActionsProps> = ({
    show,
    // fileType,
    isTab = false,
    onEditClick,
    onNewFileClick,
    onNewFolderClick,
    onDeleteClick,
}) => {
    return show ? (
        <div className={styles.fileActions}>
            {!isTab && (
                <IconButton
                    dataTestId="editIcon"
                    altText="edit_icon"
                    onClick={onEditClick}
                    src={EditIcon}
                />
            )}

            {onNewFileClick && (
                <IconButton
                    dataTestId="addFileIcon"
                    altText="add_new_file_icon"
                    onClick={onNewFileClick}
                    src={FileIcon}
                />
            )}
            {onNewFolderClick && (
                <IconButton
                    dataTestId="addFolderIcon"
                    altText="add_new_folder_icon"
                    onClick={onNewFolderClick}
                    src={FolderIcon}
                />
            )}

            {!isTab && (
                <IconButton
                    dataTestId="deleteIcon"
                    altText="delete_icon"
                    onClick={onDeleteClick}
                    src={DeleteIcon}
                />
            )}
        </div>
    ) : (
        <></>
    );
};

export default FileActions;
