import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import MaterialSelector from './components/MaterialSelector.jsx'
import RoomCanvas from './components/RoomCanvas.jsx'
import Moodboard from './components/MoodBoard.jsx'
import FooterBar from './components/FooterBar.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import SearchDrawer from './components/SearchDrawer.jsx'
import FavoritesDrawer from './components/FavoritesDrawer.jsx'
import ProfileDrawer from './components/ProfileDrawer.jsx'
import HotspotDetailModal from './components/HotspotDetailModal.jsx'
import CostBreakdownDrawer from './components/CostBreakdownDrawer.jsx'
import ConsultationModal from './components/ConsultationModal.jsx'
import ConfigurePage from './pages/ConfigurePage.jsx'
import MaterialsPage from './pages/MaterialsPage.jsx'
import RoomPage from './pages/RoomPage.jsx'
import MoodboardPage from './pages/MoodboardPage.jsx'

export const MATERIALS = [
  { id: 'slate', name: 'Slate Charcoal', type: 'Natural Stone • Dark Grey', color: '#2a2e35', price: 320, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070' },
  { id: 'brass', name: 'Brass Brushed', type: 'Metal • Warm Brass', color: '#a68a64', price: 450, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053' },
  { id: 'linen', name: 'Linen Onyx', type: 'Fabric • Deep Black', color: '#111111', price: 280, img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074' },
  { id: 'walnut', name: 'Walnut Smoked', type: 'Wood • Dark Brown', color: '#3d2b24', price: 380, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000' },
  { id: 'glass', name: 'Glass Smoked', type: 'Glass • Tinted', color: '#3a3f45', price: 210, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2078' },
  { id: 'travertine', name: 'Travertine Silver', type: 'Natural Stone • Light Grey', color: '#d6cfc4', price: 410, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075' },
  { id: 'marble', name: 'Marble Calacatta', type: 'Natural Stone • White Vein', color: '#f5f0eb', price: 620, img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070' },
  { id: 'onyx', name: 'Onyx Ivory', type: 'Natural Stone • Backlit', color: '#fefefe', price: 580, img: 'https://images.unsplash.com/photo-1600210491369-e7538ba9c2d2?q=80&w=2070' },
  { id: 'oak', name: 'Oak White Rift', type: 'Wood • Natural Light', color: '#d9c5a5', price: 340, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2080' },
  { id: 'ash', name: 'Ash Blackened', type: 'Wood • Wire Brushed', color: '#1a1a1a', price: 360, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158' },
  { id: 'steel', name: 'Steel Blackened', type: 'Metal • Matte Black', color: '#222222', price: 390, img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070' },
  { id: 'aluminum', name: 'Aluminum Anodized', type: 'Metal • Soft Grey', color: '#4a4e4d', price: 310, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070' },
  { id: 'boucle', name: 'Bouclé Cream', type: 'Fabric • High Pile', color: '#f2ede6', price: 260, img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070' },
  { id: 'velvet', name: 'Velvet Forest', type: 'Fabric • Deep Green', color: '#1e3a2f', price: 300, img: 'https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?q=80&w=2070' },
  { id: 'concrete', name: 'Concrete Micro', type: 'Composite • Soft Matte', color: '#9a9a9a', price: 290, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2078' },
  { id: 'terrazzo', name: 'Terrazzo Nougat', type: 'Composite • Speckled', color: '#c4b5a0', price: 350, img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2070' },
]

const BASE_PRICE = 45000

export default function App() {
  const [view, setView] = useState('overview')
  const [selectedId, setSelectedId] = useState('walnut')
  const [finish, setFinish] = useState('MATTE')
  const [lightPreset, setLightPreset] = useState('daylight')
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('lumina_fav') || '[]'))
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('lumina_cart') || '[]'))
  const [savedBuilds, setSavedBuilds] = useState(() => JSON.parse(localStorage.getItem('lumina_builds') || '[]'))
  const [extras, setExtras] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [favOpen, setFavOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [hotspotData, setHotspotData] = useState(null)
  const [costOpen, setCostOpen] = useState(false)
  const [consultOpen, setConsultOpen] = useState(false)

  const selected = MATERIALS.find(m => m.id === selectedId) || MATERIALS[0]
  const totalPrice = BASE_PRICE + selected.price*12 + (finish==='POLISHED'?900:0) + extras.reduce((s,e)=>s+e.price,0)

  useEffect(()=>localStorage.setItem('lumina_fav', JSON.stringify(favorites)),[favorites])
  useEffect(()=>localStorage.setItem('lumina_cart', JSON.stringify(cart)),[cart])
  useEffect(()=>localStorage.setItem('lumina_builds', JSON.stringify(savedBuilds)),[savedBuilds])

  const toggleFav = (id) => setFavorites(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id])
  const addToCart = () => { setCart(prev=>[...prev,{ id:Date.now(), name:`${selected.name} • ${finish}`, price:totalPrice, finish, img:selected.img, extras }]); setCartOpen(true) }
  const handleAddExtra = (h) => { if(!extras.find(e=>e.id===h.id)) setExtras(prev=>[...prev,h]) }
  const saveBuild = () => { const b={ id:Date.now(), material:selected, finish, lightPreset, total:totalPrice, extras, date:new Date().toLocaleDateString() }; setSavedBuilds(prev=>[b,...prev]) }
  const loadBuild = (b) => { setSelectedId(b.material.id); setFinish(b.finish); setLightPreset(b.lightPreset); setExtras(b.extras||[]); setView('overview') }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#f5f5f3] flex flex-col">
      <Header cartCount={cart.length} favoritesCount={favorites.length} activeView={view} onNavigate={setView} onSearch={()=>setSearchOpen(true)} onCartOpen={()=>setCartOpen(true)} onFavoritesOpen={()=>setFavOpen(true)} onProfileOpen={()=>setProfileOpen(true)} />

      {view==='overview' && (
        <main className="flex flex-col lg:flex-row flex-1 lg:h-[calc(100vh-56px-68px)] lg:overflow-hidden">
          {/* LEFT - now scrolls inside itself */}
          <div className="order-2 lg:order-1 lg:w-[320px] xl:w-[340px] border-t lg:border-t-0 lg:border-r border-white/10 bg-[#0e0e0e] lg:overflow-y-auto lg:h-full shrink-0">
            <MaterialSelector materials={MATERIALS} selectedId={selectedId} onSelect={setSelectedId} finish={finish} onFinishChange={setFinish} />
          </div>
          {/* CENTER - Room */}
          <div className="order-1 lg:order-2 flex-1 w-full lg:overflow-y-auto lg:h-full min-h-[50vh] lg:min-h-0">
            <RoomCanvas material={selected} finish={finish} lightPreset={lightPreset} onHotspotClick={setHotspotData} />
          </div>
          {/* RIGHT - now scrolls inside itself */}
          <div className="order-3 lg:w-[320px] xl:w-[360px] border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0e0e0e] lg:overflow-y-auto lg:h-full shrink-0">
            <Moodboard selected={selected} onLightChange={setLightPreset} lightPreset={lightPreset} savedBuilds={savedBuilds} onLoadBuild={loadBuild} onSaveBuild={saveBuild} />
          </div>
        </main>
      )}

      {view==='configure' && <ConfigurePage materials={MATERIALS} selectedId={selectedId} onSelect={setSelectedId} />}
      {view==='materials' && <MaterialsPage materials={MATERIALS} favorites={favorites} onToggleFav={toggleFav} />}
      {view==='room' && <RoomPage material={selected} />}
      {view==='moodboard' && <MoodboardPage materials={MATERIALS} favorites={favorites} />}
      {view==='share' && <div className="p-20 text-center"><p className="text-[12px] tracking-widest">lumina.haus/p/{selectedId}</p></div>}

      <FooterBar price={totalPrice} material={selected} extras={extras} onAddToCart={addToCart} onCostClick={()=>setCostOpen(true)} onConsultClick={()=>setConsultOpen(true)} />

      {searchOpen && <SearchDrawer materials={MATERIALS} onClose={()=>setSearchOpen(false)} onSelect={(id)=>{ setSelectedId(id); setView('overview')}} />}
      {cartOpen && <CartDrawer cart={cart} onClose={()=>setCartOpen(false)} onRemove={(id)=>setCart(c=>c.filter(i=>i.id!==id))} onClear={()=>setCart([])} />}
      {favOpen && <FavoritesDrawer materials={MATERIALS} favorites={favorites} onClose={()=>setFavOpen(false)} onToggleFav={toggleFav} />}
      {profileOpen && <ProfileDrawer onClose={()=>setProfileOpen(false)} />}
      {hotspotData && <HotspotDetailModal data={hotspotData} onClose={()=>setHotspotData(null)} onAdd={handleAddExtra} />}
      {costOpen && <CostBreakdownDrawer onClose={()=>setCostOpen(false)} base={BASE_PRICE} material={selected} finish={finish} extras={extras} />}
      {consultOpen && <ConsultationModal config={{ material:selected, finish, lightPreset, extras }} total={totalPrice} onClose={()=>setConsultOpen(false)} />}
    </div>
  )
}