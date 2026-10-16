export default function FinishToggle({ finish, onChange }) {
  return (
    <div className="flex bg-white/[0.06] p-1 rounded-full border border-white/10">
      {['MATTE','POLISHED'].map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`flex-1 py-2.5 text-[11px] tracking-widest rounded-full transition-all hover:cursor-pointer ${finish===f? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
        >
          {f}
        </button>
      ))}
    </div>
  )
}