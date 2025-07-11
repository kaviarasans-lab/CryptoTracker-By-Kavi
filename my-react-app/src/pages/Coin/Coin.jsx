import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-WDC2jiUM7kZtS84pqnWLrZjg'
      }
    };

    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await res.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-WDC2jiUM7kZtS84pqnWLrZjg'
      }
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      const data = await res.json();
      setHistoricalData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]);

  if (coinData && historicalData) {
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData?.image?.large} alt={coinData?.name} />
          <p><b>{coinData?.name} ({coinData?.symbol?.toUpperCase()})</b></p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>
      </div>
    );
  } else {
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
