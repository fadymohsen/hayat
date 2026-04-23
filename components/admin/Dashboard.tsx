"use client";

import { useState, useEffect } from "react";
import { Project, Job } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, LayoutGrid, Briefcase, LogOut, Upload, Loader2, Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"projects" | "careers">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title_en: "",
    title_ar: "",
    location_en: "",
    location_ar: "",
    image_url: "",
    type: "normal"
  });

  const [jobForm, setJobForm] = useState({
    title_en: "",
    title_ar: "",
    department_en: "",
    department_ar: "",
    location_en: "",
    location_ar: "",
    type_en: "",
    type_ar: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("Fetching dashboard data...");
      const projRes = await fetch("/api/projects");
      const jobRes = await fetch("/api/jobs");
      
      if (!projRes.ok) throw new Error(`Projects API failed: ${projRes.status}`);
      if (!jobRes.ok) throw new Error(`Jobs API failed: ${jobRes.status}`);

      const projData = await projRes.json();
      const jobData = await jobRes.json();

      console.log("Projects received:", projData.length);
      setProjects(projData);
      setJobs(jobData);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      alert("Failed to load data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...projectForm, id: editingId } : projectForm;

      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setProjectForm({ title_en: "", title_ar: "", location_en: "", location_ar: "", image_url: "", type: "normal" });
        setEditingId(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...jobForm, id: editingId } : jobForm;

      const res = await fetch("/api/jobs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setJobForm({ title_en: "", title_ar: "", department_en: "", department_ar: "", location_en: "", location_ar: "", type_en: "", type_ar: "" });
        setEditingId(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEditProject = (p: Project) => {
    setEditingId(p.id);
    setProjectForm({
      title_en: p.title_en,
      title_ar: p.title_ar,
      location_en: p.location_en,
      location_ar: p.location_ar,
      image_url: p.image_url,
      type: p.type || "normal"
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEditJob = (j: Job) => {
    setEditingId(j.id);
    setJobForm({
      title_en: j.title_en,
      title_ar: j.title_ar,
      department_en: j.department_en,
      department_ar: j.department_ar,
      location_en: j.location_en,
      location_ar: j.location_ar,
      type_en: j.type_en,
      type_ar: j.type_ar
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (type: "projects" | "jobs", id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        const { url } = await res.json();
        setProjectForm({ ...projectForm, image_url: url });
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 font-sans pb-20 pt-10" dir="rtl">
      <div className="mx-auto max-w-7xl px-6">
        {/* Compact Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-maad-600 flex items-center justify-center shadow-md">
              <LayoutGrid className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">لوحة التحكم</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {projects.length} مشاريع • {jobs.length} وظائف
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-lg border-slate-200 hover:bg-slate-50 transition-all font-bold h-10"
              onClick={fetchData}
              disabled={loading}
            >
              <Plus className={cn("h-4 w-4 ml-2 transition-transform", loading && "animate-spin")} />
              تحديث
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 font-bold h-10"
              onClick={() => { localStorage.removeItem("admin_token"); window.location.reload(); }}
            >
              <LogOut className="h-4 w-4 ml-2" />
              خروج
            </Button>
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            <button 
              onClick={() => { setActiveTab("projects"); setEditingId(null); }}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === "projects" 
                  ? "bg-maad-600 text-white shadow-md" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              معرض المشاريع
            </button>
            <button 
              onClick={() => { setActiveTab("careers"); setEditingId(null); }}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === "careers" 
                  ? "bg-maad-600 text-white shadow-md" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Briefcase className="h-4 w-4" />
              الوظائف الشاغرة
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-maad-600" />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === "projects" ? (
              <div className="grid gap-12 lg:grid-cols-12">
                {/* Form Panel */}
                <div className="lg:col-span-5">
                  <div className="sticky top-10">
                    <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                      <div className="mb-8 flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maad-50 text-maad-600">
                            {editingId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                          </span>
                          {editingId ? "تعديل المشروع" : "إضافة مشروع جديد"}
                        </h3>
                        {editingId && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-maad-600 font-bold h-8 px-3 rounded-lg hover:bg-maad-50"
                            onClick={() => { setEditingId(null); setProjectForm({ title_en: "", title_ar: "", location_en: "", location_ar: "", image_url: "", type: "normal" }); }}
                          >
                            مشروع جديد
                          </Button>
                        )}
                      </div>

                      <form onSubmit={handleProjectSubmit} className="space-y-6">
                        <div className="grid gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">العنوان (إنجليزي/عربي)</label>
                            <Input placeholder="English Title" value={projectForm.title_en} onChange={e => setProjectForm({...projectForm, title_en: e.target.value})} required className="h-12 rounded-xl bg-slate-50 border-transparent focus:border-maad-300 focus:bg-white transition-all text-left dir-ltr" />
                            <Input placeholder="العنوان بالعربية" value={projectForm.title_ar} onChange={e => setProjectForm({...projectForm, title_ar: e.target.value})} required className="text-right h-12 rounded-xl bg-slate-50 border-transparent focus:border-maad-300 focus:bg-white transition-all" />
                          </div>
                          
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">الموقع (إنجليزي/عربي)</label>
                            <Input placeholder="Riyadh, KSA" value={projectForm.location_en} onChange={e => setProjectForm({...projectForm, location_en: e.target.value})} required className="h-12 rounded-xl bg-slate-50 border-transparent focus:border-maad-300 focus:bg-white transition-all text-left dir-ltr" />
                            <Input placeholder="الرياض، السعودية" value={projectForm.location_ar} onChange={e => setProjectForm({...projectForm, location_ar: e.target.value})} required className="text-right h-12 rounded-xl bg-slate-50 border-transparent focus:border-maad-300 focus:bg-white transition-all" />
                          </div>

                          <div className="pt-2">
                            <label className="group relative flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-maad-400 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50">
                              {isUploading ? (
                                <div className="flex flex-col items-center gap-2">
                                  <Loader2 className="h-10 w-10 animate-spin text-maad-500" />
                                  <span className="text-xs font-bold uppercase tracking-widest text-maad-500">جاري الرفع</span>
                                </div>
                              ) : projectForm.image_url ? (
                                <>
                                  <Image src={projectForm.image_url} alt="Preview" fill className="object-cover transition group-hover:scale-105 group-hover:opacity-40" />
                                  <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                    <div className="bg-white px-6 py-2 rounded-full text-xs font-bold shadow-xl">تغيير الصورة</div>
                                  </div>
                                </>
                              ) : (
                                <div className="flex flex-col items-center gap-3 text-slate-400">
                                  <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center">
                                    <Upload className="h-6 w-6" />
                                  </div>
                                  <span className="text-xs font-bold uppercase tracking-widest">اختر صورة المشروع</span>
                                </div>
                              )}
                              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                            </label>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                           {editingId && (
                             <Button type="button" variant="outline" className="flex-1 h-14 rounded-2xl font-bold" onClick={() => { setEditingId(null); setProjectForm({ title_en: "", title_ar: "", location_en: "", location_ar: "", image_url: "", type: "normal" }); }}>
                               إلغاء
                             </Button>
                           )}
                           <Button type="submit" className="flex-[2] h-14 rounded-2xl bg-maad-600 hover:bg-maad-700 shadow-lg shadow-maad-600/20 text-white font-bold" disabled={!projectForm.image_url || isUploading}>
                            {editingId ? "حفظ التغييرات" : "نشر المشروع"}
                           </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* List Panel */}
                <div className="lg:col-span-7">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {projects.map(p => (
                      <article key={p.id} className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-xl dark:bg-slate-900 dark:border-slate-800">
                        <div className="relative aspect-video">
                          <Image src={p.image_url} alt={p.title_ar} fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100 flex items-center justify-center gap-4">
                             <Button size="icon" className="h-12 w-12 rounded-full bg-white text-slate-900 hover:bg-maad-600 hover:text-white transition-all scale-90 group-hover:scale-100" onClick={() => startEditProject(p)}>
                               <Plus className="h-5 w-5" />
                             </Button>
                             <Button size="icon" className="h-12 w-12 rounded-full bg-white text-slate-900 hover:bg-red-600 hover:text-white transition-all scale-90 group-hover:scale-100" onClick={() => handleDelete("projects", p.id)}>
                               <Trash2 className="h-5 w-5" />
                             </Button>
                          </div>
                        </div>
                        <div className="p-6 text-right">
                          <h4 className="font-bold text-slate-900 dark:text-white truncate">{p.title_ar}</h4>
                          <p className="mt-1 text-sm text-slate-500 font-medium">{p.location_ar}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-12 lg:grid-cols-12">
                {/* Job Form */}
                <div className="lg:col-span-5">
                  <div className="sticky top-10">
                    <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                      <div className="mb-8 flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maad-50 text-maad-600">
                            {editingId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                          </span>
                          {editingId ? "تعديل الوظيفة" : "إضافة وظيفة جديدة"}
                        </h3>
                        {editingId && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-maad-600 font-bold h-8 px-3 rounded-lg hover:bg-maad-50"
                            onClick={() => { setEditingId(null); setJobForm({ title_en: "", title_ar: "", department_en: "", department_ar: "", location_en: "", location_ar: "", type_en: "", type_ar: "" }); }}
                          >
                            وظيفة جديدة
                          </Button>
                        )}
                      </div>
                      
                      <form onSubmit={handleJobSubmit} className="space-y-6">
                        <div className="grid gap-6">
                          <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">المسمى الوظيفي (إنجليزي/عربي)</label>
                            <Input placeholder="Job Title (EN)" value={jobForm.title_en} onChange={e => setJobForm({...jobForm, title_en: e.target.value})} required className="h-12 rounded-xl bg-slate-50 border-transparent focus:border-maad-300 focus:bg-white text-left dir-ltr" />
                            <Input placeholder="المسمى الوظيفي" value={jobForm.title_ar} onChange={e => setJobForm({...jobForm, title_ar: e.target.value})} required className="text-right h-12 rounded-xl bg-slate-50 border-transparent focus:border-maad-300 focus:bg-white" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">القسم</label>
                              <Input placeholder="Engineering" value={jobForm.department_en} onChange={e => setJobForm({...jobForm, department_en: e.target.value})} required className="rounded-xl h-12 bg-slate-50 border-transparent text-left dir-ltr" />
                              <Input placeholder="القسم" value={jobForm.department_ar} onChange={e => setJobForm({...jobForm, department_ar: e.target.value})} required className="text-right rounded-xl h-12 bg-slate-50 border-transparent" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">نوع الدوام</label>
                              <Input placeholder="Full-time" value={jobForm.type_en} onChange={e => setJobForm({...jobForm, type_en: e.target.value})} required className="rounded-xl h-12 bg-slate-50 border-transparent text-left dir-ltr" />
                              <Input placeholder="نوع الدوام" value={jobForm.type_ar} onChange={e => setJobForm({...jobForm, type_ar: e.target.value})} required className="text-right rounded-xl h-12 bg-slate-50 border-transparent" />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">الموقع</label>
                             <div className="grid grid-cols-2 gap-4">
                               <Input placeholder="Riyadh" value={jobForm.location_en} onChange={e => setJobForm({...jobForm, location_en: e.target.value})} required className="rounded-xl h-12 bg-slate-50 border-transparent text-left dir-ltr" />
                               <Input placeholder="الرياض" value={jobForm.location_ar} onChange={e => setJobForm({...jobForm, location_ar: e.target.value})} required className="text-right rounded-xl h-12 bg-slate-50 border-transparent" />
                             </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                           {editingId && (
                             <Button type="button" variant="outline" className="flex-1 h-14 rounded-2xl font-bold" onClick={() => { setEditingId(null); setJobForm({ title_en: "", title_ar: "", department_en: "", department_ar: "", location_en: "", location_ar: "", type_en: "", type_ar: "" }); }}>
                               إلغاء
                             </Button>
                           )}
                           <Button type="submit" className="flex-[2] h-14 rounded-2xl bg-maad-600 hover:bg-maad-700 shadow-lg shadow-maad-600/20 text-white font-bold">
                             {editingId ? "تحديث الوظيفة" : "نشر الوظيفة"}
                           </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* List Panel */}
                <div className="lg:col-span-7 space-y-4">
                  {jobs.map(j => (
                    <article key={j.id} className="group flex items-center justify-between rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg dark:bg-slate-900 dark:border-slate-800">
                      <div className="text-right">
                        <div className="flex items-center gap-4 justify-end">
                          <span className="rounded-full bg-slate-50 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:bg-slate-800 order-2">
                            {j.type_ar}
                          </span>
                          <h4 className="font-bold text-xl text-slate-900 dark:text-white order-1">{j.title_ar}</h4>
                        </div>
                        <p className="mt-2 text-sm text-slate-500 font-medium">
                          {j.department_ar} • {j.location_ar}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-slate-300 hover:text-maad-600 hover:bg-maad-50 transition-all opacity-0 group-hover:opacity-100" onClick={() => startEditJob(j)}>
                          <Plus className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100" onClick={() => handleDelete("jobs", j.id)}>
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Back to Home Button */}
        <div className="mt-20 flex justify-center">
          <Button 
            variant="outline" 
            className="rounded-2xl px-10 h-14 border-slate-200 hover:bg-white hover:shadow-xl transition-all font-bold gap-3 group"
            onClick={() => window.location.href = "/"}
          >
            <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-maad-600 group-hover:text-white transition-colors">
              <LayoutGrid className="h-4 w-4" />
            </div>
            العودة للرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
}

