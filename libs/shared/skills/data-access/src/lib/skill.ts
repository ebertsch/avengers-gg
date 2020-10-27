export interface Skill {
    id: string;
    heroId: string;
    title: string;
    category: string;
    description: string;
    children: Skill[];
}