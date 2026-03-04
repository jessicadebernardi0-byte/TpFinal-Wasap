import React from 'react';
import { Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

const ContactList = () => {
    const { contacts, userName } = useChat();

    return (
        <div className="contact-list-page">
            <header className="page-header">
                <h1>Hola, {userName}</h1>
                <p>Selecciona a tu artista favorito para chatear</p>
            </header>
            <div className="contacts-grid">
                {contacts.map(c => (
                    <div key={c.PhoneNumber} className="contact-card">
                        <img src={c.avatar} alt={c.name} className="avatar-large" />
                        {/* Información principal */}
                        <h2>{c.name}</h2>
                         
                
                        
                        {/* Ficha técnica completa */}
                        
                        <Link to={`/chat/${c.PhoneNumber}`} className="chat-button">Abrir Chat</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactList;