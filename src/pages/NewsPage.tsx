import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export interface NewsStory {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
}

export default function NewsPage() {
  const [searchParams] = useSearchParams();
  const [news, setNews] = useState<NewsStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const page = parseInt(searchParams.get('p') || '1', 10);
  const ITEMS_PER_PAGE = 30;

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const [topRes, newRes, bestRes] = await Promise.all([
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json'),
        fetch('https://hacker-news.firebaseio.com/v0/newstories.json'),
        fetch('https://hacker-news.firebaseio.com/v0/beststories.json')
      ]);

      if (!topRes.ok || !newRes.ok || !bestRes.ok) {
        throw new Error('Failed to fetch stories');
      }

      const topIds: number[] = await topRes.json();
      const newIds: number[] = await newRes.json();
      const bestIds: number[] = await bestRes.json();

      // Combine and deduplicate to get 500+ unique stories
      const allIds = Array.from(new Set([...topIds, ...newIds, ...bestIds]));
      
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const paginatedIds = allIds.slice(start, end);
      
      const storyPromises = paginatedIds.map(id => 
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
      );
      
      const stories = await Promise.all(storyPromises);
      setNews(stories.filter(s => s != null));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMoreUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('p', (page + 1).toString());
    return url.pathname + url.search;
  };

  const timeAgo = (unixTime: number) => {
    const seconds = Math.floor((new Date().getTime() / 1000) - unixTime);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <center>
      <Helmet>
        <title>Tech News</title>
        <meta name="description" content="Latest tech news aggregated for developers and engineers." />
      </Helmet>
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
                      <span className="desktop-nav" style={{ fontSize: '10pt', marginLeft: '5px' }}>
                        <Link to="/news" style={{ fontWeight: 'bold' }}>news</Link> |{' '}
                        <Link to="/" style={{ fontWeight: 'normal' }}>jobs</Link> |{' '}
                        <Link to="/posts" style={{ fontWeight: 'normal' }}>posts</Link>
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '4px' }}>
                      <span className="mobile-nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        ☰
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          {mobileMenuOpen && (
            <tr>
              <td>
                <div className="mobile-menu open">
                  <Link to="/news" onClick={() => setMobileMenuOpen(false)}>news</Link>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>jobs</Link>
                  <Link to="/posts" onClick={() => setMobileMenuOpen(false)}>posts</Link>
                </div>
              </td>
            </tr>
          )}
          <tr style={{ height: '10px' }}></tr>
          
          <tr>
            <td>
              <table border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                  {loading && news.length === 0 && (
                    <tr>
                      <td style={{ padding: '10px 30px' }}>
                        {Array.from({ length: 15 }).map((_, idx) => (
                          <div key={idx} style={{ marginBottom: '15px' }}>
                            <div style={{ height: '12px', width: '80%', backgroundColor: '#e0e0e0', marginBottom: '5px' }}></div>
                            <div style={{ height: '10px', width: '40%', backgroundColor: '#f0f0f0' }}></div>
                          </div>
                        ))}
                      </td>
                    </tr>
                  )}
                  {error && <tr><td style={{ padding: '10px 30px', color: 'red' }}>{error}</td></tr>}
                  {news.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <tr className="athing">
                        <td align="right" valign="top" className="title" style={{ paddingRight: '5px' }}>
                          <span className="rank" style={{ color: '#828282', fontSize: '10pt' }}>{(page - 1) * ITEMS_PER_PAGE + index + 1}.</span>
                        </td>
                        <td valign="top" className="title" style={{ fontSize: '10pt' }}>
                          <a href={item.url || `https://news.ycombinator.com/item?id=${item.id}`} target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: 'none' }}>{item.title}</a>
                          {item.url && (
                            <span className="sitebit comhead" style={{ fontSize: '8pt', color: '#828282', marginLeft: '5px' }}>
                              (<a href={`https://news.ycombinator.com/from?site=${new URL(item.url).hostname}`} target="_blank" rel="noopener noreferrer" style={{ color: '#828282', textDecoration: 'none' }}><span className="sitestr">{new URL(item.url).hostname.replace(/^www\./, '')}</span></a>)
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={1}></td>
                        <td className="subtext" style={{ fontSize: '7pt', color: '#828282' }}>
                          <span className="score">{item.score} points</span> by <a href={`https://news.ycombinator.com/user?id=${item.by}`} target="_blank" rel="noopener noreferrer" style={{ color: '#828282', textDecoration: 'none' }}>{item.by}</a> {timeAgo(item.time)} | <a href={`https://news.ycombinator.com/item?id=${item.id}`} target="_blank" rel="noopener noreferrer" style={{ color: '#828282', textDecoration: 'none' }}>{item.descendants || 0} comments</a>
                        </td>
                      </tr>
                      <tr className="spacer" style={{ height: '5px' }}></tr>
                    </React.Fragment>
                  ))}
                  
                  {!loading && news.length === ITEMS_PER_PAGE && (
                    <tr>
                      <td colSpan={2} style={{ paddingLeft: '36px', paddingBottom: '15px', paddingTop: '10px' }}>
                        <Link to={getMoreUrl()} className="item-subtext" style={{ fontSize: '10pt', color: '#828282' }}>More</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
