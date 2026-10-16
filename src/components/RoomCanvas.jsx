import { motion, AnimatePresence } from 'framer-motion'
import Hotspot from './Hotspot.jsx'

const LIGHT_FILTERS = {
  daylight: 'brightness-[1.08] contrast-[1.05]',
  sunset: 'brightness-[0.92] sepia-[0.25] hue-rotate-[-12deg]',
  night: 'brightness-[0.6] contrast-[1.15]'
}

const HOTSPOTS = [
  { id:'facade', label:'Facade System', top:'42%', left:'58%', product:'Slate Charcoal Facade', designer:'Studio KO', dims:'6x12m', lead:'6-8 weeks', materialId:'slate', price:8500 },
  { id:'wood', label:'Wood Cladding', top:'68%', left:'24%', product:'Walnut Smoked', designer:'Muller', dims:'2400x600mm', lead:'4-5 weeks', materialId:'walnut', price:4200 },
  { id:'metal', label:'Brass Trim', top:'32%', left:'68%', product:'Brass Brushed', designer:'Anastassiades', dims:'Custom', lead:'3 weeks', materialId:'brass', price:3200 },
  { id:'glazing', label:'Glazing', top:'73%', left:'54%', product:'Glass Smoked', designer:'Lumina Lab', dims:'2800x2400mm', lead:'2 weeks', materialId:'glass', price:2800 },
]

export default function RoomCanvas({ material, finish, lightPreset, onHotspotClick }) {
  return (
    <div className="relative bg-[#111] overflow-hidden w-full h-[68vh] lg:h-[calc(100vh-56px-68px)]">
      <AnimatePresence mode="wait">
        <motion.img key={material.id+finish+lightPreset} src={material.img} initial={{opacity:0,scale:1.02}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:0.7}} className={`w-full h-full object-cover ${LIGHT_FILTERS[lightPreset]}`} />
      </AnimatePresence>
      {lightPreset==='sunset' && <div className="absolute inset-0 bg-gradient-to-t from-orange-500/25 pointer-events-none" />}
      {lightPreset==='night' && <div className="absolute inset-0 bg-blue-900/35 mix-blend-multiply pointer-events-none" />}
      <div className="absolute bottom-[48%] left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur px-4 py-2 rounded-full border border-white/10">
        <p className="text-[9px] lg:text-[10px] tracking-[0.2em] whitespace-nowrap">{material.name.toUpperCase()} • {finish} • {lightPreset.toUpperCase()}</p>
      </div>
      {HOTSPOTS.map(h=><Hotspot key={h.id} top={h.top} left={h.left} label={h.label} active={material.id===h.materialId} onClick={()=>onHotspotClick(h)} />)}
    </div>
  )
}