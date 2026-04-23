"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User } from "lucide-react";

import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const { locale } = useLanguage();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        localStorage.setItem("admin_token", "authenticated");
        router.push(`/${locale}/admin/dashboard`);
      } else {
        setError("Access denied. Please check your password.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-4">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-maad-600/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-maad-400/5 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/80 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-maad-600 shadow-xl shadow-maad-600/20">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Management</h1>
            <p className="mt-3 text-slate-500 font-medium">Hayat Admin Portal</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Access Key</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-maad-500">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-12 h-14 rounded-2xl border-slate-200 bg-white/50 text-lg transition-all focus:ring-4 focus:ring-maad-500/10 dark:border-slate-800 dark:bg-slate-950/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-semibold text-red-500 ml-1"
              >
                {error}
              </motion.p>
            )}
            
            <Button 
              type="submit" 
              className="group relative w-full h-14 rounded-2xl bg-slate-900 text-lg font-bold text-white transition-all hover:bg-slate-800 hover:shadow-2xl dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100" 
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Authorize Access
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-xs font-medium uppercase tracking-widest text-slate-400">
            Protected Environment
          </div>
        </div>
      </motion.div>
    </div>
  );
}
