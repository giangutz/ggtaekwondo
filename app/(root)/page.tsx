import Affiliate from "@/components/shared/Affiliate";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Testimonials from "@/components/shared/Testimonials";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Link from "next/link";
import Hero from "@/components/shared/Hero";
import { BouncyCardsFeatures } from "@/components/shared/BouncyCardsFeatures";
import {
  MapPin,
  MessageCircle,
  MessageCircleMore,
  PhoneCall,
} from "lucide-react";
import TrialModal from "@/components/shared/TrialModal";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 3,
  });
  return (
    <>
      <Hero />
      <Affiliate />
      <BouncyCardsFeatures />
      {/* <TextParallaxContentExample /> */}
      {/* <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h2 className="h2-bold text-center md:text-left">
              <FlipWords words={heroWords} className="text-[#ff571b] pl-0" />{" "}
              Your Potential.
              <br />
              Start Taekwondo Today!
            </h2>
            <p className="p-regular-20 md:p-regular-24 text-center md:text-left">
              World-Class Instructors. Fun & Effective Training. Programs for
              All Ages.
            </p>
            <div className="flex justify-center md:justify-start gap-4 flex-col sm:flex-row">
              <Button size="lg" asChild className="button w-full sm:w-fit">
                <Link href="#training">Sign Up for a Free Trial</Link>
              </Button>
              <Button
                size="lg"
                asChild
                className="button-secondary w-full sm:w-fit"
              >
                <Link href="#training">Learn More</Link>
              </Button>
            </div>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section> */}

      <Testimonials />
      {/* <Grid />
      <Experience /> */}
      <section
        id="training"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">Upcoming Events</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>

      <div className="wrapper flex flex-col items-center mb-12">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to unlock <span className="text-purple-500">your</span>{" "}
          potential with Taekwondo?
        </h1>
        <div className="mt-4">
        <TrialModal />
        </div>
        <p className="text-white-200 my-5 text-center">
          Reach out to us today and let&apos;s discuss how we can help you
          achieve your goals.
        </p>
        {/* Create 3 cards for Chat on Messenger, Visit Us and Call Us */}

        <div className="flex flex-col md:flex-row gap-4 p-4">
          {/* Card 1: Chat on Messenger */}
          <div className="bg-white shadow-lg rounded-lg p-8 md:p-12">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-bold">Chat on Messenger</h3>
            </div>
            <p className="mb-4">
              Connect with us on Messenger for instant support.
            </p>
            <a
              href="https://www.facebook.com/gritandglorytkd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex w-full sm:w-auto px-6 py-2 font-medium bg-sky-500 border border-sky-500 text-white transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
                <MessageCircleMore className="mr-2" />
                Chat Now
              </button>
            </a>
          </div>

          {/* Card 2: Visit Us */}
          <div className="bg-white shadow-lg rounded-lg p-8 md:p-12">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-bold">Visit Us</h3>
            </div>
            <p className="mb-4">
              Find us at our location for a face-to-face meeting.
            </p>
            <a
              href="https://maps.app.goo.gl/9gYAHCjrna7Zmy9r9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex w-full sm:w-auto px-6 py-2 font-medium bg-green-500 border border-green-500 text-white transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
                <MapPin className="mr-2" />
                Get Directions
              </button>
            </a>
          </div>

          {/* Card 3: Call Us */}
          <div className="bg-white shadow-lg rounded-lg p-8 md:p-12">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-bold">Call Us</h3>
            </div>
            <p className="mb-4">Give us a call for any inquiries or support.</p>
            <a href="tel:09954871799">
              <button className="flex w-full sm:w-auto px-6 py-2 font-medium bg-[#ff571b] border border-[#ff571b] text-white transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md">
                <PhoneCall className="mr-2" />
                Call Now
              </button>
            </a>
          </div>
        </div>
      </div>
      {/* <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Adrian Hajdin
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}
