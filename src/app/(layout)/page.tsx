import { HomeCardSlider } from "@/components/Home";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="text-white/85 relative mt-16 w-full h-96 rounded-3xl border border-border p-12 bg-gradient-to-r from-slate-950 to-violet-500">
        <div className="flex flex-col gap-6 w-[360px]">
          <span className="text-3xl text-center w-full">
            Welcome to theFuture Starknet
          </span>

          <span className="text-center">
            Starknet is the secure scaling technology bringing Ethereum`s
            benefits to the world
          </span>

          <div className="mt-12 flex gap-8 justify-center text-lg">
            <div>Explore Community</div>

            <div>Explore Dapps</div>
          </div>
        </div>
        <Image
          width={643}
          height={800}
          className="w-64 absolute top-0 right-0"
          src="/assets/images/homebg1.webp"
          alt="background stark"
        />
        <Image
          width={710}
          height={800}
          className="w-52 absolute top-20 right-72"
          src="/assets/images/homebg2.webp"
          alt="background stark"
        />
      </div>
      <HomeCardSlider />
    </>
  );
}
