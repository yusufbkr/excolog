"use client";

import { Fragment } from "react";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";
import { Separator } from "@repo/ui/components/separator";
import { SidebarTrigger } from "@repo/ui/components/sidebar";

interface Props {
  title: string;
  parents?: {
    title: string;
    href?: string;
  }[];
  rightActions?: React.ReactNode[];
}

function PageHeader({ title, parents, rightActions }: Props) {
  return (
    <header className="bg-background h-(--header-height) group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) sticky top-0 z-30 flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:pl-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={"/"}>Turkish Technic</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {parents?.length &&
              parents.map((parent, index) => (
                <Fragment key={`${parent.href}-${index}`}>
                  <BreadcrumbItem>
                    {parent.href ? (
                      <BreadcrumbLink asChild>
                        <Link href={parent.href}>{parent.title}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-muted-foreground">
                        {parent.title}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </Fragment>
              ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mr-2 flex items-center gap-2">{rightActions}</div>
    </header>
  );
}
export default PageHeader;
