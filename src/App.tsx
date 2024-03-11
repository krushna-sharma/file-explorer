import React from "react";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import FileExplorer from "./modules/FileExplorer/FileExplorer.component";
import styles from "./App.module.css";

function App() {
    return (
        <Provider store={setupStore()}>
            <div className={styles.container}>
                <div className={styles.FileExplorer}>
                    <FileExplorer />
                </div>
                <div className={styles.content}>
                    Here will go my content
                </div>
            </div>
        </Provider>
    );
}

export default App;
