import { FileProps } from "./modules/FileExplorer/components/File/File.component";

export const data: Record<string, FileProps> = {
  root: {
    fileType: "folder",
    id: "root",
    level: 0,
    name: "src",
    path: "",
  },
};

export const dataWithFile: Record<string, FileProps> = {
  ...data,
  someId: {
    fileType: "folder",
    id: "someId",
    level: 0,
    name: "src",
    parentId: "root",
    path: "root/src",
  },
  anotherId: {
    fileType: "file",
    id: "anotherId",
    level: 0,
    name: "index.js",
    parentId: "someId",
    path: "root/index.js",
  },
};
