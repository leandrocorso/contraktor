import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// My Material UI
import MyLink from '../MyLink';

const Link = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/getting-started/installation/" {...props} />
));

function MyRouterLink(props) {
  return <MyLink component={Link} {...props} />;
}

export default MyRouterLink;
