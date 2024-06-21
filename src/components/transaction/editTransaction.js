import React, { useState, useEffect } from 'react';
import './editTransaction.css';

const EditTransaction = ({ transaction, onSave, onCancel }) => {
    const [editFormData, setEditFormData] = useState({ ...transaction });


    useEffect(() => {
        setEditFormData({ ...transaction });
    }, [transaction]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSave = () => {
        onSave(editFormData);
    };

    return (
        <div className="edit-form container-flex row mx-5 my-2 d-flex justify-content-around border rounded p-2 shadow-sm">
            <h3>Edit Transaction</h3>
            <form className="input-group">
                <input
                    type="text"
                    name="adddate"
                    value={editFormData.adddate}
                    onChange={handleEditChange}
                    placeholder="Date"
                    className='form-control mx-2'
                />
                <input
                    type="number"
                    name="amount"
                    value={editFormData.amount}
                    onChange={handleEditChange}
                    placeholder="Amount"
                    className='form-control mx-2'
                />
                <input
                    type="text"
                    name="tag"
                    value={editFormData.tag}
                    onChange={handleEditChange}
                    placeholder="Tag"
                    className='form-control mx-2'
                />
                <input
                    type="text"
                    name="adddescription"
                    value={editFormData.adddescription}
                    onChange={handleEditChange}
                    placeholder="Description"
                    className='form-control mx-2'
                />
                <input
                    type="text"
                    name="addtype"
                    value={editFormData.addtype}
                    onChange={handleEditChange}
                    placeholder="Type"
                    className='form-control mx-2'
                />
                <button type="button" className='btn' onClick={handleSave}>Save</button>
                <button type="button" className='btn' onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};


export default EditTransaction
