import type { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { asArray } from '../../../../src/utils/collections';
import ToolpadApp, { ToolpadAppProps } from '../../../../src/runtime/ToolpadApp';
import { APP_ID_LOCAL_MARKER } from '../../../../src/constants';
import config from '../../../../src/config';

export const getServerSideProps: GetServerSideProps<ToolpadAppProps> = async (context) => {
  const { loadRuntimeState, parseVersion, getApp } = await import('../../../../src/server/data');

  if (config.localMode) {
    return {
      notFound: true,
    };
  }

  const [appId] = asArray(context.query.appId);

  if (appId !== APP_ID_LOCAL_MARKER) {
    const app = appId ? await getApp(appId) : null;
    if (!appId || !app) {
      return {
        notFound: true,
      };
    }
  }

  const version = parseVersion(context.query.version);
  if (!version) {
    return {
      notFound: true,
    };
  }

  const state = await loadRuntimeState(appId, version);

  return {
    props: {
      state,
      version,
      basename: `/app/${appId}/${version}`,
    },
  };
};

const App: NextPage<ToolpadAppProps> = (props) => <ToolpadApp {...props} />;
export default App;
