"use client";
import React from "react";

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: `We collect several different types of information for various purposes to improve our services to you. This includes Personal Information such as your name, contact information, emergency contact information, age, and payment information, as well as Usage Data about how you access and use the Site.`,
  },
  {
    id: "use-of-your-information",
    title: "Use of Your Information",
    content: `We use the information we collect for various purposes, including to provide and maintain the Site, process your registration and enrollment requests, send you important information about our programs, events, and promotions, personalize your experience on the Site, improve the Site and our services, and for other business purposes such as data analysis and security.`,
  },
  {
    id: "sharing-your-information",
    title: "Sharing Your Information",
    content: `We may share your information with third-party service providers who help us operate the Site and provide our services. These service providers are obligated to use your information only to perform the services they are contracted for and are bound by this Privacy Policy or similar restrictions.`,
  },
  {
    id: "data-security",
    title: "Data Security",
    content: `We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no website or internet transmission is completely secure.`,
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: `Our Site is not directed to children under the age of 13. We do not knowingly collect Personal Information from children under 13. If you are a parent or guardian and you believe your child has provided us with Personal Information, please contact us.`,
  },
  {
    id: "your-choices",
    title: "Your Choices",
    content: `You have certain choices regarding your information. You can access, update, or delete your Personal Information by contacting us. You can opt out of receiving marketing and promotional communications from us by following the unsubscribe instructions in those communications.`,
  },
  {
    id: "changes-to-this-policy",
    title: "Changes to This Policy",
    content: `We may update this Policy from time to time. We will notify you of any changes by posting the new Policy on the Site.`,
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: `If you have any questions about this Policy, please contact us by email at gritandglorytkd@gmail.com.`,
  },
];

const PrivacyPolicy = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">
            Children&apos;s Privacy
          </h2>
          <p className="text-gray-700">
            We take children&apos;s privacy very seriously. We are committed to
            complying with all applicable laws and regulations regarding the
            collection, use, and disclosure of information from children under
            the age of 13 &quot;Children&quot;.
          </p>
          <ul className="list-disc pl-4 text-gray-700">
            <li>
              We only collect limited Personal Information from a parent or
              guardian when registering a child for a program or trial class:
              <ul className="list-disc pl-4 text-gray-700">
                <li>Child&apos;s Name</li>
                <li>Age</li>
                <li>
                  Parent/Guardian Contact Information (email address, phone
                  number)
                </li>
                <li>Emergency Contact Information (if applicable)</li>
              </ul>
            </li>
            <li>
              We do not knowingly collect any other Personal Information from
              Children without verifiable parental consent.
            </li>
            <li>
              As a parent or guardian, you have the right to:
              <ul className="list-disc pl-4 text-gray-700">
                <li>
                  Access, update, or delete your child&apos;s Personal
                  Information by contacting us.
                </li>
                <li>
                  Refuse to permit further collection of your child&apos;s
                  Personal Information.
                </li>
                <li>
                  Request that we cease using or disclosing your child&apos;s
                  Personal Information.
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">
            Information We Collect
          </h2>
          <p className="text-gray-700">
            We collect several different types of information for various
            purposes to improve our services to you.
          </p>
          <ul className="list-disc pl-4 text-gray-700">
            <li>
              **For Adults:** Name, contact information (email address, phone
              number), payment information (if applicable).
            </li>
            <li>
              **For Children (Collected from Parent/Guardian):** Child&apos;s
              Name, Age, Parent/Guardian Contact Information (email address,
              phone number), Emergency Contact Information (if applicable).
            </li>
            <li>
              **Usage Data:** We may also collect information about how you
              access and use the Site, such as the pages you view, the time you
              spend on the Site, and the links you click on. This information is
              collected automatically through cookies and other tracking
              technologies.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">
            Use of Your Information
          </h2>
          <p className="text-gray-700">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc pl-4 text-gray-700">
            <li>To provide and maintain the Site</li>
            <li>
              To process your registration and enrollment requests (adults and
              children)
            </li>
            <li>
              To send you important information about our programs, events, and
              promotions (adults)
            </li>
            <li>
              To send important information about our programs, events, and
              promotions relevant to children (e.g., kids&apos; camps)
            </li>
            <li>To personalize your experience on the Site (adults)</li>
            <li>To improve the Site and our services</li>
            <li>
              To send you marketing and promotional communications (adults)
              (with your consent)
            </li>
            <li>
              To respond to your inquiries and requests (adults and children)
            </li>
            <li>
              For other business purposes, such as data analysis and security
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">
            Sharing Your Information
          </h2>
          <p className="text-gray-700">
            We may share your information with third-party service providers who
            help us operate the Site and provide our services. These service
            providers are obligated to use your information only to perform the
            services they are contracted for and are bound by this Privacy
            Policy or similar restrictions.
          </p>
          <p className="text-gray-700">
            We will not share your Personal Information with any third party for
            marketing or promotional purposes without your consent (adults). We
            will never share your child&apos;s Personal Information with any
            third party for marketing or promotional purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">Data Security</h2>
          <p className="text-gray-700">
            We take reasonable steps to protect your information from
            unauthorized access, disclosure, alteration, or destruction. This
            includes implementing measures like secure servers, encryption, and
            access controls to safeguard the information we collect,
            particularly for Children&apos;s Personal Information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">Retention</h2>
          <p className="text-gray-700">
            We will retain your Personal Information for as long as necessary to
            fulfill the purposes for which it was collected and to comply with
            any legal or regulatory requirements. We will then securely delete
            your information unless your consent is obtained for longer
            retention.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">Your Choices (Adults)</h2>
          <p className="text-gray-700">
            You have certain choices regarding your information:
          </p>
          <ul className="list-disc pl-4 text-gray-700">
            <li>
              You can access, update, or delete your Personal Information by
              contacting us.
            </li>
            <li>
              You can opt out of receiving marketing and promotional
              communications from us by following the unsubscribe instructions
              in those communications.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">
            Changes to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Policy from time to time. We will notify you of
            any changes by posting the new Policy on the Site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Policy, please contact us by
            email at gritandglorytkd@gmail.com
          </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
