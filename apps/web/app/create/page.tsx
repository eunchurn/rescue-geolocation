import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export const fetchCache = "force-no-store";


export default async function Create() {
  redirect(`create/${nanoid(6)}`);
  return <div>redirect...</div>;
}
