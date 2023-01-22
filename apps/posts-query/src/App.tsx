import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { PostsList } from "./PostsList/PostsList";

function App() {
  return (
    <div className="App">
      <PostsList />
    </div>
  );
}

export default App;
