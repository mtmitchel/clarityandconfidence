/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#0369a1',
					foreground: '#ffffff',
				},
				secondary: {
					DEFAULT: '#16a34a',
					foreground: '#ffffff',
				},
				accent: {
					DEFAULT: '#475569',
					foreground: '#ffffff',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				// Sophisticated color palette for divorce resource application
				// Warm neutrals and calming tones for emotional support
				neutral: {
					25: '#fdfdfc',
					50: '#fafaf9',
					100: '#f5f5f4',
					200: '#e7e5e4',
					300: '#d6d3d1',
					400: '#a8a29e',
					500: '#78716c',
					600: '#57534e',
					700: '#44403c',
					800: '#292524',
					900: '#1c1917',
				},
				warm: {
					25: '#fefcfb',
					50: '#fdf8f6',
					100: '#f9f1e9',
					200: '#f3e8dc',
					300: '#ebd5c4',
					400: '#ddbea9',
					500: '#cb997e',
					600: '#b07d62',
					700: '#8d5524',
					800: '#6f4518',
					900: '#541a0f',
				},
				calm: {
					25: '#f8fafc',
					50: '#f1f5f9',
					100: '#e2e8f0',
					200: '#cbd5e1',
					300: '#94a3b8',
					400: '#64748b',
					500: '#475569',
					600: '#334155',
					700: '#1e293b',
					800: '#0f172a',
					900: '#020617',
				},
				sage: {
					25: '#f9fafb',
					50: '#f0f4f0',
					100: '#dcedd3',
					200: '#bfdb9f',
					300: '#94c973',
					400: '#6ab04c',
					500: '#4f9a37',
					600: '#3d7c26',
					700: '#2f5f1f',
					800: '#1f401a',
					900: '#142415',
				},
				blue: {
					25: '#f8fafc',
					50: '#f0f6fc',
					100: '#e0ecf4',
					200: '#b9d5ea',
					300: '#86b8dc',
					400: '#4f94cd',
					500: '#2563eb',
					600: '#1d4ed8',
					700: '#1e40af',
					800: '#1e3a8a',
					900: '#172554',
				},
				escape: {
					DEFAULT: '#dc2626',
					hover: '#b91c1c',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}