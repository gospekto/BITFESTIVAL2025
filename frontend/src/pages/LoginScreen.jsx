import AuthForm from "../components/AuthForm";
import ToggleThemaButton from "../components/ToggleThemaButton";


function LoginScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6
                    bg-slate-50 text-slate-900
                    dark:bg-slate-950 dark:text-slate-100
                    transition-colors">
      <AuthForm />
      <ToggleThemaButton />
    </div>
  );
}

export default LoginScreen;
