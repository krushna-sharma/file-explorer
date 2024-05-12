import React from "react";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import FileExplorer from "./modules/FileExplorer/FileExplorer.component";
import styles from "./App.module.css";
import Editor from "./modules/Editor/Editor.component";

function App() {
  return (
    <Provider store={setupStore()}>
      <div className={styles.container}>
        <div className={styles.fileExplorer}>
          <FileExplorer />
        </div>
        <div className={styles.content}>
          <Editor />
        </div>
      </div>
    </Provider>
  );
}

export default App;
