import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Makenzie',
  description: 'Privacy Policy for Makenzie - AI & Data Engineering Solutions',
}

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-900 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Last updated: January 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="prose prose-slate max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg leading-8 text-gray-600">
              At Makenzie, we are committed to protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you
              visit our website or use our services.
            </p>
          </section>

          {/* Who We Are */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Who We Are</h2>
            <p className="text-gray-600">
              Makenzie is an AI & Data Engineering solutions provider. We act as the data controller for personal data
              we collect through our website and services. This website serves as a marketing platform, and any
              personal data acquired is intended solely for marketing and service delivery purposes.
            </p>
            <p className="mt-4 text-gray-600">
              If you have any questions regarding this Privacy Policy, please contact us at{' '}
              <a href="mailto:info@makenzie.co" className="font-semibold text-slate-900 hover:text-slate-700">
                info@makenzie.co
              </a>
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What Personal Data Do We Collect?</h2>

            <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900">Information You Provide to Us:</h3>
            <p className="text-gray-600">When you interact with our website or contact us, you may provide:</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Contact Information:</strong> Name, email address, phone number, company name, job title,
                  city, and location
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Communication Content:</strong> Messages, inquiries, and any information you share through our
                  contact forms
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Professional Information:</strong> LinkedIn profile, resume details, and other professional
                  information if you apply for positions or request consultations
                </span>
              </li>
            </ul>

            <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900">Information Collected Automatically:</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Usage Data:</strong> IP address, browser type and version, pages viewed, time spent on pages,
                  referral source
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Device Information:</strong> Device type, operating system, unique device identifiers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Cookies:</strong> See our Cookie Policy section below for more details
                </span>
              </li>
            </ul>
          </section>

          {/* How We Use Your Data */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Do We Use Your Personal Data?</h2>
            <p className="text-gray-600">We process your personal data for the following purposes:</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Service Delivery:</strong> To respond to your inquiries, provide consultations, and deliver
                  our AI & data engineering services
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Communication:</strong> To send you information about our services, updates, and respond to
                  your requests
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Marketing:</strong> To send promotional materials, newsletters, and information about services
                  that may interest you (with your consent)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Website Improvement:</strong> To analyze usage patterns and improve our website functionality
                  and user experience
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights and
                  interests
                </span>
              </li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Do We Share Your Personal Data?</h2>
            <p className="text-gray-600">
              We are committed to protecting your privacy. We do not sell, rent, or trade your personal information to
              third parties for marketing purposes.
            </p>

            <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900">
              We may share your data with the following parties:
            </h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Service Providers:</strong> Third-party vendors who assist with website hosting, email
                  delivery, analytics, and other services (e.g., Resend for email)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and
                  safety
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Business Transfers:</strong> In connection with mergers, acquisitions, or sale of assets
                  (subject to this Privacy Policy)
                </span>
              </li>
            </ul>

            <p className="mt-6 text-gray-600">
              All third-party service providers are required to maintain appropriate security measures and use your
              personal data only as instructed by us.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Long Do We Keep Your Data?</h2>
            <p className="text-gray-600">
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in this
              Privacy Policy, unless a longer retention period is required by law.
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  If you request deletion of your data, we will delete it promptly unless legally required to retain it
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  Data from active business relationships will be retained as long as the relationship continues
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  Data from prospective clients will be retained for up to 1 year for analytics and marketing purposes
                </span>
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Do We Use Cookies?</h2>
            <p className="text-gray-600">
              Our website uses minimal essential cookies necessary for the website to function properly. We do not use
              tracking cookies or analytics cookies at this time. If this changes in the future, we will update this
              policy and provide you with information about cookie management options.
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Is Your Data Secure?</h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational security measures to protect your personal data
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>Secure data transmission using encryption (HTTPS)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>Access controls and authentication mechanisms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>Regular security assessments and updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>Employee training on data protection and confidentiality</span>
              </li>
            </ul>
            <p className="mt-6 text-gray-600">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your
              personal data, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">What Are Your Rights?</h2>
            <p className="text-gray-600">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Right to Access:</strong> Request a copy of the personal data we hold about you
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Right to Erasure:</strong> Request deletion of your personal data
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Right to Restriction:</strong> Request limitation of processing of your data
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Right to Object:</strong> Object to processing of your data for marketing purposes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-900" />
                <span>
                  <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on
                  consent
                </span>
              </li>
            </ul>

            <p className="mt-6 text-gray-600">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:info@makenzie.co" className="font-semibold text-slate-900 hover:text-slate-700">
                info@makenzie.co
              </a>
              . We will respond to your request within 30 days.
            </p>
          </section>

          {/* International Transfers */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">International Data Transfers</h2>
            <p className="text-gray-600">
              Your data may be transferred to and processed in countries other than your country of residence. We ensure
              that appropriate safeguards are in place to protect your data in accordance with applicable data
              protection laws, including GDPR for European users.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Children's Privacy</h2>
            <p className="text-gray-600">
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal
              data from children. If you believe we have collected data from a child, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Changes to This Privacy Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal
              requirements. We will notify you of any material changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
              please contact us at:
            </p>
            <div className="mt-6 rounded-lg bg-gray-50 p-6">
              <p className="text-gray-900">
                <strong>Makenzie</strong>
              </p>
              <p className="mt-2 text-gray-600">
                Email:{' '}
                <a href="mailto:info@makenzie.co" className="font-semibold text-slate-900 hover:text-slate-700">
                  info@makenzie.co
                </a>
              </p>
              <p className="mt-2 text-gray-600">Phone: +92 316 0557117</p>
            </div>
          </section>

          {/* Consent */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Your Consent</h2>
            <p className="text-gray-600">
              By using our website and services, you consent to the collection, use, and sharing of your information as
              described in this Privacy Policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
