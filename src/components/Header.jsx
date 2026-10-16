import { Search, Heart, ShoppingBag, User, ArrowUpRight } from 'lucide-react'

export default function Header({ cartCount, favoritesCount, activeView, onNavigate, onSearch, onCartOpen, onFavoritesOpen, onProfileOpen }) {
  const linkClass = (view) => `hover:cursor-pointer transition ${activeView===view? 'text-white underline' : 'text-white/50 hover:text-white'}`

  return (
    <header className="h-[56px] border-b border-white/10 flex items-center justify-between px-6 sticky top-0 bg-[#0e0e0e]/80 backdrop-blur-xl z-40">
      {/* LEFT - Logo */}
      <h1 className="text-[13px] font-bold tracking-[0.2em] shrink-0">LUMINA HAUS</h1>

      {/* CENTER - Nav - now truly centralized */}
      <nav className="hidden md:flex items-center gap-3 text-[11px] tracking-[0.15em] absolute left-1/2 -translate-x-1/2">
        <button onClick={() => onNavigate('overview')} className={linkClass('overview')}>OVERVIEW</button><span className="text-[9px] text-white/30">•</span>
        <button onClick={() => onNavigate('configure')} className={linkClass('configure')}>CONFIGURE</button><span className="text-[9px] text-white/30">•</span>
        <button onClick={() => onNavigate('materials')} className={linkClass('materials')}>MATERIALS</button><span className="text-[9px] text-white/30">•</span>
        <button onClick={() => onNavigate('room')} className={linkClass('room')}>ROOM</button><span className="text-[9px] text-white/30">•</span>
        <button onClick={() => onNavigate('moodboard')} className={linkClass('moodboard')}>MOODBOARD</button><span className="text-[9px] text-white/30">•</span>
        {/* FIXED - Share now uses linkClass, only white when active */}
        <button onClick={() => onNavigate('share')} className={`${linkClass('share')} flex items-center gap-1`}>SHARE <ArrowUpRight className="w-3 h-3" /></button>
      </nav>

      {/* RIGHT - Icons */}
      <div className="flex items-center gap-4 text-white/70 shrink-0">
        <button onClick={onSearch} className='hover:cursor-pointer hover:text-white'><Search className="w-4 h-4" /></button>
        <button onClick={onFavoritesOpen} className='hover:cursor-pointer relative hover:text-white'>
          <Heart className="w-4 h-4" />
          {favoritesCount>0 && <span className="absolute -top-2 -right-2 bg-white text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{favoritesCount}</span>}
        </button>
        <button onClick={onCartOpen} className='hover:cursor-pointer relative hover:text-white text-white'>
          <ShoppingBag className="w-4 h-4" />
          {cartCount>0 && <span className="absolute -top-2 -right-2 bg-white text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
        </button>
        <button onClick={onProfileOpen} className='hover:cursor-pointer hover:text-white'><User className="w-4 h-4" /></button>
      </div>
    </header>
  )
}