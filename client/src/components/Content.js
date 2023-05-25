import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Blog from '../pages/Blog';
import DetailPost from '../pages/DetailPost';

import PostList from '../actions/PostList';
import AddPost from '../actions/AddPost';
import EditPost from '../actions/EditPost';

import CategoriesList from '../actions/CategoryList';
import AddCategory from '../actions/AddCategory'
import EditCategory from '../actions/EditCategory'

import Register from './Register'
import Login from './Login'
import Profile from './Profile'
import Logout from './Logout'


export default function Content() {
  return (
    <main className="flex-shrink-0">
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                {/*exact - точное совпадение маршрута и ссылки */}
                <Route exact path="/blog" element={<Blog/>} />
                <Route path="/detailpost/:id" element={<DetailPost />} />

                <Route exact path="/postlist/" element={<PostList />} />
                <Route path="/addpost" element={<AddPost />} />
                <Route path="/editpost/:id" element={<EditPost />} />

                <Route exact path="/categorylist" element={<CategoriesList />} />
                <Route path="/addcategory" element={<AddCategory />} />
                <Route path="/editcategory/:id" element={<EditCategory />} />

                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/logout" element={<Logout />} />
            </Routes>
        </Router>
    </main>
  )
}
