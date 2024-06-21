import React, { useState, useEffect } from 'react';
import Transaction from './transaction';
import EditTransaction from './editTransaction';

const Budget = ({ budgetData, selectedDate }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [isEditing, setIsEditing] = useState(null);

    useEffect(() => {
        const data = selectedDate === "All" ? budgetData : budgetData.filter(transaction => transaction.adddate.slice(0, 7) === selectedDate);
        setFilteredData(data);
    }, [budgetData, selectedDate]);

    const deleteTransaction = (id) => {
        setFilteredData(filteredData.filter(transaction => transaction.id !== id));
    };

    const startEditTransaction = (transaction) => {
        setIsEditing(transaction);
    };

    const saveEditTransaction = (editedTransaction) => {
        setFilteredData(filteredData.map(transaction =>
            transaction.id === editedTransaction.id ? editedTransaction : transaction
        ));
        setIsEditing(null);
    };

    return (
        <div className='container'>
            {isEditing && (
                <EditTransaction
                    transaction={isEditing}
                    onSave={saveEditTransaction}
                    onCancel={() => setIsEditing(null)}
                />
            )}
            {filteredData.map(item => (
                <Transaction
                    key={item.id}
                    id={item.id}
                    date={item.adddate}
                    amount={item.amount}
                    tag={item.tag}
                    descr={item.adddescription}
                    type={item.addtype}
                    commands={
                        <>
                            <button className='btn btn-sm btn-danger mx-1' onClick={() => deleteTransaction(item.id)}>Delete</button>
                            <button className='btn btn-sm btn-warning mx-1' onClick={() => startEditTransaction(item)}>Edit</button>
                        </>
                    }
                />
            ))}
        </div>
    );
}

export default Budget;
