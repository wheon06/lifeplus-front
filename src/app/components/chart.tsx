import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartProps {
  heartRateList: number[];
  temperatureList: number[];
  oxygenSaturationList: number[];
  stressList: number[];
  dateList: Date[];
}

const Chart: React.FC<ChartProps> = ({
  heartRateList,
  temperatureList,
  oxygenSaturationList,
  stressList,
  dateList,
}) => {
  const safeHeartRateList = heartRateList.map((item) => item ?? 0);
  const safeTemperatureList = temperatureList.map((item) => item ?? 0);
  const safeOxygenSaturationList = oxygenSaturationList.map(
    (item) => item ?? 0,
  );
  const safeStressList = stressList.map((item) => item ?? 0);
  const safeDateList = dateList.map((date) =>
    date ? date.toLocaleDateString() : 'Invalid Date',
  );

  const data = {
    labels: safeDateList,
    datasets: [
      {
        label: '심박수',
        backgroundColor: 'rgba(209,0,0,0.2)',
        borderColor: 'rgba(209,0,0,1)',
        data: safeHeartRateList,
      },
      {
        label: '산소포화도',
        backgroundColor: 'rgba(0, 125, 209,0.2)',
        borderColor: 'rgba(0, 125, 209,1)',
        data: safeOxygenSaturationList,
      },
      {
        label: '체온',
        backgroundColor: 'rgba(37, 186, 0,0.2)',
        borderColor: 'rgba(37, 186, 0,1)',
        data: safeTemperatureList,
      },
      {
        label: '스트레스',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        data: safeStressList,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as
          | 'top'
          | 'bottom'
          | 'left'
          | 'right'
          | 'chartArea'
          | { [scaleId: string]: number }
          | undefined,
      },
      title: {
        display: true,
        text: '건강정보 그래프',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Chart;
