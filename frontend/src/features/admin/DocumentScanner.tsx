import { useState } from 'react'
import Upload from '../../components/Upload'
import { api } from '../../lib/api'
export default function DocumentScanner(){
  const [propertyId, setPropertyId] = useState<number|undefined>()
  return <div className="space-y-4">
    <h1 className="text-2xl font-semibold">Document Scanner</h1>
    <div className="flex gap-2 items-center">
      <input className="border px-2 py-1 rounded" placeholder="Property ID" onChange={e=> setPropertyId(Number(e.target.value))} />
    </div>
    {propertyId ? <Upload propertyId={propertyId} /> : <p>Enter a Property ID to enable upload.</p>}
    <hr className="my-4" />
    <h2 className="font-semibold">OCR a Document (by ID)</h2>
    <OCRForm />
  </div>
}
function OCRForm(){
  const [docId, setDocId] = useState(''); const [result, setResult] = useState<any>(null); const [busy, setBusy] = useState(false)
  async function run(){ if(!docId) return; setBusy(true); const { data } = await api.post(`/documents/${docId}/ocr/`); setResult(data); setBusy(false) }
  return <div className="space-y-2">
    <div className="flex gap-2">
      <input className="border px-2 py-1 rounded" placeholder="Document ID" value={docId} onChange={e=> setDocId(e.target.value)} />
      <button className="px-3 py-1 border rounded" disabled={!docId||busy} onClick={run}>{busy?'Working…':'Run OCR'}</button>
    </div>
    {result && <pre className="text-xs bg-gray-50 p-2 border rounded overflow-auto">{JSON.stringify(result,null,2)}</pre>}
  </div>
}
