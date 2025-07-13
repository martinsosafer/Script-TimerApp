
Spanish Version Below
# 🎬 Script Timer – Monorepo Setup

This repository contains the monorepo structure used in **Script Timer**, a SaaS platform built to assist users in creating scripts for videos, educational talks, and course content using cutting-edge AI technologies.

---

## 🚀 Overview

Script Timer includes powerful features such as:

- 🎙️ Multitrack voice editor with ElevenLabs and Google Voices
- 🧠 AI modules for voice cloning, transcription, summarization, and generation
- 🎥 Screen recording and automatic video/audio summarization
- 🧩 Course creation tools with intelligent content generation
- 🎨 Responsive interfaces built from Figma handoff files

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Monorepo:** Turborepo
- **Language:** TypeScript
- **Frontend:** React, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, tRPC, PostgreSQL, NeonDB
- **Tools:** pnpm, ESLint, Prettier, Sherif

---

## 📦 Common Commands

```bash
pnpm dev               # Run all apps in parallel with Turbo
pnpm build             # Build all apps and packages
pnpm format:fix        # Format all code using Prettier
pnpm lint:fix          # Lint and fix all code with ESLint
pnpm db:studio         # Open Prisma Studio
🔧 Requirements
Node.js ≥ 18.18.2

pnpm ≥ 8.10.2

🧹 Clean Up
bash
Copiar
Editar
pnpm clean             # Remove node_modules and generated files
pnpm clean:workspaces  # Clean all Turbo workspace outputs

— Versión en Español

```markdown
# 🎬 Script Timer – Configuración Monorepo

Este repositorio contiene la estructura monorepo usada en **Script Timer**, una plataforma SaaS creada para ayudar a usuarios a generar libretos para videos, charlas educativas y contenido de cursos usando tecnología de inteligencia artificial.

---

## 🚀 Descripción General

Script Timer incluye funcionalidades avanzadas como:

- 🎙️ Editor multipista de voces con ElevenLabs y Google Voices
- 🧠 Módulos de IA para clonación de voz, transcripción, resumen y generación
- 🎥 Grabación de pantalla y resumen automático de video/audio
- 🧩 Herramientas para creación de cursos y contenido con IA
- 🎨 Interfaces responsivas basadas en diseños de Figma

---

## 🛠️ Stack Tecnológico

- **Framework:** Next.js (App Router)
- **Monorepo:** Turborepo
- **Lenguaje:** TypeScript
- **Frontend:** React, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, tRPC, PostgreSQL, NeonDB
- **Herramientas:** pnpm, ESLint, Prettier, Sherif

---

## 📦 Comandos Comunes

```bash
pnpm dev               # Ejecuta todas las apps en paralelo con Turbo
pnpm build             # Compila todas las apps y paquetes
pnpm format:fix        # Formatea el código con Prettier
pnpm lint:fix          # Lint y corrección automática con ESLint
pnpm db:studio         # Abre Prisma Studio
🔧 Requisitos
Node.js ≥ 18.18.2

pnpm ≥ 8.10.2

🧹 Limpieza
bash
Copiar
Editar
pnpm clean             # Elimina node_modules y archivos generados
pnpm clean:workspaces  # Limpia todos los outputs de Turbo