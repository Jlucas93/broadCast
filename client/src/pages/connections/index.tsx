import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import { Page } from '@/components/ui';

import ConnectionList from './components/ConnectionList';

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

export default function Connections() {
  return (
    <Page title="Conexões">
      <Head>
        <title>Conexões</title>
      </Head>
      <ConnectionList />
    </Page>
  );
}
