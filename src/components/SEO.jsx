import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.royalelyssa.com";

const SEO = ({
  title,
  description,
  canonical,
  ogImage = "https://res.cloudinary.com/dxoje33mm/image/upload/f_avif/v1759477822/thalion-royalelyssa.jpg__3876x1912_q85_crop_subsampling-2_upscale_qxd1c0.jpg",
  noindex = false,
  structuredData = null,
}) => {
  const fullTitle = title
    ? `${title} | Royal Elyssa Thalasso & Spa`
    : "Royal Elyssa Thalasso & Spa | Monastir, Tunisie";

  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Hreflang — per page */}
      {canonicalUrl && <link rel="alternate" hreflang="fr-FR" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hreflang="fr-CH" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hreflang="fr-TN" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hreflang="en" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hreflang="ru" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hreflang="x-default" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Royal Elyssa Thalasso &amp; Spa" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {/* Per-page JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
