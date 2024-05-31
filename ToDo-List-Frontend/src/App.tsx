import { useEffect, useState } from 'react'
import './App.css'
import { api } from './api/api'
import { endpointsUrls } from './api/endpoints'
import { Home } from './pages/Home'
import { AppTemplate } from './components/AppTemplate'

function App() {

  useEffect(() => {
    api.get(endpointsUrls.Task.getById(2)).then(data => console.log(data));
  }, [])

  return (
    <AppTemplate>
      <Home />
    </AppTemplate>
  )
}

export default App
