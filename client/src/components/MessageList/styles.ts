import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    boxShadow: 'none',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    top: 'auto',
    bottom: 0,
    width: theme.breakpoints.up('md') ? 'calc(100% - 401px)' : '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
  },
  textArea: {
    outline: 0,
    border: 0,
    padding: theme.spacing(1.5),
  },
  toolbar: {
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
