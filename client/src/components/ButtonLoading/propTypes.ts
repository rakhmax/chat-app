import { ButtonProps } from '@material-ui/core/Button';
import { CircularProgressProps } from '@material-ui/core/CircularProgress';

export default interface IButtonProgressProps extends ButtonProps {
  loading: boolean,
  circularProgress?: CircularProgressProps
}
