import Layout from '../components/layout';
import { Page } from '../components/ui';
import { HederContact } from './_components/ContactHeader';
import { ContactTable } from './_components/ContactTable';

export default function Contact() {
  return (
    <Layout>
      <Page title="Contatos">
        <HederContact />

        <ContactTable />
      </Page>
    </Layout>
  );
}
