import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>

        <p>{currentYear} Grit & Glory Taekwondo. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
