// frontend/src/features/public/CalendarPublic.tsx
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { useEffect, useRef } from 'react'

import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function CalendarPublic() {
  const { data } = useQuery({
    queryKey: ['eventsPublic'],
    queryFn: async () => (await api.get('/events/?is_public=true')).data,
  })

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const calendar = new Calendar(ref.current, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      events: (data || []).map((e: any) => ({
        id: String(e.id),
        title: e.title,
        start: e.start,
        end: e.end,
      })),
      eventClick(info) {
        alert(info.event.title)
      },
    })

    calendar.render()
    return () => calendar.destroy()
  }, [data])

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Public Calendar</h1>
      <div ref={ref} />
    </div>
  )
}

