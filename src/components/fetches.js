
const fetchTransactions = async (setBudgetData) => {
    try {
        const response = await fetch('fakeData/fakeBudget.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
     
        setBudgetData(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

export default fetchTransactions