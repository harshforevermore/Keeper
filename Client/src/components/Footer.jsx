const Footer = () => {
    const year = new Date().getFullYear();
    return (
      <div className="footer">
        <span className="copyright">Copyright &#169;{year}</span>
      </div>
    );
  };

export default Footer;  