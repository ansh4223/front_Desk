import React, { useState, useEffect } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import ScheduledDate from './ScheduledDate';
import People from './People';
import ServicesProducts from './ServicesProducts';

interface FilterPopupProps {
  onClose: () => void;
  setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
  filteredData: any[];
}

const FilterPopup: React.FC<FilterPopupProps> = ({ onClose, setFilteredData, filteredData }) => {
  const [selectedSection, setSelectedSection] = useState('Scheduled Date');
  const [isMounted, setIsMounted] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string[]>([]);
  const [showOrdersFor, setShowOrdersFor] = useState('All time');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function filterDataByDateRange(data: any[], fromDate: string, toDate: string, selectedPeople: string[], selectedService: string[]) {
    const fromDateTime = fromDate ? new Date(`${fromDate}T00:00:00`) : null;
    const toDateTime = toDate ? new Date(`${toDate}T23:59:59`) : null;
    const filteredData1 = data.filter(item => {
      const scheduledDateTime = new Date(item.scheduled);
      const isWithinDateRange = (!fromDateTime || scheduledDateTime >= fromDateTime) &&
                                (!toDateTime || scheduledDateTime <= toDateTime);
      const isPayerIncluded = selectedPeople.length === 0 || selectedPeople.includes(item.payer);
      const isServiceIncluded = selectedService.length === 0 || selectedService.includes(item.services);
      return isWithinDateRange && isPayerIncluded && isServiceIncluded;
    });
    setFilteredData(filteredData1);
  }

  const handleApply = () => {
    filterDataByDateRange(filteredData, fromDate, toDate, selectedPeople, selectedService);
    onClose();
  };

  const handleReset = () => {
    setFromDate('');
    setToDate('');
    setSelectedPeople([]);
    setSelectedService([]);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-full h-full">
      <div className="flex flex-1">
        <aside className="w-1/4 bg-gray-200 p-4 border-r border-gray-300">
          <ul>
            <li className="mb-2">
              <button
                className={`w-full flex items-center text-left p-2 hover:bg-gray-300 rounded ${
                  selectedSection === 'Scheduled Date' ? 'bg-gray-300' : ''
                }`}
                onClick={() => setSelectedSection('Scheduled Date')}
              >
                <AiOutlineCalendar className="mr-2" />
                Scheduled Date
              </button>
            </li>
            <li className="mb-2">
              <button
                className={`w-full flex items-center text-left p-2 hover:bg-gray-300 rounded ${
                  selectedSection === 'People' ? 'bg-gray-300' : ''
                }`}
                onClick={() => setSelectedSection('People')}
              >
                <FaRegUser className="mr-2" />
                People
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center text-left p-2 hover:bg-gray-300 rounded ${
                  selectedSection === 'Services / Products' ? 'bg-gray-300' : ''
                }`}
                onClick={() => setSelectedSection('Services / Products')}
              >
                <MdOutlineProductionQuantityLimits className="mr-2" />
                Services / Products
              </button>
            </li>
          </ul>
        </aside>
        <main className="flex-1 bg-white p-6 border-l border-gray-300 overflow-y-auto">
          {selectedSection === 'Scheduled Date' && (
            <ScheduledDate
            showOrdersFor={showOrdersFor}
            setShowOrdersFor={setShowOrdersFor}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            />
          )}
          {selectedSection === 'People' && (
            <People
              selectedPeople={selectedPeople}
              setSelectedPeople={setSelectedPeople}
            />
          )}
          {selectedSection === 'Services / Products' && (
            <ServicesProducts
              selectedService={selectedService}
              setSelectedService={setSelectedService}
            />
          )}
        </main>
      </div>
      <div className="flex justify-end p-4 border-t border-gray-300">
        <button
          className="bg-gray-200 text-gray-700 rounded px-4 py-2 text-sm"
          onClick={handleReset}
        >
          Reset to Default
        </button>
        <button
          className="bg-blue-500 text-white rounded px-4 py-2 ml-2 text-sm"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterPopup;
