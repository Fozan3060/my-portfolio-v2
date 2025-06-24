import {type SchemaTypeDefinition} from 'sanity'
import {hero} from './hero'
import {aboutMe} from './aboutMe'
import {portfolio} from './portfolio'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [hero, aboutMe, portfolio],
}
