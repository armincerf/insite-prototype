import React, { useState } from 'react';
import { GraphQLEditor } from './SchemaEditorApp/index';
import { PassedSchema } from './SchemaEditorApp/Models';
import { DarkTheme } from './SchemaEditorApp/Theming/DarkTheme';
import { LightTheme } from './SchemaEditorApp/Theming/LightTheme';
import * as schemas from '../schema';

export const Pure = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: '',
    libraries: '',
  });
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100vh',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLEditor
        theme={LightTheme}
        setSchema={(props) => {
          setMySchema(props);
        }}
        diffSchemas={{
          newSchema: { code: schemas.versionedUsersLibraryLatest },
          oldSchema: { code: schemas.versionedUsersLibrary01 },
        }}
        schema={mySchema}
      />
    </div>
  );
};