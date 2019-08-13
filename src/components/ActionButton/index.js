import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import MyTooltip from '../MyTooltip';
import MyFab from '../MyFab';

function ActionButton(props) {
  const {
    title, color, href, onClick, icon, vAlign, align, tooltipPlacement,
  } = props;

  const btnOpen = React.forwardRef((innerProps, ref) => (
    <Link innerRef={ref} to={href} {...innerProps} />
  ));

  const useStyles = makeStyles(theme => ({
    fab: {
      position: 'fixed',
      [vAlign]: theme.spacing(2),
      [align]: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <MyTooltip title={title} placement={tooltipPlacement}>
      <div className={classes.fab}>
        {href && (
          <MyFab color={color} to={href} component={btnOpen}>
            {icon}
          </MyFab>
        )}
        {onClick && (
          <MyFab color={color} onClick={onClick}>
            {icon}
          </MyFab>
        )}
      </div>
    </MyTooltip>
  );
}

ActionButton.defaultProps = {
  color: 'primary',
  tooltipPlacement: 'top',
  vAlign: 'bottom',
  align: 'right',
};

ActionButton.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
  icon: PropTypes.node.isRequired,
  tooltipPlacement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  vAlign: PropTypes.oneOf(['top', 'bottom']),
  align: PropTypes.oneOf(['left', 'right']),
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default ActionButton;
