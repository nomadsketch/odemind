import React, { useState } from 'react';
import { Project } from '../types';

interface TicketCardProps {
  project: Project;
}

const TicketCard: React.FC<TicketCardProps> = ({ project }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const hasMultipleImages = project.imageUrls.length > 1;

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % project.imageUrls.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + project.imageUrls.length) % project.imageUrls.length);
  };

  return (
    <div className="group relative border border-white/40 p-4 hover:border-white transition-all flex flex-col gap-4 overflow-hidden bg-black/40 backdrop-blur-sm shadow-2xl">
      <div className="absolute top-1/2 -left-3 w-4 h-4 bg-black border border-white/60 rounded-full -translate-y-1/2 z-10 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"></div>
      <div className="absolute top-1/2 -right-3 w-4 h-4 bg-black border border-white/60 rounded-full -translate-y-1/2 z-10 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"></div>
      
      <div className="flex justify-between items-start text-[8px] text-white/50 font-mono font-black uppercase tracking-widest">
        <div className="flex flex-col">
          <span>UID: {project.id}</span>
          <span>STAMP: {project.date.replace(/-/g, '.')}</span>
        </div>
        <div className="text-right">
          <span>CAT_LOG: [{project.category}]</span>
        </div>
      </div>

      <div className="aspect-[16/10] bg-white/[0.03] overflow-hidden border border-white/20 relative group/img">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 w-full animate-[pulse_3s_infinite] pointer-events-none"></div>
        
        <img 
          src={project.imageUrls[imgIndex] || 'https://via.placeholder.com/800x600?text=ASSET_MISSING'} 
          alt={project.title}
          className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0"
        />
        
        {hasMultipleImages && (
          <>
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/img:opacity-100 transition-opacity">
              <button onClick={prevImg} className="bg-black/90 border border-white/40 text-white w-6 h-6 flex items-center justify-center hover:bg-white hover:text-black transition-colors font-mono font-bold text-xs">
                &lt;
              </button>
              <button onClick={nextImg} className="bg-black/90 border border-white/40 text-white w-6 h-6 flex items-center justify-center hover:bg-white hover:text-black transition-colors font-mono font-bold text-xs">
                &gt;
              </button>
            </div>
            <div className="absolute bottom-2 right-2 bg-white text-black border border-white px-2 py-0.5 text-[7px] font-black uppercase tracking-[0.2em] font-mono shadow-lg">
              ASSET_ID: {imgIndex + 1}/{project.imageUrls.length}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xs font-black italic uppercase tracking-tighter leading-none group-hover:bg-white group-hover:text-black p-1.5 -ml-1.5 transition-all font-mono w-fit underline decoration-white/20">
          {project.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-white/40 uppercase font-mono tracking-widest font-bold">TYPE_REF:</span>
          <span className="text-[9px] text-white font-mono bg-white/10 px-2 py-0.5 italic">{project.category}</span>
        </div>
      </div>

      <div className="mt-auto border-t border-dashed border-white/40 pt-4 flex flex-col gap-3">
        <p className="text-[9px] leading-relaxed line-clamp-3 uppercase opacity-60 font-mono font-medium tracking-tight">
          {project.description}
        </p>
        
        <div className="flex justify-between items-end border-t border-white/10 pt-3">
          <div className="flex flex-col gap-1 text-[8px] font-mono font-bold uppercase">
            <span className="opacity-40">CLIENT_NODE:</span>
            <span className="text-white tracking-widest">{project.client}</span>
          </div>
          <div className="flex flex-col items-end gap-1 font-mono">
            <span className="text-[7px] opacity-40 font-bold tracking-widest">STATUS:</span>
            <span className={`text-[9px] font-black px-1.5 py-0.5 ${project.status === 'IN_PROGRESS' ? 'bg-yellow-500 text-black animate-pulse' : project.status === 'ARCHIVED' ? 'bg-white/20 text-white' : 'bg-green-500 text-black'}`}>
              [{project.status}]
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
    </div>
  );
};

export default TicketCard;