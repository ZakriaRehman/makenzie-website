require('dotenv').config({ path: '.env.local' });
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// FAQ and Demo questions from ChatWidget.tsx
const translations = {
  en: {
    faq: [
      'We offer the following services:\n\nHealthcare AI Solutions\nHealthcare Data Engineering\nMedical Practice Automation\nHealthcare Analytics & Reporting\nHealthcare Product Development\nCustom Healthcare AI\n\nAll our services are HIPAA-compliant and designed to improve clinical workflows and patient outcomes.',
      'You can reach us at info@makenzie.co or call +92 316 0557117. You can also book a consultation directly through our scheduler.',
      'We offer three engagement models:\n\nSoftware Development Outsourcing - for full end-to-end solutions\nDedicated Healthcare Teams - for long-term integrated support\nHealthcare IT Staff Augmentation - to scale quickly\n\nAll pricing is custom-tailored to your specific needs.',
      'We are located at NASTP Delta, Lahore Cantt, Pakistan. We serve healthcare clients globally with HIPAA-compliant solutions.'
    ],
    demo: [
      'We usually start with a short discovery conversation. The goal is to understand your current workflows, challenges, and what you\'re trying to improve, whether that\'s customer communication, internal efficiency, or data flow. From there, we outline a practical approach tailored to your needs, rather than offering a one-size-fits-all solution.',
      'The first conversation is focused on listening. We discuss your pain points, existing systems, constraints, and priorities. This helps us identify where technology can actually add value and where it shouldn\'t. By the end of the call, both sides have clarity on whether there\'s a strong fit and what the next steps could look like.'
    ]
  },
  es: {
    faq: [
      'Ofrecemos los siguientes servicios:\n\nSoluciones de IA para la Salud\nIngeniería de Datos de Salud\nAutomatización de Práctica Médica\nAnálisis e Informes de Salud\nDesarrollo de Productos de Salud\nIA Personalizada para la Salud\n\nTodos nuestros servicios cumplen con HIPAA y están diseñados para mejorar los flujos de trabajo clínicos y los resultados de los pacientes.',
      'Puede contactarnos en info@makenzie.co o llamar al +92 316 0557117. También puede reservar una consulta directamente a través de nuestro planificador.',
      'Ofrecemos tres modelos de compromiso:\n\nOutsourcing de Desarrollo de Software - para soluciones completas\nEquipos Dedicados de Salud - para soporte integrado a largo plazo\nAmpliación de Personal de TI en Salud - para escalar rápidamente\n\nTodos los precios se personalizan según sus necesidades específicas.',
      'Estamos ubicados en NASTP Delta, Lahore Cantt, Pakistán. Servimos a clientes del sector salud a nivel mundial con soluciones que cumplen con HIPAA.'
    ],
    demo: [
      'Normalmente comenzamos con una breve conversación de descubrimiento. El objetivo es comprender sus flujos de trabajo actuales, desafíos y qué está tratando de mejorar, ya sea comunicación con el cliente, eficiencia interna o flujo de datos. A partir de ahí, esbozamos un enfoque práctico adaptado a sus necesidades, en lugar de ofrecer una solución única para todos.',
      'La primera conversación se centra en escuchar. Discutimos sus puntos débiles, sistemas existentes, limitaciones y prioridades. Esto nos ayuda a identificar dónde la tecnología puede realmente agregar valor y dónde no debería. Al final de la llamada, ambas partes tienen claridad sobre si hay un buen ajuste y cuáles podrían ser los próximos pasos.'
    ]
  },
  fr: {
    faq: [
      'Nous proposons les services suivants :\n\nSolutions IA pour la Santé\nIngénierie de Données de Santé\nAutomatisation de Pratique Médicale\nAnalyses et Rapports de Santé\nDéveloppement de Produits de Santé\nIA Personnalisée en Santé\n\nTous nos services sont conformes HIPAA et conçus pour améliorer les flux de travail cliniques et les résultats des patients.',
      'Vous pouvez nous contacter à info@makenzie.co ou appeler au +92 316 0557117. Vous pouvez également réserver une consultation directement via notre planificateur.',
      'Nous proposons trois modèles d\'engagement :\n\nExternalisation du Développement Logiciel - pour des solutions complètes\nÉquipes Dédiées de Santé - pour un support intégré à long terme\nAugmentation du Personnel IT de Santé - pour une mise à l\'échelle rapide\n\nTous les prix sont personnalisés selon vos besoins spécifiques.',
      'Nous sommes situés à NASTP Delta, Lahore Cantt, Pakistan. Nous servons des clients du secteur de la santé dans le monde entier avec des solutions conformes HIPAA.'
    ],
    demo: [
      'Nous commençons généralement par une courte conversation de découverte. L\'objectif est de comprendre vos flux de travail actuels, vos défis et ce que vous essayez d\'améliorer, qu\'il s\'agisse de communication client, d\'efficacité interne ou de flux de données. À partir de là, nous décrivons une approche pratique adaptée à vos besoins, plutôt que d\'offrir une solution universelle.',
      'La première conversation se concentre sur l\'écoute. Nous discutons de vos points de douleur, de vos systèmes existants, de vos contraintes et de vos priorités. Cela nous aide à identifier où la technologie peut réellement apporter de la valeur et où elle ne le devrait pas. À la fin de l\'appel, les deux parties ont une clarté sur l\'adéquation et sur les prochaines étapes possibles.'
    ]
  }
};

async function generateTTS(text, language, filename) {
  try {
    console.log(`Generating TTS for: ${filename}`);

    const response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'nova',
      input: text,
    });

    const buffer = Buffer.from(await response.arrayBuffer());

    // Ensure directory exists
    const audioDir = path.join(__dirname, '..', 'public', 'audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    const filePath = path.join(audioDir, filename);
    fs.writeFileSync(filePath, buffer);

    console.log(`✅ Generated: ${filename}`);
  } catch (error) {
    console.error(`❌ Failed to generate ${filename}:`, error.message);
  }
}

async function generateAllTTS() {
  console.log('🎙️  Starting TTS generation for all FAQs and demo questions...\n');

  for (const [lang, data] of Object.entries(translations)) {
    console.log(`\n📢 Generating ${lang.toUpperCase()} audio files...`);

    // Generate FAQ audio files
    for (let i = 0; i < data.faq.length; i++) {
      await generateTTS(data.faq[i], lang, `${lang}-faq-${i}.mp3`);
    }

    // Generate demo question audio files
    for (let i = 0; i < data.demo.length; i++) {
      await generateTTS(data.demo[i], lang, `${lang}-demo-${i}.mp3`);
    }
  }

  console.log('\n✨ All TTS audio files generated successfully!');
}

generateAllTTS();
