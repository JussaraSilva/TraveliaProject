import { useMemo } from 'react';
import { useTheme } from '@/context/themeProvider';
import { ThemeName } from '@/constants/theme';

export function useThemedStyles<T>(
  createStyles: (theme: ThemeName) => T
) {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme, createStyles]);

  return { theme, styles };
}

