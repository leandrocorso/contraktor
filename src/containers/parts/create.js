/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { InsertDriveFile, Face, Delete } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import InputMask from 'react-input-mask';
import MySnackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { numeric } from '../../utils';
import {
  getContract,
  storeContract,
  contractClearMessages,
  getAllContracts,
} from '../../redux/contracts/actions';
import { storePart, getAllParts } from '../../redux/parts/actions';
import { dialogOpen, dialogClose } from '../../redux/dialog/actions';
import { DOWNLOAD_URL } from '../../utils/constants';
import useForm from '../../hooks/useForm';
import MyCircularProgress from '../../components/MyCircularProgress';
import MyTextField from '../../components/MyTextField';
import MyGrid from '../../components/MyGrid';
import MyFormControl from '../../components/MyFormControl';
import MyFormGroup from '../../components/MyFormGroup';
import MyButton from '../../components/MyButton';
import RelationshipList from '../../components/RelationshipList';
import IndexList from '../../components/IndexList';
import ActionButton from '../../components/ActionButton';
import MyDialog from '../../components/MyDialog';

function PartsCreate(props) {
  const dispatch = useDispatch();

  // Call the service to send the selected contract to reducer
  useEffect(() => {
    dispatch(getAllContracts());
  }, []);

  // set the variables from reducers
  const partReducer = useSelector(state => state.parts);
  const isLoading = useSelector(state => state.parts.isLoading);
  const partsError = useSelector(state => state.parts.error);
  const partsSuccess = useSelector(state => state.parts.success);
  const contractsReducer = useSelector(state => state.contracts.data);
  const contractsIsLoading = useSelector(state => state.contracts.isLoading);

  // Set state for received data
  const [part, setPart] = useState([]);
  const [contracts, setContracts] = useState({});
  const [message, setMessage] = useState({
    messageOpen: false,
  });

  useEffect(() => {
    setContracts(contractsReducer);
  }, [contractsReducer]);

  // Form settings

  // Set the form hook
  const [{ values, loading }, initValues, handleChange, handleSubmit] = useForm();

  // Initial values empty
  const [initialValues, setInitialValues] = useState();
  useEffect(() => {
    initValues({});
    setInitialValues({});
  }, []);

  useEffect(() => {
    if (partsError || partsSuccess) {
      setMessage({
        type: partsError ? 'error' : 'success',
        text: partsError || partsSuccess,
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
  }, [partsError, partsSuccess]);

  // Styling

  const useStyles = makeStyles(theme => createStyles({
    container: {
      justifyContent: 'space-between',
    },
    formGroup: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }));

  // updating initial states by form values
  useEffect(() => {
    setInitialValues({
      ...initialValues,
      ...values,
    });
  }, [values]);

  // Feedback messages
  const [redirect, setRedirect] = useState(false);

  const handleMessageClose = () => {
    if (message.type === 'success') {
      dispatch(contractClearMessages());
      setRedirect(true);
    } else {
      dispatch(contractClearMessages());
    }
  };

  // Styling

  const classes = useStyles();

  // Send the form data
  const sendData = () => {
    const action = {
      ...values,
      phone: numeric(values.phone),
      document: numeric(values.document),
      contracts: values.contractsId,
    };
    dispatch(storePart(action));
    setRedirect(true);
  };

  return !Object.keys(contracts).length || contractsIsLoading ? (
    <MyCircularProgress />
  ) : (
    <div>
      {redirect && <Redirect to="/partes" />}
      <h1>Adicionar Parte</h1>

      <form onSubmit={handleSubmit(sendData)}>
        <MyGrid container spacing={4} className={classes.container}>
          <MyGrid item xs={12} sm={6} md={6} lg={4}>
            {/* First name */}
            <MyFormGroup className={classes.formGroup}>
              <MyFormControl>
                <MyTextField
                  label="Nome"
                  onChange={handleChange}
                  type="text"
                  name="firstname"
                  maxLength="30"
                  autoComplete="off"
                  value={initialValues.firstname}
                  required
                />
              </MyFormControl>
            </MyFormGroup>

            {/* Last name */}
            <MyFormGroup className={classes.formGroup}>
              <MyFormControl>
                <MyTextField
                  label="Sobrenome"
                  onChange={handleChange}
                  type="text"
                  name="lastname"
                  maxLength="30"
                  autoComplete="off"
                  value={initialValues.lastname}
                  required
                />
              </MyFormControl>
            </MyFormGroup>

            {/* Last name */}
            <MyFormGroup className={classes.formGroup}>
              <MyFormControl>
                <MyTextField
                  label="E-mail"
                  onChange={handleChange}
                  type="email"
                  name="email"
                  maxLength="100"
                  autoComplete="off"
                  value={initialValues.email}
                  required
                />
              </MyFormControl>
            </MyFormGroup>

            {/* Phone */}
            <MyFormGroup className={classes.formGroup}>
              <MyFormControl>
                <InputMask
                  label="Telefone"
                  onChange={handleChange}
                  type="text"
                  name="phone"
                  autoComplete="off"
                  value={initialValues.phone}
                  mask="(99) 99999-9999"
                  children={MyTextField}
                  required
                />
              </MyFormControl>
            </MyFormGroup>

            {/* Document */}
            <MyFormGroup className={classes.formGroup}>
              <MyFormControl>
                <InputMask
                  label="CPF"
                  onChange={handleChange}
                  type="text"
                  name="document"
                  autoComplete="off"
                  value={initialValues.document}
                  mask="999.999.999-99"
                  children={MyTextField}
                  required
                />
              </MyFormControl>
            </MyFormGroup>
          </MyGrid>

          {/* Assigned contracts (Relationship) */}

          <MyGrid item xs={12} sm={6} md={4} lg={12}>
            <h3>Contratos assinados</h3>

            <IndexList
              items={part.contracts}
              notFound="Não há contratos assinados para esta parte, selecione abaixo"
            />

            <RelationshipList
              name="contractsId"
              items={contracts}
              selected={initialValues.contractsId}
              onChange={handleChange}
            />
          </MyGrid>

          {/* Send form */}
          <MyGrid item xs={12} sm={6} md={4} lg={4}>
            <MyButton type="submit" size="large" color="primary" variant="contained">
              {loading ? 'Enviando...' : 'Salvar parte'}
            </MyButton>
          </MyGrid>
        </MyGrid>
      </form>

      {/* Feedback messages */}

      <MySnackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message.open}
        onClose={handleMessageClose}
        onClick={handleMessageClose}
        message={<span>{message.text}</span>}
      />
    </div>
  );
}

export default PartsCreate;
