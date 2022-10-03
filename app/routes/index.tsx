import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className=""><h1>Murtada al Mousawy</h1></main>
  );
}
