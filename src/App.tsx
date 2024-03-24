import React from "react";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import FileExplorer from "./modules/FileExplorer/FileExplorer.component";
import styles from "./App.module.css";
// import Markdown from "react-markdown";
// import axios from "axios";

function App() {
    // const [markdown, setMarkdown] = useState("# Hi, *INDIA*!");

    // useEffect(() => {
    //     const fetchData = async () => {
    //         // await fetch(
    //         //     "https://raw.githubusercontent.com/krushna-sharma/file-explorer/main/README.md",
    //         //     {}
    //         // )
    //         //     .then((resp) => console.log(new ReadableStream(resp.body)))
    //         //     .then((data) => console.log(data));

    //         axios
    //             .get(
    //                 "https://raw.githubusercontent.com/krushna-sharma/file-explorer/main/README.md"
    //             )
    //             .then((resp) => setMarkdown(resp.data));
    //     };
    //     fetchData();
    // }, []);

    return (
        <Provider store={setupStore()}>
            <div className={styles.container}>
                <div className={styles.FileExplorer}>
                    <FileExplorer />
                </div>
                <div className={styles.content}>
                    File content should come here.
                    {/* <Markdown>{markdown}</Markdown> */}
                </div>
            </div>
        </Provider>
    );
}

export default App;
