import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Markdown from 'react-markdown';
import { parseFrontmatter } from '../utils/markdown';

export default function PostView() {
  const { slug } = useParams();
  
  const [favoritePosts, setFavoritePosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('hn_favorite_posts') || '[]');
      setFavoritePosts(new Set(favorites));
    } catch (e) {
      // Ignore
    }
  }, []);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!slug) return;
    const next = new Set(favoritePosts);
    if (next.has(slug)) {
      next.delete(slug);
    } else {
      next.add(slug);
    }
    localStorage.setItem('hn_favorite_posts', JSON.stringify(Array.from(next)));
    setFavoritePosts(next);
  };

  const [postInfo, setPostInfo] = useState<{data: any, content: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const postsGlob = import.meta.glob('/src/posts/*.md', { query: '?raw', import: 'default' });
    const path = `/src/posts/${slug}.md`;
    
    if (postsGlob[path]) {
      postsGlob[path]().then((content) => {
        setPostInfo(parseFrontmatter(content as string));
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }

    import('../postsData.json').then((module) => {
      setRelatedPosts(module.default || module as any);
    });
  }, [slug]);

  if (loading) {
    return <center><div style={{ padding: '20px' }}>Loading...</div></center>;
  }

  if (!postInfo) {
    return (
      <center>
        <table className="hn-container" border={0} cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr><td style={{ padding: '20px' }}>Post not found.</td></tr>
          </tbody>
        </table>
      </center>
    );
  }

  const { data, content } = postInfo;
  const title = data.title || slug;
  const author = data.author || 'Sahan';
  const points = data.points || '1';
  
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const getCanonicalUrl = () => {
    return `${window.location.origin}/post/${slug}`;
  };

  const description = content.substring(0, 150).replace(/[#*_~\[\]]/g, '').trim() + '...';

  return (
    <center>
      <Helmet>
        <title>{title} - Tech Jobs</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={getCanonicalUrl()} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={getCanonicalUrl()} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "author": {
              "@type": "Person",
              "name": author
            },
            "datePublished": data.date || new Date().toISOString().split('T')[0],
            "description": description
          })}
        </script>
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
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>jobs</Link>
                  <Link to="/news" onClick={() => setMobileMenuOpen(false)}>news</Link>
                  <Link to="/posts" onClick={() => setMobileMenuOpen(false)}>posts</Link>
                </div>
              </td>
            </tr>
          )}
          <tr style={{ height: '10px' }}></tr>
          <tr>
            <td style={{ padding: '10px 30px' }}>
              <table border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr className="athing">
                    <td align="right" valign="top" className="title" style={{ paddingRight: '4px' }}></td>
                    <td valign="top" className="votelinks">
                      <center>
                        <a href="#" onClick={toggleFavorite}>
                          <div className="votearrow" style={{ borderBottomColor: (slug && favoritePosts.has(slug)) ? '#ff6600' : '#828282' }} title="upvote"></div>
                        </a>
                      </center>
                    </td>
                    <td className="title">
                      <span className="titleline">
                        <span className="item-title" style={{ fontWeight: 'bold' }}>{title}</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td className="subtext">
                      <span className="item-subtext">
                        post by {author} {data.date ? data.date : ''} | {readingTime} min read | <a href="#" onClick={toggleFavorite} style={{ textDecoration: 'none', color: '#828282' }}>{(slug && favoritePosts.has(slug)) ? 'un-favorite' : 'favorite'}</a>
                      </span>
                    </td>
                  </tr>
                  <tr style={{ height: '10px' }}></tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td>
                      <div className="markdown-body">
                        <Markdown>{content}</Markdown>
                      </div>
                      <br /><br />
                      <table border={0} cellPadding={0} cellSpacing={0}>
                        <tbody>
                          <tr>
                            <td colSpan={2} style={{ paddingBottom: '10px' }}>
                              <span style={{ fontWeight: 'bold', fontSize: '10pt', color: '#828282' }}>Related Posts</span>
                            </td>
                          </tr>
                          {relatedPosts.filter(p => p.slug !== slug).slice(0, 3).map((post, index) => (
                            <React.Fragment key={post.slug}>
                              <tr className="athing">
                                <td align="right" valign="top" className="title" style={{ paddingRight: '4px' }}>
                                  <span className="rank" style={{ color: '#828282' }}>*</span>
                                </td>
                                <td className="title">
                                  <span className="titleline">
                                    <Link to={`/post/${post.slug}`} className="item-title">{post.title}</Link>
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td className="subtext">
                                  <span className="item-subtext">
                                    post by {post.author} {post.date ? post.date : ''} | <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none', color: '#828282' }}>read</Link>
                                  </span>
                                </td>
                              </tr>
                              <tr className="spacer" style={{ height: '5px' }}></tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
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
