import React, { useEffect } from 'react';

interface ScheduledDateProps {
  showOrdersFor: string;
  setShowOrdersFor: (value: string) => void;
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
}

const ScheduledDate: React.FC<ScheduledDateProps> = ({
  showOrdersFor,
  setShowOrdersFor,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) => {
  useEffect(() => {
    const today = new Date();
    let newFromDate: string | null = null;
    let newToDate: string | null = null;

    switch (showOrdersFor) {
      case 'Last 30 days':
        newFromDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];
        newToDate = today.toISOString().split('T')[0];
        break;
      case 'This month':
        newFromDate = new Date(today.getFullYear(), today.getMonth(), 1)
          .toISOString()
          .split('T')[0];
        newToDate = today.toISOString().split('T')[0];
        break;
      case 'Last month':
        newFromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
          .toISOString()
          .split('T')[0];
        newToDate = new Date(today.getFullYear(), today.getMonth(), 0)
          .toISOString()
          .split('T')[0];
        break;
      case 'This quarter':
        newFromDate = new Date(
          today.getFullYear(),
          Math.floor(today.getMonth() / 3) * 3,
          1,
        )
          .toISOString()
          .split('T')[0];
        newToDate = today.toISOString().split('T')[0];
        break;
      case '2 quarters ago':
        newFromDate = new Date(today.getFullYear(), today.getMonth() - 6, 1)
          .toISOString()
          .split('T')[0];
        newToDate = new Date(today.getFullYear(), today.getMonth() - 3, 0)
          .toISOString()
          .split('T')[0];
        break;
      case 'This Year':
        newFromDate = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
        newToDate = today.toISOString().split('T')[0];
        break;
      case 'Last Year':
        newFromDate = new Date(today.getFullYear() - 1, 0, 1).toISOString().split('T')[0];
        newToDate = new Date(today.getFullYear() - 1, 11, 31).toISOString().split('T')[0];
        break;
      default:
        break;
    }

    if (newFromDate && newToDate) {
      setFromDate(newFromDate);
      setToDate(newToDate);
    }
  }, [showOrdersFor, setFromDate, setToDate]);

  const handleDateChange = (type: 'from' | 'to', value: string) => {
    if (type === 'from') {
      setFromDate(value);
    } else {
      setToDate(value);
    }
  };

  const handleShowOrdersChange = (value: string) => {
    setShowOrdersFor(value);
    if (value !== 'Custom' && value !== 'All time') {
      setFromDate('');
      setToDate('');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <div className="text-lg font-medium mb-2">Show orders for</div>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={showOrdersFor}
          onChange={(e) => handleShowOrdersChange(e.target.value)}
        >
          <option value="All time">All time</option>
          <option value="Custom">Custom</option>
          <option value="Last 30 days">Last 30 days</option>
          <option value="This month">This month</option>
          <option value="Last month">Last month</option>
          <option value="This quarter">This quarter</option>
          <option value="2 quarters ago">2 quarters ago</option>
          <option value="This Year">This Year</option>
          <option value="Last Year">Last Year</option>
        </select>
      </div>
      {(showOrdersFor === 'Custom' || showOrdersFor === 'All time') && (
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">From</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={fromDate}
              onChange={(e) => handleDateChange('from', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">To</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={toDate}
              onChange={(e) => handleDateChange('to', e.target.value)}
            />
          </div>
        </div>
      )}
      {[
        'Last 30 days',
        'This month',
        'Last month',
        'This quarter',
        '2 quarters ago',
        'This Year',
        'Last Year',
      ].includes(showOrdersFor) && (
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">From</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={fromDate}
              disabled
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">To</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={toDate}
              disabled
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduledDate;
