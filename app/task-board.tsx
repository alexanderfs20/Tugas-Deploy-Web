import { createTask, deleteTask, updateTask } from "@/app/actions";
import { prisma } from "@/lib/prisma";
import { connection } from "next/server";

export async function TaskBoard() {
  await connection();
  const tasks = await prisma.task.findMany({ orderBy: [{ completed: "asc" }, { createdAt: "desc" }] });
  const doneCount = tasks.filter((task) => task.completed).length;
  return (
    <section className="workspace" aria-labelledby="tasks-heading">
      <div className="section-heading">
        <h1 id="tasks-heading">Daftar tugas</h1>
        <p className="progress-count"><strong>{doneCount.toString().padStart(2, "0")}</strong><span> / {tasks.length.toString().padStart(2, "0")} selesai</span></p>
      </div>

      <div className="task-layout">
        <aside className="create-panel">
          <h2>Tambah tugas</h2>
          <form action={createTask} className="create-form">
            <label htmlFor="new-title">Judul</label>
            <input id="new-title" name="title" placeholder="Nama tugas" maxLength={100} required />
            <label htmlFor="new-notes">Catatan</label>
            <input id="new-notes" name="notes" placeholder="Opsional" maxLength={500} />
            <button className="primary-button" type="submit">Tambah</button>
          </form>
        </aside>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">✳</span>
              <h3>Belum ada tugas</h3>
              <p>Tambahkan tugas pertama.</p>
            </div>
          ) : tasks.map((task, index) => (
            <article className={`task-card${task.completed ? " task-complete" : ""}`} key={task.id}>
              <span className="task-index">{String(index + 1).padStart(2, "0")}</span>
              <form action={updateTask} className="task-form">
                  <input type="hidden" name="id" value={task.id} />
                  <label className="sr-only" htmlFor={`title-${task.id}`}>Judul kegiatan</label>
                  <input id={`title-${task.id}`} className="task-title-input" name="title" defaultValue={task.title} maxLength={100} required />
                  <label className="sr-only" htmlFor={`notes-${task.id}`}>Catatan kegiatan</label>
                  <textarea id={`notes-${task.id}`} className="task-notes-input" name="notes" defaultValue={task.notes} maxLength={500} rows={2} placeholder="Tambahkan catatan singkat…" />
                  <div className="task-actions">
                    <label className="check-label"><input type="checkbox" name="completed" defaultChecked={task.completed} /> <span>Selesai</span></label>
                    <button className="text-button" type="submit">Simpan</button>
                    <button className="text-button delete-button" type="submit" formAction={deleteTask} formNoValidate>Hapus</button>
                  </div>
              </form>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
