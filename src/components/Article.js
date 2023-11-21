import React, { useState } from 'react';
import axios from 'axios';

const Article = ({ article }) => {
    const dateFormater = (date) => {
        let date2 = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        });
        return date2;
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");

    const handleEdit = () => {
        const data = {
            author: article.author,
            content: editContent ? editContent : article.content,
            date: article.date,
            editedDate: Date.now()
        }

        axios.put("http://localhost:3004/articles/" + article.id, data).then(() => {
            setIsEditing(false);
        });
    }

    const handleDelete = () => {
        axios.delete("http://localhost:3004/articles/" + article.id).then(() => {
            window.location.reload();
        });
    }

    return (
        <div className="article" style={{ background: isEditing ? "#f3feff" : "white" }}>
            <div className="card-header">
                <h3>{article.author}</h3>
                <em>Posté le {dateFormater(article.date)}</em>
            </div>
            {
                isEditing ? (
                    <textarea
                        defaultValue={editContent ? editContent : article.content}
                        autoFocus
                        onChange={(e) => setEditContent(e.target.value)}>
                    </textarea>
                ) : (
                    <p>{editContent ? editContent : article.content}</p>
                )
            }
            <div className="btn-container">
                {isEditing ? (
                    <button onClick={() => handleEdit()}>Valider</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Editer</button>
                )}
                <button onClick={() => {
                    if (window.confirm("Etes-vous sûr de vouloir supprimer cet article ?")) {
                        handleDelete();
                    }
                }}>Supprimer</button>
            </div>
        </div >
    );
};

export default Article;