import { RescueContainer } from "@/views/rescue";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flow-page page-width">
      <RescueContainer id={id} />
    </div>
  );
}
