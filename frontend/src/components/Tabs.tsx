import { useState, ReactNode } from 'react'
type Tab = { key:string; label:string; content:ReactNode }
export default function Tabs({tabs, initial='overview'}:{tabs:Tab[]; initial?:string}){
  const [active, setActive] = useState(initial)
  return <div>
    <div className="flex gap-2 border-b mb-3">
      {tabs.map(t=> <button key={t.key} onClick={()=>setActive(t.key)}
        className={`px-3 py-2 -mb-px border-b-2 ${active===t.key?'border-black font-medium':'border-transparent text-gray-500'}`}>{t.label}</button>)}
    </div>
    <div>{tabs.find(t=>t.key===active)?.content}</div>
  </div>
}
