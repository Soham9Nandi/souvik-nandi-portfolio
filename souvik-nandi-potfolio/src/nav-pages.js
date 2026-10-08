// Fixed page order — never reorder. Visual stacking position is derived
// from this plus the active route; DOM order always follows this array.
export const pages = [
  { path: '/', label: 'Home' },
  { path: '/experience', label: 'Experience' },
  { path: '/publications', label: 'Publications' },
  { path: '/patents', label: 'Patents' },
  // Contact tab/page temporarily disabled — see DESIGN_LOG.md.
  // { path: '/contact', label: 'Contact' },
]
