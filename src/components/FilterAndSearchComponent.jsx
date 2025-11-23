import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
`;

const FilterAndSearchComponent = ({ setFilteredManuscripts }) => {
  const [statusOptions, setStatusOptions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchArticleCode, setSearchArticleCode] = useState('');

  // Fetch status options
//   useEffect(() => {
//     const fetchStatusOptions = async () => {
//       try {
//         const response = await axios.get('https://www.fuprecosjournals.org/api/get_status_options.php');
//         if (response.data.success) {
//           setStatusOptions(response.data.statusOptions);
//         }
//       } catch (error) {
//         console.error('Error fetching status options:', error);
//       }
//     };
//     fetchStatusOptions();
//   }, []);

  // Filter and search
  const handleFilterAndSearch = async () => {
    try {
      const response = await axios.get('https://www.fuprecosjournals.org/api/get_all_manuscripts.php');
      if (response.data.success) {
        let filtered = response.data.manuscripts;

        // Filter by status
        if (statusFilter) {
          filtered = filtered.filter((manuscript) => manuscript.status === statusFilter);
        }

        // Search by name
        if (searchName) {
          filtered = filtered.filter((manuscript) =>
            manuscript.title.toLowerCase().includes(searchName.toLowerCase())
          );
        }

        // Search by article code
        if (searchArticleCode) {
          filtered = filtered.filter((manuscript) =>
            manuscript.article_code.toLowerCase().includes(searchArticleCode.toLowerCase())
          );
        }

        setFilteredManuscripts(filtered);
      }
    } catch (error) {
      console.error('Error filtering manuscripts:', error);
    }
  };

  // Trigger filter and search on input changes
  useEffect(() => {
    handleFilterAndSearch();
  }, [statusFilter, searchName, searchArticleCode]);

  return (
    <FilterContainer>
      <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All Statuses</option>
        {statusOptions.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </Select>
      <Input
        type="text"
        placeholder="Search by Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Search by Article Code"
        value={searchArticleCode}
        onChange={(e) => setSearchArticleCode(e.target.value)}
      />
    </FilterContainer>
  );
};

export default FilterAndSearchComponent;
