"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function ensureLocalWritesAreEnabled() {
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    throw new Error("Perubahan data hanya tersedia saat aplikasi berjalan lokal.");
  }
}

function readTaskForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!title || title.length > 100) {
    throw new Error("Judul wajib diisi dan maksimal 100 karakter.");
  }
  if (notes.length > 500) {
    throw new Error("Catatan maksimal 500 karakter.");
  }

  return { title, notes };
}

function readId(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error("Kegiatan tidak ditemukan.");
  }
  return id;
}

export async function createTask(formData: FormData) {
  ensureLocalWritesAreEnabled();
  const data = readTaskForm(formData);
  await prisma.task.create({ data });
  revalidatePath("/");
}

export async function updateTask(formData: FormData) {
  ensureLocalWritesAreEnabled();
  const id = readId(formData);
  const data = readTaskForm(formData);
  const completed = formData.get("completed") === "on";

  await prisma.task.update({ where: { id }, data: { ...data, completed } });
  revalidatePath("/");
}

export async function deleteTask(formData: FormData) {
  ensureLocalWritesAreEnabled();
  const id = readId(formData);
  await prisma.task.delete({ where: { id } });
  revalidatePath("/");
}
