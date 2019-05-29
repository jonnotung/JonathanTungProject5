import React from 'react';

const Header = (props) => {
    return(
        <header className="intro">
            <h1>School Database</h1>
            <p>Enter the name of the student. (Max 25 characters)</p>
            <p>Enroll the classes that they're in. Class names should of the form (3 letters)(3 numbers). Click on an enrolled class to remove it.</p>
            <p>Click Create Entry to save to database.</p>
        </header>
    );
}

export default Header;