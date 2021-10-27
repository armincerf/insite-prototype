import Head from "next/head";
import { useRouter } from "next/router";
import { Dispatch, useState } from "react";
import { Dropdown } from "../components/Dropdown";
import { GraphiQLConsole } from "../components/graphiql";
import { Navbar } from "../components/Navbar";

const EndpointSelector = ({
  endpoint,
  setEndpoint,
}: {
  endpoint: string;
  setEndpoint: Dispatch<string>;
}) => {
  const endpoints = [
    {
      label: "Site System",
      value: "http://localhost:2021/_site/graphql",
    },
    {
      label: "Card",
      value: "http://localhost:2021/graphql",
    },
  ];
  return (
    <div className="flex h-12 shadow-md w-full rounded-md">
      <Dropdown items={endpoints} onSelect={setEndpoint} selected={endpoint} />
      <input
        className="w-full pl-4 rounded-r-md"
        type="text"
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
      />
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const { url } = router.query;
  const [endpoint, setEndpoint] = useState(
    url?.toString() || "http://localhost:2021/_site/graphql"
  );
  return (
    <>
      <Head>
        <title>InSite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="px-4">
        <section className="my-4 prose-xs lg:prose-sm py-4">
          <h3>GraphQL Endpoint</h3>
          <EndpointSelector endpoint={endpoint} setEndpoint={setEndpoint} />
        </section>
        <section className="w-full h-screen-with-toolbar border mt-md overflow-hidden rounded border-gray-300">
          <GraphiQLConsole endpoint={endpoint} />
        </section>
      </main>
    </>
  );
}
