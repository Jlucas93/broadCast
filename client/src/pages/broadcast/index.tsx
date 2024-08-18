import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import { Page } from '@/components/ui';

import BroadcastList from './components/BroadcastList';

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

export default function Broadcast() {
  return (
    <Page
      title="Lista de transmissões"
      subtitle="Para criar uma lista de transmissões e ncessário ter pelo menos 1 conexão ativa e escolher pelo menos  1 contato!"
    >
      <Head>
        <title>Lista de transmissões</title>
      </Head>

      <BroadcastList />
    </Page>
  );
}
