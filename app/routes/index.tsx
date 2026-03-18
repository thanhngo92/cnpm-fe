import { redirect } from "react-router";

export async function loader() {
  return redirect("/glowup");
}

export default function Index() {
  return null;
}
