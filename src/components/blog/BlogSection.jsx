import React, { useState } from 'react'
import {
  PenLine, Calendar, Tag, ArrowRight, Sparkles,
  ChevronLeft, User, Clock, CheckCircle2, Quote,
} from 'lucide-react'
import { BLOG_POSTS } from '../../data/blogData'
import './BlogSection.css'

export default function BlogSection() {
  const [expandedId, setExpandedId] = useState(null)

  const scrollToBlog = () => {
    const el = document.getElementById('blog')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const openPost = (id) => {
    setExpandedId(id)
    scrollToBlog()
  }

  const closePost = () => {
    setExpandedId(null)
    scrollToBlog()
  }

  // Article (extended) view
  if (expandedId !== null) {
    const post = BLOG_POSTS.find((p) => p.id === expandedId)
    if (post) {
      return (
        <section className="section blog-section" id="blog">
          <div className="container">
            {/* macOS-styled article window */}
            <div className="blog-window blog-article-window">
              <div className="blog-window-chrome">
                <div className="window-controls">
                  <button
                    type="button"
                    className="window-control close"
                    aria-label="Close article"
                    onClick={closePost}
                  />
                  <span className="window-control minimize" />
                  <span className="window-control maximize" />
                </div>
                <span className="blog-window-title">Werka Announcements</span>
                <button type="button" className="window-back" onClick={closePost}>
                  <ChevronLeft size={15} />
                  <span>Back</span>
                </button>
              </div>

              <div className="blog-article">
                <header className="blog-article-header">
                  <div className="blog-article-meta">
                    <span className="blog-tag">
                      <Tag size={11} />
                      {post.tag}
                    </span>
                    <span className="blog-date">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                    <span className="blog-readtime">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="blog-article-title">{post.title}</h2>

                  <div className="blog-article-author">
                    <span className="author-avatar"><User size={14} /></span>
                    <span className="author-name">By {post.author}</span>
                  </div>

                  <p className="blog-article-lead">{post.excerpt}</p>
                </header>

                <div className="blog-article-divider" />

                <div className="blog-article-body">
                  {post.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}

                  {post.points && post.points.length > 0 && (
                    <div className="blog-article-points">
                      <h3 className="points-heading">At a glance</h3>
                      <ul>
                        {post.points.map((point, i) => (
                          <li key={i}>
                            <CheckCircle2 size={16} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {post.closing && (
                    <blockquote className="blog-article-quote">
                      <Quote size={18} className="quote-icon" />
                      <p>{post.closing}</p>
                    </blockquote>
                  )}
                </div>

                <footer className="blog-article-footer">
                  <button type="button" className="blog-article-back-btn" onClick={closePost}>
                    <ChevronLeft size={16} />
                    Back to announcements
                  </button>
                </footer>
              </div>
            </div>
          </div>
        </section>
      )
    }
  }

  // List (overview) view
  return (
    <section className="section blog-section" id="blog">
      <div className="container">
        {/* Section header */}
        <div className="section-header blog-header">
          <div className="header-badge">
            <PenLine size={14} />
            <span>Blog & News</span>
          </div>
          <h2 className="section-title">
            <span className="title-rest">Werka</span>
            <span className="title-highlight">Announcements</span>
          </h2>
          <p className="section-desc">
            Fresh news, events, and updates from our kitchens across Addis Ababa.
          </p>
        </div>

        {/* macOS-styled container */}
        <div className="blog-window">
          <div className="blog-window-chrome">
            <div className="window-controls">
              <span className="window-control close" />
              <span className="window-control minimize" />
              <span className="window-control maximize" />
            </div>
            <span className="blog-window-title">Werka Announcements</span>
            <span className="window-spacer" />
          </div>

          <div className="blog-window-body">
            <div className="blog-list">
              {BLOG_POSTS.map((post) => (
                <article key={post.id} className="blog-post">
                  <div className="blog-post-main">
                    <div className="blog-post-meta">
                      <span className="blog-tag">
                        <Tag size={11} />
                        {post.tag}
                      </span>
                      <span className="blog-date">
                        <Calendar size={11} />
                        {post.date}
                      </span>
                      <span className="blog-readtime">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="blog-post-title">{post.title}</h3>
                    <p className="blog-post-excerpt">{post.excerpt}</p>

                    <button
                      type="button"
                      className="blog-post-toggle"
                      onClick={() => openPost(post.id)}
                    >
                      <span>Read more</span>
                      <ArrowRight size={14} className="blog-toggle-arrow" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <footer className="blog-window-footer">
              <Sparkles size={13} />
              <span>Follow us for more kitchen stories & announcements</span>
            </footer>
          </div>
        </div>
      </div>
    </section>
  )
}
