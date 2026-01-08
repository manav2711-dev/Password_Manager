import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import Theme from './theme';

const PaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Theme.colors.primary,
    background: Theme.colors.surface,
    surface: Theme.colors.surface,
    text: Theme.colors.text,
    error: Theme.colors.error,
    onSurface: Theme.colors.text,
    activeOutlineColor: Theme.colors.primary,
  },
  roundness: Theme.borders.radius.md,
};

export default PaperTheme;
