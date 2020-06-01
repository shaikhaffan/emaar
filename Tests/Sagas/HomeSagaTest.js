import FixtureAPI from '../../App/Services/FixtureApi'
import API from '../../App/Services/Api'
import { put, call } from 'redux-saga/effects'
import { getHomeData} from '../../App/Sagas/HomeSagas'
import HomeActions from '../../App/Redux/HomeRedux'

import DebugConfig from '../../App/Config/DebugConfig'
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', async () => {
// console.log(api,"-",FixtureAPI);
  const step = stepper(getHomeData(api, {data: 's'}))
  console.log("step",step)
  // first yield is API
  //expect(step()).toEqual(call(await api.getHome()))
})

test('success path', async () => {
  const response = await api.getHome();
  //console.log(response,"res---ABC");
  const step = stepper(getHomeData(api, {data: 's'}))
  // first step API
  step()
  // Second step successful return
  const stepResponse = step(response);
  //console.log(stepResponse,"srejj");
  // Get the avatar Url from the response
  //const firstUser = path(['data', 'items'], response)[0]
 // const avatar = firstUser.avatar_url
expect(stepResponse).toEqual(put(HomeActions.homeSuccess(response.data)))
})

test('failure path', () => {
  const response = {ok: false}
  const step = stepper(getHomeData(api, {data: 's'}))
  // first step API
  step()
  // Second step failed response
  expect(step(response)).toEqual(put(HomeActions.homeFailure()))
})
