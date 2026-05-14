import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Hub from './pages/Hub'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CreatePost'
import About from './pages/About'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/DailyChallenges/Day4-ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Hub />} />
        <Route path="posts/:postId" element={<PostDetail />} />
        <Route path="create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
