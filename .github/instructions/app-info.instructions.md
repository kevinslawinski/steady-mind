---
applyTo: '**'
---

# Project Overview

This project is a web application called **SteadyMind**, a mental health companion that helps users identify grounding techniques and coping mechanisms through guided prompts and interactive Q&A.

**Important**: SteadyMind is NOT a replacement for professional therapy or medical treatment. No medical assumptions or diagnoses are made. This is a supportive tool to help users explore common coping mechanisms during difficult moments.

## Core Features

- **Guided Prompts**: Interactive Q&A system to understand user's current state
- **Coping Mechanism Library**: Curated collection of grounding techniques and coping strategies
- **Personalized Recommendations**: Suggest relevant coping mechanisms based on user responses
- **Grounding Focus**: Help users re-center themselves when they're feeling overwhelmed or spiraling

## Folder Structure

- `/src`: Contains the source code for the Angular frontend
  - `/app`: Application components, services, and modules
  - `/assets`: Static assets (images, fonts, etc.)
  - `/styles`: Global styles and theme configurations
- `/server`: Contains the source code for the Node.js backend (TBD)
- `/docs`: Contains documentation for the project, including API specifications and user guides
- `/.github`: GitHub-specific files including workflows and Copilot instructions for Angular best pracices
- `/.claude`: Angular-specific best practices and guidelines for Gemini
- `/.gemini`: Angular-specific best practices and guidelines for Gemini

## Libraries and Frameworks

### Frontend

- **Angular v20**: Primary frontend framework
- **TypeScript**: Strongly-typed development
- UI Component Library: TBD (consider Angular Material, PrimeNG, or similar, or build your own)
- State Management: Angular Signals

### Backend

- Backend is to be determined

### Data Storage

- Data management is to be determined
- User data privacy and security are top priorities

## Coding Standards

- Reference `../copilot-instructions.md` for coding standards and guidelines.

## UI guidelines

- A toggle should be provided to switch between light and dark mode.
- Application should have a modern and clean design.
- Application should adhere to accessibility standards - achieving WCAG 2.1 AA as a minimum.
