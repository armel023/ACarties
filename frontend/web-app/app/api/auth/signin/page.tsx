import EmptyFilter from "@/app/components/EmptyFilter";

export default function SignIn({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  console.log("Search params:", searchParams.callbackUrl); // Debugging log
  return (
    <EmptyFilter
      title="You need to be logged in to access this page"
      subtitle="Please login to continue"
      showLogin
      callbackUrl={searchParams.callbackUrl}
    />
  );
}
