import React, { useRef, useState } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '../../Colors';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { NodeTitle } from './SharedNode';
import { fontFamily } from '../../vars';
import { useTreesState } from '../../state/containers/trees';
import { Plus } from '../../Graf/icons';
import { themed } from '../../Theming/utils';
import { useTheme } from '../../state/containers';
import { GraphQLEditorDomStructure } from '../../domStructure';
export interface NewNodeProps {
  node: ParserField;
  onCreate: (name: string) => void;
}
const NameError: NestedCSSProperties = {
  color: Colors.red,
};
const NameErrorMessage: NestedCSSProperties = {
  position: 'absolute',
  height: 30,
  top: -30,
  color: Colors.red,
  width: 600,
  fontSize: 10,
  marginLeft: -10,
  display: 'flex',
  alignItems: 'center',
};
const NodeCreate: NestedCSSProperties = {
  color: Colors.grey,
  background: 'transparent',
  fontSize: 12,
  padding: `5px 0 5px 10px`,
  border: 0,
  outline: 0,
  fontFamily,
  width: 200,
  $nest: {
    '&::placeholder': {
      fontFamily,
    },
    '&.NameError': NameError,
  },
};
const MainNodeArea = themed<NestedCSSProperties>((theme) => ({
  position: 'relative',
  borderColor: 'transparent',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 4,
  cursor: 'pointer',
  transition: `border-color 0.25s ease-in-out`,
  $nest: {
    '.NodeTitle': {
      ...NodeTitle(theme),
      width: 200,
      background: 'transparent',
      $nest: {
        ...NodeTitle(theme).$nest,
        '.NodeCreate': NodeCreate,
        '.NameErrorMessage': NameErrorMessage,
      },
    },
    '&:hover': {
      borderColor: Colors.green,
    },
  },
}));
const NodeContainer = themed((theme) =>
  style({
    margin: 10,
    $nest: {
      '.MainNodeArea': MainNodeArea(theme),
      ...Object.keys(theme.colors.backgrounds).reduce((a, b) => {
        a[`.NodeType-${b}`] = {
          borderColor: (theme.colors.backgrounds as any)[b],
        };
        return a;
      }, {} as Record<string, NestedCSSProperties>),
    },
  }),
);

const PlusButton = style({
  marginLeft: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  color: Colors.grey,
  border: `1px solid ${Colors.grey}11`,
  width: 20,
  height: 20,
  borderRadius: 10,
  marginRight: 5,
});

export const NewNode: React.FC<NewNodeProps> = ({ node, onCreate }) => {
  const thisNode = useRef<HTMLDivElement>(null);
  const [newName, setNewName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { libraryTree, tree, setSelectedNode } = useTreesState();
  const { theme } = useTheme();
  const isError =
    tree.nodes.map((n) => n.name).includes(newName) ||
    libraryTree.nodes.map((n) => n.name).includes(newName);
  const submit = () => {
    if (newName && !isError) {
      onCreate(newName);
    }
    setNewName('');
    setIsCreating(false);
  };
  return (
    <div
      className={NodeContainer(theme)}
      ref={thisNode}
      data-cy={GraphQLEditorDomStructure.tree.elements.Graf.newNode}
    >
      <div
        className={`MainNodeArea NodeType-${node.name}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsCreating(true);
          setSelectedNode(undefined);
        }}
      >
        <div className={`NodeTitle`}>
          {isError && (
            <div
              className={'NameErrorMessage'}
            >{`Cannot create ${node.name} with name:${newName} type with that name already exists. Try different name`}</div>
          )}
          {!isCreating && (
            <div className={`NodeName`}>{`New ${node.name}`}</div>
          )}
          {isCreating && (
            <input
              className={`NodeCreate ${isError ? 'NameError' : ''}`}
              value={newName}
              autoFocus
              placeholder={`New ${node.name} name...`}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={submit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  submit();
                }
              }}
            />
          )}
          {!isCreating && (
            <span className={`${PlusButton}`}>
              <Plus width={10} height={10} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
