import type { Metadata } from "next";

export const metadata: Metadata = { title: "Project — Jirapat-WEB" };

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planning";
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Personal Website",
    description: "เว็บไซต์ส่วนตัวสร้างด้วย Next.js โดยใช้ App Router และ Tailwind CSS สำหรับแสดงผลงาน",
    category: "Web Development",
    technologies: ["Next.js", "TypeScript", "CSS", "React"],
    status: "in-progress",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "ระบบจำหน่ายสินค้าออนไลน์พร้อมระบบชำระเงิน การจัดการสต็อก และแดชบอร์ดผู้ดูแล",
    category: "Full Stack",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    status: "planning",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "แอปพลิเคชันจัดการงานในแต่ละวัน พร้อมตั้งเตือน แสดงความคืบหน้า และทำงานร่วมกับผู้อื่น",
    category: "Web Application",
    technologies: ["React", "Firebase", "Material-UI"],
    status: "completed",
  },
  {
    id: 4,
    title: "Blog Platform",
    description: "แพลตฟอร์มบล็อกที่มีระบบ SEO ที่ดี สื่อหลากหลาย และโปรแกรมความเห็น",
    category: "Content Management",
    technologies: ["Next.js", "Markdown", "Prisma", "PostgreSQL"],
    status: "in-progress",
  },
  {
    id: 5,
    title: "Mobile App",
    description: "แอปพลิเคชันมือถือสำหรับติดตามสุขภาพและฟิตเนส พร้อมการวิเคราะห์ข้อมูล",
    category: "Mobile Development",
    technologies: ["React Native", "Firebase", "Redux"],
    status: "planning",
  },
  {
    id: 6,
    title: "Analytics Dashboard",
    description: "แดชบอร์ดวิเคราะห์ข้อมูลแบบเรียลไทม์พร้อมกราฟและรายงานต่างๆ",
    category: "Data Visualization",
    technologies: ["React", "Chart.js", "API Integration"],
    status: "completed",
  },
];

const statusColor: Record<Project["status"], string> = {
  "completed": "#10b981",
  "in-progress": "#f59e0b",
  "planning": "#8b5cf6",
};

const statusLabel: Record<Project["status"], string> = {
  "completed": "สำเร็จ",
  "in-progress": "กำลังทำ",
  "planning": "วางแผน",
};

export default function ProjectPage() {
  return (
    <section className="container">
      <div>
        <h1>โครงการของฉัน</h1>
        <p>โครงงานและโปรเจคที่ได้ทำมา รวมถึงเทคโนโลยีที่ใช้งาน</p>
      </div>

      {/* สถิติโครงการ */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{projects.length}</div>
          <div className="stat-label">โครงการทั้งหมด</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{projects.filter(p => p.status === "completed").length}</div>
          <div className="stat-label">สำเร็จแล้ว</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{projects.filter(p => p.status === "in-progress").length}</div>
          <div className="stat-label">กำลังทำ</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{projects.filter(p => p.status === "planning").length}</div>
          <div className="stat-label">วางแผน</div>
        </div>
      </div>

      {/* รายการโครงการ */}
      <h2>รายละเอียดโครงการ</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3>{project.title}</h3>
              <span 
                className="status-badge"
                style={{ 
                  backgroundColor: statusColor[project.status],
                  color: "#fff"
                }}
              >
                {statusLabel[project.status]}
              </span>
            </div>

            <p className="project-category">{project.category}</p>
            <p className="project-description">{project.description}</p>

            <div className="project-tech">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>

            {project.link && (
              <a href={project.link} className="project-link">
                ดูโครงการ →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}