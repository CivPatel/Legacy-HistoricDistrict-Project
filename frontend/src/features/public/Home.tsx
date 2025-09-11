import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { Search, Building2, CalendarDays, Map as MapIcon, ChevronRight } from "lucide-react";
import { Card, CardBody, Button } from "../../components/ui";

type Address = { id: number; line1: string; city: string; state: string };
type Property = { id: number; display_name: string; description?: string; addresses?: Address[]; };
type Event = { id: number; title: string; start: string; is_public?: boolean; property?: number; };

function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => { const t = setTimeout(() => setV(value), delay); return () => clearTimeout(t); }, [value, delay]);
  return v;
}
const dt = (iso?: string) => (iso ? new Date(iso).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "");

async function fetchProperties(): Promise<Property[]> { return (await api.get("/properties/")).data; }
async function fetchSearch(q: string): Promise<{ properties: Property[] }> { return (await api.get("/search", { params: { q } })).data; }
async function fetchEvents(): Promise<Event[]> { return (await api.get("/events/")).data; }

function PropertyCard({ p }: { p: any }) {
  const photoUrl = p.photos?.[0]?.file
    ? `http://localhost:8000${p.photos[0].file}` 
    : "https://placehold.co/400x250?text=No+Image";

  return (
    <Link to={`/properties/${p.id}`} className="block group">
      <div className="relative rounded-xl overflow-hidden shadow hover:shadow-lg transition">
        {/* Image */}
        <img
          src={photoUrl}
          alt={p.display_name}
          className="h-48 w-full object-cover"
        />
        {/* Overlay name */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white font-semibold text-lg">
            {p.display_name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

function EventItem({ e }: { e: Event }) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-sky-100 text-sky-700"><CalendarDays size={18} /></div>
          <div className="min-w-0">
            <div className="font-medium">{e.title}</div>
            <div className="text-sm text-gray-600">{dt(e.start)}</div>
            {e.property ? <Link to={`/properties/${e.property}`} className="text-sm text-blue-700 underline mt-1 inline-block">View property</Link> : null}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default function Home() {
  const [q, setQ] = useState("");
  const debouncedQ = useDebounced(q, 350);

  const { data: allProps, isLoading: loadingProps } = useQuery({ queryKey: ["properties"], queryFn: fetchProperties });
  const { data: searchData, isFetching: searching } = useQuery({
    queryKey: ["search", debouncedQ],
    queryFn: () => fetchSearch(debouncedQ),
    enabled: debouncedQ.trim().length >= 2,
  });
  const { data: events, isLoading: loadingEvents } = useQuery({ queryKey: ["events"], queryFn: fetchEvents });

  const featured = useMemo(() => (allProps || []).slice(0, 6), [allProps]);
  const results = searchData?.properties || [];
  const upcoming = useMemo(() => {
    const now = new Date();
    return (events || [])
      .filter(e => (e.is_public ?? true) && new Date(e.start) >= now)
      .sort((a, b) => +new Date(a.start) - +new Date(b.start))
      .slice(0, 6);
  }, [events]);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-100 to-rose-100 border rounded-3xl p-6 md:p-10">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Explore Historic Properties</h1>
          <p className="text-gray-700 mt-2 md:mt-3">Search by address, browse photos, and keep up with public hearings and events.</p>

          <div className="mt-4 md:mt-6 flex gap-2 items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search properties by address or name…"
                className="w-full rounded-xl border pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <Link to="/properties">
              <Button><Building2 size={16}/> Browse all</Button>
            </Link>
          </div>

          {q.trim().length >= 2 && (
            <div className="mt-3 bg-white border rounded-2xl p-3 shadow-sm">
              {searching ? (
                <div className="text-sm text-gray-600">Searching…</div>
              ) : results.length === 0 ? (
                <div className="text-sm text-gray-600">No matches for “{q}”.</div>
              ) : (
                <ul className="grid md:grid-cols-2 gap-2">
                  {results.slice(0, 6).map((p) => <li key={p.id}><PropertyCard p={p}/></li>)}
                </ul>
              )}
              <div className="mt-2 text-xs text-gray-500">Tip: type at least 2 characters to search.</div>
            </div>
          )}
        </div>
      </div>

      {/* Featured */}
      <Card>
        <CardBody>
          <div className="flex items-center mb-3">
            <h2 className="text-lg md:text-xl font-semibold">Featured Properties</h2>
            <Link to="/properties" className="ml-auto text-sm underline">See all</Link>
          </div>
          {loadingProps ? (
            <div className="text-gray-600">Loading properties…</div>
          ) : featured.length === 0 ? (
            <div className="text-gray-600">No properties yet.</div>
          ) : (
            <ul className="grid md:grid-cols-3 gap-3">{featured.map((p) => <li key={p.id}><PropertyCard p={p} /></li>)}</ul>
          )}
        </CardBody>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardBody>
          <div className="flex items-center mb-3">
            <h2 className="text-lg md:text-xl font-semibold">Upcoming Events</h2>
            <Link to="/calendar" className="ml-auto text-sm underline"><CalendarDays className="inline mr-1" size={16}/> Full calendar</Link>
          </div>
          {loadingEvents ? (
            <div className="text-gray-600">Loading events…</div>
          ) : upcoming.length === 0 ? (
            <div className="text-gray-600">No upcoming public events.</div>
          ) : (
            <ul className="grid md:grid-cols-3 gap-3">{upcoming.map((e) => <li key={e.id}><EventItem e={e}/></li>)}</ul>
          )}
        </CardBody>
      </Card>

      {/* Quick links */}
      <div className="grid md:grid-cols-3 gap-3">
        <Link to="/tour" className="bg-white border rounded-2xl p-4 hover:shadow transition">
          <div className="font-semibold flex items-center gap-2"><MapIcon size={16}/> Walking Tour</div>
          <p className="text-sm text-gray-600 mt-1">Interactive map with stops and stories.</p>
        </Link>
        <Link to="/properties" className="bg-white border rounded-2xl p-4 hover:shadow transition">
          <div className="font-semibold flex items-center gap-2"><Building2 size={16}/> Browse Properties</div>
          <p className="text-sm text-gray-600 mt-1">Filter and explore photos quickly.</p>
        </Link>
        <Link to="/calendar" className="bg-white border rounded-2xl p-4 hover:shadow transition">
          <div className="font-semibold flex items-center gap-2"><CalendarDays size={16}/> Public Calendar</div>
          <p className="text-sm text-gray-600 mt-1">Hearings and public events.</p>
        </Link>
      </div>
    </div>
  );
}
