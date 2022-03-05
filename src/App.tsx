import './App.scss';
import { Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList/UserList';
import UserPage from './pages/UserPage/UserPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
}

export default App;
