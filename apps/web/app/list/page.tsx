"use client";

import { useGetOrganizationList } from "@excolog/api-hooks";

export default () => {
  const { data: list } = useGetOrganizationList();

  console.log(list);

  return null;
};
