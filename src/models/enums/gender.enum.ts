import { databaseFemaleGenderValues, databaseMaleGenderValues } from 'src/constants';

export enum GenderEnum {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

/**
 * Gender in database is not consistent, so we need to map it to a single value.
 * @param input     Database string value;
 * @returns         GenderEnum value.
 */
export const convertStringToGender = (input?: string): GenderEnum => {
    if (!input) {
        return GenderEnum.OTHER;
    }
    
    if (databaseMaleGenderValues.includes(input)) {
        return GenderEnum.MALE;
    } else if (databaseFemaleGenderValues.includes(input)) {
        return GenderEnum.FEMALE;
    } else {
        return GenderEnum.OTHER;
    }
};
