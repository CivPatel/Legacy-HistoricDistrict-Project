import { useState } from 'react'
import { api } from '../lib/api'
export default function Upload({propertyId, onDone}:{propertyId:number, onDone?:(doc:any)=>void}){
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string|undefined>()
  const [file, setFile] = useState<File|null>(null)
  const [docType, setDocType] = useState('')
  async function handleUpload(){
    if(!file) return
    setBusy(true); setError(undefined)
    try{
      const form = new FormData()
      form.set('property', String(propertyId))
      form.set('file', file)
      form.set('doc_type', docType)
      const { data } = await api.post('/documents/upload/', form, { headers: {'Content-Type':'multipart/form-data'} })
      onDone?.(data)
    }catch(e:any){ setError(e?.message || 'Upload failed') }
    finally{ setBusy(false) }
  }
  return <div className="space-y-2">
    <div className="flex gap-2">
      <input type="file" onChange={e=> setFile(e.target.files?.[0]||null)} />
      <input className="border px-2 py-1 rounded" placeholder="doc type" value={docType} onChange={e=> setDocType(e.target.value)} />
      <button className="px-3 py-1 border rounded" disabled={!file||busy} onClick={handleUpload}>{busy?'Uploading…':'Upload'}</button>
    </div>
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
}
