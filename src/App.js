import './App.css';
import Header from './components/Header';
import BlogList from './screens/BlogList';
import { Routes, Route } from 'react-router-dom';
import SinglePost from './screens/SinglePost';

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<BlogList />}/>
      <Route path="/post/:postId" element={<SinglePost />} />
    </Routes>
    </>
  );
}

export default App;
