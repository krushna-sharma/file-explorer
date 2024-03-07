// import { FileType } from "../../../modules/FileExplorer/components/File/File.component";

export enum FileType {
    FILE,
    FOLDER,
}

export const data = {
    root: {
        fileType: FileType.FOLDER,
        id: "root",
        level: 0,
        name: "src",
    },
};
