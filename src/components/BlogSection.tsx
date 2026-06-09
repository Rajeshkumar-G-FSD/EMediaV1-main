import React from 'react';
import { BLOG_POSTS } from '../data.ts';
import { BlogPost } from '../types.ts';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

interface BlogSectionProps {
  onBlogPostSelect: (post: BlogPost) => void;
}

export default function BlogSection({ onBlogPostSelect }: BlogSectionProps) {
  const featuredPost = BLOG_POSTS[0];
  const listPosts = BLOG_POSTS.slice(1, 5);

  return (
    <section className="bg-gray-50/50 p-6 md:p-8 rounded-lg border border-gray-100" id="blog-section">
      <div className="text-center mb-8 relative">
        <h2 className="text-3xl uppercase bg-white inline-block px-6 relative z-10 font-elegant text-primary" id="blog-title">
          Planning Guide
        </h2>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0" />
      </div>
      <p className="text-center text-sm text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
        Practical tips and real-world lessons gathered from hundreds of weddings to help couples prepare with confidence.
      </p>

      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        {/* Featured Post Card */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between bg-white p-4 rounded border border-gray-100 hover:shadow-lg transition duration-300">
          <div>
            <div className="w-full h-64 bg-gray-200 mb-4 rounded overflow-hidden relative group">
              <img
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                src={featuredPost.image}
              />
              <div className="absolute top-3 left-3 bg-primary text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 flex items-center gap-1.5">
                <BookOpen className="w-3 h-3" />
                Featured story
              </div>
            </div>
            <h3
              onClick={() => onBlogPostSelect(featuredPost)}
              className="text-xl md:text-2xl font-bold text-primary hover:text-opacity-80 transition font-elegant cursor-pointer leading-snug mb-3"
              id={`blog-featured-title-${featuredPost.id}`}
            >
              {featuredPost.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-6">
              {featuredPost.summary}...
            </p>
          </div>

          <button
            onClick={() => onBlogPostSelect(featuredPost)}
            className="text-xs font-bold text-primary hover:underline uppercase tracking-wide flex items-center gap-1 cursor-pointer"
            id={`blog-featured-btn-${featuredPost.id}`}
          >
            Read full article <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Sidebar Post Items */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {listPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onBlogPostSelect(post)}
              className="flex gap-4 items-center bg-white p-3 rounded shadow-xs hover:shadow-md border border-gray-100/85 hover:border-primary/10 transition duration-300 cursor-pointer"
              id={`blog-item-${post.id}`}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                <img
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  src={post.image}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-primary text-sm md:text-base leading-snug hover:text-primary/80 transition mb-1.5 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {post.summary}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
