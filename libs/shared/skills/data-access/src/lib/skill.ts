export interface Skill {
    id: string;
    heroId: string;
    name: string;
    category: string;
    skill: string;
    children: Skill[];
}