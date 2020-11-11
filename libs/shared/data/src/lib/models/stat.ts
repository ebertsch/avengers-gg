export type StatField = 'might' | 'precision' | 'resolve' | 'resilience' | 'proficiency' | 'valor' | 'intensity'

export interface StatInstance {
    stat: StatField
    value: number
}