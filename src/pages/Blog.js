import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import axios from 'axios';
import Article from '../components/Article';

const Blog = () => {
    const [blogArticles, setBlogArticles] = useState([]);
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);

    const getData = () => {
        axios.get("http://localhost:3004/articles").then((res) => setBlogArticles(res.data));
    };

    useEffect(() => getData(), []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (content.length < 140) {
            setError(true);
        } else {
            axios.post("http://localhost:3004/articles", {
                author,
                content,
                date: Date.now()
            }).then(() => {
                setError(false);
                setAuthor("");
                setContent("");
                getData();
            })
        }
    }

    return (
        <div className="blog-container">
            <Logo />
            <Navigation />
            <h1>Blog</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Nom"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}>
                </input>
                <textarea
                    style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
                    placeholder="Message"
                    onChangeCapture={(e) => setContent(e.target.value)}
                    defaultValue={content}>
                </textarea>
                {error && <p>Veuillez écrire un minimum de 140 caractères</p>}
                <input type="submit" value="Envoyer" />
            </form>
            <ul>
                {blogArticles
                    .sort((a, b) => b.date - a.date)
                    .map((article) => (
                        < Article key={article.id} article={article} />
                    ))
                }
            </ul>

        </div>
    );
};

export default Blog;