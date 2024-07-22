import {
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
  type StyleProp,
} from 'react-native';
import type { ErrorType, TransactionData } from './blinks';

export interface BlinkStyles {
  container?: ViewStyle;
  image?: ImageStyle;
  title?: TextStyle;
  description?: TextStyle;
  button?: ViewStyle;
  buttonText?: TextStyle;
  input?: StyleProp<TextStyle>;
  link?: StyleProp<TextStyle>;
}

export interface BlinkProps {
  url: string;
  account: string;
  onTransaction: (result: TransactionData | ErrorType) => void;
  styles: BlinkStyles;
}
