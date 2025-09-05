import { useState } from 'react'
import { api } from '../../lib/api'
export default function ApplicationWizard(){
  const [property, setProperty] = useState(''); const [type, setType] = useState('Hearing'); const [created, setCreated] = useState<any>(null); const [docId, setDocId] = useState('')
  async function createApp(){ const { data } = await api.post('/applications/', { property: Number(property), application_type: type }); setCreated(data) }
  async function attachDoc(){ if(!created) return; await api.post('/app_attachments/', { application: created.id, document: Number(docId) }); const { data } = await api.get(`/applications/${created.id}/`); setCreated(data); setDocId('') }
  async function autosend(){ if(!created) return; const { data } = await api.post(`/applications/${created.id}/autosend/`); setCreated(data) }
  return <div className="space-y-4">
    <h1 className="text-2xl font-semibold">Application Wizard</h1>
    {!created && <div className="p-3 border rounded space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <input className="border px-2 py-1 rounded" placeholder="Property ID" value={property} onChange={e=> setProperty(e.target.value)} />
        <input className="border px-2 py-1 rounded" placeholder="Application Type" value={type} onChange={e=> setType(e.target.value)} />
      </div>
      <button className="px-3 py-1 border rounded" disabled={!property} onClick={createApp}>Create Application</button>
    </div>}
    {created && <div className="space-y-3">
      <div className="p-3 border rounded"><div className="font-medium">Application #{created.id}</div><div className="text-sm text-gray-600">status: {created.status}</div></div>
      <div className="p-3 border rounded space-y-2">
        <div className="font-medium">Attach document</div>
        <div className="flex gap-2">
          <input className="border px-2 py-1 rounded" placeholder="Document ID" value={docId} onChange={e=> setDocId(e.target.value)} />
          <button className="px-3 py-1 border rounded" disabled={!docId} onClick={attachDoc}>Attach</button>
        </div>
        {created.attachments?.length>0 && <ul className="text-sm list-disc ml-5">{created.attachments.map((a:any)=> <li key={a.id}>doc {a.document}</li>)}</ul>}
      </div>
      <div className="flex gap-2"><button className="px-3 py-1 border rounded" onClick={autosend}>Auto-Send</button></div>
    </div>}
  </div>
}
