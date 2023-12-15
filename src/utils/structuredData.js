export const Organization = () => `
{
  "@context": "http://schema.org",
  "@type": "Organization",
  "name": "Teamly",
  "url": "https://www.teamly.uz",
  "description": "A leading IT company providing comprehensive technology solutions.",
  "logo": "https://www.teamly.uz/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer support"
  },
  "areaServed": "Global",
  "serviceArea": {
    "@type": "AdministrativeArea",
    "name": "Worldwide"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "IT Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SEO Analytics",
          "description": "Optimizing websites for search engines and providing analytics for improved visibility."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Development",
          "description": "Creating and maintaining websites with a focus on functionality and user experience."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Product Research",
          "description": "Conducting research to identify market trends and opportunities for new product development."
        }
      }
    ]
  },
  "employees": [
    {
      "@type": "Person",
      "name": "Mirakhmad Mirzajonov",
      "jobTitle": "CEO"
    }
  ]
}`
