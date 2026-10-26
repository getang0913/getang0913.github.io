"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile, searchIndex } from "../content";

const navItems = [
  { label: "Candidate statement", href: "/statement" },
  { label: "Research", href: "/#research" },
  { label: "Teaching", href: "/#teaching" },
  { label: "Service", href: "/#service" },
  { label: "Feedback", href: "/#feedback" },
];

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      className="icon-button"
      type="button"
      aria-label={dark ? "Use light theme" : "Use dark theme"}
      title={dark ? "Use light theme" : "Use dark theme"}
      onClick={toggleTheme}
    >
      <span aria-hidden="true">{dark ? "☀" : "◐"}</span>
    </button>
  );
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return searchIndex.slice(0, 6);
    return searchIndex
      .filter((item) =>
        `${item.title} ${item.description} ${item.category} ${item.keywords}`
          .toLowerCase()
          .includes(normalized),
      )
      .slice(0, 8);
  }, [query]);

  return (
    <div className="search-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="search-heading">
          <div>
            <p className="eyebrow">Explore the site</p>
            <h2 id="search-title">Search</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close search">
            ×
          </button>
        </div>
        <label className="search-field">
          <span aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search research, publications, projects…"
          />
        </label>
        <div className="search-results" aria-live="polite">
          {results.length ? (
            results.map((result) => (
              <Link key={`${result.href}-${result.title}`} href={result.href} onClick={onClose}>
                <span className="search-category">{result.category}</span>
                <strong>{result.title}</strong>
                <small>{result.description}</small>
              </Link>
            ))
          ) : (
            <p className="empty-state">No results yet. Try a broader keyword.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "/" && !event.metaKey && !event.ctrlKey) {
        const target = event.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          event.preventDefault();
          setSearchOpen(true);
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label={`${profile.name} home`}>
          <span className="wordmark-mark" aria-hidden="true">{profile.initials}</span>
          <span>{profile.name}</span>
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          Menu
        </button>
        <nav id="primary-navigation" className={menuOpen ? "primary-nav is-open" : "primary-nav"}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/publications" onClick={() => setMenuOpen(false)}>Publications</Link>
          <Link href="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link href="/cv" onClick={() => setMenuOpen(false)}>CV</Link>
        </nav>
        <div className="header-actions">
          <button className="search-button" type="button" aria-label="Search site" onClick={() => setSearchOpen(true)}>
            <span aria-hidden="true">⌕</span>
            <span>Search</span>
            <kbd>/</kbd>
          </button>
          <ThemeToggle />
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div>
          <span className="wordmark-mark" aria-hidden="true">{profile.initials}</span>
          <p><strong>{profile.name}</strong><br />Instructional Systems Technology</p>
        </div>
        <p>Indiana University Bloomington</p>
        <a href={`mailto:${profile.email}`}>Start a conversation ↗</a>
      </footer>

      {searchOpen ? <SearchDialog onClose={() => setSearchOpen(false)} /> : null}
    </>
  );
}
