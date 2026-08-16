import React, { useState, FormEvent } from 'react';
import { BookOpen, Plus, Trash2, Edit3, Save, X, CheckCircle2, Tag } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';
import { BlogPost } from '../../types';

export function AdminArticlesTab() {
  const { blogPostsData, setBlogPostsData } = useSiteData();
  const [editingArticle, setEditingArticle] = useState<BlogPost | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [msg, setMsg] = useState('');

  const notify = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 4000);
  };

  const emptyArticle: BlogPost = {
    id: `post-${Date.now()}`,
    slug: `article-${Date.now()}`,
    title: '',
    excerpt: '',
    content: '',
    category: 'Healthcare IT',
    publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    readTime: '5 min read',
    author: 'Asem Alhammadi, M.Sc., PMP',
    tags: ['Systems Integration', 'Public Safety'],
    likes: 12,
    featured: false
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    if (isAdding) {
      setBlogPostsData(prev => [editingArticle, ...prev]);
      notify('New technical article published!');
    } else {
      setBlogPostsData(prev => prev.map(a => a.id === editingArticle.id ? editingArticle : a));
      notify('Article updated successfully!');
    }
    setEditingArticle(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this article from publications?')) {
      setBlogPostsData(prev => prev.filter(a => a.id !== id));
      notify('Article removed.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {msg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{msg}</span>
        </div>
      )}

      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>Technical Articles & Thought Leadership</span>
          </h4>
          <p className="text-xs text-slate-400">Manage blog articles, markdown content, and tags.</p>
        </div>

        <button
          onClick={() => {
            setEditingArticle(emptyArticle);
            setIsAdding(true);
          }}
          className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Article Form */}
      {editingArticle && (
        <form onSubmit={handleSave} className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h5 className="text-xs font-bold text-emerald-300 uppercase">
              {isAdding ? 'Compose New Article' : 'Edit Article Content'}
            </h5>
            <button type="button" onClick={() => setEditingArticle(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-300">Article Title</label>
              <input
                type="text"
                required
                value={editingArticle.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                  setEditingArticle({ ...editingArticle, title, slug: slug || editingArticle.slug });
                }}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Category</label>
              <select
                value={editingArticle.category}
                onChange={(e) => setEditingArticle({
                  ...editingArticle,
                  category: e.target.value as 'Physical Security' | 'Healthcare IT' | 'Project Management' | 'Networking'
                })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              >
                <option value="Healthcare IT">Healthcare IT</option>
                <option value="Physical Security">Physical Security</option>
                <option value="Project Management">Project Management</option>
                <option value="Networking">Networking</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Read Time</label>
              <input
                type="text"
                value={editingArticle.readTime}
                onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Short Excerpt / Teaser</label>
              <textarea
                rows={2}
                value={editingArticle.excerpt}
                onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Full Markdown Content</label>
              <textarea
                rows={8}
                value={editingArticle.content}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Tags (comma separated)</label>
              <input
                type="text"
                value={editingArticle.tags.join(', ')}
                onChange={(e) => setEditingArticle({
                  ...editingArticle,
                  tags: e.target.value.split(',').map(s => s.trim())
                })}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingArticle(null)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Publish Article
            </button>
          </div>
        </form>
      )}

      {/* Articles List */}
      <div className="space-y-3">
        {blogPostsData.map((art) => (
          <div key={art.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h5 className="text-sm font-bold text-white">{art.title}</h5>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  {art.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">{art.excerpt}</p>
              <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-1">
                <span>{art.publishedDate}</span>
                <span>•</span>
                <span>{art.readTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => { setEditingArticle(art); setIsAdding(false); }}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(art.id)}
                className="p-2 rounded-lg bg-rose-500/10 text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
