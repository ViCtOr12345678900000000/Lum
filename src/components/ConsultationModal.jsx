import { useState } from 'react'

export default function ConsultationModal({ config, total, onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name:'', email:'', location:'', timeline:'' })

  const downloadSpec = () => {
    const data = { config, total, client: form, date: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download=`lumina-spec-${Date.now()}.json`; a.click()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6">
      <div className="w-full max-w-[480px] bg-[#161616] border border-white/10 rounded-[24px] p-8">
        <div className="flex justify-between mb-6"><p className="text-[11px] tracking-[0.3em]">STEP {step}/3</p><button onClick={onClose}>✕</button></div>
        
        {step===1 && <>
          <h2 className="text-[20px] mb-4">Your Build Summary</h2>
          <div className="bg-white/5 rounded-xl p-4 text-[12px] space-y-2 mb-6">
            <p>Material: {config.material.name}</p><p>Finish: {config.finish}</p><p>Light: {config.lightPreset}</p><p className="pt-2 font-bold">Total Estimate: ${total.toLocaleString()}</p>
          </div>
          <button onClick={()=>setStep(2)} className="w-full h-11 bg-white text-black rounded-full text-[11px] tracking-widest">CONTINUE</button>
        </>}
        {step===2 && <>
          <h2 className="text-[20px] mb-4">Project Details</h2>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full h-11 bg-white/5 border border-white/10 rounded-full px-5 text-[12px] mb-2" />
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full h-11 bg-white/5 border border-white/10 rounded-full px-5 text-[12px] mb-2" />
          <input placeholder="Project Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} className="w-full h-11 bg-white/5 border border-white/10 rounded-full px-5 text-[12px] mb-2" />
          <input placeholder="Timeline" value={form.timeline} onChange={e=>setForm({...form,timeline:e.target.value})} className="w-full h-11 bg-white/5 border border-white/10 rounded-full px-5 text-[12px] mb-6" />
          <button onClick={()=>setStep(3)} className="w-full h-11 bg-white text-black rounded-full text-[11px] tracking-widest">SUBMIT REQUEST</button>
        </>}
        {step===3 && <>
          <h2 className="text-[20px] mb-2">Request Sent ✨</h2>
          <p className="text-[11px] text-white/50 mb-6">Our design team will contact you in 24h. Spec sheet ready.</p>
          <button onClick={downloadSpec} className="w-full h-11 bg-white text-black rounded-full text-[11px] tracking-widest mb-2">DOWNLOAD SPEC SHEET (JSON)</button>
          <button onClick={onClose} className="w-full h-11 border border-white/10 rounded-full text-[11px]">CLOSE</button>
        </>}
      </div>
    </div>
  )
}