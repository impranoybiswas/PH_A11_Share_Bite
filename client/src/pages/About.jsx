import React from "react";
import Container from "../customs/Container";
import SectionHead from "../customs/SectionHead";

function About() {
  return (
    <Container>
      <SectionHead title="About Us" />
      <p className="text-justify mb-3">
        Welcome to <span className="font-semibold">Share Bite</span>, your
        ultimate platform for discovering exciting events near you! Whether
        you're looking for concerts, workshops, sports events, or networking
        meetups, we bring the best experiences right to your fingertips.
      </p>
      <p className="my-2 w-full">
        Our mission is simple :
        <span className="font-semibold ml-2">
          help people explore, book, and enjoy events effortlessly.
        </span>
      </p>
      <h1 className="text-2xl font-semibold my-2">Why Choose Event Explorer?</h1>
      <ul className="w-full">
        <li>
          ✅ Smart Search – Find events tailored to your interests, location,
          and schedule.
        </li>
        <li>
          ✅ Trusted Listings – Only verified events from trusted organizers.
        </li>
        <li>✅ Easy Booking – Secure tickets in just a few clicks.</li>
        <li>
          ✅ Personalized Recommendations – Get suggestions based on your
          preferences.
        </li>
        <li>
          ✅ Real-Time Updates – Never miss out with instant event
          notifications.
        </li>
      </ul>
      <h1 className="text-2xl font-semibold my-3">Our Story</h1>
      <p className="text-justify">
        Founded in 2022, Event Explorer started as a passion project to solve
        one problem: making event discovery hassle-free. Today, we’ve grown into
        a vibrant community of event-goers and organizers, connecting thousands
        of people to unforgettable experiences.
      </p>
    </Container>
  );
}

export default About;
