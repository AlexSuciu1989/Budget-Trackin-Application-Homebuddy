import { useState, useEffect, useRef } from 'react';
import '../bootstrap/css/bootstrap.css';
import { Tooltip } from 'bootstrap';

const AnalysisReport = ({ budgetData, selectedDate }) => {
    const [sumOfTags, setSumOfTags] = useState({});
    const [sumOfIncome, setSumOfIncome] = useState(0);
    const [sumOfOutcome, setSumOfOutcome] = useState(0);
    const tooltipRefs = useRef([]);

    useEffect(() => {
        const filteredData = selectedDate === "All" ? budgetData : budgetData.filter(transaction => transaction.adddate.slice(0, 7) === selectedDate);

        const tagsSum = filteredData.reduce((acc, cur) => {
            if (cur.addtype === "Payment") {
                acc[cur.tag] = (acc[cur.tag] || 0) + parseInt(cur.amount);
            }
            return acc;
        }, {});
        setSumOfTags(tagsSum);

        const incomeSum = filteredData.reduce((acc, cur) => {
            if (cur.addtype === "Income") {
                acc = acc + parseInt(cur.amount);
            }
            return acc;
        }, 0);
        setSumOfIncome(incomeSum);

        const outcomeSum = filteredData.reduce((acc, cur) => {
            if (cur.addtype === "Payment") {
                acc = acc + parseInt(cur.amount);
            }
            return acc;
        }, 0);
        setSumOfOutcome(outcomeSum);

    }, [budgetData, selectedDate]);

    const generateRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    const initTooltip = (index) => {
        if (tooltipRefs.current[index]) {
            new Tooltip(tooltipRefs.current[index], {
                title: `${Object.entries(sumOfTags)[index][0]} - ${Object.entries(sumOfTags)[index][1]}`,
                placement: 'top',
                container: 'body'
            });
        }
    };

    useEffect(() => {
        Object.keys(sumOfTags).forEach((tag, index) => {
            initTooltip(index);
        });
    }, [sumOfTags]);

    return (
        <div className="tag-summary container border rounded shadow-sm py-5 px-5 bg-white">
            <div className="progress-stacked" style={{ height: "60px" }}>
                {Object.entries(sumOfTags).map(([tag, sum], index) => (
                    <div key={tag} className="progress rounded-0" role="progressbar" aria-label={tag} aria-valuenow={(sum / sumOfIncome) * 100} aria-valuemin="0" aria-valuemax="100" style={{ width: `${(sum / sumOfIncome) * 100}%`, height: '60px', backgroundColor: generateRandomColor() }} ref={el => tooltipRefs.current[index] = el}>
                    </div>
                ))}
            </div>
            <div className='container my-4' style={{ width: "80%" }}>
                {Object.entries(sumOfTags).map(([tag, sum]) => (
                    <div key={tag} className="progress my-3" role="progressbar" aria-label={tag} aria-valuenow={sum} aria-valuemin="0" aria-valuemax={sumOfIncome} style={{ height: 30 + "px" }}>
                        <div className="progress-bar overflow-visible text-dark ps-3" style={{ width: `${(sum / sumOfIncome) * 100}%` }}>{tag} - {sum}</div>
                    </div>
                ))}
            </div>

            <div>
                <div>Total income: {sumOfIncome}</div>
                <div>Total outcome: {sumOfOutcome}</div>
                <div>Total unspent: {sumOfIncome - sumOfOutcome}</div>
            </div>
        </div>
    );
}

export default AnalysisReport;
