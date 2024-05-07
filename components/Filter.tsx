"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

interface Props {
  filterParam: string
  filters: {
    name: string
    value: string
  }[]
  otherClasses?: string
  containerClasses?: string
  placeHolder?: string
}

const Filter = ({
  filterParam,
  filters,
  otherClasses,
  containerClasses,
  placeHolder,
}: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const paramFilter = searchParams.get(filterParam)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleUpdateParams = (value: string) => {
    const queryString = createQueryString(filterParam, value)
    router.push(pathname + "?" + queryString)
  }
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
  )
}

export default Filter
