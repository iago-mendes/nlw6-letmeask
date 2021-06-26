import './styles.scss'

type YoutubeEmbedProps = {
	embedId: string
}

export function YoutubeEmbed({embedId}: YoutubeEmbedProps) {
	return (
		<div className="youtube-video">
			<iframe
				src={`https://www.youtube.com/embed/${embedId}`}
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				title="Embedded youtube"
			/>
		</div>
	)
}
