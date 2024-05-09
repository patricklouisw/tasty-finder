"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaYoutube } from "react-icons/fa";

const DynamicMapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

const Map = () => {
  return (
    <div className="container flex flex-col justify-center items-center gap-10">
      <h1 className="text-3xl font-bold">
        Find a List of Restaurants from a Travel Youtube Video!
      </h1>
      <DynamicMapComponent />

      <div className="w-5/6">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-5 bg-slate-100 rounded font-bold text-slate-800">
              Developer&apos;s Note
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 bg-slate-50 p-5">
              <div className="flex gap-2 my-2 flex-col">
                <span className="font-bold text-base">
                  How to use Tasty Finder:
                </span>
                <div className="ml-2 flex flex-col gap-2">
                  <p>
                    1. Copy a link to a youtube travel video, such as{" "}
                    <span className="italic underline cursor-text">
                      https://www.youtube.com/watch?v=z-iAddtjM7A
                    </span>
                  </p>
                  <p>
                    2. Our algorithm will find all the restaurants that we can
                    find in the video.
                  </p>
                </div>
              </div>

              <p className="font-bold">Thank you for using our application!</p>

              <p>
                Currently, our feature is limited to english-speaking videos
                that youtube marked as category &quot;ravel & Events&quot;,
                hence some videos with food content may not work with the
                current version. We will address this issue in the future.
              </p>
              <p>
                Some of{" "}
                <span className="underline font-bold">
                  our favorite youtube channel
                </span>{" "}
                to check on are:{" "}
              </p>
              <div className="flex gap-2 my-2">
                <Link
                  href={"https://www.youtube.com/@MarkWiens"}
                  className="flex justify-center items-center gap-2 rounded-full bg-red-600 w-fit py-2 px-4 text-white font-bold"
                >
                  <FaYoutube className="text-lg" />
                  Mark Wiens
                </Link>
                <Link
                  href={"https://www.youtube.com/@strictlydumpling"}
                  className="flex justify-center items-center gap-2 rounded-full bg-red-600 w-fit py-2 px-4 text-white font-bold"
                >
                  <FaYoutube className="text-lg" />
                  Strictly Dumpling
                </Link>
                <Link
                  href={"https://www.youtube.com/@MikeyChenX"}
                  className="flex justify-center items-center gap-2 rounded-full bg-red-600 w-fit py-2 px-4 text-white font-bold"
                >
                  <FaYoutube className="text-lg" />
                  Mike Chen
                </Link>
              </div>
              <p className="">
                Developed by{" "}
                <Link
                  className="underline text-blue-600 hover:text-blue-400"
                  href={"https://www.linkedin.com/in/patricklouisw/"}
                >
                  Patrick Louis
                </Link>{" "}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Map;
