"use client";

import type { Metadata } from "next";
import { useState } from "react";

// Note: Metadata can't be used in client components, so we'll export it separately
// export const metadata: Metadata = { title: "Contact — Jirapat-WEB" };

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: "📧",
    label: "Email(อีเมล)",
    value: "662021070@tsu.ac.th",
    href: "mailto:662021070@tsu.ac.th",
  },
  {
    icon: "📱",
    label: "Phone(โทรศัพท์)",
    value: "+66 (0) 099-329-2729",
    href: "tel:+660993292729",
  },
  {
    icon: "📍",
    label: "Location(ที่ตั้ง)",
    value: "Trang, Thailand",
    href: "https://www.google.com/maps/place/Trang,+Thailand",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/Jirapat070",
    href: "https://github.com/Jirapat070",
  },
  {
    icon: "👍",
    label: "Facebook",
    value: "facebook.com/home.php",
    href: "https://www.facebook.com/home.php",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Simulate API call - replace with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would normally send data to your backend
      console.log("Form data:", formData);

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="container">
      <div>
        <h1>ติดต่อเรา</h1>
        <p>ถ้าคุณมีคำถามหรือข้อเสนอแนะ อย่าลังเลที่จะติดต่อเรา</p>
      </div>

      <div className="contact-grid">
        {/* ฟอร์มติดต่อ */}
        <div className="contact-form-section">
          <h2>ส่งข้อความมาให้เรา</h2>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">ชื่อของคุณ *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="กรุณากรอกชื่อของคุณ"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">อีเมล *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your-email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">หัวข้อ *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="หัวข้อของข้อความ"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">ข้อความ *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="กรุณากรอกข้อความของคุณ"
              />
            </div>

            {status === "success" && (
              <div className="status-message success">
                ✓ ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อเรา
              </div>
            )}

            {status === "error" && (
              <div className="status-message error">
                ✗ เกิดข้อผิดพลาด กรุณาลองใหม่
              </div>
            )}

            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "กำลังส่ง..." : "ส่งข้อความ"}
            </button>
          </form>
        </div>

        {/* ข้อมูลการติดต่อ */}
        <div className="contact-info-section">
          <h2>ข้อมูลการติดต่อ</h2>

          <div className="contact-cards">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-item">
                <div className="contact-icon">{info.icon}</div>
                <div className="contact-content">
                  <p className="contact-label">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="contact-value" target="_blank" rel="noopener noreferrer">
                      {info.value}
                    </a>
                  ) : (
                    <p className="contact-value">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}