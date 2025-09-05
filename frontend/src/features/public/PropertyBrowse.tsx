import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { Link } from 'react-router-dom'
type Property = { id:number; display_name:string }
export default function PropertyBrowse(){
  const { data } = useQuery({ queryKey:['properties'], queryFn: async()=> (await api.get('/properties/')).data as Property[] })
  return <div className="space-y-4">
    <h1 className="text-2xl font-semibold">Browse Properties</h1>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {(data||[]).map(p=> <li key={p.id} className="p-3 border rounded"><Link to={`/properties/${p.id}`} className="font-medium">{p.display_name}</Link></li>)}
    </ul>
  </div>
}
