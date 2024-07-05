import { FC, ReactElement } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CenteredTabs from "./components/CenteredTabs";
import CurriculumVitae from "./components/CurriculumVitae";

const App: FC = (): ReactElement => {
  return (
    <Router>
      <Header title="Okayy lets go" />
      <CenteredTabs />
      <Routes>
        <Route path="/" element={<CurriculumVitae/>} />
        <Route path="/api" element={<div>API stuff WIP</div>} />
        <Route path="/cache" element={<div>to be continued</div>} />
      </Routes>
    </Router>
  )
}

export default App;
