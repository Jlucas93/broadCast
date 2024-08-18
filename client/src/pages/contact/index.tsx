import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import { Page } from '@/components/ui';

import { ContactTable } from './components/ContactTable';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies['@token'];
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Contact() {
  return (
    <Page title="Contatos">
      <Head>
        <title>Contatos</title>
      </Head>

      <ContactTable />
    </Page>
  );
}
