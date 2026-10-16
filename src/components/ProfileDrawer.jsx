import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function ProfileDrawer({ onClose }) {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({data})=>setUser(data.user))
  }, [])

  useEffect(() => {
    if (user) {
      supabase.from('orders').select('*').eq('user_id', user.id).order('created_at',{ascending:false}).then(({data})=>setOrders(data||[]))
    }
  }, [user])

  const handleSignUp = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({ email, password, options:{data:{full_name:name}} })
    if (error) alert(error.message)
    else setUser(data.user)
    setLoading(false)
  }

  const handleSignIn = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else setUser(data.user)
    setLoading(false)
  }

  const handleSignOut = async () => { await supabase.auth.signOut(); setUser(null) }

  const initial = ((name || email || user?.email || 'U').charAt(0) || 'U').toUpperCase()

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/60" onClick={onClose}>
      <div className="w-[380px] h-full bg-[#0e0e0e] border-l border-white/10 p-6 flex flex-col" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between mb-8">
          <h2 className="text-[12px] tracking-[0.3em]">PROFILE</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {!user? (
          <>
            <p className="text-[11px] mb-6 text-white/50">Sign in to save projects & track orders</p>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="h-11 mb-2 bg-white/5 border border-white/10 rounded-full px-5 text-[12px] w-full outline-none" />
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="h-11 mb-2 bg-white/5 border border-white/10 rounded-full px-5 text-[12px] w-full outline-none" />
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password (min 6)" className="h-11 mb-6 bg-white/5 border border-white/10 rounded-full px-5 text-[12px] w-full outline-none" />
            <button onClick={handleSignUp} disabled={loading} className="h-11 rounded-full bg-white text-black text-[11px] tracking-widest mb-2 w-full">{loading?'...':'Sign Up'}</button>
            <button onClick={handleSignIn} disabled={loading} className="h-11 rounded-full border border-white/20 text-[11px] tracking-widest w-full">Sign In</button>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">{initial}</div>
              <p className="text-[12px]">{user.email}</p>
            </div>
            <h3 className="text-[10px] tracking-widest mb-3 opacity-50">MY ORDERS ({orders.length})</h3>
            <div className="flex-1 overflow-auto">
              {orders.length===0? <p className="text-[11px] text-white/30 mt-10 text-center">No orders yet. Go checkout!</p> :
              orders.map(o=><div key={o.id} className="p-3 mb-2 rounded-xl bg-white/5 border border-white/10 text-[11px]">Total: ${o.total} • {new Date(o.created_at).toLocaleDateString()}</div>)}
            </div>
            <button onClick={handleSignOut} className="mt-4 h-11 rounded-full border border-white/10 text-[11px] w-full">Sign Out</button>
          </>
        )}
      </div>
    </div>
  )
}