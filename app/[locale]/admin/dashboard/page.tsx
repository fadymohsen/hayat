"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { AdminDashboard } from "@/components/admin/Dashboard";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { locale } = useLanguage();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token !== "authenticated") {
      router.push(`/${locale}/admin`);
    } else {
      setAuthorized(true);
    }
  }, [locale, router]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-maad-600" />
      </div>
    );
  }

  return <AdminDashboard />;
}
