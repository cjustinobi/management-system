
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TableGenerator from '~/components/shared/TableGenerator'
import VuePluggin from '../../plugins/shared/bus'

const localVue = createLocalVue()
let wrapper
describe('Table Generator', () => {
  beforeEach(() => {
    wrapper = shallowMount(TableGenerator, {
      localVue,
      propsData: {
        items: [
          { foo: 'baz', fullname: 'John Doe' },
          { foo: 'baz1', fullname: 'John Doe1' }
        ]
      }
    })
  })

  it('Should have source', () => {
    expect(wrapper.vm.items).toStrictEqual([
      { foo: 'baz', fullname: 'John Doe', actions: 'actions' },
      { foo: 'baz1', fullname: 'John Doe1', actions: 'actions' }
    ])

    expect(wrapper.vm.items).toBe(wrapper.vm.source)
    expect(wrapper.vm.cols).toBe(wrapper.vm.columns)
  })
})