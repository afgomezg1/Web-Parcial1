import EditActorForm from "@/components/EditActorForm";

type EditActorPageProps = {
  params: {
    id: string;
  };
};

export default async function EditActorPage({
  params,
}: EditActorPageProps) {
  const { id } = await params;

  return <EditActorForm actorId={id} />;
}