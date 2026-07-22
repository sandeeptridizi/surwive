import { useEffect, useState, type CSSProperties } from 'react'
import { SectionHead } from '../components/SectionHead'
import {
  IconArrowUpRight,
  IconCheck,
  IconClock,
  IconSpark,
  IconStar,
} from '../components/icons'
import { blogCategories, blogCategoryOf, blogPosts, type BlogBlock, type BlogPost } from '../data/blog'
import { initials, slugifyHeading } from '../lib/utils'

const POSTS_PER_PAGE = 6

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cat = blogCategoryOf(post)
  const Icon = cat.icon
  return (
    <a
      href={`#/blog/${post.slug}`}
      className="blog-card"
      style={{ '--blog-accent': cat.color, animationDelay: `${index * 70}ms` } as CSSProperties}
    >
      <div className="blog-card__top">
        <span className="blog-card__badge" aria-hidden="true"><Icon /></span>
        <span className="blog-card__chip">{post.category}</span>
      </div>
      <div className="blog-card__meta">
        <span>{post.date}</span>
        <span className="blog-card__dot" aria-hidden="true" />
        <span><IconClock /> {post.readTime}</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="blog-card__foot">
        <span className="blog-card__author">
          <span className="blog-card__avatar" aria-hidden="true">{initials(post.author)}</span>
          <span className="blog-card__who">
            <strong>{post.author}</strong>
            <span>{post.role}</span>
          </span>
        </span>
        <span className="blog-card__arrow" aria-hidden="true"><IconArrowUpRight /></span>
      </div>
    </a>
  )
}

function BlogFeatured({ post }: { post: BlogPost }) {
  const cat = blogCategoryOf(post)
  const Icon = cat.icon
  return (
    <a
      href={`#/blog/${post.slug}`}
      className="blog-feature"
      style={{ '--blog-accent': cat.color } as CSSProperties}
    >
      <div className="blog-feature__cover" aria-hidden="true">
        <span className="blog-feature__rings" />
        <Icon />
        <span className="blog-card__chip">{post.category}</span>
      </div>
      <div className="blog-feature__body">
        <span className="blog-feature__flag"><IconStar /> Featured article</span>
        <div className="blog-card__meta">
          <span>{post.date}</span>
          <span className="blog-card__dot" aria-hidden="true" />
          <span><IconClock /> {post.readTime}</span>
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="blog-feature__foot">
          <span className="blog-card__author">
            <span className="blog-card__avatar" aria-hidden="true">{initials(post.author)}</span>
            <span className="blog-card__who">
              <strong>{post.author}</strong>
              <span>{post.role}</span>
            </span>
          </span>
          <span className="blog-feature__cta">Read article <IconArrowUpRight /></span>
        </div>
      </div>
    </a>
  )
}

function BlogList() {
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = category === 'All' ? blogPosts : blogPosts.filter((p) => p.category === category)
  const [featured, ...rest] = filtered
  const pageCount = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE))
  const visible = rest.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  const pickCategory = (name: string) => {
    setCategory(name)
    setPage(1)
  }
  const gotoPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), pageCount))
    window.scrollTo({ top: 0 })
  }

  return (
    <section className="blog">
      <SectionHead
        eyebrow="Career resources"
        title="Insights to move your career forward"
        sub="Practical guides on interviews, resumes, salaries, and switching lanes — written by people who hire, coach, and got there themselves."
      />

      <div className="blog__filters reveal" role="tablist" aria-label="Blog categories">
        <button
          type="button"
          role="tab"
          aria-selected={category === 'All'}
          className={`blog-pill ${category === 'All' ? 'is-active' : ''}`}
          style={{ '--blog-accent': 'var(--accent)' } as CSSProperties}
          onClick={() => pickCategory('All')}
        >
          <IconSpark /> All articles <span className="blog-pill__count">{blogPosts.length}</span>
        </button>
        {blogCategories.map((cat) => {
          const Icon = cat.icon
          const count = blogPosts.filter((p) => p.category === cat.name).length
          return (
            <button
              type="button"
              role="tab"
              aria-selected={category === cat.name}
              key={cat.name}
              className={`blog-pill ${category === cat.name ? 'is-active' : ''}`}
              style={{ '--blog-accent': cat.color } as CSSProperties}
              onClick={() => pickCategory(cat.name)}
            >
              <Icon /> {cat.name} <span className="blog-pill__count">{count}</span>
            </button>
          )
        })}
      </div>

      <div className="blog__stream" key={`${category}-${page}`}>
        {page === 1 && featured && <BlogFeatured post={featured} />}

        {visible.length > 0 && (
          <div className="blog__grid">
            {visible.map((post, i) => (
              <BlogCard post={post} index={i} key={post.slug} />
            ))}
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <nav className="blog__pagination" aria-label="Blog pages">
          <button type="button" onClick={() => gotoPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              type="button"
              key={i}
              className={page === i + 1 ? 'is-active' : ''}
              aria-current={page === i + 1 ? 'page' : undefined}
              onClick={() => gotoPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button type="button" onClick={() => gotoPage(page + 1)} disabled={page === pageCount}>
            Next
          </button>
        </nav>
      )}
    </section>
  )
}

function BlogArticle({ post }: { post: BlogPost }) {
  const cat = blogCategoryOf(post)
  const Icon = cat.icon
  const [copied, setCopied] = useState(false)
  const [activeHeading, setActiveHeading] = useState('')

  const headings = post.sections
    .filter((s): s is BlogBlock & { heading: string } => Boolean(s.heading))
    .map((s) => ({ text: s.heading, id: slugifyHeading(s.heading) }))

  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3)

  useEffect(() => {
    setActiveHeading('')
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.article__block h2[id]'))
    if (!targets.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -70% 0px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [post.slug])

  const share = (network: 'x' | 'linkedin') => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(post.title)
    const target =
      network === 'x'
        ? `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    window.open(target, '_blank', 'noopener,noreferrer')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section className="blog blog--article" style={{ '--blog-accent': cat.color } as CSSProperties} key={post.slug}>
      <a href="#/blog" className="article__back">← All articles</a>

      <header className="article-hero">
        <div className="article-hero__main">
          <span className="article__chip">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="article-hero__excerpt">{post.excerpt}</p>
          <div className="article__meta">
            <span className="article__avatar" aria-hidden="true">{initials(post.author)}</span>
            <span className="article__byline">
              <strong>{post.author}</strong>
              <span>{post.role}</span>
            </span>
            <span className="article__meta-sep" aria-hidden="true" />
            <span className="article__stat">{post.date}</span>
            <span className="article__stat"><IconClock /> {post.readTime}</span>
          </div>
        </div>
        <div className="article-hero__art" aria-hidden="true">
          <span className="blog-feature__rings" />
          <Icon />
        </div>
      </header>

      <div className="article-layout">
        <article className="article__body">
          <p className="article__intro">{post.intro}</p>
          {post.sections.map((block, i) => (
            <div className="article__block" key={i}>
              {block.heading && <h2 id={slugifyHeading(block.heading)}>{block.heading}</h2>}
              {block.text && <p>{block.text}</p>}
              {block.list && (
                <ul>
                  {block.list.map((item) => (
                    <li key={item}>
                      <span className="article__bullet" aria-hidden="true"><IconCheck /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="article__tags">
            <span>Tags:</span>
            {post.tags.map((tag) => (
              <span className="article__tag" key={tag}>{tag}</span>
            ))}
          </div>
        </article>

        <aside className="article-side">
          {headings.length > 0 && (
            <nav className="article-side__card article-toc" aria-label="On this page">
              <h3>On this page</h3>
              <ul>
                {headings.map((h) => (
                  <li key={h.id}>
                    <button
                      type="button"
                      className={activeHeading === h.id ? 'is-active' : ''}
                      onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    >
                      {h.text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="article-side__card article-side__share">
            <h3>Share this article</h3>
            <div className="article__share-btns">
              <button type="button" onClick={() => share('x')}>X / Twitter</button>
              <button type="button" onClick={() => share('linkedin')}>LinkedIn</button>
              <button type="button" onClick={copyLink}>{copied ? 'Link copied!' : 'Copy link'}</button>
            </div>
          </div>

          <div className="article-side__card article-side__author">
            <div className="article-side__author-head">
              <span className="article__avatar article__avatar--lg" aria-hidden="true">{initials(post.author)}</span>
              <div>
                <h3>{post.author}</h3>
                <span className="article__author-role">{post.role}</span>
              </div>
            </div>
            <p>{post.bio}</p>
          </div>

          <div className="article-side__card article-side__cta">
            <span className="article-side__cta-icon"><IconSpark /></span>
            <strong>Put it into practice</strong>
            <p>25,000+ live roles are waiting. Let the copilot find your match.</p>
            <a href="#jobs" className="btn btn--solid">Browse jobs <IconArrowUpRight /></a>
          </div>
        </aside>
      </div>

      <div className="blog__related">
        <h2>Keep reading</h2>
        <div className="blog__grid blog__grid--related">
          {related.map((p, i) => (
            <BlogCard post={p} index={i} key={p.slug} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function BlogPage({ slug }: { slug: string | null }) {
  const post = slug ? blogPosts.find((p) => p.slug === slug) : undefined
  if (post) return <BlogArticle post={post} />
  return <BlogList />
}
