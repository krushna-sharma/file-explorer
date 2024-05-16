import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { filesData, selectedFile } from "../../store/filesSlice";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import EditorHeader from "./components/Header/Header.component";

const Editor = () => {
  const [code, setCode] = useState("Select a file to show content.");
  // const [loading, setLoading] = useState(false);
  const files = useSelector(filesData);
  const file = useSelector(selectedFile);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      axios
        .get(
          `https://raw.githubusercontent.com/krushna-sharma/file-explorer/feature-vs-code/${files[file].path}`
        )
        .then((resp) => {
          // setLoading(false);
          if (typeof resp.data === "object") {
            setCode(JSON.stringify(resp.data));
          } else {
            setCode(resp.data);
          }
        })
        .catch((err) => {
          // console.log(err);
          // setLoading(false);
        });
    };

    // /Fetch the file code only if it a file and not folder.
    if (files?.[file]?.fileType === "file") {
      fetchData();
    }

    if (!file) {
      setCode("Select a file to show content.");
    }
  }, [files, file]);

  // return loading ? <>loading...</> : <pre>{code}</pre>;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <EditorHeader />
      <CodeMirror
        data-testid="codeMirror"
        value={code}
        height="100%"
        extensions={[javascript({ jsx: true })]}
        style={{ height: "100%", width: "100%" }}
        theme={okaidia}
        editable={false}
      />
    </div>
  );
};

export default Editor;
