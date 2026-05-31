# Cloudinary Image Guide

All images on the Kings Furniture Ghana website are hosted on Cloudinary. This guide explains how images are managed, optimised, and added.

---

## Account

- **Cloud name:** `djmyiuu5k`
- **Base URL:** `https://res.cloudinary.com/djmyiuu5k/image/upload/`

---

## How Image URLs Work

Every Cloudinary URL follows this pattern:
https://res.cloudinary.com/djmyiuu5k/image/upload/[TRANSFORMATIONS]/[VERSION]/[FILENAME]

Example:
https://res.cloudinary.com/djmyiuu5k/image/upload/f_auto,q_auto,w_800/v1760989901/bedroom_xcasuq.jpg

---

## Required Transformations

**Always add `f_auto,q_auto,w_[size]/` after `/upload/` on every image URL.**

| Transformation | What it does |
|----------------|--------------|
| `f_auto`       | Serves the best format for each browser (WebP, AVIF, or JPEG) |
| `q_auto`       | Automatically optimises quality vs file size |
| `w_[size]`     | Resizes the image to the needed width in pixels |

This combination typically reduces image file size by 40–60% with no visible quality loss.

---

## Width Sizing Guide

Choose the `w_` value based on where the image is used:

| Usage | Width |
|-------|-------|
| Logo | `w_400` |
| Hero / full-width backgrounds | `w_1600` |
| Large project cards | `w_900` |
| Product / category / news cards | `w_700` to `w_800` |
| Thumbnails | `w_300` |

---

## Current Images in Use

| Purpose | Filename / Version |
|---------|-------------------|
| Logo | `v1760868207/KINGS_NEW_LOGO_3_qwzemb.png` |
| Hero / Living Room | `v1760989890/9fc86d74-a09a-4155-881d-60e6af7e76c8_elkcx3.jpg` |
| Bedroom | `v1760989901/bedroom_xcasuq.jpg` |
| Dining | `v1760990684/dining_cvuxju.jpg` |
| Office | `v1760991627/office_zy54dk.jpg` |
| Kitchen | `v1760990288/kitchen_ss5qdm.jpg` |

---

## Adding a New Image

1. Upload the image to the Cloudinary account (cloud name `djmyiuu5k`)
2. Copy the delivery URL Cloudinary provides
3. Insert `f_auto,q_auto,w_[size]/` immediately after `/upload/`
4. Use the full URL in your HTML, JSON data file, or CSS

**Before:**
https://res.cloudinary.com/djmyiuu5k/image/upload/v1760989901/newsofa_ab12cd.jpg

**After (ready to use):**
https://res.cloudinary.com/djmyiuu5k/image/upload/f_auto,q_auto,w_800/v1760989901/newsofa_ab12cd.jpg

---

## Notes

- The version number (e.g. `v1760989901`) is part of the URL — keep it. It helps with caching.
- Never link to images stored locally or on other hosts. All images go through Cloudinary for consistent optimisation.