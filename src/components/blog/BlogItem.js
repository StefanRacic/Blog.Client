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
import BlogContext from '../../context/blog/BlogContext';
import AuthContext from '../../context/auth/AuthContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

const BlogItem = ({ blog }) => {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);

  const { deleteBlog, loadMyBlogs, allBlogs, setCurrent } = blogContext;

  const classes = useStyles();

  const { title, userId, id, text } = blog;

  const onDelete = () => {
    deleteBlog(id);
  };
  const onOpen = () => {
    setCurrent(blog);
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
        <Link to="/blogpage">
          <Button size="small" color="primary" onClick={onOpen}>
            Open
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
export default BlogItem;
