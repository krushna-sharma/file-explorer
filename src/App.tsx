import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import FileExplorer from "./modules/FileExplorer/FileExplorer.component";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <FileExplorer />
            </div>
        </Provider>
    );
}

export default App;
