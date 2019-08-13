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
import { dateToBr, brToDate } from '../../utils';
import { getContract, storeContract, contractClearMessages } from '../../redux/contracts/actions';
import { getAllParts } from '../../redux/parts/actions';
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

function ContractsCreate(props) {
  const dispatch = useDispatch();

  // Call the service to send the selected contract to reducer
  useEffect(() => {
    dispatch(getAllParts());
  }, []);

  // set the variables from reducers
  const contractReducer = useSelector(state => state.contracts.contract);
  const isLoading = useSelector(state => state.contracts.isLoading);
  const contractsError = useSelector(state => state.contracts.error);
  const contractsSuccess = useSelector(state => state.contracts.success);
  const partsReducer = useSelector(state => state.parts.data);
  const partsIsLoading = useSelector(state => state.parts.isLoading);

  // Set state for received data
  const [contract, setContract] = useState({});
  const [parts, setParts] = useState([]);
  const [message, setMessage] = useState({
    messageOpen: false,
  });

  // Form settings

  // Set the form hook
  const [{ values, loading }, initValues, handleChange, handleSubmit] = useForm();

  // Initial values from reducer
  const [initialValues, setInitialValues] = useState();
  useEffect(() => {
    if (contractReducer && Object.keys(contractReducer).length) {
      const partsId = contractReducer.parts.map(item => item.id);
      const contractParts = contractReducer.parts.map(item => ({
        ...item,
        title: `${item.firstname} ${item.lastname}`,
        icon: <Face />,
      }));
      const contractData = {
        ...contractReducer,
        partsId,
        parts: contractParts,
      };

      setContract(contractData);
      setInitialValues(contractData);
      initValues(contractData);
    }
  }, [contractReducer]);

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

  // Parts state
  useEffect(() => {
    if (partsReducer && Object.keys(partsReducer).length) {
      const partsData = partsReducer.map(item => ({
        ...item,
        title: `${item.firstname} ${item.lastname}`,
      }));
      setParts(partsData);
    }
  }, [partsReducer]);

  // updating initial states by form values
  useEffect(() => {
    setInitialValues({
      ...initialValues,
      ...values,
    });
  }, [values]);

  // Upload file change action
  useEffect(() => {
    setInitialValues({
      ...initialValues,
      filename: values.file,
      href: null,
      target: null,
    });
  }, [values.file]);

  // Upload file "button"
  const labelForFile = (
    <label htmlFor="file" className="MuiButtonBase-root MuiButton-root MuiButton-text">
      Adicionar arquivo
    </label>
  );

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
      effectiveDate: brToDate(values.effectiveDate, '00:00:00'),
      expirationDate: brToDate(values.expirationDate, '23:59:59'),
      filename: values.file,
      parts: values.partsId,
    };
    dispatch(storeContract(action));
    setRedirect(true);
  };

  return !Object.keys(parts).length || partsIsLoading ? (
    <MyCircularProgress />
  ) : (
    <div>
      {redirect && <Redirect to="/contratos" />}
      <h1>Adicionar contrato</h1>

      <form onSubmit={handleSubmit(sendData)}>
        <MyGrid container spacing={4} className={classes.container}>
          <MyGrid item xs={12} sm={6} md={6} lg={4}>
            {/* Title */}
            <MyFormGroup className={classes.formGroup}>
              <MyFormControl>
                <MyTextField
                  label="Título"
                  onChange={handleChange}
                  type="text"
                  name="title"
                  minLength="5"
                  maxLength="30"
                  autoComplete="off"
                  value={initialValues.title}
                  required
                />
              </MyFormControl>
            </MyFormGroup>

            {/* Effective date */}
            <MyFormGroup className={classes.formGroup}>
              <MyFormControl>
                <InputMask
                  label="Data de ativação"
                  onChange={handleChange}
                  type="text"
                  name="effectiveDate"
                  autoComplete="off"
                  value={initialValues.effectiveDate}
                  mask="99/99/9999"
                  children={MyTextField}
                  required
                />
              </MyFormControl>
            </MyFormGroup>

            {/* Expiration date */}
            <MyFormGroup className={classes.formGroup}>
              <MyFormControl>
                <InputMask
                  label="Data de vencimento"
                  onChange={handleChange}
                  type="text"
                  name="expirationDate"
                  autoComplete="off"
                  value={initialValues.expirationDate}
                  mask="99/99/9999"
                  children={MyTextField}
                  required
                />
              </MyFormControl>
            </MyFormGroup>

            {/* File upload */}
            <MyFormGroup className={classes.formGroup}>
              <MyFormControl>
                <IndexList
                  items={[
                    {
                      title: initialValues.filename,
                      id: contract.id,
                      icon: <InsertDriveFile />,
                      href: initialValues.href,
                      target: initialValues.target,
                      children: labelForFile,
                    },
                  ]}
                  notFound="Não há arquivo para este contrato"
                />

                <input
                  onChange={handleChange}
                  accept=".pdf,application/pdf"
                  type="file"
                  id="file"
                  name="file"
                  required
                  style={{ display: 'none' }}
                />
              </MyFormControl>
            </MyFormGroup>
          </MyGrid>

          {/* Envolved parts (Relationship) */}

          <MyGrid item xs={12} sm={6} md={4} lg={12}>
            <h3>Partes envolvidas</h3>

            <IndexList
              items={contract.parts}
              notFound="Não há partes envolvidas para este contrato, selecione abaixo"
            />

            <RelationshipList
              name="partsId"
              items={parts}
              selected={initialValues.partsId}
              onChange={handleChange}
            />
          </MyGrid>

          {/* Send form */}
          <MyGrid item xs={12} sm={6} md={4} lg={4}>
            <MyButton type="submit" size="large" color="primary" variant="contained">
              {loading ? 'Enviando...' : 'Salvar contrato'}
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

export default ContractsCreate;
