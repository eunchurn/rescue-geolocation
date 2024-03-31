import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export default function Create() {
  const id = nanoid(6);
  redirect(`create/${id}`);
  return <div></div>;
}
