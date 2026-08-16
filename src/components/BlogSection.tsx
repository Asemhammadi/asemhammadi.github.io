import { useState, useRef, useCallback } from 'react';
import { BookOpen, Search, Clock, Calendar, User, Tag, ArrowRight, X } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import { BlogPost } from '../types';
import { useModalA11y } from '../hooks/useModalA11y';

export function BlogSection() {
  const { blogPostsData } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeArticle = useCallback(() => setActiveArticle(null), []);

  useModalA11y(activeArticle !== null, closeArticle, panelRef);

  const categories = ['All', 'Healthcare IT', 'Project Management', 'Networking', 'Physical Security'];

  const openArticle = (post: BlogPost) => {
    setActiveArticle(post);
  };

  const filteredPosts = blogPostsData.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Insights & Engineering SOPs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Articles & Thought Leadership
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Articles authored by Asem Alhammadi on physical security integration, healthcare IT networks, and PMP site readiness.
          </p>
        </div>

        {/* Search & Category Filter Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
          
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`blog-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="blog-search-input"
              type="text"
              placeholder="Search articles & topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group"
            >
              <div className="space-y-4">
                
                {/* Meta header */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {post.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Footer CTA */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  id={`read-article-${post.id}`}
                  onClick={() => openArticle(post)}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Read Technical Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {post.readTime}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          id="article-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
          onClick={closeArticle}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >

            {/* Reader Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md p-6 border-b border-slate-800 flex items-start justify-between gap-4 z-10">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  {activeArticle.category} Article
                </span>
                <h3 id="article-modal-title" className="text-2xl font-extrabold text-white mt-1">
                  {activeArticle.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1 text-slate-200 font-medium">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    {activeArticle.author}
                  </span>
                  <span>•</span>
                  <span>{activeArticle.publishedDate}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              <button
                id="close-article-modal-btn"
                onClick={closeArticle}
                aria-label="Close article"
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reader Content Body */}
            <div className="p-6 sm:p-8 text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed prose prose-invert max-w-none">
              {activeArticle.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={i} className="text-2xl font-extrabold text-white pt-2">{paragraph.replace('# ', '')}</h1>;
                }
                if (paragraph.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-bold text-emerald-400 pt-4 border-b border-slate-800 pb-1">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={i} className="text-lg font-bold text-teal-300 pt-2">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n- ');
                  return (
                    <ul key={i} className="space-y-1.5 my-2 pl-4 border-l-2 border-emerald-500/40">
                      {items.map((it, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-slate-300">{it.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="text-slate-300 leading-relaxed text-xs sm:text-sm">{paragraph}</p>;
              })}
            </div>

            {/* Reader Footer Actions */}
            <div className="p-6 border-t border-slate-800 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Written by {activeArticle.author}
              </span>

              <button
                id="close-article-footer-btn"
                onClick={closeArticle}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
