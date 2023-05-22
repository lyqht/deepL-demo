# DeepL demo

This is a project to showcase a simple demo of translating a document from English to all the various languages that DeepL supports.

At the moment of publishing this project, DeepL `v1.9.0` supports **31 languages**!

There are 2 examples in this project.

## Example 1: Translating a simple document

In this demo, a [short and simple text](docs/simple/original.md) is used as the document to be translated. It is translated using the [deepl-translate-github-action](https://github.com/lyqht/deepl-translate-github-action), and a demo can be found in [this PR](https://github.com/lyqht/deepL-demo/pull/2/files).

### Try it out yourself!

Create a project that has a github workflow like [translate.yml](.github/workflows/translate.yml) in this project, and follow the instructions there at the [deepl-translate-github-action](https://github.com/lyqht/deepl-translate-github-action) README.

## Example 2: Translating Supabase README 

In this demo, the [Supabase README.md](https://github.com/supabase/supabase) is used as the document to be translated. It is a relatively complicated document compared to the previous example.

You can find the relevant input/ output files in the `docs/supabase` folder, based on the name of the file:
- `original.md` - the Supabase README in english
- `README.{lang}.md` - the translated output using DeepL

In the docs folder, you can also find `actual_translation_de.md`, an example of a user-contributed translation found in the `i18n` folder of the supabase repository - it's a little outdated compared to the `original.md`.


### Try it out yourself!

To try out this project, 
1. Create a [DeepL account](https://www.deepl.com/docs-api) and get an API key.
2. Create a `.env` file using `.env.template`. Then populate `API_KEY` variable.
3. Replace the text at `original.md` with a text of your liking. Or you can just change the file name/path variables at `index.ts` to your liking.
4. Run `yarn start` to see the output~

✨ Cool stuff: The script actually creates another file `to_translate.md` with some modified text from the `original.md` so that certain terms won't be translated.


## Limitations of DeepL html tag handling

Here are some limitations of DeepL that I've discovered while experimenting with its API with `tagHandling='html'`.

Some of these issues still happen in `tagHandling='xml'` though.

Read on if you're keen!

<details>

### Excluding specific HTML elements for translation

In their [docs for disabling translation of elements](https://www.deepl.com/docs-api/html/disabling/), they mentioned that the translation engine respects the `translate="no"` and `class="notranslate"` attributes.

I briefly tested the translation with a HTML element as such, and it does remain untranslated in anothre language, e.g. Chinese (zh)

```
<p translate="no">Rust</p>
```

However, if the HTML element that should not be translated is a nested child, the element will get translated. 

> en
> ```
> <div><p translate="no">Rust</p></div>
> ```
> 
> 
> zh translated by DeepL
> 
> ```
> <div><p translate="no">锈蚀</p></div>
> ```

The same happens even if we use `class="notranslate"` instead of `translate="no`"

### Formatting

In **certain languages**, certain HTML elements don't retain their formatting as expected. This happens even in XML tag handling. 

#### Example 1

EN

```md
# Supabase

[Supabase](https://supabase.com) is an open source Firebase alternative. We're building the features of Firebase using enterprise-grade open source tools.

- [x] Hosted Postgres Database. [Docs](https://supabase.com/docs/guides/database)
- [x] Authentication and Authorization. [Docs](https://supabase.com/docs/guides/auth)
- [x] Auto-generated APIs.
- [x] REST. [Docs](https://supabase.com/docs/guides/database/api#rest-api)
- [x] GraphQL. [Docs](https://supabase.com/docs/guides/database/api#graphql-api)
- [x] Realtime subscriptions. [Docs](https://supabase.com/docs/guides/database/api#realtime-api)
- [x] Functions.
- [x] Database Functions. [Docs](https://supabase.com/docs/guides/database/functions)
- [x] Edge Functions [Docs](https://supabase.com/docs/guides/functions)
- [x] File Storage. [Docs](https://supabase.com/docs/guides/storage)
- [x] Dashboard

![Supabase Dashboard](https://raw.githubusercontent.com/supabase/supabase/master/apps/www/public/images/github/supabase-dashboard.png)
```

pt-BR

> notice the random 'o' at the start of line, and missing first checkbox
```md
# Supabase

o [Supabase] (https://supabase.com) é uma alternativa de código aberto ao Firebase. Estamos desenvolvendo os recursos do Firebase usando ferramentas de código aberto de nível empresarial.

- [Banco de dados Postgres hospedado. [Docs](https://supabase.com/docs/guides/database)
- [x] Autenticação e autorização. [Docs](https://supabase.com/docs/guides/auth)
- [x] APIs geradas automaticamente.
    - [x] REST. [Docs](https://supabase.com/docs/guides/database/api#rest-api)
    - [x] GraphQL. [Docs](https://supabase.com/docs/guides/database/api#graphql-api)
    - [x] Assinaturas em tempo real. [Docs](https://supabase.com/docs/guides/database/api#realtime-api)
- [x] Funções.
    - [x] Funções de banco de dados. [Docs](https://supabase.com/docs/guides/database/functions)
    - [x] Funções de borda [Docs](https://supabase.com/docs/guides/functions)
- [x] Armazenamento de arquivos. [Docs](https://supabase.com/docs/guides/storage)
- [x] Dashboard

![Supabase Dashboard](https://raw.githubusercontent.com/supabase/supabase/master/apps/www/public/images/github/supabase-dashboard.png)
```

nb

> the text to render an image after the ordered list is screwed up

```md
# Supabase

[Supabase](https://supabase.com) er et alternativ til Firebase med åpen kildekode. Vi bygger funksjonene i Firebase ved hjelp av åpen kildekode-verktøy for bedrifter.

- [x] Hostet Postgres-database. [Dokumenter](https://supabase.com/docs/guides/database)
- [x] Autentisering og autorisasjon. [Dokumenter](https://supabase.com/docs/guides/auth)
- [x] Autogenererte API-er.
  - [x] REST. [Dokumenter](https://supabase.com/docs/guides/database/api#rest-api)
  - [x] GraphQL. [Dokumenter](https://supabase.com/docs/guides/database/api#graphql-api)
  - [x] Sanntidsabonnementer. [Dokumenter](https://supabase.com/docs/guides/database/api#realtime-api)
- [x] Funksjoner.
  - [x] Databasefunksjoner. [Dokumenter](https://supabase.com/docs/guides/database/functions)
  - [x] Edge-funksjoner [Dokumenter](https://supabase.com/docs/guides/functions)
- [x] Lagring av filer. [Dokumenter](https://supabase.com/docs/guides/storage)
- [x] Dashbord

supabase Dashboard](https://raw.githubusercontent.com/supabase/supabase/master/apps/www/public/images/github/supabase-dashboard.png) [x] [x] [x] [x][Supabase Dashboard](https://raw.githubusercontent.com/supabase/supabase/master/apps/www/public/images/github/supabase-dashboard.png)
```

#### Example 2

en

```md
<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Language</th>
    <th>Client</th>
    <th colspan="5">Feature-Clients (bundled in Supabase client)</th>
  </tr>
```


ja

> where did my closing tags go?

```md
<table style="table-layout:fixed; white-space: nowrap;">（テーブルレイアウト：固定）。
  <tr>
    <th>言語</th></th
    <th>クライアント</th></th
    <th colspan="5">Feature-Clients (Supabaseクライアントにバンドル)</th></th>。
```

### Example 3

EN

```
<th colspan="7">💚 Community 💚</th>
```

pt-BR
```
<th colspan="7">comunidade 💚 💚</th>
```
</details>
