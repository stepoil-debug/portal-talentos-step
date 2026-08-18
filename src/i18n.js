export const localeRoutes = {
  'pt-BR': 'pt-br/',
  'pt-PT': 'pt-pt/',
  'en': 'en/',
  'es': 'es/',
  'fr': 'fr/'
};

const commonQualifications = {
  'pt-BR': ['Solda', 'Caldeiraria', 'Mecânica', 'Elétrica', 'Instrumentação', 'IRATA / Acesso por corda', 'Inspeção / END', 'Offshore'],
  'pt-PT': ['Soldadura', 'Caldeiraria', 'Mecânica', 'Eletricidade', 'Instrumentação', 'IRATA / Acesso por corda', 'Inspeção / END', 'Offshore'],
  en: ['Welding', 'Fabrication / Fitting', 'Mechanical', 'Electrical', 'Instrumentation', 'IRATA / Rope Access', 'Inspection / NDT', 'Offshore'],
  es: ['Soldadura', 'Calderería', 'Mecánica', 'Eléctrica', 'Instrumentación', 'IRATA / Acceso por cuerda', 'Inspección / END', 'Offshore'],
  fr: ['Soudage', 'Chaudronnerie', 'Mécanique', 'Électricité', 'Instrumentation', 'IRATA / Accès sur corde', 'Inspection / CND', 'Offshore']
};

export const translations = {
  'pt-BR': {
    htmlLang: 'pt-BR',
    languageLabel: 'Idioma',
    badge: 'STEP Careers',
    title: 'Cadastre seu currículo na STEP',
    subtitle: 'Preencha seu perfil profissional diretamente no sistema para participar do banco global de talentos da STEP Oil & Gas.',
    intro: 'O cadastro é estruturado, sem anexos, e poderá ser direcionado automaticamente para Brasil, Portugal, Namíbia ou oportunidades globais.',
    requiredHint: 'Campos com * são obrigatórios.',
    sections: {
      personal: '1. Dados pessoais', objective: '2. Objetivo profissional', summary: '3. Resumo profissional',
      experience: '4. Experiência profissional', education: '5. Formação acadêmica', qualifications: '6. Qualificações e competências',
      certifications: '7. Certificações', languages: '8. Idiomas', availability: '9. Disponibilidade'
    },
    fields: {
      fullName: 'Nome completo', email: 'E-mail', phone: 'Telefone / WhatsApp', birthDate: 'Data de nascimento', nationality: 'Nacionalidade',
      residenceCountry: 'País de residência', city: 'Cidade / Região', targetModule: 'País / módulo de interesse', targetRole: 'Cargo de interesse',
      area: 'Área profissional', summary: 'Conte sua trajetória, principais experiências e objetivos', company: 'Empresa', role: 'Cargo', start: 'Início', end: 'Término',
      currentJob: 'Trabalho atual', activities: 'Principais atividades e responsabilidades', course: 'Curso / Formação', institution: 'Instituição',
      educationLevel: 'Nível de formação', conclusion: 'Ano de conclusão', mainQualifications: 'Principais qualificações', technicalSkills: 'Competências técnicas',
      behavioralSkills: 'Competências comportamentais', certificate: 'Nome da certificação', issuer: 'Instituição emissora', certificateNumber: 'Nº do certificado',
      validity: 'Validade', language: 'Idioma', proficiency: 'Nível de proficiência', travel: 'Disponibilidade para viagens', offshore: 'Disponibilidade offshore',
      relocation: 'Disponibilidade para mudança de país', startAvailability: 'Quando pode iniciar?', notes: 'Observações sobre disponibilidade'
    },
    placeholders: {
      fullName: 'Digite seu nome completo', targetRole: 'Ex.: Soldador, Engenheiro de Planejamento, Inspetor...', summary: 'Descreva sua trajetória profissional...',
      activities: 'Descreva as atividades realizadas...', technicalSkills: 'Ex.: TIG, MIG/MAG, AutoCAD, Primavera P6...', behavioralSkills: 'Ex.: liderança, trabalho em equipe, comunicação...'
    },
    select: 'Selecione', addExperience: '+ Adicionar experiência', addEducation: '+ Adicionar formação', addCertification: '+ Adicionar certificação', addLanguage: '+ Adicionar idioma',
    remove: 'Remover', saveDraft: 'Salvar rascunho', submit: 'Enviar cadastro', consent: 'Autorizo o tratamento das minhas informações para análise de perfil e oportunidades profissionais, conforme a Política de Privacidade da STEP.',
    draftSaved: 'Rascunho salvo neste dispositivo.', success: 'Cadastro validado com sucesso.', previewSuccess: 'Cadastro validado. A integração com o Supabase será ativada na implantação oficial.',
    error: 'Não foi possível enviar o cadastro. Verifique os campos e tente novamente.',
    yes: 'Sim', no: 'Não', global: 'Global / qualquer país', brazil: 'Brasil', portugal: 'Portugal', namibia: 'Namíbia',
    proficiencies: ['Básico', 'Intermediário', 'Avançado', 'Fluente', 'Nativo'], qualifications: commonQualifications['pt-BR']
  },
  'pt-PT': {
    htmlLang: 'pt-PT', languageLabel: 'Idioma', badge: 'STEP Careers', title: 'Registe o seu currículo na STEP',
    subtitle: 'Preencha o seu perfil profissional diretamente no sistema para integrar o banco global de talentos da STEP Oil & Gas.',
    intro: 'O registo é estruturado, sem anexos, e pode ser encaminhado automaticamente para Portugal, Brasil, Namíbia ou oportunidades globais.', requiredHint: 'Os campos com * são obrigatórios.',
    sections: {personal:'1. Dados pessoais', objective:'2. Objetivo profissional', summary:'3. Resumo profissional', experience:'4. Experiência profissional', education:'5. Formação académica', qualifications:'6. Qualificações e competências', certifications:'7. Certificações', languages:'8. Idiomas', availability:'9. Disponibilidade'},
    fields: {fullName:'Nome completo',email:'E-mail',phone:'Telefone / WhatsApp',birthDate:'Data de nascimento',nationality:'Nacionalidade',residenceCountry:'País de residência',city:'Cidade / Região',targetModule:'País / módulo de interesse',targetRole:'Função de interesse',area:'Área profissional',summary:'Percurso, principais experiências e objetivos',company:'Empresa',role:'Função',start:'Início',end:'Fim',currentJob:'Função atual',activities:'Principais atividades e responsabilidades',course:'Curso / Formação',institution:'Instituição',educationLevel:'Nível de formação',conclusion:'Ano de conclusão',mainQualifications:'Principais qualificações',technicalSkills:'Competências técnicas',behavioralSkills:'Competências comportamentais',certificate:'Nome da certificação',issuer:'Entidade emissora',certificateNumber:'N.º do certificado',validity:'Validade',language:'Idioma',proficiency:'Nível de proficiência',travel:'Disponibilidade para viagens',offshore:'Disponibilidade offshore',relocation:'Disponibilidade para mudança de país',startAvailability:'Quando pode iniciar?',notes:'Observações sobre disponibilidade'},
    placeholders:{fullName:'Introduza o seu nome completo',targetRole:'Ex.: Soldador, Engenheiro de Planeamento, Inspetor...',summary:'Descreva o seu percurso profissional...',activities:'Descreva as atividades realizadas...',technicalSkills:'Ex.: TIG, MIG/MAG, AutoCAD, Primavera P6...',behavioralSkills:'Ex.: liderança, trabalho em equipa, comunicação...'},
    select:'Selecionar', addExperience:'+ Adicionar experiência', addEducation:'+ Adicionar formação', addCertification:'+ Adicionar certificação', addLanguage:'+ Adicionar idioma', remove:'Remover', saveDraft:'Guardar rascunho', submit:'Enviar registo',
    consent:'Autorizo o tratamento das minhas informações para análise de perfil e oportunidades profissionais, de acordo com a Política de Privacidade da STEP.', draftSaved:'Rascunho guardado neste dispositivo.', success:'Registo validado com sucesso.', previewSuccess:'Registo validado. A integração com o Supabase será ativada na implementação oficial.', error:'Não foi possível enviar o registo. Verifique os campos e tente novamente.',
    yes:'Sim', no:'Não', global:'Global / qualquer país', brazil:'Brasil', portugal:'Portugal', namibia:'Namíbia', proficiencies:['Básico','Intermédio','Avançado','Fluente','Nativo'], qualifications:commonQualifications['pt-PT']
  },
  en: {
    htmlLang:'en', languageLabel:'Language', badge:'STEP Careers', title:'Build your career profile with STEP',
    subtitle:'Complete your professional profile directly in the system to join STEP Oil & Gas global talent database.',
    intro:'The application is structured, requires no file uploads, and can be routed automatically to Brazil, Portugal, Namibia or global opportunities.', requiredHint:'Fields marked with * are required.',
    sections:{personal:'1. Personal information',objective:'2. Career objective',summary:'3. Professional summary',experience:'4. Professional experience',education:'5. Education',qualifications:'6. Qualifications & skills',certifications:'7. Certifications',languages:'8. Languages',availability:'9. Availability'},
    fields:{fullName:'Full name',email:'Email',phone:'Phone / WhatsApp',birthDate:'Date of birth',nationality:'Nationality',residenceCountry:'Country of residence',city:'City / Region',targetModule:'Preferred country / module',targetRole:'Target role',area:'Professional area',summary:'Career background, key experience and goals',company:'Company',role:'Role',start:'Start',end:'End',currentJob:'Current position',activities:'Main activities and responsibilities',course:'Course / Degree',institution:'Institution',educationLevel:'Education level',conclusion:'Completion year',mainQualifications:'Main qualifications',technicalSkills:'Technical skills',behavioralSkills:'Behavioral skills',certificate:'Certification name',issuer:'Issuing organization',certificateNumber:'Certificate number',validity:'Validity',language:'Language',proficiency:'Proficiency level',travel:'Available to travel',offshore:'Offshore availability',relocation:'Available to relocate internationally',startAvailability:'When can you start?',notes:'Availability notes'},
    placeholders:{fullName:'Enter your full name',targetRole:'E.g. Welder, Planning Engineer, Inspector...',summary:'Describe your professional background...',activities:'Describe your main responsibilities...',technicalSkills:'E.g. TIG, MIG/MAG, AutoCAD, Primavera P6...',behavioralSkills:'E.g. leadership, teamwork, communication...'},
    select:'Select',addExperience:'+ Add experience',addEducation:'+ Add education',addCertification:'+ Add certification',addLanguage:'+ Add language',remove:'Remove',saveDraft:'Save draft',submit:'Submit profile',consent:'I authorize STEP to process my information for professional profile analysis and career opportunities in accordance with the STEP Privacy Policy.',draftSaved:'Draft saved on this device.',success:'Profile validated successfully.',previewSuccess:'Profile validated. Supabase integration will be enabled in the official deployment.',error:'Unable to submit your profile. Check the fields and try again.',yes:'Yes',no:'No',global:'Global / any country',brazil:'Brazil',portugal:'Portugal',namibia:'Namibia',proficiencies:['Basic','Intermediate','Advanced','Fluent','Native'],qualifications:commonQualifications.en
  },
  es: {
    htmlLang:'es', languageLabel:'Idioma', badge:'STEP Careers', title:'Crea tu perfil profesional en STEP', subtitle:'Completa tu perfil directamente en el sistema para formar parte del banco global de talentos de STEP Oil & Gas.', intro:'El registro es estructurado, sin carga de documentos, y puede dirigirse automáticamente a Brasil, Portugal, Namibia u oportunidades globales.', requiredHint:'Los campos con * son obligatorios.',
    sections:{personal:'1. Datos personales',objective:'2. Objetivo profesional',summary:'3. Resumen profesional',experience:'4. Experiencia profesional',education:'5. Formación académica',qualifications:'6. Cualificaciones y competencias',certifications:'7. Certificaciones',languages:'8. Idiomas',availability:'9. Disponibilidad'},
    fields:{fullName:'Nombre completo',email:'Correo electrónico',phone:'Teléfono / WhatsApp',birthDate:'Fecha de nacimiento',nationality:'Nacionalidad',residenceCountry:'País de residencia',city:'Ciudad / Región',targetModule:'País / módulo de interés',targetRole:'Puesto de interés',area:'Área profesional',summary:'Trayectoria, experiencias principales y objetivos',company:'Empresa',role:'Puesto',start:'Inicio',end:'Fin',currentJob:'Puesto actual',activities:'Principales actividades y responsabilidades',course:'Curso / Formación',institution:'Institución',educationLevel:'Nivel académico',conclusion:'Año de finalización',mainQualifications:'Principales cualificaciones',technicalSkills:'Competencias técnicas',behavioralSkills:'Competencias conductuales',certificate:'Nombre de la certificación',issuer:'Entidad emisora',certificateNumber:'N.º de certificado',validity:'Validez',language:'Idioma',proficiency:'Nivel de competencia',travel:'Disponibilidad para viajar',offshore:'Disponibilidad offshore',relocation:'Disponibilidad para cambiar de país',startAvailability:'¿Cuándo puedes empezar?',notes:'Observaciones sobre disponibilidad'},
    placeholders:{fullName:'Escribe tu nombre completo',targetRole:'Ej.: Soldador, Ingeniero de Planificación, Inspector...',summary:'Describe tu trayectoria profesional...',activities:'Describe las actividades realizadas...',technicalSkills:'Ej.: TIG, MIG/MAG, AutoCAD, Primavera P6...',behavioralSkills:'Ej.: liderazgo, trabajo en equipo, comunicación...'},
    select:'Seleccionar',addExperience:'+ Añadir experiencia',addEducation:'+ Añadir formación',addCertification:'+ Añadir certificación',addLanguage:'+ Añadir idioma',remove:'Eliminar',saveDraft:'Guardar borrador',submit:'Enviar perfil',consent:'Autorizo el tratamiento de mis datos para análisis de perfil y oportunidades profesionales de acuerdo con la Política de Privacidad de STEP.',draftSaved:'Borrador guardado en este dispositivo.',success:'Perfil validado correctamente.',previewSuccess:'Perfil validado. La integración con Supabase se activará en la implantación oficial.',error:'No se pudo enviar el perfil. Revisa los campos e inténtalo de nuevo.',yes:'Sí',no:'No',global:'Global / cualquier país',brazil:'Brasil',portugal:'Portugal',namibia:'Namibia',proficiencies:['Básico','Intermedio','Avanzado','Fluido','Nativo'],qualifications:commonQualifications.es
  },
  fr: {
    htmlLang:'fr', languageLabel:'Langue', badge:'STEP Careers', title:'Créez votre profil professionnel chez STEP', subtitle:'Complétez votre profil directement dans le système afin d’intégrer la base mondiale de talents de STEP Oil & Gas.', intro:'La candidature est structurée, sans téléchargement de documents, et peut être orientée automatiquement vers le Brésil, le Portugal, la Namibie ou des opportunités mondiales.', requiredHint:'Les champs marqués * sont obligatoires.',
    sections:{personal:'1. Informations personnelles',objective:'2. Objectif professionnel',summary:'3. Résumé professionnel',experience:'4. Expérience professionnelle',education:'5. Formation',qualifications:'6. Qualifications et compétences',certifications:'7. Certifications',languages:'8. Langues',availability:'9. Disponibilité'},
    fields:{fullName:'Nom complet',email:'E-mail',phone:'Téléphone / WhatsApp',birthDate:'Date de naissance',nationality:'Nationalité',residenceCountry:'Pays de résidence',city:'Ville / Région',targetModule:'Pays / module souhaité',targetRole:'Poste recherché',area:'Domaine professionnel',summary:'Parcours, expériences clés et objectifs',company:'Entreprise',role:'Poste',start:'Début',end:'Fin',currentJob:'Poste actuel',activities:'Principales activités et responsabilités',course:'Diplôme / Formation',institution:'Établissement',educationLevel:'Niveau de formation',conclusion:'Année d’obtention',mainQualifications:'Qualifications principales',technicalSkills:'Compétences techniques',behavioralSkills:'Compétences comportementales',certificate:'Nom de la certification',issuer:'Organisme émetteur',certificateNumber:'N° du certificat',validity:'Validité',language:'Langue',proficiency:'Niveau de maîtrise',travel:'Disponible pour voyager',offshore:'Disponibilité offshore',relocation:'Disponible pour une mobilité internationale',startAvailability:'Quand pouvez-vous commencer ?',notes:'Remarques sur la disponibilité'},
    placeholders:{fullName:'Saisissez votre nom complet',targetRole:'Ex. : Soudeur, Ingénieur planning, Inspecteur...',summary:'Décrivez votre parcours professionnel...',activities:'Décrivez vos principales responsabilités...',technicalSkills:'Ex. : TIG, MIG/MAG, AutoCAD, Primavera P6...',behavioralSkills:'Ex. : leadership, travail en équipe, communication...'},
    select:'Sélectionner',addExperience:'+ Ajouter une expérience',addEducation:'+ Ajouter une formation',addCertification:'+ Ajouter une certification',addLanguage:'+ Ajouter une langue',remove:'Supprimer',saveDraft:'Enregistrer le brouillon',submit:'Envoyer le profil',consent:'J’autorise STEP à traiter mes informations pour l’analyse de mon profil et les opportunités professionnelles conformément à la Politique de confidentialité de STEP.',draftSaved:'Brouillon enregistré sur cet appareil.',success:'Profil validé avec succès.',previewSuccess:'Profil validé. L’intégration Supabase sera activée lors du déploiement officiel.',error:'Impossible d’envoyer le profil. Vérifiez les champs et réessayez.',yes:'Oui',no:'Non',global:'Global / tout pays',brazil:'Brésil',portugal:'Portugal',namibia:'Namibie',proficiencies:['Débutant','Intermédiaire','Avancé','Courant','Langue maternelle'],qualifications:commonQualifications.fr
  }
};

export function getTranslation(locale) {
  return translations[locale] || translations.en;
}
