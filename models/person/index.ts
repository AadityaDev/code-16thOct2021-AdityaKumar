import { Static, Type } from '@sinclair/typebox'

export const Person = Type.Object({
    name: Type.String(),
    gender: Type.String(),
    height: Type.Number(),
    weight: Type.Number(),
    bmi: Type.Optional(Type.Number()),
});

export type PersonType = Static<typeof Person>;