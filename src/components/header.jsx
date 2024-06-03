import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='navbar'>
      <Link to='/home'>
        <h4>Home</h4>
      </Link>
      <Link to='/todoList'>
        <h4 className='todoList'>To Do List</h4>
      </Link>
    </div>
  );
};

export default Header;
