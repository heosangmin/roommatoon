import groq from "groq";
import { loadQuery, type SanityImage } from "./sanity";

export type EntryKind = "webtoon" | "video" | "photo";
export interface ArchiveSettings {
  title?: string;
  intro?: string;
  profileImage?: SanityImage;
  role?: string;
  bio?: string;
  history?: string[];
  website?: string;
  email?: string;
  instagram?: string;
  youtube?: string;
  shopUrl?: string;
}
export interface Trip {
  _id: string;
  title: string;
  slug: { current: string };
  country: string;
  city?: string;
  period?: string;
  cover?: SanityImage;
  featured?: boolean;
  news?: { _key: string; label: string; url?: string }[];
}
export interface ArchiveEntry {
  _id: string;
  title: string;
  slug: { current: string };
  trip: { _id: string; title: string; slug: { current: string }; country: string; city?: string };
  kind: EntryKind;
  episode?: number;
  date?: string;
  location?: string;
  thumbnail?: SanityImage;
  images?: (SanityImage & { _key: string; caption?: string })[];
  videoUrl?: string;
  body?: import("@portabletext/types").PortableTextBlock[];
}
export interface ArchiveProduct {
  _id: string;
  title: string;
  category: string;
  trip?: { title: string };
  image?: SanityImage;
  shopUrl?: string;
}

const image = `{
  ...,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;
const entryFields = `
  _id, title, slug, kind, episode, date, location, videoUrl, body,
  thumbnail ${image},
  images[]{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height},
  trip->{_id, title, slug, country, city}
`;

export const getArchiveSettings = () => loadQuery<ArchiveSettings | null>(
  groq`*[_type == "archiveSettings"][0]{title, intro, profileImage ${image}, role, bio, history, website, email, instagram, youtube, shopUrl}`,
);

export const getTrips = () => loadQuery<Trip[]>(
  groq`*[_type == "trip" && defined(slug.current)] | order(order asc, _createdAt desc){_id, title, slug, country, city, period, featured, cover ${image}, news}`,
);

export const getTrip = (slug: string) => loadQuery<Trip | null>(
  groq`*[_type == "trip" && slug.current == $slug][0]{_id, title, slug, country, city, period, featured, cover ${image}, news}`,
  { slug },
);

export const getEntryCounts = () => loadQuery<{ tripId: string; kind: EntryKind }[]>(
  groq`*[_type == "archiveEntry" && defined(trip._ref) && defined(slug.current)]{"tripId": trip._ref, kind}`,
);

export const getTripEntries = (tripId: string) => loadQuery<ArchiveEntry[]>(
  groq`*[_type == "archiveEntry" && trip._ref == $tripId && defined(slug.current)] | order(order asc, _createdAt asc){${entryFields}}`,
  { tripId },
);

export const getArchiveProducts = () => loadQuery<ArchiveProduct[]>(
  groq`*[_type == "archiveProduct"] | order(order asc, _createdAt desc){_id, title, category, shopUrl, image ${image}, trip->{title}}`,
);

export function youtubeEmbedUrl(value?: string): string | undefined {
  if (!value) return;
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");
    const id = host === "youtu.be" ? url.pathname.slice(1) :
      host === "youtube.com" ? (url.pathname === "/watch" ? url.searchParams.get("v") : url.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1]) : undefined;
    return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : undefined;
  } catch { return; }
}
