import { Suspense } from "react";
import Link from "next/link";
import { TaskBoard } from "@/app/task-board";

function TaskBoardFallback() {
  return <p className="loading-state">Memuat daftar kegiatan…</p>;
}

export default function Home() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Ruang Kerja, beranda">
          <span className="brand-mark">R</span>
          <span>ruang<span className="brand-light">kerja</span></span>
        </Link>
        <nav className="top-nav" aria-label="Navigasi utama">
          <Link href="/" aria-current="page">Kegiatan</Link>
          <Link href="/about">About</Link>
        </nav>
        <span className="topbar-note">LATIHAN PRISMA + SQLITE</span>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> RUANG KERJA PRIBADI</p>
          <h1>Pelan-pelan,<br /><em>semua selesai.</em></h1>
          <p className="hero-intro">Catat yang perlu dikerjakan, rapikan prioritas, lalu nikmati progresnya.</p>
        </div>
        <div className="hero-aside" aria-hidden="true">
          <span className="aside-number">01</span>
          <span className="aside-rule" />
          <span className="aside-label">HARI INI<br />DIMULAI DARI SINI</span>
        </div>
      </section>

      <Suspense fallback={<TaskBoardFallback />}>
        <TaskBoard />
      </Suspense>

      <footer className="site-footer">
        <span>BUAT RUANG UNTUK HAL YANG PENTING.</span>
        <span>SQLITE · PRISMA ORM</span>
      </footer>
    </main>
  );
}
