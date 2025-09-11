import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { Link } from "react-router-dom";


type Photo = { id: number; file: string; caption?: string };
type Property = { id: number; display_name: string; photos?: Photo[] };

const API_BASE = (api.defaults.baseURL || "http://localhost:8000/api").replace(/\/+$/, "");
const BACKEND_BASE = API_BASE.replace(/\/api$/, ""); 

function imageUrl(p: Property): string {
  const file = p.photos?.[0]?.file;          
  return file ? `${BACKEND_BASE}${file}` : "https://placehold.co/600x400?text=No+Image";
}

export default function PropertyBrowse() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => (await api.get("/properties/")).data as Property[],
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Browse Properties</h1>

      {isLoading && <div className="text-gray-600">Loading properties…</div>}
      {error && <div className="text-red-600">Couldn’t load properties.</div>}
      {!isLoading && !error && (data ?? []).length === 0 && (
        <div className="text-gray-600">No properties yet.</div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(data || []).map((p) => (
          <li key={p.id}>
            <Link to={`/properties/${p.id}`} className="block group">
              <div className="relative rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                {/* Image */}
                <img
                  src={imageUrl(p)}
                  alt={p.display_name}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
                {/* Gradient + name overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <h3 className="text-white font-semibold text-lg group-hover:underline">
                    {p.display_name}
                  </h3>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
