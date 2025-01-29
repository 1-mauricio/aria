import { Link } from "react-router-dom";
import "../styles/article-item.css";

const ArticleItem = ({ post, variant = "default" }) => {
	return (
		<Link to={`/p/${post.customLink}`}>
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
