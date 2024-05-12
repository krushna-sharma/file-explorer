import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { filesData, selectedFile } from "../../store/filesSlice";

const Editor = () => {
  const [code, setCode] = useState("Select a file to show content.");
  const [loading, setLoading] = useState(false);
  const files = useSelector(filesData);
  const file = useSelector(selectedFile);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      axios
        .get(
          `https://raw.githubusercontent.com/krushna-sharma/file-explorer/feature-vs-code/${files[file].path}`
        )
        .then((resp) => {
          setLoading(false);
          if (typeof resp.data === "object") {
            setCode(JSON.stringify(resp.data));
          } else {
            setCode(resp.data);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    };

    // /Fetch the file code only if it a file and not folder.
    if (files?.[file]?.fileType === "file") {
      fetchData();
    }
  }, [files, file]);

  return loading ? <>loading...</> : <pre>{code}</pre>;
};

export default Editor;
