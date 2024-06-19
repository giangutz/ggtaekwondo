import { socialMedia } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        {/* <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={50}
            height={50}
          />
        </Link> */}

        <p>© {currentYear} Grit & Glory Taekwondo. All Rights reserved.</p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          <Link
            className="text-blue-600 hover:text-blue-800"
            href="/privacy-policy"
          >
            Privacy & Policy
          </Link>
          <div className="flex items-center gap-4">
            {socialMedia.map((info) => (
              <a
                key={info.id}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black-200 border-black-300 saturate-180 hover:bg-black-300 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-lg backdrop-filter transition duration-150 ease-in-out"
              >
                <Image src={info.img} alt="icons" width={24} height={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
