import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';

const NavBar = ({ setFilterType, setSortType, filterType, sortType}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenStatus, setDropdownOpenStatus] = useState(false);
  const [dropdownOpenPriority, setDropdownOpenPriority] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(filterType); 
  const [selectedOrder, setSelectedOrder] = useState(sortType);   
  const dropdownRef = useRef(null); 
  const toggleDropdown = () => {
    if(setDropdownOpen){
      setDropdownOpen(false)
    }
    setDropdownOpen(true);
  };

  const toggleSubDropdownStatus = () => {
    setDropdownOpenPriority(false);
    setDropdownOpenStatus(!dropdownOpenStatus);
  };

  const toggleSubDropdownPriority = () => {
    setDropdownOpenStatus(false);
    setDropdownOpenPriority(!dropdownOpenPriority);
  };

  const handleGroupChange = (option) => {
    setDropdownOpenPriority(false);
    setSelectedGroup(option);
    setFilterType(option.toLowerCase()); 
    setDropdownOpenStatus(false); 
    setDropdownOpen(false); 
  };

  const handleOrderChange = (option) => {
    setDropdownOpenStatus(false); 
    setSelectedOrder(option);
    setSortType(option.toLowerCase());   
    setDropdownOpenPriority(false);     
    setDropdownOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(!setDropdownOpen);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header>
      <nav className="navbar">
        <button className="nav-button" onClick={toggleDropdown}>
          <img src={`${process.env.PUBLIC_URL}/assets/icons_FEtask/Display.svg`} alt="Display Icon" className="filter-icon" />
          Display
          <span className="arrow-down">&#9662;</span>
        </button>

        {dropdownOpen && (
          <div className="dropdown" ref={dropdownRef} style={{ position: 'absolute', left:'20px',top:"80px"}}>
            <div className="dropdown-group">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h4 style={{color:'#949496'}}>Grouping</h4>
                <button className="nav-button" onClick={toggleSubDropdownStatus}>
                  {selectedGroup}
                  <span className="arrow-down">&#9662;</span>
                </button>
                {dropdownOpenStatus && (
                  <div className="sub-dropdown" style={{position: "absolute",
                    top:"25px",
                    left: "313px"}}>
                    <button onClick={() => handleGroupChange('Status')} className="dropdown-button">Status</button>
                    <button onClick={() => handleGroupChange('User')} className="dropdown-button">User</button>
                    <button onClick={() => handleGroupChange('Priority')} className="dropdown-button">Priority</button>
                  </div>
                )}
              </div>
            </div>

            <div className="dropdown-sort">
              <div style={{ display: "flex", alignItems: "center" , justifyContent: "space-between"}}>
                <h4 style={{color:'#949496'}}>Ordering</h4>
                <button className="nav-button" onClick={toggleSubDropdownPriority}>
                  {selectedOrder}
                  <span className="arrow-down">&#9662;</span>
                </button>
                {dropdownOpenPriority && (
                  <div className="sub-dropdown" style={{position: "absolute",
                    top:"87px",
                    left: "313px"}}>
                    <button onClick={() => handleOrderChange('Priority')} className="dropdown-button">Priority</button>
                    <button onClick={() => handleOrderChange('Title')} className="dropdown-button">Title</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
