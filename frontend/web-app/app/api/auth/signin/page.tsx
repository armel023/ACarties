import EmptyFilter from "@/app/components/EmptyFilter";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  console.log("Search params:", resolvedSearchParams.callbackUrl); // Debugging log
  return (
    <EmptyFilter
      title="You need to be logged in to access this page"
      subtitle="Please login to continue"
      showLogin
      callbackUrl={resolvedSearchParams.callbackUrl}
    />
  );
}
