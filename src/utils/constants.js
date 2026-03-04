export const formatTime = (date) => {
  return date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0");
};

export const getBotResponse = ({ userName, userText, contactId, contactName }) => {
  
  userName = userName ?? "Usuario";
  userText = userText ?? "";
  contactName = contactName ?? "Contacto";
  contactId = String(contactId ?? "");

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const respuestasPorContacto = {
    "1-888-376-7730": [
      `Hola ${userName} ¿Cómo estás?`,
      `Preparando la nueva Gira`,
      `Argentina siempre presente ¿Qué me contás?`,
    ],
    "1-848-356-9900": [
      `Dale ${userName}, lo laburamos: "${userText}" 🎶`,
      `Eso está pa' un hit. ¿Le metemos mañana?`,
      `Ok, ok… ¿ritmo rápido o lento?`,
    ],
    "1-278-098-4458": [
      `¡${userName}!, eso me encanta "${userText}"`,
      `Vida, contame más… ¿cuándo lo hacemos realidad?`,
      `¡Dale! Eso suena a show en Argentina`,
    ],
    "1-548-568-1249": [
      `¡${userName}! mirá vos "${userText}" 😊`,
      `Eso me recuerda a una letra… ¿sabés?`,
      `Qué lindo leerte. ¿Cómo viene tu día?`,
    ],
    "1-321-471-3281": [
      `Jeje ${userName} ✨ "${userText}" tiene magia`,
      `Pará pará… eso merece un nuevo tema 😄`,
      `Me gusta. ¿Querés que te diga una idea?`,
    ],
  };

  const fallback = [
    `Hola ${userName}, soy ${contactName}. ¿Me contás más sobre "${userText}"?`,
    `Entendido, ${userName}. ¿Cómo querés seguir?`,
    `Ok. Te leo`,
  ];

  const lista = respuestasPorContacto[contactId] || fallback;
  return pick(lista);
};