
import { mount, createLocalVue } from '@vue/test-utils'
import Login from '~/pages/login.vue'
import Bus from '~/plugins/shared/bus'

const localVue = new createLocalVue()
localVue.use(Bus)

describe('Login user', () => {

  it('Should click the login button to login', done => {

    const mutate = jest.fn()

    const wrapper = mount(Login, {
      localVue,
      mocks: {
        $apollo: {
          mutate,
        }
      }
    })

    wrapper.find(".email").setValue("john@doe.com")
    wrapper.find(".password").setValue("111111")

    expect(wrapper.vm.formData.email).toBe("john@doe.com")
    expect(wrapper.vm.formData.password).toBe("111111")
    const btn = wrapper.find('button')

    spyOn(wrapper.vm, 'login')

    btn.trigger('click')
    expect(wrapper.vm.login).toBeCalled()
    done()
  })
})