"use client";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useNERISContext } from "@/providers/neris-type-provider"
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { NERISChild, NERISParent, NERISType } from "@/lib/types";
import React from "react";

function isNotEmptyObject(obj: any) {
  return obj && Object.keys(obj).length > 0;
}

export default function TypeSelector() {

  const {value, setValue, nerisTypes} = useNERISContext()

  const mappedTypes = Object.keys(nerisTypes).map((key) => {
    return {
      id: key,
      label: key.replaceAll("_", " ").replaceAll("type", "").trim(),
      value: nerisTypes[key]
    }
  });

  const foundType = mappedTypes.find((type) => type.id === value) ?? mappedTypes.find((type) => type.id === "type_incident");
  console.log(foundType)
  mappedTypes.sort((a, b) => {
    if (a.id === foundType?.id) {
      return -1; // foundType should come first
    }
    if (b.id === foundType?.id) {
      return 1; // foundType should come first
    }
    return a.label.localeCompare(b.label); // sort alphabetically by label
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="z-10 capitalize">{foundType?.label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
      <ScrollArea className="h-[400px] w-60 rounded-md">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select a type</DropdownMenuLabel>
            {mappedTypes.map((type) => (
              <React.Fragment key={type.id}>
                <TypeSelectorParent {...type} />
              </React.Fragment>
            ))}
          </DropdownMenuGroup>
        </ScrollArea>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}

function TypeSelectorParent(type: {id: string, label: string, value: NERISType}) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="capitalize">
        <Link href={`?select=${type.id}`} className="w-full" prefetch={false}>
          {type.label}
        </Link>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
          <DropdownMenuSubContent>
          <ScrollArea className="max-h-[300px] rounded-md">
            {Object.keys(type.value).map((key) => (
              <>
                {type.value[key]?.sub_values && isNotEmptyObject(type.value[key]?.sub_values) ? (
                  <DropdownMenuSub key={key}>
                    <DropdownMenuSubTrigger className="w-full">
                      <Link href={`?select=${type.id}&parent=${key}`} className="w-full" prefetch={false}>
                        <DropdownMenuShortcut>{key}</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {Object.keys(type.value[key].sub_values!).map((subKey) => (
                          <TypeSelectorChild key={subKey} child={type.value[key]?.sub_values![subKey]} href={`?select=${type.id}&parent=${key}`} />
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ): (
                  <DropdownMenuItem>
                    <Link href={`?select=${type.id}&parent=${key}`} prefetch={false}>
                      <DropdownMenuShortcut>{type.value[key].description}</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                )}
              </>

            ))}
            </ScrollArea>
          </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

interface TypeSelectorChildProps {
  child: NERISChild | null;
  href: string;
}

function TypeSelectorChild({child, href}: TypeSelectorChildProps) {
  if (!child) return null;
  if (!child.sub_values) {
    return (
      <DropdownMenuItem>
        <Link href={href} prefetch={false}>
          <DropdownMenuShortcut>{child.description}</DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
    )
  }
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Link href={href} prefetch={false}>
          <DropdownMenuShortcut>{child.description}</DropdownMenuShortcut>
        </Link>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
        {child.sub_values && (
          <>
            {Object.keys(child.sub_values).map((subKey) => (
              <TypeSelectorChild key={subKey} child={child.sub_values![subKey]} href={href} />
            ))}

          </>
        )}

        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}