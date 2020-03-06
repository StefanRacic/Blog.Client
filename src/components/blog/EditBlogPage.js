import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BlogContext from '../../context/blog/BlogContext';
import AuthContext from '../../context/auth/AuthContext';

const EditBlogPage = props => {
    const blogContext = useContext(BlogContext);
    const authContext = useContext(AuthContext);
    const { current, clearCurrent, updateBlog } = blogContext;
    const { userId } = authContext;

    const [blog, setBlog] = useState({
        id: current.id,
        title: '',
        text: '',
        userId: authContext.userId
    });

    const { title, text } = blog;

    const onChange = e => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (current !== null) {
            setBlog(current);
        }
    }, [])

    const onSubmit = e => {
        e.preventDefault();
        updateBlog(blog);
        clearCurrent();
        props.history.push('/myblogs');
    };

    return (
        <div className="blog-form">
            <CssBaseline />
            <Container fixed>
                <form autoComplete="off" onSubmit={onSubmit}>
                    <TextField
                        id="outlined-basic"
                        label="Blog Title"
                        name="title"
                        value={title}
                        variant="outlined"
                        required
                        onChange={onChange}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        name="text"
                        label="Blog Text"
                        value={text}
                        multiline
                        rows="4"
                        variant="outlined"
                        required
                        onChange={onChange}

                    />
                    <div className="update-btn-group">
                        <Button id="update-btn" style={{ marginRight: "25px" }} type="submit" variant="contained" color="primary">
                            Update Blog
          </Button>
                        <Link to="/myblogs">
                            <Button id="update-btn" type="submit" variant="contained" color="primary">
                                Cancel
          </Button>
                        </Link>
                    </div>
                </form>
            </Container>
        </div>
    );
};

export default EditBlogPage;
