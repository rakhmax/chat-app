import React, {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useContext,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  InputAdornment,
  IconButton,
  TextField,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import { Autorenew } from '@material-ui/icons';

import { ButtonLoading } from '../components';
import AppContext from '../context';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  button: {
    margin: theme.spacing(1),
  },
  form: {
    '& .MuiFormControl-root': {
      marginBottom: theme.spacing(1),
      width: '100%',
    },
  },
}));

const minNicknameLen = 5;

const LoginPage: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);

  const generateNickname = () => {
    setNickname(`U_${Math.random().toString(36).substr(2, 5)}`);
    setError('');
  };

  const handleLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      sessionStorage.setItem('user', JSON.stringify({ name: nickname }));
      user.set({ name: nickname });
      history.push('/messages');
      setLoading(false);
    }, 2500);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length > 0 && value.length < minNicknameLen) setError(`Длина должна быть не меньше ${minNicknameLen} символов`);
    else setError('');

    setNickname(value);
  };

  return (
    <div className={classes.root}>
      <form
        noValidate
        autoComplete="off"
        className={classes.form}
        onSubmit={handleLogin}
      >
        <TextField
          variant="outlined"
          label="Никнейм"
          error={!!error}
          value={nickname}
          disabled={loading}
          helperText={error}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="generate nickname"
                  edge="end"
                  disabled={loading}
                  onClick={generateNickname}
                >
                  <Autorenew />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ButtonLoading
          fullWidth
          color="primary"
          variant="outlined"
          type="submit"
          loading={loading}
          disabled={!nickname || !!error || loading}
          circularProgress={{ size: 24, color: 'primary' }}
        >
          Войти
        </ButtonLoading>
      </form>
    </div>
  );
};

export default LoginPage;
