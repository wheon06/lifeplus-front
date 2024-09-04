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
  const data = {
    labels: dateList.map((date) => date.toLocaleDateString()),
    datasets: [
      {
        label: '심박수',
        backgroundColor: 'rgba(209,0,0,0.2)',
        borderColor: 'rgba(209,0,0,1)',
        data: heartRateList,
      },
      {
        label: '산소포화도',
        backgroundColor: 'rgba(0, 125, 209,0.2)',
        borderColor: 'rgba(0, 125, 209,1)',
        data: oxygenSaturationList,
      },
      {
        label: '체온',
        backgroundColor: 'rgba(37, 186, 0,0.2)',
        borderColor: 'rgba(37, 186, 0,1)',
        data: temperatureList,
      },
      {
        label: '스트레스',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        data: stressList,
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
