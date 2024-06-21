import React, { useState, useEffect } from 'react';
import FilterData from './components/filter/filter';
import Budget from './components/transaction/displayTransactions';
import AnalysisReport from './components/analysis/analysisReport';
import fetchTransactions from './components/fetches';
import Header from './components/header/header';
import './App.css'

const App = () => {
    const [budgetData, setBudgetData] = useState([]);
    const [selectedDate, setSelectedDate] = useState("All");

    useEffect(() => {
        fetchTransactions(setBudgetData);
    }, []);

    return (
        <div>
            <Header/>
            <FilterData budgetData={budgetData} onFilterChange={setSelectedDate} />
            <AnalysisReport budgetData={budgetData} selectedDate={selectedDate} />
            <Budget budgetData={budgetData} selectedDate={selectedDate} />
            
        </div>
    );
}

export default App;
