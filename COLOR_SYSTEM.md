# Color System Documentation

This project uses a centralized color system based on standard Tailwind CSS colors with consistent usage patterns throughout the application.

## Color Configuration Location

Colors are defined in `app/globals.css` within the `@theme` directive using standard Tailwind color values.

## Available Color Variables

### Brand Colors (Blue Scale)
- `--color-blue-50: 239 246 255` - Very light blue backgrounds
- `--color-blue-100: 219 234 254` - Light blue backgrounds  
- `--color-blue-500: 59 130 246` - Primary brand color
- `--color-blue-600: 37 99 235` - Hover states
- `--color-blue-700: 29 78 216` - Active states

### Status Colors
- `--color-green-500: 34 197 94` - Success states
- `--color-red-500: 239 68 68` - Error states
- `--color-red-600: 220 38 38` - Error hover states
- `--color-red-700: 185 28 28` - Error active states

### Grayscale Colors
- `--color-gray-50: 249 250 251` - Light backgrounds
- `--color-gray-100: 243 244 246` - Card backgrounds
- `--color-gray-200: 229 231 235` - Light borders
- `--color-gray-300: 209 213 219` - Default borders
- `--color-gray-400: 156 163 175` - Subtle text
- `--color-gray-500: 107 114 128` - Muted text
- `--color-gray-700: 55 65 81` - Dark text
- `--color-gray-900: 17 24 39` - Primary text

## Standard Tailwind Utility Classes

The application uses standard Tailwind CSS utility classes for consistency and reliability:

### Brand Colors
- `text-blue-500` - Primary brand text color
- `bg-blue-500` - Primary brand background color
- `text-blue-600` - Brand hover text color
- `bg-blue-600` - Brand hover background color
- `text-blue-700` - Brand active text color
- `bg-blue-700` - Brand active background color
- `bg-blue-100` - Light brand background

### Status Colors
- `text-green-500` - Success text color
- `text-red-500` - Error text color
- `bg-red-600` - Error background color
- `bg-red-700` - Error hover background color

### Text Colors
- `text-gray-900` - Primary text color
- `text-gray-500` - Muted text color
- `text-gray-400` - Subtle text color

### Background Colors
- `bg-gray-50` - Main surface background
- `bg-gray-100` - Elevated surface background

### Border Colors
- `border-gray-300` - Main border color
- `border-gray-200` - Subtle border color

## Color Usage Patterns

### Primary Actions
```jsx
<button className="bg-blue-500 hover:bg-blue-600 text-white">
  Primary Button
</button>
```

### Error States
```jsx
<p className="text-red-500">Error message</p>
<button className="bg-red-600 hover:bg-red-700 text-white">
  Destructive Action
</button>
```

### Success States
```jsx
<p className="text-green-500">Success message</p>
```

### Text Hierarchy
```jsx
<h1 className="text-gray-900">Main heading</h1>
<p className="text-gray-500">Supporting text</p>
<span className="text-gray-400">Subtle text</span>
```

### Surfaces and Borders
```jsx
<div className="bg-gray-50 border border-gray-200">
  <div className="bg-white border border-gray-300">
    Content
  </div>
</div>
```

## Benefits

1. **Standard Compliance**: Uses standard Tailwind CSS classes for maximum compatibility
2. **Consistent Branding**: Blue-based color scheme throughout the application
3. **Accessibility**: Proper contrast ratios maintained across all color combinations
4. **Maintainability**: Standard classes are well-documented and widely understood
5. **Flexibility**: Easy to modify by changing Tailwind configuration or individual classes

## Color Consistency Rules

1. **Icons**: Use `text-blue-500` for brand icons
2. **Primary Buttons**: Use `bg-blue-500 hover:bg-blue-600`
3. **Error Messages**: Use `text-red-500`
4. **Success Messages**: Use `text-green-500`
5. **Primary Text**: Use `text-gray-900`
6. **Secondary Text**: Use `text-gray-500`
7. **Backgrounds**: Use `bg-gray-50` for main surfaces
8. **Borders**: Use `border-gray-300` for primary borders, `border-gray-200` for subtle borders

## Modifying Colors

To change the color scheme:

1. **Update CSS Variables**: Modify the RGB values in `app/globals.css` within the `@theme` section
2. **Update Utility Classes**: Replace color classes throughout the codebase
3. **Maintain Consistency**: Ensure all related shades are updated together

Example of updating the brand color from blue to purple:
```css
/* In app/globals.css */
--color-purple-500: 168 85 247;
--color-purple-600: 147 51 234;
--color-purple-700: 126 34 206;
```

Then replace all instances of `blue-500` with `purple-500`, `blue-600` with `purple-600`, etc.

This systematic approach ensures consistent and maintainable color usage throughout the application.