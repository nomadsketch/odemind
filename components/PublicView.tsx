import React, { useState } from 'react';
import { AppState, Category } from '../types';
import TicketCard from './TicketCard';
import Barcode from './Barcode';

interface PublicViewProps {
  state: AppState;
}

type ViewType = 'HOME' | 'CONTENT' | 'SERVICES' | 'CONTACT';

const PublicView: React.FC<PublicViewProps> = ({ state }) => {
  const [currentView, setCurrentView] = useState<ViewType>('HOME');
  const categories = Object.values(Category);
  const instagramUrl = "https://www.instagram.com/onedayearly.mind/?igsh=dHJobnplYTR2bmt3&utm_source=qr#";

  const renderHome = () => (
    <div className="animate-in fade-in duration-500">
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-white">
        <div className="p-8 border-r border-white flex flex-col justify-center">
          <div className="text-[10px] opacity-40 mb-4 font-bold uppercase tracking-widest font-mono underline">AGENCY_OVERVIEW_V2.1</div>
          <h2 className="text-sm font-black italic uppercase leading-none mb-4 font-mono tracking-tighter">ONE DAY EARLY</h2>
          <p className="text-[10px] leading-relaxed opacity-70 uppercase font-mono max-w-md">
            ODEMIND IS A CONTENT ARCHITECTURE HUB SPECIALIZING IN THE INTERSECTION OF BRANDING, SPACE, AI, AND HYBRID FILM PRODUCTION. OPERATING ACROSS SEOUL, HONG KONG, AND TAIPEI.
          </p>
          <div className="mt-8 flex gap-4">
            <button onClick={() => setCurrentView('CONTENT')} className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase hover:bg-black hover:text-white border border-white transition-all font-mono">
              [ ACCESS_PORTFOLIO_LOG ]
            </button>
          </div>
        </div>
        <div className="p-8 bg-white/5 flex flex-col justify-between min-h-[350px] relative overflow-hidden">
          <div className="absolute top-0 right-10 bottom-0 w-[1px] bg-white/10 border-r border-dashed border-white/20"></div>
          
          <div className="flex justify-between items-start z-10">
            <div className="text-[10px] font-bold opacity-30 font-mono">SYSTEM_METRICS_STABLE</div>
            <div className="text-right font-mono">
              <div className="text-xl font-black italic leading-none">100%</div>
              <div className="text-[8px] opacity-50 uppercase font-mono tracking-[0.2em]">UPTIME_RELIABILITY</div>
            </div>
          </div>
          
          <div className="space-y-3 font-mono text-[9px] z-10 max-w-xs">
            <div className="flex justify-between border-b border-white/20 pb-1 uppercase">
              <span className="opacity-40">RECORDS_ARCHIVED:</span>
              <span className="font-bold">{state.projects.length + state.archiveItems.length}</span>
            </div>
            <div className="flex justify-between border-b border-white/20 pb-1 uppercase">
              <span className="opacity-40">ACTIVE_NODE_LOC:</span>
              <span className="font-bold">SEOUL_HQ</span>
            </div>
            <div className="flex justify-between border-b border-white/20 pb-1 uppercase">
              <span className="opacity-40">ENCRYPTION_LAYER:</span>
              <span className="font-bold">AES-256</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end z-10">
            <Barcode className="h-6 opacity-40" />
            <div className="text-[8px] opacity-20 font-bold tracking-[0.5em] vertical-rl">ODM_TERMINAL_V.2</div>
          </div>
        </div>
      </section>
      
      <section className="p-8 border-b border-white bg-black">
        <div className="flex justify-between items-center mb-8">
           <div className="text-[10px] opacity-40 font-bold uppercase underline font-mono">RECENT_TRANSMISSIONS_RECEIPT</div>
           <div className="text-[8px] opacity-20 font-mono">REF_LOG_TIMESTAMP: {new Date().getTime()}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {state.projects.slice(0, 3).map(project => (
            <TicketCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="p-8 bg-black">
        <div className="text-[10px] opacity-40 mb-8 font-bold uppercase underline font-mono tracking-widest">TRANSMISSION_HISTORY_LOG_FILE</div>
        <div className="overflow-x-auto border border-white/10 p-4 bg-white/[0.02]">
          <table className="w-full text-left font-mono text-[9px] border-collapse">
            <thead>
              <tr className="border-b border-white text-white/40 font-bold uppercase">
                <th className="py-3 pr-4">YEAR_STAMP</th>
                <th className="py-3 pr-4">COMPANY_ID</th>
                <th className="py-3 pr-4">TYPE_CAT</th>
                <th className="py-3">PROJECT_REF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {state.archiveItems.map((item) => (
                <tr key={item.id} className="hover:bg-white hover:text-black transition-colors group cursor-default">
                  <td className="py-3 pr-4 whitespace-nowrap opacity-60 group-hover:opacity-100 font-bold">{item.year}</td>
                  <td className="py-3 pr-4 font-black uppercase tracking-tighter">{item.company}</td>
                  <td className="py-3 pr-4 opacity-60 group-hover:opacity-100 italic">[{item.category}]</td>
                  <td className="py-3 opacity-60 group-hover:opacity-100">{item.project}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8 pt-4 border-t border-white/20 flex justify-between items-center opacity-30">
             <span className="text-[8px] font-bold tracking-[0.5em]">--- END OF DATA STRING ---</span>
             <Barcode className="h-3" />
          </div>
        </div>
      </section>
    </div>
  );

  const renderContent = () => (
    <div className="animate-in slide-in-from-bottom-4 duration-500 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white pb-8 gap-6">
        <div>
          <h2 className="text-sm font-black italic tracking-tighter uppercase font-mono">CONTENT_DATABASE</h2>
          <p className="text-[9px] opacity-40 uppercase font-mono mt-1">SCRAPING ALL ACTIVE PRODUCTION NODES</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} className="text-[9px] border border-white/20 px-3 py-1 hover:bg-white hover:text-black transition-all uppercase font-mono font-bold tracking-widest">
              [{cat}]
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {state.projects.map(project => (
          <TicketCard key={project.id} project={project} />
        ))}
        <div className="border border-white/10 border-dashed p-8 flex flex-col items-center justify-center text-[9px] text-white/20 min-h-[400px] uppercase font-mono">
           <div className="w-12 h-12 border border-white/10 border-dashed rounded-full flex items-center justify-center mb-6 animate-pulse">+</div>
           <span className="tracking-[0.5em]">BUFFER_EMPTY</span>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="animate-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-white">
        {state.services.map((service, idx) => (
          <div key={service.id} className={`p-12 border-white group hover:bg-white hover:text-black transition-all cursor-default flex flex-col justify-between min-h-[400px] ${idx % 2 === 0 ? 'lg:border-r' : ''} border-b relative overflow-hidden`}>
            <div className="absolute -bottom-10 -right-4 text-[120px] font-black italic opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
              {service.number}
            </div>
            
            <div className="z-10">
              <div className="text-[10px] mb-12 font-bold font-mono uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100">SYSTEM_CAPABILITY_{service.number}</div>
              <h2 className="text-sm font-black mb-6 leading-none uppercase italic font-mono tracking-tighter">
                {service.title}
              </h2>
              <p className="text-[10px] leading-relaxed opacity-60 group-hover:opacity-100 max-w-sm uppercase font-mono font-medium">
                {service.description}
              </p>
            </div>
            
            <div className="mt-12 flex justify-between items-end z-10">
               <div className="text-[9px] opacity-20 group-hover:opacity-100 flex gap-4 font-mono font-bold">
                 <span>[STABLE]</span>
                 <span>[AES_VERIFIED]</span>
                 <span>[NODE_O1]</span>
               </div>
               <div className="h-px bg-current flex-grow mx-8 opacity-10"></div>
               <span className="text-lg font-thin tracking-widest opacity-20 group-hover:opacity-40 font-mono italic">{idx + 1}/4</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="animate-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-white min-h-[70vh]">
        <div className="p-8 md:p-12 border-r border-white flex flex-col justify-between">
          <div>
            <div className="text-[10px] opacity-40 uppercase tracking-[0.5em] font-bold underline mb-16 font-mono">NODE_LOCATIONS_PROTOCOL</div>
            <div className="space-y-16 font-mono">
              <div>
                <div className="text-[9px] opacity-30 mb-4 uppercase font-bold tracking-widest underline">EMAIL_DATA_LINK</div>
                <a href="mailto:info@odemind.co.kr" className="text-sm font-black uppercase tracking-tighter hover:bg-white hover:text-black transition-all px-2 -ml-2 underline decoration-dashed font-mono italic">info@odemind.co.kr</a>
              </div>
              <div>
                <div className="text-[9px] opacity-30 mb-4 uppercase font-bold tracking-widest underline">PHYSICAL_HQ_COORDINATES</div>
                <div className="flex flex-col gap-6">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Seodaemun-gu+Seoul+Korea" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-black uppercase italic hover:bg-white hover:text-black transition-all px-2 -ml-2 underline decoration-solid inline-block font-mono tracking-tighter"
                  >
                    SEOUL_KOR / SEODAEMUN-GU
                  </a>
                  <div className="flex items-center gap-4">
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Seodaemun-gu+Seoul+Korea" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[9px] font-bold tracking-[0.2em] bg-white text-black hover:invert transition-all inline-flex items-center gap-2 px-3 py-1.5 uppercase font-mono"
                    >
                      [ OPEN_SATELLITE_FEED ] ↗
                    </a>
                    <Barcode className="h-4 opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex flex-col gap-8">
            <div className="flex flex-wrap gap-8 font-mono">
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-black border-b-2 border-white hover:opacity-50 uppercase tracking-widest transition-opacity italic"
              >
                INSTAGRAM
              </a>
              <a href="#" className="text-[10px] font-black border-b-2 border-white hover:opacity-50 uppercase tracking-widest italic">VIMEO_SYSTEM</a>
              <a href="#" className="text-[10px] font-black border-b-2 border-white hover:opacity-50 uppercase tracking-widest italic">PINTEREST</a>
            </div>
            <div className="flex justify-between items-center opacity-20">
              <Barcode className="h-8" />
              <span className="text-[8px] font-bold tracking-[0.5em]">SECURE_TRANSMISSION_READY</span>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-white/[0.03] border-l border-white/10">
          <div className="text-[10px] opacity-40 uppercase tracking-[0.5em] font-bold underline mb-12 font-mono text-center">DATA_INPUT_TERMINAL_V.2</div>
          <form action="https://formspree.io/f/xbdlpppr" method="POST" className="space-y-8 max-w-lg mx-auto">
            <div className="grid grid-cols-1 gap-8">
              <div className="flex flex-col">
                <label className="text-[9px] mb-3 uppercase opacity-40 font-mono font-bold tracking-widest">IDENTIFIER_NAME</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="USER_NAME_STRING"
                  className="bg-transparent border border-white/20 focus:border-white p-3 text-[10px] outline-none uppercase placeholder:opacity-10 transition-all font-mono tracking-widest"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[9px] mb-3 uppercase opacity-40 font-mono font-bold tracking-widest">RETURN_PATH_EMAIL</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  placeholder="CLIENT@DOMAIN.PROTOCOL"
                  className="bg-transparent border border-white/20 focus:border-white p-3 text-[10px] outline-none uppercase placeholder:opacity-10 transition-all font-mono tracking-widest"
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <label className="text-[9px] mb-3 uppercase opacity-40 font-mono font-bold tracking-widest">TRANSMISSION_SUBJECT_MODALITY</label>
              <select 
                name="subject"
                className="bg-black border border-white/20 focus:border-white p-3 text-[10px] outline-none uppercase transition-all appearance-none cursor-pointer font-mono font-bold tracking-widest"
              >
                <option value="content">TYPE: CONTENT</option>
                <option value="branding">TYPE: BRANDING</option>
                <option value="space">TYPE: SPACE</option>
                <option value="film">TYPE: FILM</option>
                <option value="performing_arts">TYPE: PERFORMING ARTS</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[9px] mb-3 uppercase opacity-40 font-mono font-bold tracking-widest">TRANSMISSION_LOG_PAYLOAD</label>
              <textarea 
                name="message" 
                rows={5}
                required
                placeholder="DESCRIBE PROJECT PARAMETERS AND ARCHITECTURAL GOALS..."
                className="bg-transparent border border-white/20 focus:border-white p-3 text-[10px] outline-none uppercase placeholder:opacity-10 transition-all resize-none font-mono tracking-widest leading-relaxed"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] hover:invert border border-white transition-all flex items-center justify-center gap-4 font-mono"
            >
              [ INITIATE_DATA_TRANSMIT ]
            </button>
            <div className="flex flex-col items-center gap-2 opacity-20">
              <p className="text-[8px] text-center uppercase tracking-[0.4em] font-mono">
                ENCRYPTED_P2P_HANDSHAKE_REQUIRED
              </p>
              <Barcode className="h-2 w-32" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1440px] mx-auto min-h-screen border-x border-white/20 flex flex-col selection:bg-white selection:text-black">
      <header className="border-b border-white sticky top-0 bg-black z-40">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4 border-b md:border-b-0 md:border-r border-white flex flex-col justify-between">
            <div>
              <div className="text-[9px] text-white/50 uppercase tracking-tighter font-mono font-bold underline">SYS_REF_ID: ODM_01</div>
              <div className="text-[8px] text-white/20 uppercase mt-1 leading-none font-mono tracking-[0.3em] italic">ONE DAY EARLY PORTFOLIO V.2</div>
            </div>
            <div className="text-[9px] mt-4 font-mono font-black tracking-widest">EST. 2004 / SEOUL_KR</div>
          </div>
          <div className="p-4 md:p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white bg-white/5">
            <button onClick={() => setCurrentView('HOME')} className="group text-center">
              <h1 className="text-lg md:text-xl font-black tracking-tighter italic mb-1 group-hover:scale-105 transition-transform font-mono uppercase">ODEMIND</h1>
              <p className="text-[8px] md:text-[9px] tracking-[0.4em] opacity-40 uppercase font-mono font-bold group-hover:opacity-100 transition-opacity">CONTENT. BRANDING. SPACE. FILM.</p>
            </button>
          </div>
          <div className="p-4 flex flex-col justify-between items-end">
            <Barcode className="h-6 hidden md:flex opacity-60" />
            <nav className="flex gap-6 text-[10px] uppercase font-black font-mono tracking-widest">
              <button 
                onClick={() => setCurrentView('CONTENT')} 
                className={`${currentView === 'CONTENT' ? 'line-through opacity-100' : 'opacity-40 hover:opacity-100'} transition-all`}
              >[ CONTENT ]</button>
              <button 
                onClick={() => setCurrentView('SERVICES')} 
                className={`${currentView === 'SERVICES' ? 'line-through opacity-100' : 'opacity-40 hover:opacity-100'} transition-all`}
              >[ SERVICES ]</button>
              <button 
                onClick={() => setCurrentView('CONTACT')} 
                className={`${currentView === 'CONTACT' ? 'line-through opacity-100' : 'opacity-40 hover:opacity-100'} transition-all`}
              >[ CONTACT ]</button>
            </nav>
          </div>
        </div>
      </header>

      <section className="border-b border-white grid grid-cols-1 md:grid-cols-4 text-[8px] font-mono bg-white/[0.02]">
        <div className="p-3 border-b md:border-b-0 md:border-r border-white/50">
          <div className="opacity-40 mb-1 underline uppercase tracking-widest font-bold">ACTIVE_VIEW_MODULE:</div>
          <div className="font-black text-[10px] tracking-tight">{currentView}</div>
        </div>
        <div className="p-3 border-b md:border-b-0 md:border-r border-white/50">
          <div className="opacity-40 mb-1 underline uppercase tracking-widest font-bold">GEOSPATIAL_COORDS:</div>
          <div className="font-black text-[10px]">39.9169° N, 116.2735° E</div>
        </div>
        <div className="p-3 border-b md:border-b-0 md:border-r border-white/50">
          <div className="opacity-40 mb-1 underline uppercase tracking-widest font-bold">LAST_CACHE_UPDATE:</div>
          <div className="font-black text-[10px]">{new Date().toISOString().split('T')[0]} / {new Date().toLocaleTimeString()}</div>
        </div>
        <div className="p-3 flex justify-between items-center">
          <div>
            <div className="opacity-40 mb-1 underline uppercase tracking-widest font-bold">PROTOCOL:</div>
            <div className="font-black text-[10px] uppercase">SECURE_HANDSHAKE_AES</div>
          </div>
          <div className="text-white/30 text-[7px] italic font-bold tracking-[0.3em] bg-white/10 px-2 py-1">[ VERIFIED ]</div>
        </div>
      </section>

      <main className="flex-grow font-mono bg-black">
        {currentView === 'HOME' && renderHome()}
        {currentView === 'CONTENT' && renderContent()}
        {currentView === 'SERVICES' && renderServices()}
        {currentView === 'CONTACT' && renderContact()}
      </main>

      <footer className="border-t border-white mt-auto bg-black font-mono relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-20 border-t border-dashed border-white/40"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 border-b md:border-b-0 md:border-r border-white flex flex-col justify-between min-h-[350px]">
            <div>
              <h3 className="text-[10px] mb-8 opacity-40 underline font-bold tracking-[0.4em] uppercase">DIRECT_INQUIRY_CHANNEL</h3>
              <a href="mailto:info@odemind.co.kr" className="text-sm font-black uppercase tracking-tighter leading-none italic hover:bg-white hover:text-black p-2 -ml-2 transition-all inline-block font-mono underline decoration-dotted">
                INFO@ODEMIND.CO.KR
              </a>
              <p className="text-[10px] mt-10 opacity-60 uppercase leading-relaxed max-w-sm font-mono font-medium">
                ODEMIND IS A CONTENT ARCHITECTURE HUB BUILT FOR THE FUTURE. OPERATING THROUGH SYNERGISTIC PARTNERSHIPS ACROSS EAST ASIA. 
              </p>
            </div>
            <div className="mt-16 flex items-center gap-10">
               <Barcode className="h-6 opacity-40" />
               <div className="text-[9px] opacity-30 uppercase tracking-[0.3em] font-bold border-l border-white/20 pl-6">
                 LOCAL_NODE: SEOUL_01<br/>
                 TIMEZONE: GMT+9
               </div>
            </div>
          </div>

          <div className="p-10 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-10">
                <h3 className="text-[10px] opacity-40 underline font-bold uppercase tracking-[0.4em]">SOCIAL_GRID_PROTOCOLS</h3>
                <div className="flex flex-col gap-4">
                   <a 
                    href={instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] font-black hover:bg-white hover:text-black transition-all px-2 -ml-2 uppercase tracking-widest w-fit italic"
                   >
                     INSTAGRAM_OFFICIAL
                   </a>
                   <a href="#" className="text-[11px] font-black hover:bg-white hover:text-black transition-all px-2 -ml-2 uppercase tracking-widest w-fit italic">VIMEO_TRANSMISSIONS</a>
                   <a href="#" className="text-[11px] font-black hover:bg-white hover:text-black transition-all px-2 -ml-2 uppercase tracking-widest w-fit italic">PINTEREST_ARCHIVE</a>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-[40px] font-black italic opacity-[0.05] leading-none tracking-tighter">ODEMIND</div>
                <div className="text-[9px] opacity-20 font-bold uppercase mt-2">TECHNICAL_SPEC_V.2</div>
              </div>
            </div>

            <div className="mt-20 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between text-[9px] opacity-30 uppercase tracking-[0.4em] font-bold gap-4">
              <span>(C) 2004-2025 ODEMIND ARCHIVE SYST.</span>
              <div className="flex gap-4">
                <span>VER: 2.1.0_PROD</span>
                <span>ENC: AES_256</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicView;