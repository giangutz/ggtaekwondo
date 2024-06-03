import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/about", "/classes", "/contact", "/instructors", "/schedule"],
      disallow: ["/admin", "/api", "/parent", "/dashboard"],
    },
    sitemap: "https://yourdomain.com/sitemap.xml",
  };
}