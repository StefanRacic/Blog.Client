import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextTruncate from 'react-text-truncate'; // recommend
import BlogContext from '../../context/blog/BlogContext';
import AuthContext from '../../context/auth/AuthContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

const MyBlogItem = ({ blog }) => {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);

  const { deleteBlog, loadMyBlogs, allBlogs } = blogContext;

  const classes = useStyles();

  const { title, userId, id, text } = blog;

  const onDelete = () => {
    deleteBlog(id);
  };

  const myBlog = (
    <Fragment>
      <Button size="small" color="primary">
        Open
      </Button>
      <Button size="small" color="primary">
        Update
      </Button>
      <Button size="small" color="primary" onClick={onDelete}>
        Delete
      </Button>
    </Fragment>
  );

  const notMyBlog = (
    <Button size="small" color="primary">
      Open
    </Button>
  );
  if (allBlogs !== null && allBlogs.length === 0) {
    return (
      <div className="center-text">
        <Link to="/addblog">
          <Button variant="contained" color="primary">
            Add Blog
          </Button>
        </Link>
        <h1>No Blogs to show</h1>
      </div>
    );
  }

  return (
    <Card className={classes.root} className="blog-item">
      <CardActionArea>
        {/* <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom component="p">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {authContext.userId == userId ? myBlog : notMyBlog}
      </CardActions>
    </Card>
  );
};
export default MyBlogItem;
