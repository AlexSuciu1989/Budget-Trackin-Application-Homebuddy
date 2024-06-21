import './transaction.css'
import '../bootstrap/css/bootstrap.css'

const Transaction = ({id, date, amount, tag, descr, type, commands}) => {

    return (
        <div className=" container-flex row my-2 d-flex justify-content-around border rounded p-2 shadow-sm bg-white" id={id}>
            <div className="subcontainer col-1 ">{id}</div>
            <div className="subcontainer col-2 ">{date}</div>
            <div className="subcontainer col-1 ">{amount}</div>
            <div className="subcontainer col-2 ">{tag}</div>
            <div className="subcontainer col-3 ">{descr}</div>
            <div className="subcontainer col-1 ">{type}</div>
            <div className="subcontainer col-1 ">{commands}</div>
        </div>
    );
}

export default Transaction;