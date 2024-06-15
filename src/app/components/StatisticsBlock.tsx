import React from 'react';

type StatisticsBlockProps = {
  label: string;
  value: number;
};

const StatisticsBlock: React.FC<StatisticsBlockProps> = ({ label, value }) => (
  <div className="flex-1 bg-gray-100 p-2 rounded shadow flex items-center justify-between">
    <div className="flex items-center">
      <span className="mr-2">{label}</span>
      <span className="text-gray-500">{value}</span>
    </div>
  </div>
);

export default StatisticsBlock;
