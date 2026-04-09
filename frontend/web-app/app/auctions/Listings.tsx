"use client";
import { Auction } from "@/types";
import AuctionCard from "./AuctionCard";
import AppPagination from "../components/AppPagination";
import { getData } from "../actions/auctionActions";
import { useEffect, useState } from "react";
import Filters from "./Filters";
import { useShallow } from "zustand/shallow";
import { useParamsStore } from "@/hooks/useParamsStore";
import queryString from "query-string";
import EmptyFilter from "../components/EmptyFilter";
import { useAuctionStore } from "@/hooks/useAuctionStore";

export default function Listings() {
  const [loading, setLoading] = useState(true);
  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    })),
  );

  const data = useAuctionStore(
    useShallow((state) => ({
      auctions: state.auctions,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    })),
  );

  const setData = useAuctionStore((state) => state.setData);

  const setParams = useParamsStore((state) => state.setParams);

  const url = queryString.stringifyUrl(
    {
      url: "",
      query: params,
    },
    { skipEmptyString: true },
  );

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(url);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url, setData]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data.auctions.map((auction: Auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <AppPagination
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
              onPageChange={setPageNumber}
            />
          </div>
        </>
      )}
    </>
  );
}
