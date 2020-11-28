import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    boxShadow: 'none',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    top: 'auto',
    bottom: 0,
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 251px)',
    },
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 401px)',
    },
  },
  buttonAttach: {
    position: 'absolute',
  },
  buttonSend: {
    position: 'absolute',
    right: 0,
  },
  textArea: {
    outline: 0,
    border: 0,
    padding: theme.spacing(1.5),
    paddingLeft: theme.spacing(6),
  },
}));

export default useStyles;
