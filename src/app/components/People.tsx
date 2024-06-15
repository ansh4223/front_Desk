import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';

interface WaitlistItem {
  createdOn: string;
  payer: string;
  status: string;
  email: string;
  phone: string;
  services: string;
  scheduled: string;
}

interface PeopleProps {
  selectedPeople: string[];
  setSelectedPeople: React.Dispatch<React.SetStateAction<string[]>>;
}

const People: React.FC<PeopleProps> = ({ selectedPeople, setSelectedPeople }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [waitlistData, setWaitlistData] = useState<WaitlistItem[]>([]);
  const [filteredData, setFilteredData] = useState<WaitlistItem[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    fetch('/waitlistData.json')
      .then(response => response.json())
      .then(data => {
        setWaitlistData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    let filtered: WaitlistItem[] = [];
    if (searchTerm !== '') {
      filtered = waitlistData.filter(item =>
        item.payer?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setShowNoResults(filtered.length === 0);
    } else {
      setShowNoResults(false);
    }
    filtered.sort((a, b) => a.payer.localeCompare(b.payer));
    setFilteredData(filtered);
  }, [searchTerm, waitlistData]);

  const resultCount = filteredData.length;
  const resultMessage =
    resultCount > 0
      ? `Showing ${resultCount} result${resultCount !== 1 ? 's' : ''} matching '${searchTerm}'`
      : `No results found matching '${searchTerm}'`;

  const handleCheckboxChange = (payer: string) => {
    setSelectedPeople(prevSelected => {
      if (prevSelected.includes(payer)) {
        return prevSelected.filter(item => item !== payer);
      } else {
        return [...prevSelected, payer];
      }
    });
  };

  return (
    <div className="relative w-[350px]">
      <div className="relative w-full h-[28px]">
        <input
          type="text"
          className="w-full h-full pl-12 pr-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          placeholder="Search Payer or attendee name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <CiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>

      {searchTerm !== '' && (
        <div className="mt-2 text-xs text-gray-600">
          {resultMessage}
        </div>
      )}

      <div className="mt-2 w-full max-h-64 overflow-y-auto" style={{height : '13rem'}}>
        {filteredData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 border-b border-gray-300">
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(item.payer)}
                checked={selectedPeople.includes(item.payer)}
                className="form-checkbox h-4 w-4 text-gray-600 mr-2"
              />
              <div className="text-sm font-medium text-gray-900">{item.payer}</div>
            </div>
            <div>
              <span
                className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                  item.status === "Active"
                    ? "bg-green-200 text-green-800"
                    : item.status === "Lead"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
        {showNoResults && (
          <div className="p-2 text-sm text-gray-600">No results found</div>
        )}
      </div>
    </div>
  );
}

export default People;
