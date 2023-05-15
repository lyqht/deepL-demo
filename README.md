# DeepL demo

This is a project to showcase a simple demo of translating a document from English to all the various languages that DeepL supports. 

At the moment of publishing this project, DeepL supports **31 languages**!

In this demo, the [Supabase README.md](https://github.com/supabase/supabase) is used as the document to be translated.

You can find the relevant input/ output files in the `docs` folder, based on the name of the file:
- `original.md` - the Supabase README in english
- `deepL_translated_{lang}.md` - the translated output using DeepL

In the docs folder, you can also find `actual_translation_de.md`, an example of a user-contributed translation found in the `i18n` folder of the supabase repository. 

> 🔎 An interesting finding is that the user-contributed translation is relatively outdated compared to the `original.md`. This finding gave me the idea that perhaps we could add some automation, such as as a GitHub action in there to make sure that the translations are always up-to-date. This is WIP!

## Try it out yourself!

To try out this project, 
1. Create a [DeepL account](https://www.deepl.com/docs-api) and get an API key.
2. Create a `.env` file using `.env.template`. Then populate `API_KEY` variable.
3. Replace the text at `original.md` with a text of your liking. Or you can just change the file name/path variables at `index.ts` to your liking.
4. Run `yarn start` to see the output~

