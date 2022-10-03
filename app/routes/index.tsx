import type { HeadersFunction } from "@remix-run/server-runtime";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "s-maxage=86400, stale-while-revalidate=604800",
  };
};

const IndexPage = () => {
  return (
    <main className=""><h1>Murtada al Mousawy</h1></main>
  );
}

export default IndexPage;
