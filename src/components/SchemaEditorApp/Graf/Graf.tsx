import React, { useRef, useEffect } from 'react';
import { style } from 'typestyle';
import { fontFamily } from '../vars';
import { PaintNodes } from './PaintNodes';
import { ActiveNode } from '../Graf/Node';
import { useTreesState } from '../state/containers/trees';
import {
  KeyboardActions,
  useErrorsState,
  useIOState,
  useNavigationState,
  useTheme,
} from '../state/containers';
import { Colors } from '../Colors';
import { themed } from '../Theming/utils';
import { darken, toHex } from 'color2k';
import { GraphQLEditorDomStructure } from '../domStructure';

export interface GrafProps {}

const Wrapper = themed(
  ({
    colors: {
      graf: {
        wrapperBackground,
        scrollbar: { inner, outer },
      },
    },
  }) =>
    style({
      width: '100%',
      height: '100%',
      overflowX: 'hidden',
      position: 'relative',
      flex: 1,
      background: wrapperBackground,
      overflowY: 'auto',
      scrollbarColor: `${inner} ${outer}`,
    }),
);
const AnimatedWrapper = style({});
const Main = themed(() =>
  style({
    width: '100%',
    height: '100%',
    position: 'relative',
    overflowY: 'auto',
    fontFamily,
  }),
);
const ErrorContainer = style({
  position: 'absolute',
  zIndex: 2,
  top: 0,
  right: 0,
  width: `calc(100% - 40px)`,
  padding: 20,
  margin: 20,
  borderRadius: 4,
  fontSize: 12,
  fontFamily,
  letterSpacing: 1,
  color: Colors.pink,
  background: `${toHex(darken(Colors.red, 0.6))}ee`,
  border: `1px solid ${Colors.red}`,
});
const ErrorLock = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  background: `${toHex(darken(Colors.main, 0.9))}99`,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const ErrorLockMessage = style({
  width: `clamp(200px, 50vw, 500px)`,
  fontFamily,
  fontSize: 14,
  padding: 30,
  color: Colors.red,
  background: toHex(darken(Colors.main, 0.95)),
});
const SubNodeContainer = themed(
  ({
    colors: {
      graf: {
        node: {
          background,
          scrollbar: { inner, outer },
        },
      },
    },
  }) =>
    style({
      width: 'min(clamp(400px, 40%, 1280px), calc(100vw - 50px))',
      background,
      fontFamily,
      right: 0,
      top: 0,
      bottom: 0,
      scrollbarColor: `${inner} ${outer}`,
      transition: `max-width 0.25s ease-in-out`,
    }),
);
let snapLock = true;

export const Graf: React.FC<GrafProps> = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    libraryTree,
    tree,
    setTree,
    selectedNode,
    setSelectedNode,
    setSnapshots,
    snapshots,
    past,
    future,
    readonly,
  } = useTreesState();
  const { lockGraf, grafErrors } = useErrorsState();
  const { setMenuState } = useNavigationState();
  const { setActions } = useIOState();
  const { theme } = useTheme();

  useEffect(() => {
    if (snapLock) {
      snapLock = false;
      return;
    }
    const copyTree = JSON.stringify(tree);
    if (snapshots.length === 0) {
      setSnapshots([copyTree]);
      return;
    }
    if (snapshots[snapshots.length - 1] !== copyTree) {
      setSnapshots([...snapshots, copyTree]);
    }
  }, [tree]);

  useEffect(() => {
    setActions((acts) => ({
      ...acts,
      [KeyboardActions.Undo]: () => {
        const p = past();
        if (p) {
          snapLock = true;
          setTree(JSON.parse(p));
        }
      },
      [KeyboardActions.Redo]: () => {
        const f = future();
        if (f) {
          snapLock = true;
          setTree(JSON.parse(f));
        }
      },
    }));
  }, [snapshots]);

  const node = selectedNode
    ? tree.nodes.find((n) => n === selectedNode) ||
      libraryTree.nodes.find((n) => n === selectedNode)
    : undefined;
  return (
    <>
      {node && wrapperRef.current && (
        <div className={SubNodeContainer(theme)} onClick={() => {}}>
          <ActiveNode
            readonly={readonly}
            onDelete={(nodeToDelete) => {
              const deletedNode = tree.nodes.findIndex(
                (n) => n === nodeToDelete,
              )!;
              const allNodes = [...tree.nodes];
              allNodes.splice(deletedNode, 1);
              setSelectedNode(undefined);
              setTree({ nodes: allNodes });
            }}
            onDuplicate={(nodeToDuplicate) => {
              const allNodes = [...tree.nodes];
              allNodes.push(
                JSON.parse(
                  JSON.stringify({
                    ...node,
                    name: nodeToDuplicate?.name + 'Copy',
                  }),
                ),
              );
              setTree({ nodes: allNodes });
            }}
            node={node}
          />
        </div>
      )}
      <div
        ref={wrapperRef}
        className={`${Wrapper(theme)} ${node ? AnimatedWrapper : ''}`}
        onClick={() => {
          setSelectedNode(undefined);
        }}
        data-cy={GraphQLEditorDomStructure.tree.elements.Graf.name}
      >
        <div className={Main(theme)}>{!lockGraf && <PaintNodes />}</div>
        {lockGraf && (
          <div
            className={ErrorLock}
            onClick={() => {
              setMenuState('code-diagram');
            }}
          >
            <div
              className={ErrorLockMessage}
            >{`Unable to parse GraphQL code. Graf editor is locked. Open "<>" code editor to correct errors in GraphQL Schema`}</div>
          </div>
        )}

        {grafErrors && <div className={ErrorContainer}>{grafErrors}</div>}
      </div>
    </>
  );
};
