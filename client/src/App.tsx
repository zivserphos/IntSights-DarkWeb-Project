import React from "react";
import { RecoilRoot } from "recoil";
import HomePage from "./components";

const App = function () {
  return (
    <RecoilRoot>
      <HomePage />
    </RecoilRoot>
  );
};

export default App;
