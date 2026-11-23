import { Suspense } from "react";
import Link from "next/link";
import { TaskBoard } from "@/app/task-board";

function TaskBoardFallback() {
  return <p className="loading-state">Memuat tugas…</p>;
}

export default function Home() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Tugas, beranda">
          <span className="brand-mark">T</span>
          <span>Tugas</span>
        </Link>
      </header>

      <Suspense fallback={<TaskBoardFallback />}>
        <TaskBoard />
      </Suspense>
    </main>
  );
}
