import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import { useState } from 'react'

function App() {
  const { movies } = useMovies()
  const [query, setQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} placeholder="Avengers, Star Wars, The Matrix..." />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />     
      </main>
    </div>
  )
}

export default App
