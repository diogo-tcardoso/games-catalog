import Home from './pages/home/home'
import Systems from './pages/systems/systems'
import Genres from './pages/genres/genres'
import Types from './pages/game-types'
import Series from './pages/series/series'
import Stats from './pages/stats/stats'
import { GlobalStyles } from './styles/global-styles/global-styles'
import { Routes, Route } from 'react-router'

function App() {
    return (
        <>
        <GlobalStyles />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/systems" element={<Systems />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/types" element={<Types />} />
            <Route path="/series" element={<Series />} />
            <Route path="/stats" element={<Stats />} />
        </Routes>
        </>
    )
}

export default App
