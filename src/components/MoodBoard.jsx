export default function Moodboard({ selected, onLightChange, lightPreset, savedBuilds, onLoadBuild, onSaveBuild }) {
  return (
    <div className="p-4 lg:p-5 flex flex-col gap-6">
      <div>
        <div className="flex justify-between"><p className="text-[10px] tracking-[0.3em] opacity-40">MOODBOARD</p><span className="text-[9px] text-emerald-400">● LIVE ENGINE</span></div>
        <div className="mt-3 rounded-[16px] overflow-hidden border border-white/10 h-[120px] lg:h-[140px]"><img src={selected.img} className="w-full h-full object-cover" /></div>
      </div>
      <div>
        <p className="text-[10px] tracking-[0.3em] opacity-40 mb-3">LIGHTING PRESETS</p>
        <div className="flex lg:grid lg:grid-cols-3 gap-2">
          {['daylight','sunset','night'].map(p=><button key={p} onClick={()=>onLightChange(p)} className={`flex-1 lg:flex-none h-[72px] rounded-[14px] border text-[9px] tracking-widest flex flex-col justify-between p-3 ${lightPreset===p?'bg-white text-black':'bg-white/[0.04] border-white/10'}`}><span className="text-[16px]">{p==='daylight'?'☀️':p==='sunset'?'🌇':'🌙'}</span>{p.toUpperCase()}</button>)}
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-3"><p className="text-[10px] tracking-[0.3em] opacity-40">SAVED BUILDS</p><button onClick={onSaveBuild} className="text-[10px] px-4 h-7 rounded-full bg-white text-black">SAVE BUILD</button></div>
        <div className="space-y-2 max-h-[160px] overflow-auto">{savedBuilds.length===0? <p className="text-[10px] opacity-20">No builds yet.</p> : savedBuilds.map(b=><button key={b.id} onClick={()=>onLoadBuild(b)} className="w-full text-left p-3 rounded-xl bg-white/[0.04] border border-white/5"><p className="text-[11px]">{b.material.name} • {b.finish}</p><p className="text-[9px] opacity-40">{b.date} • ${b.total.toLocaleString()}</p></button>)}</div>
      </div>
    </div>
  )
}