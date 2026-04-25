"use client";

import { useState, useEffect } from "react";
import { Project, Job, Service, Partner, Setting } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Icons from "lucide-react";
const { Plus, Trash2, LayoutGrid, Briefcase, LogOut, Upload, Loader2, Check, Phone, Mail, MessageCircle, Globe, Users, Wrench, ShieldCheck, Award, AlertTriangle, CheckCircle, X, XCircle, Pencil } = Icons;
import Image from "next/image";
import { cn } from "@/lib/utils";

type ModalState = {
  open: boolean;
  type: "confirm" | "success" | "error";
  message: string;
  onConfirm?: () => void;
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"projects" | "careers" | "services" | "partners" | "settings">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [modal, setModal] = useState<ModalState>({ open: false, type: "success", message: "" });

  const showAlert = (message: string, type: "success" | "error" = "success") => {
    setModal({ open: true, type, message });
  };

  const showConfirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setModal({
        open: true,
        type: "confirm",
        message,
        onConfirm: () => {
          setModal(m => ({ ...m, open: false }));
          resolve(true);
        },
      });
    });
  };

  const closeModal = () => {
    setModal(m => ({ ...m, open: false }));
  };

  // Form states
  const [projectForm, setProjectForm] = useState({ title_en: "", title_ar: "", location_en: "", location_ar: "", image_url: "", type: "normal" });
  const [jobForm, setJobForm] = useState({ title_en: "", title_ar: "", department_en: "", department_ar: "", location_en: "", location_ar: "", type_en: "", type_ar: "" });
  const [serviceForm, setServiceForm] = useState({ title_en: "", title_ar: "", description_en: "", description_ar: "", icon_name: "Building2" });
  const [partnerForm, setPartnerForm] = useState({ name: "", image_url: "", type: "strategic" as "strategic" | "success" });
  const [settingsForm, setSettingsForm] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, jobRes, servRes, partRes, settRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/jobs"),
        fetch("/api/services"),
        fetch("/api/partners"),
        fetch("/api/settings")
      ]);
      
      const [projData, jobData, servData, partData, settData] = await Promise.all([
        projRes.json(), jobRes.json(), servRes.json(), partRes.json(), settRes.json()
      ]);

      setProjects(projData);
      setJobs(jobData);
      setServices(servData);
      setPartners(partData);
      setSettings(settData);
      setSettingsForm(settData);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...projectForm, id: editingId } : projectForm;
      const res = await fetch("/api/projects", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        setProjectForm({ title_en: "", title_ar: "", location_en: "", location_ar: "", image_url: "", type: "normal" });
        setEditingId(null);
        fetchData();
      }
    } catch (err) { console.error(err); }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...jobForm, id: editingId } : jobForm;
      const res = await fetch("/api/jobs", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        setJobForm({ title_en: "", title_ar: "", department_en: "", department_ar: "", location_en: "", location_ar: "", type_en: "", type_ar: "" });
        setEditingId(null);
        fetchData();
      }
    } catch (err) { console.error(err); }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...serviceForm, id: editingId } : serviceForm;
      const res = await fetch("/api/services", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        setServiceForm({ title_en: "", title_ar: "", description_en: "", description_ar: "", icon_name: "Building2" });
        setEditingId(null);
        fetchData();
      }
    } catch (err) { console.error(err); }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...partnerForm, id: editingId } : partnerForm;
      const res = await fetch("/api/partners", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        setPartnerForm({ name: "", image_url: "", type: "strategic" });
        setEditingId(null);
        fetchData();
      }
    } catch (err) { console.error(err); }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsForm)
      });
      if (res.ok) {
        fetchData();
        showAlert("تم حفظ الإعدادات بنجاح", "success");
      }
    } catch (err) { console.error(err); }
  };

  const startEditProject = (p: Project) => {
    setEditingId(p.id);
    setProjectForm({ title_en: p.title_en, title_ar: p.title_ar, location_en: p.location_en, location_ar: p.location_ar, image_url: p.image_url, type: p.type || "normal" });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEditJob = (j: Job) => {
    setEditingId(j.id);
    setJobForm({ title_en: j.title_en, title_ar: j.title_ar, department_en: j.department_en, department_ar: j.department_ar, location_en: j.location_en, location_ar: j.location_ar, type_en: j.type_en, type_ar: j.type_ar });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEditService = (s: Service) => {
    setEditingId(s.id);
    setServiceForm({ title_en: s.title_en, title_ar: s.title_ar, description_en: s.description_en, description_ar: s.description_ar, icon_name: s.icon_name });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEditPartner = (p: Partner) => {
    setEditingId(p.id);
    setPartnerForm({ name: p.name, image_url: p.image_url, type: p.type });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (type: string, id: number) => {
    if (!(await showConfirm("هل أنت متأكد من الحذف؟"))) return;
    try {
      const res = await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (err) { console.error(err); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'project' | 'partner' | 'setting', settingKey?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });

      if (res.ok) {
        const { url } = await res.json();
        if (target === 'project') setProjectForm(prev => ({ ...prev, image_url: url }));
        else if (target === 'partner') setPartnerForm(prev => ({ ...prev, image_url: url }));
        else if (target === 'setting' && settingKey) setSettingsForm(prev => ({ ...prev, [settingKey]: url }));
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error("Upload failed:", errData);
        showAlert("فشل رفع الصورة: " + (errData.details || errData.error || "خطأ غير معروف"), "error");
      }
    } catch (err) { 
      console.error("Upload error:", err); 
      showAlert("حدث خطأ أثناء الرفع", "error");
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
        <div className="flex justify-center mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 whitespace-nowrap">
            <button 
              onClick={() => { setActiveTab("projects"); setEditingId(null); }}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === "projects" ? "bg-maad-600 text-white shadow-md" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              المشاريع
            </button>
            <button 
              onClick={() => { setActiveTab("careers"); setEditingId(null); }}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === "careers" ? "bg-maad-600 text-white shadow-md" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Briefcase className="h-4 w-4" />
              الوظائف
            </button>
            <button 
              onClick={() => { setActiveTab("services"); setEditingId(null); }}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === "services" ? "bg-maad-600 text-white shadow-md" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Wrench className="h-4 w-4" />
              الخدمات
            </button>
            <button 
              onClick={() => { setActiveTab("partners"); setEditingId(null); }}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === "partners" ? "bg-maad-600 text-white shadow-md" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Users className="h-4 w-4" />
              العملاء والشركاء
            </button>
            <button 
              onClick={() => { setActiveTab("settings"); setEditingId(null); }}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === "settings" ? "bg-maad-600 text-white shadow-md" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Globe className="h-4 w-4" />
              الإعدادات
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-maad-600" />
          </div>
        ) : (
          <div className="space-y-12">
            {activeTab === "projects" && (
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="sticky top-10">
                    <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                      <h3 className="text-xl font-bold flex items-center gap-3 mb-8 text-slate-900 dark:text-white">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maad-50 text-maad-600">
                          {editingId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                        {editingId ? "تعديل المشروع" : "إضافة مشروع جديد"}
                      </h3>
                      <form onSubmit={handleProjectSubmit} className="space-y-6">
                        <div className="grid gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">العنوان (إنجليزي/عربي)</label>
                            <Input placeholder="English Title" value={projectForm.title_en} onChange={e => setProjectForm({...projectForm, title_en: e.target.value})} required className="h-12 rounded-xl bg-slate-50 text-left dir-ltr" />
                            <Input placeholder="العنوان بالعربية" value={projectForm.title_ar} onChange={e => setProjectForm({...projectForm, title_ar: e.target.value})} required className="text-right h-12 rounded-xl bg-slate-50" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">الموقع (إنجليزي/عربي)</label>
                            <Input placeholder="Riyadh, KSA" value={projectForm.location_en} onChange={e => setProjectForm({...projectForm, location_en: e.target.value})} required className="h-12 rounded-xl bg-slate-50 text-left dir-ltr" />
                            <Input placeholder="الرياض، السعودية" value={projectForm.location_ar} onChange={e => setProjectForm({...projectForm, location_ar: e.target.value})} required className="text-right h-12 rounded-xl bg-slate-50" />
                          </div>
                          <div className="pt-2">
                            <label className="group relative flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 hover:border-maad-400">
                              {isUploading ? <Loader2 className="h-10 w-10 animate-spin text-maad-500" /> : projectForm.image_url ? <Image src={projectForm.image_url} alt="Preview" fill className="object-cover" /> : <Upload className="h-6 w-6 text-slate-400" />}
                              <input type="file" id="project-img" className="hidden" onChange={e => handleImageUpload(e, 'project')} accept="image/*" />
                              {projectForm.image_url && !isUploading && (
                                <Button variant="outline" size="sm" type="button" className="absolute bottom-4 rounded-full opacity-0 group-hover:opacity-100" onClick={(e) => { e.preventDefault(); document.getElementById('project-img')?.click(); }}>تغيير الصورة</Button>
                              )}
                            </label>
                          </div>
                        </div>
                        <Button type="submit" className="w-full h-14 rounded-2xl bg-maad-600 text-white font-bold">
                          {editingId ? "حفظ التغييرات" : "نشر المشروع"}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
                  {projects.map(p => (
                    <article key={p.id} className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl dark:bg-slate-900 dark:border-slate-800">
                      <div className="relative aspect-video">
                        <Image src={p.image_url} alt={p.title_ar} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <Button size="icon" className="h-12 w-12 rounded-full bg-white text-slate-900" onClick={() => startEditProject(p)}><Plus className="h-5 w-5" /></Button>
                          <Button size="icon" className="h-12 w-12 rounded-full bg-white text-slate-900" onClick={() => handleDelete("projects", p.id)}><Trash2 className="h-5 w-5" /></Button>
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
            )}

            {activeTab === "careers" && (
              <div className="space-y-8">
                {/* Careers Visibility Toggle */}
                <div className="flex items-center justify-between rounded-2xl bg-white p-6 border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-maad-50 flex items-center justify-center text-maad-600">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">إظهار صفحة الوظائف</p>
                      <p className="text-xs text-slate-400">إظهار أو إخفاء رابط الوظائف من القائمة والفوتر</p>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      const newVal = settings.careers_visible === 'false' ? 'true' : 'false';
                      setSettings((prev: Record<string, string>) => ({ ...prev, careers_visible: newVal }));
                      await fetch('/api/settings', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ careers_visible: newVal })
                      });
                    }}
                    className={cn(
                      "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
                      settings.careers_visible !== 'false' ? "bg-maad-600" : "bg-slate-300 dark:bg-slate-700"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200",
                        settings.careers_visible !== 'false' ? "ltr:translate-x-6 rtl:-translate-x-6" : "ltr:translate-x-1 rtl:-translate-x-1"
                      )}
                    />
                  </button>
                </div>

              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="sticky top-10">
                    <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                      <h3 className="text-xl font-bold flex items-center gap-3 mb-8 text-slate-900 dark:text-white">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maad-50 text-maad-600">
                          {editingId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                        {editingId ? "تعديل الوظيفة" : "إضافة وظيفة"}
                      </h3>
                      <form onSubmit={handleJobSubmit} className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">المسمى الوظيفي</label>
                          <Input placeholder="English Title" value={jobForm.title_en} onChange={e => setJobForm({...jobForm, title_en: e.target.value})} required className="text-left dir-ltr h-12 rounded-xl bg-slate-50" />
                          <Input placeholder="المسمى الوظيفي" value={jobForm.title_ar} onChange={e => setJobForm({...jobForm, title_ar: e.target.value})} required className="text-right h-12 rounded-xl bg-slate-50" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">القسم</label>
                            <Input placeholder="Engineering" value={jobForm.department_en} onChange={e => setJobForm({...jobForm, department_en: e.target.value})} required className="text-left dir-ltr h-12 rounded-xl bg-slate-50" />
                            <Input placeholder="القسم" value={jobForm.department_ar} onChange={e => setJobForm({...jobForm, department_ar: e.target.value})} required className="text-right h-12 rounded-xl bg-slate-50" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">نوع الدوام</label>
                            <select
                              value={jobForm.type_en}
                              onChange={e => {
                                const val = e.target.value;
                                const arMap: Record<string, string> = { "Full-time": "دوام كامل", "Part-time": "دوام جزئي", "Freelance": "عمل حر" };
                                setJobForm({...jobForm, type_en: val, type_ar: arMap[val] || val });
                              }}
                              required
                              className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-4 text-sm font-medium text-slate-700 focus:border-maad-400 focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            >
                              <option value="" disabled>— اختر —</option>
                              <option value="Full-time">Full-time / دوام كامل</option>
                              <option value="Part-time">Part-time / دوام جزئي</option>
                              <option value="Freelance">Freelance / عمل حر</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">المدينة</label>
                          <Input placeholder="City (EN)" value={jobForm.location_en} onChange={e => setJobForm({...jobForm, location_en: e.target.value})} required className="text-left dir-ltr h-12 rounded-xl bg-slate-50" />
                          <Input placeholder="المدينة بالعربية" value={jobForm.location_ar} onChange={e => setJobForm({...jobForm, location_ar: e.target.value})} required className="text-right h-12 rounded-xl bg-slate-50" />
                        </div>
                        <Button type="submit" className="w-full h-14 rounded-2xl bg-maad-600 text-white font-bold">
                          {editingId ? "تحديث الوظيفة" : "نشر الوظيفة"}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-4">
                  {jobs.map(j => (
                    <article key={j.id} className="group flex items-center justify-between rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm hover:shadow-lg dark:bg-slate-900 dark:border-slate-800">
                      <div className="text-right">
                        <div className="flex items-center gap-4 justify-end">
                          <span className="rounded-full bg-slate-50 dark:bg-slate-800 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300 order-2">{j.type_ar}</span>
                          <h4 className="font-bold text-xl text-slate-900 dark:text-white order-1">{j.title_ar}</h4>
                        </div>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300 font-medium">{j.department_ar} • {j.location_ar}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-300 hover:text-maad-600 opacity-0 group-hover:opacity-100" onClick={() => startEditJob(j)}><Plus className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100" onClick={() => handleDelete("jobs", j.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="sticky top-10">
                    <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                      <h3 className="text-xl font-bold flex items-center gap-3 mb-8 text-slate-900 dark:text-white">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maad-50 text-maad-600">
                          {editingId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                        {editingId ? "تعديل الخدمة" : "إضافة خدمة"}
                      </h3>
                      <form onSubmit={handleServiceSubmit} className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">اسم الخدمة</label>
                          <Input placeholder="Service Title (EN)" value={serviceForm.title_en} onChange={e => setServiceForm({...serviceForm, title_en: e.target.value})} required className="text-left dir-ltr h-12 rounded-xl bg-slate-50" />
                          <Input placeholder="اسم الخدمة بالعربية" value={serviceForm.title_ar} onChange={e => setServiceForm({...serviceForm, title_ar: e.target.value})} required className="text-right h-12 rounded-xl bg-slate-50" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">الوصف</label>
                          <Input placeholder="Description (EN)" value={serviceForm.description_en} onChange={e => setServiceForm({...serviceForm, description_en: e.target.value})} required className="text-left dir-ltr h-12 rounded-xl bg-slate-50" />
                          <Input placeholder="الوصف بالعربية" value={serviceForm.description_ar} onChange={e => setServiceForm({...serviceForm, description_ar: e.target.value})} required className="text-right h-12 rounded-xl bg-slate-50" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">اسم الأيقونة (Lucide)</label>
                          <Input placeholder="Building2, ShieldCheck, Award..." value={serviceForm.icon_name} onChange={e => setServiceForm({...serviceForm, icon_name: e.target.value})} required className="text-left dir-ltr h-12 rounded-xl bg-slate-50" />
                        </div>
                        <Button type="submit" className="w-full h-14 rounded-2xl bg-maad-600 text-white font-bold">
                          {editingId ? "تحديث الخدمة" : "نشر الخدمة"}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-4">
                  {services.map(s => {
                    const Icon = (Icons as any)[s.icon_name] || Icons.Wrench;
                    return (
                      <article key={s.id} className="group flex items-center justify-between rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm hover:shadow-lg dark:bg-slate-900 dark:border-slate-800">
                        <div className="text-right flex items-center gap-6">
                          <div className="h-12 w-12 rounded-xl bg-maad-50 flex items-center justify-center text-maad-600">
                             <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white">{s.title_ar}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-300 line-clamp-1">{s.description_ar}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-300 hover:text-maad-600 opacity-0 group-hover:opacity-100" onClick={() => startEditService(s)}><Plus className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100" onClick={() => handleDelete("services", s.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "partners" && (
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="sticky top-10">
                    <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                      <h3 className="text-xl font-bold flex items-center gap-3 mb-8 text-slate-900 dark:text-white">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maad-50 text-maad-600">
                          {editingId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                        {editingId ? "تعديل الشريك" : "إضافة شريك جديد"}
                      </h3>
                      <form onSubmit={handlePartnerSubmit} className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">اسم الشريك</label>
                          <Input placeholder="Partner Name" value={partnerForm.name} onChange={e => setPartnerForm({...partnerForm, name: e.target.value})} required className="text-right h-12 rounded-xl bg-slate-50" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">نوع الشراكة</label>
                          <select 
                            value={partnerForm.type} 
                            onChange={e => setPartnerForm({...partnerForm, type: e.target.value as any})}
                            className="w-full h-12 rounded-xl bg-slate-50 border-transparent focus:border-maad-300 px-4 font-bold text-slate-900"
                          >
                            <option value="strategic">شريك</option>
                            <option value="success">عميل</option>
                          </select>
                        </div>
                        <div className="pt-2">
                          <label className="group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 hover:border-maad-400">
                            {isUploading ? <Loader2 className="h-8 w-8 animate-spin text-maad-500" /> : partnerForm.image_url ? <Image src={partnerForm.image_url} alt="Logo" fill className="object-contain p-4" /> : <Upload className="h-6 w-6 text-slate-400" />}
                            <input type="file" id="partner-img" className="hidden" onChange={e => handleImageUpload(e, 'partner')} accept="image/*" />
                            {partnerForm.image_url && !isUploading && (
                              <Button variant="outline" size="sm" type="button" className="absolute bottom-4 rounded-full opacity-0 group-hover:opacity-100" onClick={(e) => { e.preventDefault(); document.getElementById('partner-img')?.click(); }}>تغيير الشعار</Button>
                            )}
                          </label>
                        </div>
                        <Button type="submit" className="w-full h-14 rounded-2xl bg-maad-600 text-white font-bold" disabled={!partnerForm.image_url}>
                          {editingId ? "حفظ التغييرات" : "إضافة الشريك"}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 grid gap-4 sm:grid-cols-3">
                  {partners.map(p => (
                    <article key={p.id} className="group relative aspect-square rounded-[2rem] bg-white border border-slate-100 flex flex-col items-center justify-center p-6 shadow-sm hover:shadow-lg dark:bg-slate-900 dark:border-slate-800">
                      <div className="relative w-full h-2/3">
                        <Image src={p.image_url} alt={p.name} fill className="object-contain" />
                      </div>
                      <p className="mt-4 text-xs font-bold text-slate-400 dark:text-slate-300">{p.name}</p>
                      <span className="mt-1 text-[10px] font-bold text-maad-600 bg-maad-50 px-2 py-0.5 rounded-full">
                        {p.type === 'strategic' ? 'شريك' : 'عميل'}
                      </span>
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] flex items-center justify-center gap-3">
                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white text-maad-600 hover:bg-maad-50" onClick={() => startEditPartner(p)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white text-red-600 hover:bg-red-50" onClick={() => handleDelete("partners", p.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="max-w-4xl mx-auto space-y-12">
                <section className="rounded-[2.5rem] bg-white p-10 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                  <h3 className="text-xl font-bold flex items-center gap-3 mb-8">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maad-50 text-maad-600"><Phone className="h-4 w-4" /></span>
                    <span className="text-slate-900 dark:text-white">معلومات التواصل</span>
                  </h3>
                  <form onSubmit={handleSettingsSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">البريد الإلكتروني</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-maad-500" />
                          <Input value={settingsForm.contact_email} onChange={e => setSettingsForm({...settingsForm, contact_email: e.target.value})} className="pl-11 h-12 rounded-xl bg-slate-50 text-left dir-ltr" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">الهاتف</label>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-maad-500" />
                          <Input value={settingsForm.contact_phone} onChange={e => setSettingsForm({...settingsForm, contact_phone: e.target.value})} className="pl-11 h-12 rounded-xl bg-slate-50 text-left dir-ltr" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">واتساب</label>
                        <div className="relative group">
                          <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-maad-500" />
                          <Input value={settingsForm.contact_whatsapp} onChange={e => setSettingsForm({...settingsForm, contact_whatsapp: e.target.value})} className="pl-11 h-12 rounded-xl bg-slate-50 text-left dir-ltr" />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 mt-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">العنوان (عربي)</label>
                        <Input value={settingsForm.address_ar || ''} onChange={e => setSettingsForm({...settingsForm, address_ar: e.target.value})} className="h-12 rounded-xl bg-slate-50 text-right" placeholder="العنوان بالعربي" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">العنوان (إنجليزي)</label>
                        <Input value={settingsForm.address_en || ''} onChange={e => setSettingsForm({...settingsForm, address_en: e.target.value})} className="h-12 rounded-xl bg-slate-50 text-left dir-ltr" placeholder="Address in English" />
                      </div>
                    </div>

                    <div className="mt-6 space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-1">رابط الخريطة (Google Maps)</label>
                      <Input value={settingsForm.map_url || ''} onChange={e => setSettingsForm({...settingsForm, map_url: e.target.value})} className="h-12 rounded-xl bg-slate-50 text-left dir-ltr" placeholder="https://maps.google.com/?q=..." />
                    </div>

                    <div className="pt-10 border-t border-slate-50">
                      <h3 className="text-xl font-bold flex items-center gap-3 mb-8">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maad-50 text-maad-600"><LayoutGrid className="h-4 w-4" /></span>
                        <span className="text-slate-900 dark:text-white">صور الصفحة الرئيسية</span>
                      </h3>
                      <div className="grid gap-8 sm:grid-cols-2">
                        <div className="space-y-4">
                          <label className="text-sm font-bold text-slate-600 dark:text-slate-300">من نحن</label>
                          <div className="group relative aspect-video rounded-[2rem] border-2 border-dashed border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden">
                            {settingsForm.home_who_we_are_image ? <Image src={settingsForm.home_who_we_are_image} alt="Who" fill className="object-cover" /> : <Upload className="h-6 w-6 text-slate-300" />}
                            <input type="file" className="hidden" id="who-img" onChange={e => handleImageUpload(e, 'setting', 'home_who_we_are_image')} />
                            <Button variant="outline" size="sm" className="absolute bottom-4 rounded-full opacity-0 group-hover:opacity-100" onClick={() => document.getElementById('who-img')?.click()}>تغيير الصورة</Button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-sm font-bold text-slate-600 dark:text-slate-300">التطوير النشط</label>
                          <div className="group relative aspect-video rounded-[2rem] border-2 border-dashed border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden">
                            {settingsForm.home_active_development_image ? <Image src={settingsForm.home_active_development_image} alt="Active" fill className="object-cover" /> : <Upload className="h-6 w-6 text-slate-300" />}
                            <input type="file" className="hidden" id="active-img" onChange={e => handleImageUpload(e, 'setting', 'home_active_development_image')} />
                            <Button variant="outline" size="sm" className="absolute bottom-4 rounded-full opacity-0 group-hover:opacity-100" onClick={() => document.getElementById('active-img')?.click()}>تغيير الصورة</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 flex justify-end">
                      <Button type="submit" className="px-12 h-14 rounded-2xl bg-slate-900 text-white font-bold hover:shadow-xl transition-all">
                         حفظ جميع الإعدادات
                      </Button>
                    </div>
                  </form>
                </section>
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

      {/* Branded Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => { if (modal.type !== "confirm") closeModal(); }}>
          <div
            className="relative w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900 text-center"
            dir="rtl"
            onClick={e => e.stopPropagation()}
          >
            <div className={cn(
              "mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full",
              modal.type === "success" && "bg-green-100 dark:bg-green-900/30",
              modal.type === "error" && "bg-red-100 dark:bg-red-900/30",
              modal.type === "confirm" && "bg-maad-50 dark:bg-maad-900/30",
            )}>
              {modal.type === "success" && <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />}
              {modal.type === "error" && <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />}
              {modal.type === "confirm" && <AlertTriangle className="h-8 w-8 text-maad-600 dark:text-maad-400" />}
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {modal.type === "success" ? "تم بنجاح" : modal.type === "error" ? "خطأ" : "تأكيد"}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{modal.message}</p>

            <div className="flex items-center justify-center gap-3">
              {modal.type === "confirm" ? (
                <>
                  <Button
                    onClick={closeModal}
                    variant="outline"
                    className="rounded-xl px-6 h-11 border-slate-200 dark:border-slate-700 dark:text-slate-900 dark:bg-white dark:hover:bg-slate-100"
                  >
                    إلغاء
                  </Button>
                  <Button
                    onClick={modal.onConfirm}
                    className="rounded-xl px-6 h-11 bg-red-600 text-white hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4 ml-1" />
                    حذف
                  </Button>
                </>
              ) : (
                <Button
                  onClick={closeModal}
                  className={cn(
                    "rounded-xl px-8 h-11 font-bold",
                    modal.type === "success" ? "bg-maad-600 text-white hover:bg-maad-700" : "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  )}
                >
                  حسنًا
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
