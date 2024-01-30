import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownViewer({ content }) {
    return (
        <Markdown className="prose prose-zinc dark:prose-invert h-full" remarkPlugins={[[remarkGfm]]}>
            {content}
        </Markdown>
    )
}