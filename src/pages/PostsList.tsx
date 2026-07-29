import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface PostData {
  slug: string;
  title: string;
  date: string;
  author: string;
  points: string;
}

export default function PostsList() {
  const [favoritePosts, setFavoritePosts] = useState<Set<string>>(new Set());
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate data fetching for skeleton loading
    import('../postsData.json').then((module) => {
      setTimeout(() => {
        setPosts(module.default || module as any);
        setLoading(false);
      }, 600); // Small delay to show skeleton
    });

    try {
      const favorites = JSON.parse(localStorage.getItem('hn_favorite_posts') || '[]');
      setFavoritePosts(new Set(favorites));
    } catch (e) {
      // Ignore
    }
  }, []);

  const toggleFavorite = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    const next = new Set(favoritePosts);
    if (next.has(slug)) {
      next.delete(slug);
    } else {
      next.add(slug);
    }
    localStorage.setItem('hn_favorite_posts', JSON.stringify(Array.from(next)));
    setFavoritePosts(next);
  };


  return (
    <center>
      <Helmet>
        <title>Tech Jobs - Posts</title>
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
                        <Link to="/news" style={{ fontWeight: 'normal' }}>news</Link> |{' '}
                        <Link to="/posts" style={{ fontWeight: 'bold' }}>posts</Link>
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
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>jobs</Link>
                  <Link to="/news" onClick={() => setMobileMenuOpen(false)}>news</Link>
                  <Link to="/posts" onClick={() => setMobileMenuOpen(false)}>posts</Link>
                </div>
              </td>
            </tr>
          )}
          <tr style={{ height: '10px' }}></tr>
          <tr>
            <td style={{ padding: '10px 10px 10px 30px' }}>
              <table border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                  {loading ? (
                    Array.from({ length: 15 }).map((_, index) => (
                      <React.Fragment key={`skeleton-${index}`}>
                        <tr className="athing">
                          <td align="right" valign="top" className="title" style={{ paddingRight: '4px' }}>
                            <span className="rank" style={{ color: '#828282' }}>{index + 1}.</span>
                          </td>
                          <td valign="top" className="votelinks">
                            <center>
                              <div style={{ width: '10px', height: '10px', backgroundColor: '#e2e2e2', marginTop: '2px' }}></div>
                            </center>
                          </td>
                          <td className="title">
                            <div style={{ width: `${Math.floor(Math.random() * 40) + 30}%`, height: '14px', backgroundColor: '#e2e2e2', display: 'inline-block' }}></div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}></td>
                          <td className="subtext">
                            <div style={{ width: '20%', height: '12px', backgroundColor: '#e2e2e2', display: 'inline-block', marginTop: '2px' }}></div>
                          </td>
                        </tr>
                        <tr className="spacer" style={{ height: '5px' }}></tr>
                      </React.Fragment>
                    ))
                  ) : posts.map((post, index) => (
                    <React.Fragment key={post.slug}>
                      <tr className="athing">
                        <td align="right" valign="top" className="title" style={{ paddingRight: '4px' }}>
                          <span className="rank" style={{ color: '#828282' }}>{index + 1}.</span>
                        </td>
                        <td valign="top" className="votelinks">
                          <center>
                            <a href="#" onClick={(e) => toggleFavorite(e, post.slug)}>
                              <div className="votearrow" style={{ borderBottomColor: favoritePosts.has(post.slug) ? '#ff6600' : '#828282' }} title="upvote"></div>
                            </a>
                          </center>
                        </td>
                        <td className="title">
                          <span className="titleline">
                            <Link to={`/post/${post.slug}`} className="item-title">{post.title}</Link>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}></td>
                        <td className="subtext">
                          <span className="item-subtext">
                            post by {post.author} {post.date ? post.date : ''} | <a href="#" onClick={(e) => toggleFavorite(e, post.slug)} style={{ textDecoration: 'none', color: '#828282' }}>{favoritePosts.has(post.slug) ? 'un-favorite' : 'favorite'}</a> | <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none', color: '#828282' }}>read</Link>
                          </span>
                        </td>
                      </tr>
                      <tr className="spacer" style={{ height: '5px' }}></tr>
                    </React.Fragment>
                  ))}
                  {!loading && posts.length === 0 && (
                    <tr>
                      <td colSpan={3} className="item-subtext">No posts found.</td>
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
