import dynamic from 'next/dynamic';

const IranMap = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  return <IranMap />;
}
