import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { useState } from 'react'
export default function CalendarAdmin(){
  const qc = useQueryClient()
  const { data } = useQuery({ queryKey:['eventsAll'], queryFn: async()=> (await api.get('/events/')).data })
  const [form, setForm] = useState({ property:'', title:'', description:'', start:'', end:'', all_day:false, is_public:true, flag_key:'' })
  async function createEvent(){
    const payload = { ...form, property: Number(form.property) }
    await api.post('/events/', payload)
    setForm({property:'', title:'', description:'', start:'', end:'', all_day:false, is_public:true, flag_key:''})
    qc.invalidateQueries({ queryKey:['eventsAll'] })
  }
  return <div className="space-y-4">
    <h1 className="text-2xl font-semibold">Calendar (Admin)</h1>
    <div className="p-3 border rounded space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <input className="border px-2 py-1 rounded" placeholder="Property ID" value={form.property} onChange={e=> setForm({...form, property:e.target.value})} />
        <input className="border px-2 py-1 rounded" placeholder="Title" value={form.title} onChange={e=> setForm({...form, title:e.target.value})} />
        <input className="border px-2 py-1 rounded" placeholder="Start (YYYY-MM-DDTHH:MM)" value={form.start} onChange={e=> setForm({...form, start:e.target.value})} />
        <input className="border px-2 py-1 rounded" placeholder="End (YYYY-MM-DDTHH:MM)" value={form.end} onChange={e=> setForm({...form, end:e.target.value})} />
        <input className="border px-2 py-1 rounded col-span-2" placeholder="Description" value={form.description} onChange={e=> setForm({...form, description:e.target.value})} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.all_day} onChange={e=> setForm({...form, all_day:e.target.checked})} /> All day</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_public} onChange={e=> setForm({...form, is_public:e.target.checked})} /> Public</label>
        <input className="border px-2 py-1 rounded" placeholder="Flag key (optional)" value={form.flag_key} onChange={e=> setForm({...form, flag_key:e.target.value})} />
      </div>
      <button className="px-3 py-1 border rounded" onClick={createEvent}>Create Event</button>
    </div>
    <ul className="space-y-2">
      {(data||[]).map((e:any)=> (<li key={e.id} className="border rounded p-2">
        <div className="font-medium">{e.title}</div>
        <div className="text-sm text-gray-600">{new Date(e.start).toLocaleString()} – {new Date(e.end).toLocaleString()}</div>
        {e.description && <p className="text-sm mt-1">{e.description}</p>}
        <div className="text-xs text-gray-500">property: {e.property} • public: {String(e.is_public)} • flag: {e.flag_key||'-'}</div>
      </li>))}
    </ul>
  </div>
}
