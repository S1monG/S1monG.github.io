import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CenteredTabs from "./components/CenteredTabs";

function App() {
  return (
    <Router>
      <Header title="Okayy lets go" />
      <CenteredTabs />
      <Routes>
        {/* change the elements to functional components when ready */}
        <Route path="/" element={<div>Me</div>} />
        <Route path="/api" element={<div>API Platform</div>} />
        <Route path="/cache" element={<div>to be continued</div>} />
      </Routes>
    </Router>
  )
}

export default App;
