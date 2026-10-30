# 🐱 MIAUMÁTICA — versão 4 (2º e 3º anos)

Jogo infantil de matemática, feito com **HTML5, CSS3 e JavaScript puro**. Funciona no navegador sem frameworks, contas de usuário, serviços pagos ou banco de dados. A interface prioriza celulares e tablets.

## Como executar

1. Extraia o ZIP em uma pasta.
2. Abra **`index.html`** no navegador.
3. Na primeira abertura, informe o nome da criança e do gatinho.
4. Entre em **JOGAR**, escolha uma operação e comece pelo nível 1.
5. Resolva as contas com o teclado grande na tela.

Para disponibilizar por link no celular/tablet, publique os três arquivos (`index.html`, `style.css`, `script.js`) em um site estático, como GitHub Pages ou Cloudflare Pages. Em alguns navegadores, abrir diretamente via `file://` pode afetar a persistência do `localStorage`.

## Objetivo pedagógico: 2º–3º ano

Cada operação tem **12 níveis**, com **10 questões por sequência**. Para liberar o próximo nível daquela operação, é preciso acertar **9 ou 10 questões na primeira tentativa**. Após errar, é possível tentar de novo e receber dicas sem perder moedas. Os níveis iniciais possuem apoio por quantidades, grupos e casas de valor posicional alinhadas.

Os níveis marcados com **🧩 Tutorial visual** são: adição e subtração do 1 ao 6; multiplicação e divisão do 1 ao 3. Nos níveis 1 e 2 de adição/subtração aparecem quantidades em bolinhas; do 3 ao 6 aparecem unidades e dezenas alinhadas. Multiplicação e divisão mostram grupos de objetos nos três primeiros níveis. Todos os níveis continuam oferecendo dica após o primeiro erro e resolução após o segundo.

| Nível | Adição | Subtração | Multiplicação | Divisão |
|---|---|---|---|---|
| 1 | Total até 10: `3 + 4` | Tirar até 10: `8 − 3` | Dobro, tabuada do 2: `2 × 4` | Metade, dividir por 2: `8 ÷ 2` |
| 2 | Total até 20: `8 + 7` | Até 20 sem empréstimo: `17 − 4` | Tabuada do 3: `3 × 4` | Dividir por 3: `12 ÷ 3` |
| 3 | Dezenas + unidades sem vai um: `24 + 3` | Dezenas − unidades sem empréstimo: `26 − 3` | Tabuada do 4: `4 × 6` | Dividir por 4: `20 ÷ 4` |
| 4 | Dezenas + unidades com vai um: `28 + 5` | Primeiro empréstimo: `32 − 5` | Tabuada do 5: `5 × 7` | Dividir por 5: `25 ÷ 5` |
| 5 | Duas dezenas sem vai um: `23 + 45` | Duas dezenas sem empréstimo: `78 − 34` | Tabuada do 10: `10 × 6` | Dividir por 10: `40 ÷ 10` |
| 6 | Duas dezenas com vai um: `27 + 35` | Duas dezenas com empréstimo: `63 − 27` | Tabuadas do 6 e 7: `6 × 4` | Dividir por 6 e 7: `42 ÷ 7` |
| 7 | Centenas + dezenas sem vai um: `123 + 24` | Centenas − dezenas sem empréstimo: `354 − 22` | Tabuadas do 8 e 9: `8 × 7` | Dividir por 8 e 9: `72 ÷ 8` |
| 8 | Centenas com vai um: `248 + 325` | Centenas com empréstimo: `453 − 127` | Tabuadas de 2 a 10 misturadas: `7 × 9` | Divisões exatas por 2 a 10: `63 ÷ 9` |
| 9 | Milhares sem vai um | Empréstimo através do zero | Dezenas × unidades | Dividir dezenas/centenas por 10 |
| 10 | Milhares com vai um | Milhares sem empréstimo | Dois algarismos × uma unidade | Dividendos maiores |
| 11 | Números redondos | Milhares com empréstimo | Centenas redondas × unidade | Dezenas ÷ dezenas |
| 12 | Problema de adição | Problema de subtração | Problema de multiplicação | Problema de divisão |

**Observações:** o jogo trabalha apenas com números naturais, nunca produz subtrações negativas nem divisões não exatas. A organização dos níveis é uma **adaptação pedagógica para a faixa etária**, não equivale a uma sequência oficial prescrita pela BNCC. A BNCC orienta habilidades como EF02MA05, EF02MA06, EF02MA07, EF02MA08, EF03MA03, EF03MA07 e EF03MA08. O estágio do gatinho é separado do nível curricular e depende de XP e cuidado.

O **treino diário** possui 20 exercícios, selecionando mais vezes operações em que o aluno erra e ocasionalmente revisando um nível anterior.

## Mapa, chefes e formatos de exercício

- As quatro operações são regiões de uma aventura: Floresta da Adição, Vila da Subtração, Montanha da Multiplicação e Castelo da Divisão.
- Os níveis 4, 8 e 12 são desafios-chefe. Eles misturam habilidades do capítulo e dão bônus especial na primeira vitória.
- Fora dos tutoriais visuais, as perguntas alternam resposta digitada, múltipla escolha e o desafio “o gato respondeu certo?”.
- O botão **🔊 Ouvir** usa a voz disponível no navegador para ler a pergunta em português.
- Três missões diárias recompensam prática, acertos de primeira e variedade de operações.

## Revisão e proteção contra repetição

- Contas erradas entram no Caderno de revisão e podem reaparecer no treino diário a partir do dia seguinte.
- Uma conta de revisão só sai do caderno quando é acertada de primeira.
- No máximo 30 respostas por dia rendem XP/comida. Em um nível já concluído, somente as primeiras 10 revisões do dia rendem recursos.
- Depois do limite, a criança pode continuar praticando normalmente, mas recebe uma mensagem explicando que as recompensas do dia já foram entregues.
- Bônus de nível, missões, metas diárias e sequências continuam sendo concedidos apenas uma vez nas condições previstas.

## Vínculo, alimentação e evolução

- A criança e o gatinho recebem nomes na primeira abertura; ambos podem ser alterados depois em **Progresso**.
- O gato usa o nome da criança em falas de incentivo, tentativa e comemoração.
- Depois de três erros consecutivos, o gato fica triste/preocupado e oferece ajuda. Ele também sente saudade quando uma sequência é abandonada. Carinho, alimentação e acertos isolados não removem esse estado: o gato só volta a ficar feliz depois de uma sequência perfeita, com todas as questões corretas de primeira. É permitido trocar para outro nível ainda não concluído e tentar a sequência perfeita nele. Essa emoção nunca remove recompensas ou progresso.
- Os nomes Vitória, Vitoria, Victoria, Victória e apelidos próximos ativam o apelido especial **Caçambita** nas falas e saudações. O nome real continua salvo e editável em Progresso.
- A evolução agora exige **XP de aprendizagem e corações de cuidado**.
- A cada 5 exercícios resolvidos, a criança recebe comida. Concluir um nível rende mais 2 comidas.
- O gato pode ser alimentado duas vezes por dia. Cada alimentação cria um coração.
- A forma do gato muda visualmente durante o dia: esguio antes do lanche, satisfeito após um e com a barriguinha redonda após dois. No dia seguinte a forma reinicia, sem remover progresso ou deixar o gato triste.
- Ficar sem jogar nunca remove corações, XP, itens ou estágios.
- As metas de cuidado para os cinco estágios são 0, 2, 6, 12 e 20 corações.

## Loja: itens desbloqueados pela matemática

A exigência abaixo é o **nível concluído com 9/10 acertos de primeira, em pelo menos uma das quatro operações**. Ter o próximo nível disponível não equivale a já tê-lo concluído. Além do desbloqueio, a compra exige MiauCoins suficientes. **A prévia é permitida mesmo em itens bloqueados.**

| Cor | Preço | Exigência |
|---|---:|---|
| Branco | grátis | Liberado desde o início |
| Preto | 100 | Liberado desde o início |
| Laranja | 150 | Concluir nível 2 |
| Cinza | 150 | Concluir nível 3 |
| Rosa | 200 | Concluir nível 4 |
| Azul | 200 | Concluir nível 5 |
| Roxo | 250 | Concluir nível 6 |
| Dourado | 1.000 | Concluir nível 8 |
| Marrom, Menta e Creme | 140–210 | Concluir níveis 2–4 |
| Galáxia | 1.400 | Concluir nível 12 |
| Chocolate, Caramelo, Água-marinha, Verde, Coral, Azul noturno e Lavanda | 220–420 | Concluir níveis 4–10 |
| Arco-íris | 1.600 | Concluir nível 12 |

| Acessório | Preço | Exigência |
|---|---:|---|
| Gravata borboleta | 100 | Liberada desde o início |
| Óculos | 200 | Concluir nível 3 |
| Chapéu | 250 | Concluir nível 4 |
| Coroa | 500 | Concluir nível 6 |
| Asas | 750 | Concluir nível 8 |
| Cachecol, Flor, Fones e Capa | 130–450 | Concluir níveis 1–7 |
| Estrela mágica | 650 | Concluir nível 10 |
| Coleira, Sininho, Bandana, Chapéu de festa, Botinhas, Mochila, Óculos de coração e Pingente | 90–500 | Concluir níveis 0–8 |
| Chapéu de mago | 700 | Concluir nível 10 |

A aba **Cuidados** vende peixinhos e pacotes de comida por MiauCoins. Comida também é obtida gratuitamente ao estudar.

**Móveis estão temporariamente desativados na primeira publicação.** A implementação permanece preservada no código para ser retomada quando o editor de cenários, o posicionamento responsivo e as interações visuais estiverem prontos.

Ao superar um nível que desbloqueia novos itens, a tela de conclusão avisa quais itens ficaram disponíveis na loja. **Itens já comprados em versões anteriores continuam seus**, mesmo que a exigência nova seja maior do que o nível registrado.

## Moedas, progresso e gato

- Acertar de primeira: +5 MiauCoins, sujeito a limites diários para evitar exploração.
- Sequência de 5 acertos: +10 moedas; de 10: +20 moedas (cada marco, no máximo uma vez por dia).
- Primeira conclusão de nível: +30 moedas.
- Metas diárias: 5 exercícios (+10), 10 exercícios (+20) e 20 exercícios (+50 moedas e 2 comidas).
- XP do gato: estágios Filhote (0), Curioso (150), Aventureiro (400), Inteligente (800) e Mestre (1.400). Para evoluir, a meta correspondente de cuidado também precisa estar completa.
- Todas as estatísticas, personalizações, moedas e conquistas ficam armazenadas localmente, na chave `miaumatica.v1` do `localStorage`.

## Atualizar versões anteriores para a versão 4

1. No jogo antigo, acesse **Progresso → Exportar progresso** para fazer um backup JSON.
2. Substitua **`index.html`**, **`style.css`** e **`script.js`** pelos arquivos desta versão, preferencialmente mantendo a mesma pasta/endereço.
3. Abra `index.html`. Seu progresso anterior deverá ser recuperado automaticamente quando o mesmo armazenamento estiver disponível. Se necessário, use **Progresso → Importar progresso**.
4. Salvamentos antigos são migrados automaticamente. O estágio já alcançado pelo gato é preservado com os corações equivalentes.
5. Para começar a nova trilha desde o nível 1, **exporte o backup e depois use Reiniciar jogo**. Isso apaga as moedas, compras e conquistas locais: faça apenas se desejar um recomeço completo.

Uma sequência de exercícios antiga já iniciada permanece recuperável; novas sequências usam a trilha de 12 níveis. Compras existentes não são removidas nem cobradas novamente.

## Validações desta versão

- Sintaxe do JavaScript validada.
- `node tests.js` valida automaticamente 24.000 exercícios nos 48 níveis: contas corretas, respostas naturais, subtrações não negativas e divisões exatas.
- O teste também cobre a primeira abertura, os nomes, a alimentação e a migração de um salvamento antigo sem perder o estágio do gato.
- A versão 2 já havia corrigido a caixa de confirmação de saída e os olhos do gatinho durante o sono; as correções foram mantidas.

**Privacidade:** não há servidor nem sincronização de contas. O backup JSON é necessário para transferir o progresso entre dispositivos/navegadores.
