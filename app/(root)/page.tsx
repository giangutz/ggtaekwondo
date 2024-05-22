import Affiliate from "@/components/shared/Affiliate";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Clients from "@/components/shared/Clients";
import Collection from "@/components/shared/Collection";
import Experience from "@/components/shared/Experience";
import Grid from "@/components/shared/Grid";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { heroWords } from "@/constants";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/shared/Hero";

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
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
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
      </section>

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

      <Clients />
      <Grid />
      <Experience />
    </>
  );
}
