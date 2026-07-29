import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              <h2 style={{ fontSize: '12pt' }}>Contact Us</h2>
              
              <p style={{ marginTop: '15px' }}>
                We'd love to hear from you. Whether you have a question about jobs, advertising, or anything else, our team is ready to answer all your questions.
              </p>

              {submitted ? (
                <div style={{ padding: '15px', backgroundColor: '#e6f3e6', color: '#2e7d32', border: '1px solid #4caf50', marginTop: '20px' }}>
                  Thank you for your message! We will get back to you as soon as possible.
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
                    <input type="text" required style={{ width: '100%', maxWidth: '400px', padding: '5px', border: '1px solid #ccc' }} />
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                    <input type="email" required style={{ width: '100%', maxWidth: '400px', padding: '5px', border: '1px solid #ccc' }} />
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Subject</label>
                    <input type="text" required style={{ width: '100%', maxWidth: '400px', padding: '5px', border: '1px solid #ccc' }} />
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Message</label>
                    <textarea required rows={5} style={{ width: '100%', maxWidth: '400px', padding: '5px', border: '1px solid #ccc' }}></textarea>
                  </div>

                  <button type="submit" style={{ backgroundColor: '#ff6600', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Send Message
                  </button>
                </form>
              )}
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