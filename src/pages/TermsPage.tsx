import { Link } from 'react-router-dom';

export default function TermsPage() {
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
              <h2 style={{ fontSize: '12pt' }}>Terms of Service</h2>
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h3 style={{ fontSize: '11pt', marginTop: '15px' }}>1. Acceptance of Terms</h3>
              <p>By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the service.</p>
              
              <h3 style={{ fontSize: '11pt', marginTop: '15px' }}>2. Intellectual Property</h3>
              <p>The service and its original content, features, and functionality are and will remain the exclusive property of Tech Jobs and its licensors.</p>

              <h3 style={{ fontSize: '11pt', marginTop: '15px' }}>3. Links To Other Web Sites</h3>
              <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services.</p>

              <h3 style={{ fontSize: '11pt', marginTop: '15px' }}>4. Disclaimer</h3>
              <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We aggregate job postings from various sources and cannot guarantee the accuracy, completeness, or availability of any job listing.</p>

              <h3 style={{ fontSize: '11pt', marginTop: '15px' }}>5. Contact Us</h3>
              <p>If you have any questions about these Terms, please contact us via our <Link to="/contact">Contact Page</Link>.</p>
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