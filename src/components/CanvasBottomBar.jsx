import { Camera, Sun, Settings } from 'lucide-react'
export default function CanvasBottomBar() {
  return (
    <div className="h-[56px] border-t border-white/10 bg-[#0e0e0e] flex items-center justify-between px-6 text-[10px] tracking-widest text-white/40">
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2"><Camera className="w-3.5 h-3.5" /> CAMERA: 35mm</span>
        <span className="flex items-center gap-2"><Sun className="w-3.5 h-3.5" /> LIGHT: Evening 18%</span>
        <span className="flex items-center gap-2"><Settings className="w-3.5 h-3.5" /> SHADOWS: ON</span>
      </div>
      <span className="hidden md:block">DRAG TO ORBIT • SCROLL TO ZOOM</span>
    </div>
  )
}