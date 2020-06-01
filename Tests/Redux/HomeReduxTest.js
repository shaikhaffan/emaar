import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/HomeRedux'
import { getHomeData,deleteBlogData,addBlogData,editBlogData } from '../../App/Sagas/HomeSagas'



test('request', () => {
  const data = 's'
  const state = reducer(INITIAL_STATE, Actions.homeRequest(data))

  expect(state.fetching).toBe(true)
 // expect(state.data).toBe(data)
 // expect(state.avatar).toBeNull()
})

test('success', () => {
  const payload = true
  const state = reducer(INITIAL_STATE, Actions.homeSuccess(payload))
 console.log("statetttt",state);
  expect(state.fetching).toBe(false)
 expect(state.payload).toBe(true)
 // expect(state.error).toBeNull()
})

test('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.homeFailure())

  expect(state.fetching).toBe(false)
  expect(state.payload).toBe(null)
  expect(state.error).toBe(true)
  //expect(state.avatar).toBeNull()
})
