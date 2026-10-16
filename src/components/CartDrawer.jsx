import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function CartDrawer({ cart = [], onClose, onRemove, onClear }) {
  const [step, setStep] = useState('cart')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)

  const total = cart.reduce((s,i)=>s+(Number(i.price)||0),0)

  const handleCheckout = async () => {
    if(!email.includes('@')) return alert('Enter valid email')
    setSending(true)
    try {
      // 1. Save order to Supabase
      const { error } = await supabase.from('orders').insert([{
        email,
        total,
        items: cart
      }])
      if(error) throw error

      // 2. Send real email receipt (using Supabase's email via trigger OR just confirm)
      // For now we save + show success. To send actual email, enable Resend integration below.
      console.log('Order saved:', {email, total, cart})

      setStep('success')
      setTimeout(()=>{
        onClear?.()
        setStep('cart')
        onClose()
      },2500)

    } catch(err) {
      console.error(err)
      alert('Checkout failed: ' + err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-[400px] h-full bg-[#141414] border-l border-white/10 p-6 flex flex-col" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between mb-6"><h2 className="text-[12px] tracking-[0.3em]">CART ({cart.length})</h2><button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10">✕</button></div>

        {step==='cart' && <>
          <div className="flex-1 overflow-auto space-y-3">
            {cart.length===0? <p className="opacity-30 text-center mt-24 text-[11px]">Cart empty</p> :
              cart.map(item=>(
                <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <img src={item.img} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1"><p className="text-[11px]">{item.name}</p><p className="text-[10px] opacity-50">${Number(item.price).toLocaleString()}</p></div>
                  <button onClick={()=>onRemove(item.id)} className="opacity-40">✕</button>
                </div>
              ))}
          </div>
          {cart.length>0 && <><div className="border-t border-white/10 pt-4 mt-4 flex justify-between"><span>Total</span><span>${total.toLocaleString()}</span></div><button onClick={()=>setStep('checkout')} className="mt-4 h-12 rounded-full bg-white text-black w-full text-[11px]">PROCEED TO CHECKOUT</button></>}
        </>}

        {step==='checkout' && <>
          <h3 className="mb-6">Checkout — {cart.length} build(s) • ${total.toLocaleString()}</h3>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email for receipt" type="email" className="w-full h-12 bg-white/5 border border-white/10 rounded-full px-5 text-[12px] mb-4 outline-none focus:border-white/30" />
          <button disabled={sending} onClick={handleCheckout} className="h-12 rounded-full bg-white text-black w-full text-[11px] disabled:opacity-50">
            {sending? 'SAVING...' : `CONFIRM ORDER • $${total.toLocaleString()}`}
          </button>
          <button onClick={()=>setStep('cart')} className="h-11 mt-2 rounded-full border border-white/10 w-full text-[11px]">Back</button>
          <p className="text-[9px] opacity-30 mt-4 text-center">Order will be saved to Supabase orders table. Check dashboard to confirm.</p>
        </>}

        {step==='success' && <div className="flex-1 flex flex-col items-center justify-center text-center"><div className="w-14 h-14 rounded-full bg-emerald-400 flex items-center justify-center mb-4">✓</div><p>Order confirmed!</p><p className="text-[11px] opacity-50 mt-2">Saved for {email} — Check Supabase orders table</p></div>}
      </div>
    </div>
  )
}