import { Link } from 'react-router-dom';

export default function PrivacyPage() {
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
              <h2 style={{ fontSize: '12pt' }}>Privacy Policy</h2>
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h3 style={{ fontSize: '11pt', marginTop: '15px' }}>1. Information We Collect</h3>
              <p>We collect information you provide directly to us when you use our website, such as when you save jobs or search for roles.</p>
              
              <h3 style={{ fontSize: '11pt', marginTop: '15px' }}>2. How We Use Your Information</h3>
              <p>We use the information we collect to operate, maintain, and improve our website, as well as to personalize your experience and serve relevant advertisements (e.g., Google AdSense).</p>

              <h3 style={{ fontSize: '11pt', marginTop: '15px' }}>3. Cookies</h3>
              <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

              <h3 style={{ fontSize: '11pt', marginTop: '15px' }}>4. Google AdSense</h3>
              <p>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</p>

              <h3 style={{ fontSize: '11pt', marginTop: '15px' }}>5. Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us via our <Link to="/contact">Contact Page</Link>.</p>
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