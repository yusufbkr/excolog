"use client";

// import { useGetOrganizationList } from "@excolog/api-hooks";
import { useOrganizationServiceGetOrganizationList } from "@excolog/api-hooks";

export default function TestHooksPage() {
  const { data, isLoading } = useOrganizationServiceGetOrganizationList();

  return (
    <div>
      <h1>Test Hooks</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
