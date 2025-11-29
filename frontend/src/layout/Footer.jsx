export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
      © {new Date().getFullYear()} Helpi — Razem możemy więcej.
    </footer>
  );
}
