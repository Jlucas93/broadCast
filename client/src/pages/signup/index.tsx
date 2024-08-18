import Head from 'next/head';

import { FormSignUp } from './components/FormSignUp';

export default function Login() {
  return (
    <>
      <Head>
        <title>Cadastrar</title>
      </Head>
      <main className="w-full h-full flex flex-row justify-center items-center bg-primary-light ">
        <FormSignUp />
      </main>
    </>
  );
}
