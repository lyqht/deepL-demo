import * as deepl from 'deepl-node';
import 'dotenv/config';
import fs from 'fs'

const authKey = process.env.API_KEY || "";
const translator = new deepl.Translator(authKey);
const inputFilePath = 'docs/original.md';
const toTranslateFilePath = 'docs/to_translate.md';
const outputFileNamePrefix = 'docs/README';
const termsToIgnoreForTranslation: string[] = [];
const starTagForNoTranslate = '<!-- notranslate -->';
const endTagForNoTranslate = '<!-- /notranslate -->';

function replaceAll(str: string, search: string, replacement: string): string {
    let index = str.indexOf(search);
    while (index != -1) {
      str = str.replace(search, replacement);
      index = str.indexOf(search);
    }
    return str;
}

(async () => {
    fs.readFile(inputFilePath, 'utf8', async function (err, text) {
        if (err) {
            return console.log(err);
        }

        termsToIgnoreForTranslation.forEach(term => {
            text = text.replace(new RegExp(term, 'g'), `<keep>${term}</keep>`)
        })

        const textWithNoTranslateStartTagReplaced = replaceAll(text, starTagForNoTranslate, '<keep>')
        const textWithNoTranslateEndTagReplaced = replaceAll(textWithNoTranslateStartTagReplaced, endTagForNoTranslate, '</keep>')

        fs.writeFile(toTranslateFilePath, textWithNoTranslateEndTagReplaced, function (err) {
            if (err) return console.log(err);
            console.log(`Created file to be translated`)
        })
    })

    const targetLanguages = await translator.getTargetLanguages();
    console.log(`DeepL supports ${targetLanguages.length} languages. Translating the input file into all supported languages...`)
    fs.readFile(toTranslateFilePath, 'utf8', async function (err, text) {
        if (err) {
            return console.log(err);
        }
        
        for (const targetLanguage of targetLanguages) {
            const targetLang = targetLanguage.code as deepl.TargetLanguageCode
            const textResult = await translator.translateText(
                text,
                null,
                targetLang,
                {
                    preserveFormatting: true,
                    tagHandling: 'xml',
                    ignoreTags: ['keep']
                }
            );
    
            const translatedText = textResult.text;
            
            // remove added keep tags
            const textWithNoTranslateStartTagReplaced = replaceAll(translatedText, '<keep>', '')
            const textWithNoTranslateEndTagReplaced = replaceAll(textWithNoTranslateStartTagReplaced, '</keep>', '')
            
            fs.writeFile(`${outputFileNamePrefix}.${targetLang}.md`, textWithNoTranslateEndTagReplaced, function (err) {
                if (err) return console.log(err);
                console.log(`Translated ${targetLang}`)
            });
        }
    });
})();