import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import "../App.css";

export default function BiometricAddendum() {
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
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
      </div>
      
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "8rem 2rem 4rem",
        color: "#000",
        position: "relative",
        zIndex: 1,
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: 700,
          marginBottom: "1rem",
          color: "#000",
        }}>
          Biometric Processing Addendum (BPA)
        </h1>
        
        <p style={{
          fontSize: "1.1rem",
          color: "#666",
          marginBottom: "3rem",
        }}>
          Last Updated: January 2026
        </p>

        <div style={{
          fontSize: "1rem",
          lineHeight: 1.8,
          color: "#333",
        }}>
          <p style={{ marginBottom: "1.5rem" }}>
            This Biometric Processing Addendum ("BPA") forms part of the agreement between Digiteck Vision WLL ("DTV", "we", "us") and the contracting Customer ("Customer") for use of DTV's identity and credential Offerings (including Hawiyyati). If there is a conflict between this BPA and the main agreement, this BPA governs only for biometric-related processing.
          </p>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#000",
          }}>
            1. Purpose
          </h2>
          <p style={{ marginBottom: "1.5rem" }}>
            This BPA defines how biometric-related features are processed, secured, and governed, including where DTV performs processing as a Processor on behalf of Customer, and where processing occurs on-device under End User control.
          </p>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#000",
          }}>
            2. Definitions
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            <strong>Biometric Data:</strong> Data resulting from specific technical processing relating to physical/physiological characteristics enabling unique identification (e.g., face templates/vectors).
          </p>
          <p style={{ marginBottom: "1rem" }}>
            <strong>Face Image:</strong> A photographic image or video frame containing a person's face.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            <strong>Template / Vector:</strong> Mathematical representation derived from a face image used for matching.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            <strong>On-Device Verification:</strong> Matching performed locally on an End User device, without server-side template storage.
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            <strong>Biometric Feature:</strong> Any feature enabling face-based authentication, liveness checks, photo compliance checks, or identity verification.
          </p>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#000",
          }}>
            3. Roles & Responsibilities
          </h2>
          <h3 style={{
            fontSize: "1.4rem",
            fontWeight: 600,
            marginTop: "1.5rem",
            marginBottom: "0.75rem",
            color: "#000",
          }}>
            3.1 Customer as Controller
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            Customer is the Controller for biometric processing conducted to verify identity, issue credentials, or enforce Customer policies.
          </p>

          <h3 style={{
            fontSize: "1.4rem",
            fontWeight: 600,
            marginTop: "1.5rem",
            marginBottom: "0.75rem",
            color: "#000",
          }}>
            3.2 DTV as Processor
          </h3>
          <p style={{ marginBottom: "1rem" }}>
            DTV acts as Processor when it processes biometric-related data on Customer instructions (e.g., storing credential photos in a Customer-hosted/on-prem environment; running photo quality rules; supporting issuance workflows).
          </p>

          <h3 style={{
            fontSize: "1.4rem",
            fontWeight: 600,
            marginTop: "1.5rem",
            marginBottom: "0.75rem",
            color: "#000",
          }}>
            3.3 End User On-Device Processing
          </h3>
          <p style={{ marginBottom: "1.5rem" }}>
            Where On-Device Verification is enabled, End Users control biometric authentication on their device. DTV does not maintain a centralized biometric template database in such configuration.
          </p>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#000",
          }}>
            4. Default Architecture: On-Device Verification (No Central Template Storage)
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            When configured for On-Device Verification:
          </p>
          <ul style={{ marginBottom: "1.5rem", marginLeft: "2rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              Templates/Vectors are generated and stored locally on the End User device (e.g., within secure device storage).
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              DTV systems do not store biometric templates/vectors.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Matching occurs on-device; DTV systems receive only non-biometric results (e.g., success/fail) as needed to authorize access or complete the workflow.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              DTV may still process non-biometric metadata required to operate the service (account identifiers, device identifiers, credential status, security logs).
            </li>
          </ul>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#000",
          }}>
            5. When Face Images Are Processed or Stored
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            Depending on Customer configuration and deployment:
          </p>
          <p style={{ marginBottom: "0.75rem" }}>
            <strong>Face images may be processed for:</strong>
          </p>
          <ul style={{ marginBottom: "1rem", marginLeft: "2rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              Credential issuance workflows (e.g., photo submission to the issuing institution)
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Photo quality/compliance checks (e.g., face visible, lighting, occlusion)
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Fraud prevention where permitted and instructed by Customer
            </li>
          </ul>
          <p style={{ marginBottom: "0.75rem" }}>
            <strong>Storage Location:</strong>
          </p>
          <ul style={{ marginBottom: "1.5rem", marginLeft: "2rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              In most implementations, Customer hosts data on-prem or locally.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              If hosted by DTV, data is hosted locally within the agreed jurisdiction and under residency controls.
            </li>
          </ul>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#000",
          }}>
            6. Prohibited Uses
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            DTV will not, and Customer must not instruct DTV to:
          </p>
          <ul style={{ marginBottom: "1.5rem", marginLeft: "2rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              Use biometric data for advertising, profiling for marketing, or unrelated analytics
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Build or enrich biometric datasets for model training unless explicitly agreed in a separate written agreement and lawful under applicable law
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Share biometric templates with unrelated third parties
            </li>
          </ul>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#000",
          }}>
            7. Lawful Basis & Notices (Customer Obligations)
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            Customer is responsible for:
          </p>
          <ul style={{ marginBottom: "1rem", marginLeft: "2rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              Providing End Users with required notices
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Obtaining explicit consent for biometric processing where required by applicable law
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Conducting any required DPIA/PIA and local approvals
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Ensuring biometric processing is lawful for the intended use case
            </li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>
            DTV will provide reasonable assistance (commercially reasonable / paid if applicable) for DPIA support and security documentation.
          </p>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#000",
          }}>
            8. Security Controls
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            DTV maintains appropriate security measures, including:
          </p>
          <ul style={{ marginBottom: "1.5rem", marginLeft: "2rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              Encryption in transit and at rest (for any DTV-hosted components)
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Role-based access control and least privilege
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Audit logging
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Environment segregation per Customer
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Incident response procedures
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Vendor controls and contractual obligations aligned to local residency
            </li>
          </ul>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#000",
          }}>
            9. Retention & Deletion
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            <strong>On-Device Templates:</strong> Controlled by End User device and app configuration.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            <strong>Face Images (if stored):</strong> Retained per Customer configuration/instructions and contractual retention schedule.
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            Upon termination, DTV will delete biometric-related data it processes as Processor, except where legally required to retain backups for limited periods.
          </p>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#000",
          }}>
            10. Subprocessors
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            If DTV uses subprocessors for biometric-related workflows, they must:
          </p>
          <ul style={{ marginBottom: "1rem", marginLeft: "2rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              Be contractually bound to equivalent protections
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Follow local hosting/residency requirements
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Process only on DTV instructions
            </li>
          </ul>
          <p style={{ marginBottom: "1.5rem" }}>
            Customer may request the subprocessors list per the main agreement.
          </p>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#000",
          }}>
            11. Incident Response
          </h2>
          <p style={{ marginBottom: "1.5rem" }}>
            DTV will notify Customer without undue delay upon becoming aware of a Security Incident impacting biometric-related processing, and provide reasonable assistance to support Customer notifications where required.
          </p>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "#000",
          }}>
            12. Audit & Compliance Support
          </h2>
          <p style={{ marginBottom: "3rem" }}>
            DTV will provide reasonable evidence of controls (policies, certifications, security summaries), subject to confidentiality and legal restrictions, and support Customer audits per the main agreement.
          </p>

          <div style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid #ddd",
          }}>
            <h2 style={{
              fontSize: "1.4rem",
              fontWeight: 600,
              marginBottom: "1rem",
              color: "#000",
            }}>
              Contact Information
            </h2>
            <p>
              Questions about this Biometric Processing Addendum:<br />
              Email: <a href="mailto:privacy@digiteckvision.com" style={{ color: "#FFAD01", textDecoration: "none" }}>privacy@digiteckvision.com</a>
            </p>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}
