import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  message: {
    minWidth: 150,
    maxWidth: '70%',
    padding: theme.spacing(1.5),
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  mine: {
    alignSelf: 'flex-end',
    backgroundColor: '#bbdefb',
  },
  image: {
    width: '100%',
  },
}));

export default useStyles;
