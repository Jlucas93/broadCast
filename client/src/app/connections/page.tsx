import Layout from '../components/layout';
import { Page } from '../components/ui';
import { ConnectionHeader } from './_components/ConnectionHeader';
import { ConnectionList } from './_components/ConnectionList';

export default function Connections() {
  return (
    <Layout>
      <Page title="Conexões">
        <ConnectionHeader />
        <ConnectionList />
      </Page>
    </Layout>
  );
}
