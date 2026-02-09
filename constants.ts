
import { TarotCard, Arcana, SpreadType, SpreadConfig } from './types';

export const SPREAD_CONFIGS: Record<SpreadType, SpreadConfig> = {
  [SpreadType.SINGLE]: {
    id: SpreadType.SINGLE,
    title: "Carta Única",
    description: "Ideal para uma pergunta rápida ou energia do dia.",
    positions: [
      { name: "O Oráculo", description: "A energia central da questão." }
    ]
  },
  [SpreadType.THREE_CARDS]: {
    id: SpreadType.THREE_CARDS,
    title: "Passado, Presente e Futuro",
    description: "Visão linear clássica para entender a jornada do consulente.",
    positions: [
      { name: "Passado", description: "Raízes e influências anteriores." },
      { name: "Presente", description: "O momento atual e o desafio agora." },
      { name: "Futuro", description: "O resultado provável se nada mudar." }
    ]
  },
  [SpreadType.APHRODITE]: {
    id: SpreadType.APHRODITE,
    title: "Templo de Afrodite",
    description: "Análise profunda de relacionamentos comparando as energias de ambos.",
    positions: [
      { name: "Mental do Consulente", description: "O que o consulente pensa sobre a relação." },
      { name: "Mental do Parceiro", description: "O que o parceiro pensa sobre a relação." },
      { name: "Emocional do Consulente", description: "O que está no coração do consulente." },
      { name: "Emocional do Parceiro", description: "O que está no coração do parceiro." },
      { name: "Físico/Ação do Consulente", description: "As intenções e desejos práticos do consulente." },
      { name: "Físico/Ação do Parceiro", description: "As intenções e desejos práticos do parceiro." },
      { name: "O Resultado", description: "O futuro da relação ou síntese do encontro." }
    ]
  }
};

export const DECK: TarotCard[] = [
  { id: 0, name: "O Louco", arcana: Arcana.MAJOR, number: "0", meaning_upright: "Inícios, inocência, espontaneidade", meaning_reversed: "Imprudência, negligência", description: "O início da jornada.", image_url: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg" },
  { id: 1, name: "O Mago", arcana: Arcana.MAJOR, number: "I", meaning_upright: "Manifestação, poder, habilidade", meaning_reversed: "Manipulação, má vontade", description: "O poder da criação.", image_url: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg" },
  { id: 2, name: "A Sacerdotisa", arcana: Arcana.MAJOR, number: "II", meaning_upright: "Intuição, mistério, subconsciente", meaning_reversed: "Segredos, desconexão", description: "A sabedoria oculta.", image_url: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg" },
  { id: 3, name: "A Imperatriz", arcana: Arcana.MAJOR, number: "III", meaning_upright: "Abundância, natureza, fertilidade", meaning_reversed: "Bloqueio, dependência", description: "A mãe e a criação.", image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg" },
  { id: 4, name: "O Imperador", arcana: Arcana.MAJOR, number: "IV", meaning_upright: "Autoridade, estrutura, estabilidade", meaning_reversed: "Tirania, rigidez", description: "O poder do mundo material.", image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg" },
  { id: 5, name: "O Hierofante", arcana: Arcana.MAJOR, number: "V", meaning_upright: "Tradição, conformidade, mestre", meaning_reversed: "Rebelião, novos métodos", description: "O ensinamento espiritual.", image_url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg" },
  { id: 6, name: "Os Enamorados", arcana: Arcana.MAJOR, number: "VI", meaning_upright: "Escolhas, amor, harmonia", meaning_reversed: "Desequilíbrio, indecisão", description: "Decisões do coração.", image_url: "https://content-media.astrologialuzesombra.com.br/wp-content/uploads/2025/08/enamorados-tarot-arcano-6-rsw.png" },
  { id: 7, name: "O Carro", arcana: Arcana.MAJOR, number: "VII", meaning_upright: "Vitória, determinação, foco", meaning_reversed: "Falta de controle, agressividade", description: "O avanço pela vontade.", image_url: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg" },
  { id: 8, name: "A Força", arcana: Arcana.MAJOR, number: "VIII", meaning_upright: "Coragem, compaixão, controle", meaning_reversed: "Fraqueza, medo", description: "Domínio interior.", image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg" },
  { id: 9, name: "O Eremita", arcana: Arcana.MAJOR, number: "IX", meaning_upright: "Introspecção, busca, solidão", meaning_reversed: "Isolamento, imprudência", description: "A luz interior.", image_url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg" },
  { id: 10, name: "A Roda da Fortuna", arcana: Arcana.MAJOR, number: "X", meaning_upright: "Mudança, destino, ciclos", meaning_reversed: "Má sorte, resistência", description: "O ciclo da vida.", image_url: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg" },
  { id: 11, name: "A Justiça", arcana: Arcana.MAJOR, number: "XI", meaning_upright: "Verdade, equilíbrio, lei", meaning_reversed: "Injustiça, desonestidade", description: "O equilíbrio das causas.", image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg" },
  { id: 12, name: "O Pendurado", arcana: Arcana.MAJOR, number: "XII", meaning_upright: "Sacrifício, nova perspectiva", meaning_reversed: "Estagnação, resistência", description: "Ver de outro modo.", image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg" },
  { id: 13, name: "A Morte", arcana: Arcana.MAJOR, number: "XIII", meaning_upright: "Transformação, fim, transição", meaning_reversed: "Resistência ao fim, medo", description: "O fim necessário.", image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg" },
  { id: 14, name: "A Temperança", arcana: Arcana.MAJOR, number: "XIV", meaning_upright: "Paciência, moderação, alquimia", meaning_reversed: "Excesso, desequilíbrio", description: "A cura e o equilíbrio.", image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg" },
  { id: 15, name: "O Diabo", arcana: Arcana.MAJOR, number: "XV", meaning_upright: "Apego, vício, materialismo", meaning_reversed: "Libertação, desapego", description: "As correntes autoimpostas.", image_url: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg" },
  { id: 16, name: "A Torre", arcana: Arcana.MAJOR, number: "XVI", meaning_upright: "Ruína súbita, revelação, choque", meaning_reversed: "Evitar o desastre, medo", description: "A queda do falso.", image_url: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg" },
  { id: 17, name: "A Estrela", arcana: Arcana.MAJOR, number: "XVII", meaning_upright: "Esperança, inspiração, fe", meaning_reversed: "Desespero, pessimismo", description: "A luz guia.", image_url: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg" },
  { id: 18, name: "A Lua", arcana: Arcana.MAJOR, number: "XVIII", meaning_upright: "Ilusão, medo, intuição", meaning_reversed: "Clareza, superação", description: "Navegar na escuridão.", image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg" },
  { id: 19, name: "O Sol", arcana: Arcana.MAJOR, number: "XIX", meaning_upright: "Clareza, alegria, sucesso", meaning_reversed: "Infelicidade temporária", description: "A luz plena.", image_url: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg" },
  { id: 20, name: "O Julgamento", arcana: Arcana.MAJOR, number: "XX", meaning_upright: "Renascimento, chamado, perdão", meaning_reversed: "Dúvida, mágoa", description: "O novo despertar.", image_url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg" },
  { id: 21, name: "O Mundo", arcana: Arcana.MAJOR, number: "XXI", meaning_upright: "Conclusão, perfeição, viagem", meaning_reversed: "Atraso, incompletude", description: "A realização final.", image_url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg" }
];
