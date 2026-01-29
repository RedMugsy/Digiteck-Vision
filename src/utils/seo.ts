import { siteContent } from "../content";

/**
 * SEO utilities for managing meta tags from content.ts
 * Extracts tags from all sections and generates appropriate meta tags
 */

export function getAllTags(): string[] {
  const tags = new Set<string>();
  
  // Extract tags from hoverTable (Industries)
  siteContent.hoverTable.rows.forEach(row => {
    if (row.tags) {
      row.tags.forEach(tag => tags.add(tag));
    }
  });
  
  // Extract tags from productFlip (Solutions)
  siteContent.productFlip.products.forEach(product => {
    if (product.tags) {
      product.tags.forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags);
}

export function generateKeywords(): string {
  const tags = getAllTags();
  return tags.join(", ");
}

export function updateMetaTags() {
  // Update or create keywords meta tag
  let keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (!keywordsMeta) {
    keywordsMeta = document.createElement('meta');
    keywordsMeta.setAttribute('name', 'keywords');
    document.head.appendChild(keywordsMeta);
  }
  keywordsMeta.setAttribute('content', generateKeywords());
  
  // Update or create description meta tag
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    document.head.appendChild(descriptionMeta);
  }
  descriptionMeta.setAttribute('content', siteContent.hero.tagline);
  
  // Add Open Graph tags
  updateOGTag('og:title', siteContent.hero.title);
  updateOGTag('og:description', siteContent.hero.tagline);
  updateOGTag('og:type', 'website');
  
  // Add Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', siteContent.hero.title);
  updateMetaTag('twitter:description', siteContent.hero.tagline);
}

function updateOGTag(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function updateMetaTag(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Get tags for a specific industry by number
 */
export function getIndustryTags(industryNumber: string): string[] {
  const industry = siteContent.hoverTable.rows.find(row => row.n === industryNumber);
  return industry?.tags || [];
}

/**
 * Get tags for a specific product by id
 */
export function getProductTags(productId: number): string[] {
  const product = siteContent.productFlip.products.find(p => p.id === productId);
  return product?.tags || [];
}

/**
 * Generate JSON-LD structured data for SEO
 */
export function generateStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteContent.hero.title,
    "description": siteContent.hero.tagline,
    "keywords": getAllTags(),
    "offers": siteContent.productFlip.products.map(product => ({
      "@type": "Service",
      "name": product.backTitle,
      "description": product.backBody,
      "keywords": product.tags
    })),
    "areaServed": siteContent.hoverTable.rows.map(row => ({
      "@type": "Industry",
      "name": row.title,
      "description": row.description,
      "keywords": row.tags
    }))
  };
  
  return JSON.stringify(structuredData);
}

export function injectStructuredData() {
  let script = document.querySelector('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }
  script.textContent = generateStructuredData();
}
