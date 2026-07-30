# Chic! — Protótipo MVP

Este é o protótipo funcional MVP para a plataforma **Chic!**, uma aplicação web elegante, dinâmica e responsiva voltada para a compra, venda e doação de roupas de forma sustentável (moda circular).

O projeto foi construído usando **tecnologias puras da web (HTML5, Vanilla CSS, Vanilla JavaScript)** para garantir desempenho ultra-rápido, autonomia offline completa e facilidade de execução instantânea, sem a necessidade de compilações complexas.

---

## 📁 Estrutura do Projeto

```text
chic-mvp/
├── index.html        # Estrutura do Single Page Application (SPA), SVGs e Modais
├── style.css         # Variáveis de temas (Dark/Light), design system, glassmorphism e animações
├── app.js            # Lógica do SPA, mock database persistente, rotas e simulador de chat
└── README.md         # Instruções de execução e detalhes do projeto (Este arquivo)
```

---

## 🌟 Funcionalidades do MVP

1. **SPA (Single Page Application):** Navegação instantânea e fluida entre abas (Início, Explorar, Publicar, Favoritos, Mensagens e Minha Loja) sem recarregamento de página.
2. **Design Premium Responsivo:** Experiência otimizada para desktops e celulares, com efeitos de glassmorphism modernos, tema escuro padrão e alternador para tema claro.
3. **Persistência de Dados (Local Storage):** Todas as ações realizadas (criação de conta, login, publicações de desapegos, favoritar peças, conversas de chat) são salvas diretamente no navegador, persistindo mesmo ao atualizar a página.
4. **Gerador Dinâmico de Roupas (Vetorial):** Caso você publique um anúncio sem foto, o aplicativo gera automaticamente uma bela ilustração de moda vetorial correspondente à categoria e combinando com o tema de cores do seu brechó.
5. **Simulador de Chat:** Fale com vendedores. Ao clicar em "Contatar Vendedor" em qualquer peça, uma caixa de mensagens se abre. Ao enviar uma mensagem, o sistema simula respostas automáticas dos vendedores após 1.5s.
6. **Minha Loja Customizável:** Painel onde você pode alterar o nome da sua marca, a biografia e a cor do banner de cabeçalho, além de visualizar estatísticas de impacto ambiental (ex: economia de emissão de CO₂).

---

## 🚀 Como Executar o Projeto

Para abrir o aplicativo localmente no seu navegador, siga as etapas abaixo:

### Método 1: Execução Direta (Sem Servidor)
Dê um duplo clique no arquivo `index.html` ou arraste-o diretamente para a aba do seu navegador de preferência (Chrome, Edge, Firefox, Safari).

### Método 2: Usando Servidor Local (Recomendado para melhor suporte a caminhos e assets)
Caso tenha o **Node.js** ou **Python** instalado em sua máquina:

*   **Com Node.js (npx):**
    Abra o terminal no diretório do projeto e execute:
    ```bash
    npx -y http-server
    ```
    Ou abra usando o Live Server caso use a extensão no VS Code.

*   **Com Python:**
    Abra o terminal no diretório do projeto e execute:
    ```bash
    python -m http.server 3000
    ```
    Em seguida, acesse `http://localhost:3000` no seu navegador.

---

## 🧪 Roteiro de Testes (Demonstração do MVP)

Siga este passo-a-passo simples para validar todas as capacidades da plataforma:

1.  **Explorar o catálogo:** Vá para a aba **Explorar** e experimente filtrar por categoria (ex: Vestidos), tamanho (ex: M) ou mude o tipo de oferta para *Doações* ou ajuste a barra de preço.
2.  **Favoritar peças:** Clique no ícone de coração em qualquer card. Navegue até a aba **Favoritos** e verifique se a peça foi salva lá. Experimente desfavoritar.
3.  **Contatar vendedor:** Clique em um desapego no catálogo, veja os detalhes, clique no botão **Falar com o anunciante**. Você será levado ao **Chat** com um canal aberto. Envie uma mensagem e espere 1.5 segundos para a resposta automática do vendedor!
4.  **Criar conta:** Clique em **Entrar** no topo direito, selecione *Cadastre-se* e crie sua conta (Ex: "Brechó Fashion").
5.  **Cadastrar um desapego:** Agora logado, vá em **Publicar**, selecione se quer Vender ou Doar, adicione as informações e uma foto (opcional). Envie e confira sua nova peça listada!
6.  **Gerenciar sua Loja:** Vá na aba **Minha Loja**, clique em **Editar Loja** para alterar o nome, biografia e a cor do banner de fundo. Veja os contadores e a economia estimada de emissão de carbono de acordo com suas peças publicadas!
