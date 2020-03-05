import React, { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import UserContext from '../../context/user/UserContext';

const UserItem = ({ user }) => {
  const userContext = useContext(UserContext);
  const { deleteUser } = userContext;
  const { id } = user;
  const onDelete = () => {
    deleteUser(id);
  };
  return (
    <ListItem button>
      <ListItemText primary={user.email} />
      <DeleteIcon onClick={onDelete} />
    </ListItem>
  );
};

export default UserItem;
