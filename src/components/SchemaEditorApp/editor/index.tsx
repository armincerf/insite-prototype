import { Editor, EditorProps } from "./Editor";
import {
  TreesStateProvider,
  ErrorsStateProvider,
  NavigationStateProvider,
  IOStateProvider,
  ThemeProvider,
} from "../state/containers";
import dynamic from "next/dynamic";

const EditorApp = (props: EditorProps) => {
  return (
    <ThemeProvider>
      <TreesStateProvider>
        <ErrorsStateProvider>
          <NavigationStateProvider>
            <IOStateProvider>
              <Editor {...props} />
            </IOStateProvider>
          </NavigationStateProvider>
        </ErrorsStateProvider>
      </TreesStateProvider>
    </ThemeProvider>
  );
};

export const GraphQLEditor = dynamic(() => Promise.resolve(EditorApp), {
  ssr: false,
});
