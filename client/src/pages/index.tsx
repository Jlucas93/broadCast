import Head from "next/head";

import FormLogin from "@/components/Login";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className="w-full h-full flex flex-row justify-center items-center bg-primary-light ">
        <FormLogin />
      </main>
    </>
  );
}
