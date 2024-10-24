import { DappCard, DappCardProps } from "./DappCard";

const cards: DappCardProps[] = [
  {
    logo: "https://www.starknet.io/wp-content/uploads/2024/09/111331802.jpg",
    title: "10K Swap",
    description: "An AMM protocol that advances with Ethereum.",
    links: [
      { name: "discord", link: "https://discord.gg/T77yphUPB6" },
      { name: "twitter", link: "https://x.com/10KX_Global" },
      { name: "github", link: "https://github.com/10k-swap" },
    ],
    badges: ["Defi", "AMM", "Games"],
    target: "https://www.10kx.com",
  },
  {
    logo: "/assets/images/ABDK.png",
    title: "ABDK",
    description:
      "Audit of smart contracts, zero knowledge circuits, cryptographic schemes, and protocols.",
    links: [{ name: "twitter", link: "https://twitter.com/abdkconsulting" }],
    badges: ["Auditing", "Audits", "Infrastructure", "Services"],
    target: "https://abdk.consulting",
  },
  {
    logo: "/assets/images/Apibara.png",
    title: "Apibara",
    description:
      "A platform to build production-grade indexers that connect onchain data to web2 services.",
    links: [
      { name: "website", link: "https://www.apibara.com/" },
      { name: "twitter", link: "https://www.twitter.com/apibara_web3" },
      { name: "discord", link: "https://discord.gg/m7B92CNFNt" },
    ],
    badges: ["Indexer", "Tools"],
    target: "https://www.apibara.com",
  },
  {
    logo: "/assets/images/Argent.png",
    title: "Argent",
    description:
      "A fully self-custodial, open-source, and audited smart wallet on Starknet with over 2 million downloads. Argent includes advanced security features like built-in fraud monitoring, transaction simulation, and multisig security.",
    links: [
      { name: "website", link: "https://www.argent.xyz/" },
      { name: "twitter", link: "https://twitter.com/argentHQ" },
      { name: "discord", link: "https://discordapp.com/invite/GWSyrHg" },
      { name: "github", link: "https://github.com/argentlabs/" },
    ],
    badges: ["Hardware Wallet", "Smart Wallet"],
    target: "https://www.argent.xyz/",
  },
  {
    logo: "/assets/images/ARKProject.png",
    title: "ARK Project",
    description:
      "A project focusing on creating enhanced APIs and bridging NFTs.",
    links: [
      { name: "website", link: "https://www.arkproject.dev/" },
      { name: "twitter", link: "https://x.com/ArkProjectNFTs" },
      { name: "github", link: "https://github.com/ArkProjectNFTs" },
    ],
    badges: ["Enhanced API", "Entertainment & Socials", "NFT Bridge"],
    target: "https://www.arkproject.dev/",
  },
  {
    logo: "/assets/images/AVNU.png",
    title: "AVNU",
    description:
      "A decentralized exchange protocol designed to offer the best execution. Their mission is to build liquidity infrastructure that empowers traders and dApps with the best execution.",
    links: [
      { name: "website", link: "https://www.avnu.fi/" },
      { name: "twitter", link: "https://twitter.com/avnu_fi" },
      { name: "discord", link: "https://discord.com/invite/avnu-fi" },
      {
        name: "github",
        link: "https://github.com/avnu-labs/avnu-contracts-v2",
      },
      { name: "telegram", link: "https://t.me/avnu_fi" },
    ],
    badges: ["Defi", "Dex Aggregator"],
    target: "https://www.avnu.fi/",
  },
  {
    logo: "/assets/images/Banxa.png",
    title: "Banxa",
    description:
      "A fintech platform enabling users to buy and sell cryptocurrencies within apps using local and global payment methods. They offer on and off ramps, NFT checkout, and web3 integration for seamless transactions.",
    links: [
      { name: "website", link: "https://banxa.com/" },
      { name: "twitter", link: "https://x.com/banxaofficial" },
    ],
    badges: ["Defi", "On-Ramp"],
    target: "https://banxa.com/",
  },
  {
    logo: "/assets/images/Beosin.png",
    title: "Beosin",
    description:
      "A blockchain security firm that offers comprehensive security solutions, including smart contract audits, threat monitoring, and incident response to protect blockchain projects.",
    links: [
      { name: "website", link: "https://www.beosin.com/" },
      { name: "twitter", link: "https://x.com/Beosin_com" },
      { name: "discord", link: "https://discord.com/invite/B4QJxhStV4" },
      { name: "telegram", link: "https://t.me/beosin" },
    ],
    badges: ["Auditing", "Audits", "Infrastructure", "Services"],
    target: "https://www.beosin.com/",
  },
  {
    logo: "/assets/images/Bitget.png",
    title: "Bitget",
    description:
      "A cryptocurrency trading platform that offers a range of trading options, including spot trading, futures trading, and copy trading, with a focus on user experience and security.",
    links: [
      { name: "website", link: "https://www.bitget.com/" },
      { name: "twitter", link: "https://x.com/bitgetwallet" },
      { name: "discord", link: "https://discord.com/invite/bitget" },
      { name: "telegram", link: "https://t.me/BitgetFuturesTrading" },
    ],
    badges: ["Smart Wallet"],
    target: "https://www.bitget.com/",
  },
  {
    logo: "/assets/images/BlastBuilder.png",
    title: "Blast Builder and NFT Api",
    description:
      "Effortlessly launch, verify, analyze, and display NFTs on Starknet with Blast NFT API.",
    links: [
      { name: "website", link: "https://blastapi.io/" },
      { name: "twitter", link: "https://twitter.com/BlastAPI" },
      { name: "discord", link: "https://discord.gg/bwarelabs" },
      { name: "github", link: "https://github.com/bwarelabs" },
      { name: "telegram", link: "https://t.me/bwareLabs" },
    ],
    badges: ["Enhanced API", "Open Endpoints", "RPC Services", "Tools"],
    target: "https://blastapi.io/",
  },
  {
    logo: "/assets/images/Boltwade Studio.png",
    title: "Boltwade Studio",
    description: "Gaming studio powered by Dojo and made with Unity.",
    links: [
      { name: "website", link: "https://brewmaster.boltwade.xyz/" },
      { name: "twitter", link: "https://x.com/BoltwadeStudio" },
    ],
    badges: ["Gaming Studio"],
    target: "https://brewmaster.boltwade.xyz/",
  },
  {
    logo: "/assets/images/Bountive.png",
    title: "Bountive",
    description: "A DeFi platform offering yield farming opportunities.",
    links: [
      { name: "website", link: "https://www.bountive.fi" },
      { name: "twitter", link: "https://twitter.com/Bountive" },
    ],
    badges: ["Defi", "Yield Farming"],
    target: "https://www.bountive.fi",
  },
  {
    logo: "/assets/images/Bravos.png",
    title: "Bravos",
    description:
      "Smart wallet on mobile (Android & iOS). Use all your favorite Starknet dApps on the go. Also available for Chrome, Firefox, and Edge. All-in-one asset management – DeFi and NFTs.",
    links: [
      { name: "website", link: "https://braavos.app/" },
      { name: "twitter", link: "https://twitter.com/myBraavos" },
      { name: "discord", link: "https://discord.com/invite/9Ks7V5DN9z" },
      { name: "github", link: "https://github.com/myBraavos/" },
      { name: "telegram", link: "https://t.me/mybraavos" },
    ],
    badges: ["Hardware Wallet", "Smart Wallet"],
    target: "https://braavos.app/",
  },
  {
    logo: "/assets/images/Briq.png",
    title: "Briq",
    description:
      "An NFT construction protocol using basic building blocks called briqs. You can assemble briqs into NFTs and disassemble them to reclaim the briqs for new creations.",
    links: [{ name: "website", link: "https://briq.construction/" }],
    badges: ["Art", "Games"],
    target: "https://briq.construction/",
  },
  {
    logo: "/assets/images/Cairo Security Clan.png",
    title: "Cairo Security Clan",
    description:
      "A smart contract security service that provides tools for identifying and fixing vulnerabilities in Cairo smart contracts, ensuring the safety and reliability of Starknet applications.",
    links: [
      { name: "website", link: "https://cairosecurityclan.com/" },
      { name: "github", link: "https://github.com/Cairo-Security-Clan" },
      { name: "telegram", link: "https://t.me/burakcsc" },
    ],
    badges: ["Smart Wallet"],
    target: "https://cairosecurityclan.com/",
  },
  {
    logo: "/assets/images/Carbonable.png",
    title: "Carbonable",
    description:
      "Finance nature’s regeneration and get high, sustainable, and real-world backed revenue, while fighting climate change.",
    links: [
      { name: "website", link: "https://www.carbonable.io/" },
      { name: "twitter", link: "https://twitter.com/Carbonable_io" },
      { name: "discord", link: "https://discord.gg/Huspzn4teW" },
    ],
    badges: ["Defi", "Environmental Impact"],
    target: "https://www.carbonable.io/",
  },
];

export function DappsContainer() {
  return (
    <div className="w-full gap-4 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
      {cards.map((card, i) => {
        return <DappCard key={i} cardProps={card} />;
      })}
    </div>
  );
}
