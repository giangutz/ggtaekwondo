"use client";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FlipWords } from "../ui/flip-words";
import { heroWords } from "@/constants";
import Link from "next/link";
import TrialModal from "./TrialModal";
import AnimatedGradientText from "../magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import NumberTicker from "@/components/magicui/magic-ticker";

const ShuffleHero = () => {
  function getFirstSaturday(): string {
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();

    let date = new Date(year, month, 1);
    while (date.getDay() !== 6) {
      date.setDate(date.getDate() + 1);
    }

    // If the first Saturday has passed, get the first Saturday of next month
    if (date < now) {
      month += 1;
      date = new Date(year, month, 1);
      while (date.getDay() !== 6) {
        date.setDate(date.getDate() + 1);
      }
    }

    return date.toLocaleString("en-US", {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return (
    <section className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 md:grid-cols-2">
      <div>
        {/* <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Better every day
        </span> */}
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
          <span
            className={cn(
              `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            Next Free Trial Class on {getFirstSaturday()}
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>

        <h3 className="h3-bold text-3xl font-semibold md:text-4xl">
          {/* <FlipWords words={heroWords} className="text-[#ff571b] pl-0" /> */}
          <span className="text-[#ff571b]">Unlock</span> Your Potential. <br />
          Start Taekwondo Today!
        </h3>
        <p className="my-4 text-base text-slate-700 md:my-6 md:text-lg">
          World-Class Instructors. Fun & Effective Training. Build Confidence &
          Skills. Programs for All Ages.
        </p>
        {/* <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
          Find a class
        </button> */}
        {/* <button className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
          Sign Up for a Free Trial
        </button> */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
          {/* w-full sm:w-fit */}
          {/* <button className="w-full sm:w-fit px-6 py-2 font-medium bg-[#ff571b] text-white transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
            Sign Up for a Free Trial
          </button> */}
          <TrialModal />
          <button className="w-full rounded-md border border-black bg-white px-6 py-2 font-medium text-black shadow-[3px_3px_0px_black] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none sm:w-fit">
            <Link href="#benefits">Learn More</Link>
          </button>
        </div>
        {/* <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"> */}
        <div className="mt-8 hidden md:flex md:justify-between">
          <div className="p-4 text-center text-black">
            <h4 className="text-xl font-bold">
              <NumberTicker value={7} />
            </h4>
            <p>Years in the Business</p>
          </div>
          <div className="p-4 text-center text-black">
            <h4 className="text-xl font-bold">
              <NumberTicker value={500} />
            </h4>
            <p>Students Handled</p>
          </div>
          <div className="p-4 text-center text-black">
            <h4 className="text-xl font-bold">
              <NumberTicker value={1000} />
            </h4>
            <p>Classes Conducted</p>
          </div>
          {/* <div className=" text-black p-4 text-center">
            <h4 className="font-bold text-xl">5</h4>
            <p>Locations</p>
          </div> */}
        </div>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "/assets/hero/1.png",
  },
  {
    id: 2,
    src: "/assets/hero/2.png",
  },
  {
    id: 3,
    src: "/assets/hero/3.png",
  },
  {
    id: 4,
    src: "/assets/hero/4.png",
  },
  {
    id: 5,
    src: "/assets/hero/5.png",
  },
  {
    id: 6,
    src: "/assets/hero/6.png",
  },
  {
    id: 7,
    src: "/assets/hero/7.png",
  },
  {
    id: 8,
    src: "/assets/hero/8.png",
  },
  {
    id: 9,
    src: "/assets/hero/9.png",
  },
  {
    id: 10,
    src: "/assets/hero/10.png",
  },
  {
    id: 11,
    src: "/assets/hero/11.png",
  },
  {
    id: 12,
    src: "/assets/hero/12.png",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="h-full w-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState(generateSquares());

  const shuffleSquares = useCallback(() => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  }, []);

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, [shuffleSquares]);

  return (
    <div className="grid h-[500px] grid-cols-3 gap-1 md:grid-cols-4 md:grid-rows-3">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;
