import React, { useState } from 'react';
import { API } from '../lib/nav.js';
import { GithubIcon, LinkedinIcon, MailIcon, LeetcodeIcon, LocationIcon } from './Icons.jsx';

export default function Contact({ profile, visits }) {
  const [state, setState] = useState({ status: 'idle', error: '' });
  const [copied, setCopied] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState({ status: 'sending', error: '' });
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Message failed to send.');
      e.currentTarget.reset();
      setState({ status: 'sent', error: '' });
    } catch (err) {
      setState({ status: 'error', error: err.message });
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <section className="df-section contact-section" id="contact">
      <div className="df-container">
        <div className="section-header">
          <h2 className="section-title">Contact Me ☎️</h2>
          <p className="section-subtitle">LET'S CONNECT, COLLABORATE OR BUILD SOMETHING EXTRAORDINARY</p>
        </div>

        <div className="contact-main-grid">
          <div className="contact-info-col">
            <h3 className="reach-out-title">Reach Out to me!</h3>
            <p className="reach-out-text">
              DISCUSS A PROJECT, AN INTERNSHIP, MULTI-AGENT AI COLLABORATIONS OR JUST WANT TO SAY HI? MY INBOX IS OPEN FOR ALL.
            </p>

            <div className="contact-details-box">
              <div className="contact-item">
                <LocationIcon size={20} className="contact-icon" />
                <span className="contact-text">{profile.location || 'Bhopal, India'}</span>
              </div>

              <div className="contact-item">
                <span className="opp-indicator" />
                <span className="contact-text">
                  Open for Opportunities:{' '}
                  <strong className="opp-status">Yes (AI/ML & Full Stack)</strong>
                </span>
              </div>

              <div className="contact-email-card">
                <div className="email-meta">
                  <MailIcon size={18} />
                  <a href={`mailto:${profile.email}`} className="email-link">
                    {profile.email}
                  </a>
                </div>
                <button
                  className="copy-email-btn"
                  onClick={copyEmail}
                  type="button"
                  title="Copy email to clipboard"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="contact-social-row">
              {profile.links?.github && (
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn github"
                  title="GitHub Profile"
                >
                  <GithubIcon size={20} />
                </a>
              )}
              {profile.links?.linkedin && (
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn linkedin"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon size={20} />
                </a>
              )}
              {profile.links?.leetcode && (
                <a
                  href={profile.links.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn leetcode"
                  title="LeetCode Profile"
                >
                  <LeetcodeIcon size={20} />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="contact-social-btn mail"
                  title="Direct Mail"
                >
                  <MailIcon size={20} />
                </a>
              )}
            </div>
          </div>

          <div className="contact-form-col">
            <div className="contact-form-card">
              <h3 className="form-heading">Send a Message</h3>
              <form onSubmit={submit} noValidate>
                <div className="form-group">
                  <label htmlFor="name-input">Your Name</label>
                  <input
                    id="name-input"
                    name="name"
                    type="text"
                    placeholder="e.g. John Doe"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={80}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email-input">Your Email</label>
                  <input
                    id="email-input"
                    name="email"
                    type="email"
                    placeholder="e.g. john@example.com"
                    autoComplete="email"
                    required
                    maxLength={120}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message-input">Your Message</label>
                  <textarea
                    id="message-input"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, opportunity, or say hi..."
                    required
                    minLength={10}
                    maxLength={2000}
                  />
                </div>

                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                <button
                  type="submit"
                  className="df-btn df-btn-primary form-submit-btn"
                  disabled={state.status === 'sending'}
                >
                  {state.status === 'sending' ? (
                    <>
                      <span className="spinner" />
                      <span>Sending Message…</span>
                    </>
                  ) : (
                    'SEND MESSAGE'
                  )}
                </button>

                {state.status === 'sent' && (
                  <div className="form-alert success" role="alert">
                    <span>✓ Message received! I'll get back to you shortly.</span>
                  </div>
                )}

                {state.status === 'error' && (
                  <div className="form-alert error" role="alert">
                    <span>{state.error || 'Failed to send message. Please try again.'}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {visits != null && (
          <div className="visitor-badge-wrap">
            <div className="visitor-badge">
              <span className="visitor-dot" />
              <span>You are visitor number <strong>{visits.toLocaleString('en-IN')}</strong></span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
