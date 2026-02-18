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
    content?: string;
    excerpt?: string;
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

export async function getServicesData(language: "espanol" | "ingles" = "espanol"): Promise<WordPressPage | null> {
    const url = `${API_URL}/pages/${language}/servicios`;
    console.log(`[WordPress API] Fetching services data for ${language} from: ${url}`);
    try {
        const response = await fetch(url, {
            next: { revalidate: 0 } // Disable cache for testing
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch services data for ${language}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching services data for ${language}:`, error);
        return null;
    }
}

export async function getAppointmentData(language: "espanol" | "ingles" = "espanol"): Promise<WordPressPage | null> {
    const url = `${API_URL}/pages/${language}/agendar-cita`;
    console.log(`[WordPress API] Fetching appointment data for ${language} from: ${url}`);
    try {
        const response = await fetch(url, {
            next: { revalidate: 0 } // Disable cache for testing
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch appointment data for ${language}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching appointment data for ${language}:`, error);
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

export async function getBlogData(language: "espanol" | "ingles" = "espanol"): Promise<WordPressPage | null> {
    const url = `${API_URL}/pages/${language}/blog`;
    console.log(`[WordPress API] Fetching blog data for ${language} from: ${url}`);
    try {
        const response = await fetch(url, {
            next: { revalidate: 0 } // Disable cache for testing
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch blog data for ${language}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching blog data for ${language}:`, error);
        return null;
    }
}

export async function getPostData(slug: string): Promise<WordPressPage | null> {
    const url = `${API_URL}/posts/${slug}`;
    console.log(`[WordPress API] Fetching post data for slug: ${slug} from: ${url}`);
    try {
        const response = await fetch(url, {
            next: { revalidate: 0 } // Disable cache for testing
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch post data for slug ${slug}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching post data for slug ${slug}:`, error);
        return null;
    }
}

export async function getTestimonialsData(language: "espanol" | "ingles" = "espanol"): Promise<WordPressPage | null> {
    const url = `${API_URL}/pages/${language}/testimoniales`;
    console.log(`[WordPress API] Fetching testimonials data for ${language} from: ${url}`);
    try {
        const response = await fetch(url, {
            next: { revalidate: 0 } // Disable cache for testing
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch testimonials data for ${language}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching testimonials data for ${language}:`, error);
        return null;
    }
}

export async function getContactData(language: "espanol" | "ingles" = "espanol"): Promise<WordPressPage | null> {
    const url = `${API_URL}/pages/${language}/contacto`;
    console.log(`[WordPress API] Fetching contact data for ${language} from: ${url}`);
    try {
        const response = await fetch(url, {
            next: { revalidate: 0 } // Disable cache for testing
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch contact data for ${language}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching contact data for ${language}:`, error);
        return null;
    }
}

export async function getLocationData(language: "espanol" | "ingles" = "espanol"): Promise<WordPressPage | null> {
    const url = `${API_URL}/pages/${language}/ubicacion`;
    console.log(`[WordPress API] Fetching location data for ${language} from: ${url}`);
    try {
        const response = await fetch(url, {
            next: { revalidate: 0 } // Disable cache for testing
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch location data for ${language}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching location data for ${language}:`, error);
        return null;
    }
}
