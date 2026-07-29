import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <center>
      <table className="hn-container" border={0} cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="hn-header">
              <table border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ padding: '2px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '18px', paddingRight: '4px' }}>
                      <Link to="/" className="hn-logo">J</Link>
                    </td>
                    <td style={{ lineHeight: '12pt', height: '10px' }}>
                      <span className="hn-title"><Link to="/">Tech Jobs</Link></span>
                      <span className="desktop-nav" style={{ fontSize: '10pt', marginLeft: '10px' }}>
                        <Link to="/news" style={{ fontWeight: 'normal' }}>news</Link> |{' '}
                        <Link to="/posts" style={{ fontWeight: 'normal' }}>posts</Link>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr style={{ height: '10px' }}></tr>
          <tr>
            <td style={{ padding: '20px', textAlign: 'left', fontSize: '10pt', color: '#000000' }}>
              <h2 style={{ fontSize: '12pt' }}>About Us</h2>
              <p style={{ marginTop: '15px' }}>
                Tech Jobs is an aggregator of software engineering, development, and tech-related career opportunities. 
                Our mission is to help tech professionals find their next great opportunity by bringing together listings from 
                top companies like Meta, Apple, NVIDIA, and high-growth startups into one simple, fast, and easy-to-use interface.
              </p>
              
              <p style={{ marginTop: '15px' }}>
                We believe that finding a job shouldn't be complicated. By drawing inspiration from minimalist and text-focused designs, 
                we ensure our platform is incredibly fast to load and accessible to everyone, regardless of their device or connection speed.
              </p>

              <h3 style={{ fontSize: '11pt', marginTop: '15px' }}>Our Mission</h3>
              <p>To connect talented tech professionals with the world's most innovative companies in the most efficient way possible.</p>

              <h3 style={{ fontSize: '11pt', marginTop: '15px' }}>Technology</h3>
              <p>We aggregate data from multiple sources including Hacker News, Remotive, and direct corporate career portals to provide a comprehensive view of the tech job market.</p>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0' }}>
              <table width="100%" cellSpacing={0} cellPadding={1}>
                <tbody>
                  <tr><td bgcolor="#000000" style={{ height: '2px' }}></td></tr>
                </tbody>
              </table>
              <br />
              <center className="item-subtext">
                <Link to="/about">About</Link> | <Link to="/terms">Terms</Link> | <Link to="/privacy">Privacy</Link> | <Link to="/contact">Contact</Link>
              </center>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  );
}