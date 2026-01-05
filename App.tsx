
import React, { useState, useEffect } from 'react';
import { AppState, Project, ArchiveItem } from './types';
import { INITIAL_PROJECTS, INITIAL_SERVICES, INITIAL_ARCHIVE } from './constants';
import PublicView from './components/PublicView';
import AdminView from './components/AdminView';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Initialize state with robust error handling for localStorage
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('odemind_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Basic validation to ensure data structure is intact
        if (parsed && Array.isArray(parsed.projects)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("CRITICAL: FAILED_TO_LOAD_PERSISTENT_STATE", e);
    }
    return {
      projects: INITIAL_PROJECTS,
      archiveItems: INITIAL_ARCHIVE,
      services: INITIAL_SERVICES,
      siteTitle: 'ODEMIND',
      tagline: 'CONTENT. BRANDING. SPACE. FILM.'
    };
  });

  // Persist state changes with capacity error handling
  useEffect(() => {
    try {
      localStorage.setItem('odemind_state', JSON.stringify(state));
    } catch (e) {
      console.error("CRITICAL: STORAGE_QUOTA_EXCEEDED", e);
      alert("WARNING: DATA_STORAGE_FULL. LARGE_IMAGE_FILES_MAY_NOT_BE_SAVED.");
    }
  }, [state]);

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setIsAuthenticating(true);
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '0729') {
      setIsAdmin(true);
      setIsAuthenticating(false);
      setPassword('');
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  const updateProject = (originalId: string, updated: Project) => {
    setState(prev => {
      const updatedProjects = prev.projects.map(p => p.id === originalId ? updated : p);
      return { ...prev, projects: updatedProjects };
    });
  };

  const addProject = (project: Project) => {
    setState(prev => ({ ...prev, projects: [project, ...prev.projects] }));
  };

  const deleteProject = (id: string) => {
    if (window.confirm(`CONFIRM_DELETION: ${id}?`)) {
      setState(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    }
  };

  const updateArchiveItem = (originalId: string, updated: ArchiveItem) => {
    setState(prev => ({
      ...prev,
      archiveItems: prev.archiveItems.map(item => item.id === originalId ? updated : item)
    }));
  };

  const addArchiveItem = (item: ArchiveItem) => {
    setState(prev => ({ ...prev, archiveItems: [item, ...prev.archiveItems] }));
  };

  const deleteArchiveItem = (id: string) => {
    if (window.confirm("CONFIRM_DELETION_OF_ARCHIVE_RECORD?")) {
      setState(prev => ({ ...prev, archiveItems: prev.archiveItems.filter(item => item.id !== id) }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-mono">
      {/* Navigation Toggle */}
      <button 
        onClick={handleAdminToggle}
        className="fixed bottom-4 right-4 z-50 px-3 py-1 border border-white text-[10px] uppercase hover:bg-white hover:text-black transition-colors"
      >
        {isAdmin ? '[ EXIT_ADMIN ]' : '[ ACCESS_ADMIN ]'}
      </button>

      {/* Password Prompt Modal */}
      {isAuthenticating && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4">
          <div className="w-full max-w-sm border border-white p-8 bg-black">
            <div className="text-[10px] opacity-50 mb-8 underline uppercase tracking-widest">
              SYSTEM_AUTHENTICATION_REQUIRED
            </div>
            <h2 className="text-xl font-black italic mb-6 uppercase">RESTRICTED_ACCESS</h2>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-[10px] mb-2 uppercase opacity-40">ENTER_ACCESS_KEY:</label>
                <input 
                  autoFocus
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className={`bg-transparent border ${error ? 'border-red-500' : 'border-white/30'} focus:border-white p-3 text-sm outline-none transition-colors tracking-[0.5em]`}
                />
                {error && <span className="text-[9px] text-red-500 mt-2 uppercase font-bold">ERROR_01: INVALID_CREDENTIALS</span>}
              </div>
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="flex-grow bg-white text-black py-2 text-xs font-bold uppercase hover:bg-black hover:text-white border border-white transition-all"
                >
                  [ AUTHORIZE ]
                </button>
                <button 
                  type="button"
                  onClick={() => setIsAuthenticating(false)}
                  className="px-4 border border-white/30 text-[10px] uppercase hover:bg-white hover:text-black transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </form>
            <div className="mt-12 text-[8px] opacity-20 uppercase tracking-[0.2em] text-center font-bold">
              UNAUTHORIZED_ACCESS_IS_STRICTLY_PROHIBITED_BY_PROTOCOL.
            </div>
          </div>
        </div>
      )}

      {isAdmin ? (
        <AdminView 
          state={state} 
          updateProject={updateProject} 
          addProject={addProject}
          deleteProject={deleteProject}
          updateArchiveItem={updateArchiveItem}
          addArchiveItem={addArchiveItem}
          deleteArchiveItem={deleteArchiveItem}
        />
      ) : (
        <PublicView state={state} />
      )}
    </div>
  );
};

export default App;
