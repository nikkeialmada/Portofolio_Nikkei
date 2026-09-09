import { redirect } from "next/navigation";

// The standalone project list is now the Portfolio section on the home page.
export default function ProjectsIndex() {
  redirect("/#portfolio");
}
