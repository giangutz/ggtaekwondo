import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-xl">GG Taekwondo</div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/#classes" className="text-gray-600 hover:text-black">
                Classes
              </Link>
              <Link href="/#about" className="text-gray-600 hover:text-black">
                About
              </Link>
              <Link href="/trial" className="text-gray-600 hover:text-black">
                Try a Class
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Join Now</Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Discover the Power of Taekwondo
              </h1>
              <p className="text-lg mb-8">
                Build confidence, strength, and discipline through our
                expert-led classes for all ages and skill levels.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/trial">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Try a Free Class
                  </Button>
                </Link>
                <Link href="/#classes">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white/10"
                  >
                    View Schedule
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              {/* Image placeholder - replace with actual image in production */}
              <div className="bg-blue-400 h-96 rounded-lg flex items-center justify-center">
                <span className="text-lg font-semibold">
                  Taekwondo Training Image
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16" id="classes">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Children's Class */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">
                Children&apos;s Classes
              </h3>
              <p className="text-gray-600 mb-4">
                Fun and engaging classes designed to build coordination,
                confidence, and focus for children ages 4-12.
              </p>
              <Link href="/trial?type=children">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Teen's Class */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Teen Classes</h3>
              <p className="text-gray-600 mb-4">
                Dynamic training for teenagers focusing on discipline,
                self-defense, and physical fitness in a supportive environment.
              </p>
              <Link href="/trial?type=teen">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Adult's Class */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Adult Classes</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive training for adults of all fitness levels,
                combining traditional techniques with modern training methods.
              </p>
              <Link href="/trial?type=adult">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50" id="about">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            About Our Gym
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Philosophy</h3>
              <p className="text-gray-600 mb-6">
                At GG Taekwondo, we believe in developing the whole person -
                mind, body, and spirit. Our training focuses on traditional
                Taekwondo values of courtesy, integrity, perseverance,
                self-control, and indomitable spirit.
              </p>
              <h3 className="text-2xl font-bold mb-4">Expert Instruction</h3>
              <p className="text-gray-600">
                Our certified instructors bring years of experience and a
                passion for teaching. We provide personalized attention to help
                each student achieve their full potential.
              </p>
            </div>
            <div>
              {/* Image placeholder - replace with actual image in production */}
              <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                <span className="text-lg font-semibold">Instructor Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Join us for a free trial class and experience the benefits of
            Taekwondo training firsthand. No experience necessary!
          </p>
          <Link href="/trial">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Sign Up for a Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">GG Taekwondo</h3>
              <p className="text-gray-400">
                Building stronger minds and bodies through the art of Taekwondo.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/#classes"
                    className="text-gray-400 hover:text-white"
                  >
                    Classes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#about"
                    className="text-gray-400 hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trial"
                    className="text-gray-400 hover:text-white"
                  >
                    Free Trial
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <address className="text-gray-400 not-italic">
                123 Martial Arts Way
                <br />
                Taekwondo City, TC 12345
                <br />
                <a href="tel:+1234567890" className="hover:text-white">
                  123-456-7890
                </a>
                <br />
                <a
                  href="mailto:info@ggtaekwondo.com"
                  className="hover:text-white"
                >
                  info@ggtaekwondo.com
                </a>
              </address>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Hours</h4>
              <ul className="text-gray-400">
                <li>Monday - Friday: 9am - 9pm</li>
                <li>Saturday: 10am - 4pm</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} GG Taekwondo. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
