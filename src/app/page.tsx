import CryptoTable from "./components/CryptoTable";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-4xl font-bold mb-2">Top 10 Criptomonedas</h1>
      <CryptoTable />
    </main>
  );
}
