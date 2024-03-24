import React, { FC } from "react";
import styles from "./file.module.css";

interface IconButtonProps {
    onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
    src: string;
    dataTestId: string;
    altText: string;
}

const IconButton: FC<IconButtonProps> = ({
    onClick,
    src,
    dataTestId,
    altText,
}) => {
    return (
        <img
            data-testid={dataTestId}
            className={styles.icon}
            src={src}
            alt={altText}
            onClick={onClick}
        />
    );
};

export default IconButton;
