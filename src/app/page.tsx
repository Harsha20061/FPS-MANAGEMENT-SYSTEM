

import Image from "next/image"
import Navbar from "@/components/Navbar";
import Shopinfo from "@/components/Shopinfo";
import Announcements from "@/components/Announcements";
import Status from "@/components/Status";
import Timings from "@/components/Timings";


export default function Home() {
  
  return (
    <>
    <Navbar />
    <main className="pt-20">
    <Shopinfo/>
    </main>
    <Announcements/>
    <Status/>
    <Timings/>
    </>
  );
}
