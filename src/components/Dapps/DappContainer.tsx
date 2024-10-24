export function DappContainer({ url }: { url: string }) {
  return (
    <div className="w-full h-full">
      <iframe className="w-full h-full" src={url}></iframe>
    </div>
  );
}
