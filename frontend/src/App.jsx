// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';

import Chapter from './components/Chapter';
import Subject from './components/Subject';
import AddSubject from './pages/AddSubject';
import AddChapter from './pages/AddChapter';
import AddVideo from './pages/AddVideo';
import Video from './components/Video';
import Login from './components/Login';
import AddClass from './pages/AddClass';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import OTPAuth from './components/OTPAuth';
import WatchVideo from './pages/WatchVideo';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the main route that uses the Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/chapter/:id" element={<Chapter />} />
          <Route path="/subjects/:id" element={<Subject />} />
          <Route path="/video/:id" element={<Video />} />

          <Route path='/login' element={<Login/>} />
          <Route path='/otp' element={<OTPAuth/>} />
          <Route path='/watch-video/:id' element={<WatchVideo/>} />

          <Route path='/admin/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="admin/add-class" element={<ProtectedRoute><AddClass /></ProtectedRoute>} />
          <Route path="admin/add-subject" element={<ProtectedRoute><AddSubject /></ProtectedRoute>} />
          <Route path="/admin/add-chapter" element={<ProtectedRoute><AddChapter /></ProtectedRoute>} />
          <Route path="/admin/add-video" element={<ProtectedRoute><AddVideo /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
