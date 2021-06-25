import './styles.scss'

export function Loading() {
	return (
		<div className="loading-container">
			<svg>
				<circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
			</svg>
		</div>
	)
}
