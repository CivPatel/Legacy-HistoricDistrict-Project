import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import Tabs from '../../components/Tabs'
import Upload from '../../components/Upload'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function PropertyDetail(){
  const { id } = useParams(); const pid = Number(id); const qc = useQueryClient()
  const { data } = useQuery({ queryKey:['property',pid], queryFn: async()=> (await api.get(`/properties/${pid}/`)).data })
  const { data: docs } = useQuery({ queryKey:['propertyDocs',pid], queryFn: async()=> (await api.get(`/properties/${pid}/documents/`)).data })
  const { data: events } = useQuery({ queryKey:['propertyEvents',pid], queryFn: async()=> (await api.get(`/properties/${pid}/events/`)).data })
  if(!data) return <div>Loading...</div>
  const firstAddr = (data.addresses||[])[0]
  const lat = firstAddr?.geocode_lat || 41.583, lng = firstAddr?.geocode_lng || -87.5
  const tabs = [
    { key:'overview', label:'Overview', content:<div><p>{data.description || 'No description'}</p></div> },
    { key:'photos', label:'Photos', content:<div className="grid grid-cols-2 md:grid-cols-3 gap-3">{(data.photos||[]).map((p:any)=>(<figure key={p.id} className="border rounded p-2"><img src={p.file} className="w-full h-40 object-cover"/><figcaption className="text-xs mt-1">{p.caption}</figcaption></figure>)) || <p>No photos.</p>}</div> },
    { key:'documents', label:'Documents', content:<div className="space-y-3">
        <Upload propertyId={pid} onDone={()=> qc.invalidateQueries({queryKey:['propertyDocs',pid]})} />
        <ul className="space-y-2">{(docs||[]).map((d:any)=>(<li key={d.id} className="flex items-center justify-between border rounded p-2">
          <div><div className="font-medium">{d.doc_type||'Document'}</div><a className="text-blue-600 underline text-sm" target="_blank" href={d.file}>download</a>
          {d.ocr && <div className="text-xs text-gray-500">OCR: {d.ocr.text.slice(0,80)}{d.ocr.text.length>80?'…':''}</div>}</div>
          {!d.ocr && <button className="px-2 py-1 border rounded" onClick={async()=>{await api.post(`/documents/${d.id}/ocr/`); qc.invalidateQueries({queryKey:['propertyDocs',pid]})}}>Run OCR</button>}
        </li>))}</ul></div> },
    { key:'events', label:'Events', content:<div className="space-y-2">{(events||[]).length===0 && <p>No events.</p>}
        <ul className="space-y-2">{(events||[]).map((e:any)=>(<li key={e.id} className="border rounded p-2"><div className="font-medium">{e.title}</div><div className="text-sm text-gray-600">{new Date(e.start).toLocaleString()} – {new Date(e.end).toLocaleString()}</div><p className="text-sm mt-1">{e.description}</p></li>))}</ul>
      </div> },
    { key:'map', label:'Map', content:<div className="h-80 border rounded overflow-hidden"><MapContainer center={[lat,lng]} zoom={15} style={{height:'100%',width:'100%'}}><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/><Marker position={[lat,lng]}><Popup>{data.display_name}</Popup></Marker></MapContainer></div> }
  ]
  return <div className="space-y-4">
    <h1 className="text-2xl font-semibold">{data.display_name}</h1>
    <div className="p-3 border rounded"><h2 className="font-semibold mb-2">Addresses</h2><ul>{(data.addresses||[]).map((a:any)=><li key={a.id}>{a.line1}, {a.city} {a.state}</li>)}</ul></div>
    <Tabs tabs={tabs} initial="overview"/>
  </div>
}
