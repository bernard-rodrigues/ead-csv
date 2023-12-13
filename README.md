# Gerador de CSV para Moodle

Aplicação para auxiliar na geração de arquivos CSV para cadastro e edição de usuários em lote em plataformas Moodle.

## Utilização

### Arquivo Excel

Selecione um arquivo Excel contendo dados em potencial para cadastro de usuários (independente da nomenclatura das colunas). Os dados presentes na planilha podem ser nomes completos, número de documentos, e-mail, etc. A aplicação irá informar os dados obrigatórios do Moodle e você terá a opção de cadastrar dados adicionais, conforme a necessidade.

### Linha inicial

Informe a partir de que linha constam os dados relevantes da sua planilha. Ou seja, os dados que serão cadastrados na plataforma Moodle. Não importa para a aplicação os nomes dos cabeçalhos, uma vez que estes não serão propriamente cadastrados, mas sim seus dados.

### Campos opcionais

A aplicação irá apresentar uma listagem de campos opcionais (padrões do Moodle) para que você, se necessário, acrescente à listagem dos campos que irá cadastrar. Selecione o campo de interesse para que ele entre na lista de cadastro ou clique novamente no campo para que ele seja retirado da mesma.

Caso haja algum campo padrão de seu interesse não cadastrado na aplicação, envie um e-mail para <bernard.rodrigues@outlook.com> informando o nome do campo, para que o incluamos na listagem.

### Campos adicionais

Os campos adicionais devem ser pré cadastrados na plataforma Moodle como **Campo de perfil de usuário**, no menu de administrador. Por padrão, para cadastro desses campos, é necessário que adicionemos o prefixo `profile_field_`. Por exemplo, para cadastro do campo `convenio` precisaremos da coluna `profile_field_convenio` no arquivo CSV.

A aplicação irá adicionar esse prefixo automaticamente, uma vez informado o nome breve do campo cadastrado na plataforma.

### Preenchimento dos dados

Os dados informados estarão disponíveis no último *card* da aplicação. Os campos obrigatórios com o marcador vermelho *.

Você deverá informar em que colunas de sua planilha estão os dados de cada campo. Você poderá utilizar letras maiúsculas ou minúsculas e até mesmo pares de letras, dependendo da extensão, em colunas, do arquivo Excel.

#### firstname e lastname

Repare que a aplicação oferece a opção de utilização de `Usar nome completo`, caso você não tenha o nome de seu usuário separado em duas colunas. Ao utilizar o campo `fullname`, no momento da construção do arquivo *.csv* a aplicação irá separar o **primeiro nome dos demais nomes do usuário**, em `firstname` e `lastname`, respectivamente.

#### Definir curso e/ou papel

Caso o seu cadastro em lotes envolva o(s) mesmo(s) curso(s) e/ou papel(is) para todos os usuários, você pode utilizar o botão `Definir curso/papel` para, ao invés de informar a coluna que contém os dados, você informar diretamente o nome breve do curso ou papel de interesse. Dessa forma, todos os usuários serão cadastrados naquele mesmo curso e/ou papel.

#### Grupo é opcional

Repare que o cadastro de grupos é opcional.

#### Adicionar/Remover curso

Na parte inferior da lista de cadastro você irá encontrar botões para adicionar/remover cursos. Ao clicar pela primeira vez no botão `Adicionar curso`, por exemplo, repare que a aplicação irá adicionar `course2`, `role2` e `group2` à lista de dados a serem cadastrados. Todas as explicações dadas acima se extendem a esses novos cabeçalhos.

Utilize o botão `Remover curso` para retirar, da mesma forma, os últimos curso, papel e grupo inseridos.

#### Criar CSV

Ao final do preenchimento, utilize o botão `Criar CSV` para gerar o arquivo *.csv* de interesse, o qual poderá ser diretamente utilizado no cadastro em massa de sua plataforma Moodle.