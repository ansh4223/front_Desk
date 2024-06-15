import React, { useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import FilterPopup from './FilterPopup';

interface FilterButtonProps {
  filteredData: any; // Replace `any` with the type of your filtered data
  setFilteredData: React.Dispatch<React.SetStateAction<any>>; // Adjust according to the type of setFilteredData
}

const FilterButton: React.FC<FilterButtonProps> = ({ filteredData, setFilteredData }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(prevShowPopup => !prevShowPopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button className="flex items-center text-blue-500" onClick={togglePopup}>
        <BsFilter className="mr-2" />
        Add Filter
      </button>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[612px] h-[400px] relative border-4 border-yellow-500">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
              onClick={handleClosePopup}
            >
              &times;
            </button>
            <FilterPopup onClose={handleClosePopup} filteredData={filteredData} setFilteredData={setFilteredData} />
          </div>
        </div>
      )}
    </>
  );
};

export default FilterButton;
