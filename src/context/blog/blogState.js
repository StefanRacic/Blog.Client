import React, { useReducer } from 'react'
import axios from "axios"
import blogReducer from "../blog/blogReducer";
import BlogContext from "../blog/BlogContext"
import {
    ADD_BLOG,
    DELETE_BLOG,
    BLOG_ERROR,
    GET_ALL_BLOGS,
    GET_MY_BLOGS,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_BLOG
} from "../types"

const BlogState = props => {
    const initialState = {
        allBlogs: null,
        myBlogs: null,
        current: null,
        error: null
    }

    const [state, dispatch] = useReducer(blogReducer, initialState);

    // Load All Blogs
    const loadAllBlogs = async () => {
        const config = {
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        };

        try {
            const res = await axios.get("http://localhost:5000/api/blogitems", config);

            dispatch({
                type: GET_ALL_BLOGS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: BLOG_ERROR,
                payload: error
            });
        }
    }

    // Update Blog
    const updateBlog = async (blog) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + localStorage.getItem("token")
            }
        };
        try {
            const res = await axios.put(`http://localhost:5000/api/blogitems/${blog.id}`, blog, config);
            dispatch({
                type: UPDATE_BLOG,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: BLOG_ERROR,
                payload: error
            })
        }
    }

    // Set Current Blog
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear Current Blog
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };


    // Load my Blogs
    const loadMyBlogs = async () => {
        const config = {
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        };
        try {
            const res = await axios.get("http://localhost:5000/api/blogitems/myblogs", config);
            dispatch({
                type: GET_MY_BLOGS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: BLOG_ERROR,
                payload: error
            });
        }
    }

    // Add Blog
    const addBlog = async (blog) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "bearer " + localStorage.getItem("token")
            }
        };
        try {
            const res = await axios.post("http://localhost:5000/api/blogitems", blog, config);
            loadMyBlogs();
            dispatch({
                type: ADD_BLOG,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: BLOG_ERROR,
                payload: error
            })
        }
    }

    // Delete Blog
    const deleteBlog = async (id) => {
        const config = {
            headers: {
                Authorization: "bearer " + localStorage.getItem("token")
            }
        };
        try {
            const res = await axios.delete(`http://localhost:5000/api/blogitems/${id}`, config);
            loadMyBlogs();
            dispatch({
                type: DELETE_BLOG,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: BLOG_ERROR,
                payload: error
            })
        }
    }




    return (
        <BlogContext.Provider value={{
            allBlogs: state.allBlogs,
            myBlogs: state.myBlogs,
            current: state.current,
            loadAllBlogs,
            loadMyBlogs,
            addBlog,
            deleteBlog,
            setCurrent,
            clearCurrent,
            updateBlog
        }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState
