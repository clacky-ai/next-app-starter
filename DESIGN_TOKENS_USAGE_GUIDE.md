# Design Tokens Usage Guide - Sharing App Template

## Overview
This guide provides clear instructions on how to use the cleaned and optimized design tokens in the sharing application template.

---

## 🎨 Token Categories

### 1. Brand Colors
Use these for brand-specific elements, buttons, and primary actions:

```tsx
// Primary brand color
<Button className="bg-blue-500 hover:bg-blue-600 text-white">
  Share Content
</Button>

// Brand accent
<div className="border-l-4 border-blue-500 bg-blue-50 p-4">
  Brand highlight
</div>
```

### 2. Status Colors
Use these for feedback, notifications, and status indicators:

```tsx
// Success states
<Alert className="bg-green-50 text-green-700 border-green-200">
  Success message
</Alert>

// Error states  
<div className="text-red-500 bg-red-50 border border-red-200">
  Error message
</div>

// Warning states
<div className="text-amber-600 bg-amber-50">
  Warning message
</div>
```

### 3. Semantic UI Tokens
Use these for layout, cards, and general UI components:

```tsx
// Layout backgrounds
<div className="bg-background text-foreground">
  Main content
</div>

// Cards and containers
<Card className="bg-card text-card-foreground border-border">
  Card content
</Card>

// Muted/secondary content
<p className="text-muted-foreground">
  Secondary information
</p>
```

### 4. Grayscale System
Use these for text hierarchy, neutral backgrounds, and borders:

```tsx
// Text hierarchy
<h1 className="text-gray-900">Primary heading</h1>
<h2 className="text-gray-700">Secondary heading</h2>
<p className="text-gray-500">Body text</p>
<span className="text-gray-400">Placeholder text</span>

// Backgrounds and borders
<div className="bg-gray-50 border border-gray-200">
  Light container
</div>
```

---

## 🚀 Sharing App Specific Tokens

New tokens specifically added for sharing applications:

```css
--color-share-primary: var(--color-blue-500);   /* Primary sharing actions */
--color-share-success: var(--color-green-500);  /* Successful shares */
--color-share-error: var(--color-red-500);      /* Share failures */
--color-share-warning: var(--color-amber-500);  /* Share warnings */
```

### Usage Examples:

```tsx
// Share button
<Button className="bg-blue-500 hover:bg-blue-600">
  <ShareIcon className="w-4 h-4 mr-2" />
  Share
</Button>

// Share success notification
<div className="bg-green-50 border border-green-200 text-green-700">
  Content shared successfully!
</div>

// Share error notification
<div className="bg-red-50 border border-red-200 text-red-700">
  Failed to share content
</div>
```

---

## 📐 Border Radius System

Consistent spacing for rounded corners:

```tsx
// Small radius - subtle rounding
<Button className="rounded-sm"> // 4px

// Medium radius - moderate rounding  
<Card className="rounded-md">   // 6px

// Large radius - default rounding
<Dialog className="rounded-lg">  // 8px

// Extra large radius - prominent rounding
<Avatar className="rounded-xl">  // 12px
```

---

## 🌓 Dark Mode Support

All tokens automatically support dark mode. Simply toggle the `dark` class:

```tsx
// Component automatically adapts
<div className="bg-background text-foreground border-border">
  This adapts to light/dark mode
</div>

// Direct colors remain consistent
<Button className="bg-blue-500 hover:bg-blue-600">
  This stays blue in both modes
</Button>
```

---

## ✅ Best Practices

### DO ✅

```tsx
// Use semantic tokens for layout
<main className="bg-background text-foreground">

// Use direct colors for brand elements
<Button className="bg-blue-500 hover:bg-blue-600">

// Use status colors for feedback
<Alert className="text-red-500 border-red-200">

// Use grayscale for text hierarchy
<h1 className="text-gray-900">
<p className="text-gray-500">
```

### DON'T ❌

```tsx
// Don't mix inconsistent color systems
<div className="bg-primary text-blue-500"> // ❌ Mixed systems

// Don't use hardcoded colors
<div className="bg-[#3b82f6]"> // ❌ Use bg-blue-500 instead

// Don't ignore dark mode
<div className="bg-white text-black"> // ❌ Use bg-background text-foreground
```

---

## 🔧 Migration Guide

If you have existing components using old tokens:

### Before (Old Pattern):
```tsx
<div className="bg-orange-500 hover:bg-orange-600">
  // Orange theme - outdated
</div>
```

### After (New Pattern):
```tsx
<div className="bg-blue-500 hover:bg-blue-600">
  // Blue theme - updated
</div>
```

### Semantic Token Migration:
```tsx
// Before - hardcoded
<Card className="bg-white border-gray-200">

// After - semantic
<Card className="bg-card border-border">
```

---

## 📊 Token Reference Quick List

### Colors You Should Use Most:

**Brand & Actions:**
- `bg-blue-500` `hover:bg-blue-600` - Primary actions
- `text-blue-500` - Links and accents

**Status & Feedback:**
- `text-green-500` `bg-green-50` - Success
- `text-red-500` `bg-red-50` - Errors  
- `text-amber-500` `bg-amber-50` - Warnings

**Layout & UI:**
- `bg-background` `text-foreground` - Main layout
- `bg-card` `text-card-foreground` - Cards
- `border-border` - Standard borders
- `text-muted-foreground` - Secondary text

**Grayscale Hierarchy:**
- `text-gray-900` - Primary headings
- `text-gray-700` - Secondary headings  
- `text-gray-500` - Body text
- `text-gray-400` - Placeholder text

This system provides consistent, accessible, and maintainable styling for your sharing application!