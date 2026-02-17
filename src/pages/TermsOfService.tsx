import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import "../App.css";

export default function TermsOfService() {
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
          Terms & Services (Terms of Use)
        </h1>
        
        <p style={{
          fontSize: "1.1rem",
          color: "#666",
          marginBottom: "0.5rem",
        }}>
          Digiteck Vision WLL
        </p>
        <p style={{
          fontSize: "1.1rem",
          color: "#666",
          marginBottom: "0.5rem",
        }}>
          Last Updated: January 2026
        </p>
        <p style={{
          fontSize: "1.1rem",
          color: "#666",
          marginBottom: "3rem",
        }}>
          Effective Date: [Insert Date]
        </p>

        <div style={{
          fontSize: "1rem",
          lineHeight: 1.8,
          color: "#333",
        }}>
          <p style={{ marginBottom: "1.5rem" }}>
            These Terms & Services ("Terms") govern access to and use of the websites, applications, and digital identity solutions provided by Digiteck Vision WLL ("Digiteck Vision", "DTV", "we", "us", "our"). Our primary website is hosted at <a href="https://www.digiteckvision.com" style={{ color: "#FFAD01" }}>www.digiteckvision.com</a> and we may operate additional affiliated websites and mobile applications. Collectively, these are the "Services".
          </p>
          
          <p style={{ marginBottom: "1.5rem" }}>
            By accessing or using the Services (including by creating an account, downloading a mobile application, or using any DTV offering through a Customer), you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not access or use the Services and must remove/uninstall any installed applications.
          </p>

          <p style={{ marginBottom: "1rem" }}>These Terms apply to:</p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
            <li>End Users (individuals using DTV credentials or mobile apps)</li>
            <li>Customers (businesses, organizations, institutions, or government entities that deploy DTV Offerings)</li>
          </ul>

          <p style={{ marginBottom: "1.5rem" }}>
            Where a Customer has signed a separate master agreement (e.g., an enterprise contract), that agreement may govern certain Customer-specific terms and will prevail in the event of a conflict.
          </p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>1. Definitions</h2>
          
          <p style={{ marginBottom: "0.5rem" }}><strong>"Account"</strong> means a registered account created by an End User or Customer administrator to access the Services.</p>
          
          <p style={{ marginBottom: "0.5rem" }}><strong>"Customer"</strong> means a business, organization, institution, or public authority that contracts with DTV and deploys the Services.</p>
          
          <p style={{ marginBottom: "0.5rem" }}><strong>"End User"</strong> means an individual who uses the Services directly or through a Customer deployment.</p>
          
          <p style={{ marginBottom: "0.5rem" }}><strong>"Customer Data"</strong> means any data (including Personal Data) that Customer or its End Users submit to or process through the Services.</p>
          
          <p style={{ marginBottom: "0.5rem" }}><strong>"Personal Data" / "Personal Information"</strong> means information relating to an identified or identifiable individual, as defined under applicable Data Protection Laws.</p>
          
          <p style={{ marginBottom: "1rem" }}><strong>"Data Protection Laws"</strong> means all data protection and privacy laws applicable to the processing of Personal Data under these Terms, including (where applicable):</p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
            <li>EU GDPR (Regulation (EU) 2016/679)</li>
            <li>UK GDPR and the UK Data Protection Act 2018 (where applicable)</li>
            <li>Applicable GCC data protection laws and regulations (including, as applicable, laws and implementing regulations across GCC jurisdictions)</li>
            <li>Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs) (where applicable)</li>
            <li>Any other local privacy, cybersecurity, data residency, or sector regulations applicable to the Customer deployment or hosting jurisdiction.</li>
          </ul>

          <p style={{ marginBottom: "0.5rem" }}><strong>"Controller"</strong> and <strong>"Processor"</strong> have the meanings given under GDPR (or equivalent roles under local law).</p>
          
          <p style={{ marginBottom: "0.5rem" }}><strong>"Subprocessor"</strong> means a third party engaged by DTV to process Personal Data on behalf of Customer.</p>
          
          <p style={{ marginBottom: "0.5rem" }}><strong>"Security Incident"</strong> means a confirmed breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to Personal Data processed by DTV in connection with the Services.</p>
          
          <p style={{ marginBottom: "1.5rem" }}><strong>"SLA"</strong> means the Service Level Agreement described in Exhibit A (or in a Customer's enterprise contract, if applicable).</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>2. Scope of Services & Deployment Models</h2>
          
          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>2.1 Services Overview</h3>
          <p style={{ marginBottom: "1rem" }}>DTV provides digital identity and credential services including (as applicable):</p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
            <li>Digital credential issuance and lifecycle management</li>
            <li>Mobile credential storage and presentation</li>
            <li>Identity verification workflows and photo handling (as configured)</li>
            <li>Messaging/communications features (as configured by Customers)</li>
            <li>Administrative and reporting tools</li>
          </ul>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>2.2 Deployment Models (On-Premise vs Cloud)</h3>
          <p style={{ marginBottom: "1rem" }}>DTV Offerings may be deployed in multiple ways depending on Customer requirements:</p>
          
          <p style={{ marginBottom: "0.5rem" }}><strong>(A) On-Premise / Customer-Controlled Deployment</strong></p>
          <p style={{ marginBottom: "1rem" }}>Most Customers deploy the Services in environments they control (on-premise or within Customer-managed infrastructure). In such cases, Customer controls hosting, access, retention, and operational security responsibilities for Customer-controlled components.</p>
          
          <p style={{ marginBottom: "0.5rem" }}><strong>(B) Cloud Implementation Hosted by DTV (Local Residency)</strong></p>
          <p style={{ marginBottom: "1.5rem" }}>Where DTV hosts the Services, hosting is implemented locally in the jurisdiction agreed with the Customer, consistent with DTV's architecture and data residency requirements.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>2.3 Local Data Residency (Core Requirement)</h3>
          <p style={{ marginBottom: "1rem" }}>Data residency is a foundational design requirement:</p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
            <li>Customer Data is hosted locally within the agreed jurisdiction.</li>
            <li>Vendors and subprocessors are contractually required to maintain local residency where required.</li>
            <li>Cross-border transfers are not performed unless explicitly authorized by Customer for support reasons or required by law, and only with appropriate safeguards consistent with applicable Data Protection Laws.</li>
          </ul>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>3. Eligibility & Age Requirements</h2>
          
          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>3.1 Minimum Age</h3>
          <p style={{ marginBottom: "1.5rem" }}>You must be 13 years or older to use the Services.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>3.2 Customer-Authorized Use</h3>
          <p style={{ marginBottom: "1.5rem" }}>If you are accessing the Services through a Customer (e.g., your employer or institution), you represent that you are authorized by that Customer to use the Services. Customers are responsible for ensuring that their deployment and user onboarding processes comply with local legal requirements for minors and consent where applicable.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>4. Accounts, Authentication, and Security</h2>
          
          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>4.1 Account Registration</h3>
          <p style={{ marginBottom: "1.5rem" }}>You agree to provide accurate, current, and complete information and to keep it updated.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>4.2 Authentication Methods (Passwords, OTP, 2FA)</h3>
          <p style={{ marginBottom: "1rem" }}>DTV may support one or more authentication methods depending on deployment configuration, including:</p>
          <ul style={{ marginBottom: "1rem", paddingLeft: "2rem" }}>
            <li>Password-based login for certain accounts (e.g., administrators or institution accounts)</li>
            <li>One-time passwords (OTP) delivered via supported channels</li>
            <li>Two-factor authentication (2FA) where enabled</li>
            <li>Secure session tokens and device-based verification</li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>You are responsible for maintaining the confidentiality of your credentials and for all activities performed through your account.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>4.3 Security Obligations</h3>
          <p style={{ marginBottom: "1rem" }}>You must not:</p>
          <ul style={{ marginBottom: "1rem", paddingLeft: "2rem" }}>
            <li>Share authentication credentials with unauthorized persons</li>
            <li>Attempt to bypass security controls</li>
            <li>Interfere with security-related features of the Services</li>
            <li>Use the Services in a manner that compromises security, availability, or integrity</li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>You must promptly notify DTV of any suspected unauthorized access to your account.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>5. Licenses and Restrictions</h2>
          
          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>5.1 License Grant</h3>
          <p style={{ marginBottom: "1.5rem" }}>Subject to these Terms, DTV grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Services solely for their intended purpose.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>5.2 Restrictions</h3>
          <p style={{ marginBottom: "1rem" }}>You must not:</p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
            <li>Copy, sell, resell, rent, lease, distribute, or sublicense the Services</li>
            <li>Reverse engineer, decompile, or attempt to extract source code (except where prohibited by law)</li>
            <li>Modify or create derivative works from the Services</li>
            <li>Use the Services to violate laws, third-party rights, or Customer policies</li>
          </ul>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>5.3 Feedback</h3>
          <p style={{ marginBottom: "1.5rem" }}>If you provide suggestions, ideas, or feedback, you grant DTV the right to use them without restriction or compensation, without identifying you.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>6. Customer Data, Content, and Intellectual Property</h2>
          
          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>6.1 Customer Data Ownership</h3>
          <p style={{ marginBottom: "1.5rem" }}>As between DTV and Customer, Customer retains all rights to Customer Data. DTV uses Customer Data only to provide, secure, and maintain the Services, and as otherwise instructed by Customer (where DTV acts as Processor).</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>6.2 Uploaded Content</h3>
          <p style={{ marginBottom: "1.5rem" }}>Where you upload content (e.g., photos, messages, files), you grant DTV a limited license to host, process, transmit, and display that content solely to provide the Services. This license ends when the content is deleted or your account terminates, except for limited backup retention as required for security, integrity, or legal compliance.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>6.3 DTV Intellectual Property</h3>
          <p style={{ marginBottom: "1.5rem" }}>DTV retains all rights, title, and interest in the Services, software, branding, and related IP. No rights are granted except as expressly stated.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>7. Biometric & Identity Verification Features (On-Device Model)</h2>
          <p style={{ marginBottom: "1rem" }}>Where biometric or face-verification features are enabled:</p>
          <ul style={{ marginBottom: "1rem", paddingLeft: "2rem" }}>
            <li>DTV supports on-device verification configurations where biometric templates/vectors are stored locally on the End User device and not stored centrally by DTV.</li>
            <li>DTV may still process non-biometric metadata (e.g., authentication result, credential status, device identifiers, security logs) necessary to operate and secure the Services.</li>
            <li>Where Customer config requires photo submission for credential issuance, images may be processed and stored locally (in Customer-controlled environments or locally hosted DTV deployments) consistent with Customer instructions and retention policies.</li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>Customers are responsible for ensuring required notices and consents are obtained where law requires, including explicit consent for biometric processing where applicable.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>8. Payments, Fees, and Billing (Customers)</h2>
          
          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>8.1 Free and Paid Tiers</h3>
          <p style={{ marginBottom: "1.5rem" }}>DTV may offer free tiers and paid tiers. Fees, billing cycles, and features may be described in an Order Form, enterprise agreement, or published pricing.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>8.2 Billing</h3>
          <p style={{ marginBottom: "1.5rem" }}>Paid tiers may be billed monthly or annually in advance. Transactional fees (if any) may be billed monthly. You authorize DTV or its payment processor to charge the payment method on file.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>8.3 Suspension for Non-Payment</h3>
          <p style={{ marginBottom: "1.5rem" }}>If payment is not received within the agreed terms, DTV may suspend or limit access until payment is resolved.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>9. Availability & SLA</h2>
          <p style={{ marginBottom: "1rem" }}>DTV targets availability as defined in the SLA (if applicable). Unless otherwise agreed in writing:</p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
            <li>Target uptime: 99.9% excluding Scheduled Maintenance and force majeure events</li>
            <li>Scheduled Maintenance: reasonable efforts to notify Customers in advance where possible</li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>(See Exhibit A for an SLA template. Enterprise Customers may have a bespoke SLA.)</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>10. Third-Party Services and App Stores</h2>
          
          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>10.1 Third-Party Services</h3>
          <p style={{ marginBottom: "1.5rem" }}>If you access the Services via a third-party platform or integration, that third party may have separate terms. DTV is not responsible for third-party services.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>10.2 App Store Terms</h3>
          <p style={{ marginBottom: "1.5rem" }}>Apple and Google may be third-party beneficiaries only to the extent required for App Store distribution. Your use of App Store apps must comply with the applicable store terms.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>11. Acceptable Use</h2>
          <p style={{ marginBottom: "1rem" }}>You must not use the Services to:</p>
          <ul style={{ marginBottom: "1rem", paddingLeft: "2rem" }}>
            <li>Violate applicable laws or regulations</li>
            <li>Infringe rights of others</li>
            <li>Distribute malware or attempt unauthorized access</li>
            <li>Harass, abuse, or transmit unlawful or harmful content</li>
            <li>Disrupt the Services or networks supporting them</li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>DTV may investigate suspected misuse and may suspend or terminate access where required.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>12. Confidentiality</h2>
          <p style={{ marginBottom: "1rem" }}>Each party may receive Confidential Information from the other. The receiving party must:</p>
          <ul style={{ marginBottom: "1rem", paddingLeft: "2rem" }}>
            <li>Use it only to perform obligations or exercise rights under these Terms</li>
            <li>Protect it with reasonable care</li>
            <li>Restrict disclosure to personnel who need to know and are bound by confidentiality obligations</li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>Confidentiality does not apply to information that is publicly available, independently developed, or lawfully obtained from another source.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>13. Termination</h2>
          
          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>13.1 Termination by You</h3>
          <p style={{ marginBottom: "1.5rem" }}>You may stop using the Services at any time. Where account deletion is available, you may request deletion through the Services or via Customer processes (if Customer-managed).</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>13.2 Termination by DTV</h3>
          <p style={{ marginBottom: "1rem" }}>DTV may suspend or terminate access if:</p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
            <li>You violate these Terms</li>
            <li>Your use creates legal or security risk</li>
            <li>Required by law or Customer instruction (in Customer deployments)</li>
            <li>The Services are discontinued (commercially or operationally)</li>
          </ul>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>13.3 Effect of Termination</h3>
          <p style={{ marginBottom: "1rem" }}>Upon termination:</p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
            <li>Your license ends immediately</li>
            <li>Customer Data handling will follow the applicable DPA/enterprise agreement and retention rules</li>
          </ul>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>14. Information Security (Including 2FA/OTP)</h2>
          <p style={{ marginBottom: "1rem" }}>DTV maintains administrative, technical, and physical safeguards appropriate to the nature of the Services and deployment model, which may include:</p>
          <ul style={{ marginBottom: "1rem", paddingLeft: "2rem" }}>
            <li>Encryption in transit and at rest (where applicable)</li>
            <li>Role-based access control and least privilege</li>
            <li>Audit logging and monitoring</li>
            <li>Secure authentication mechanisms including 2FA and OTP where enabled</li>
            <li>Segregation of Customer environments</li>
            <li>Incident response procedures</li>
            <li>Vendor risk controls and contractual obligations aligned to residency requirements</li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>No system is perfectly secure. You acknowledge residual risk inherent to networked services.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>15. Export Controls & Sanctions (Reframed)</h2>
          <p style={{ marginBottom: "1.5rem" }}>You agree to comply with applicable export control and sanctions laws and regulations in the jurisdictions relevant to your use of the Services. You must not use, export, re-export, transfer, or make the Services available in violation of such laws, including to restricted persons or prohibited destinations under applicable legal regimes. This clause is intended to ensure lawful use globally and is not limited to any single country.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>16. Disclaimers</h2>
          <p style={{ marginBottom: "1.5rem" }}>To the maximum extent permitted by law, the Services are provided "AS IS" and "AS AVAILABLE". DTV disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>17. Limitation of Liability</h2>
          <p style={{ marginBottom: "1rem" }}>To the maximum extent permitted by applicable law:</p>
          <ul style={{ marginBottom: "1rem", paddingLeft: "2rem" }}>
            <li>DTV will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or loss of profits, revenue, data, goodwill, or other intangible losses.</li>
            <li>DTV's total aggregate liability arising out of or related to the Services will not exceed the greater of: (a) USD 100, or (b) the amount paid by Customer to DTV for the Services in the six (6) months preceding the event giving rise to the claim.</li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>Some jurisdictions do not allow certain limitations. In such cases, limitations apply to the maximum extent permitted.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>18. Privacy & Data Protection</h2>
          <p style={{ marginBottom: "1.5rem" }}>Your use of the Services is subject to DTV's Privacy Policy and Cookie Policy, as applicable. Where DTV processes Personal Data on behalf of Customer, the Data Processing Addendum in Section 19 applies.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>19. Data Processing Addendum (DPA) — Embedded</h2>
          <p style={{ marginBottom: "1.5rem" }}>This Section applies only where DTV processes Personal Data as a Processor on behalf of a Customer.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>19.1 Roles</h3>
          <p style={{ marginBottom: "1.5rem" }}>Customer is the Controller and DTV is the Processor with respect to Customer Data containing Personal Data.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>19.2 Processing Instructions</h3>
          <p style={{ marginBottom: "1rem" }}>DTV will process Personal Data only:</p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
            <li>To provide and secure the Services</li>
            <li>In accordance with Customer's documented instructions</li>
            <li>As required by applicable law (in which case DTV will inform Customer unless legally prohibited)</li>
          </ul>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>19.3 Categories of Data Subjects</h3>
          <p style={{ marginBottom: "1.5rem" }}>May include Customer's employees, contractors, members, students, citizens, visitors, patients, customers, and other End Users depending on Customer use case.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>19.4 Types of Personal Data</h3>
          <p style={{ marginBottom: "1rem" }}>Limited to what Customer configures and submits, typically including:</p>
          <ul style={{ marginBottom: "1rem", paddingLeft: "2rem" }}>
            <li>Identity and contact data (name, email, phone, identifiers)</li>
            <li>Credential attributes and status</li>
            <li>Photos and documents submitted for credential issuance (where applicable)</li>
            <li>Device and security logs required to operate the Services</li>
            <li>Communications metadata where messaging features are enabled</li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>Sensitive Data (including biometric or health data) will only be processed if configured by Customer, lawfully permitted, and subject to appropriate safeguards and consents where required.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>19.5 Purpose of Processing</h3>
          <p style={{ marginBottom: "1.5rem" }}>To provide the Services, including credential issuance, authentication, communication (if enabled), security controls, and support.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>19.6 Security Measures</h3>
          <p style={{ marginBottom: "1.5rem" }}>DTV will implement appropriate measures aligned to Article 32 GDPR (or equivalent local requirements), including access controls, encryption where applicable, logging, segmentation, and secure authentication (including 2FA/OTP where enabled).</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>19.7 Subprocessors</h3>
          <p style={{ marginBottom: "1rem" }}>Customer authorizes DTV to use subprocessors as necessary to provide the Services, subject to:</p>
          <ul style={{ marginBottom: "1rem", paddingLeft: "2rem" }}>
            <li>Written agreements imposing equivalent protections</li>
            <li>Local hosting/residency requirements where applicable</li>
            <li>Ongoing accountability by DTV for subprocessors' performance</li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>DTV will make available a list of subprocessors (e.g., via an Exhibit, customer portal, or written notice). Customers may object to new subprocessors on reasonable data protection grounds within a defined notice period (e.g., 30 days) under an enterprise agreement.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>19.8 Data Residency & Transfers (Aligned to Privacy Policy)</h3>
          <p style={{ marginBottom: "1rem" }}>Customer Data is hosted locally in the agreed jurisdiction. DTV will not transfer Personal Data outside that jurisdiction unless:</p>
          <ul style={{ marginBottom: "1rem", paddingLeft: "2rem" }}>
            <li>Customer explicitly authorizes it in writing for specific support purposes; or</li>
            <li>Required by law</li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>Where cross-border transfer is required and permitted, DTV will implement appropriate safeguards consistent with applicable Data Protection Laws.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>19.9 Standard Contractual Clauses (Updated Reference)</h3>
          <p style={{ marginBottom: "1.5rem" }}>If SCCs are required for a permitted transfer under EU law, the parties will rely on the European Commission Standard Contractual Clauses (Implementing Decision (EU) 2021/914), as applicable, supplemented by any required local addenda.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>19.10 Security Incidents</h3>
          <p style={{ marginBottom: "1.5rem" }}>DTV will notify Customer without undue delay after becoming aware of a Security Incident affecting Personal Data processed as Processor, and will provide reasonable assistance for Customer's legal notifications.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>19.11 Deletion/Return</h3>
          <p style={{ marginBottom: "1.5rem" }}>Upon termination of the Services, DTV will delete or return Personal Data processed as Processor in accordance with Customer instructions and applicable law, subject to limited backup retention for integrity and legal compliance.</p>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.8rem", color: "#000" }}>19.12 Audits</h3>
          <p style={{ marginBottom: "1.5rem" }}>DTV will make available information reasonably necessary to demonstrate compliance with this DPA, subject to confidentiality and legal restrictions. Audit details may be governed by enterprise agreements, including reasonable notice, scope limits, and security constraints.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>20. Governing Law & Dispute Resolution</h2>
          <p style={{ marginBottom: "1rem" }}>Unless otherwise agreed in a Customer enterprise agreement:</p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
            <li>These Terms are governed by the laws of the Kingdom of Bahrain, without regard to conflict-of-laws principles.</li>
            <li>Disputes will be subject to the competent courts of Bahrain, unless otherwise agreed by contract.</li>
          </ul>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>21. Changes to These Terms</h2>
          <p style={{ marginBottom: "1.5rem" }}>We may update these Terms from time to time. The updated Terms will be posted with a new "Last Updated" date. Material changes may be communicated more prominently where required.</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>22. Contact</h2>
          <p style={{ marginBottom: "0.5rem" }}><strong>Digiteck Vision WLL</strong></p>
          <p style={{ marginBottom: "0.5rem" }}>Attn: Office of General Counsel</p>
          <p style={{ marginBottom: "0.5rem" }}>Office 04111, Bldg 1459 (West Tower, Bahrain Financial Harbor)</p>
          <p style={{ marginBottom: "0.5rem" }}>Road 4626, Manama Sea Front, Block 346</p>
          <p style={{ marginBottom: "0.5rem" }}>Kingdom of Bahrain</p>
          <p style={{ marginBottom: "2rem" }}>Email: <a href="mailto:privacy@digiteckvision.com" style={{ color: "#FFAD01" }}>privacy@digiteckvision.com</a></p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>EXHIBIT A — Service Level Agreement (SLA) (Template)</h2>
          <p style={{ marginBottom: "1rem" }}><strong>Target Availability:</strong> 99.9% monthly uptime, excluding:</p>
          <ul style={{ marginBottom: "1rem", paddingLeft: "2rem" }}>
            <li>Scheduled maintenance</li>
            <li>Force majeure events</li>
            <li>Issues caused by Customer infrastructure or third-party networks outside DTV control</li>
          </ul>
          <p style={{ marginBottom: "1rem" }}><strong>Support Response Targets:</strong> Are shared based on engagement</p>
          <p style={{ marginBottom: "1rem" }}><strong>Maintenance Notice:</strong> Reasonable efforts to provide advance notice where feasible.</p>
          <p style={{ marginBottom: "2rem" }}>(Enterprise customers may use a bespoke.)</p>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginTop: "2.5rem", marginBottom: "1rem", color: "#000" }}>EXHIBIT B — Subprocessors (Reference)</h2>
          <p style={{ marginBottom: "1rem" }}>Subprocessors list is provided via:</p>
          <ul style={{ marginBottom: "2rem", paddingLeft: "2rem" }}>
            <li>[Insert URL / portal location] or</li>
            <li>"Available upon written request to <a href="mailto:privacy@digiteckvision.com" style={{ color: "#FFAD01" }}>privacy@digiteckvision.com</a>"</li>
          </ul>

        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
