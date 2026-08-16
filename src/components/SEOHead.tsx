import { useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface SEOHeadProps {
  activeSection?: string;
}

export function SEOHead({ activeSection }: SEOHeadProps) {
  useEffect(() => {
    // Dynamic document title
    const sectionTitle = activeSection ? `${activeSection.toUpperCase()} | ` : '';
    document.title = `${sectionTitle}${PERSONAL_INFO.name}, ${PERSONAL_INFO.credentials} - Senior Systems Integrator & IT Project Manager`;

    // Dynamic Meta Tags
    const metaDescription = document.querySelector('meta[name="description"]');
    const descriptionText = `${PERSONAL_INFO.name}, ${PERSONAL_INFO.credentials} - ${PERSONAL_INFO.title} with 15+ years experience in physical security systems (Milestone, Lenel, CCURE), IT infrastructure, and 24x7 healthcare operations.`;

    if (metaDescription) {
      metaDescription.setAttribute('content', descriptionText);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descriptionText;
      document.head.appendChild(meta);
    }

    // JSON-LD Structured Data Schema for Person
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": PERSONAL_INFO.name,
      "jobTitle": PERSONAL_INFO.title,
      "honorificSuffix": PERSONAL_INFO.credentials,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Malden",
        "addressRegion": "MA",
        "postalCode": "02148",
        "addressCountry": "US"
      },
      "email": PERSONAL_INFO.email,
      "telephone": PERSONAL_INFO.phone,
      "url": "https://www.linkedin.com/in/asem-alhammadi",
      "sameAs": [
        PERSONAL_INFO.linkedin
      ],
      "knowsAbout": [
        "Physical Security Integration",
        "Milestone XProtect VMS",
        "Lenel OnGuard Access Control",
        "CCURE 9000",
        "IT Project Management",
        "PMP Certification",
        "Healthcare Operations",
        "Network Engineering",
        "AWS Cloud Architecture",
        "Active Directory"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Boston Medical Center"
      },
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "Boston University"
        },
        {
          "@type": "EducationalOrganization",
          "name": "University of Science and Technology"
        }
      ]
    };

    let scriptTag = document.getElementById('seo-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData);

  }, [activeSection]);

  return null;
}
