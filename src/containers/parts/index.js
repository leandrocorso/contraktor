import React, { useState, useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { Face, Add } from '@material-ui/icons';
import MySnackbar from '@material-ui/core/Snackbar';
import { getAllParts, partClearMessages } from '../../redux/parts/actions';
// Material UI
import IndexList from '../../components/IndexList';
import ActionButton from '../../components/ActionButton';

function Parts() {
  const dispatch = useDispatch();
  // Call the service to send all the parts to reducer
  useEffect(() => {
    try {
      dispatch(getAllParts());
    } catch (e) {
      console.error(e);
    }
  }, []);

  // set a variable with parts from reducer
  const parts = useSelector(state => state.parts.data);
  const partsError = useSelector(state => state.parts.error);
  const partsSuccess = useSelector(state => state.parts.success);

  // Messages from reducer
  const [message, setMessage] = useState({
    messageOpen: false,
  });

  useEffect(() => {
    if (partsError || partsSuccess) {
      setMessage({
        type: partsError ? 'error' : 'success',
        text: partsError || partsSuccess,
        open: true,
      });
      setTimeout(() => dispatch(partClearMessages()), 3000);
    } else {
      setMessage({
        type: null,
        text: null,
        open: false,
      });
    }
  }, [partsError, partsSuccess]);

  // format the parts object to fill the list
  const partsList = parts.map((item) => {
    const totalContracts = item.contracts.length;
    let subtitle;
    if (totalContracts === 0) {
      subtitle = 'Nenhum contratos assinado';
    } else if (totalContracts === 1) {
      subtitle = '1 contrato assinado';
    } else {
      subtitle = `${totalContracts} contratos assinados`;
    }

    return {
      ...item,
      title: `${item.firstname} ${item.lastname}`,
      subtitle,
      href: `/partes/${item.id}`,
      icon: <Face />,
      divided: true,
    };
  });

  // Feedback messages

  const handleMessageClose = () => {
    dispatch(partClearMessages());
  };

  return (
    <>
      <h2>Partes</h2>

      <IndexList items={partsList} notFound="Não há partes" />

      <ActionButton title="Cadastrar parte" href="/partes/criar" color="secondary" icon={<Add />} />

      {/* Feedback messages */}

      <MySnackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message.open}
        onClose={handleMessageClose}
        onClick={handleMessageClose}
        message={<span>{message.text}</span>}
      />
    </>
  );
}

export default Parts;
