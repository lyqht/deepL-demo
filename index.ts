import * as deepl from 'deepl-node';
import 'dotenv/config';
import fs from 'fs'

const authKey = process.env.API_KEY || "";
const translator = new deepl.Translator(authKey);
const inputFilePath = 'docs/original.md';
const outputFileNamePrefix = 'docs/deepL_translated';

(async () => {
    const targetLanguages = await translator.getTargetLanguages();
    console.log(`DeepL supports ${targetLanguages.length} languages. Translating the input file into all supported languages...`)
    fs.readFile(inputFilePath, 'utf8', async function (err, text) {
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
                }
            );
    
            fs.writeFile(`${outputFileNamePrefix}_${targetLang}.md`, textResult.text, function (err) {
                if (err) return console.log(err);
                console.log(`Translated ${targetLang}`)
            });
        }
    });
})();