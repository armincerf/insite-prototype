import Head from "next/head";
import { GraphiQLConsole } from "../components/graphiql";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <section className="w-full h-screen-with-toolbar border mt-md overflow-hidden rounded border-gray-300">
          <GraphiQLConsole />
        </section>
      </main>
    </div>
  );
}
