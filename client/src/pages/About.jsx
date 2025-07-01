import React from "react";
import Container from "../customs/Container";

export default function About() {
  return (
    <Container>
    <section className="min-h-screen px-6 md:px-16 pb-10 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          About <br className="md:hidden"/><span className="text-primary">Share Bite</span>
        </h1>

        {/* Mission Statement */}
        <p className="text-center text-lg max-w-3xl mx-auto">
          Share Bite is a platform dedicated to reducing food waste and promoting
          community sharing. Whether it's leftovers from a party, surplus food from
          an event, or excess groceries, Share Bite makes it easy to donate and share food with those in need.
        </p>

        {/* Our Mission Section */}
        <div className="bg-gray-100 rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">🌱 Our Mission</h2>
          <p>
            Every day, tons of edible food goes to waste while millions go hungry.
            Our mission is to create a sustainable and socially responsible way for
            individuals, event organizers, restaurants, and communities to share
            surplus food efficiently — minimizing waste and maximizing impact.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📦 Share</h3>
            <p>Post available food after your event or meal, specifying location, type, and quantity.</p>
          </div>
          <div className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🤝 Connect</h3>
            <p>Nearby individuals or organizations can view listings and request pickup or delivery.</p>
          </div>
          <div className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🌍 Impact</h3>
            <p>Reduce food waste, support those in need, and contribute to a sustainable community.</p>
          </div>
        </div>

        {/* Impact Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold mb-4">🌟 Together, We Make a Difference</h2>
          <p className="max-w-3xl mx-auto">
            Share Bite is more than just a website — it's a movement for good. Each shared meal
            helps someone in need and reduces our collective environmental footprint.
            Join us in making food accessible, saving the planet, and building stronger communities.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <a
            href="/contact"
            className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-full hover:bg-primary-dark transition"
          >
            Get Involved
          </a>
        </div>
      </div>
    </section>
    </Container>
  );
}
