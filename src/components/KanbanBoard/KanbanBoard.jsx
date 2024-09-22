import React, { useState } from 'react';
import './KanbanBoard.css';
import NavBar from '../Navbar/NavBar';

const KanbanBoard = () => {

    const [groupBy, setGroupBy] = useState('status');
    const [sortBy, setSortBy] = useState('');

    const handleGroupChange = (groupOption) => {
        setGroupBy(groupOption);
    };

    const handleOrderChange = (sortOption) => {
        setSortBy(sortOption);
    };

    return (
        <div>
            <NavBar handleGroupChange={handleGroupChange} handleOrderChange={handleOrderChange} />
        </div>
    );
};

export default KanbanBoard;
