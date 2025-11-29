import { Outlet } from "react-router-dom";
import ToggleThemaButton from "./components/ToggleThemaButton";

function App() {
  return (
    <div className="min-h-screen transition-colors
                    bg-slate-50 text-slate-900
                    dark:bg-slate-950 dark:text-slate-100">
      <Outlet />
      <ToggleThemaButton />
    </div>
  );
}

export default App;
