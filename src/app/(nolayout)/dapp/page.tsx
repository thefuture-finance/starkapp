import { DappContainer } from "@/components/Dapps";

export default function Dapps({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return (
    <div className="w-full h-full">
      <DappContainer url={searchParams.url} />
    </div>
  );
}
