import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import MyList from '../MyList';
import MyListItem from '../MyListItem';
import MyListItemAvatar from '../MyListItemAvatar';
import MyListItemText from '../MyListItemText';
import MyAvatar from '../MyAvatar';
import MyIcon from '../MyIcon';
import MyTypography from '../MyTypography';
import MyRouterLink from '../MyRouterLink';
import MyLink from '../MyLink';

// Aligning and styling the link contents
const useStyles = makeStyles(theme => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
}));

const itemContents = (props) => {
  const { icon, title, subtitle } = props;
  return (
    <>
      {icon && (
        <MyListItemAvatar>
          <MyAvatar>
            <MyIcon>{icon}</MyIcon>
          </MyAvatar>
        </MyListItemAvatar>
      )}
      <MyListItemText primary={title} secondary={subtitle} />
    </>
  );
};

function IndexList(props) {
  const { items, notFound } = props;

  // Styles
  const classes = useStyles();
  if (items && items.length) {
    return (
      <MyList>
        {items.map(item => (
          <MyListItem key={item.id}>
            {/* A internal link */}
            {item.href && !item.target && (
              <MyRouterLink className={classes.link} to={item.href}>
                {itemContents(item)}
              </MyRouterLink>
            )}
            {/* A external link */}
            {item.href && item.target && (
              <MyLink className={classes.link} href={item.href} target={item.target}>
                {itemContents(item)}
              </MyLink>
            )}
            {/* Text only */}
            {!item.href && itemContents(item)}
            {item.children || null}
          </MyListItem>
        ))}
      </MyList>
    );
  }
  return notFound ? <MyTypography>{notFound}</MyTypography> : '';
}

IndexList.propTypes = {
  items: PropTypes.array,
  notFound: PropTypes.string,
};

export default IndexList;
