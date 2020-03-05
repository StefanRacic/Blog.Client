import React, { useContext } from 'react'
import AuthContext from "../context/auth/AuthContext";
import BlogContext from '../context/blog/BlogContext';
import BlogItem from "../components/blog/BlogItem"
import Grid from '@material-ui/core/Container';
import Container from '@material-ui/core/Container';
import Blog from "../components/blog/Blogs";

const Blogs = () => {
    return (
        <div>
            <Blog />
        </div>
    )
}

export default Blogs