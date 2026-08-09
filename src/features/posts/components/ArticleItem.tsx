import { Link } from "react-router-dom";
import "./ArticleItem.css";
import { Post } from "../types";

interface ArticleItemProps {
	post: Post;
	variant?: "default" | "small";
}

const ArticleItem = ({ post, variant = "default" }: ArticleItemProps) => {
	return (
		<Link to={`/p/${post.customLink || post.id}`}>
			<article className={`article-item ${variant}`}>
				<div className="article-content">
					<div className="article-meta">
						<div className="author-info">
							<span className="author-name">{post.author}</span>
						</div>
						<span className="post-date">{post.date}</span>
					</div>

					<h2 className="article-title">{post.title}</h2>

					{variant === "default" && (
						<p className="article-excerpt">{post.subTitle}</p>
					)}

					<div className="article-footer">
						<span className="read-time">
							{post.readTime} min read
						</span>
						<span className="category">{post.category}</span>
					</div>
				</div>
				{post.imageUrl && (
					<div className="article-image">
						<img src={post.imageUrl} alt={post.title} />
					</div>
				)}
			</article>
		</Link>
	);
};

export default ArticleItem;
