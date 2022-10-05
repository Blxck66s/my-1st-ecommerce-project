import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import Router from "./Routes/Router";

function App() {
  const { user, waitUser } = useContext(AuthContext);

  if (waitUser) return <div> waiting </div>;
  return (
    <div className="App font-Kanit">
      <Router />
    </div>
  );
}

export default App;
