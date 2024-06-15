import React from 'react';

type ColumnsPopupProps = {
  columnLabels: { [key: string]: string };
  selectedColumns: Set<string>;
  handleColumnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetToDefault: () => void;
  handleApplyColumns: () => void;
};

const ColumnsPopup: React.FC<ColumnsPopupProps> = ({
  columnLabels,
  selectedColumns,
  handleColumnChange,
  handleResetToDefault,
  handleApplyColumns,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="absolute right-0 bottom-0 m-4">
    <div className="bg-white p-4 rounded-lg w-[320px] h-[472px] gap-[16px] rounded-tl-[12px] border-t border-l border-b border-solid bg-white opacity-100 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Edit Columns</h2>
      <div className="flex flex-col space-y-2">
        {Object.keys(columnLabels).map((key) => (
          <label key={key} className="flex items-center">
            <input
              type="checkbox"
              name={key}
              checked={selectedColumns.has(key)}
              onChange={handleColumnChange}
              className="mr-2"
            />
            {columnLabels[key]}
          </label>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-200 px-4 py-2 rounded"
          onClick={handleResetToDefault}
        >
          Reset to Default
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleApplyColumns}
        >
          Apply
        </button>
      </div>
    </div>
  </div>
  </div>
);

export default ColumnsPopup;
