import Link from "next/link";
import TrialSignupForm from "./trial-signup-form";

export default function TrialPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">
            GG Taekwondo
          </Link>
          <nav>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Back to Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Trial Signup Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">
                Try a Free Taekwondo Class
              </h1>
              <p className="text-gray-600 max-w-xl mx-auto">
                Experience the benefits of Taekwondo training with a
                complimentary class. Fill out the form below to schedule your
                visit.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <TrialSignupForm />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">What to Expect</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>45-60 minute class depending on age group</li>
                  <li>Friendly, supportive environment</li>
                  <li>Basic techniques and movements</li>
                  <li>Meet our instructors and students</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">What to Bring</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Comfortable workout clothes</li>
                  <li>Water bottle</li>
                  <li>Towel (optional)</li>
                  <li>Your enthusiasm and questions!</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">After Your Trial</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Discuss your experience with an instructor</li>
                  <li>Learn about membership options</li>
                  <li>No pressure to join right away</li>
                  <li>Special first-time member discounts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} GG Taekwondo. All rights reserved.
          </p>
          <p className="text-gray-400">
            Questions? Call us at{" "}
            <a href="tel:+1234567890" className="hover:text-white">
              123-456-7890
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
