import { KeywordOptions } from '@/types/keywordOption';

export const determineCategoryAndSpecies = (
    title: string,
    description: string,
    categoryOptions: KeywordOptions,
    speciesOptions: KeywordOptions,
) => {
    const matchedCategory = Object.entries(categoryOptions.keywordMap).find(([_, keywords]) =>
        keywords.some(keyword => title.includes(keyword) || description.includes(keyword)),
    );

    const matchedSpecies = Object.entries(speciesOptions.keywordMap).find(([_, keywords]) =>
        keywords.some(keyword => title.includes(keyword) || description.includes(keyword)),
    );

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const category_id = matchedCategory ? matchedCategory[0] : '';
    const category = category_id ? categoryOptions.labelMap[category_id] || '' : '';

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const species_id = matchedSpecies ? matchedSpecies[0] : '';
    const species = species_id ? speciesOptions.labelMap[species_id] || '' : '';

    return { category, category_id, species, species_id };
};
