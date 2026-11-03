/* ═══════════════════════════════════════
   FIBER FAST — Interactions
   ═══════════════════════════════════════ */

// ── Navbar: เงา/พื้นหลังเมื่อเลื่อนลง ──
const navbar = document.getElementById("navbar");
const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 24);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ── Mobile menu ──
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});
// ปิดเมนูเมื่อกดลิงก์
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// ── Reveal on scroll ──
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ── Netlify form (AJAX) ──
const form = document.getElementById("leadForm");
const status = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "กำลังส่งข้อมูล…";
    status.className = "form-status";
    submitBtn.disabled = true;

    const data = new URLSearchParams(new FormData(form)).toString();

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
      });
      if (!res.ok) throw new Error("network");

      status.textContent = "✅ ส่งข้อมูลเรียบร้อย! ทีมงานจะรีบติดต่อกลับโดยเร็วที่สุด";
      status.className = "form-status ok";
      form.reset();
    } catch (err) {
      status.textContent = "⚠️ ส่งไม่สำเร็จ (ฟอร์มใช้งานจริงเมื่อขึ้น Netlify แล้ว) — ทัก LINE หาเราได้เลย";
      status.className = "form-status err";
    } finally {
      submitBtn.disabled = false;
    }
  });
}
