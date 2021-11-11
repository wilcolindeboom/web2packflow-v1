import React, {useContext} from 'react';
import './MenuBar.css';
import Button from "./Button";
import SearchBar from "./SearchBar";

function MenuBar() {

  return (
    <div className="menu-bar">
        <Button id="" onClick="">
            menuItem
        </Button>
        <SearchBar/>

    </div>
  );
}

export default MenuBar;