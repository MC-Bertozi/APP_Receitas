# Especificação do Projeto
-->Peguei do de Tai, tem que dar uma boa modificada

## Perfis de Usuários

<table> 
<tbody> 
<tr align="center"> 
<th colspan="2">Mariana Oliveira Silva</th> 
</tr> 
<tr>
<td width="150px"><b>Descrição</b></td> 
<td width="600px">Profissional de 32 anos que trabalha em período integral e possui uma rotina agitada. Tem pouco tempo para planejar refeições e fazer compras frequentes, buscando praticidade na organização da alimentação diária.</td> 
</tr> 
<tr> 
<td><b>Necessidades</b></td>
<td>Encontrar rapidamente receitas compatíveis com os ingredientes disponíveis em casa, otimizar o tempo de preparo das refeições e evitar o desperdício de alimentos por falta de planejamento.</td> 
</tr>
</tbody> 
</table>

<br> 
<table> 
<tbody> 
<tr align="center"> 
<th colspan="2">Carlos Henrique Pereira</th> 
</tr> 
<tr> 
<td width="150px"><b>Descrição</b></td> 
<td width="600px">Homem de 45 anos com intolerância à lactose e alergia a frutos do mar. Precisa ter cuidado na escolha dos alimentos e busca opções seguras para manter uma alimentação saudável.</td> 
</tr> 
<tr> 
<td><b>Necessidades</b></td> <td>Receber sugestões de receitas adequadas às suas restrições alimentares, identificar ingredientes incompatíveis com sua dieta e aproveitar os alimentos disponíveis na despensa de forma segura e prática.</td> 
</tr> 
</tbody>
</table>

## Histórias de Usuários

| EU COMO... `QUEM`                               | QUERO/PRECISO ... `O QUE`                                                | PARA ... `PORQUE`                                                         |
| ----------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Usuário com rotina agitada                      | Receber sugestões de receitas com base nos alimentos disponíveis em casa | Planejar minhas refeições de forma rápida e economizar tempo no dia a dia |
| Usuário com restrições alimentares              | Configurar minhas restrições e preferências alimentares                  | Receber recomendações seguras e adequadas à minha dieta                   |
| Usuário do aplicativo                           | Cadastrar os ingredientes presentes na geladeira e despensa              | Aproveitar melhor os alimentos e evitar desperdícios                      |
| Usuário do aplicativo                           | Visualizar receitas simples e práticas                                   | Facilitar o preparo das refeições diárias                                 |
| Usuário preocupado com desperdício de alimentos | Utilizar ingredientes próximos do vencimento em receitas sugeridas       | Reduzir perdas e economizar recursos                                      |
| Usuário que busca uma alimentação equilibrada   | Receber recomendações personalizadas de refeições                        | Manter hábitos alimentares mais saudáveis e organizados                   |


## Requisitos do Projeto

### Requisitos Funcionais

| ID    | Descrição                                                                                   | Prioridade |
| ----- | ------------------------------------------------------------------------------------------- | ---------- |
| RF-01 | Permitir o cadastro dos alimentos disponíveis na geladeira e despensa                       | Alta       |
| RF-02 | Sugerir receitas com base nos ingredientes cadastrados pelo usuário                         | Alta       |
| RF-03 | Permitir o cadastro de restrições e preferências alimentares                                | Alta       |
| RF-04 | Filtrar receitas de acordo com alergias, intolerâncias e dietas específicas                 | Alta       |
| RF-05 | Exibir informações detalhadas das receitas (ingredientes, modo de preparo e tempo estimado) | Média      |
| RF-06 | Atualizar automaticamente a lista de ingredientes utilizados após o preparo de uma receita  | Média      |
| RF-07 | Destacar alimentos próximos da data de vencimento                                           | Média      |
| RF-08 | Permitir a busca manual de receitas por nome ou categoria                                   | Baixa      |
| RF-09 | Salvar receitas favoritas para acesso rápido                                                | Média      |
| RF-10 | Gerar recomendações personalizadas com base no histórico e preferências do usuário          | Alta       |

**Prioridade: Alta / Média / Baixa.**

### Requisitos Não Funcionais

| ID     | Descrição                                                                                                                 | Prioridade |
| ------ | ------------------------------------------------------------------------------------------------------------------------- | ---------- |
| RNF-01 | A interface deve ser intuitiva e fácil de usar para usuários de diferentes faixas etárias                                 | Alta       |
| RNF-02 | O sistema deve apresentar tempo de resposta inferior a 3 segundos para exibição das recomendações                         | Alta       |
| RNF-03 | Os dados de preferências e restrições alimentares devem ser armazenados de forma segura                                   | Alta       |
| RNF-04 | O sistema deve ser compatível com dispositivos móveis e navegadores web modernos                                          | Alta       |
| RNF-05 | O aplicativo deve possuir design responsivo para diferentes tamanhos de tela                                              | Média      |
| RNF-06 | O sistema deve garantir disponibilidade e estabilidade durante o uso                                                      | Média      |
| RNF-07 | As recomendações devem ser personalizadas de acordo com o perfil do usuário                                               | Média      |
| RNF-08 | O sistema deve permitir sincronização dos dados entre dispositivos conectados à mesma conta                               | Baixa      |
| RNF-09 | A aplicação deve seguir padrões de acessibilidade, com fontes legíveis e boa visualização dos conteúdos                   | Média      |
| RNF-10 | O sistema deve ser capaz de operar com conexão de internet de baixa velocidade sem comprometer funcionalidades essenciais | Baixa      |

**Prioridade: Alta / Média / Baixa.**


