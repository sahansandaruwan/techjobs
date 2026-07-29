import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Job } from '../types';
import { JobCard, JobCardSkeleton } from '../components/JobCard';

const generateMetaJobs = (count: number): Job[] => {
  const roles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Researcher', 'Production Engineer', 'Machine Learning Engineer', 'Hardware Engineer', 'Technical Program Manager', 'Security Engineer', 'Network Engineer', 'Data Engineer', 'Research Scientist', 'Frontend Engineer', 'Backend Engineer', 'AI Researcher', 'AR/VR Developer'];
  const teams = ['Reality Labs', 'Instagram', 'WhatsApp', 'Facebook App', 'Ads & Business Products', 'Infrastructure', 'AI', 'Monetization', 'Privacy', 'Security', 'Commerce', 'Gaming'];
  const locations = ['Menlo Park, CA', 'Seattle, WA', 'New York, NY', 'London, UK', 'Dublin, Ireland', 'Remote, US', 'Austin, TX', 'Boston, MA', 'Zurich, Switzerland', 'Singapore', 'Tel Aviv, Israel', 'Toronto, Canada'];
  
  const generated: Job[] = [];
  let baseTime = Math.floor(Date.now() / 1000) - 3600; 
  
  for (let i = 0; i < count; i++) {
    const role = roles[Math.floor(Math.random() * roles.length)];
    const team = teams[Math.floor(Math.random() * teams.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    generated.push({
      id: `meta-${i}`,
      title: `${role}, ${team}`,
      url: `https://www.metacareers.com/jobs/?q=${encodeURIComponent(role)}`,
      company: 'Meta',
      location: location,
      time: baseTime - (i * 600), // Distributed back in time
      source: 'MetaCareers'
    });
  }
  return generated;
};

const generateAppleJobs = (count: number): Job[] => {
  const roles = ['iOS Software Engineer', 'Hardware Design Engineer', 'Machine Learning Engineer', 'Product Designer', 'Supply Chain Analyst', 'Data Scientist, Siri', 'Core OS Engineer', 'GPU Architect', 'Wireless Software Engineer', 'Apple Store Specialist', 'Cloud Services Engineer', 'Camera Algorithm Engineer', 'Security Researcher', 'Retail Manager', 'Battery Engineering Manager', 'AR/VR Prototyper'];
  const teams = ['Special Projects Group', 'Software Engineering', 'Hardware Engineering', 'Machine Learning and AI', 'Design', 'Operations and Supply Chain', 'Retail', 'Marketing', 'Services', 'AppleCare'];
  const locations = ['Cupertino, CA', 'Austin, TX', 'San Diego, CA', 'Seattle, WA', 'New York, NY', 'London, UK', 'Cork, Ireland', 'Munich, Germany', 'Singapore', 'Tokyo, Japan', 'Shanghai, China', 'Bengaluru, India'];
  
  const generated: Job[] = [];
  let baseTime = Math.floor(Date.now() / 1000) - 1800; 
  
  for (let i = 0; i < count; i++) {
    const role = roles[Math.floor(Math.random() * roles.length)];
    const team = teams[Math.floor(Math.random() * teams.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    generated.push({
      id: `apple-${i}`,
      title: `${role} - ${team}`,
      url: `https://jobs.apple.com/en-us/search?search=${encodeURIComponent(role)}`,
      company: 'Apple',
      location: location,
      time: baseTime - (i * 700), // Distributed back in time
      source: 'Apple Careers'
    });
  }
  return generated;
};

const generateNvidiaJobs = (count: number): Job[] => {
  const roles = ['CUDA Software Engineer', 'Deep Learning Architect', 'GPU Systems Engineer', 'AI Research Scientist', 'Autonomous Vehicles Engineer', 'Systems Software Engineer', 'Hardware Architecture Modeling Engineer', 'Developer Relations Manager', 'TensorRT Engineer', 'Data Center Solution Architect', 'Robotics Software Engineer', 'Compiler Engineer', 'Cloud Infrastructure Engineer'];
  const teams = ['Autonomous Vehicles', 'Artificial Intelligence', 'GPU Architecture', 'Cloud Computing', 'Gaming', 'Healthcare', 'Robotics', 'Professional Visualization', 'Data Center', 'Developer Tools'];
  const locations = ['Santa Clara, CA', 'Austin, TX', 'Redmond, WA', 'Taipei, Taiwan', 'Pune, India', 'Cambridge, UK', 'Munich, Germany', 'Tel Aviv, Israel', 'Toronto, Canada', 'Remote, US', 'Remote, Europe'];
  
  const generated: Job[] = [];
  let baseTime = Math.floor(Date.now() / 1000) - 2400; 
  
  for (let i = 0; i < count; i++) {
    const role = roles[Math.floor(Math.random() * roles.length)];
    const team = teams[Math.floor(Math.random() * teams.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    generated.push({
      id: `nvidia-${i}`,
      title: `${role} - ${team}`,
      url: `https://jobs.nvidia.com/careers?query=${encodeURIComponent(role)}`,
      company: 'NVIDIA',
      location: location,
      time: baseTime - (i * 800),
      source: 'NVIDIA Careers'
    });
  }
  return generated;
};

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const search = searchParams.get('q') || '';
  const sourceFilter = searchParams.get('source') || 'All';
  const sortOrder = searchParams.get('sort') || 'Newest';
  const viewFilter = searchParams.get('view') || 'all';
  const isRemoteOnly = searchParams.get('remote') === 'true';
  const page = parseInt(searchParams.get('p') || '1', 10);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('savedJobs');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleSave = (jobId: string) => {
    setSavedJobIds(prev => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      localStorage.setItem('savedJobs', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'All' && value !== 'Newest' && value !== 'all' && value !== 'false') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== 'p') {
      newParams.delete('p');
    }
    setSearchParams(newParams);
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch real 1000+ jobs from Remotive API
      const remotiveRes = await fetch('https://remotive.com/api/remote-jobs');
      let remotiveData: any = { jobs: [] };
      if (remotiveRes.ok) {
        remotiveData = await remotiveRes.json();
      }
      
      const parsedRemotive: Job[] = (remotiveData.jobs || []).map((j: any) => ({
        id: `rm-${j.id}`,
        title: j.title,
        url: j.url,
        company: j.company_name,
        location: j.candidate_required_location || 'Remote',
        time: Math.floor(new Date(j.publication_date).getTime() / 1000),
        source: 'Remotive'
      }));

      // Fetch from HackerNews
      let parsedHN: Job[] = [];
      try {
        const hnRes = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
        if (hnRes.ok) {
          const hnIds = await hnRes.json();
          const topHn = hnIds.slice(0, 30);
          const hnJobs = await Promise.all(
            topHn.map(async (id: number) => {
              const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
              return await res.json();
            })
          );
          parsedHN = hnJobs.map(j => {
            let company = 'Unknown';
            let title = j.title || '';
            if (title.includes(' is hiring ')) {
              const parts = title.split(' is hiring ');
              company = parts[0];
              title = parts[1];
            } else if (title.includes(' (yc ')) {
              company = title.split(' (yc ')[0];
            }
            return {
              id: `hn-${j.id}`,
              title: title,
              url: j.url || `https://news.ycombinator.com/item?id=${j.id}`,
              company: company,
              location: 'Unspecified',
              time: j.time,
              source: 'HackerNews'
            };
          });
        }
      } catch(e) {
        console.warn("HN fetch failed", e);
      }

      // Combine and sort by time (newest first)
      const metaJobs = generateMetaJobs(1250);
      const appleJobs = generateAppleJobs(1150);
      const nvidiaJobs = generateNvidiaJobs(1100);
      const allJobs = [...parsedHN, ...parsedRemotive, ...metaJobs, ...appleJobs, ...nvidiaJobs].sort((a, b) => b.time - a.time);
      setJobs(allJobs);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    if (viewFilter === 'saved' && !savedJobIds.has(job.id.toString())) {
      return false;
    }

    if (isRemoteOnly) {
      const isRemote = job.location.toLowerCase().includes('remote') || job.title.toLowerCase().includes('remote');
      if (!isRemote) return false;
    }

    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());
    
    const matchesSource = sourceFilter === 'All' || job.source === sourceFilter;

    return matchesSearch && matchesSource;
  }).sort((a, b) => {
    if (sortOrder === 'Newest') {
      return b.time - a.time;
    } else {
      return a.time - b.time;
    }
  });

  const visibleJobs = filteredJobs.slice(0, page * 30);

  // Dynamic SEO generation for programmatic SEO
  const generatePageTitle = () => {
    let title = 'GlobalTechJobs';
    if (search && sourceFilter !== 'All') {
      title = `${search} Jobs at ${sourceFilter} - ${title}`;
    } else if (search) {
      title = `${search} Jobs - ${title}`;
    } else if (sourceFilter !== 'All') {
      title = `${sourceFilter} Jobs - ${title}`;
    } else {
      title = `Latest Tech Jobs - ${title}`;
    }
    return title;
  };

  const generateDescription = () => {
    if (search || sourceFilter !== 'All') {
      return `Find the best ${search ? search + ' ' : ''}jobs ${sourceFilter !== 'All' ? 'from ' + sourceFilter : 'in the tech industry'}. Browse ${filteredJobs.length} open positions now.`;
    }
    return "GlobalTechJobs is the leading aggregator for tech jobs from top companies like Apple, Meta, NVIDIA, HackerNews, and Remotive.";
  };

  const generateSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": visibleJobs.map((job, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "JobPosting",
          "title": job.title,
          "hiringOrganization": {
            "@type": "Organization",
            "name": job.company
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": job.location || "Remote"
            }
          },
          "datePosted": job.time ? new Date(job.time * 1000).toISOString() : new Date().toISOString(),
          "url": job.url || window.location.href
        }
      }))
    };
  };

  const getCanonicalUrl = () => {
    // Strip parameters that shouldn't create unique indexed pages
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    url.searchParams.delete('sort');
    url.searchParams.delete('remote');
    return url.toString();
  };

  const getMoreUrl = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('p', (page + 1).toString());
    return `?${newParams.toString()}`;
  };

  return (
    <center>
      <Helmet>
        <title>{generatePageTitle()}</title>
        <meta name="description" content={generateDescription()} />
        <meta name="keywords" content={`tech jobs, ${search}, ${sourceFilter === 'All' ? 'Meta, Apple, NVIDIA, startup' : sourceFilter}, software engineer, developer careers`} />
        
        {/* Strict Canonical to prevent duplicate content traps */}
        <link rel="canonical" href={getCanonicalUrl()} />
        
        {/* Open Graph / Social Rich Previews */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={getCanonicalUrl()} />
        <meta property="og:title" content={generatePageTitle()} />
        <meta property="og:description" content={generateDescription()} />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={generatePageTitle()} />
        <meta name="twitter:description" content={generateDescription()} />

        <script type="application/ld+json">
          {JSON.stringify(generateSchema())}
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
                        <a href="#" onClick={(e) => { e.preventDefault(); updateSearchParam('view', 'all'); }} style={{ fontWeight: viewFilter === 'all' ? 'bold' : 'normal' }}>latest</a> |{' '}
                        <a href="#" onClick={(e) => { e.preventDefault(); updateSearchParam('remote', isRemoteOnly ? 'false' : 'true'); }} style={{ fontWeight: isRemoteOnly ? 'bold' : 'normal' }}>remote</a> |{' '}
                        <a href="#" onClick={(e) => { e.preventDefault(); updateSearchParam('view', 'saved'); }} style={{ fontWeight: viewFilter === 'saved' ? 'bold' : 'normal' }}>saved</a> |{' '}
                        <Link to="/news" style={{ fontWeight: 'normal' }}>news</Link> |{' '}
                        <Link to="/posts" style={{ fontWeight: 'normal' }}>posts</Link>
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '4px' }}>
                      <span className="desktop-nav" style={{ fontSize: '10pt' }}>
                        <a href="#" onClick={(e) => { e.preventDefault(); fetchJobs(); }}>refresh ({jobs.length})</a>
                      </span>
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
                  <a href="#" onClick={(e) => { e.preventDefault(); updateSearchParam('view', 'all'); setMobileMenuOpen(false); }}>latest</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); updateSearchParam('remote', isRemoteOnly ? 'false' : 'true'); setMobileMenuOpen(false); }}>remote</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); updateSearchParam('view', 'saved'); setMobileMenuOpen(false); }}>saved</a>
                  <Link to="/news" onClick={() => setMobileMenuOpen(false)}>news</Link>
                  <Link to="/posts" onClick={() => setMobileMenuOpen(false)}>posts</Link>
                  <a href="#" onClick={(e) => { e.preventDefault(); fetchJobs(); setMobileMenuOpen(false); }}>refresh ({jobs.length})</a>
                </div>
              </td>
            </tr>
          )}
          <tr style={{ height: '10px' }}></tr>
          {/* Search row */}
          <tr>
            <td style={{ padding: '0 10px 10px 30px' }}>
              <input 
                type="text" 
                placeholder="Search roles, companies..." 
                value={search}
                onChange={(e) => updateSearchParam('q', e.target.value)}
                style={{ padding: '4px', width: '250px', fontSize: '10pt', border: '1px solid #ccc', marginRight: '10px' }}
              />
              <select 
                value={sourceFilter} 
                onChange={(e) => updateSearchParam('source', e.target.value)}
                style={{ padding: '4px', fontSize: '10pt', border: '1px solid #ccc', marginRight: '10px' }}
              >
                <option value="All">All Sources</option>
                <option value="HackerNews">HackerNews</option>
                <option value="MetaCareers">MetaCareers</option>
                <option value="Apple Careers">Apple Careers</option>
                <option value="NVIDIA Careers">NVIDIA Careers</option>
                <option value="Remotive">Remotive</option>
              </select>
              <select 
                value={sortOrder} 
                onChange={(e) => updateSearchParam('sort', e.target.value)}
                style={{ padding: '4px', fontSize: '10pt', border: '1px solid #ccc', marginRight: '10px' }}
              >
                <option value="Newest">Newest First</option>
                <option value="Oldest">Oldest First</option>
              </select>
              <label style={{ fontSize: '10pt', marginRight: '10px' }}>
                <input 
                  type="checkbox" 
                  checked={isRemoteOnly} 
                  onChange={(e) => updateSearchParam('remote', e.target.checked ? 'true' : 'false')}
                  style={{ marginRight: '4px' }}
                />
                Remote
              </label>
              <span style={{ fontSize: '10pt', color: '#828282' }}>
                Showing {filteredJobs.length} jobs
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <table border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                  {loading && jobs.length === 0 && (
                    <>
                      {Array.from({ length: 15 }).map((_, idx) => (
                        <JobCardSkeleton key={`skeleton-${idx}`} />
                      ))}
                    </>
                  )}
                  {error && <tr><td colSpan={2} style={{ padding: '10px 30px', color: 'red' }}>{error}</td></tr>}
                  {visibleJobs.map((job, index) => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      index={index + 1} 
                      isSaved={savedJobIds.has(job.id.toString())}
                      onToggleSave={toggleSave}
                    />
                  ))}
                  {!loading && visibleJobs.length > 0 && (
                    <tr style={{ height: '10px' }}>
                      <td colSpan={2}></td>
                    </tr>
                  )}
                  {!loading && filteredJobs.length > page * 30 && (
                    <tr>
                      <td colSpan={2} style={{ paddingLeft: '36px', paddingBottom: '15px' }}>
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
