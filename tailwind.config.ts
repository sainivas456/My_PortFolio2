
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				cyber: ['BlenderPro', 'sans-serif'],
				mono: ['JetBrainsMono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				cyber: {
					primary: '#9b87f5',
					secondary: '#1A1F2C',
					accent: '#F97316',
					highlight: '#1EAEDB',
					dark: '#221F26',
					black: '#000000e6',
					neon: '#00FFFC',
					pink: '#FF00FF',
					yellow: '#FFFF00',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'text-flicker': {
					'0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
						opacity: '0.99',
						filter: 'drop-shadow(0 0 1px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 5px rgba(0, 255, 255, 0.4))'
					},
					'20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
						opacity: '0.4',
						filter: 'none'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						filter: 'drop-shadow(0 0 2px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 8px rgba(0, 255, 255, 0.4))'
					},
					'50%': {
						filter: 'drop-shadow(0 0 6px rgba(0, 255, 255, 1)) drop-shadow(0 0 12px rgba(0, 255, 255, 0.8))'
					}
				},
				'scan-line': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'data-stream': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'reveal': {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'text-flicker': 'text-flicker 3s linear infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'scan-line': 'scan-line 4s linear infinite',
				'data-stream': 'data-stream 20s linear infinite',
				'float': 'float 4s ease-in-out infinite',
				'reveal': 'reveal 1.5s ease-out forwards'
			},
			backgroundImage: {
				'cyber-grid': 'linear-gradient(rgba(27, 32, 43, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(27, 32, 43, 0.8) 1px, transparent 1px)',
				'gradient-cyber': 'linear-gradient(180deg, #1A1F2C 0%, #0D0F16 100%)',
			},
			backgroundSize: {
				'grid-lg': '50px 50px',
			},
			boxShadow: {
				'neon-glow': '0 0 5px theme("colors.cyber.neon"), 0 0 20px rgba(0, 255, 252, 0.3)',
				'pink-glow': '0 0 5px theme("colors.cyber.pink"), 0 0 20px rgba(255, 0, 255, 0.3)',
				'yellow-glow': '0 0 5px theme("colors.cyber.yellow"), 0 0 20px rgba(255, 255, 0, 0.3)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
