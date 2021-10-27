import Head from "next/head";
import { Navbar } from "../components/Navbar";
import { Pure } from "../components/SchemaEditor";

export default function Metrics() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="px-4">
        <Pure />
      </main>
    </>
  );
}
