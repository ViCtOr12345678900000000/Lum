import { motion, AnimatePresence } from 'framer-motion'

export default function FooterBar({ price, material, extras, onAddToCart, onCostClick, onConsultClick }) {
  return (
    <div className="h-[68px] shrink-0 bg-[#0e0e0e] border-t border-white/10 flex items-center justify-between px-3 md:px-6 z-50 gap-2">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <p className="text-[9px] md:text-[10px] tracking-[0.2em] opacity-60 truncate">{material.name} — Ready • {extras.length} extras</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        <button onClick={onCostClick} className="text-right group">
          <p className="text-[7px] md:text-[8px] tracking-[0.3em] opacity-40 group-hover:opacity-100">TOTAL ESTIMATE ↘</p>
          <div className="flex items-baseline gap-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={price}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[14px] md:text-[16px] font-medium tracking-wide"
              >
                ${price.toLocaleString()}
              </motion.p>
            </AnimatePresence>
          </div>
        </button>

        {/* FIXED - Now shows on mobile too */}
        <button onClick={onConsultClick} className="flex h-10 px-3 md:px-5 rounded-full border border-white/15 text-[9px] md:text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition items-center justify-center">
          <span className="hidden md:inline">REQUEST CONSULT</span>
          <span className="md:hidden">CONSULT</span>
        </button>

        <button onClick={onAddToCart} className="h-10 px-4 md:px-7 rounded-full bg-white text-black text-[10px] md:text-[11px] tracking-[0.15em] font-medium hover:bg-white/90 transition">
          ADD TO CART
        </button>
      </div>
    </div>
  )
}