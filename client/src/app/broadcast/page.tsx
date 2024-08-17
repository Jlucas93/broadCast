import Layout from '../components/layout';
import { Page } from '../components/ui';
import { BroadcastHeader } from './_components/BroadcastHeader';
import { BroadcastList } from './_components/BroadcastList';

export default function Broadcast() {
  return (
    <Layout>
      <Page title="Lista de tramissões">
        <BroadcastHeader />
        <BroadcastList />
      </Page>
    </Layout>
  );
}
