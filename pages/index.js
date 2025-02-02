import React from 'react';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import PhoneCard from '@/components/PhoneCard';
import SearchBar from '@/components/SearchBar';
import useDebounce from '@/hooks/useDebounce';
import Layout from '@/components/Layout';
import { getProducts, searchProducts } from '@/services/api';

export async function getServerSideProps() {
  try {
    const initialPhones = await getProducts(20);
    return { props: { initialPhones } };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { props: { initialPhones: [] } };
  }
}

export default function Home({ initialPhones }) {
  const [phones, setPhones] = useState(initialPhones);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const fetchPhones = async () => {
    if (debouncedSearch) {
      try {
        const results = await searchProducts(debouncedSearch);
        setPhones(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setPhones(initialPhones);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, [debouncedSearch, initialPhones]);

  return (
    <Layout>
      <div className="header">
        <SearchBar search={search} setSearch={setSearch} />
        <div className="results">{phones.length} RESULTS</div>
      </div>
      <div className="grid grid__phones">
        {phones.map((phone, index) => (
          <PhoneCard
            key={index}
            phone={phone}
            handleAction={() => Router.push(`/phone/${phone?.id}`)}
          />
        ))}
      </div>
    </Layout>
  );
}
