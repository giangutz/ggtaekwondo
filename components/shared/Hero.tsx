"use client";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FlipWords } from "../ui/flip-words";
import { heroWords } from "@/constants";

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
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        {/* <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Better every day
        </span> */}
        <span className="mb-1.5 inline-block rounded-full bg-gray-300 px-3 py-1.5 text-sm text-center sm:text-left">
          Next Free Trial Class on {getFirstSaturday()} 🎉
        </span>
        <h3 className="text-3xl md:text-4xl font-semibold">
          <FlipWords words={heroWords} className="text-[#ff571b] pl-0" /> Your
          Potential. <br />
          Start Taekwondo Today!
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          World-Class Instructors. Fun & Effective Training. Build Confidence &
          Skills. Programs for All Ages.
        </p>
        {/* <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
          Find a class
        </button> */}
        {/* <button className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
          Sign Up for a Free Trial
        </button> */}
        <div className="flex justify-center md:justify-start gap-4 flex-col sm:flex-row">
          {/* w-full sm:w-fit */}
          <button className="w-full sm:w-fit px-6 py-2 font-medium bg-indigo-500 text-white transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
            Sign Up for a Free Trial
          </button>
          <button className="w-full sm:w-fit px-6 py-2 font-medium bg-gray-500 text-white transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
  Learn More
</button>
        </div>
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
          <div className=" text-black p-4 text-center">
            <h4 className="font-bold text-xl">7+</h4>
            <p>years in the Business</p>
          </div>
          <div className=" text-black p-4 text-center">
            <h4 className="font-bold text-xl">100+</h4>
            <p>Happy students</p>
          </div>
          <div className=" text-black p-4 text-center">
            <h4 className="font-bold text-xl">20+</h4>
            <p>Experienced instructors</p>
          </div>
          <div className=" text-black p-4 text-center">
            <h4 className="font-bold text-xl">5</h4>
            <p>Locations</p>
          </div>
        </div>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: any) => {
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
  return shuffle(squareData).map((sq: any) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState(generateSquares());

  const shuffleSquares = useCallback(() => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  }, []);

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [shuffleSquares]);

  return (
    <div className="grid grid-cols-4 grid-rows-3 h-[500px] gap-1">
      {squares.map((sq: any) => sq)}
    </div>
  );
};

export default ShuffleHero;
