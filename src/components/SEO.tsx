import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  schema?: any;
}

const SEO: React.FC<SEOProps> = ({
  title = 'SmartBrew Solutions - Advanced Sales & Technology Solutions',
  description = 'SmartBrew Solutions provides cutting-edge sales technology, digital outreach tools, and business automation solutions. Transform your sales process with our AI-powered platforms and expert consulting services.',
  keywords = 'sales technology, business automation, digital marketing, CRM solutions, lead generation, sales consulting, SmartBrew, technology solutions, business growth, sales optimization',
  image = '/SmartBrew-og-image.png',
  url = 'https://smartbrew.in',
  type = 'website',
  author = 'SmartBrew Solutions',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  schema
}) => {
  const siteTitle = title.includes('SmartBrew') ? title : `${title} | SmartBrew Solutions`;
  const imageUrl = image.startsWith('http') ? image : `${url}${image}`;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SmartBrew Solutions",
    "description": description,
    "url": url,
    "logo": `${url}/SmartBrew Neon logo-01.png`,
    "foundingDate": "2022",
    "founder": {
      "@type": "Person",
      "name": "Himanshu Pandey"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "email": "info@smartbrew.in"
    },
    "sameAs": [
      "https://linkedin.com/company/smartbrew-solutions",
      "https://twitter.com/smartbrew_in"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "Sales Technology Solutions",
        "description": "Advanced CRM and sales automation tools"
      },
      {
        "@type": "Service", 
        "name": "Digital Marketing Automation",
        "description": "Automated marketing campaigns and lead generation"
      },
      {
        "@type": "Service",
        "name": "Business Consulting",
        "description": "Strategic business growth and technology consulting"
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#1e40af" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="SmartBrew Solutions" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@smartbrew_in" />
      <meta name="twitter:creator" content="@smartbrew_in" />

      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>

      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
};

export default SEO; 