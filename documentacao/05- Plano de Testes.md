# Plano de Testes de Software

# Plano de Testes

| Caso de Teste             | CT-01 - Cadastro de Alimentos na Geladeira                                                      |
| :------------------------ | :---------------------------------------------------------------------------------------------- |
| **Requisitos Associados** | RF-01                                                                                           |
| **Objetivo do Teste**     | Verificar se o usuário consegue cadastrar alimentos disponíveis na geladeira e lista de compras |
| **Passos**                | Login → Perfil → Geladeira → Cadastrar/selecionar itens                                         |
| **Critérios de êxito**    | Os alimentos são cadastrados e salvos corretamente na geladeira e/ou lista de compras           |
| **Responsável**           | Clara Freitas de Oliveira                                                                       |

| Caso de Teste             | CT-02 - Sugestão de Receitas                                                 |
| :------------------------ | :--------------------------------------------------------------------------- |
| **Requisitos Associados** | RF-02, RNF-02                                                                |
| **Objetivo do Teste**     | Verificar se o sistema sugere receitas com base nos ingredientes cadastrados |
| **Passos**                | *preencher*                                                                  |
| **Critérios de êxito**    | *preencher*                                                                  |
| **Responsável**           | *preencher*                                                                  |

| Caso de Teste             | CT-03 - Cadastro de Restrições Alimentares                                                   |
| :------------------------ | :------------------------------------------------------------------------------------------- |
| **Requisitos Associados** | RF-03, RNF-03                                                                                |
| **Objetivo do Teste**     | Verificar se o usuário consegue cadastrar alergias, intolerâncias e preferências alimentares |
| **Passos**                | Login → Perfil → Restrições Alimentares → Cadastrar/selecionar restrições                    |
| **Critérios de êxito**    | As restrições alimentares são cadastradas e armazenadas corretamente                         |
| **Responsável**           | Clara Freitas de Oliveira                                                                    |

| Caso de Teste             | CT-04 - Filtro de Receitas por Restrições                                                  |
| :------------------------ | :----------------------------------------------------------------------------------------- |
| **Requisitos Associados** | RF-04, RF-03                                                                               |
| **Objetivo do Teste**     | Verificar se as receitas são filtradas corretamente de acordo com as restrições do usuário |
| **Passos**                | *preencher*                                                                                |
| **Critérios de êxito**    | *preencher*                                                                                |
| **Responsável**           | *preencher*                                                                                |

| Caso de Teste             | CT-05 - Exibição de Detalhes da Receita                                       |
| :------------------------ | :---------------------------------------------------------------------------- |
| **Requisitos Associados** | RF-05, RNF-01                                                                 |
| **Objetivo do Teste**     | Verificar se as informações detalhadas das receitas são exibidas corretamente |
| **Passos**                | *preencher*                                                                   |
| **Critérios de êxito**    | *preencher*                                                                   |
| **Responsável**           | *preencher*                                                                   |

| Caso de Teste             | CT-06 - Atualização Automática de Ingredientes                                  |
| :------------------------ | :------------------------------------------------------------------------------ |
| **Requisitos Associados** | RF-06                                                                           |
| **Objetivo do Teste**     | Verificar se a lista de ingredientes é atualizada após o preparo de uma receita |
| **Passos**                | *preencher*                                                                     |
| **Critérios de êxito**    | *preencher*                                                                     |
| **Responsável**           | *preencher*                                                                     |

| Caso de Teste             | CT-07 - Alerta de Vencimento de Alimentos                               |
| :------------------------ | :---------------------------------------------------------------------- |
| **Requisitos Associados** | RF-07                                                                   |
| **Objetivo do Teste**     | Verificar se o sistema destaca alimentos próximos da data de vencimento |
| **Passos**                | *preencher*                                                             |
| **Critérios de êxito**    | *preencher*                                                             |
| **Responsável**           | *preencher*                                                             |

| Caso de Teste             | CT-08 - Busca Manual de Receitas                                      |
| :------------------------ | :-------------------------------------------------------------------- |
| **Requisitos Associados** | RF-08, RNF-02                                                         |
| **Objetivo do Teste**     | Verificar se o usuário consegue buscar receitas por nome ou categoria |
| **Passos**                | *preencher*                                                           |
| **Critérios de êxito**    | *preencher*                                                           |
| **Responsável**           | *preencher*                                                           |

| Caso de Teste             | CT-09 - Salvar Receitas Favoritas                                   |
| :------------------------ | :------------------------------------------------------------------ |
| **Requisitos Associados** | RF-09                                                               |
| **Objetivo do Teste**     | Verificar se o usuário consegue salvar e acessar receitas favoritas |
| **Passos**                | *preencher*                                                         |
| **Critérios de êxito**    | *preencher*                                                         |
| **Responsável**           | *preencher*                                                         |

| Caso de Teste             | CT-10 - Recomendações Personalizadas                                                      |
| :------------------------ | :---------------------------------------------------------------------------------------- |
| **Requisitos Associados** | RF-10, RNF-07                                                                             |
| **Objetivo do Teste**     | Verificar se o sistema gera recomendações com base no histórico e preferências do usuário |
| **Passos**                | *preencher*                                                                               |
| **Critérios de êxito**    | *preencher*                                                                               |
| **Responsável**           | *preencher*                                                                               |

| Caso de Teste             | CT-11 - Usabilidade da Interface                                                         |
| :------------------------ | :--------------------------------------------------------------------------------------- |
| **Requisitos Associados** | RNF-01, RNF-05, RNF-09                                                                   |
| **Objetivo do Teste**     | Verificar se a interface é intuitiva, responsiva e acessível                             |
| **Passos**                | Navegar pelas telas principais do aplicativo e executar as funcionalidades disponíveis   |
| **Critérios de êxito**    | O usuário consegue navegar e utilizar as funcionalidades sem dificuldades significativas |
| **Responsável**           | Clara Freitas de Oliveira                                                                |

| Caso de Teste             | CT-12 - Segurança dos Dados                                                                                       |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------- |
| **Requisitos Associados** | RNF-03                                                                                                            |
| **Objetivo do Teste**     | Verificar se os dados de preferências e restrições são armazenados com segurança                                  |
| **Passos**                | Realizar login, cadastrar dados pessoais e verificar se o acesso às informações é restrito ao usuário autenticado |
| **Critérios de êxito**    | Os dados são armazenados de forma segura e não podem ser acessados por usuários não autorizados                   |
| **Responsável**           | Clara Freitas de Oliveira                                                                                         |

| Caso de Teste             | CT-13 - Sincronização entre Dispositivos                                                         |
| :------------------------ | :----------------------------------------------------------------------------------------------- |
| **Requisitos Associados** | RNF-08                                                                                           |
| **Objetivo do Teste**     | Verificar se os dados sincronizam corretamente entre dispositivos da mesma conta                 |
| **Passos**                | Realizar login em dois dispositivos utilizando a mesma conta e verificar a atualização dos dados |
| **Critérios de êxito**    | As alterações realizadas em um dispositivo são refletidas corretamente no outro                  |
| **Responsável**           | Clara Freitas de Oliveira                                                                        |

| Caso de Teste             | CT-14 - Desempenho com Internet Lenta                                                 |
| :------------------------ | :------------------------------------------------------------------------------------ |
| **Requisitos Associados** | RNF-10, RNF-06                                                                        |
| **Objetivo do Teste**     | Verificar se o app funciona adequadamente com conexão de internet de baixa velocidade |
| **Passos**                | *preencher*                                                                           |
| **Critérios de êxito**    | *preencher*                                                                           |
| **Responsável**           | *preencher*                                                                           |
