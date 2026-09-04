import React, { useState } from 'react'
import { PenLine, Calendar, Tag, ArrowRight, Sparkles } from 'lucide-react'
import { BLOG_POSTS } from '../../data/blogData'
import './BlogSection.css'

export default function BlogSection() {
  const [expandedId, setExpandedId] = useState(null)

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
    window.scrollTo(0, 0)
  }

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
              {BLOG_POSTS.map((post) => {
                const isOpen = expandedId === post.id
                return (
                  <article
                    key={post.id}
                    className={`blog-post ${isOpen ? 'is-open' : ''}`}
                  >
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
                      </div>

                      <h3 className="blog-post-title">{post.title}</h3>
                      <p className="blog-post-excerpt">{post.excerpt}</p>

                      <button
                        type="button"
                        className="blog-post-toggle"
                        onClick={() => toggle(post.id)}
                        aria-expanded={isOpen}
                      >
                        <span>{isOpen ? 'Read less' : 'Read more'}</span>
                        <ArrowRight
                          size={14}
                          className={`blog-toggle-arrow ${isOpen ? 'flip' : ''}`}
                        />
                      </button>
                    </div>

                    {isOpen && (
                      <div className="blog-post-body">
                        <div className="blog-post-divider" />
                        <p>{post.body}</p>
                      </div>
                    )}
                  </article>
                )
              })}
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
