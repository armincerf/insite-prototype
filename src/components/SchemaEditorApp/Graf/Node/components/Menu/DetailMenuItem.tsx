import React from 'react';
import { style } from 'typestyle';
import { themed } from '../../../../Theming/utils';
import { useTheme } from '../../../../state/containers';

interface MenuItemProps {
  onClick: () => void;
}

const Main = themed(
  ({
    colors: {
      graf: {
        node: {
          menu: {
            item: { color, hover },
          },
        },
      },
    },
  }) =>
    style({
      display: 'flex',
      padding: `6px 12px`,
      fontSize: 14,
      cursor: 'pointer',
      scrollSnapAlign: 'end',
      $nest: {
        '.MenuItemText': {
          transition: 'color .25s ease-in-out',
          color,
          width: '100%',
          $nest: {
            '&:hover': {
              color: hover,
            },
          },
        },
      },
    }),
);

export const DetailMenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
}) => {
  const { theme } = useTheme();
  return (
    <div className={Main(theme)} onClick={onClick}>
      <span className={`MenuItemText`}>{children}</span>
    </div>
  );
};
