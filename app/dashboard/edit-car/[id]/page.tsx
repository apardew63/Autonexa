import { notFound } from 'next/navigation';
import EditCarClient from '../../components/EditCarClient';

export async function generateStaticParams() {
  try {
    const res = await fetch('https://autonexa-server.vercel.app/api/listings');
    if (!res.ok) throw new Error('Failed to fetch listings');
    const listings = await res.json() as { _id: string }[];
    return listings.map((listing) => ({
      id: listing._id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getCar(id: string) {
  try {
    const res = await fetch(`https://autonexa-server.vercel.app/api/listings/${id}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch car');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching car:', error);
    return null;
  }
}

export default async function EditCarPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id);

  if (!car) {
    notFound();
  }

  return <EditCarClient />;
}