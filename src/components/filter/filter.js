import React from 'react';
import './filter.css';
import '../bootstrap/css/bootstrap.css';


const FilterData = ({ budgetData, onFilterChange }) => {
    const dates = budgetData.reduce((acc, cur) => {
        acc.push(cur.adddate);
        return acc;
    }, ["All"]);

    const formattedDates = [...new Set(dates.map(date => date.slice(0, 7)))];

    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    };

    return (
        <div className='mb-2 mt-5 container p-3 border rounded shadow-sm bg-white'>
            <div className='fs-5 mb-2'>Filter data</div>
            <select className='form-select' onChange={handleFilterChange}>
                {formattedDates.map((formattedDate) => (
                    <option key={formattedDate} value={formattedDate}>{formattedDate}</option>
                ))}
            </select>
        </div>
    );
};

export default FilterData;
