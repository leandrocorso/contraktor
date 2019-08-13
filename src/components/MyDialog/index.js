import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { dialogClose } from '../../redux/dialog/actions';

function MyDialog({
  title, text, closeText, onSubmit, submitText,
}) {
  const dialogReducer = useSelector(state => state.dialog);
  const [dialog, setDialog] = useState({
    open: false,
  });

  useEffect(() => {
    setDialog({ ...dialogReducer });
  }, [dialogReducer]);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(dialogClose());

  return (
    <Dialog open={dialog.open} onClose={handleClose}>
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

      <DialogContent>
        {text && <DialogContentText id="alert-dialog-content">{text}</DialogContentText>}
      </DialogContent>

      <DialogActions>
        {closeText && (
          <Button onClick={handleClose} color="default">
            {closeText}
          </Button>
        )}

        {submitText && onSubmit && (
          <Button onClick={onSubmit} color="primary" autoFocus>
            {submitText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

MyDialog.defaultProps = {
  closeText: 'Cancelar',
  submitText: 'OK',
};

export default MyDialog;
