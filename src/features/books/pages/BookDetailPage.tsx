import { useParams } from 'react-router-dom';

export default function BookDetailPage() {
  const { id } = useParams();
  return <h2 className='text-2xl font-bold'>Book Detail Page for ID: {id}</h2>;
}
