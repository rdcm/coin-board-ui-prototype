import React, { useEffect, useState } from 'react';

interface CurrencyRate {
  id: string;
  symbol: string;
  name: string;
  image: string;
  last_updated: string;
  current_price: number;
}

const CurrencyTable: React.FC = () => {
  const [rates, setRates] = useState<CurrencyRate[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rates`);
      const json = await res.json();
      const rates = json['rates'] as CurrencyRate[];
      setRates(rates);
    }

    fetchData();
  }, []);


  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Image</th>
          <th>Current Price</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate, index) => (
          <tr key={rate.id}>
            <td>{index + 1}</td>
            <td>{rate.name}</td>
            <td>
              <img src={rate.image} alt={rate.name} width="50" />
            </td>
            <td>{rate.current_price}$</td>
            <td>{new Date(rate.last_updated).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyTable;