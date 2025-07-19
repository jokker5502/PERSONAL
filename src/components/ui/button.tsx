import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
	'inline-flex items-center justify-center font-semibold whitespace-nowrap rounded-[30px] cursor-pointer',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 text-white',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 text-white',
				secondary:
					'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 text-white',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-white',
				link: 'underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
			},
			color: {
				primary: 'text-primary',
				secondary: 'text-secondary',
				destructive: 'text-destructive',
				blue: 'text-blue-500',
				green: 'text-green-500',
				red: 'text-red-500',
				yellow: 'text-yellow-500',
				purple: 'text-purple-500',
				pink: 'text-pink-500',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			color: 'primary',
		},
	}
)

export type ButtonProps = {
	asChild?: boolean
	className?: string
} & VariantProps<typeof buttonVariants> &
	(
		| React.ButtonHTMLAttributes<HTMLButtonElement>
		| (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
	)

// Creamos dos componentes separados con sus tipos y refs apropiados
const ButtonElement = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		asChild?: boolean
		className?: string
	} & VariantProps<typeof buttonVariants>
>(({ className, variant, size, color, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button'
	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, color, className }))}
			ref={ref}
			{...props}
		/>
	)
})

const AnchorElement = React.forwardRef<
	HTMLAnchorElement,
	React.AnchorHTMLAttributes<HTMLAnchorElement> & {
		asChild?: boolean
		className?: string
	} & VariantProps<typeof buttonVariants>
>(({ className, variant, size, color, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'a'
	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, color, className }))}
			ref={ref}
			{...props}
		/>
	)
})

// Componente Button que decide cuál renderizar
const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
	if ('href' in props) {
		// TypeScript reconoce que aquí props es del tipo AnchorHTMLAttributes
		return (
			<AnchorElement
				{...props}
				ref={ref as React.ForwardedRef<HTMLAnchorElement>}
			/>
		)
	}
	// Y aquí que es del tipo ButtonHTMLAttributes
	return (
		<ButtonElement
			{...props}
			ref={ref as React.ForwardedRef<HTMLButtonElement>}
		/>
	)
})

ButtonElement.displayName = 'ButtonElement'
AnchorElement.displayName = 'AnchorElement'
Button.displayName = 'Button'

export { Button, buttonVariants }
