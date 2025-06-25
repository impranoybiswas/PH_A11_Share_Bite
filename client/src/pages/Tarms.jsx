import { useState } from "react";
import Container from "../customs/Container";
import SectionHead from "../customs/SectionHead";

const Terms = () => {
  const [activeTab, setActiveTab] = useState("terms");

  return (
    <Container>
      <SectionHead
        title="Terms & Conditions"
        subtitle="Read our terms and conditions"
      />

      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("terms")}
          className={`py-2 px-4 font-medium ${
            activeTab === "terms"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Terms & Conditions
        </button>
        <button
          onClick={() => setActiveTab("privacy")}
          className={`py-2 px-4 font-medium ${
            activeTab === "privacy"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Privacy Policy
        </button>
      </div>

      {activeTab === "terms" && (
        <div className="prose prose-lg">
          <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
          <p className="text-gray-600 mb-6">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h3>
            <p className="mb-4">
              Welcome to <strong>Share Bite</strong>! These Terms &
              Conditions govern your use of our website and services. By
              accessing or using our platform, you agree to comply with these
              terms.
            </p>
            <p className="mb-4">
              By using Share Bite, you confirm that you:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Are at least 18 years old (or have parental consent)</li>
              <li>Agree to these terms and any future updates</li>
              <li>Will not misuse the platform for illegal activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              2. Account Registration
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                You must provide accurate information when creating an account
              </li>
              <li>You are responsible for maintaining account security</li>
              <li>
                Share Bite reserves the right to suspend accounts violating
                our policies
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              3. Event Bookings & Payments
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All ticket purchases are final unless stated otherwise</li>
              <li>
                Refunds are subject to the{" "}
                <strong>event organizer's policy</strong>
              </li>
              <li>
                We use secure payment gateways (Stripe, PayPal, etc.), but we
                are not liable for payment processing errors
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              4. User Responsibilities
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Do not post false, misleading, or harmful content</li>
              <li>
                Respect intellectual property rights (no unauthorized sharing of
                event content)
              </li>
              <li>Comply with all applicable laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              5. Cancellations & Refunds
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Event cancellations will be communicated via email</li>
              <li>Refund eligibility depends on the organizer's policy</li>
              <li>Service fees (if any) may be non-refundable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              6. Limitation of Liability
            </h3>
            <p className="mb-4">Share Bite is not responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Event cancellations by organizers</li>
              <li>Injuries, damages, or losses at events</li>
              <li>Technical issues beyond our control</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">7. Changes to Terms</h3>
            <p>
              We may update these terms periodically. Continued use of the
              platform constitutes acceptance of changes.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">8. Governing Law</h3>
            <p>
              These terms are governed by the laws of{" "}
              <strong>[Your Country/State]</strong>.
            </p>
          </section>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">
              For questions, contact us at:
            </h4>
            <p>
              📧 Email:{" "}
              <a href="mailto:legal@ctgeventplus.com" className="text-blue-600">
                legal@ctgeventplus.com
              </a>
            </p>
            <p>📞 Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      )}

      {/* Privacy Policy Content */}
      {activeTab === "privacy" && (
        <div className="prose prose-lg">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="text-gray-600 mb-6">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <p className="mb-4">
              At <strong>Share Bite</strong>, we value your privacy. This
              policy explains how we collect, use, and protect your data.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              1. Information We Collect
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Data</strong>: Name, email, phone, payment
                details (for bookings)
              </li>
              <li>
                <strong>Usage Data</strong>: IP address, browser type, pages
                visited (via cookies)
              </li>
              <li>
                <strong>Event Preferences</strong>: Interests, saved events,
                past bookings
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              2. How We Use Your Data
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process event registrations & payments</li>
              <li>Improve user experience & personalize recommendations</li>
              <li>Send updates, promotions (opt-out available)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">3. Data Sharing</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>With Organizers</strong>: Necessary details for event
                access
              </li>
              <li>
                <strong>With Service Providers</strong>: Payment processors,
                analytics tools
              </li>
              <li>
                <strong>Legal Requirements</strong>: If required by law
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              4. Cookies & Tracking
            </h3>
            <p className="mb-2">We use cookies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Enhance site functionality</li>
              <li>Analyze traffic</li>
            </ul>
            <p className="mt-4">You can disable cookies in browser settings.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">5. Data Security</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption (SSL) for sensitive data</li>
              <li>Regular security audits</li>
              <li>No 100% secure method exists online—use at your own risk</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">6. Your Rights</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, correct, or delete your data</li>
              <li>Opt out of marketing emails</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              7. Children's Privacy
            </h3>
            <p>
              Our service is <strong>not intended for users under 13</strong>.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">8. Policy Updates</h3>
            <p>
              We may update this policy. Check the "Last Updated" date for
              changes.
            </p>
          </section>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Contact Us:</h4>
            <p>
              📧 Email:{" "}
              <a
                href="mailto:privacy@ctgeventplus.com"
                className="text-blue-600"
              >
                privacy@ctgeventplus.com
              </a>
            </p>
            <p>📍 Address: [Your Company Address]</p>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <a href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </a>
      </div>
    </Container>
  );
};

export default Terms;
