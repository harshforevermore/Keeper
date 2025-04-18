const Navbar = () => {
    return(
        <div className="navbar">
            <div className="keeper-logo">
            <a href="/"><h1 className="logo">Keeper</h1></a>
            </div>
            <div className="navbar-links">
                <a href="/login"><span>Login</span></a>
            </div>
        </div>
    );
};

export default Navbar;