import { Hero } from "@/cosmic/blocks/landing-page/Hero";
import { Sections } from "@/cosmic/blocks/landing-page/Sections";
export default function Home() {
  return (
   
    <>
      <Hero query={{ slug: "home", type: "pages" }} />
      <Sections query={{ slug: "home", type: "pages" }} />
    </>
  
  );
}
