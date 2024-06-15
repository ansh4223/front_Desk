import React from 'react';

type WaitlistEntry = {
  createdOn: string;
  payer: string;
  status: string;
  email: string;
  phone: string;
  services: string;
  scheduled: string;
};

type WaitlistTableProps = {
  data: WaitlistEntry[];
  columns: string[];
  startIndex: number;
  slicedData: WaitlistEntry[];
  isRowSelected: (index: number) => boolean;
  handleRowCheckboxChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectAllChecked: boolean;
};

const WaitlistTable: React.FC<WaitlistTableProps> = ({
  data,
  columns,
  startIndex,
  slicedData,
  isRowSelected,
  handleRowCheckboxChange,
  handleSelectAll,
  selectAllChecked,
}) => (
  <div className="overflow-auto">
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-50">
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border-b border-gray-300 text-left">
            <input
              type="checkbox"
              checked={selectAllChecked}
              onChange={handleSelectAll}
            />
          </th>
          {columns.includes("createdOn") && (
            <th className="px-4 py-2 border-b border-gray-300 text-left font-normal">Created On</th>
          )}
          {columns.includes("payer") && (
            <th className="px-4 py-2 border-b border-gray-300 text-left font-normal">Payer</th>
          )}
          {columns.includes("status") && (
            <th className="px-4 py-2 border-b border-gray-300 text-left font-normal">Status</th>
          )}
          {columns.includes("email") && (
            <th className="px-4 py-2 border-b border-gray-300 text-left font-normal">Email</th>
          )}
          {columns.includes("phone") && (
            <th className="px-4 py-2 border-b border-gray-300 text-left font-normal">Payer Phone</th>
          )}
          {columns.includes("services") && (
            <th className="px-4 py-2 border-b border-gray-300 text-left font-normal">Services</th>
          )}
          {columns.includes("scheduled") && (
            <th className="px-4 py-2 border-b border-gray-300 text-left-normal">Scheduled</th>
          )}
        </tr>
      </thead>
      <tbody>
        {slicedData.map((item, index) => (
          <tr key={startIndex + index}>
            <td className="px-4 py-2 border-b border-gray-300">
              <input
                type="checkbox"
                checked={isRowSelected(startIndex + index)}
                onChange={(e) => handleRowCheckboxChange(startIndex + index, e)}
              />
            </td>
            {columns.includes("createdOn") && (
              <td className="px-4 py-2 border-b border-gray-300">{item.createdOn}</td>
            )}
            {columns.includes("payer") && (
              <td className="px-4 py-2 border-b border-gray-300">{item.payer}</td>
            )}
            {columns.includes("status") && (
              <td className="px-4 py-2 border-b border-gray-300"><span
              className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                item.status === "Active"
                  ? "bg-green-200 text-green-800"
                  : item.status === "Lead"
                  ? "bg-blue-200 text-blue-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >{item.status}</span></td>
            )}
            {columns.includes("email") && (
              <td className="px-4 py-2 border-b border-gray-300">{item.email}</td>
            )}
            {columns.includes("phone") && (
              <td className="px-4 py-2 border-b border-gray-300">{item.phone}</td>
            )}
            {columns.includes("services") && (
              <td className="px-4 py-2 border-b border-gray-300">{item.services}</td>
            )}
            {columns.includes("scheduled") && (
              <td className="px-4 py-2 border-b border-gray-300">{item.scheduled}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default WaitlistTable;

