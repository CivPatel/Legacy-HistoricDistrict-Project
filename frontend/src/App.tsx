/**
 * APP — the frame around every page.
 * Adds header/nav/footer and declares top-level routes.
 */

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './features/public/Home'
import PropertyBrowse from './features/public/PropertyBrowse'
import PropertyDetail from './features/public/PropertyDetail'
import CalendarPublic from './features/public/CalendarPublic'
import WalkingTour from './features/public/WalkingTour'
import Dashboard from './features/admin/Dashboard'
import PropertyEditor from './features/admin/PropertyEditor'
import PeopleSearch from './features/admin/PeopleSearch'
import DocumentScanner from './features/admin/DocumentScanner'
import CalendarAdmin from './features/admin/CalendarAdmin'
import ApplicationWizard from './features/admin/ApplicationWizard'
import SearchConsole from './features/admin/SearchConsole'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import AccessDenied from './pages/AccessDenied'

function TopNav(){
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex gap-4">
        <Link to="/" className="font-semibold">Historic Hammond</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/tour">Walking Tour</Link>
        <span className="ml-auto flex gap-3">
          <Link to="/admin">Admin</Link>
          <Link to="/login">Login</Link>
        </span>
      </div>
    </nav>
  )
}

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav/>
      <main className="max-w-6xl mx-auto px-4 py-6 flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/properties" element={<PropertyBrowse/>}/>
          <Route path="/properties/:id" element={<PropertyDetail/>}/>
          <Route path="/calendar" element={<CalendarPublic/>}/>
          <Route path="/tour" element={<WalkingTour/>}/>
          <Route path="/login" element={<Login/>}/>

          <Route path="/admin" element={<Dashboard/>}/>
          <Route path="/admin/properties/new" element={<PropertyEditor/>}/>
          <Route path="/admin/properties/:id" element={<PropertyEditor/>}/>
          <Route path="/admin/people" element={<PeopleSearch/>}/>
          <Route path="/admin/scanner" element={<DocumentScanner/>}/>
          <Route path="/admin/calendar" element={<CalendarAdmin/>}/>
          <Route path="/admin/applications/new" element={<ApplicationWizard/>}/>
          <Route path="/admin/search" element={<SearchConsole/>}/>

          <Route path="*" element={<NotFound/>}/>
          <Route path="/403" element={<AccessDenied/>}/>
        </Routes>
      </main>
    </div>
  )
}
