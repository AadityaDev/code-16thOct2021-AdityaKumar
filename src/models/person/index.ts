import { Static, Type } from '@sinclair/typebox'

const Person = Type.Object({
    gender: Type.String(),
    height: Type.Number(),
    weight: Type.Number(),
    bmi: Type.Optional(Type.Number()),
    bmiCategory: Type.Optional(Type.String()),
    heightInMeter: Type.Optional(Type.Function([Type.Number()], Type.Number()))
});

Person.heightInMeter = (height: number):number => {
    return height/100;
};

type PersonType = Static<typeof Person>;

export { 
    Person,
    PersonType
};
