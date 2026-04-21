import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticlesBg from "../components/ParticlesBg";

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  useEffect(() => {
    // Title animation (on load)
    gsap.from(".blog-title", {
      y: -60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Cards animation (on scroll)
    gsap.utils.toArray(".blog-card").forEach((card) => {
      gsap.from(card, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",   // when card enters viewport
          toggleActions: "play none none none",
        },
      });
    });

    // cleanup (important in React)
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const blogs = [
    { title: "Real-time Chat with Socket.IO", desc: "Build real-time chat using Socket.IO and React." },
    { title: "Room-based Chat System", desc: "Create private rooms and group chats." },
    { title: "Scaling Chat Applications", desc: "Use Redis and clustering to scale." },
    { title: "Connect Instantly and Chat Freely", desc: "Chat One-on-One." },
    { title: "UI/UX for Messaging Apps", desc: "Design clean chat interfaces." },
    { title: "Typing Indicators & Presence", desc: "Show who’s online and typing." },
  ];

  return (
    <div className="relative min-h-screen text-white px-6 py-10 overflow-hidden">
      
      {/* 🔥 Background */}
      <div className="absolute inset-0 -z-10">
        <ParticlesBg />
      </div>

      {/* Title */}
      <h1 className="blog-title text-4xl md:text-5xl font-bold text-center mb-12">
        ChatOn Blogs
      </h1>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="blog-card bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-xl font-semibold mb-3 text-blue-400">
              {blog.title}
            </h2>
            <p className="text-gray-300">{blog.desc}</p>

            <button className="mt-4 text-sm text-blue-500 hover:underline">
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}