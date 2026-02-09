
import { GoogleGenAI } from "@google/genai";
import { DrawnCard, SpreadType } from "../types";
import { SPREAD_CONFIGS } from "../constants";

export const getTarotInterpretation = async (spreadType: SpreadType, drawnCards: DrawnCard[], question?: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const spreadInfo = SPREAD_CONFIGS[spreadType];
  
  const cardsInfo = drawnCards.map((dc) => {
    return `POSIÇÃO: ${dc.position.name}
CARTA: ${dc.card.name} (${dc.isReversed ? 'Invertida' : 'Direta'})
SIGNIFICADO BASE: ${dc.isReversed ? dc.card.meaning_reversed : dc.card.meaning_upright}`;
  }).join('\n\n');

  const prompt = `
    Atue como a Maga das Escolhas, uma sábia e intuitiva leitora de Tarô. 
    Seu tom deve ser místico, acolhedor, empoderador e direto. 
    Você ajuda o consulente a entender as escolhas que ele tem diante de si.
    
    PERGUNTA DO CONSULTANTE: "${question || "Geral"}"

    MÉTODO UTILIZADO: ${spreadInfo.title}

    ARCANOS REVELADOS:
    ${cardsInfo}
    
    DIRETRIZES DE RESPOSTA:
    - Fale como a Maga das Escolhas.
    - Comece com uma saudação mística e breve.
    - Interprete cada carta na sua posição, conectando-as à pergunta central.
    - Se houver cartas invertidas, explique o bloqueio ou a necessidade de introspecção sem ser fatalista.
    - No Templo de Afrodite, foque nas dinâmicas de espelhamento entre o consulente e o parceiro.
    - Termine com um conselho prático e inspirador sobre as ESCOLHAS do consulente.

    REGRAS DE FORMATAÇÃO:
    - NÃO use nenhum símbolo de Markdown (NÃO use #, *, _, -, >).
    - NÃO use negrito ou itálico.
    - Use apenas quebras de linha simples entre parágrafos.
    - Use LETRAS MAIÚSCULAS para títulos de seções se necessário.
    - O texto deve parecer uma carta escrita à mão pela Maga.

    Responda em Português do Brasil.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.85,
        topK: 40,
        topP: 0.9,
      }
    });

    return response.text || "As visões estão borradas no momento. Respire e tente novamente mais tarde.";
  } catch (error) {
    console.error("Erro na leitura da Maga:", error);
    return "Houve um eclipse na comunicação com o oráculo. Por favor, tente novamente em alguns instantes.";
  }
};