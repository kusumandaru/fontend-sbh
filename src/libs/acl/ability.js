import { Ability } from '@casl/ability'
import { initialAbility, roleAbility } from './config'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const userData = JSON.parse(localStorage.getItem('userData'))
const roles = userData ? userData.roles : []
let abilities = initialAbility
roles.forEach(role => {
  if (roleAbility[role]) {
    abilities = abilities.concat(roleAbility[role])
  }
})

if (abilities.length === 0) {
  abilities = initialAbility
}
export default new Ability(abilities)
