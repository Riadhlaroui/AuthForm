import Sidebar from "@/components/Sidebar";
import TimeLine from "@/components/TimeLine";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <section className="home">
      <div className="home-content">
        <TimeLine />
      </div>
    </section>
   </div>
  );
}
