import React, { createContext, useState, useContext, useEffect } from 'react';
import { formatTime, getBotResponse } from '../utils/constants';
import { contactsData } from '../data/contacts.Data.jsx';
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

// Keys storage
const STORAGE_USER = "ComunidadArtista_user";
const messagesKeyFor = (u) => `ComunidadArtista_messages__${String(u || "Usuario").trim().toLowerCase()}`;

export const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const contacts = contactsData;

  // ======================
  // USER
  // ======================
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem(STORAGE_USER) || 'Usuario';
  });

  // ======================
  // STATUS
  // ======================
  const [activeStatus, setActiveStatus] = useState(null);
  const openStatus = (videoUrl) => setActiveStatus(videoUrl);
  const closeStatus = () => setActiveStatus(null);

  // helper para comparar números aunque tengan guiones/espacios
  const normalize = (v) => String(v ?? "").replace(/[^0-9]/g, "");

  // ======================
  // MENSAJES (por usuario)
  // ======================
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(messagesKeyFor(localStorage.getItem(STORAGE_USER)));

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return {};
  });

  const [isTyping, setIsTyping] = useState(null);

  // ======================
  // STORAGE (usuario)
  // ======================
  useEffect(() => {
    if (!userName) return;
    localStorage.setItem(STORAGE_USER, userName);
  }, [userName]);

  // ======================
  // Cuando cambia el usuario: cargar sus mensajes (o vacío)
  // ======================
  useEffect(() => {
    if (!userName || userName === "Usuario") return;

    const saved = localStorage.getItem(messagesKeyFor(userName));
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          setMessages(parsed);
          return;
        }
      } catch {}
    }
    setMessages({});
  }, [userName]);

  // ======================
  // Guardar mensajes del usuario actual (en su key)
  // ======================
  useEffect(() => {
    if (!userName || userName === "Usuario") return;
    localStorage.setItem(messagesKeyFor(userName), JSON.stringify(messages));
  }, [messages, userName]);

  // ======================
  // (OPCIONAL) Marcar como leídos los mensajes del usuario
  // ======================
  useEffect(() => {
    if (userName === 'Usuario') return;

    setMessages(prev => {
      const prevObj = prev && typeof prev === 'object' ? prev : {};

      const updated = Object.fromEntries(
        Object.entries(prevObj).map(([cid, arr]) => {
          const safeArr = Array.isArray(arr) ? arr : [];
          return [
            cid,
            safeArr.map(m =>
              m.author === userName ? { ...m, status: 'read' } : m
            ),
          ];
        })
      );

      return updated;
    });
  }, [userName]);

  // ======================
  // LOGOUT
  // ======================
  const logout = () => {
    // borra usuario activo
    localStorage.removeItem(STORAGE_USER);

    // opcional: si querés borrar también el historial del usuario actual:
    // if (userName && userName !== "Usuario") localStorage.removeItem(messagesKeyFor(userName));

    setUserName("Usuario");
    setMessages({});
    setIsTyping(null);
    navigate("/login");
  };

  // ======================
  // SEND MESSAGE
  // ======================
  const sendMessage = (contactId, text) => {
    const cleanText = (text ?? "").trim();
    if (!contactId || cleanText.length === 0) return;

    const hora = formatTime(new Date());

    const newMessage = {
      id: Date.now(),
      text: cleanText,
      author: userName ?? "Usuario",
      time: hora,
      status: 'sent'
    };

    // 1) Agrega el mensaje del usuario (blindado)
    setMessages(prev => {
      const prevObj = prev && typeof prev === 'object' ? prev : {};
      const currentChat = Array.isArray(prevObj[contactId]) ? prevObj[contactId] : [];

      return {
        ...prevObj,
        [contactId]: [...currentChat, newMessage]
      };
    });

    setIsTyping(contactId);

    setTimeout(() => {
      const contact = contacts.find(c =>
        normalize(c.PhoneNumber ?? c.phoneNumber ?? c.id) === normalize(contactId)
      );

      const contactName = contact?.name ?? "Contacto";

      const reply = {
        id: Date.now() + 1,
        text: getBotResponse({
          userName: userName ?? "Usuario",
          userText: cleanText,
          contactId,
          contactName,
        }),
        author: contactName,
        time: formatTime(new Date()),
        status: 'read'
      };

      setMessages(prev => {
        const prevObj = prev && typeof prev === 'object' ? prev : {};
        const chatActual = Array.isArray(prevObj[contactId]) ? prevObj[contactId] : [];

        const chatActualizado = chatActual.map(m =>
          m.author === (userName ?? "Usuario")
            ? { ...m, status: 'read' }
            : m
        );

        return {
          ...prevObj,
          [contactId]: [...chatActualizado, reply]
        };
      });

      setIsTyping(null);
    }, 2000);
  };

  return (
    <ChatContext.Provider value={{
      contacts,
      messages,
      sendMessage,
      userName,
      setUserName,
      isTyping,
      logout,
      openStatus,
      closeStatus,
      activeStatus
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);