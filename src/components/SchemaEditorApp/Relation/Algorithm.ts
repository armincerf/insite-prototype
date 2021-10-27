import { isScalarArgument } from '../GraphQL/Resolve';
import { ParserField } from 'graphql-zeus';

export const sortByConnection = (nodes: ParserField[]) => {
  const roots = nodes.sort((a, b) =>
    (a.args?.filter((ar) => !isScalarArgument(ar)).length || 0) >
    (b.args?.filter((ar) => !isScalarArgument(ar)).length || 0)
      ? -1
      : 1,
  );
  const copyRoots: ParserField[] = [];
  const pushCheckNode = (node?: ParserField, stop?: boolean) => {
    if (!node || copyRoots.includes(node)) {
      return;
    }
    copyRoots.push(node);
    if (stop) {
      return;
    }
    node.args?.forEach((arg) => {
      const found = roots.find((r) => r.name === arg.type.name);
      pushCheckNode(
        found,
        (found?.args?.filter((ar) => !isScalarArgument(ar)).length || 2) > 3,
      );
    });
  };
  for (const node of roots) {
    pushCheckNode(node);
  }
  return copyRoots;
};
