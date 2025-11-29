import ToggleThemaButton from "../components/ToggleThemaButton";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col transition-colors
                    bg-slate-50 text-slate-900 
                    dark:bg-slate-950 dark:text-slate-100">

      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
      <ToggleThemaButton />
    </div>
  );
}
