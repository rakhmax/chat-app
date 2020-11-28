import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    maxWidth: 400,
    boxShadow: 'none',
    top: 'auto',
    bottom: 0,
  },
  drawer: {
    width: 250,
    flexShrink: 0,
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

export default useStyles;
