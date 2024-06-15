import { useState, useEffect } from 'react';
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

interface Props {
  selectedService: string[];
  setSelectedService: React.Dispatch<React.SetStateAction<string[]>>;
}

const ServicesProducts: React.FC<Props> = ({ selectedService, setSelectedService }) => {
  const [searchText, setSearchText] = useState("");
  const [waitlistData, setWaitlistData] = useState<WaitlistItem[]>([]);
  const [filteredServiceNamesByName, setFilteredServiceNamesByName] = useState<string[]>([]);
  const [filteredServiceNamesByTags, setFilteredServiceNamesByTags] = useState<string[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [searchOption, setSearchOption] = useState<"searchByName" | "searchByTags">("searchByName");
  const [serviceType, setServiceType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('waitlistData.json');
        const data: WaitlistItem[] = await response.json();
        setWaitlistData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterServiceNamesByName = () => {
      const filteredNames = waitlistData
        .filter(item => item.services.toLowerCase().includes(searchText.toLowerCase()))
        .map(item => item.services);
      const uniqueNames = Array.from(new Set(filteredNames));
      setFilteredServiceNamesByName(uniqueNames);
      setShowNoResults(uniqueNames.length === 0 && searchText.trim() !== "");
    };

    filterServiceNamesByName();
  }, [searchText, waitlistData]);

  useEffect(() => {
    const filterServiceNamesByTags = () => {
      const filteredNames = waitlistData
        .filter(item => {
          if (serviceType !== "all" && item.services !== serviceType) return false;
          if (status !== "all" && item.status !== status) return false;
          return true;
        })
        .map(item => item.services);
      const uniqueNames = Array.from(new Set(filteredNames));
      setFilteredServiceNamesByTags(uniqueNames);
      setShowNoResults(uniqueNames.length === 0 && (serviceType !== "all" || status !== "all"));
    };

    filterServiceNamesByTags();
  }, [serviceType, status, waitlistData]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleServiceCheckboxChange = (serviceName: string) => {
    setSelectedService(prevSelected => {
      if (prevSelected.includes(serviceName)) {
        return prevSelected.filter(item => item !== serviceName);
      } else {
        const newSelected = [...prevSelected];
        waitlistData.forEach(item => {
          if (item.services === serviceName && !newSelected.includes(serviceName)) {
            newSelected.push(serviceName);
          }
        });
        return newSelected;
      }
    });
  };

  const resultMessageByName = `Showing ${filteredServiceNamesByName.length} result${filteredServiceNamesByName.length !== 1 ? 's' : ''} matching '${searchText}'`;
  const resultMessageByTags = `Showing ${filteredServiceNamesByTags.length} result${filteredServiceNamesByTags.length !== 1 ? 's' : ''} matching tags`;

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="searchByName"
            name="searchOption"
            value="searchByName"
            checked={searchOption === "searchByName"}
            onChange={() => setSearchOption("searchByName")}
          />
          <label htmlFor="searchByName" className="flex items-center cursor-pointer">
            
            <span className="ml-2">Search by name</span>
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="searchByTags"
            name="searchOption"
            value="searchByTags"
            checked={searchOption === "searchByTags"}
            onChange={() => setSearchOption("searchByTags")}
          />
          <label htmlFor="searchByTags" className="flex items-center cursor-pointer">
            
            <span className="ml-2">Search by tags</span>
          </label>
        </div>
      </div>

      {searchOption === "searchByName" && (
        <div>
          <div className="relative w-350 h-[28px] mb-4">
            <input
              type="text"
              className="w-full h-full pl-12 pr-4 py-2 border border-gray-300 rounded focus:outline-none"
              placeholder="Search"
              value={searchText}
              onChange={handleSearchInputChange}
            />
            {searchText && (
              <p className="text-sm text-gray-600 mb-2">{resultMessageByName}</p>
            )}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <CiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>

          {searchText && (
            <div className="mt-2 w-full max-h-64 overflow-y-auto" style={{ height: '8rem' }}>
              {filteredServiceNamesByName.map((serviceName, index) => (
                <div key={index} className="flex items-center justify-between p-2 border-b border-gray-300">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={() => handleServiceCheckboxChange(serviceName)}
                      checked={selectedService.includes(serviceName)}
                      className="form-checkbox h-4 w-4 text-gray-600 mr-2"
                    />
                    <div className="text-sm font-medium text-gray-900">{serviceName}</div>
                  </div>
                  <div>
                    {waitlistData.filter(item => item.services === serviceName).map((item, subIndex) => (
                      <span
                        key={subIndex}
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
                    ))}
                  </div>
                </div>
              ))}
              {showNoResults && (
                <div className="p-2 text-sm text-gray-600">No results found</div>
              )}
            </div>
          )}
        </div>
      )}

      {searchOption === "searchByTags" && (
        <div>
          <div className="mb-4">
            <div className="text-sm font-medium mb-1">Service Type</div>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="all">Show all service types</option>
              <option value="class">Class</option>
              <option value="appointment">Appointment</option>
              <option value="facility">Facility</option>
              <option value="classPack">Class Pack</option>
              <option value="membership">Membership</option>
              <option value="generalItem">General Item</option>
            </select>
          </div>
          <div className="mb-4">
            <div className="text-sm font-medium mb-1">Status</div>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">Show all</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="disabled">Disabled</option>
              < option value="draft">Draft</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesProducts;

