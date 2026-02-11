export interface GutenbergBlock {
    type: string;
    attributes: any;
    content?: string;
    url?: string;
    alt?: string;
    caption?: string;
    blocks?: GutenbergBlock[];
    columns?: { blocks: GutenbergBlock[] }[]; // Add columns support
    buttons?: GutenbergBlock[]; // Add buttons support
    text?: string; // Add text support for buttons
    linkTarget?: string;
    rel?: string;
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

export async function getHeaderData(language: "espanol" | "ingles" = "espanol"): Promise<WordPressPage | null> {
    const url = `${API_URL}/pages/${language}/menu`;
    console.log(`[WordPress API] Fetching header data for ${language} from: ${url}`);
    try {
        const response = await fetch(url, {
            next: { revalidate: 60 } // Cache for 1 minute
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch header data for ${language}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching header data for ${language}:`, error);
        return null;
    }
}

export async function getFooterData(language: "espanol" | "ingles" = "espanol"): Promise<WordPressPage | null> {
    const url = `${API_URL}/pages/${language}/footer`;
    console.log(`[WordPress API] Fetching footer data for ${language} from: ${url}`);
    try {
        const response = await fetch(url, {
            next: { revalidate: 60 } // Cache for 1 minute
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch footer data for ${language}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching footer data for ${language}:`, error);
        return null;
    }
}
