# 🎨 Mam Center - Visual Design System

## CORE AESTHETIC: "Rugged Luxury"
Blending the grit of a professional stable with the elegance of a high-end nature retreat.

---

## 🎨 COLOR PALETTE

### **PRIMARY COLORS**

#### Deep Forest Green (Nature)
```
forest-600: #2d6f51  ← Primary
forest-700: #245841
forest-500: #3d8b66
```
**Usage:** Primary buttons, headings, brand accent
**Psychology:** Trust, growth, premium outdoor brand

#### Warm Saddle Brown (Leather)
```
saddle-500: #a67240  ← Primary
saddle-600: #8b5e35
saddle-400: #c08f54
```
**Usage:** Secondary buttons, luxury elements, tactile components
**Psychology:** Craftsmanship, heritage, equestrian authenticity

---

### **SECONDARY COLORS**

#### Cream/Off-White (Negative Space)
```
cream-200: #faf6ee  ← Primary background
cream-100: #fdfbf7
cream-300: #f5f0e5
```
**Usage:** Backgrounds, breathable whitespace
**Psychology:** Cleanliness, openness, luxury

#### Slate Grey (Structure)
```
slate-500: #6c757d  ← Primary
slate-700: #343a40
slate-600: #495057
```
**Usage:** Body text, borders, structural elements
**Psychology:** Professionalism, stability

---

### **ACCENT COLORS**

#### Muted Gold (Excellence/Awards)
```
gold-500: #d4af37  ← Primary accent
gold-400: #e8c87c
gold-600: #b8941f
```
**Usage:** Awards, premium badges, hover states, active nav indicators
**Psychology:** Achievement, prestige, championship

#### Action Orange (CTA)
```
action-500: #f97316  ← "Book Now" buttons
action-600: #ea580c
action-400: #fb923c
```
**Usage:** High-priority CTAs, booking buttons, urgent actions
**Psychology:** Energy, urgency, conversion-focused

---

## ✍️ TYPOGRAPHY

### **Headings: Playfair Display (Serif)**
```css
font-family: 'Playfair Display', Georgia, serif;
```
**Weights:** 400 (Regular), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)

**Usage:**
- H1: 48-72px (Mobile: 32-48px)
- H2: 36-56px (Mobile: 28-36px)
- H3: 24-32px (Mobile: 20-24px)

**Rationale:** Communicates authority, tradition, and premium quality. The serif style evokes equestrian heritage.

---

### **Body: Montserrat (Sans-Serif)**
```css
font-family: 'Montserrat', system-ui, sans-serif;
```
**Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

**Usage:**
- Body text: 16-18px
- Small text: 14px
- Navigation: 15px (Medium weight)
- Buttons: 16px (SemiBold)

**Rationale:** Clean, highly legible on mobile. Modern contrast to serif headings.

---

## 🔘 UI COMPONENTS

### **Button Styles: "Tactile Luxury"**

#### Primary Button (Forest Green)
```jsx
<button className="bg-forest-600 text-cream-200 shadow-tactile hover:shadow-tactile-hover active:shadow-tactile-pressed active:translate-y-0.5">
  Explore Programs
</button>
```
**Feel:** Pressable, physical, like a leather saddle button

#### Action Button (High-Contrast Orange)
```jsx
<button className="bg-action-500 text-white shadow-tactile-hover hover:shadow-luxury font-bold tracking-wide">
  Book Now
</button>
```
**Feel:** Urgent, warm, inviting immediate action

#### Outline Button
```jsx
<button className="border-2 border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-cream-200 shadow-tactile">
  Learn More
</button>
```
**Feel:** Refined, secondary action

---

### **Shadows (Tactile Design)**

```css
/* Subtle depth - resting state */
shadow-tactile: 0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)

/* Enhanced - hover state */
shadow-tactile-hover: 0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.15)

/* Pressed - active state */
shadow-tactile-pressed: inset 0 2px 4px rgba(0, 0, 0, 0.2)

/* Luxury elevation */
shadow-luxury: 0 10px 40px rgba(45, 111, 81, 0.15)
shadow-luxury-lg: 0 20px 60px rgba(45, 111, 81, 0.2)
```

---

### **Card Components**

#### Persona Selector Cards
```jsx
<div className="bg-cream-200 dark:bg-slate-700 p-10 border-2 border-transparent hover:border-gold-500 hover:shadow-luxury hover:-translate-y-3">
  <div className="bg-leather-texture opacity-0 hover:opacity-100" />
  {/* Content */}
</div>
```

**Features:**
- Subtle leather texture on hover
- Gold border accent
- Luxury shadow elevation
- 3D lift effect

---

## 📸 IMAGERY STRATEGY

### **Sport / Academy (Adrenaline)**

**Photography Style:**
- **Shutter Speed:** 1/1000s+ (frozen action)
- **Composition:** Dynamic angles, diagonal lines
- **Lighting:** High contrast, sharp shadows
- **Color Grading:** Cooler tones, saturated greens
- **Mood:** Power, precision, athleticism

**Examples:**
- Mid-jump horse and rider (frozen peak moment)
- Close-up of rider's determined face
- Dust kicking up from hooves

---

### **Lifestyle / Coffee / Safari (Peace)**

**Photography Style:**
- **Shutter Speed:** 1/125s (gentle motion blur on steam)
- **Composition:** Centered, symmetrical, calm
- **Lighting:** Golden hour, warm side lighting, soft shadows
- **Color Grading:** Warmer tones, desaturated for nostalgia
- **Mood:** Serenity, comfort, connection with nature

**Examples:**
- Steam rising from coffee cup with mountain backdrop
- Soft-focus horse nuzzling human hand
- Sunset safari silhouette

---

## 🖼️ SPLIT HERO VISUAL TREATMENT

### Left Side (Sport)
```jsx
<div 
  className="bg-cover bg-center"
  style={{
    backgroundImage: 'url(...)',
    filter: 'brightness(0.7) contrast(1.1)' // Dramatic
  }}
/>
```
**Effect:** High energy, frozen action, darker overlay for text contrast

### Right Side (Lifestyle)
```jsx
<div 
  className="bg-cover bg-center"
  style={{
    backgroundImage: 'url(...)',
    filter: 'brightness(0.8) saturate(1.2)' // Warm glow
  }}
/>
```
**Effect:** Soft, inviting, warmer saturation, lighter overlay

---

## 📐 SPACING SYSTEM ("Breathable Design")

### Section Spacing
```css
.section-spacing {
  @apply py-20 md:py-32;
}
```
**80px mobile, 128px desktop** — Generous whitespace between sections

### Container Width
```css
.container-breathable {
  @apply container mx-auto px-6 md:px-12 lg:px-20;
}
```
**Maximum 1280px** — Content never feels cramped

### Card Grid Gaps
```css
gap-8 /* 32px between cards */
```

---

## 🎭 DARK MODE PALETTE

### Backgrounds
```
Dark primary: slate-900 (#1a1d20)
Dark secondary: slate-800 (#212529)
Dark card: slate-700 (#343a40)
```

### Text
```
Primary text: cream-200 (#faf6ee)
Secondary text: cream-400 (#ede5d6)
```

### Accents
```
Gold remains: gold-400 (#e8c87c) - brighter for contrast
Forest becomes: cream-300 for readability
```

---

## 🚫 WHAT TO AVOID

❌ **No neon or overly bright "tech" colors**
- No cyan, hot pink, electric blue
- Keep palette earthy and natural

❌ **No performance-heavy parallax**
- Simple hover transforms only
- No scroll-driven animations on mobile

❌ **No cramped layouts**
- Minimum 32px spacing between major elements
- Wide margins on desktop (80px+)

❌ **No flat, modern minimalism**
- All buttons must have shadows (tactile)
- Add texture overlays on hover

---

## ✅ DESIGN PRINCIPLES

### 1. **Tactile Over Flat**
Every interactive element should *feel* clickable with depth and texture.

### 2. **Breathable Layouts**
Generous whitespace = luxury. Never crowd content.

### 3. **Dual Personality**
Sport (gritty) vs Lifestyle (elegant) must be visually distinct but cohesive.

### 4. **Performance First**
Beautiful but fast. No auto-playing videos or heavy animations on mobile.

### 5. **Accessibility**
- Minimum contrast ratio: 4.5:1
- All CTAs use high-contrast `action-500` orange
- Focus states: Gold outline (`ring-2 ring-gold-500`)

---

## 🎨 COMPONENT EXAMPLES

### Navigation Link with Underline Animation
```jsx
<Link className="relative group">
  Academy
  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forest-600 group-hover:w-full transition-all duration-300" />
</Link>
```

### Luxury Card
```jsx
<div className="bg-cream-200 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-500">
  {/* Content */}
</div>
```

### Leather Texture Overlay
```jsx
<div className="relative overflow-hidden group">
  <div className="absolute inset-0 bg-leather-texture opacity-0 group-hover:opacity-100 transition-opacity" />
  <div className="relative z-10">{/* Content */}</div>
</div>
```

---

**This design system creates a premium equestrian brand that feels both rugged (professional riding) and refined (luxury retreat).**
