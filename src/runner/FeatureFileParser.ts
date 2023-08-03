
import _ from 'lodash';
import { readFile } from 'fs/promises';
import { Parser, AstBuilder, GherkinClassicTokenMatcher, compile } from '@cucumber/gherkin';
import { GherkinDocument, IdGenerator } from '@cucumber/messages';

const parser = new Parser(new AstBuilder(IdGenerator.incrementing()), new GherkinClassicTokenMatcher());

export interface ParsedFeatureFileData {
    name: string;
    tags: string[][];
    compiledPickels?: {
        tags: string[];
        scenarioName: string;
        featureFile: string;
    }[];
}

export const parseFeatureFile = async (featureFiles: string[]): Promise<ParsedFeatureFileData[]> => {
    const parsedRawData: ParsedFeatureFileData[] = [];
    for await (const featureFile of featureFiles) {
        const raw = await readFile(featureFile);
        const gherkinDocument: GherkinDocument = parser.parse(raw.toString());
        if (_.get(gherkinDocument, 'feature.keyword') !== 'Feature') {
            throw new Error('Expected Gherkin document');
        }
        // Once the gherkin document is compiled, tags on the feature are combined with those on the scenarios.
        const pickles = compile(gherkinDocument, '', IdGenerator.incrementing());
        const tags = pickles.map((pickle) => pickle.tags.map((tag) => tag.name));
        const compiledPickels = pickles.map((pickle) => ({
            tags: pickle.tags.map((tag) => tag.name),
            scenarioName: pickle.name,
            featureFile
        }));
        try {
            parsedRawData.push({ name: featureFile, tags, compiledPickels });
        } catch (error) {
            throw new Error(`Failed to parse ${featureFile}, error was: ${error}`);
        }
    }
    return Promise.resolve(parsedRawData);
};
 
 
 