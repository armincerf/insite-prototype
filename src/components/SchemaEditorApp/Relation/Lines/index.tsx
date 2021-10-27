import { Colors } from '../../Colors';
import { Draw } from './Draw';
import { ParserField } from 'graphql-zeus';
import React from 'react';
import { style } from 'typestyle';
import { isScalarArgument } from '../../GraphQL/Resolve';
import { useTheme } from '../../state/containers';
import { darken, toHex } from 'color2k';

const RelationsContainer = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  stroke: toHex(darken(Colors.main, 0.6)),
  fill: 'transparent',
  strokeWidth: 2,
  margin: -20,
});

export interface RelationPath {
  htmlNode: HTMLDivElement;
  field: ParserField;
}
interface LinesProps {
  relations: { to: RelationPath; from: RelationPath[] }[] | undefined;
  selectedNode?: ParserField;
}

export const Lines: React.FC<LinesProps> = ({ relations, selectedNode }) => {
  const { theme } = useTheme();
  return (
    <svg className={RelationsContainer}>
      {relations?.map((r, index) => {
        const usedToIndexes: number[] = [];
        return r.from?.map((rf, i) => {
          const fromField = selectedNode?.name === rf.field.name;
          const toField = r.to.field.name === selectedNode?.name;
          let portNumber = i;
          if (fromField) {
            portNumber =
              r.to.field.args
                ?.filter((a) => !isScalarArgument(a))
                .findIndex(
                  (fa, argIndex) =>
                    fa.type.name === rf.field.name &&
                    !usedToIndexes.includes(argIndex),
                ) || 0;
            portNumber = portNumber === -1 ? 0 : portNumber;
            usedToIndexes.push(portNumber);
          }
          return (
            <Draw
              active={fromField || toField}
              inverse={fromField}
              color={(theme.colors.colors as any)[rf.field.type.name]}
              inActiveColor={
                (theme.colors.backgrounds as any)[rf.field.type.name]
              }
              key={`${index}-${i}-${rf.field.name}`}
              from={rf.htmlNode}
              to={r.to.htmlNode}
              PortNumber={portNumber}
              maxIndex={r.from.length}
            />
          );
        });
      })}
    </svg>
  );
};
