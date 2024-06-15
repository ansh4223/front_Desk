'use client';
import React, { useEffect, useState } from 'react';
import { BsSquare, BsDownload } from 'react-icons/bs';
import waitlistData from '../../public/waitlistData.json';
import WaitlistTable from './components/WaitlistTable';
import StatisticsBlock from './components/StatisticsBlock';
import FilterButton from './components/FilterButton';
import SearchBar from './components/SearchBar';
import RefreshButton from './components/RefreshButton';
import ColumnsPopup from './components/ColumnsPopup';
import Pagination from './components/Pagination';

type WaitlistEntry = {
  createdOn: string;
  payer: string;
  status: string;
  email: string;
  phone: string;
  services: string;
  scheduled: string;
};

const defaultColumns = [
  'createdOn',
  'payer',
  'status',
  'email',
  'phone',
  'services',
  'scheduled',
];

const columnLabels: { [key: string]: string } = {
  createdOn: 'Created On',
  payer: 'Payer',
  status: 'Status',
  email: 'Email',
  phone: 'Payer Phone',
  services: 'Services',
  scheduled: 'Scheduled',
};

const perPage = 6;

const Page: React.FC = () => {
  const [data, setData] = useState<WaitlistEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [columns, setColumns] = useState(defaultColumns);
  const [selectedColumns, setSelectedColumns] = useState(new Set(defaultColumns));
  const [filteredData, setFilteredData] = useState<WaitlistEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulating fetching data from JSON
    setData(waitlistData as WaitlistEntry[]);
    setFilteredData(waitlistData as WaitlistEntry[]);
  }, []);

  useEffect(() => {
    // Filter data whenever currentPage or data changes
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    setFilteredData(
      data.filter((entry) =>
        Object.values(entry).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [data, currentPage, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / perPage);

  const leadsCount = data.filter((entry) => entry.status === 'Lead').length;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAllChecked(checked);
    if (checked) {
      const allRowIndices = Array.from({ length: filteredData.length }, (_, index) => index);
      setSelectedRows(new Set(allRowIndices));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowCheckboxChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedRows((prevSelected) => new Set(prevSelected).add(index));
    } else {
      setSelectedRows((prevSelected) => {
        const newSelected = new Set(prevSelected);
        newSelected.delete(index);
        return newSelected;
      });
    }
  };

  const isRowSelected = (index: number) => selectedRows.has(index);

  const handleRefresh = () => {
    setData(waitlistData as WaitlistEntry[]);
    setCurrentPage(1);
    setSelectAllChecked(false);
    setSelectedRows(new Set());
  };

  const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const column = event.target.name;
    const checked = event.target.checked;
    setSelectedColumns((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (checked) {
        newSelected.add(column);
      } else {
        newSelected.delete(column);
      }
      return newSelected;
    });
  };

  const handleResetToDefault = () => {
    setSelectedColumns(new Set(defaultColumns));
  };

  const handleApplyColumns = () => {
    setColumns(Array.from(selectedColumns));
    setShowPopup(false);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Waitlist</h1>
      </div>

      <div className="flex space-x-4">
        <StatisticsBlock label="All Waitlist" value={data.length} />
        <StatisticsBlock
          label="Newly Added"
          value={data.filter((entry) => new Date(entry.createdOn) > new Date(new Date().setMonth(new Date().getMonth() - 3))).length}
        />
        <StatisticsBlock label="Leads" value={leadsCount} />
      </div>

      <div className="flex justify-between items-center mt-4">
        {/* FilterButton component needs to be implemented */}
        <FilterButton filteredData={data} setFilteredData={setFilteredData}/>
        <div className="flex items-center space-x-2">
          <SearchBar handleSearch={handleSearch} />
          <RefreshButton onClick={handleRefresh} />
          <button className="text-gray-500" onClick={() => setShowPopup(true)}>
            <BsSquare />
          </button>
          <button className="text-gray-500">
            <BsDownload />
          </button>
        </div>
      </div>

      <WaitlistTable
        data={filteredData.slice((currentPage - 1) * perPage, currentPage * perPage)}
        columns={columns}
        startIndex={(currentPage - 1) * perPage}
        slicedData={filteredData.slice((currentPage - 1) * perPage, currentPage * perPage)}
        isRowSelected={isRowSelected}
        handleRowCheckboxChange={handleRowCheckboxChange}
        handleSelectAll={handleSelectAll}
        selectAllChecked={selectAllChecked}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {showPopup && (
        <ColumnsPopup
          columnLabels={columnLabels}
          selectedColumns={selectedColumns}
          handleColumnChange={handleColumnChange}
          handleResetToDefault={handleResetToDefault}
          handleApplyColumns={handleApplyColumns}
        />
      )}
    </div>
  );
};

export default Page;
