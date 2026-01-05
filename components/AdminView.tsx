import React, { useState, useRef, useEffect } from 'react';
import { AppState, Category, Project, ArchiveItem } from '../types';

const compressImage = (base64Str: string, maxWidth = 1200, quality = 0.7): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
  });
};

interface ProjectFormProps {
  project: Partial<Project>;
  onSave: (p: Project) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    id: '',
    title: '',
    category: Category.BRANDING,
    client: '',
    status: 'IN_PROGRESS',
    date: new Date().toISOString().split('T')[0],
    description: '',
    imageUrls: [],
    ...project
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsProcessing(true);
    const newUrls: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      
      const compressed = await compressImage(base64);
      newUrls.push(compressed);
    }

    setFormData(prev => ({
      ...prev,
      imageUrls: [...(prev.imageUrls || []), ...newUrls]
    }));
    setIsProcessing(false);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: (prev.imageUrls || []).filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.title) {
      alert("REQUIRED_FIELDS: ID_AND_TITLE_MUST_BE_DEFINED");
      return;
    }
    onSave(formData as Project);
  };

  return (
    <form onSubmit={handleSave} className="border border-white p-5 bg-black space-y-4 text-[10px] font-mono animate-in fade-in zoom-in-95">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="flex flex-col">
          <label className="opacity-50 mb-1 uppercase tracking-widest font-bold">PROJECT_ID</label>
          <input 
            value={formData.id} 
            onChange={e => setFormData({...formData, id: e.target.value.toUpperCase()})}
            placeholder="ODM-PRJ-XXXX-XXX"
            className="bg-black border border-white/30 p-2 outline-none focus:border-white uppercase"
          />
        </div>
        <div className="flex flex-col">
          <label className="opacity-50 mb-1 uppercase tracking-widest font-bold">TITLE</label>
          <input 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value.toUpperCase()})}
            className="bg-black border border-white/30 p-2 outline-none focus:border-white uppercase"
          />
        </div>
        <div className="flex flex-col">
          <label className="opacity-50 mb-1 uppercase tracking-widest font-bold">CATEGORY</label>
          <select 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value as Category})}
            className="bg-black border border-white/30 p-2 outline-none focus:border-white uppercase cursor-pointer"
          >
            {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="opacity-50 mb-1 uppercase tracking-widest font-bold">CLIENT</label>
          <input 
            value={formData.client} 
            onChange={e => setFormData({...formData, client: e.target.value.toUpperCase()})}
            className="bg-black border border-white/30 p-2 outline-none focus:border-white uppercase"
          />
        </div>
        <div className="flex flex-col">
          <label className="opacity-50 mb-1 uppercase tracking-widest font-bold">STATUS</label>
          <select 
            value={formData.status} 
            onChange={e => setFormData({...formData, status: e.target.value as any})}
            className="bg-black border border-white/30 p-2 outline-none focus:border-white uppercase cursor-pointer"
          >
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="opacity-50 mb-1 uppercase tracking-widest font-bold">DATE_STAMP</label>
          <input 
            type="date"
            value={formData.date} 
            onChange={e => setFormData({...formData, date: e.target.value})}
            className="bg-black border border-white/30 p-2 outline-none focus:border-white uppercase invert"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="opacity-50 mb-2 uppercase tracking-widest font-bold">
          IMAGE_ASSETS {isProcessing && <span className="text-yellow-500 animate-pulse ml-2">[ OPTIMIZING... ]</span>}
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.imageUrls?.map((url, idx) => (
            <div key={idx} className="relative w-16 h-16 border border-white/20 group">
              <img src={url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="preview" />
              <button 
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-1 -right-1 bg-white text-black text-[7px] font-black w-3.5 h-3.5 flex items-center justify-center z-10"
              >
                X
              </button>
            </div>
          ))}
          {!isProcessing && (
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 border border-dashed border-white/30 flex items-center justify-center text-lg hover:bg-white/5 transition-colors"
            >
              +
            </button>
          )}
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*" className="hidden" />
      </div>

      <div className="flex flex-col">
        <label className="opacity-50 mb-1 uppercase tracking-widest font-bold">DESCRIPTION</label>
        <textarea 
          rows={3}
          value={formData.description} 
          onChange={e => setFormData({...formData, description: e.target.value.toUpperCase()})}
          className="bg-transparent border border-white/30 p-2 outline-none focus:border-white uppercase resize-none leading-relaxed"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button type="submit" disabled={isProcessing} className="flex-grow py-2 bg-white text-black font-black uppercase hover:invert transition-all text-[10px] tracking-widest border border-white">
          [ COMMIT_CHANGES ]
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-white text-white font-black uppercase hover:bg-white hover:text-black transition-all text-[10px] tracking-widest">
          CANCEL
        </button>
      </div>
    </form>
  );
};

interface ArchiveFormProps {
  item: Partial<ArchiveItem>;
  onSave: (p: ArchiveItem) => void;
  onCancel: () => void;
}

const ArchiveForm: React.FC<ArchiveFormProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<ArchiveItem>>({
    id: Date.now().toString(),
    year: '',
    company: '',
    category: '',
    project: '',
    ...item
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as ArchiveItem);
  };

  return (
    <form onSubmit={handleSave} className="border border-white p-5 bg-black space-y-4 text-[10px] font-mono animate-in fade-in">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label className="opacity-50 mb-1 uppercase tracking-widest font-bold">YEAR_STAMP</label>
          <input 
            value={formData.year} 
            onChange={e => setFormData({...formData, year: e.target.value.toUpperCase()})}
            className="bg-black border border-white/30 p-2 outline-none focus:border-white uppercase"
          />
        </div>
        <div className="flex flex-col">
          <label className="opacity-50 mb-1 uppercase tracking-widest font-bold">COMPANY_NAME</label>
          <input 
            value={formData.company} 
            onChange={e => setFormData({...formData, company: e.target.value.toUpperCase()})}
            className="bg-black border border-white/30 p-2 outline-none focus:border-white uppercase"
          />
        </div>
        <div className="flex flex-col">
          <label className="opacity-50 mb-1 uppercase tracking-widest font-bold">CATEGORY_LOG</label>
          <input 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value.toUpperCase()})}
            className="bg-black border border-white/30 p-2 outline-none focus:border-white uppercase"
          />
        </div>
        <div className="flex flex-col">
          <label className="opacity-50 mb-1 uppercase tracking-widest font-bold">PROJECT_SUMMARY</label>
          <input 
            value={formData.project} 
            onChange={e => setFormData({...formData, project: e.target.value.toUpperCase()})}
            className="bg-black border border-white/30 p-2 outline-none focus:border-white uppercase"
          />
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button type="submit" className="flex-grow py-2 bg-white text-black font-black uppercase hover:invert border border-white transition-all tracking-widest">
          [ ARCHIVE_RECORD ]
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-white text-white font-black uppercase hover:bg-white hover:text-black transition-all tracking-widest">
          CANCEL
        </button>
      </div>
    </form>
  );
};

interface AdminViewProps {
  state: AppState;
  updateProject: (id: string, project: Project) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateArchiveItem: (id: string, item: ArchiveItem) => void;
  addArchiveItem: (item: ArchiveItem) => void;
  deleteArchiveItem: (id: string) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ 
  state, updateProject, addProject, deleteProject,
  updateArchiveItem, addArchiveItem, deleteArchiveItem 
}) => {
  const [activeTab, setActiveTab] = useState<'PROJECTS' | 'ARCHIVE'>('PROJECTS');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newProjectForm, setNewProjectForm] = useState(false);
  const [editingArchiveId, setEditingArchiveId] = useState<string | null>(null);
  const [newArchiveForm, setNewArchiveForm] = useState(false);
  const [storageUsage, setStorageUsage] = useState<string>('0%');

  useEffect(() => {
    const usage = JSON.stringify(state).length;
    const limit = 5 * 1024 * 1024;
    const percent = Math.min(100, (usage / limit) * 100);
    setStorageUsage(`${percent.toFixed(1)}%`);
  }, [state]);

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-12 font-mono pb-32">
      <div className="border-b border-white pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-xl font-black italic uppercase tracking-tighter">CONTROL_CENTER_V2</h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-[9px] opacity-50 uppercase tracking-[0.2em]">ADMIN_USER: AUTHENTICATED</p>
            <div className="flex items-center gap-2">
              <span className="text-[8px] opacity-30 uppercase font-bold">STORAGE:</span>
              <div className="w-20 h-0.5 border border-white/20 bg-black overflow-hidden">
                <div className="h-full bg-white" style={{ width: storageUsage }}></div>
              </div>
              <span className="text-[8px] font-bold">{storageUsage}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setActiveTab('PROJECTS'); setNewProjectForm(true); setEditingProjectId(null); window.scrollTo(0,0); }}
            className="bg-white text-black px-3 py-1.5 font-bold text-[9px] uppercase hover:invert transition-all tracking-widest border border-white"
          >
            + NEW_PRJ_REC
          </button>
          <button 
            onClick={() => { setActiveTab('ARCHIVE'); setNewArchiveForm(true); setEditingArchiveId(null); window.scrollTo(0,0); }}
            className="border border-white text-white px-3 py-1.5 font-bold text-[9px] uppercase hover:bg-white hover:text-black transition-all tracking-widest"
          >
            + NEW_ARC_ENTRY
          </button>
        </div>
      </div>

      <div className="flex gap-6 mb-6 border-b border-white/20 pb-1.5">
        <button onClick={() => setActiveTab('PROJECTS')} className={`text-[10px] font-black uppercase tracking-widest ${activeTab === 'PROJECTS' ? 'underline' : 'opacity-40 hover:opacity-100'}`}>
          [ PRJ_MNGMT ]
        </button>
        <button onClick={() => setActiveTab('ARCHIVE')} className={`text-[10px] font-black uppercase tracking-widest ${activeTab === 'ARCHIVE' ? 'underline' : 'opacity-40 hover:opacity-100'}`}>
          [ ARC_LOG_ED ]
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === 'PROJECTS' ? (
          <>
            {newProjectForm && (
              <div className="border-2 border-white p-2 mb-6 bg-white/5">
                <ProjectForm 
                  key="new-project"
                  project={{ id: `ODM-PRJ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`, title: '', category: Category.BRANDING, client: '', date: new Date().toISOString().split('T')[0], status: 'IN_PROGRESS', imageUrls: [], description: '' }} 
                  onSave={(p) => { addProject(p); setNewProjectForm(false); }}
                  onCancel={() => setNewProjectForm(false)}
                />
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[9px] uppercase">
                <thead>
                  <tr className="border-b border-white text-white/40 font-bold tracking-widest">
                    <th className="py-3 px-2">ID_REF</th>
                    <th className="py-3 px-2">TITLE_REF</th>
                    <th className="py-3 px-2">TYPE_CAT</th>
                    <th className="py-3 px-2">STATUS</th>
                    <th className="py-3 px-2 text-right">OPS</th>
                  </tr>
                </thead>
                <tbody>
                  {state.projects.map(project => (
                    <React.Fragment key={project.id}>
                      {editingProjectId === project.id ? (
                        <tr>
                          <td colSpan={5} className="py-6 px-2">
                            <ProjectForm 
                              key={`edit-${project.id}`}
                              project={project} 
                              onSave={(p) => { updateProject(project.id, p); setEditingProjectId(null); }}
                              onCancel={() => setEditingProjectId(null)}
                            />
                          </td>
                        </tr>
                      ) : (
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                          <td className="py-4 px-2 opacity-40">{project.id}</td>
                          <td className="py-4 px-2 font-black">{project.title}</td>
                          <td className="py-4 px-2 opacity-40 italic">[{project.category}]</td>
                          <td className="py-4 px-2">
                            <span className={`px-1.5 py-0.5 font-black text-[8px] ${project.status === 'COMPLETED' ? 'bg-green-500 text-black' : project.status === 'ARCHIVED' ? 'bg-white/20 text-white' : 'bg-yellow-500 text-black'}`}>
                              {project.status}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-right space-x-3">
                            <button onClick={() => { setEditingProjectId(project.id); setNewProjectForm(false); }} className="underline opacity-40 hover:opacity-100 font-bold transition-opacity">EDIT</button>
                            <button onClick={() => deleteProject(project.id)} className="underline opacity-40 hover:text-red-500 font-bold transition-all">DEL</button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            {newArchiveForm && (
              <div className="border-2 border-white p-2 mb-6 bg-white/5">
                <ArchiveForm 
                  key="new-archive"
                  item={{ id: Date.now().toString(), year: '', company: '', category: '', project: '' }} 
                  onSave={(item) => { addArchiveItem(item); setNewArchiveForm(false); }}
                  onCancel={() => setNewArchiveForm(false)}
                />
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[9px] uppercase">
                <thead>
                  <tr className="border-b border-white text-white/40 font-bold tracking-widest">
                    <th className="py-3 px-2">YEAR</th>
                    <th className="py-3 px-2">COMP</th>
                    <th className="py-3 px-2">CAT</th>
                    <th className="py-3 px-2">PRJ_LOG</th>
                    <th className="py-3 px-2 text-right">OPS</th>
                  </tr>
                </thead>
                <tbody>
                  {state.archiveItems.map(item => (
                    <React.Fragment key={item.id}>
                      {editingArchiveId === item.id ? (
                        <tr>
                          <td colSpan={5} className="py-6 px-2">
                            <ArchiveForm 
                              key={`edit-archive-${item.id}`}
                              item={item} 
                              onSave={(updated) => { updateArchiveItem(item.id, updated); setEditingArchiveId(null); }}
                              onCancel={() => setEditingArchiveId(null)}
                            />
                          </td>
                        </tr>
                      ) : (
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                          <td className="py-3 px-2 opacity-40">{item.year}</td>
                          <td className="py-3 px-2 font-black">{item.company}</td>
                          <td className="py-3 px-2 opacity-40 italic">{item.category}</td>
                          <td className="py-3 px-2 opacity-60 line-clamp-1">{item.project}</td>
                          <td className="py-3 px-2 text-right space-x-2">
                            <button onClick={() => { setEditingArchiveId(item.id); setNewArchiveForm(false); }} className="underline opacity-40 hover:opacity-100 font-bold transition-opacity">EDIT</button>
                            <button onClick={() => deleteArchiveItem(item.id)} className="underline opacity-40 hover:text-red-500 font-bold transition-all">DEL</button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminView;