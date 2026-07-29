import React, { useState } from 'react';
import { Job } from '../types';
import { formatDistanceToNow } from 'date-fns';

export function JobCardSkeleton() {
  return (
    <>
      <tr>
        <td align="right" valign="top" className="title" style={{ paddingRight: '4px', minWidth: '30px' }}>
          <div className="skeleton-box" style={{ width: '15px', height: '14px', marginTop: '2px' }}></div>
        </td>
        <td valign="top">
          <div className="skeleton-box" style={{ width: '60%', height: '14px', marginBottom: '4px' }}></div>
        </td>
      </tr>
      <tr>
        <td colSpan={1}></td>
        <td className="item-subtext" style={{ paddingBottom: '5px' }}>
          <div className="skeleton-box" style={{ width: '40%', height: '12px' }}></div>
        </td>
      </tr>
    </>
  );
}

export function JobCard({ job, index, isSaved, onToggleSave }: { job: Job; index: number; isSaved: boolean; onToggleSave: (id: string) => void }) {
  const [copied, setCopied] = useState(false);
  const timeString = job.time ? formatDistanceToNow(job.time * 1000, { addSuffix: true }) : '';
  
  let domain = '';
  try {
    const parsed = new URL(job.url);
    domain = parsed.hostname.replace(/^www\./, '');
  } catch (e) {
    domain = '';
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: job.title,
        url: job.url
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(job.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <tr>
        <td align="right" valign="top" className="title" style={{ paddingRight: '4px', minWidth: '30px' }}>
          <span className="item-subtext" style={{ fontSize: '10pt' }}>{index}.</span>
        </td>
        <td valign="top">
          <a href={job.url} className="item-title" target="_blank" rel="noopener noreferrer">
            {job.title} {job.company && job.company !== 'Unknown' ? `at ${job.company}` : ''}
          </a>
          {domain && (
            <span className="item-domain">
              {' '}
              (<a href={job.url} target="_blank" rel="noopener noreferrer">{domain}</a>)
            </span>
          )}
        </td>
      </tr>
      <tr>
        <td colSpan={1}></td>
        <td className="item-subtext" style={{ paddingBottom: '5px' }}>
          {timeString} | {job.location} | via {job.source} |{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); onToggleSave(job.id.toString()); }}>
            {isSaved ? 'un-save' : 'save'}
          </a> |{' '}
          <a href="#" onClick={handleShare}>
            {copied ? 'copied!' : 'share'}
          </a>
        </td>
      </tr>
    </>
  );
}
