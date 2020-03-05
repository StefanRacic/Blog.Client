import React, { useContext, useEffect, Fragment } from 'react'
import BlogItem from './BlogItem'
import AuthContext from "../../context/auth/AuthContext";
import BlogContext from "../../context/blog/BlogContext"
import CircularProgress from '@material-ui/core/CircularProgress';

const Blogs = () => {
    const authContext = useContext(AuthContext);
    const blogContext = useContext(BlogContext);

    const { loadUser } = authContext
    const { loadAllBlogs, allBlogs } = blogContext

    useEffect(() => {
        loadAllBlogs();
        // eslint-disable-next-line
    }, [])

    if (allBlogs !== null && allBlogs.length === 0) {
        return (
            <div className="center-text">
                <h1>No Blogs to show</h1>
            </div>
        )
    }
    return (
        <Fragment>
            {allBlogs !== null ? (<div className="blogs">
                {allBlogs.map(blog => (
                    <BlogItem blog={blog} key={blog.id} />
                ))}
            </div>
            ) : (
                    <div className="center-text">
                        <CircularProgress />
                    </div>
                )}
        </Fragment>
    )
}

export default Blogs
