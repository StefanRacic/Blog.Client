import React, { useContext, useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BlogContext from '../../context/blog/BlogContext';
import AuthContext from '../../context/auth/AuthContext';

const BlogForm = props => {
  const blogContext = useContext(BlogContext);
  const authContext = useContext(AuthContext);
  const { addBlog } = blogContext;
  const { userId } = authContext;

  const [blog, setBlog] = useState({
    title: '',
    text: '',
    userId: authContext.userId
  });

  const { title, text } = blog;

  const onChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addBlog(blog);
    setBlog({
      title: '',
      text: ''
    });
    props.history.push('/myblogs');
  };

  return (
    <div className="blog-form">
      <CssBaseline />
      <Container fixed>
        <form autoComplete="off" onSubmit={onSubmit}>
          <TextField
            id="outlined-basic"
            name="title"
            label="Blog Title"
            value={title}
            variant="outlined"
            required
            onChange={onChange}
          />
          <TextField
            id="outlined-multiline-static"
            label="Blog Text"
            name="text"
            value={text}
            multiline
            rows="4"
            variant="outlined"
            required
            onChange={onChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Blog
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default BlogForm;
