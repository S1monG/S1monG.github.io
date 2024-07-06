import { FC, ReactElement } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CenteredTabs from "./components/CenteredTabs";
import Me from "./tabs/Me";

const App: FC = (): ReactElement => {
  return (
    <Router>
      <Header title="Okayy lets go" />
      <CenteredTabs />
      <Routes>
        <Route path="/" element={<Me/>} />
        <Route path="/api" element={<div>API stuff WIP</div>} />
        <Route path="/cache" element={<div>to be continued</div>} />
      </Routes>
    </Router>
  )
}

export default App;
