import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import "../App.css";

export default function PrivacyPolicy() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page" style={{ background: "#fff", position: "relative", minHeight: "100vh" }}>
      {/* Background image with gradient opacity */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/Media/Images/jobsbackground.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          mask: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.5) 100%)",
          WebkitMask: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.5) 100%)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
      
      <div style={{ position: "relative", zIndex: 100, pointerEvents: "auto" }}>
        <Navbar theme="light" />
      </div>
      
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "8rem 2rem 4rem",
        color: "#000",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          border: "2px solid rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          padding: "3rem",
          background: "rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: 700,
          marginBottom: "1rem",
          color: "#000",
        }}>
          Digiteck Vision WLL Privacy Policy
        </h1>
        
        <p style={{
          fontSize: "1.1rem",
          color: "#666",
          marginBottom: "0.5rem",
        }}>
          Version 2.3
        </p>
        <p style={{
          fontSize: "1.1rem",
          color: "#666",
          marginBottom: "0.5rem",
        }}>
          Last Updated: December 2025
        </p>
        <p style={{
          fontSize: "1.1rem",
          color: "#666",
          marginBottom: "3rem",
        }}>
          Effective Date: January 2026
        </p>

        <div style={{
          fontSize: "1rem",
          lineHeight: 1.8,
          color: "#333",
        }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem", color: "#000" }}>1. Overview</h2>
          <p>Digiteck Vision WLL ("Digiteck Vision", "we", "us", or "our") respects your privacy and is committed to safeguarding Personal Information in accordance with applicable data protection laws in the jurisdictions where we operate and deploy our solutions.</p>
          
          <p>This Privacy Policy explains how we collect, use, process, disclose, and protect Personal Information in connection with:</p>
          <ul>
            <li>Our websites (including www.digiteckvision.com)</li>
            <li>Our identity and credential management platforms</li>
            <li>Our Hawiyyati mobile application</li>
            <li>Related cloud and on-premise deployments</li>
            <li>Any associated products or services (collectively, the "Offerings")</li>
          </ul>

          <p>We are not in the business of selling Personal Information.</p>
          <p>If you disagree with this Privacy Policy, you should not use our Offerings.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>2. Key Definitions</h2>
          <p><strong>Personal Information</strong> means any information relating to an identified or identifiable individual.</p>
          <p><strong>Customer</strong> means an organization (such as an employer, institution, or government entity) that uses our Offerings.</p>
          <p><strong>End User</strong> means an individual who uses digital credentials or interacts with our Offerings through a Customer.</p>
          <p><strong>Cloud Implementation</strong> means an implementation hosted by Digiteck Vision within an agreed local jurisdiction.</p>
          <p><strong>On-Premise Implementation</strong> means an implementation hosted and controlled by the Customer or within the Customer's environment.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>3. Our Role: Controller vs Processor</h2>
          <p>Depending on the context, Digiteck Vision may act as:</p>
          <p><strong>Data Controller</strong> — when processing Personal Information for our own business purposes (e.g., billing, marketing, support, security, compliance).</p>
          <p><strong>Data Processor</strong> — when processing Personal Information on behalf of a Customer under a contract (e.g., issuing digital credentials to End Users).</p>
          <p>In On-Premise deployments, the Customer typically acts as the Data Controller for End User data.</p>
          <p>If you are unsure of your deployment type, please contact the organization providing you access.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>4. Scope of Application</h2>
          
          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem", color: "#000" }}>On-Premise Implementations</h3>
          <p>Where the Offering is hosted within a Customer-controlled environment, the Customer determines how End User data is processed. The Customer's privacy policy governs their processing activities.</p>

          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem", color: "#000" }}>Cloud Implementations</h3>
          <p>Where the Offering is hosted by Digiteck Vision, this Privacy Policy applies to Personal Information we process as Controller and/or Processor, as described above.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>5. Data Hosting & Local Residency</h2>
          <p>Data residency is a core architectural requirement of our platform.</p>
          <ul>
            <li>Customer data is hosted locally within the jurisdiction agreed with the Customer.</li>
            <li>Third-party vendors are contractually required to process and store data locally where data residency requirements apply.</li>
            <li>Most deployments are implemented on-premise within Customer-controlled infrastructure.</li>
          </ul>
          <p>We do not transfer Customer data outside the agreed jurisdiction unless:</p>
          <ul>
            <li>Explicitly authorized by the Customer for support purposes; or</li>
            <li>Required by applicable law.</li>
          </ul>
          <p>We implement encryption, access controls, audit logging, and contractual safeguards to protect hosted data.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>6. Information We Collect</h2>
          
          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem", color: "#000" }}>A. Information You Provide Directly</h3>
          <p>This may include:</p>
          <ul>
            <li>Name and contact details</li>
            <li>Job title and organization</li>
            <li>Account credentials</li>
            <li>Support communications</li>
            <li>Event registrations</li>
            <li>Billing information</li>
            <li>Marketing preferences</li>
          </ul>
          <p>Providing certain information may be necessary to access specific features.</p>

          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem", color: "#000" }}>B. Information Collected Automatically</h3>
          <p>When you use our Offerings, we may collect:</p>
          <ul>
            <li>IP address</li>
            <li>Device type and operating system</li>
            <li>Application version</li>
            <li>Usage logs</li>
            <li>Security logs</li>
            <li>Session identifiers</li>
            <li>Crash diagnostics</li>
            <li>General geographic region (e.g., country-level)</li>
          </ul>
          <p>We use this information for security, analytics, and service improvement.</p>

          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem", color: "#000" }}>C. Information Processed on Behalf of Customers</h3>
          <p>Customers may use our Offerings to process End User data, including:</p>
          <ul>
            <li>Names</li>
            <li>Contact details</li>
            <li>Identification numbers</li>
            <li>Credential status</li>
            <li>Photos</li>
            <li>Device identifiers</li>
            <li>Communication logs</li>
          </ul>
          <p>In these cases, we act as a Data Processor under contractual instructions.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>7. Biometric Data & On-Device Face Verification</h2>
          <p>Certain features may support identity verification using facial recognition or biometric comparison.</p>
          <p>Our design is privacy-preserving by default:</p>
          <ul>
            <li><strong>On-Device Processing:</strong> Where enabled, biometric face verification occurs on the End User's device.</li>
            <li><strong>No Central Biometric Template Storage:</strong> Biometric templates or face vectors used for authentication are stored locally on the End User's device and are not stored in Digiteck Vision systems.</li>
            <li><strong>Photo Processing:</strong> In certain deployments, face images may be processed for ID issuance or photo quality validation. These images are processed and stored only as required by the Customer configuration.</li>
            <li><strong>Lawful Basis:</strong> Where required by applicable law, biometric processing is performed only with explicit consent and/or other lawful authorization.</li>
            <li><strong>User Control:</strong> End Users may disable biometric authentication features via device settings where available.</li>
          </ul>
          <p>Even where biometric templates are stored locally, system logs, identifiers, and credential metadata may still be processed to operate and secure the Service.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>8. Location Information</h2>
          <p>Where required for specific functionality, we may request permission to access device location data.</p>
          <p>Users may disable location services through device settings. Disabling may affect certain features.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>9. Video & Audio Communications</h2>
          <p>For support or service delivery, we may conduct video conferences.</p>
          <p>Where meetings are recorded:</p>
          <ul>
            <li>Participants will be notified.</li>
            <li>Recording is used for service delivery, quality control, training, or compliance.</li>
            <li>Lawful basis may include consent or legitimate interest depending on jurisdiction.</li>
          </ul>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>10. Cookies & Tracking Technologies</h2>
          <p>We use cookies and similar technologies for:</p>
          <ul>
            <li>Security</li>
            <li>Analytics</li>
            <li>Performance optimization</li>
            <li>Service functionality</li>
          </ul>
          <p>We do not sell Personal Information.</p>
          <p>Where applicable law treats certain marketing disclosures as "sharing," users may have the right to opt out.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>11. How We Use Personal Information</h2>
          <p>We use Personal Information to:</p>
          <ul>
            <li>Provide and maintain our Offerings</li>
            <li>Authenticate users</li>
            <li>Issue digital credentials</li>
            <li>Provide support</li>
            <li>Process billing</li>
            <li>Improve services</li>
            <li>Maintain security</li>
            <li>Prevent fraud</li>
            <li>Comply with legal obligations</li>
            <li>Send marketing communications (where permitted)</li>
          </ul>
          <p>We use Personal Information only for the purposes for which it was collected unless legally permitted to use it for compatible purposes.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>12. Lawful Bases for Processing</h2>
          <p>Where required by law, we rely on:</p>
          <ul>
            <li>Contractual necessity</li>
            <li>Legitimate interests</li>
            <li>Consent</li>
            <li>Legal obligation</li>
            <li>Public interest</li>
            <li>Vital interests</li>
          </ul>
          <p>Biometric processing, where applicable, relies on explicit consent or lawful authorization.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>13. Data Sharing</h2>
          <p>We may share Personal Information with:</p>
          <ul>
            <li>Contracted service providers</li>
            <li>Affiliates</li>
            <li>System integrators</li>
            <li>Professional advisors</li>
            <li>Regulators or authorities (where required by law)</li>
          </ul>
          <p>All vendors operate under contractual obligations to process data only under instructions and apply appropriate safeguards.</p>
          <p>We do not sell or rent Personal Information.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>14. Data Retention</h2>
          <p>We retain Personal Information:</p>
          <ul>
            <li>For the duration of our contractual relationship</li>
            <li>As required by applicable law</li>
            <li>For legitimate business purposes</li>
            <li>To defend legal claims</li>
          </ul>
          <p>Retention periods are reviewed regularly.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>15. Your Rights</h2>
          <p>Depending on jurisdiction, you may have rights to:</p>
          <ul>
            <li>Access Personal Information</li>
            <li>Correct inaccuracies</li>
            <li>Request deletion</li>
            <li>Restrict processing</li>
            <li>Object to processing</li>
            <li>Withdraw consent</li>
            <li>Request portability</li>
            <li>Opt out of certain processing</li>
          </ul>
          <p>To exercise rights, contact: <a href="mailto:privacy@digiteckvision.com" style={{ color: "#FFAD01" }}>privacy@digiteckvision.com</a></p>
          <p>Identity verification may be required.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>16. Digiteck Vision Privacy Shield (Internal Compliance Framework)</h2>
          <p>Digiteck Vision maintains a privacy governance framework referred to internally as the Digiteck Vision Privacy Shield. This framework represents our commitment to comply with applicable data protection laws in jurisdictions where we operate.</p>
          <p>It includes:</p>
          <ul>
            <li>Data residency enforcement</li>
            <li>Vendor contractual controls</li>
            <li>Security safeguards</li>
            <li>Breach response procedures</li>
            <li>Data subject rights handling processes</li>
            <li>Regular policy reviews</li>
          </ul>
          <p>This Privacy Shield is an internal compliance framework and does not refer to any external certification program.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>17. Cross-Border Data Transfers</h2>
          <p>Where data transfer is necessary and permitted under applicable law, we implement appropriate safeguards, including contractual protections and security measures.</p>
          <p>Where data residency requirements apply, data remains within the agreed local jurisdiction.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>18. Children</h2>
          <p>Our Offerings are not directed at children. Where local law establishes an age threshold for consent, we do not knowingly collect Personal Information from individuals below that age without appropriate authorization.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>19. Security</h2>
          <p>We maintain appropriate administrative, technical, and physical safeguards to protect Personal Information against unauthorized access, disclosure, alteration, or destruction.</p>
          <p>In the event of a data breach, we will notify affected parties and regulators as required by law.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>20. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically to reflect legal or operational changes. The updated version will be posted on our website with a revised "Last Updated" date.</p>

          <h2 style={{ fontSize: "2rem", fontWeight: 600, marginTop: "3rem", marginBottom: "1rem", color: "#000" }}>21. Contact Information</h2>
          <p>If you have questions or wish to exercise your rights, contact:</p>

          <div style={{ marginLeft: "2rem", marginTop: "1rem", marginBottom: "2rem" }}>
            <p style={{ margin: "0.25rem 0" }}>Office of General Counsel</p>
            <p style={{ margin: "0.25rem 0" }}>Digiteck Vision WLL</p>
            <p style={{ margin: "0.25rem 0" }}>Office 04111, Bldg 1459 (West Tower, Bahrain Financial Harbor)</p>
            <p style={{ margin: "0.25rem 0" }}>Road 4626, Manama Sea Front, Block 346</p>
            <p style={{ margin: "0.25rem 0" }}>Kingdom of Bahrain</p>
            <p style={{ margin: "0.25rem 0" }}>Email: <a href="mailto:privacy@digiteckvision.com" style={{ color: "#FFAD01" }}>privacy@digiteckvision.com</a></p>
          </div>
        </div>
        </div>
      </div>
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}
