import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/slices/filterSlice';
import { Search, X } from 'lucide-react';
import { debounce } from '../utils/debounce';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(setSearchQuery(query));
    }, 500),
    [dispatch]
  );

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setValue('');
    dispatch(setSearchQuery(''));
  };

  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search CVE ID, vulnerability name..."
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
