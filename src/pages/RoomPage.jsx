export default function RoomPage({ material, finish }) {
  return (
    <div className="h-[calc(100vh-56px)] bg-black relative">
      <img src={material.img} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute bottom-10 left-10 p-6 bg-black/70 backdrop-blur-xl rounded-xl border border-white/10">
        <p className="text-[11px] tracking-widest">{material.name} • {finish}</p>
        <p className="text-[10px] text-white/40 mt-1">ROOM VIEW — immersive preview</p>
      </div>
    </div>
  )
}