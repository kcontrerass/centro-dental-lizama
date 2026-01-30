export interface GutenbergBlock {
    type: string;
    attributes: any;
    content?: string;
    url?: string;
    alt?: string;
    caption?: string;
    blocks?: GutenbergBlock[];
}

export interface WordPressPage {
    id: number;
    title: string;
    slug: string;
    status: string;
    date: string;
    modified: string;
    link: string;
    gutenberg_structure: GutenbergBlock[];
    sections: any[];
}

const API_URL = "https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1";

export async function getHomeData(language: "espanol" | "ingles" = "espanol"): Promise<WordPressPage | null> {
    const url = `${API_URL}/pages/${language}/inicio`;
    console.log(`[WordPress API] Fetching home data for ${language} from: ${url}`);
    try {
        const response = await fetch(url, {
            next: { revalidate: 0 } // Disable cache for testing
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch home data for ${language}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching home data for ${language}:`, error);
        return null;
    }
}

export async function getAboutData(language: "espanol" | "ingles" = "espanol"): Promise<WordPressPage | null> {
    const url = `${API_URL}/pages/${language}/quienes-somos`;
    console.log(`[WordPress API] Fetching about data for ${language} from: ${url}`);
    try {
        const response = await fetch(url, {
            next: { revalidate: 0 } // Disable cache for testing
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch about data for ${language}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching about data for ${language}:`, error);
        return null;
    }
}
