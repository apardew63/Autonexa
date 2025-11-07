import { notFound } from 'next/navigation';
import ListingDetailClient from '../../../components/ListingDetailClient';

export async function generateStaticParams() {
  try {
    const res = await fetch('https://autonexa-server.vercel.app/api/listings');
    if (!res.ok) throw new Error('Failed to fetch listings');
    const listings = await res.json();
    return listings.map((listing) => ({
      id: listing._id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getListing(id) {
  try {
    const res = await fetch(`https://autonexa-server.vercel.app/api/listings/${id}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch listing');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
}

export default async function ListingDetail({ params }) {
  const listing = await getListing(params.id);

  if (!listing) {
    notFound();
  }

  return <ListingDetailClient listing={listing} />;
}