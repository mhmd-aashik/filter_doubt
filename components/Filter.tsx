"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  placeHolder?: string;
}

const Filter = ({
  filters,
  otherClasses,
  containerClasses,
  placeHolder,
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get("filter");

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value: value.split(",").join(","),
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className={`relative ${containerClasses} w-[400px]  lg:w-[200px]`}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramFilter || undefined}
      >
        <SelectTrigger
          className={`${otherClasses} no-focus body-regular light-border border px-5 py-2.5 text-light-500 focus-visible:ring-transparent`}
        >
          <div className=" line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeHolder} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
