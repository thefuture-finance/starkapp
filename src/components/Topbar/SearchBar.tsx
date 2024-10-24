"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn, isValidEthereumAddress, isValidStarkAddress } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useAccountInfo } from "@/store/getAccountInfo";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import AutoCompleteSearch from "../SearchBar/Search";

const addressBook = [
  { address: "0xE8c89d6918660e0c36aB60d87f094d68dc4dde75", name: "" },
  { address: "0xd6241489026aD9043097E1EdEBBc6A34f7d95fc4", name: "" },
  { address: "0xE4eDb277e41dc89aB076a1F049f4a3EfA700bCE8", name: "" },
];

async function getList(filter: string) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const lowerFilter = filter.toLocaleLowerCase();
  return addressBook
    .filter(({ address }) =>
      address.toLocaleLowerCase().startsWith(lowerFilter),
    )
    .slice(0, 20);
}

export function SearchBar({ selectedAddress }: { selectedAddress: string }) {
  const { accountInfo, addRecentSearch, removeRecentSearch } = useAccountInfo();
  const [searchValue, setSearchValue] = useState<string>("");

  const router = useRouter();

  const searchQueryData = useQuery({
    queryKey: ["data", searchValue],
    queryFn: () => getList(searchValue),
  });

  function deleteRecentSearch(address: string) {
    removeRecentSearch(address);
  }

  function setSelectedValue(address: string) {
    if (
      !addressBook?.some((value) => {
        return value?.address == address;
      })
    ) {
      if (!isValidStarkAddress(address)) {
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          ),
          title: "It is not a valid starknet address",
          description: "",
        });
        return;
      }
      console.log(selectedAddress);
      if (address == selectedAddress) {
        toast({
          variant: "destructive",
          title: "Address is already selected",
        });
        return;
      }
    }

    if (
      !accountInfo?.recentSearches?.find((value) => {
        return value?.address == address;
      })
    ) {
      addRecentSearch(
        addressBook.find((value) => {
          return value?.address == address;
        }) || { address: address, name: "" },
      );
    }
    router.push(`/portfolio?address=${address}`);
  }

  function onClickSetAddress() {
    router.push(`/portfolio?address=${searchValue}`);
  }

  return (
    <AutoCompleteSearch
      selectedValue={selectedAddress}
      onSelectedValueChange={setSelectedValue}
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      onDeleteRecentSearch={deleteRecentSearch}
      historyItems={accountInfo.recentSearches ?? []}
      items={searchQueryData.data ?? []}
      isLoading={searchQueryData.isLoading}
      emptyMessage="No Address Found."
      placeholder="Address, domain or identity"
    />
  );
}
