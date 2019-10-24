
import { mount, createLocalVue } from '@vue/test-utils'
import Register from '~/pages/register.vue'
import Bus from '../plugins/shared/bus'
const localVue = new createLocalVue()
localVue.use(Bus)

describe('Create user', () => {

  it('Should click the register button to register', done => {

    const mutate = jest.fn()

    const wrapper = mount(Register, {
      localVue,
      mocks: {
        $apollo: {
          mutate,
        }
      }
    })

    wrapper.find(".firstName").setValue("John")
    wrapper.find(".lastName").setValue("Doe")
    wrapper.find(".username").setValue("johndoe")
    wrapper.find(".password").setValue("111111")
    wrapper.find(".phone").setValue("12345678900")
    wrapper.find(".email").setValue("john@doe.com")

    expect(wrapper.vm.formData.firstName).toBe("John")
    expect(wrapper.vm.formData.lastName).toBe("Doe")
    expect(wrapper.vm.formData.username).toBe("johndoe")
    expect(wrapper.vm.formData.password).toBe("111111")
    expect(wrapper.vm.formData.phone).toBe("12345678900")
    expect(wrapper.vm.formData.email).toBe("john@doe.com")

    const btn = wrapper.find('button')

    spyOn(wrapper.vm, 'createUser')

    btn.trigger('click')
    expect(wrapper.vm.createUser).toBeCalled()
    done()
  })
})
