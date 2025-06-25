import React from 'react';
import { useParams } from 'react-router';
import useAuthor from '../hooks/useAuthor';
import Container from '../customs/Container';
import { MdLocationPin } from 'react-icons/md';
import { format } from 'date-fns';
import { IoIosPeople } from 'react-icons/io';
import { RxLapTimer } from 'react-icons/rx';
import { FaPhone } from 'react-icons/fa';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Loading from '../components/Loading';
import RequestFood from '../components/RequestFood';
import { imageError } from '../utilities/myplaceholder';
import useAxios from '../hooks/useAxios';

export default function FoodDetails() {

  const { id } = useParams();

  const axiosSecure = useAxios();

  const { data: food = {}, isLoading } = useQuery({
    queryKey: ['food'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/foods/${id}`);
      return res.data;
    }
  });

  const { author, name, image_url, pickup_location, expired_date, quantity, comment, contact, status } = food;

  const { authorData, authorLoading } = useAuthor(author);
  const { first_name, last_name, photo_url, email } = authorData;

  

  if (isLoading) return <Loading/>;

  return (
    <Container>
      <section className='w-full min-h-120 shadow-sm rounded-lg p-4 border-[1px] border-secondary/50 relative grid grid-cols-1 md:grid-cols-3 gap-5 overflow-hidden'>
        <div className='h-full md:h-100 lg:h-120 w-full overflow-hidden rounded-lg'>
          <img className='w-full h-full object-cover' src={image_url} alt={name} onError={imageError} />
        </div>

        <div className='col-span-1 md:col-span-2 flex flex-col gap-3 pt-2 overflow-hidden group'>
          <div className="w-80 h-80 border-80 border-secondary/8 rounded-full absolute -bottom-30 -right-30 group-hover:scale-120 transition-all duration-800" />

          <span className="absolute top-2 right-2 text-sm flex items-center gap-2 border-[1px] px-2 py-1 rounded-full border-green-200 bg-base-100 z-3">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-green-500" />
            </span>
            <span className="pr-2 text-sm text-green-500">{status}</span>
          </span>

          <div className='text-2xl md:text-3xl font-semibold border-l-2 border-secondary pl-3 mb-3'>
            {name}
          </div>

          {!authorLoading && (
            <div className='flex items-center gap-2 bg-base-200 rounded-lg p-3 md:w-fit'>
              <img className='w-12 h-12 object-cover rounded-full border-2 border-secondary' src={photo_url} alt={first_name} />
              <div className='flex flex-col'>
                <span className='font-semibold'>{first_name && `${first_name} ${last_name}`}</span>
                <span className='text-sm opacity-85'>{email}</span>
              </div>
            </div>
          )}

          <div className='text-xl lg:text-2xl flex items-center gap-2'>
            <span className="h-8 w-8 flex justify-center items-center rounded-full border-[1px] border-gray-200 text-secondary"><MdLocationPin /></span>
            <span className='hidden lg:block'>Location :</span>
            <span>{pickup_location}</span>
          </div>

          <div className='text-xl lg:text-2xl flex items-center gap-2'>
            <span className="h-8 w-8 flex justify-center items-center rounded-full border-[1px] border-gray-200 text-secondary"><RxLapTimer /></span>
            <span className='hidden lg:block'>Expired On :</span>
            <span>{expired_date && format(new Date(expired_date), "PPP")}</span>
          </div>

          <div className='text-xl lg:text-2xl flex items-center gap-2'>
            <span className="h-8 w-8 flex justify-center items-center rounded-full border-[1px] border-gray-200 text-secondary"><IoIosPeople /></span>
            <span>Quantity (Person) :</span>
            <span className='font-semibold'>{quantity}</span>
          </div>

          <div className='text-xl lg:text-2xl flex items-center gap-2'>
            <span className="h-8 w-8 flex justify-center items-center rounded-full border-[1px] border-gray-200 text-secondary"><FaPhone size={20} /></span>
            <span className='hidden lg:block'>Contact :</span>
            <span>{contact}</span>
          </div>

          <div className='p-2 border-[1px] border-gray-200 mt-2 rounded-lg'>
            {comment ? comment : "No Other Information"}
          </div>

          <div className='w-70 md:absolute bottom-4 right-4'>
            <RequestFood item={food} />
          </div>
        </div>
      </section>
    </Container>
  );
}
