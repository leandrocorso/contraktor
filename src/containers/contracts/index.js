import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InsertDriveFile, Add } from '@material-ui/icons';
import MySnackbar from '@material-ui/core/Snackbar';
import { getAllContracts, contractClearMessages } from '../../redux/contracts/actions';
import IndexList from '../../components/IndexList';
import ActionButton from '../../components/ActionButton';
import { objectSize } from '../../utils';
import MyLoading from '../../components/MyCircularProgress';

function Contracts() {
  const dispatch = useDispatch();
  // Call the service to send all the contracts to reducer
  const handleContracts = () => {
    try {
      dispatch(getAllContracts());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleContracts();
  }, []);

  // set a variable with contracts from reducer
  const contracts = useSelector(state => state.contracts.data);
  const isLoading = useSelector(state => state.contracts.isLoading);
  const contractsError = useSelector(state => state.contracts.error);
  const contractsSuccess = useSelector(state => state.contracts.success);

  // Messages from reducer
  const [message, setMessage] = useState({
    messageOpen: false,
  });

  useEffect(() => {
    if (contractsError || contractsSuccess) {
      setMessage({
        type: contractsError ? 'error' : 'success',
        text: contractsError || contractsSuccess,
        open: true,
      });
      setTimeout(() => dispatch(contractClearMessages()), 3000);
    } else {
      setMessage({
        type: null,
        text: null,
        open: false,
      });
    }
  }, [contractsError, contractsSuccess]);

  // format the contracts object to fill the list
  const contractsList = contracts.map((item) => {
    const totalParts = item.parts.length;
    let subtitle;
    if (totalParts === 0) {
      subtitle = 'Sem partes envolvidas';
    } else if (totalParts === 1) {
      subtitle = '1 parte envolvida';
    } else {
      subtitle = `${totalParts} partes envolvidas`;
    }
    return {
      ...item,
      subtitle,
      href: `/contratos/${item.id}`,
      icon: <InsertDriveFile />,
    };
  });

  // Feedback messages

  const handleMessageClose = () => {
    dispatch(contractClearMessages());
  };

  return isLoading || objectSize(contracts) === 0 ? (
    <MyLoading />
  ) : (
    <>
      <h2>Contratos</h2>

      <IndexList items={contractsList} notFound="Não há contratos" />

      <ActionButton
        title="Cadastrar contrato"
        href="/contratos/criar"
        color="secondary"
        icon={<Add />}
      />

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

export default Contracts;
