export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    _id,
    siteName,
    legalName,
    siteUrl,
    cvrNumber,
    "headerPrimaryLink": headerPrimaryLink{
      _key,
      label,
      linkType,
      openInNewTab,
      "href": select(
        linkType == "contact" => "#site-footer",
        linkType == "external" => externalUrl,
        internalPath
      )
    },
    "headerSecondaryLinks": headerSecondaryLinks[]{
      _key,
      label,
      linkType,
      openInNewTab,
      "href": select(
        linkType == "contact" => "#site-footer",
        linkType == "external" => externalUrl,
        internalPath
      )
    },
    "footerNavigation": footerNavigation[]{
      _key,
      label,
      linkType,
      openInNewTab,
      "href": select(
        linkType == "contact" => "#site-footer",
        linkType == "external" => externalUrl,
        internalPath
      )
    },
    footerHeading,
    caseContactHeading,
    email,
    phone,
    address{
      street,
      postalCode,
      city,
      country,
      mapUrl
    },
    "socialLinks": socialLinks[]{
      _key,
      platform,
      url
    },
    defaultSeo{
      metaTitle,
      metaDescription,
      "shareImage": shareImage{
        alt,
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }
    }
  }
`;

const MEDIA_PROJECTION = `
  mediaType,
  isDecorative,
  alt,
  videoTitle,
  hasAudio,
  objectFit,
  corner,
  autoplay,
  loop,
  muted,
  controls,
  image{
    asset->{
      _id,
      url,
      metadata{dimensions}
    },
    crop,
    hotspot
  },
  "videoUrl": video.asset->url,
  "videoMimeType": video.asset->mimeType,
  "captionsUrl": captions.asset->url,
  posterImage{
    asset->{
      _id,
      url,
      metadata{dimensions}
    },
    crop,
    hotspot
  }
`;

export const HOME_PAGE_QUERY = `
  *[_type == "homePage" && _id == "homePage"][0]{
    _id,
    hero{
      heading,
      body,
      "videoUrl": video.asset->url,
      "videoMimeType": video.asset->mimeType
    },
    clientLogos[]{
      _key,
      name,
      size,
      image{
        asset->{_id, url, metadata{dimensions}}
      }
    },
    featuredCasesHeading,
    "featuredCases": featuredCases[]->{
      _id,
      title,
      "slug": slug.current,
      introduction,
      projectDetails[]{
        _key,
        label,
        value
      },
      heroMedia{
        ${MEDIA_PROJECTION}
      }
    },
    services{
      heading,
      introduction,
      items[]{
        _key,
        heading,
        body,
        linkLabel,
        linkUrl
      }
    }
  }
`;

const CASE_CARD_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  introduction,
  projectDetails[]{
    _key,
    label,
    value
  },
  heroMedia{
    ${MEDIA_PROJECTION}
  }
`;

export const CASES_PAGE_QUERY = `
  {
    "page": *[_type == "casesPage" && _id == "casesPage"][0]{
      _id,
      heading,
      introduction,
      "cases": cases[]->{
        ${CASE_CARD_PROJECTION}
      },
      seo{
        metaTitle,
        metaDescription,
        "shareImage": shareImage{
          alt,
          "url": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height
        }
      }
    },
    "allCases": *[_type == "caseStudy"] | order(_createdAt desc){
      ${CASE_CARD_PROJECTION}
    }
  }
`;

export const CASE_STUDIES_QUERY = `
  *[_type == "caseStudy" && defined(slug.current)] | order(_createdAt desc){
    ${CASE_CARD_PROJECTION},
    contactPerson->{
      _id,
      name,
      role,
      email,
      phone,
      portrait{
        alt,
        asset->{
          _id,
          url,
          metadata{dimensions}
        },
        crop,
        hotspot
      }
    },
    contentBlocks[]{
      _key,
      _type,
      _type == "caseMediaSingle" => {
        media{${MEDIA_PROJECTION}}
      },
      _type == "caseMediaSplit" => {
        leftMedia{${MEDIA_PROJECTION}},
        rightMedia{${MEDIA_PROJECTION}}
      },
      _type == "caseMediaEditorial" => {
        topLeftMedia{${MEDIA_PROJECTION}},
        bottomLeftMedia{${MEDIA_PROJECTION}},
        rightMedia{${MEDIA_PROJECTION}}
      },
      _type == "caseMediaText" => {
        media{${MEDIA_PROJECTION}},
        heading,
        body
      }
    },
    seo{
      metaTitle,
      metaDescription,
      "shareImage": shareImage{
        alt,
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }
    }
  }
`;

const EMPLOYEE_PROJECTION = `
  _id,
  name,
  role,
  email,
  phone,
  portrait{
    alt,
    asset->{_id, url, metadata{dimensions}},
    crop,
    hotspot
  }
`;

export const ABOUT_PAGE_QUERY = `
  {
    "page": *[_type == "aboutPage" && _id == "aboutPage"][0]{
      _id,
      heading,
      introduction,
      firstStory{
        heading,
        body,
        media{${MEDIA_PROJECTION}}
      },
      middleStory{
        heading,
        body,
        leftMedia{${MEDIA_PROJECTION}},
        rightMedia{${MEDIA_PROJECTION}}
      },
      finalStory{
        heading,
        body,
        media{${MEDIA_PROJECTION}}
      },
      friendsBody,
      teamHeading,
      "employees": employees[]->{${EMPLOYEE_PROJECTION}},
      seo{
        metaTitle,
        metaDescription,
        "shareImage": shareImage{
          alt,
          "url": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height
        }
      }
    },
    "allEmployees": *[_type == "employee" && defined(name)] | order(name asc){
      ${EMPLOYEE_PROJECTION}
    }
  }
`;

export const ABOUT_TEASER_QUERY = `
  *[_type == "aboutPage" && _id == "aboutPage"][0].teaser{
    heading,
    body,
    buttonLabel,
    leftMedia{${MEDIA_PROJECTION}},
    rightMedia{${MEDIA_PROJECTION}}
  }
`;
