import { EffectTemplate } from "./types";

export const EffectTemplates: Record<string, EffectTemplate[]> = {
    Alert: [
        {
            name: "临时监视关键字",
            contentType: "JSON",
            template: `
            { "temporaryWatchKeywords": $\{temporaryWatchKeywords} }
        `,
            parameters: [
                {
                    name: "temporaryWatchKeywords",
                    label: "关键词",
                    type: "array",
                    required: true,
                },
            ],
        },
    ],
};
